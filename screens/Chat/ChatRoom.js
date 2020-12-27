import React, { useState, useContext, useEffect } from 'react'
import { View, Text, StyleSheet, Keyboard, Image, StatusBar, TouchableOpacity, TouchableWithoutFeedback, ScrollView } from 'react-native'
import OtherHeaderComponent from '../../components/OtherHeaderComponent';
import { Container, Header, Content, Input, Item, SwipeRow,  Icon, Button } from 'native-base';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { GlobalStyles } from '../../styles/GlobalStyles'
import { AuthContext } from '../../context/authentication/Context'
import { APIROOTURL } from '../../ApiRootURL/ApiRootUrl'
import { UserInfoContext } from '../../context/userInfoContext/UserInfoContextProvider';
import moment from 'moment';
import axios from 'axios';



const ChatRoom = ({ navigation, route }) => {

    const { authState } = useContext(AuthContext);

    const { userInfo } = useContext(UserInfoContext);

    const token = authState.token;

    const { ID } = route.params

    const [ userData, setUserData ] = useState([]);

    const [ rooms, setRooms ] = useState([]);

    const [ roomReplies, setRoomReplies ] = useState([]);

    const [ text, setText ] = useState("");

    const [ sentMessages, setSentMessages ] = useState([]);

    const fetchRoom = async() => {
      try {
        const resData = await axios.get(`${APIROOTURL}/api/chat_room/${ID}/`,{
          headers: {
            'Authorization': `Token ${token}`, 
          }
        })
        setRooms(resData.data.results);
      } catch (error) {
        console.log(error);
      }
    }

    const fetchRoomReplies = async() => {
      try {
        const responseReplies = await axios.get(`${APIROOTURL}/api/chat_room_replies/${ID}/`,{
          headers: {
            'Authorization': `Token ${token}`, 
          }
        })
        setRoomReplies(responseReplies.data.results);
      } catch (error) {
        console.log(error)
      }
    }

    const fetchUser = async() => {
      try {
        const responseData = await axios.get(`${APIROOTURL}/api/profile/${ID}/detail/`, {
          headers: {
            'Authorization': `Token ${token}`, 
          }
        })
        setUserData(responseData.data);
      } catch (error) {
        console.log(error);
      }
    }

    

    const sendMessage = async() => {
      let data = {
        sender: userInfo.id,
        msg_content: text,
        reciever: userData.id,
      }
      await axios.post(`${APIROOTURL}/api/create-message/`, data ,{
          headers: {
            'Authorization': `Token ${token}`,
          }
      })
    }

    useEffect(() => {
      fetchRoom();
      fetchUser();
      fetchRoomReplies();
    },[])

    const submitHandler = () => {
        sendMessage()
        setText('')
        fetchRoom();
    }

    const DismissKeyboard = ({ children }) => (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
      </TouchableWithoutFeedback>
    );

    // console.log(ID);

const { container } = styles
 return(
  <View style={container}>
    <StatusBar backgroundColor="#ddd" barStyle='dark-content' />

    <View >
      <View style={{...styles.headerContainer }}>
        <TouchableOpacity onPress={() => navigation.goBack()} >
          <AntDesign name="arrowleft" size={20} color="black" />
        </TouchableOpacity>
        <View style={{ alignItems: 'center', paddingHorizontal: 12 }}>
          <Image source={{ uri: userData.profile_pic }} style={styles.userProfileStyles} />
          <Text style={{ fontSize: 8, textAlign: 'center' }}>{userData.user}</Text>
        </View>
      </View>
    </View>
    
    <DismissKeyboard>
      <ScrollView style={{ flex: 2 }}>

        {
          rooms.map(room => (
            <View key={room.id}>
              <View  style={styles.recievedMsgItem}>
                <Text>{room.msg_content}</Text>
                <AntDesign name="check" size={8} color="grey" style={{ fontWeight: '700', alignSelf: 'flex-end' }} />
              </View>
              <Text style={styles.SentMsgTime}>about { moment(room.date_sent).startOf('hour').fromNow()}</Text>
            </View>
          ))
        }

        {
          roomReplies.map(roomReply => (
            <View key={roomReply.id}>
              <View  style={styles.sentMsgItem}>
                  <Text>{roomReply.msg_content}</Text>
                  <AntDesign name="check" size={8} color="green" style={{ fontWeight: '700', alignSelf: 'flex-end' }} />
              </View>
              <Text style={styles.recievedMsgTime}>about { moment(roomReply.date_sent).startOf('hour').fromNow()}</Text>
            </View>
          ))
        }

      </ScrollView>
    </DismissKeyboard>
    
    <View style={styles.inputContainer}>
        <Item regular style={{ flex: 1, borderRadius: 5, marginLeft: 0 }}>
            <Input placeholder='Enter Message...'
            value={text} 
            onChangeText={text => setText(text)}
            style={styles.textInput} />
        </Item>
        <TouchableOpacity style={styles.sendBtn} onPress={submitHandler}>
            {/* <Text style={styles.textStyle}>GO</Text> */}
            <FontAwesome name="paper-plane-o" size={20} color="#fff" style={styles.textStyle} />
        </TouchableOpacity>
    </View>
  </View>
  )
}


const styles = StyleSheet.create({
  container: {
   flex: 1,
   backgroundColor: '#2C3335',
   justifyContent: 'space-between',
  },
  textInput: {
      backgroundColor: '#fff',
      
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
    // paddingHorizontal: 3,
    letterSpacing: 0.5,
    alignSelf: 'flex-start',
    marginLeft: 12
  },
  SentMsgTime: {
    fontSize: 10,
    color: "#777",
    // paddingHorizontal: 3,
    letterSpacing: 0.5,
    alignSelf: 'flex-end',
    marginRight: 12
  },
  textStyle: {
    textAlign: 'center',
    paddingTop: 15,
    color: '#fff',
    fontWeight: "700"
  },
  recievedMsgItem: {
    margin: 10,
    padding: 8,
    backgroundColor: '#fff',
    maxWidth: 180,
    borderRadius: 2,
    alignSelf: 'flex-end',
    elevation: 5
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
    borderRadius: 2,
    alignSelf: 'flex-start',
    elevation: 5
  },
  sendBtn: {
    backgroundColor: '#B83227',
    marginHorizontal: 5,
    borderRadius: 8,
    width: 60,
  },
  inputContainer: {
      flexDirection: 'row',
      
  }
})
export default ChatRoom