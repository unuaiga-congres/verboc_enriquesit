// Components/ListFavoris.js

import Layout from '../Template/Layout';
import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity, Text, FlatList } from 'react-native'
import {Picker} from "@react-native-picker/picker";
import SQLite from 'react-native-sqlite-storage';
import { useSettings } from '../Contexts/SettingsContext';

const db = SQLite.openDatabase({name: 'favorites.db', location: 'default'});

import commonStyles from '../Template/commonStyles';


const ListFavoris = function ({ navigation, route }) {

  const [listverb, setListverb] = useState([]);

  const { variety, saveVariety } = useSettings();






  const getFavoritesByLanguage = (variety, callback) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT verb, dist FROM favorites WHERE variant = ? ORDER BY verb',
        [variety], 
        (tx, results) => {
          const favorites = [];
          for (let i = 0; i < results.rows.length; i++) {
            favorites.push({"inf":results.rows.item(i).verb, "dist":results.rows.item(i).dist});
          }
          callback(favorites); // Appeler le callback avec la liste des verbes favoris filtrés
        },
        (tx, error) => {
          console.error('Erreur lors de la récupération des favoris :', error);
          callback([]);
        }
      );
    });
  };

  

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getFavoritesByLanguage();
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    // Récupérer les verbes favoris pour la langue spécifiée lors du montage du composant
    getFavoritesByLanguage(variety, (favorites) => {
      setListverb(favorites);
    });
  }, [variety]);
  


  useEffect(() => {
    getFavoritesByLanguage(variety, (favorites) => {
      setListverb(favorites);
    });
  }, []);
  





  return (

    <Layout>
          <Text style={[commonStyles.title_text]}>Vèrbes favorits</Text>
          <View style={commonStyles.search_form}>
            <View style={commonStyles.pickerlabel}>
              <Text style={[commonStyles.textpicker]}>Varietat&nbsp;:</Text>
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
          <View style={commonStyles.results}>
              <FlatList
                style={commonStyles.listItems}
                data={listverb}
                renderItem={({ item }) => (
                <TouchableOpacity style={[commonStyles.listFrame]} onPress={() => navigation.navigate('Conjugations', { infinitive: item.inf, dist: item.dist, gropmodel: '', descmodel: item.desc, typenav:'fav', variety:variety })}>
                  <Text style={commonStyles.itemmodel}>
                  <Text style={commonStyles.infmodel}>{item.inf}</Text>
                  {item.dist ? (
                    <Text style={commonStyles.descmodel}> ({item.dist})</Text>
                  ) : null}
                </Text>
              </TouchableOpacity>
                )}
              />
          </View>

        </Layout>
  );
};





export default ListFavoris;

