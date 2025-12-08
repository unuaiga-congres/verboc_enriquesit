// App.js

import React from 'react'
import { Linking, Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { SoundProvider } from './Contexts/SoundContext';
import { SettingsProvider } from './Contexts/SettingsContext';
import HomeScreen from './Components/Home';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Credits from './Components/Credits';
import Creditsfr from './Components/Creditsfr';
import ListModels from './Components/ListModels';
import ConjugationsScreen from './Components/Conjugation';
import Quizz from './Components/Quizz';
import Revise from './Components/Revise';
import ListIrreg from './Components/ListIrreg';
import ListFavoris from './Components/ListFavoris';
import QuizzForm from './Components/Games/QuizzForm';
import QuizzConj from './Components/Games/QuizzConj';
import QuizzAlt from './Components/Games/QuizzAlt';
import QuizzTemps from './Components/Games/QuizzTemps';
import QuizzPers from './Components/Games/QuizzPers';
import QuizzOrdre from './Components/Games/QuizzOrdre';
import QuizzAnagramme from './Components/Games/QuizzAnagramme';
import { SafeAreaView } from 'react-native-safe-area-context';



const Stack = createStackNavigator();

const PERSISTENCE_KEY = 'NAVIGATION_STATE_V1';

function App() {
  const [isReady, setIsReady] = React.useState(false);
  const [initialState, setInitialState] = React.useState();


  React.useEffect(() => {
    const restoreState = async () => {
      console.log('trying to restore state')
      try {
        const initialUrl = await Linking.getInitialURL();

        if (Platform.OS !== 'web' && initialUrl == null) {
          // Only restore state if there's no deep link and we're not on web
          const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
          const state = savedStateString ? JSON.parse(savedStateString) : undefined;
          console.log('getting state : ' + state)
          if (state !== undefined) {
            setInitialState(state);
          }
        }
      } finally {
        setIsReady(true);
      }
    };

    if (!isReady) {
      restoreState();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return (
    <SettingsProvider>
    <SoundProvider>
      <SafeAreaView style={{flex:1}}>
        <NavigationContainer
          initialState={initialState}
          onStateChange={(state) =>
            AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state))
          }
        >
          <Stack.Navigator  screenOptions={{headerShown: false}}>
            <Stack.Screen name="Vèrbòc" component={HomeScreen} />
            <Stack.Screen name="Revisar" component={Revise} />
            <Stack.Screen name="Modèles" component={ListModels} />
            <Stack.Screen name="Vèrbes irregulars" component={ListIrreg} />
            <Stack.Screen name="Vèrbes favorits" component={ListFavoris} />
            <Stack.Screen name="Conjugations" component={ConjugationsScreen} />
            <Stack.Screen name="Quizz" component={Quizz} />
            <Stack.Screen name="Quizz formas" component={QuizzForm} />
            <Stack.Screen name="Quizz conjugason" component={QuizzConj} />
            <Stack.Screen name="Quizz alternància" component={QuizzAlt} />
            <Stack.Screen name="Quizz temps" component={QuizzTemps} />
            <Stack.Screen name="Quizz personas" component={QuizzPers} />
            <Stack.Screen name="Quizz òrdre" component={QuizzOrdre} />
            <Stack.Screen name="Quizz anagrama" component={QuizzAnagramme} />
            <Stack.Screen name="Informacions" component={Credits} />
            <Stack.Screen name="Informations" component={Creditsfr} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SoundProvider>
    </SettingsProvider>
  );
}

export default App;