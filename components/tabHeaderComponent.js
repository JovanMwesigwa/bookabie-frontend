import React from 'react'
import { SearchBar, Header } from 'react-native-elements';
import { View, Text, StyleSheet } from 'react-native'


const TabHeaderComponent = (props) => {

const { container } = styles
 return(
  <View style={container}>
    <View style={styles.title}>
        <Text></Text>
        <Text style={{ fontSize: 28, color: '#2C3335',  }}>Hello Smith</Text>
        <Text style={{ fontSize: 15, color: '#2C3335',  }}>Kampala, Uganda</Text>
    </View>
    <View style={styles.search}>
      {/* <SearchBar
        inputContainerStyle={{ backgroundColor: 'white', height: 5 }}
        containerStyle={{backgroundColor: 'white', borderRadius: 5 }}
        lightTheme
        round
        placeholder="Search for product..."
        /> */}
    </View>
  </View>
  )
}


const styles = StyleSheet.create({
  container: {
   width: '100%',
   backgroundColor: 'white',
   height: 180,
   padding: 18,
   paddingVertical: 25
  },
  title: {
    flex: 2
  },
  search: {
    flex: 1,
    paddingVertical: 25
  }
})
export default TabHeaderComponent