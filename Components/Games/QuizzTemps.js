// Components/Games/QuizzTemps.js

import Layout from '../../Template/Layout';
import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, View, TouchableOpacity, Image, Text, ActivityIndicator, Animated } from 'react-native'
import {Picker} from "@react-native-picker/picker";
import RNPickerSelect from "react-native-picker-select";
import { getRandomFormTimes, getInfosFromForm } from '../../API/VerbocApi'
import { Easing } from 'react-native';
import { useSettings } from '../../Contexts/SettingsContext';



import commonStyles from '../../Template/commonStyles';

import fallStyles from '../../Template/fallStyles';

import timesList from '../../Datasets/Times.js';



const QuizzTemps = function ({ navigation, route }) {


  const [group, setGroup] = useState("all");
  const [score, setScore] = useState(0);
  const [falling, setFalling] = useState(false);
  const [lost, setLost] = useState(false);
  const [fallingForm, setFallingForm] = useState([]);
  const [fallingLabel, setFallingLabel] = useState('...');
  const fallAnimation = useRef(new Animated.Value(0)).current;
  const [times, setTimes] = useState([]);
  const [fallingFrameHeight, setFallingFrameHeight] = useState(0);
  const [fallingHeight, setFallingHeight] = useState(0);
  const [fallingObjectHeight, setFallingObjectHeight] = useState(0);
  const [duration, setDuration] = useState(12000);
  const [isLoading, setIsLoading] = useState("False");
  const [error, setError] = useState("");
  const [isMounted, setIsMounted] = useState(true);
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

  useEffect(() => {
    if (variety !== null && group !== null && duration !== null) {
      resetGame()
    }
  }, [group, variety, duration]);
  
  const getTimes = async () => {
    times_shuffled=shuffle(timesList)
    const fourTimes = times_shuffled.slice(0, 4);
    const newTimes = fourTimes.map(infos => ({
        aff: infos["aff"],
        mod: infos["mod"],
        tns: infos["tns"]
    }));
    setTimes(newTimes);
  };


  const startFalling = async () => {
    //On choisit un des 4 temps au hasard
    timeshuffled=shuffle(times)
    inftime=timeshuffled[0]
    fallAnimation.setValue(0);

    //On récupère une nouvelle forme
    setFallingForm([])
    setFallingLabel("...")

    //On récupère une forme au hasard via l'API
    getRandomFormTimes(inftime["tns"], inftime["mod"], variety, group).then(data => {
      if (!data) {
        setIsLoading("False")
        setError("Error pendent la recèrca de forma. Verificatz vòstra connexion Internet.1")
      }else if ('query' in data) {
        if (data['query'].length > 0) {
          var infos=data['query'][0]

          //On recherche les bonnes réponses possibles
          getInfosFromForm(infos["form"], variety).then(datform => {

            if (!datform) {
              setIsLoading("False")
              setError("Error pendent la recèrca de forma. Verificatz vòstra connexion Internet.2")
            }else if ('query' in datform) {
              answok=[]
              for (var num in datform['query']) {
                var infos=datform['query'][num]
                var modform=infos["mod"]
                var tnsform=infos["tns"]
                
                answok.push(modform+'-'+tnsform)

              }
              setFallingForm(answok)

              setFallingLabel(infos["form"])
              setFalling(true);

              if (fallingHeight == 0) {
                setFallingHeight(fallingFrameHeight)
                var heightfall=fallingFrameHeight
              }else{
                var heightfall=fallingHeight
              }
              console.log('heightfall : '+heightfall)

              Animated.timing(fallAnimation, {
                toValue: heightfall,
                duration: duration,
                easing: Easing.linear,
                useNativeDriver: true,
              }).start(({ finished }) => {
                if (finished && isMounted) {
                  setFalling(false);
                  gameOver();
                }
              });
              setIsLoading("False")
            }else{
              setIsLoading("False")
              setError("Cap de forma es pas estada trobada. Contactatz los administrators de l'aplicacion.")
            }
          
          })



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


  const launchGame = () => {
    setIsLoading("True")
    setLost(false)
    fallAnimation.setValue(0);
    setScore(0)
    getTimes();
    setParamVis('hidden')
    setHelpVis('hidden')
  };

  const resetGame = () => {
    fallAnimation.setValue(0);
    setFalling(false);
    setFallingLabel('...')
    setLost(false);
  };

  const gameOver = () => {
    setLost(true)
  };


  const onButtonPress = (time) => {
    if (falling) {
      if (fallingForm.includes(time["mod"]+'-'+time["tns"])) {
        setScore(score + 1);
        startFalling()
      }else{
        resetGame(false);
        gameOver();
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setFalling(false)
      setLost(false)
    };
    return () => {
      setIsMounted(false);fallingFrameHeight
    };
  
    fetchData();
  }, []); // Initial fetch
  
  
  useEffect(() => {
    console.log(fallingHeight)
    startFalling();
  }, [times]); // Run getForms when times is updated
  
  useEffect(() => {
    
  }, [lost]);
  
  
  const displayButton = () => {
    if (lost) {

      return (
        <View style={commonStyles.allwidth}>
          <Text style={fallStyles.lost}>Mancat !</Text>
          <Text style={fallStyles.lost}>Vòstre escòre es {score}</Text>
          <View style={fallStyles.conttemps}>
            <TouchableOpacity style={commonStyles.button_votz} onPress={launchGame}>
              <Text style={commonStyles.button_text}>Tornar jogar</Text>
            </TouchableOpacity>
          </View>
          <View style={fallStyles.conttemps}>
              {times.map((time, index) => (
                  <TouchableOpacity 
                      key={index} 
                      style={[
                        commonStyles.button_votz,
                        styles.buttonTime,
                        fallingForm.includes(`${time.mod}-${time.tns}`) && commonStyles.right
                      ]}
                      onPress={() => onButtonPress(time)}
                  >
                      <Text style={commonStyles.button_text}>{time.aff.replace(/ /g, '\n')}</Text>
                  </TouchableOpacity>
              ))}
          </View>
        </View>
      )
    }else if (falling) {

      return (
        <View style={fallStyles.conttemps}>
            {times.map((time, index) => (
                <TouchableOpacity 
                    key={index} 
                    style={[commonStyles.button_votz, styles.buttonTime]} 
                    onPress={() => onButtonPress(time)}
                >
                    <Text style={commonStyles.button_text}>{time.aff.replace(/ /g, '\n')}</Text>
                </TouchableOpacity>
            ))}
        </View>
      )
    }else{

      return (
        <View style={commonStyles.allwidth}>
          {isLoading === "False" && (
          <View style={fallStyles.conttemps}>
            <TouchableOpacity style={commonStyles.button_votz} onPress={launchGame}>
              <Text style={commonStyles.button_text}>Jogar</Text>
            </TouchableOpacity>
          </View>
          )}
          <View style={fallStyles.conttemps}>
            <TouchableOpacity style={[commonStyles.button_votz, styles.buttonTime]}>
                    <Text style={commonStyles.button_text}>{"\n"}</Text>
              </TouchableOpacity>
            <TouchableOpacity style={[commonStyles.button_votz, styles.buttonTime]}>
                    <Text style={commonStyles.button_text}>{"\n"}</Text>
              </TouchableOpacity>
            <TouchableOpacity style={[commonStyles.button_votz, styles.buttonTime]}>
                    <Text style={commonStyles.button_text}>{"\n"}</Text>
              </TouchableOpacity>
            <TouchableOpacity style={[commonStyles.button_votz, styles.buttonTime]}>
                    <Text style={commonStyles.button_text}>{"\n"}</Text>
              </TouchableOpacity>
          </View>
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
            <Text style={[commonStyles.textpicker]}>Velocitat&nbsp;:</Text>
            <RNPickerSelect
              onValueChange={(value) => setDuration(value)}
              value={duration.toString()}
              items={[
                { label: "lenta", value: "18000" },
                { label: "mejana", value: "12000" },
                { label: "rapida", value: "6000" },
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
          <Text style={[commonStyles.help_text]}>Vos cal clicar sul boton que correspond al temps de la forma que tomba, abans qu'aja acabat sa casuda. Podètz causir de trabalhar sus un grop especific o per una varietat especifica, e tanben fixar la velocitat de la casuda en clicant sus l'icòna dels paramètres.</Text>
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
          <View style={fallStyles.container}>
            {isLoading=="False" ? null : 
              <View style={commonStyles.loading_container}>
                <ActivityIndicator color="#000000" size="large" />
              </View>}
            <View style={fallStyles.fallingFrame}
              onLayout={event => {
                const { height } = event.nativeEvent.layout;
                setFallingFrameHeight(height);
              }}>
            {falling && !lost && (
              <Animated.View style={[fallStyles.fallingObject, { transform: [{ translateY: fallAnimation }] }]} 
              onLayout={event => {
                const { height } = event.nativeEvent.layout;
                setFallingObjectHeight(height);
              }}>
                  <Text style={fallStyles.fallingText}>{fallingLabel}</Text>
              </Animated.View>
            )}
            </View>
            {displayButton()}
            {error=="" ? null : <Text style={commonStyles.text_error}>{ error }</Text>}
            <Text style={fallStyles.score}>Score: {score}</Text>
          </View>
          {displayParam()}


        </Layout>
  );
};




export default QuizzTemps;

const styles = StyleSheet.create({
  buttonTime: {
    width:'40%',
  },

});
