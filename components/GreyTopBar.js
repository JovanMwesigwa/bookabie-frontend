import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons,MaterialIcons, Ionicons} from '@expo/vector-icons';


import { GlobalStyles } from '../styles/GlobalStyles'
import AppTextIcon from './AppTextIcon';



const GreyTopBar = ({signOut, onPress}) => {
    return (
        <View style={styles.feedContainer}>
            <View style={GlobalStyles.rowSpaceBtn}>
                <View style={styles.innerContainer}>
                    <AppTextIcon onPressFunc={onPress} icon="insert-chart" title="Recent" />
                    <AppTextIcon onPressFunc={onPress} icon="location-on" title="Global" />
                    <AppTextIcon onPressFunc={signOut} icon="apps" title="Logout" />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    feedContainer: {
        paddingHorizontal: 25,
        paddingVertical: 8,
        backgroundColor: '#ddd',
        flexDirection: 'row',
        alignItems: 'center', 
      },
      innerContainer: { flex: 1, flexDirection: 'row', alignItems: 'center',justifyContent: 'space-between' },
})

export default GreyTopBar
