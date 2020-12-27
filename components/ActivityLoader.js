import React from 'react'
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'


const ActivityLoader = (props) => {

const { container } = styles
 return(
   <ActivityIndicator
        size={25}
        color="#75DA8B"
        style={{ marginVertical: 300, alignItems: 'center', justifyContent: 'center' }}
    />
  )
}


const styles = StyleSheet.create({
  container: {

  }
})
export default ActivityLoader