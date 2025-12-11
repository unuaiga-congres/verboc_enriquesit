// Components/Games/QuizzForm.js

import Layout from '../../Template/Layout';
import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity, Image, Text, ActivityIndicator, FlatList } from 'react-native'
import {Picker} from "@react-native-picker/picker";
import RNPickerSelect from "react-native-picker-select";
import {getRandomVerb } from '../../API/VerbocApi'
import { useSettings } from '../../Contexts/SettingsContext';


import conjs from '../../Datasets/Conjugations';

import commonStyles from '../../Template/commonStyles';


const QuizzForm = function ({ navigation, route }) {


  const [group, setGroup] = useState("all");
  const [time, setTime] = useState("all");
  const [isLoading, setIsLoading] = useState("False");
  const [error, setError] = useState("");
  const [right, setRight] = useState("");
  const [answers, setAnswers] = useState([]);
  const [answer, setAnswer] = useState("");
  const [question, setQuestion] = useState("");
  const [answered, setAnswered] = useState("False");
  const [accu, setAccu] = useState(0);
  const [paramVis, setParamVis] = useState("hidden");
  const [helpVis, setHelpVis] = useState("hidden");

  const { variety, saveVariety } = useSettings();

  function shuffle(array) {

    let shuffled = array
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)
    return shuffled
  }


  const loadQuest =  () => {
    setIsLoading("True")

    //On choisit une conjugaison au hasard
    const randIndexConjs = Math.floor(Math.random() * conjs.length);
    conjok=conjs[randIndexConjs]

    //On récupère un verbe au hasard avec ses conjugaisons
    getRandomVerb(variety, group, 'all', 'all').then(data => {
      if (!data) {
        setIsLoading("False")
        setError("Error pendent la recèrca de forma. Verificatz vòstra connexion Internet.1")
      }else if ('query' in data) {
        conjtrue=[]
        conjfalse=[]
        inf=""
        dist=""
        for (var num in data['query']) {
          var infos=data['query'][num]
          inf=infos['inf']
          dist=infos['dist']
          if (('mod' in infos) && ('per' in infos) && ('num' in infos) && ('tns' in infos) && ('cat' in infos)) {
            if (infos['cat']==conjok['cat']) {
              if (!conjtrue.includes(infos['form'])) {
                conjtrue.push(infos['form'])
              }
            }else{
              if ((infos['mod']==conjok['mod']) && (infos['tns']==conjok['tns']) && (infos['num']==conjok['num'])) {
                if (!conjfalse.includes(infos['form'])) {
                  conjfalse.push(infos['form'])
                }
              }
    
              if ((infos['per']==conjok['per']) && (infos['num']==conjok['num'])) {
                if (!conjfalse.includes(infos['form'])) {
                  conjfalse.push(infos['form'])
                }
              }
            }
          }
        }

        //On génère la question
        var question=conjok['aff']+ " " +"de «\u00A0" + inf + "\u00A0»"
        if (dist !== null && dist !== undefined && dist !== "") {
          question=question+' ('+dist+')'
        }
        setQuestion(question)

        const filteredconjfalse = conjfalse.filter(item => !conjtrue.includes(item));
    
        const rightansw=shuffle(conjtrue)[0]
        setRight(rightansw)
    
        const wrongansw=shuffle(filteredconjfalse).slice(0,8)
    
        wrongansw.push(rightansw)
        setAnswers(shuffle(wrongansw))
    
    
        setIsLoading("False")
        setError("")
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
    setAnswer(item)
  }
  
  useEffect(() => {
    if (answer === right) {
      setAccu(prevAccu => prevAccu + 1);
    }
  }, [answer]);

  const replay =  () => {
    setAnswers([])
    setAnswered('False')
    setQuestion()
    loadQuest()
    if (answer != right) {
      setAccu(0)
    }
  }


  useEffect(() => {
    if (variety !== null && group !== null && time !== null) {
      replay()
    }
  }, [group, time, variety]);


  useEffect(() => {
    setAccu(0)
  }, []);
  

  const calculateFontSize = (textLength) => {
    // Ajoutez votre propre logique pour calculer la taille de la police en fonction de la longueur du texte
    // Par exemple, vous pouvez définir une relation entre la longueur du texte et la taille de la police souhaitée
    const baseFontSize = 14; // Taille de police de base
    const maxLength = 10; // Longueur maximale du texte
    const scaleFactor = Math.min(1, maxLength / textLength); // Facteur d'échelle basé sur la longueur du texte
    return baseFontSize * scaleFactor; // Taille de police calculée
  };

  // Composant d'élément à l'intérieur de la FlatList
  const ItemContent = ({ item, onLayout, index }) => {

    const fs = calculateFontSize(item.length)


    
    if (answered === 'False') {
      return (
        <TouchableOpacity
          onPress={() => answering(item)}
        >
          <Text style={[commonStyles.questiontext, { fontSize: fs }]}>{item}</Text>
        </TouchableOpacity>
      );

    }else{
      return (
      <TouchableOpacity>
        <Text style={[commonStyles.questiontext, { fontSize: fs }]}>{item}</Text>
      </TouchableOpacity>
      );

    }
  };



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
            <RNPickerSelect
              onValueChange={(value) => saveVariety(value)}
              value={variety}
              items={[
                { label: "occitan gascon", value: "gascon" },
                { label: "occitan lemosin", value: "lemosin" },
                { label: "occitan lengadocian", value: "lengadoc" },
                { label: "occitan provençal", value: "provenc" },
              ]}
              style={{
                inputIOS: {
                  ...commonStyles.pickervar,
                  ...commonStyles.textvar,
                  paddingLeft: 12,
                },
                inputAndroid: {
                  ...commonStyles.pickervar,
                  ...commonStyles.textvar,
                  paddingLeft: 12,
                },
                placeholder: {
                  color: "#454545",
                },
              }}
              useNativeAndroidPickerStyle={false}
            />
            </View>
            <View style={commonStyles.pickerlabel}>
              <Text style={[commonStyles.textpicker]}>Grop&nbsp;:</Text>
            <RNPickerSelect
              onValueChange={(value) => setGroup(value)}
              value={group}
              items={[
                { label: "totes", value: "all" },
                { label: "primièr", value: "1" },
                { label: "segond", value: "2" },
                { label: "tresen", value: "3" },
                { label: "sens grop", value: "0" },
              ]}
              style={{
                inputIOS: {
                  ...commonStyles.pickervar,
                  ...commonStyles.textvar,
                  paddingLeft: 12,
                },
                inputAndroid: {
                  ...commonStyles.pickervar,
                  ...commonStyles.textvar,
                  paddingLeft: 12,
                },
                placeholder: {
                  color: "#454545",
                },
              }}
              useNativeAndroidPickerStyle={false}
            />
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
          <Text style={[commonStyles.help_text]}>Vos cal metre cada forma (dins los blòcs violets) sus lo quadre que correspond a sa persona. Podètz causir de trabalhar sus un grop especific o per una varietat especifica en clicant sus l'icòna dels paramètres.</Text>
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

            <Text style={[commonStyles.subtitle_conj]}>{question}</Text>



            <View style={commonStyles.contnv}>
              <View style={commonStyles.centered}>
                <FlatList
                  data={answers}
                  renderItem={({ item }) => (



                    
                    
                    <View style={[
                      commonStyles.itemnv,
                      answered === 'True' && commonStyles.neutral,
                      item === answer && item !== right && answered === 'True' && commonStyles.wrong,
                      item === answer && item === right && answered === 'True' && commonStyles.right,
                      item !== answer && item === right && answered === 'True' && commonStyles.good,
                    ]}>
                      <ItemContent
                        item={item}
                      />

                    
                    </View>
                  )}
                  keyExtractor={(item, index) => index.toString()}
                  numColumns={3} // Afficher 3 items par ligne
                />
              </View>
            </View>
            {answered === 'True' ? (
            <View>
              <View style={commonStyles.buttons}>
                <TouchableOpacity style={commonStyles.button_votz} onPress={() => replay()}>
                  <Text style={commonStyles.button_text}>Tornar jogar</Text>
                </TouchableOpacity>
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





export default QuizzForm;
