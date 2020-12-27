import React, { useEffect, useContext, useState } from 'react'
import axios from 'axios'
import { View,  StatusBar, Text, TouchableOpacity } from 'react-native'
import OtherHeaderComponent from '../../components/OtherHeaderComponent';
import { AuthContext } from '../../context/authentication/Context'
import { APIROOTURL } from '../../ApiRootURL/ApiRootUrl'
import { StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import MessagesItem from '../../components/MessageItem';
import SentMessagesItem from '../../components/SentMessage'
import {  Tab, Tabs } from 'native-base';
import { AntDesign } from '@expo/vector-icons';





const Messages = ({ navigation }) => {

    const [ inboxMessages, setInboxMessages ] = useState([]);
    const [ outboxMessages, setOutboxMessages ] = useState([]);


    const { authState } = useContext(AuthContext);
    const token = authState.token;

    const getInboxMessageList = async() => {
        try{
            const msgResponse = await axios.get(`${APIROOTURL}/api/inbox/`, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            })
            setInboxMessages(msgResponse.data);
            
        }catch(err){
            console.log(err);
        } 
    }

    const getOutboxMessageList = async() => {
        try{
            const msgResponse = await axios.get(`${APIROOTURL}/api/outbox/`, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            })
            setOutboxMessages(msgResponse.data);
        }catch(err){
            console.log(err);
        } 
    }

    useEffect(() => {
        getInboxMessageList();
        getOutboxMessageList();
    },[])

    

const { container } = styles
 return(
  <View style={container}>
    <StatusBar backgroundColor="#ddd" barStyle='dark-content' />
    {/* <OtherHeaderComponent  /> */}
     <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingRight: 12 }} >
          <AntDesign name="arrowleft" size={20} color="black" />
        </TouchableOpacity>
        <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#777' }}>My Messages</Text>
    </View> 
            <>
                <Tabs 
                    tabBarUnderlineStyle={{borderBottomWidth:4, borderBottomColor: '#B83227'}}
                    tabContainerStyle={{ height: 45 }}
                    
                    >
                    <Tab heading="Inbox"
                        tabStyle={{backgroundColor: 'white'}} 
                        textStyle={{color: '#777'}} 
                        activeTabStyle={{backgroundColor: 'white'}} 
                        activeTextStyle={{color: '#B83227', fontWeight: '700'}}
                    >

                        <FlatList
                            
                            data={inboxMessages.results}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => navigation.navigate('Chat', {ID: item.sender })}>
                                    <MessagesItem item={item} />
                                </TouchableOpacity>
                            )}
                            keyExtractor={item => (item.id.toString())}
                        />

                    </Tab>
                    <Tab heading="Sent"
                        tabStyle={{backgroundColor: 'white'}} 
                        textStyle={{color: '#777'}} 
                        activeTabStyle={{backgroundColor: 'white'}} 
                        activeTextStyle={{color: '#B83227', fontWeight: '700'}}
                    >

                        <FlatList
                                data={outboxMessages.results}
                                renderItem={({ item }) => (
                                    <TouchableOpacity onPress={() => navigation.navigate('Chat', {ID: item.reciever })}>
                                        <SentMessagesItem item={item} />
                                    </TouchableOpacity>
                                )}
                                keyExtractor={item => (item.id.toString())}
                            />

                    </Tab>
                </Tabs>
            </>
    
  </View>
  ) 
}


const styles = StyleSheet.create({
  container: {
   flex: 1,
//    justifyContent: 'center',
//    alignItems: 'center',
  },
  headerContainer: {  
    backgroundColor: '#fff', 
    padding: 10,
    height: 50,
    borderBottomWidth: 0.1,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 5
}
})
export default Messages