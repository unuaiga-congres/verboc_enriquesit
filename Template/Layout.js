// Template/Layout.js

import React, { useState } from 'react';
import { View, TouchableOpacity, Image, Text, KeyboardAvoidingView, Dimensions, TouchableWithoutFeedback, Linking } from 'react-native'
import {HideWithKeyboard} from 'react-native-hide-with-keyboard';
import { useNavigation, useRoute } from '@react-navigation/native';


import commonStyles from './commonStyles';



export default function Layout({ children }) {
  const navigation = useNavigation();
  const route = useRoute();

  const currentRoute = route.name;

  const [menuVisible, setMenuVisible] = useState(false);
  const screenWidth = Dimensions.get('window').width;
  const menuWidth = screenWidth * 5 / 6;

  const routeTitles = {
    'Vèrbòc': "Cercar un vèrbe",
    'Revisar': "Apréner",
    'Modèles': "Modèles",
    'Vèrbes irregulars': "Vèrbes irregulars",
    'Vèrbes favorits': "Favorits",
    'Conjugations': "Conjugason",
    'Quizz': "Jòcs",
    'Quizz formas': "Trobar la forma",
    'Quizz conjugason': "Trobar la conjugason",
    'Quizz alternància': "Alternant o pas ?",
    'Quizz temps': "Trobar lo temps",
    'Quizz personas': "Trobar la persona",
    'Quizz òrdre': "Formas mescladas",
    'Quizz anagrama': "Anagrama",
    'Informacions': "Informacions",
    'Informations': "Informations",
  };

  function getPageTitle(routeName) {
    return routeTitles[routeName] || 'Vèrbòc';
  }


  return (

    <KeyboardAvoidingView style={{flex:1}} behavior="height">
      <View style={commonStyles.main_container}>
        <HideWithKeyboard style={commonStyles.headhide}>
          <View style={commonStyles.header_votz}>
            <View style={commonStyles.header_title}>
              <Image style={commonStyles.logo_top} source={require('../Images/verboc.png')} />
            </View>
            <Text style={[commonStyles.header_text, commonStyles.header_big]}>{getPageTitle(currentRoute)}</Text>
            <TouchableOpacity onPress={() => setMenuVisible(true)}>
                <Image style={commonStyles.menu_top} source={require('../Images/menuhaut.png')} />
            </TouchableOpacity>
          </View>
        </HideWithKeyboard>

        <View style={commonStyles.page_votz}>{children}</View>



        <HideWithKeyboard style={commonStyles.bottom}>
          <TouchableOpacity style={[commonStyles.headmenu_button]} onPress={() => navigation.navigate('Vèrbòc')}>
            <Image style={[
                commonStyles.headmenu_picture,
                currentRoute === 'Vèrbòc' && commonStyles.headmenu_picture_active
              ]} source={require('../Images/search.png')} />
          </TouchableOpacity>
          <TouchableOpacity style={commonStyles.headmenu_button} onPress={() => navigation.navigate('Vèrbes favorits')}>
            <Image style={[
                commonStyles.headmenu_picture,
                currentRoute === 'Vèrbes favorits' && commonStyles.headmenu_picture_active
              ]}  source={require('../Images/favfull.png')} />
          </TouchableOpacity>
          <TouchableOpacity style={commonStyles.headmenu_button} onPress={() => navigation.navigate('Revisar')}>
            <Image style={[
                commonStyles.headmenu_picture,
                ['Revisar', 'Vèrbes irregulars', 'Modèles', 'Conjugations'].includes(currentRoute) && commonStyles.headmenu_picture_active
              ]}  source={require('../Images/list.png')} />
          </TouchableOpacity>
          <TouchableOpacity style={commonStyles.headmenu_button} onPress={() => navigation.navigate('Quizz')}>
            <Image style={[
                commonStyles.headmenu_picture,
                ['Quizz', 'Quizz temps', 'Quizz personas', 'Quizz formas', 'Quizz conjugason', 'Quizz alternància', 'Quizz òrdre', 'Quizz anagrama'].includes(currentRoute) && commonStyles.headmenu_picture_active
              ]}  source={require('../Images/quizz.png')} />
          </TouchableOpacity>
          <TouchableOpacity style={commonStyles.headmenu_button} onPress={() => navigation.navigate('Informacions')}>
            <Image style={[
                commonStyles.headmenu_picture,
                ['Informacions', 'Informations'].includes(currentRoute) && commonStyles.headmenu_picture_active
              ]}  source={require('../Images/menu.png')} />
          </TouchableOpacity>
        </HideWithKeyboard>
      </View>

      {menuVisible && (
        <TouchableWithoutFeedback onPress={() => setMenuVisible(false)}>
          <View style={commonStyles.overlay}>
            {/* Menu (bloque la propagation du clic) */}
            <TouchableWithoutFeedback>
        <View style={[commonStyles.menu, { width: menuWidth }]}>
          <View>
            <TouchableOpacity onPress={() => setMenuVisible(false)} style={commonStyles.closeButton}>
              <Text style={commonStyles.closeText}>✕</Text>
            </TouchableOpacity>
            <TouchableOpacity style={commonStyles.menuLink} onPress={() => {setMenuVisible(false); navigation.navigate('Vèrbòc')}}>
              <Image style={commonStyles.menuIcon} source={require('../Images/search.png')} />
              <Text style={commonStyles.menuText}>Cercar un vèrbe</Text>
            </TouchableOpacity>
            <TouchableOpacity style={commonStyles.menuLink} onPress={() => {setMenuVisible(false); navigation.navigate('Vèrbes favorits')}}>
              <Image style={commonStyles.menuIcon} source={require('../Images/favfull.png')} />
              <Text style={commonStyles.menuText}>Favorits</Text>
            </TouchableOpacity>
            <TouchableOpacity style={commonStyles.menuLink} onPress={() => {setMenuVisible(false); navigation.navigate('Revisar')}}>
              <Image style={commonStyles.menuIcon} source={require('../Images/list.png')} />
              <Text style={commonStyles.menuText}>Apréner</Text>
            </TouchableOpacity>
            <TouchableOpacity style={commonStyles.menuSubLink} onPress={() => {setMenuVisible(false); navigation.navigate('Modèles')}}>
              <Text style={commonStyles.menuSubText}>- Vèrbes modèles</Text>
            </TouchableOpacity>
            <TouchableOpacity style={commonStyles.menuSubLink} onPress={() => {setMenuVisible(false); navigation.navigate('Vèrbes irregulars')}}>
              <Text style={commonStyles.menuSubText}>- Vèrbes irregulars</Text>
            </TouchableOpacity>
            <TouchableOpacity style={commonStyles.menuLink} onPress={() => {setMenuVisible(false); navigation.navigate('Quizz')}}>
              <Image style={commonStyles.menuIcon} source={require('../Images/quizz.png')} />
              <Text style={commonStyles.menuText}>Jòcs</Text>
            </TouchableOpacity>
            <TouchableOpacity style={commonStyles.menuLink} onPress={() => {setMenuVisible(false); navigation.navigate('Informacions')}}>
              <Image style={commonStyles.menuIcon} source={require('../Images/menu.png')} />
              <Text style={commonStyles.menuText}>Informacions (òc)</Text>
            </TouchableOpacity>
            <TouchableOpacity style={commonStyles.menuLink} onPress={() => {setMenuVisible(false); navigation.navigate('Informations')}}>
              <Image style={commonStyles.menuIcon} source={require('../Images/menu.png')} />
              <Text style={commonStyles.menuText}>Informations (fr)</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => Linking.openURL('https://locongres.org/')}>
            <Image style={commonStyles.logo_bottom} source={require('../Images/congres.png')} />
          </TouchableOpacity>
        </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      )}


    </KeyboardAvoidingView>
  );
};

