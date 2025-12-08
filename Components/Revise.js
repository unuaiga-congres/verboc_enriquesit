// Components/Revise.js

import Layout from '../Template/Layout';
import { View, TouchableOpacity, Text } from 'react-native'


import commonStyles from '../Template/commonStyles';


const Revise = function ({ navigation, route }) {




  return (

    

    <Layout>

          <View>
              <TouchableOpacity style={[commonStyles.button_votz, commonStyles.margintop]} onPress={() => navigation.navigate('Modèles')}>
                <Text style={commonStyles.button_text}>Vèrbes modèles</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[commonStyles.button_votz, commonStyles.margintop]} onPress={() => navigation.navigate('Vèrbes irregulars')}>
                <Text style={commonStyles.button_text}>Vèrbes irregulars</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[commonStyles.button_votz, commonStyles.margintop]} onPress={() => navigation.navigate('Vèrbes favorits')}>
                <Text style={commonStyles.button_text}>Vèrbes favorits</Text>
              </TouchableOpacity>
          </View>
        </Layout>




  );
};





export default Revise;
