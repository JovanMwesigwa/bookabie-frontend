import React, { useContext, useReducer, useEffect, useState } from 'react'
import axios from 'axios';
import { View, Text, StyleSheet, ScrollView, Image, ImageBackground, TouchableOpacity, ActivityIndicator, StatusBar, TextInput } from 'react-native'
import {  Ionicons, Entypo, AntDesign, Feather, MaterialIcons } from '@expo/vector-icons';
import OtherHeaderComponent from '../../components/OtherHeaderComponent';
import { CompanyContext } from '../../context/profiles/CompanyContextProvider';
import { APIROOTURL } from '../../ApiRootURL/ApiRootUrl';
import ReadMore from '@fawazahmed/react-native-read-more';
import { GlobalStyles } from '../../styles/GlobalStyles'
import { AuthContext } from '../../context/authentication/Context'
import { Textarea } from 'native-base';
import EditProfileHeader from '../../components/EditProfileHeader';


const EditProfile = ({  navigation, route }) => {

  const { Profile, RefreshFetchedUser } = route.params;

  const [ contact, setContact ] = useState(Profile.contact);
  const [ location, setLocation ] = useState(Profile.location);
  const [ workingHours, setWorkingHours ] = useState(Profile.working_hours);
  const [ workingDays, setWorkingDays ] = useState(Profile.working_days);
  const [ user, setUser ] = useState(Profile.user);
  const [ description, setDescription ] = useState(Profile.description);
  const [ profile_type, setProfile_type ] = useState(Profile.profile_type);
  const [ cover_photo, setCover_photo ] = useState(Profile.cover_photo);
  const [ profile_pic, setProfile_pic] = useState(Profile.profile_pic);

  const { authState } = useContext(AuthContext);

  const token = authState.token

  const goToProfile = () => {
    navigation.navigate('Profile')
  }

  const calledRefreshFunc = () => {
    RefreshFetchedUser()
  }

  const data = {
      working_days: workingDays,
      working_hours: workingHours,
      location: location,
      description: description,
      contact: contact,
  }


  const submitHandler = async() => {
    await axios.put(`${APIROOTURL}/api/profile/${Profile.id}/update/`, data, {
        headers: {
            'Authorization': `Token ${token}`, 
            data: data
          }
        })
        .then(res => {
            // console.log(res.data);
        })
        .catch(err => {
            console.log(err);
        })
        calledRefreshFunc()
        goToProfile()
  }


const { container } = styles
 return(

  <>
    <StatusBar backgroundColor="#ddd" barStyle='dark-content' />
    <EditProfileHeader submitHandler={submitHandler} />
  <ScrollView style={container}>


  <ImageBackground style={styles.coverImageHeader} source={{uri: cover_photo}}>
    <View style={styles.child}>
        <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 0.5, borderColor: 'white', marginVertical: 12, width: '40%', borderColor: 'white', padding: 5, borderRadius: 12 }}>
                <MaterialIcons name="add-a-photo" size={18} color="#ddd" />  
                <Text style={{ paddingHorizontal: 15, fontSize: 13, color: '#ddd', }}>Remove Photo</Text>
          </View>
        </TouchableOpacity>
    </View>
  </ImageBackground>

  <View style={styles.footer}>

    <View style={{ flex: 1, marginBottom: 12, paddingHorizontal: 20 }} >

    <TouchableOpacity style={styles.profilephoto} >
        <Image source={{ uri: profile_pic }} style={styles.profPic}/>
    </TouchableOpacity>
     
     {/* <View style={{ flexDirection: 'row',  }}>
        <View >
          <View style={{ flexDirection: 'row'}}>
                <TextInput 
                    value={user}
                    onChangeText={text => setUser(text)}
                    style={styles.userUnput}
            />

          </View>

                <TextInput 
                    value={profile_type}
                    onChangeText={text => setProfile_type(text)}
                    style={styles.userUnput}
                />
        </View>
     </View> */}

    </View>

    <View style={{ flex: 1, paddingHorizontal: 20 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ padding: 3, borderRadius: 8, opacity: 0.8 }}>
            <Entypo name="calendar" size={18} color="#FF5A09" /> 
        </View>
        <View style={{ paddingHorizontal: 5}}>
            <TextInput 
                    value={workingDays}
                    onChangeText={text => setWorkingDays(text)}
                    style={styles.input}
            />
            <TextInput 
                    value={workingHours}
                    onChangeText={text => setWorkingHours(text)}
                style={styles.input}
             />
          {/* <Text style={{...styles.mainText, fontWeight: '600'}}>Monday to Sunday</Text> 
          <Text  style={{...styles.secondaryText, fontSize: 13}}>08:00AM - 09:00PM</Text>  */}
        </View>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ padding: 3, borderRadius: 8, opacity: 0.8 }}>
          <Entypo name="location-pin" size={18} color="#FF5A09" />
        </View>
        <View style={{   paddingHorizontal: 5 }}>

            <TextInput 
                value={location}
                onChangeText={text => setLocation(text)}
                style={styles.input}
             />
          {/* <Text style={{...styles.mainText,fontWeight: '600'}}>{Profile.location}</Text>  */}
        </View>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center',  }}>
        <View style={{ padding: 3, borderRadius: 8, opacity: 0.8 }}>
          <Entypo name="globe" size={18} color="#FF5A09" />
        </View >

        <View  style={{   paddingHorizontal: 5 }}>
            <TextInput placeholder="contact"
                value={contact}
                onChangeText={text => setContact(text)}
                style={styles.input}
             />
        </View>

      </View>
    </View>

    <View style={{ borderBottomWidth: 0.5, borderBottomColor: '#ddd', paddingTop: 8 }}>

    </View>

    <View style={{ flex: 1, marginVertical: 8, paddingHorizontal: 20 }}>
        <View style={{ flex: 1 }}>
            <Text style={styles.headerFont}>About Us</Text>
        </View>
        <View style={{ flex: 1, }}>
          
          
        <Textarea rowSpan={5}  style={styles.inputContainer}  
          value={description}
          onChangeText={text => setDescription(text)}
          style={styles.input}
        />
              
          {/* </ReadMore> */}
        </View>
    </View>

    <View>
      <View style={{ flex: 1, marginTop: 8, paddingHorizontal: 20 }}>
          <Text style={styles.headerFont}>Location</Text>
      </View>
      <View style={{ flex: 2 }}>

      </View>
    </View>

  </View>
 </ScrollView>
</>
 )
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
  },
  cardText: {
    padding: 24
  },
  description: {
    flex: 1
  },
  profPic: {
    width: 70,
    height: 70,
    borderWidth: 2,
    borderColor: '#B83227',
    borderRadius: 35,
    marginBottom: 12
  },
  footer: { 
    flex: 1, 
    // width: '100%', 
    backgroundColor: 'white', 
    elevation: 1, 
    paddingBottom: 10, 
    paddingVertical: 20,
},
input: {
    padding: 8,
    borderBottomWidth: 0.8,
    borderBottomColor: '#ddd',
    width: '100%'
},
userUnput: {
    borderBottomWidth: 0.8,
    borderBottomColor: '#777',
    width: '100%'
},
  topText: {
    paddingRight: 12,
    backgroundColor: 'grey',
    padding: 5,
    borderRadius: 8,
    fontSize: 15, 
    color: '#2C3335', 
    fontWeight: '500'
  },
  mainText: {
    fontSize: 14, 
    color: '#2C3335', 
    fontWeight: '700'
  },
  secondaryText: {
    color: '#777E8B'
  },
  headerFont: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  coverImageHeader: {
    flex: 1,
    width: '100%',
    resizeMode: 'contain',
    height: 150,
    borderWidth: 5,
    borderColor: 'white',
    borderStyle: 'dashed',
  },
  child: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)'
  },
  topIcons: {
    flexDirection: "row",
    justifyContent: 'space-between',
    margin: 10
  },
  profilephoto: {
  
  },
  headerTextContainer: {
    // flexDirection: "row",
    // alignItems: "center",
    // justifyContent: 'center',
    position: "absolute",
    bottom: 1,
    // paddingTop:24
    // left: 12
  },
  headerText: {
    paddingHorizontal: 15,
    flexDirection: "row",
    // paddingBottom: 18
  },
  descriptionContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    width: '100%',
    height: 100,
    // flex: 1,
    margin: 4,
    marginLeft: 0,
    marginTop: 8,
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  locationContainer: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 0,
    marginRight: 0,
    padding: 12,
    margin: 4,
    borderRadius: 10,
    elevation: 1
  },
  myProductsContainer: {
    flex: 1,
    padding: 8,
    backgroundColor: 'white',
    // borderRadius: 14,
    marginTop: 8,
    marginBottom: 5,
    elevation: 1,
    width: '100%'
  },

})
export default EditProfile;