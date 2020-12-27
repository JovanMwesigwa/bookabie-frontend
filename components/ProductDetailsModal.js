import React from 'react'
import { MaterialIcons, AntDesign, Feather } from '@expo/vector-icons';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native'
import ReadMore from '@fawazahmed/react-native-read-more';

const ProductDetailsModal = ({post, count}) => {

const { container } = styles
 return(
  <View style={container}>
    <ScrollView>
    <View style={styles.descriptionContainer}>

        <View style={{ flexDirection: "row", paddingHorizontal: 15 }}>

            <View>
                <Text style={styles.modalText}>{post.title}</Text>
                {post.offer && <Text style={{ fontSize: 15 }}>With A Good {post.offer}% Off</Text>}
            </View>
                <Feather name="bookmark" size={26} style={{...styles.bookmark, elevation: 5}} />
        </View>

    
        <View style={{ flex: 1, paddingHorizontal: 15, justifyContent: 'space-between'  }}>

                <Text>Description</Text>
                <ReadMore
                  numberOfLines={3}
                    >
                  <Text style={{ fontSize: 14, color: '#777E8B',  }}>{post.description}</Text>
                </ReadMore>
            <View style={{ flex: 1,  }}>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>

                    <View style={{ flexDirection: 'row' }}>

                      <TouchableOpacity onPress={() => {
                        setCount(count - 1)
                      }}>
                          <AntDesign name="minuscircleo" size={28} color="#B83227" />
                      </TouchableOpacity>

                        { count < 0 ? 
                          <Text style={{ fontSize: 18, paddingHorizontal: 8  }}>
                           0
                          </Text> 
                        : 
                          <Text style={{ fontSize: 18, paddingHorizontal: 8 }}>
                            {count}
                          </Text> }

                      <TouchableOpacity onPress={() => {
                        setCount(count + 1)
                      }}>
                        <AntDesign name="pluscircle" size={28} color="#B83227" />
                      </TouchableOpacity>
                      
                    </View>

                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>${post.price}</Text>
                </View>

              <TouchableOpacity style={styles.buttonContainer}>
                  <Text style={{ fontSize: 18, textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Add to Cart</Text>
              </TouchableOpacity>
              
        </View>
    </View>
    </View>
    <View style={styles.commentsContainer}>
        
    </View>
</ScrollView>
  </View>
  )
}


const styles = StyleSheet.create({
  container: {
   flex: 1,
  },
  commentsContainer: {
    flex: 1,
  },
  descriptionContainer: {
      flex: 1,
  },
  topButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "absolute",
    top: 12,
    left: 8,
    right: 8
  },
  topBtnContainer: {
    padding: 5, 
    backgroundColor: '#fff', 
    borderRadius: 8, 
    elevation: 5
  },
  modalText: {
    fontSize: 19,
    fontWeight: '600',
    // paddingBottom: 8
  },
  bookmark: {
    position: "absolute",
    color: "#fff",
    top: 5,
    right: 5,
    padding: 13,
    backgroundColor: "#B83227",
    borderRadius: 56 / 2,
  },
  buttonContainer: {
    padding: 18,
    backgroundColor: '#B83227',
    borderRadius: 8,
    marginVertical: 10,
  },
})
export default ProductDetailsModal