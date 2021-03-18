import React from 'react'
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native'
import { useNavigation } from '@react-navigation/native'


import { MaterialCommunityIcons} from '@expo/vector-icons';
import AppText from '../components/AppText'



const FillerIcon = ({item, component}) => {
    const navigation = useNavigation()
    return (
        <TouchableWithoutFeedback  onPress={() => (
            navigation.navigate("Category", {title: item.name, color: item.color , slug: item.slug})
          )}>
              <View style={[styles.container, {flexDirection: component ? 'row' : 'column'}]} >
                <View style={[styles.iconContainer, {backgroundColor: item.color, marginRight: component ? 12 : 0 }]}>
                    <MaterialCommunityIcons name={item.icon} size={30} color="#ddd" />
                </View>
                {
                    component ? 
                    <AppText fontSize={16}>{item.name}</AppText> :
                    <AppText fontSize={12} textAlign="center">{item.name}</AppText>
                }
                    
              </View>
          </TouchableWithoutFeedback> 
    )
}

const styles = StyleSheet.create({
    container: {
        
        alignItems: 'center',
    },  
    iconContainer: { 
        justifyContent: 'center',
        alignItems: 'center',
        width: 60, 
        height: 60,  
        borderRadius: 60/2,
        marginBottom: 5
    },
    text: {
        fontSize: 13, 
        textAlign: 'center',
      },
})

export default FillerIcon
