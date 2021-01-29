import React, {  useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { APIROOTURL } from '../ApiRootURL/ApiRootUrl'
import axios from 'axios'
import { AntDesign } from '@expo/vector-icons';
import { GlobalStyles } from '../styles/GlobalStyles'
import { useNavigation } from '@react-navigation/native';
import SearchComponent from '../components/searchComponent';
import { connect } from 'react-redux';





const SecondaryHeader = ({authToken}) => {

    const navigation = useNavigation();

    const token = authToken

    const [ userInfo, setUserInfo ] = useState([]);

    const fetchUserInfo = () => {
      axios.get(`${APIROOTURL}/api/userprofile/user/detail/`,{
        headers: {
            'Authorization': `Token ${token}`
          }
    })
        .then(res => {
            setUserInfo(res.data);
        })
        .catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
      fetchUserInfo()
    },[])

const { container } = styles
 return(
    <View style={styles.container}>
       <View style={{...styles.headerContainer }}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Image source={{ uri: userInfo.profile_pic }} style={styles.imageStyle} />
          </TouchableOpacity>
          <SearchComponent />
       </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',   
    paddingHorizontal: 15, 
    height: 55,
    elevation: 5,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    letterSpacing: 1,
    paddingVertical: 2,
    color: '#B83227'
  },
  profileContainer: { 
    // backgroundColor: '#ddd', 
    // padding: 18, 
    width: 25, 
    height: 25, 
    borderRadius: 65 
},
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  cart: {
    color: 'black',

  },
  imageStyle: { 
    width: 35, 
    height: 35, 
    borderRadius: 35,
  },
  cartNumber: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: 'center',
    color: "#fff",
    backgroundColor: "#B83227",
    padding: 1,
    borderWidth: 1,
    borderColor: 'white',
    paddingHorizontal: 5,
    borderRadius: 18
  },
  cartNumberContainer: {
    position: "absolute",
    left: 320,
    bottom: 30,
    zIndex: 1,
  }
})

const mapStateToProps = state => {
  return{
    authToken: state.auth.token
  }
}
export default connect(mapStateToProps)(SecondaryHeader);