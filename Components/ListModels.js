// Components/ListModels.js

import Layout from '../Template/Layout';
import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity, Text, FlatList } from 'react-native'
import {Picker} from "@react-native-picker/picker";
import RNPickerSelect from "react-native-picker-select";
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
          </View>
          <View style={commonStyles.results}>
              <FlatList
                style={commonStyles.listItems}
                data={listmod}
                renderItem={({ item }) => (
                <TouchableOpacity style={[commonStyles.listFrame]} onPress={() => navigation.push('Conjugations', { infinitive: item.inf, dist: item.dist, gropmodel: item.group, descmodel: item.desc, typenav:'model', variety:variety })}>
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
