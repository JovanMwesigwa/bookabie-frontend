import React, { useState, useContext }  from 'react'
import { CategoryContext } from '../../context/profiles/CategoryContextProvider'
import { CompanyContext } from '../../context/profiles/CompanyContextProvider'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import SecondaryHeader from '../../components/SecondaryHeader';


const Categories = ({ navigation }) => {

  // const [ colors, setColors ] = useState({color1: '#30336B', color2: '#B83227', color3: '#6ab04c', color4: '#B83227'})

  const { categories } = useContext(CategoryContext);

  const { products } = useContext(CompanyContext);

  const categories_ = categories
  // console.log(categories);

const { container } = styles
 return(
  <View style={container}>
    <StatusBar backgroundColor="#ddd" barStyle='dark-content' />
    <SecondaryHeader />
    <ScrollView> 
      <View style={{ flex: 1, backgroundColor: '#ddd', padding: 10, elevation: 1 }}>
        <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#777' }}>CATEGORIES</Text>
      </View>
        {
          categories_.map(( category ) => (
            <TouchableOpacity key={category.id} onPress={() => (
              navigation.navigate("Category", {title:category.name, color: category.color , slug: category.slug})
            )}>
              <View style={{...styles.categoryListContainer, borderBottomColor: category.color}}>
                <View style={{ width: 35, height: 35, backgroundColor: category.color, borderRadius: 35 }}>
                  
                </View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                  <View style={{ paddingHorizontal: 18}}>
                    <Text style={styles.categoryText}>{category.name}</Text>
                  </View>
                  <View>
                  <AntDesign name="star" size={20} color="#ddd" />

                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))
        }
    </ScrollView>
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   backgroundColor: 'white'
  },
  categoryListContainer: {
    flex: 2,
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    backgroundColor: 'white'
  },
  categoryText: {
    // color: 'white',
    fontSize: 16,
    fontWeight: '700',
    // textAlign: 'center'
  }
})
export default Categories