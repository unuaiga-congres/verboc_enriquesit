// Template/DisplayPers.js
import React from 'react';
import { View, Text } from 'react-native'
import commonStyles from './commonStyles';
import { DisplaySound } from './DisplaySound';

export const DisplayPers = ({ time, pers, conj, variety }) => {
    if ((time in conj) && (pers in conj[time])) {
      let txtpers = conj[time][pers]
      return (
        <View style={commonStyles.blocform}>
          <Text style={commonStyles.text_conj}>{ txtpers.join(', ') }</Text>
          {["gascon", "lengadoc"].includes(variety) && (
            <DisplaySound index={txtpers.join(', ')} variety={variety} />
            )}
        </View>

        )
    }else{
      return (
        <View style={commonStyles.blocform}>
          <Text style={commonStyles.text_conj}>-</Text>
        </View>
        )
    }
};
