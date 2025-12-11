// Components/Games/QuizzAnagramme.js

import Layout from '../../Template/Layout';
import React, { useState, useEffect } from 'react'
import { StyleSheet, View, TouchableOpacity, Image, Text, ActivityIndicator } from 'react-native'
import {Picker} from "@react-native-picker/picker";
import RNPickerSelect from "react-native-picker-select";
import {getRandomForm } from '../../API/VerbocApi'
import { useSettings } from '../../Contexts/SettingsContext';


import commonStyles from '../../Template/commonStyles';

import conjs from '../../Datasets/ConjugationsCat';
import timesList from '../../Datasets/Times.js';


export default function AnagramGame() {
  const [group, setGroup] = useState("all");
  const [time, setTime] = useState("all");
  const [accu, setAccu] = useState(0);
  const [inf, setInf] = useState("");
  const [aff, setAff] = useState("");
  const [isLoading, setIsLoading] = useState("False");
  const [error, setError] = useState("");
  const [paramVis, setParamVis] = useState("hidden");
  const [helpVis, setHelpVis] = useState("hidden");
  const [answered, setAnswered] = useState("False");
  const [mess, setMess] = useState("");
  const [correct, setCorrect] = useState("");
  const [targetWord, setTargetWord] = useState('');
  const [availableLetters, setAvailableLetters] = useState([]);
  const [slots, setSlots] = useState([]);

  const { variety, saveVariety } = useSettings();



  const loadQuest =  () => {
    //On choisit une forme au hasard
    setError("")
    setIsLoading("True")

    //On récupère une forme au hasard via l'API
    if (time=='all'){
      tns='all'
      mod='all'
    }else{
      tns=timesList[time]['tns']
      mod=timesList[time]['mod']
    }
    getRandomForm(variety, group, tns, mod).then(data => {
      if (!data) {
        setIsLoading("False")
        setError("Error pendent la recèrca de forma. Verificatz vòstra connexion Internet.1")
      }else if ('query' in data) {
        if (data['query'].length > 0) {
          var formok=data['query'][0]["form"]
          setTargetWord(formok)
          setInf(data['query'][0]["inf"])
          var catform=data['query'][0]["cat"]
          //On récupère les informations affichées
          if (catform in conjs) {
            setAff(conjs[catform]["aff"])
          }
          const shuffled = formok
            .split('')
            .map((char, index) => ({ id: `${char}-${index}-${Math.random()}`, char }))
            .sort(() => Math.random() - 0.5);

          setAvailableLetters(shuffled);
          setSlots(Array(formok.length).fill(null));


          setIsLoading("False")


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
  
  const restart = () => {
    setAnswered("False")
    loadQuest()
  };
  
  const startNewGame = () => {
    setAnswered("False")
    loadQuest()
    setAccu(0)
  };

  useEffect(() => {
  }, []); 

  useEffect(() => {
    if (variety !== null && group !== null && time !== null) {
    startNewGame()
    }
  }, [group, time, variety]);

  const handleLetterPress = (letterObj) => {
    const { id, char } = letterObj;
  
    // Est-ce que cette lettre est déjà dans les slots ?
    const slotIndex = slots.findIndex(l => l && l.id === id);
  
    if (slotIndex !== -1) {
      // Elle est dans un slot, on la retire
      const newSlots = [...slots];
      newSlots[slotIndex] = null;
      setSlots(newSlots);
      setAvailableLetters([...availableLetters, letterObj]);
    } else {
      // Elle est dans la zone du haut, on cherche un slot vide
      const firstEmptyIndex = slots.findIndex(l => l === null);
      if (firstEmptyIndex !== -1) {
        const newSlots = [...slots];
        newSlots[firstEmptyIndex] = letterObj;
        setSlots(newSlots);
        setAvailableLetters(availableLetters.filter(l => l.id !== id));
      }
    }
  };

  const handleValidate = () => {
    setAnswered("True")
    setMess('Mancat !')
    const userWord = slots.map(l => l?.char || '').join('');
    if (userWord === targetWord) {
      setCorrect("True");
      setAccu(prevAccu => prevAccu + 1);
      setMess('Òsca !')
    } else {
      setCorrect("False");
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
          <View style={commonStyles.pickerlabel}>
            <Text style={[commonStyles.textpicker]}>Temps&nbsp;:</Text>
            <RNPickerSelect
              onValueChange={(value) => setTime(value)}
              value={time}
              items={[
                { label: "totes", value: "all" },
                ...timesList.map((item, index) => ({
                  label: item.aff,
                  value: index,
                })),
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
          <Text style={[commonStyles.help_text]}>Vos cal clicar sus las letras dins lo bon òrdre per formar un mot qu'es una forma conjugada del vèrbe que ne vos balham l'infinitiu. Podètz causir de trabalhar sus un grop especific, per una varietat especifica o per un temps especific en clicant sus l'icòna dels paramètres.</Text>
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
    <View style={styles.container}>
    {error=="" ? null : <Text style={commonStyles.text_error}>{ error }</Text>}
          {isLoading=="False" ? null : 
            <View style={commonStyles.loading_container}>
              <ActivityIndicator color="#000000" size="large" />
            </View>}
            {inf=="" ? null : <Text style={[commonStyles.subtitle_text]}>Forma conjugada de « {inf} »</Text>}

        <View style={styles.anagramContainer}>
          <View style={styles.lettersContainer}>
          {availableLetters.map((letterObj) => (
            <TouchableOpacity
              key={letterObj.id}
              style={styles.letterBox}
              onPress={() => handleLetterPress(letterObj)}
            >
              <Text style={styles.letterText}>{letterObj.char}</Text>
            </TouchableOpacity>
          ))}
          </View>

          <View style={styles.slotsContainer}>
          {slots.map((letterObj, index) => (
            <TouchableOpacity
              key={index}
              style={styles.slotBox}
              onPress={() => letterObj && handleLetterPress(letterObj)}
            >
              <Text style={styles.slotText}>{letterObj ? letterObj.char : ''}</Text>
            </TouchableOpacity>
          ))}
          </View>

          {answered === 'False' ? (
          <TouchableOpacity style={commonStyles.button_votz} onPress={handleValidate}>
            <Text style={commonStyles.button_text}>Valider</Text>
          </TouchableOpacity>
          ) : null}

          {answered === 'True' ? (
            <View>
              <Text style={commonStyles.textcum}>{mess}</Text>
              <Text style={commonStyles.textcum}>
                  La bona responsa èra : {targetWord}
                </Text>
              <Text style={commonStyles.textcum}>
                  {aff} de « {inf} »
                </Text>
              <View style={[commonStyles.buttons, commonStyles.margintop]}>
              {correct === 'True' ? (
                <TouchableOpacity style={commonStyles.button_votz} onPress={() => restart()}>
                  <Text style={commonStyles.button_text}>Tornar jogar</Text>
                </TouchableOpacity>
                ) : (
                  <TouchableOpacity style={commonStyles.button_votz} onPress={() => startNewGame()}>
                    <Text style={commonStyles.button_text}>Tornar jogar</Text>
                  </TouchableOpacity>
              )}
              </View>
            </View>
          ) : null}

        </View>

        
    </View>
        <View style={commonStyles.respCum}>
        <Text style={commonStyles.suivicum}>Bonas responsas cumuladas : {accu}</Text>
        </View>
        {displayParam()}
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  anagramContainer: {
    marginTop:10,
  },
  lettersContainer: {
    flexDirection: 'row',
    justifyContent: 'left',
    flexWrap: 'wrap',
    marginBottom: 40,
    gap: 10,
  },
  slotsContainer: {
    flexDirection: 'row',
    justifyContent: 'start',
    flexWrap: 'wrap',
    marginBottom: 30,
  },
  letterBox: {
    width: 35,
    height: 35,
    backgroundColor: '#6d29db',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#43168c',
    margin: 5,
    borderRadius: 5,
  },
  slotBox: {
    width: 35,
    height: 35,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
    borderWidth: 2,
    borderColor: '#43168c',
    borderRadius: 5,
  },
  letterText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  slotText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#43168c',
  },
});
