// Template/DisplayConj.js
import { View, ScrollView, Text } from 'react-native'
import { DisplayPers } from './DisplayPers';
import { useNavigation } from '@react-navigation/native';

import commonStyles from './commonStyles';


export const DisplayConj = ({ conj, infinitive, variety, dist,  displayTitle }) => {
    const navigation = useNavigation();



      
    if (Object.keys(conj).length > 0) {
      return (
          <ScrollView style={commonStyles.conj_container}>
            {displayTitle()}

            <Text style={commonStyles.title_conj_times}>Indicatiu</Text>
            <View style={commonStyles.conj_list}>
  
                <View style={commonStyles.conj_item}>
                    <Text style={commonStyles.subtitle_conj}>Present</Text>
                    <DisplayPers time={'ind-pres'} pers={'1sg'} conj={conj} variety={variety} />
                    <DisplayPers time={'ind-pres'} pers={'2sg'} conj={conj} variety={variety} />
                    <DisplayPers time={'ind-pres'} pers={'3sg'} conj={conj} variety={variety} />
                    <DisplayPers time={'ind-pres'} pers={'1pl'} conj={conj} variety={variety} />
                    <DisplayPers time={'ind-pres'} pers={'2pl'} conj={conj} variety={variety} />
                    <DisplayPers time={'ind-pres'} pers={'3pl'} conj={conj} variety={variety} />
                </View>

                <View style={commonStyles.conj_item}>
                    <Text style={commonStyles.subtitle_conj}>Imperfach</Text>
                    <DisplayPers time={'ind-imp'} pers={'1sg'} conj={conj} variety={variety} />
                    <DisplayPers time={'ind-imp'} pers={'2sg'} conj={conj} variety={variety} />
                    <DisplayPers time={'ind-imp'} pers={'3sg'} conj={conj} variety={variety} />
                    <DisplayPers time={'ind-imp'} pers={'1pl'} conj={conj} variety={variety} />
                    <DisplayPers time={'ind-imp'} pers={'2pl'} conj={conj} variety={variety} />
                    <DisplayPers time={'ind-imp'} pers={'3pl'} conj={conj} variety={variety} />
                </View>

                <View style={commonStyles.conj_item}>
                    <Text style={commonStyles.subtitle_conj}>Futur</Text>
                    <DisplayPers time={'ind-fut'} pers={'1sg'} conj={conj} variety={variety} />
                    <DisplayPers time={'ind-fut'} pers={'2sg'} conj={conj} variety={variety} />
                    <DisplayPers time={'ind-fut'} pers={'3sg'} conj={conj} variety={variety} />
                    <DisplayPers time={'ind-fut'} pers={'1pl'} conj={conj} variety={variety} />
                    <DisplayPers time={'ind-fut'} pers={'2pl'} conj={conj} variety={variety} />
                    <DisplayPers time={'ind-fut'} pers={'3pl'} conj={conj} variety={variety} />
                </View>

                <View style={commonStyles.conj_item}>
                    <Text style={commonStyles.subtitle_conj}>Preterit</Text>
                    <DisplayPers time={'ind-pas'} pers={'1sg'} conj={conj} variety={variety} />
                    <DisplayPers time={'ind-pas'} pers={'2sg'} conj={conj} variety={variety} />
                    <DisplayPers time={'ind-pas'} pers={'3sg'} conj={conj} variety={variety} />
                    <DisplayPers time={'ind-pas'} pers={'1pl'} conj={conj} variety={variety} />
                    <DisplayPers time={'ind-pas'} pers={'2pl'} conj={conj} variety={variety} />
                    <DisplayPers time={'ind-pas'} pers={'3pl'} conj={conj} variety={variety} />
                </View>
            </View>

            <Text style={commonStyles.title_conj_times}>Subjonctiu</Text>
            <View style={commonStyles.conj_list}>

                <View style={commonStyles.conj_item}>
                    <Text style={commonStyles.subtitle_conj}>Present</Text>
                    <DisplayPers time={'subj-pres'} pers={'1sg'} conj={conj} variety={variety} />
                    <DisplayPers time={'subj-pres'} pers={'2sg'} conj={conj} variety={variety} />
                    <DisplayPers time={'subj-pres'} pers={'3sg'} conj={conj} variety={variety} />
                    <DisplayPers time={'subj-pres'} pers={'1pl'} conj={conj} variety={variety} />
                    <DisplayPers time={'subj-pres'} pers={'2pl'} conj={conj} variety={variety} />
                    <DisplayPers time={'subj-pres'} pers={'3pl'} conj={conj} variety={variety} />
                </View>

                <View style={commonStyles.conj_item}>
                    <Text style={commonStyles.subtitle_conj}>Imperfach</Text>
                    <DisplayPers time={'subj-imp'} pers={'1sg'} conj={conj} variety={variety} />
                    <DisplayPers time={'subj-imp'} pers={'2sg'} conj={conj} variety={variety} />
                    <DisplayPers time={'subj-imp'} pers={'3sg'} conj={conj} variety={variety} />
                    <DisplayPers time={'subj-imp'} pers={'1pl'} conj={conj} variety={variety} />
                    <DisplayPers time={'subj-imp'} pers={'2pl'} conj={conj} variety={variety} />
                    <DisplayPers time={'subj-imp'} pers={'3pl'} conj={conj} variety={variety} />
                </View>
            </View>

            <Text style={commonStyles.title_conj_times}>Condicional</Text>
            <View style={commonStyles.conj_list}>

                <View style={commonStyles.conj_item}>
                    <Text style={commonStyles.subtitle_conj}>Present</Text>
                    <DisplayPers time={'cond-pres'} pers={'1sg'} conj={conj} variety={variety} />
                    <DisplayPers time={'cond-pres'} pers={'2sg'} conj={conj} variety={variety} />
                    <DisplayPers time={'cond-pres'} pers={'3sg'} conj={conj} variety={variety} />
                    <DisplayPers time={'cond-pres'} pers={'1pl'} conj={conj} variety={variety} />
                    <DisplayPers time={'cond-pres'} pers={'2pl'} conj={conj} variety={variety} />
                    <DisplayPers time={'cond-pres'} pers={'3pl'} conj={conj} variety={variety} />
                </View>
            </View>

            <Text style={commonStyles.title_conj_times}>Imperatiu</Text>
            <View style={commonStyles.conj_list}>

                <View style={commonStyles.conj_item}>
                    <Text style={commonStyles.subtitle_conj}>Afirmatiu</Text>
                    <DisplayPers time={'imp-pres-a'} pers={'2sg'} conj={conj} variety={variety} />
                    <DisplayPers time={'imp-pres-a'} pers={'1pl'} conj={conj} variety={variety} />
                    <DisplayPers time={'imp-pres-a'} pers={'2pl'} conj={conj} variety={variety} />
                </View>

                <View style={commonStyles.conj_item}>
                    <Text style={commonStyles.subtitle_conj}>Negatiu</Text>
                    <DisplayPers time={'imp-pres-n'} pers={'2sg'} conj={conj} variety={variety} />
                    <DisplayPers time={'imp-pres-n'} pers={'1pl'} conj={conj} variety={variety} />
                    <DisplayPers time={'imp-pres-n'} pers={'2pl'} conj={conj} variety={variety} />
                </View>
            </View>

            <Text style={commonStyles.title_conj_times}>Participi</Text>
            <View style={commonStyles.conj_list}>

                <View style={commonStyles.conj_item}>
                    <Text style={commonStyles.subtitle_conj}>Passat</Text>
                    <DisplayPers time={'part-pas'} pers={'msg'} conj={conj} variety={variety} />
                    <DisplayPers time={'part-pas'} pers={'fsg'} conj={conj} variety={variety} />
                </View>

                <View style={commonStyles.conj_item}>
                    <Text style={commonStyles.subtitle_conj}>Present</Text>
                    <DisplayPers time={'part-pres'} pers={'-'} conj={conj} variety={variety} />
                </View>
            </View>
          </ScrollView>
      )
    }
};
