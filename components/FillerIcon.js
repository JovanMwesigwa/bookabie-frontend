import React from 'react'
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native'
import { useNavigation } from '@react-navigation/native'


import { MaterialCommunityIcons} from '@expo/vector-icons';




const FillerIcon = ({item}) => {
    const navigation = useNavigation()
    return (
        <TouchableWithoutFeedback  onPress={() => (
            navigation.navigate("Category", {title: item.name, color: item.color , slug: item.slug})
          )}>
              <View style={styles.container} >
                <View style={[styles.iconContainer, {backgroundColor: item.color}]}>
                    <MaterialCommunityIcons name={item.icon} size={30} color="#ddd" />
                </View>
                  <Text style={styles.text}>{item.name}</Text>
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
