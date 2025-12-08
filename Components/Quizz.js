// Components/Quizz.js

import Layout from '../Template/Layout';
import { View, TouchableOpacity, Text } from 'react-native'

import commonStyles from '../Template/commonStyles';


const Quizz = function ({ navigation, route }) {




  return (

    

    <Layout>

          <View>
              <TouchableOpacity style={[commonStyles.button_votz, commonStyles.margintop]} onPress={() => navigation.navigate('Quizz temps')}>
                <Text style={commonStyles.button_text}>Trobar lo temps</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[commonStyles.button_votz, commonStyles.margintop]} onPress={() => navigation.navigate('Quizz personas')}>
                <Text style={commonStyles.button_text}>Trobar la persona</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[commonStyles.button_votz, commonStyles.margintop]} onPress={() => navigation.navigate('Quizz formas')}>
                <Text style={commonStyles.button_text}>Trobar la forma</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[commonStyles.button_votz, commonStyles.margintop]} onPress={() => navigation.navigate('Quizz conjugason')}>
                <Text style={commonStyles.button_text}>Trobar la conjugason</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[commonStyles.button_votz, commonStyles.margintop]} onPress={() => navigation.navigate('Quizz òrdre')}>
                <Text style={commonStyles.button_text}>Trobar l'òrdre</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[commonStyles.button_votz, commonStyles.margintop]} onPress={() => navigation.navigate('Quizz anagrama')}>
                <Text style={commonStyles.button_text}>Trobar l'anagrama</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[commonStyles.button_votz, commonStyles.margintop]} onPress={() => navigation.navigate('Quizz alternància')}>
                <Text style={commonStyles.button_text}>Vèrbes alternants</Text>
              </TouchableOpacity>
          </View>
        </Layout>
  );
};





export default Quizz;
