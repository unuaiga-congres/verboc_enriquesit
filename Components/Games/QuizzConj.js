// Components/Games/QuizzConj.js

import Layout from '../../Template/Layout';
import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity, Image, Text, ActivityIndicator, Keyboard } from 'react-native'
import {Picker} from "@react-native-picker/picker";
import {ShowWithKeyboard} from 'react-native-hide-with-keyboard';
import {getRandomForm, getConjugationFromForm } from '../../API/VerbocApi'
import NetInfo from '@react-native-community/netinfo';
import { useSettings } from '../../Contexts/SettingsContext';
import { DisplaySound } from '../../Template/DisplaySound';


import conjs from '../../Datasets/ConjugationsCat';


import commonStyles from '../../Template/commonStyles';


const QuizzConj = function ({ navigation, route }) {


  const [group, setGroup] = useState("all");
  const [isLoading, setIsLoading] = useState("False");
  const [error, setError] = useState("");
  const [right, setRight] = useState([]);
  const [question, setQuestion] = useState("");
  const [answered, setAnswered] = useState("False");
  const [accu, setAccu] = useState(0);
  const [per, setPer] = useState("1 sg");
  const [mod, setMod] = useState("ind");
  const [tns, setTns] = useState("pres");
  const [inf, setInf] = useState("");
  const [mess, setMess] = useState("");
  const [isConnected, setIsConnected] = useState(null);
  const [paramVis, setParamVis] = useState("hidden");
  const [helpVis, setHelpVis] = useState("hidden");

  const { variety, saveVariety } = useSettings();




  useEffect(() => {
    if (variety !== null && group !== null) {
      replay()
    }
  }, [group, variety]);


  const loadQuest =  () => {
    setError("")
    setQuestion("")
    setIsLoading("True")
    //On récupère une forme au hasard via l'API
    getRandomForm(variety, group, 'all', 'all').then(data => {
      if (!data) {
        setIsLoading("False")
        setError("Error pendent la recèrca de forma. Verificatz vòstra connexion Internet.1")
      }else if ('query' in data) {
        if (data['query'].length > 0) {
          //On génère la question
          setQuestion(data['query'][0]["form"])
          setInf(data['query'][0]["inf"])

          //On récupère toutes les réponses possibles pour cette forme
          getConjugationFromForm(data['query'][0]["form"], data['query'][0]["inf"], data['query'][0]["var"]).then(datac => {
            if (!datac) {
              setIsLoading("False")
              setError("Error pendent la recèrca de forma. Verificatz vòstra connexion Internet.2")
            }else if ('query' in datac) {
              answok=[]
              for (var num in datac['query']) {
                var infos=datac['query'][num]
                var catform=infos["cat"]
                //On récupère les informations affichées
                if (catform in conjs) {
                  affnv=conjs[catform]["aff"]
                }
                answok.push({"per":infos["per"]+" "+infos["num"], "mod":infos["mod"], "tns":infos["tns"], "inf":data['query'][0]["inf"], "aff":affnv})
              }
              setRight(answok)
              setIsLoading("False")
            }else{
              setIsLoading("False")
              setError("Cap de forma es pas estada trobada. Contactatz los administrators de l'aplicacion.")
            }
          })
          .catch(error => {
            // Gestion des erreurs de la deuxième promesse
            console.error('Error during getConjugationFromForm:', error);
            setIsLoading("False");
            setError("Error pendent la recèrca de forma. Verificatz vòstra connexion Internet.3");
          });


        }else{
          setIsLoading("False")
          setError("Cap de forma es pas estada trobada. Contactatz los administrators de l'aplicacion.")
        }
      }else{
        setIsLoading("False")
        setError("Cap de forma es pas estada trobada. Contactatz los administrators de l'aplicacion.")
      }
    })
    .catch(error => {
      // Gestion des erreurs de la deuxième promesse
      console.error('Error during getConjugationFromForm:', error);
      setIsLoading("False");
      setError("Error pendent la recèrca de forma. Verificatz vòstra connexion Internet.4");
    });

    
  
  }

  const answering =  (item) => {
    setAnswered('True')

    const verbmin = inf.toLowerCase()
    const verbtrim = verbmin.trim()
    setInf(verbtrim)
    setMess('Mancat !')
    for (var infright of right) {
      if ((infright['per']==per) && (infright['mod']==mod) && (infright['tns']==tns)) {
        setAccu(prevAccu => prevAccu + 1);
        setMess('Òsca !')
      }
    }


  }
  

  const replay =  () => {
    setPer('1 sg')
    setMod('ind')
    setTns('pres')
    setInf('')
    setAnswered('False')
    loadQuest()
    if (mess != "Òsca !") {
      setAccu(0)
    }
  }



  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    // Nettoyage lors du démontage du composant
    return () => unsubscribe();
  }, []);
  



  const displayQuestion =  () => {
    if (question!="") {
    return (
      <View style={commonStyles.blocsubtitle}>
        <Text style={[commonStyles.subtitle_conj]}>{question} (vèrbe {inf})</Text>
        {isConnected !== null && isConnected && ["gascon", "lengadoc"].includes(variety) && (
            <DisplaySound index={question} variety={variety} />
        )}
      </View>

      )
    }
  }



  const displayParam =  () => {
    
    if(paramVis=='shown') {
    return (
      <View style={commonStyles.cadreparam}>
          <View style={commonStyles.barreparam}>
            <View style={commonStyles.iconsparam}>
              <TouchableOpacity style={commonStyles.changeLanguage} onPress={() => {setParamVis('shown');setHelpVis('hidden')}}>
                <Image style={commonStyles.buttonparam} source={require('../../Images/param.png')} />
              </TouchableOpacity>
              <TouchableOpacity style={commonStyles.changeLanguage} onPress={() => {setHelpVis('shown');setParamVis('hidden')}}>
                <Image style={commonStyles.buttonparam} source={require('../../Images/help.png')} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => setParamVis('hidden')}>
              <Image style={commonStyles.buttonparam} source={require('../../Images/minimize.png')} />
            </TouchableOpacity>
          </View>
          <View style={commonStyles.pickerlabel}>
            <Text style={[commonStyles.textpicker]}>Jogar en&nbsp;:</Text>
            <Picker
              style={commonStyles.pickerlanguage}
              selectedValue={variety}
              onValueChange={(itemValue, itemIndex) => saveVariety(itemValue)}
            >
              <Picker.Item label="occitan gascon" value="gascon" />
              <Picker.Item label="occitan lemosin" value="lemosin" />
              <Picker.Item label="occitan lengadocian" value="lengadoc" />
              <Picker.Item label="occitan provençal" value="provenc" />
            </Picker>
          </View>
          <View style={commonStyles.pickerlabel}>
            <Text style={[commonStyles.textpicker]}>Grop&nbsp;:</Text>
            <Picker
              style={commonStyles.pickerlanguage}
              selectedValue={group}
              onValueChange={(itemValue, itemIndex) => setGroup(itemValue)}
            >
              <Picker.Item label="totes" value="all" />
              <Picker.Item label="primièr" value="1" />
              <Picker.Item label="segond" value="2" />
              <Picker.Item label="tresen" value="3" />
              <Picker.Item label="sens grop" value="0" />
            </Picker>
          </View>
      </View>
    )
    }else if(helpVis=='shown') {
      return (
        <View style={commonStyles.cadreparam}>
          <View style={commonStyles.barreparam}>
            <View style={commonStyles.iconsparam}>
              <TouchableOpacity style={commonStyles.changeLanguage} onPress={() => {setParamVis('shown');setHelpVis('hidden')}}>
                <Image style={commonStyles.buttonparam} source={require('../../Images/param.png')} />
              </TouchableOpacity>
              <TouchableOpacity style={commonStyles.changeLanguage} onPress={() => {setHelpVis('shown');setParamVis('hidden')}}>
                <Image style={commonStyles.buttonparam} source={require('../../Images/help.png')} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => setHelpVis('hidden')}>
              <Image style={commonStyles.buttonparam} source={require('../../Images/minimize.png')} />
            </TouchableOpacity>
          </View>
          <Text style={[commonStyles.help_text]}>Vos cal retrobar la persona, lo temps e lo mòde de la forma conjugada que vos es balhada. Podètz causir de trabalhar sus un grop especific, per una varietat especifica o per un temps especific en clicant sus l'icòna dels paramètres.</Text>
        </View>
        )
        }else{
      return (
        <View style={commonStyles.cadreparam}>
            <View style={commonStyles.barreparam}>
              <View style={commonStyles.iconsparam}>
                <TouchableOpacity style={commonStyles.changeLanguage} onPress={() => {setParamVis('shown');setHelpVis('hidden')}}>
                  <Image style={commonStyles.buttonparam} source={require('../../Images/param.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={commonStyles.changeLanguage} onPress={() => {setHelpVis('shown');setParamVis('hidden')}}>
                  <Image style={commonStyles.buttonparam} source={require('../../Images/help.png')} />
                </TouchableOpacity>
              </View>
            </View>
        </View>

      )

    }
  }
  return (

    <Layout>
          {isLoading=="False" ? null : 
            <View style={commonStyles.loading_container}>
              <ActivityIndicator color="#000000" size="large" />
            </View>}
          <View style={commonStyles.results}>
            {error=="" ? null : <Text style={commonStyles.text_error}>{ error }</Text>}
            
            {displayQuestion()}

            {question !== "" && (

            <View style={commonStyles.contpick}>
              <View style={commonStyles.pickerlabel}>
                <Text style={[commonStyles.textpicker]}>Persona&nbsp;:</Text>
                <Picker
                  style={commonStyles.pickerlanguage}
                  selectedValue={per}
                  onValueChange={(itemValue, itemIndex) => setPer(itemValue)}
                >
                  <Picker.Item label="1 sg" value="1 sg" />
                  <Picker.Item label="2 sg" value="2 sg" />
                  <Picker.Item label="3 sg" value="3 sg" />
                  <Picker.Item label="1 pl" value="1 pl" />
                  <Picker.Item label="2 pl" value="2 pl" />
                  <Picker.Item label="3 pl" value="3 pl" />
                </Picker>
              </View>

              <View style={commonStyles.pickerlabel}>
                <Text style={[commonStyles.textpicker]}>Mòde&nbsp;:</Text>
                <Picker
                  style={commonStyles.pickerlanguage}
                  selectedValue={mod}
                  onValueChange={(itemValue, itemIndex) => setMod(itemValue)}
                >
                  <Picker.Item label="indicatiu" value="ind" />
                  <Picker.Item label="subjonctiu" value="subj" />
                  <Picker.Item label="condicional" value="cond" />
                  <Picker.Item label="imperatiu" value="imp" />
                </Picker>
              </View>

              <View style={commonStyles.pickerlabel}>
                <Text style={[commonStyles.textpicker]}>Temps&nbsp;:</Text>
                <Picker
                  style={commonStyles.pickerlanguage}
                  selectedValue={tns}
                  onValueChange={(itemValue, itemIndex) => setTns(itemValue)}
                >
                  <Picker.Item label="present" value="pres" />
                  <Picker.Item label="preterit" value="pas" />
                  <Picker.Item label="imperfach" value="imp" />
                  <Picker.Item label="futur" value="fut" />
                </Picker>
              </View>


            </View>
            )}
            <View>
            {answered === 'False' && question !== "" ? (
              <View style={[commonStyles.allwidth]}>
            <TouchableOpacity onPress={() => answering()} style={[commonStyles.button_votz]}>
              <Text style={[commonStyles.button_text]}>Validar</Text>
            </TouchableOpacity>
              <ShowWithKeyboard>
                <TouchableOpacity style={commonStyles.button_copy} onPress={() => Keyboard.dismiss()}>
                  <Image style={commonStyles.copy} source={require('../../Images/minimize.png')} />
                </TouchableOpacity>
              </ShowWithKeyboard>
              </View>
              ) : null}
            </View>
            {answered === 'True' ? (
            <View style={commonStyles.blocosca}>
              <Text style={commonStyles.textcum}>{mess}</Text>
              {right.length === 1 ? (
                <Text style={commonStyles.textcum}>
                  La bona responsa èra : {right[0]['aff']}
                </Text>
              ) : (
                <View>
                  <Text style={commonStyles.textcum}>
                    Las bonas responsas èran :
                  </Text>
                  {right.map((element, index) => (
                    <Text key={index} style={commonStyles.listrep}>
                     - {element['aff']}
                    </Text>
                  ))}
                </View>
              )}
              <View style={[commonStyles.buttons, commonStyles.margintop, commonStyles.allwidth]}>
                <TouchableOpacity style={[commonStyles.button_votz, commonStyles.allwidth]} onPress={() => replay()}>
                  <Text style={commonStyles.button_text}>Tornar jogar</Text>
                </TouchableOpacity>
              <ShowWithKeyboard>
                <TouchableOpacity style={commonStyles.button_copy} onPress={() => Keyboard.dismiss()}>
                  <Image style={commonStyles.copy} source={require('../../Images/minimize.png')} />
                </TouchableOpacity>
              </ShowWithKeyboard>
              </View>
            </View>
              ) : null}

            
          </View>

        <View style={commonStyles.respCum}>
        <Text style={commonStyles.suivicum}>Bonas responsas cumuladas : {accu}</Text>
        </View>
        {displayParam()}

        </Layout>



  );
};





export default QuizzConj;
