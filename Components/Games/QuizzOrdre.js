// Components/Games/QuizzOrdre.js

import Layout from '../../Template/Layout';
import React, { useState, useEffect } from 'react'
import { StyleSheet, View, TouchableOpacity, Image, Text, ActivityIndicator, Dimensions } from 'react-native'
import {Picker} from "@react-native-picker/picker";
import { getRandomTimes } from '../../API/VerbocApi'
import 'react-native-gesture-handler'
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import { useSettings } from '../../Contexts/SettingsContext';

import commonStyles from '../../Template/commonStyles';

import timesList from '../../Datasets/Times.js';


const DraggableItem = ({id, label, initialX, initialY, onDragEnd, targets, activeItemId, setActiveItemId }) => {
  const translateX = useSharedValue(initialX);
  const translateY = useSharedValue(initialY);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
      zIndex: id === activeItemId ? 100 : 0,
    };
  });

  // Effet pour réinitialiser les valeurs lors de la modification des props
  React.useEffect(() => {
    translateX.value = withSpring(initialX);
    translateY.value = withSpring(initialY);
  }, [id]);
  
  const gestureHandler = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      ctx.startX = translateX.value;
      ctx.startY = translateY.value;
      runOnJS(setActiveItemId)(id);
    },
    onActive: (event, ctx) => {
      translateX.value = ctx.startX + event.translationX;
      translateY.value = ctx.startY + event.translationY;
    },
    onEnd: () => {
      let snapped = false;
      let finalX = translateX.value;
      let finalY = translateY.value;
    
      for (let target of targets) {
        const dx = finalX - target.x;
        const dy = finalY - target.y;
    
        if (Math.abs(dx) < 40 && Math.abs(dy) < 40) {
          // Snap to this target
          translateX.value = withSpring(target.x);
          translateY.value = withSpring(target.y);
          finalX = target.x;
          finalY = target.y;
          runOnJS(onDragEnd)(id, target.x, target.y);
          snapped = true;
          break;
        }
      }
    
      if (!snapped) {
        runOnJS(onDragEnd)(id, translateX.value, translateY.value);
      }
    },
  });

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={[styles.item, animatedStyle]}>
        <Text style={styles.itemText}>{label}</Text>
      </Animated.View>
    </PanGestureHandler>
  );
};

const QuizzOrdre = function ({ navigation, route }) {


  const [group, setGroup] = useState("all");
  const [time, setTime] = useState("all");
  const [right, setRight] = useState("");
  const [answer, setAnswer] = useState("");
  const [conj, setConj] = useState([]);
  const [answered, setAnswered] = useState("False");
  const [accu, setAccu] = useState(0);
  const [items, setItems] = useState([]);
  const [mess, setMess] = useState("");
  const [correct, setCorrect] = useState("");
  const [inf, setInf] = useState("");
  const [aff, setAff] = useState("");
  const [isLoading, setIsLoading] = useState("False");
  const [error, setError] = useState("");
  const [paramVis, setParamVis] = useState("hidden");
  const [helpVis, setHelpVis] = useState("hidden");
  const [activeItemId, setActiveItemId] = useState(null);

  const { variety, saveVariety } = useSettings();


  function shuffle(array) {

    let shuffled = array
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value)
    return shuffled
  }



  useEffect(() => {
    if (variety !== null && group !== null && time !== null) {
      replay()
    }
  }, [variety, group, time]);

  useEffect(() => {
    if (variety !== null && group !== null && time !== null && answered === 'False') {
      loadQuest();
    }
  }, [variety, group, time, answered]);
  
  const loadQuest =  () => {
    setIsLoading("True")
    setItems([])


    //On choisit un temps au hasard s'il n'y en a pas de sélectionné
    if (time=="all") {
      const randIndexConjs = Math.floor(Math.random() * timesList.length);
      timok=timesList[randIndexConjs]
    }else{
      timok=timesList[time]
    }
    setAff(timok["aff"])

    //On récupère un verbe correspondant à ce temps
    getRandomTimes(timok["tns"], timok["mod"], variety, group).then(data => {
      if (!data) {
        setIsLoading("False")
        setError("Error pendent la recèrca de forma. Verificatz vòstra connexion Internet.1")
      }else if ('query' in data) {
        conjtrue=[]
        repord=[]
        prevy=-30
        prevyq=400
        prevper="0 sg"
        cumpers=0
        resty=[20, 70, 120, 170, 220, 270]
        resty_shuffled=shuffle(resty)
        cpt=0
        const windowWidth = Dimensions.get('window').width
        const result = (windowWidth / 2)
        for (var num in data['query']) {
          var infos=data['query'][num]
          if (prevper!=infos['per']+' '+infos['num']){
            nvy=prevy+50
            nvyq=prevyq+50
            nvx=10
            nvxq=10
            cumpers=0
            if (cpt < resty_shuffled.length) {
              yquest=resty_shuffled[cpt]
            }else{
              yquest=320
            }
            cpt=cpt+1
            conjtrue.push({ id: cpt+'_'+Date.now(), label: infos['form'], labelq:infos['per']+' '+infos['num'], initialX: result, initialY: yquest, correctX: 0, correctY: nvy })
            repord.push(infos['form'])
            setInf(infos["inf"])
            prevy=nvy
            prevyq=nvyq
            prexy=nvx
            prevxq=nvxq
            prevper=infos['per']+' '+infos['num']
          }
        }
        setItems(conjtrue)
        setConj(conjtrue)
        setRight(repord.join(', '))
    
    
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

  const replay =  () => {
    setAnswered('False')
    setInf('')
    if (correct != "True") {
      setAccu(0)
    }
  } 


  const answering =  (item) => {
    setAnswered('True')
    setAnswer(item)
  }
  
  useEffect(() => {
  }, [items]);

  
  useEffect(() => {
    setAnswered('False')
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


  const onDragEnd = (id, x, y) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, currentX: x, currentY: y } : item
      )
    );
  };

  const checkPositions = () => {
    setAnswered("True");
    setMess('Mancat !');
  
    // On récupère les items triés selon leur position Y (ascendante)
    const sortedItems = [...items].sort((a, b) => {
      const yA = a.currentY ?? a.initialY;
      const yB = b.currentY ?? b.initialY;
      return yA - yB;
    });
  
    // On récupère les bons labels attendus depuis conj
    const expectedLabels = conj.map(item => item.label);
  
    // On vérifie si l'ordre des labels dans sortedItems correspond exactement à conj
    const allCorrect = sortedItems.every((item, index) => item.label === expectedLabels[index]);
  
    if (allCorrect) {
      setCorrect("True");
      setAccu(prevAccu => prevAccu + 1);
      setMess('Òsca !');
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
            <View style={commonStyles.pickerlabel}>
              <Text style={[commonStyles.textpicker]}>Temps&nbsp;:</Text>
              <Picker
                style={commonStyles.pickerlanguage}
                selectedValue={time}
                onValueChange={(itemValue, itemIndex) => setTime(itemValue)}
              >
                <Picker.Item label="totes" value="all" />
                {timesList.map((item, index) => (
                  <Picker.Item
                    key={index}
                    label={item.aff}
                    value={index}
                  />
                ))}
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
      <Text style={[commonStyles.help_text]}>Vos cal metre cada forma (dins los blòcs violets) sus lo quadre que correspond a sa persona. Podètz causir de trabalhar sus un grop especific, per una varietat especifica o per un temps especific en clicant sus l'icòna dels paramètres.</Text>
    </View>
    )
    }else{
      return (
        <View style={commonStyles.cadreparam}>
          <View style={commonStyles.iconsparam}>
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
      {error=="" ? null : <Text style={commonStyles.text_error}>{ error }</Text>}
      {isLoading=="False" ? null : 
        <View style={commonStyles.loading_container}>
          <ActivityIndicator color="#000000" size="large" />
        </View>}

      {inf=="" ? null : <Text style={[commonStyles.subtitle_text]}>{inf} : {aff}</Text>}
      
    <GestureHandlerRootView style={styles.gestureHandlerRootView}>
      <View style={styles.container}>
        {items.map((item) => (
          <View
            key={item.id}
            style={[
              styles.target,
              {
                left: item.correctX,
                top: item.correctY,
              },
            ]}
          >
            <Text style={styles.target_text}>
              {item.labelq}
            </Text>
          </View>

        ))}
        {items.map((item) => (
          <DraggableItem
            key={item.id}
            id={item.id}
            label={item.label}
            initialX={item.initialX}
            initialY={item.initialY}
            onDragEnd={onDragEnd}
            targets={items.map((item) => ({
              x: item.correctX,
              y: item.correctY,
              id: item.id,
            }))}
            activeItemId={activeItemId}
            setActiveItemId={setActiveItemId}
          />
        ))}
      </View>
      {answered === 'False' ? (
      <View>
        <TouchableOpacity onPress={() => checkPositions()} style={[commonStyles.button_votz]}>
          <Text style={[commonStyles.button_text]}>Validar</Text>
        </TouchableOpacity>
      </View>
      ) : null}

      {answered === 'True' ? (
            <View style={commonStyles.blocosca}>
              <Text style={commonStyles.textcum}>{mess}</Text>
              <Text style={commonStyles.textcum}>
                  La bona responsa èra : {right}
                </Text>
              <View style={[commonStyles.buttons, commonStyles.margintop]}>
                <TouchableOpacity style={commonStyles.button_votz} onPress={() => replay()}>
                  <Text style={commonStyles.button_text}>Tornar jogar</Text>
                </TouchableOpacity>
              </View>
            </View>
              ) : null}




    </GestureHandlerRootView>

    <View style={commonStyles.respCum}>
    <Text style={commonStyles.suivicum}>Bonas responsas cumuladas : {accu}</Text>
        </View>
        {displayParam()}
    </Layout>
  );
};




export default QuizzOrdre;

const styles = StyleSheet.create({
  gestureHandlerRootView: {
    flex: 1,
  },
  container: {
    flex: 1,
    position: 'relative', // Important pour que les positions absolues soient relatives à ce conteneur
  },
  target: {
    position: 'absolute',
    width: '47%',
    height: 35,
    borderRadius: 10,
    borderColor: '#43168c',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  target_text: {
    fontSize: 18,
    color:'#43168c55'
  },
  item: {
    width: '47%',
    height: 35,
    backgroundColor: '#6d29db',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    position: 'absolute', // Positionner les étiquettes de manière absolue
  },
  itemText: {
    fontSize: 18,
    color: '#fff',
  },
  result: {
    marginTop: 20,
    fontSize: 18,
    color: '#333',
  },

});
