import React,{  useEffect, }  from 'react'
import { View, StyleSheet,  Image } from 'react-native'
import { Surface, Text } from 'react-native-paper';
import moment from 'moment';
import { connect } from 'react-redux'




import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GlobalStyles } from '../styles/GlobalStyles';
import useFetchData from '../hooks/useFetchData'


const MessagesItem = ({authToken, item}) => {

    const token = authToken;

    const { data,  request } = useFetchData(token, `api/profile/${item.sender}/detail/`)


    useEffect(() => {
        request();
    },[])

const { container } = styles
 return(
//   <View style={container}>
    <Surface style={styles.surface}>
        
        <View style={styles.senderProfile}>
            <Image source={{ uri: data.profile_pic }} style={GlobalStyles.smallRoundedPictContainer} />
        </View>
            
        <View style={styles.messageContent}>
            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.greyHeader}>Chat with</Text>
                <Text style={{ paddingHorizontal: 5, fontSize: 13, fontWeight: "700" }}>{data.user}</Text>
            </View>
            <View>
                <Text numberOfLines={2}>{item.msg_content}</Text>
                <Text style={styles.SentMsgTime}>about { moment(item.date_sent).startOf('hour').fromNow()}</Text>
            </View>
        </View>
        
        <MaterialCommunityIcons name="account" size={18} color='green' />
    </Surface>
  ) 
}


const styles = StyleSheet.create({
  container: {
   flex: 1,
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
    borderBottomWidth: 0.8,
    borderBottomColor: "#ddd",
  },
  SentMsgTime: {
    fontSize: 10,
    color: "#777",
    letterSpacing: 0.5,
    alignSelf: 'flex-start',
    marginRight: 12
  },
  messageContent: {
      flex: 2,
      paddingHorizontal: 24
  },
  greyHeader: {
      color: "#A1ABAB",
  },
  icon: {
      color: "#A1ABAB",
      fontSize: 12,
  },
  senderProfile: {

  }
})

const mapStateToProps = state => {
    return {
        authToken: state.auth.token
    }
}
export default connect(mapStateToProps, null)(MessagesItem)