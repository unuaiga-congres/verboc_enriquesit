// Template/DisplaySound.js
import { useSound } from '../Contexts/SoundContext';
import { TouchableOpacity, Image } from 'react-native'

import commonStyles from './commonStyles';

import { getAudioFromApi } from '../API/VotzApi'
import Sound from 'react-native-sound';

export const DisplaySound = ({ index, variety }) => {
    const { setIsLoadingSound } = useSound();

    const PlaySound =  (index, variety) => {
      //si le son n'existe pas déjà
      //On le récupère via Votz
      setIsLoadingSound("true")
      if (variety=='gascon') {
        var varvotz="gascon" ;
      }else if (variety=='lengadoc') {
        var varvotz="languedoc" ;
      }else{
        var varvotz="" ;
      }
      if (varvotz!="") {
        getAudioFromApi(index, varvotz).then(data => {
          setIsLoadingSound("false")
          const sound = new Sound(data, Sound.MAIN_BUNDLE, (error) => {
            if (error) {
              console.log('failed to load the sound', error);
              return;
            }else{
              console.log('sound loaded', error);
              //On joue le son
              sound.play(success => {
                if (success) {
                  console.log('played 1')
                } else {
                  console.log('not played 1')
                }
                sound.release();
              });
            }
          });
  
        });
      
      }
      
      
    
    }



    return (
      <TouchableOpacity style={commonStyles.button_listen} onPress={() => PlaySound(index, variety)}>
        <Image style={commonStyles.listen} source={require('../Images/listen.png')} />
      </TouchableOpacity>
    )
  };