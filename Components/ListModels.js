// Components/ListModels.js

import Layout from '../Template/Layout';
import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity, Text, FlatList } from 'react-native'
import {Picker} from "@react-native-picker/picker";
import { useSettings } from '../Contexts/SettingsContext';

import models from '../Datasets/VerbsModels';

import commonStyles from '../Template/commonStyles';




const ListModels = function ({ navigation, route }) {

  const [listmod, setListmod] = useState([]);

  const { variety, saveVariety } = useSettings();


  const loadModels =  () => {
    modvar=models[variety]
    setListmod(modvar)
  }


  useEffect(() => {
    loadModels();
  }, []);
  


  useEffect(() => {
    loadModels();
  }, [variety]);





  return (

    <Layout>
          <Text style={[commonStyles.title_text]}>Modèles</Text>
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
                data={listmod}
                renderItem={({ item }) => (
                <TouchableOpacity style={[commonStyles.listFrame]} onPress={() => navigation.navigate('Conjugations', { infinitive: item.inf, dist: item.dist, gropmodel: item.group, descmodel: item.desc, typenav:'model', variety:variety })}>
                  <Text style={commonStyles.itemmodel}>
                  <Text style={commonStyles.idmodel}>{`grop ${item.group} : `}</Text>
                  <Text style={commonStyles.infmodel}>{item.inf}</Text>
                  <Text style={commonStyles.descmodel}> ({item.desc}) →</Text>
                </Text>
              </TouchableOpacity>
                )}
              />
          </View>

        </Layout>
  );
};




export default ListModels;
