// Components/ListIrreg.js

import Layout from '../Template/Layout';
import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity, Text, FlatList } from 'react-native'
import {Picker} from "@react-native-picker/picker";
import RNPickerSelect from "react-native-picker-select";
import { useSettings } from '../Contexts/SettingsContext';

import irreg from '../Datasets/VerbsIrreg';

import commonStyles from '../Template/commonStyles';




const ListIrreg = function ({ navigation, route }) {

  const [listverb, setListverb] = useState([]);

  const { variety, saveVariety } = useSettings();




  const loadIrreg =  () => {
    irrvar=irreg[variety]
    setListverb(irrvar)
  }


  useEffect(() => {
    loadIrreg();
  }, []);
  

  useEffect(() => {
    loadIrreg();
  }, [variety]);





  return (

    <Layout>
          <Text style={[commonStyles.title_text]}>Vèrbes irregulars</Text>
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
                data={listverb}
                renderItem={({ item }) => (
                <TouchableOpacity style={[commonStyles.listFrame]} onPress={() => navigation.push('Conjugations', { infinitive: item.inf, dist: item.dist, gropmodel: '', descmodel: item.desc, typenav:'irreg', variety:variety })}>
                  <Text style={commonStyles.itemmodel}>
                  <Text style={commonStyles.infmodel}>{item.inf}</Text>
                  {item.desc ? (
                    <Text style={commonStyles.descmodel}> ({item.desc})</Text>
                  ) : null}
                </Text>
              </TouchableOpacity>
                )}
              />
          </View>

        </Layout>
  );
};





export default ListIrreg;

