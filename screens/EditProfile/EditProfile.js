import React, { useState } from 'react'
import { View, StyleSheet, ScrollView, StatusBar } from 'react-native'
import axios from 'axios';
import * as Yup from 'yup';




import { AppCurtain, AppImagePickerTwo, AppImagePickerThree,  AppTextInput, AppForm, EditProfileHeader, SubmitButton, } from '../../components/'
import { APIROOTURL } from '../../ApiRootURL/ApiRootUrl';


const validationSchema = Yup.object().shape({
  location: Yup.string().label("Location"),
  description: Yup.string().label("Description"),
  contact:  Yup.string().label("Contact"),
  workingHours: Yup.string().label("WorkingHours"),
  workingDays: Yup.string().label("WorkingDays"),
  profilePic: Yup.string().label("ProfilePic"),
  coverPhoto: Yup.string().label("CoverPhoto"),
  // profileType:  Yup.string().label("ProfileType"),
})


const EditProfile = ({  navigation, route }) => {

  const { Profile, RefreshFetchedUser, token, fetchUserProfile } = route.params;

  const [ load, setLoad ] = useState(null)


  const goToProfile = () => {
    navigation.navigate('Profile')
  }

  const calledRefreshFunc = () => {
    RefreshFetchedUser()
  }

  const submitHandler = async(values) => {

    setLoad(true)
    const data = new FormData()

    var coverPhotoUri = {
      uri: values.coverPhoto.uri,
      type: 'image/jpeg',
      name: 'photo.jpg',
    };

    var profilephotoUri = {
      uri: values.profilephoto.uri,
      type: 'image/jpeg',
      name: 'photo.jpg',
    };

    
    data.append("location", values.location);
    data.append("description", values.description);
    data.append("contact", values.contact);
    data.append("working_hours", values.workingHours);
    data.append("working_days", values.workingDays);
    data.append("cover_photo", coverPhotoUri);
    data.append("profile_pic", profilephotoUri);


    await axios.put(`${APIROOTURL}/api/profile/${Profile.id}/update/`, data, {
        headers: {
            'Authorization': `Token ${token}`, 
            data: data
          }
        })
        .then(res => {
        })
        .catch(err => {
            console.log(err);
        })
        fetchUserProfile()
        calledRefreshFunc()
        goToProfile()
        setLoad(false)

  }


const { container } = styles
 return(
   <>
      <StatusBar backgroundColor="#ddd" barStyle='dark-content' />
     <EditProfileHeader  />

      <ScrollView style={container}>
        <AppForm
          initialValues={{ location: Profile.location, description: Profile.description, contact: Profile.contact, workingHours: Profile.working_hours, workingDays: Profile.working_days, profilephoto: "", coverPhoto: "" }}
          validationSchema={validationSchema}
          onSubmit={submitHandler}
        >

        <AppImagePickerTwo name="coverPhoto"  placeHolder="Change cover pic" pic={Profile.cover_photo}/>

      <View style={{ paddingHorizontal: 15 }}>
        
        <AppImagePickerThree name="profilephoto" placeHolder="Change profile pic" pic={Profile.profile_pic} />

          <AppTextInput 
            name="location"
            placeholder={Profile.location}
            icon="location-arrow"
            title="Location" 
          />

          <AppTextInput 
            name="description"
            multiline
            placeholder={Profile.description}
            icon="sticky-note" 
            title="Description" 
          />

          <AppTextInput 
            name="contact"
            placeholder={Profile.contact}
            icon="phone" 
            title="Contact"
          />

          <AppTextInput 
            name="workingHours"
            placeholder={Profile.working_hours}
            icon="clock-o" 
            title="Opening Time"
          />

          <AppTextInput 
            name="workingDays"
            placeholder={Profile.working_days}
            icon="clock-o"
            title="Closing Time" 
          />


          <SubmitButton title="Edit" />
        </View>
        </AppForm>

      </ScrollView>
      <AppCurtain loading={load} />
   </>
 )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
   flex: 1,
  //  paddingHorizontal: 15
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
    position: "absolute",
    bottom: 1,
  },
  headerText: {
    paddingHorizontal: 15,
    flexDirection: "row",
  },
  descriptionContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    width: '100%',
    height: 100,
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
    marginTop: 8,
    marginBottom: 5,
    elevation: 1,
    width: '100%'
  },

})

export default EditProfile;