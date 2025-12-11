import { useSound } from '../Contexts/SoundContext';
import { TouchableOpacity, Image } from 'react-native';
import commonStyles from './commonStyles';
import { getAudioFromApi } from '../API/VotzApi';
import TrackPlayer from 'react-native-track-player';
import RNFS from 'react-native-fs';

// Initialisation du player (à faire UNE SEULE FOIS dans l'app)
let isPlayerSetup = false;
const setupPlayerOnce = async () => {
  if (!isPlayerSetup) {
    await TrackPlayer.setupPlayer();
    isPlayerSetup = true;
  }
};

export const DisplaySound = ({ index, variety }) => {
  const { setIsLoadingSound } = useSound();

  const PlaySound = async (index, variety) => {
    console.log('PlaySound');
    setIsLoadingSound("true");

    let varvotz = '';
    if (variety === 'gascon') varvotz = 'gascon';
    else if (variety === 'lengadoc') varvotz = 'languedoc';
    if (!varvotz) {
      setIsLoadingSound("false");
      return;
    }

    try {
      const url = await getAudioFromApi(index, varvotz);
      const localPath = `${RNFS.CachesDirectoryPath}/sound_${index}_${varvotz}.mp3`;

      // Télécharger le fichier si besoin
      await RNFS.downloadFile({
        fromUrl: url,
        toFile: localPath,
      }).promise;

      // Initialiser TrackPlayer
      await setupPlayerOnce();
      await TrackPlayer.reset(); // supprime toute ancienne piste
      await TrackPlayer.add({
        id: 'sound1',
        url: `file://${localPath}`, // <-- utiliser le chemin local
        title: index,
        artist: 'Votz',
      });
      
      await TrackPlayer.play(); // lancer la lecture

      // Supprimer le fichier après lecture
      TrackPlayer.addEventListener('playback-queue-ended', async () => {
        try { await RNFS.unlink(localPath); } catch(e) { console.log('Erreur suppression fichier', e); }
      });

    } catch (err) {
      console.log("Erreur play sound", err);
    } finally {
      setIsLoadingSound("false");
    }
  };

  return (
    <TouchableOpacity style={commonStyles.button_listen} onPress={() => PlaySound(index, variety)}>
      <Image style={commonStyles.listen} source={require('../Images/listen.png')} />
    </TouchableOpacity>
  );
};
