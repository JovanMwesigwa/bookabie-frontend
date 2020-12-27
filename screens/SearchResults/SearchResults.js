import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import MainHeaderComponent from '../../components/MainHeaderComponent'
import ProductCard from '../../components/productCard'


const SearchResults = ({ route }) => {

    const items = route.params

    console.log("New Results", item.results);

const { container } = styles
 return(
  <View style={container}>
      <MainHeaderComponent />
        <FlatList
            data={items.results}
            renderItem={({item}) => (
                <ProductCard item={item}  />
            )}
            // keyExtractor={(item) => item.id.toString()}
        />
  </View>
  )
}


const styles = StyleSheet.create({
  container: {
   flex: 1,
  }
})
export default SearchResults