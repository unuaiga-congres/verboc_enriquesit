// Components/Home.js

import Layout from '../Template/Layout';
import React, { useState } from 'react'
import { View, TouchableOpacity, Image, Text, ActivityIndicator, Keyboard, TextInput } from 'react-native'
import {Picker} from "@react-native-picker/picker";
import {ShowWithKeyboard} from 'react-native-hide-with-keyboard';
import { getConjugationFromVerb } from '../API/VerbocApi'
import { DisplayConj } from '../Template/DisplayConj';
import { DisplayFavori } from '../Template/DisplayFavori';
import { useSettings } from '../Contexts/SettingsContext';
import RNPickerSelect from "react-native-picker-select";

import commonStyles from '../Template/commonStyles';



const HomeScreen = function ({ navigation, route }) {

  const [searchedText, setSearchedText] = useState("");
  const [dist, setDist] = useState("");
  const [autresdist, setAutresdist] = useState([]);
  const [conj, setConj] = useState({});
  const [infinitive, setInfinitive] = useState("");
  const [isLoading, setIsLoading] = useState("False");
  const [error, setError] = useState("");
  const [formVis, setFormVis] = useState("shown");

  const { variety, saveVariety } = useSettings();
  



  const erase =  () => {
    setSearchedText('')
    setConj({})
    setIsLoading("False")
    setInfinitive("")
    setError("")
  }


  const changeDist =  (nvdist) => {
    setDist(nvdist)
    loadConj(nvdist, 'no')
  }

  const loadConj =  (dist, random) => {
    Keyboard.dismiss()
    setFormVis('hidden')
    if ((searchedText.length > 0) || (random == 'yes')) {
      setError("")
      setConj({})
      setIsLoading("False")
      setInfinitive("")
      Keyboard.dismiss()
      setIsLoading('True')
      if (random == 'no') {
        var inf=searchedText
      }else{
        var inf='random'
        setSearchedText('')
      }
      getConjugationFromVerb(inf, variety).then(data => {
          var tableconj={}
          var inf=""
          var autresdi=[]
          if (data == undefined) {
            setIsLoading("False")
            setError("Error pendent la recèrca de vèrbes. Verificatz vòstra connexion Internet.")
          }else if ('query' in data) {
            for (var num in data['query']) {
              var infos=data['query'][num]
              if ('inf' in infos) {
                  inf=infos['inf']
              }
              if ('dist' in infos) {
                if((infos['dist']!=dist) && (dist=="")) {
                  dist=infos['dist']
                }
              }
              if (((!('dist' in infos)) && (dist=="")) || (infos['dist']==dist)) {
                if (('mod' in infos) && ('tns' in infos)) {
                  if ('pol' in infos) {
                    var modtns=infos['mod'] + '-' + infos['tns'] + '-' + infos['pol']

                  }else{
                    var modtns=infos['mod'] + '-' + infos['tns']
                  }
                  if (('per' in infos) && ('num' in infos)) {
                    var pernum=infos['per'] + infos['num']
                  }else if (('gen' in infos) && ('num' in infos)) {
                    var pernum=infos['gen'] + infos['num']
                  }else{
                    var pernum="-"
                  }
                  if (!(modtns in tableconj)) {
                    tableconj[modtns]={}
                  }
                  if (!(pernum in tableconj[modtns])) {
                    tableconj[modtns][pernum]=[]
                  }
                  if ('display' in infos) {
                    if (infos['display']!="") {
                      tableconj[modtns][pernum].push(infos['display'])
                    }
                  }else{
                    tableconj[modtns][pernum].push("-")
                  }
                }
              }else{
                if (!(autresdi.indexOf(infos['dist']) > -1)) {
                  autresdi.push(infos['dist'])
                }
              }
            }
            setIsLoading("False")
            setError("")
            setConj(tableconj)
            setDist(dist)
            setAutresdist(autresdi)
            setInfinitive(inf)
          }else if ('error' in data) {
            var codeerr=data['error']['code']
            if (codeerr=='19') {
              setIsLoading("False")
              setError("Cap de vèrbe correspond pas a vòstra recèrca.")
            }else{
              setIsLoading("False")
            }
          }
      })
    }



  }


  const displayAllDist =  (infinitive, autresdist) => {
    var buttonsListArr = autresdist.map(dista => (<TouchableOpacity onPress={() => changeDist(dista)}><Text style={commonStyles.itemdist}>Veire tanben : {dista} →</Text></TouchableOpacity>))
    return (
      <View style={commonStyles.listdist}>
           {buttonsListArr}
      </View>
    )
  }

  const displayTitle = () => {

      return (
        <View>
        <View style={commonStyles.bloctitlefav}>
            <Text style={commonStyles.title_conj_inf}>{ infinitive }</Text>
            <DisplayFavori
              infinitive={infinitive}
              variety={variety}
              dist={dist}
            />
        </View>
        {displayAllDist(infinitive, autresdist)}
        </View>
      )

  }


  const displayForm =  () => {
    
    if(formVis=='shown') {
    return (
      
      <View style={commonStyles.search_form}>
            
      <TextInput
        placeholder='Entrar un vèrbe en occitan...'
        multiline = {false}
        style={commonStyles.textinput}
        onChangeText={(text) => setSearchedText(text)}
        value={searchedText}
        onSubmitEditing={() => loadConj(dist, 'no')}
      />
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
      <View style={commonStyles.buttons}>
        <TouchableOpacity style={[commonStyles.button_votz, commonStyles.button_cercar]} onPress={() => loadConj('', 'no')}>
          <Text style={commonStyles.button_text}>Cercar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={commonStyles.button_copy} onPress={() => loadConj('', 'yes')}>
          <Image style={commonStyles.copy} source={require('../Images/random.png')} />
        </TouchableOpacity>
        <TouchableOpacity style={commonStyles.button_copy} onPress={() => erase()}>
          <Image style={commonStyles.copy} source={require('../Images/erase.png')} />
        </TouchableOpacity>
        <ShowWithKeyboard>
          <TouchableOpacity style={commonStyles.button_copy} onPress={() => Keyboard.dismiss()}>
            <Image style={commonStyles.copy} source={require('../Images/minimize.png')} />
          </TouchableOpacity>
        </ShowWithKeyboard>
      </View>
    </View>
    )
    }else{
      return (
        <TouchableOpacity style={[commonStyles.button_votz, commonStyles.button_newsearch]} onPress={() => setFormVis('shown')}>
          <Image style={commonStyles.copy} source={require('../Images/search.png')} />
          <Text style={commonStyles.button_text}>Novèla recèrca</Text>
        </TouchableOpacity>

      )

    }
  }

  





  return (

    <Layout>
          {displayForm()}
          {isLoading=="False" ? null :
            <View style={commonStyles.loading_container}>
              <ActivityIndicator color="#000000" size="large" />
            </View>}
          <View style={commonStyles.results}>
            {error=="" ? null : <Text style={commonStyles.text_error}>{ error }</Text>}
            <DisplayConj
              conj={conj}
              infinitive={infinitive}
              variety={variety}
              dist={dist}
              displayTitle={displayTitle}
            />
          </View>

        </Layout>
  );
};





export default HomeScreen;
