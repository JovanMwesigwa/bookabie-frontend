import React, { useEffect, useContext, useState }  from 'react'
import { View,  StatusBar, Image } from 'react-native'
import { Divider, Surface, Text } from 'react-native-paper';
import { AuthContext } from '../context/authentication/Context'
import { APIROOTURL } from '../ApiRootURL/ApiRootUrl'
import { StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';
import moment from 'moment';
import { connect } from 'react-redux'
 


const SentMessagesItem = ({authToken, item}) => {

    
    const { authState } = useContext(AuthContext);
    const token = authToken;

    const [ userData, setUserData ] = useState({});

    const fetchUser = async() => {
        try{
            const resData = await axios.get(`${APIROOTURL}/api/profile/${item.reciever}/detail/`,{
                headers: {
                    'Authorization': `Token ${token}`
                }
            })
            setUserData(resData.data);
            // console.log(userData.data)
        }catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        fetchUser();
    },[])

const { container } = styles
 return(
//   <View style={container}>
    <Surface style={styles.surface}>
        
        <View style={styles.senderProfile}>
            <Image source={{ uri: userData.profile_pic }} style={{ flex: 1, width: null, height: null, borderRadius: 65 }} />
        </View>
            
        <View style={styles.messageContent}>
            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.greyHeader}>Sent To</Text>
                <Text style={{ paddingHorizontal: 5, fontSize: 13, fontWeight: '700' }}>{userData.user}</Text>
            </View>
            <View>
                <Text numberOfLines={2}>{item.msg_content}</Text>
              <Text style={styles.SentMsgTime}>about { moment(item.date_sent).startOf('hour').fromNow()}</Text>
                
            </View>
        </View>
        
        <MaterialCommunityIcons name="email-check-outline" size={18} color='green' />

        
    </Surface>
//   </View>
  ) 
}


const styles = StyleSheet.create({
  container: {
   flex: 1,
//    justifyContent: 'center',
//    alignItems: 'center',
  },
  surface: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 24,
    marginLeft: 24,
    marginRight: 24,
    height: 95,
    width: "85%",
    borderRadius: 5,
    borderTopWidth: 0.8,
    borderTopColor: "#ddd",
  },
  SentMsgTime: {
    fontSize: 10,
    color: "#777",
    // paddingHorizontal: 3,
    letterSpacing: 0.5,
    alignSelf: 'flex-start',
    marginRight: 12
  },
  messageContent: {
      flex: 2,
      paddingHorizontal: 24,
  },
  greyHeader: {
      color: "#A1ABAB",
  },
  icon: {
      color: "#A1ABAB",
      fontSize: 12,
  },
  senderProfile: {
      borderWidth: 0.5,
      width: 45,
      height: 45,
      borderRadius: 65
  }
})

const mapStateToProps = state => {
    return{
        authToken: state.auth.token
    }
}
export default connect(mapStateToProps, null)(SentMessagesItem)