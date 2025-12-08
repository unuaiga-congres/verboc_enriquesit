// Components/Games/QuizzAlt.js

import Layout from '../../Template/Layout';
import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity, Image, Text, ActivityIndicator } from 'react-native'
import {Picker} from "@react-native-picker/picker";
import { useSettings } from '../../Contexts/SettingsContext';


import verbsalt from '../../Datasets/VerbsAlt';


import commonStyles from '../../Template/commonStyles';


const QuizzAlt = function ({ navigation, route }) {


  const [isLoading, setIsLoading] = useState("False");
  const [accu, setAccu] = useState(0);
  const [alt, setAlt] = useState("");
  const [aff, setAff] = useState("");
  const [inf, setInf] = useState([]);
  const [dist, setDist] = useState([]);
  const [answer, setAnswer] = useState("");
  const [answered, setAnswered] = useState("False");
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
    //On récupère tous les verbes de la variété
    const verbsvar=verbsalt[variety]
    verbs=[]
    for (vv in verbsvar) {
      infos=verbsvar[vv]
      let infverb=[infos['inf'], infos['alt'], infos['aff'], infos['dist']]
      verbs.push(infverb)
    }
    //On en choisit un au hasard
    verbs_shuffled=shuffle(verbs)
    verb=verbs_shuffled[0]


    setInf(verb[0])
    setAlt(verb[1])
    setAff(verb[2])
    setDist(verb[3])

    //On récupère sa conjugaison
    conjtrue=[]
    conjfalse=[]
  
  } 
  
  useEffect(() => {
  }, [answer]);

  const answering =  (item) => {
    setAnswered('True')
    setAnswer(item)
    if (item == alt) {
      setAccu(prevAccu => prevAccu + 1);
    }
  }

  const replay =  () => {
    if (answer != alt) {
      setAccu(0)
    }
    setAnswer([])
    setAnswered('False')
    loadQuest()
    
  }

  const displayRep = () => {
    if (answer==alt) {

      return (
          <View style={commonStyles.blocosca}>
            <View style={commonStyles.ligneosca}>
              <Image style={commonStyles.iconosca} source={require('../../Images/right.png')} />
              <Text style={commonStyles.osca}>Òsca, avètz rason !</Text>
            </View>
            {alt === '1' && (
              <Text style={commonStyles.textrep}>Lo vèrbe {inf} es alternant {aff}</Text>
            )}
            {alt !== '1' && (
              <Text style={commonStyles.textrep}>Lo vèrbe {inf} es pas alternant</Text>
            )}
          </View>
      )
    }else{

      return (
          <View style={commonStyles.blocosca}>
            <View style={commonStyles.ligneosca}>
              <Image style={commonStyles.iconosca} source={require('../../Images/wrong.png')} />
              <Text style={commonStyles.osca}>Mancat !</Text>
            </View>
            {alt === '1' && (
              <Text style={commonStyles.text}>Lo vèrbe {inf} es alternant {aff}</Text>
            )}
            {alt !== '1' && (
              <Text style={commonStyles.text}>Lo vèrbe {inf} es pas alternant</Text>
            )}
            <Text style={commonStyles.textcum}>Vòstre escòre es : {accu}</Text>
          </View>
      )
    }

  }



  useEffect(() => {
    loadQuest()
  }, []);
  




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
          <Text style={[commonStyles.help_text]}>Vos cal dire, pel vèrbe que vos es prepausat, se sa conjugason altèrna (è/ò a las personas 1, 2 e 3 del singular e 3 del plural, e/o a las autras) o se altèrna pas (e/o a totas las personas). La tòca es de comolar çò mai de bonas responsas possiblas a de reng. Podètz causir de trabalhar per una varietat especifica en clicant sus l'icòna dels paramètres.</Text>
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

          <Text style={[commonStyles.title_conj]}>
            {dist ? `${inf} (${dist})` : inf}
          </Text>
          
            <View>
              <TouchableOpacity style={commonStyles.button_rep} onPress={() => answering(1)}>
                <Text style={commonStyles.button_rep_text}>alternant {aff}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={commonStyles.button_rep} onPress={() => answering(0)}>
                <Text style={commonStyles.button_rep_text}>pas alternant</Text>
              </TouchableOpacity>

          </View>

            {answered === 'True' ? (
            <View>
              {displayRep()}
              <View style={commonStyles.buttons}>
                <TouchableOpacity style={[commonStyles.button_votz, commonStyles.margintop]} onPress={() => replay()}>
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





export default QuizzAlt;

