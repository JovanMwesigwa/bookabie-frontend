import React, { useEffect } from 'react'
import { View, ActivityIndicator, Text, StyleSheet, Keyboard, Image, StatusBar, TouchableOpacity, TouchableWithoutFeedback, FlatList } from 'react-native'
import axios from 'axios';
import { connect } from 'react-redux'
import { useRoute } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons';
import * as Yup from 'yup'



import {AppForm,AppTextInput, ChatMessageComponent, IconButton, SubmitButton  } from '../../components/';
import { APIROOTURL } from '../../ApiRootURL/ApiRootUrl'
import { GlobalStyles } from '../../styles/GlobalStyles'
import useAuthUser from '../../hooks/useAuthUser'
import useFetchData from '../../hooks/useFetchData'





const validationSchema = Yup.object().shape({
  description: Yup.string().required().label("Message")
})



// 
const ChatRoom = ({ navigation,  authToken }) => {

    const route = useRoute()

    const token = authToken;

    const { item, ID, chatWithID } = route.params

    const user = useAuthUser(token)

    const chatRoom = useFetchData(token, `api/chat_room/${item.reciever}/`)

    const { data: roomData, loading, errors, request } = useFetchData(token, `api/room_messages/${ID}/`)

    const userToData = useFetchData(token, `api/profile/${item.reciever}/detail/`)

    const sendMessage = async(data) => {
      Keyboard.dismiss()
      await axios.post(`${APIROOTURL}/api/chat_message/create/`, data ,{
          headers: {
            'Authorization': `Token ${token}`,
          }
      })
      .then(res => {
        request()
        userToData.request()
      })
      .catch(err => {
        console.log(err)
      })
    }

    const checkMessageUser = (item, user) => {
      const nowUser = `Profile for ${user.user}`
      if(item.author !== nowUser)
        return true
      else
        return false
    }

    

    useEffect(() => {
      chatRoom.request()
      userToData.request()
      request();
    },[])
  
  if(loading) return <ActivityIndicator size={18} color={GlobalStyles.themeColor.color} />

  if(errors) return <View><Text>{errors}</Text></View>

const { container } = styles
 return(
  <View style={container}>
    <StatusBar backgroundColor="#ddd" barStyle='dark-content' />
        <View style={{ elevation: 2, shadowOpacity: 3, borderBottomColor: "#ddd", borderBottomWidth: 0.5 }}>
            <View style={{...styles.headerContainer }}>
              <TouchableOpacity onPress={() => navigation.goBack()} >
                <AntDesign name="arrowleft" size={20} color="black" />
              </TouchableOpacity>
              <View style={{ alignItems: 'center', paddingHorizontal: 12 }}>
                <Image source={{ uri: userToData.data.profile_pic }} style={styles.userProfileStyles} />
                <Text style={{ fontSize: 8, textAlign: 'center' }}>{userToData.data.user}</Text>
              </View>
            </View>
        </View>
          <FlatList 
            data={chatRoom.data.results}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (

              <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
              {
                checkMessageUser(item, user) ?
                <View style={{ marginRight: 85 }} > 
                  <ChatMessageComponent item={item} bgColor={"#fff"} />
                </View> :
                <View style={{ marginLeft: 85 }} > 
                  <ChatMessageComponent item={item} bgColor={"#ddd"} />
                </View>
              }
              </TouchableWithoutFeedback>
            )}
            keyExtractor={item => (item.id.toString())}
          />
          
          <AppForm
            initialValues={{ room: ID, description: "", message_to: item.reciever,}}
            validationSchema={validationSchema}
            onSubmit={(values) => sendMessage(values)}
          >
            <View style={styles.inputContainer}>
                  <AppTextInput
                    name="description"
                    placeholder="Enter Message"
                    placeholderColor="#ddd"
                    multiline
                    isInline
                  />
                  <TouchableOpacity style={styles.sendBtn}>
                      <IconButton title="GO" icon="paper-plane-o" />
                  </TouchableOpacity>
            </View>
          </AppForm>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
   flex: 1,
   backgroundColor: 'grey',
  //  justifyContent: 'space-between',
  },
  textInput: {
    borderWidth: 0,
    backgroundColor: "grey",
    color: "#fff",
    borderRadius: 5,  
    padding: 15,
    borderColor: "#fff",
    margin: 5,
    paddingHorizontal: 8
  },
  userProfileStyles: {
    width: 30,
    height: 30,
    borderRadius: 64
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',   
    paddingHorizontal: 15, 
    justifyContent: 'space-between',
    // elevation: 2, 
    height: 50, 
  },
  recievedMsgTime: {
    fontSize: 10,
    color: "#777",
    letterSpacing: 0.5,
    alignSelf: 'flex-start',
    marginLeft: 12
  },
  SentMsgTime: {
    fontSize: 10,
    color: "#777",
    letterSpacing: 0.5,
  },
  typing: {
    margin: 10,
    padding: 8,
    backgroundColor: '#fff',
    borderRadius: 2,
  },
  sentMsgItem: {
    marginLeft: 10,
    marginVertical: 8,
    padding: 8,
    backgroundColor: '#fff',
    maxWidth: 180,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  sendBtn: {
    backgroundColor: '#2C3335',
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftWidth: 0.4,
    borderLeftColor: "#777",
    borderRadius: 50,
    margin: 5,
    width: 50,
    height: 50
  },
  inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderTopWidth: 0.5,
      borderTopColor: "#ddd",
      backgroundColor: "#fff",
      margin: 0,
      backgroundColor: 'grey'
  }
})

const mapStateToProps = state => {
  return{
    authToken: state.auth.token
  }
}
export default connect(mapStateToProps, null)(ChatRoom)