// Components/Conjugation.js

import Layout from '../Template/Layout';
import React, { useState, useEffect } from 'react'
import {View, Text, ActivityIndicator, Keyboard, TouchableOpacity, Image } from 'react-native'
import { getConjugationFromVerb } from '../API/VerbocApi'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DisplayConj } from '../Template/DisplayConj';
import { DisplayFavori } from '../Template/DisplayFavori';



import commonStyles from '../Template/commonStyles';



const ConjugationsScreen = function ({ navigation, route }) {

  const { infinitive } = route.params;
  const { dist } = route.params;
  const { gropmodel } = route.params;
  const { descmodel } = route.params;
  const { typenav } = route.params;
  const { variety } = route.params;

  const [conj, setConj] = useState({});
  const [isLoading, setIsLoading] = useState("False");
  const [error, setError] = useState("");




  const loadConj =  () => {
    Keyboard.dismiss()
    setError("")
    setConj({})
    setIsLoading("False")
    Keyboard.dismiss()
    setIsLoading('True')
    var inf=infinitive
    getConjugationFromVerb(inf, variety).then(data => {
        var tableconj={}
        var inf=""
        if (data == undefined) {
          setIsLoading("False")
          setError("Error pendent la recèrca de vèrbes. Verificatz vòstra connexion Internet.")
        }else if ('query' in data) {
          for (var num in data['query']) {
            var infos=data['query'][num]
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
            }
          }
          setIsLoading("False")
          setError("")
          setConj(tableconj)
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


  useEffect(() => {
    loadConj();
  }, []);



  function displayBack(routeName) {
    if (typenav=='model') {
      return (
      <TouchableOpacity style={commonStyles.menuSubLink} onPress={() => {navigation.navigate('Modèles')}}>
        <Image style={[commonStyles.tornar_picture, commonStyles.bloctornar]} source={require('../Images/retour.png')} />
      </TouchableOpacity>
      )

    }else if (typenav=='irreg') {
      return (
      <TouchableOpacity style={commonStyles.menuSubLink} onPress={() => {navigation.navigate('Vèrbes irregulars')}}>
        <Image style={[commonStyles.fav_picture, commonStyles.bloctornar]} source={require('../Images/retour.png')} />
      </TouchableOpacity>
      )

    }else if (typenav=='fav') {
      return (
      <TouchableOpacity style={commonStyles.menuSubLink} onPress={() => {navigation.navigate('Vèrbes favorits')}}>
        <Image style={[commonStyles.fav_picture, commonStyles.bloctornar]} source={require('../Images/retour.png')} />
      </TouchableOpacity>
      )

    }else{
      return (
      <TouchableOpacity style={commonStyles.menuSubLink} onPress={() => {navigation.navigate('Vèrbòc')}}>
        <Image style={[commonStyles.fav_picture, commonStyles.bloctornar]} source={require('../Images/retour.png')} />
      </TouchableOpacity>
      )
    }
  }
  

  const displayTitle = () => {
    if (typenav=='model') {

      return (
          <View>
            {displayBack()}
            <View style={commonStyles.bloctitlefav}>
              <Text style={commonStyles.title_conj_fav}>{ infinitive }</Text>
              <DisplayFavori
                infinitive={infinitive}
                variety={variety}
                dist={dist}
              />
            </View>
            <Text style={commonStyles.subtitle_conj_grey}>Grop {gropmodel} : {descmodel}</Text>
          </View>
      )
    }else if (['irreg', 'fav'].includes(typenav)) {

      return (
          <View>
            {displayBack()}
            <View style={commonStyles.bloctitlefav}>
              <Text style={commonStyles.title_conj_fav}>{ infinitive }</Text>
              <DisplayFavori
                infinitive={infinitive}
                variety={variety}
                dist={dist}
              />
            </View>
            {descmodel ? (
              <Text style={commonStyles.subtitle_conj_grey}>({descmodel})</Text>
            ) : null}
          </View>
      )
    }

  }





  return (

    <Layout>
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




export default ConjugationsScreen;
