import React, { useEffect } from 'react'
import {StyleSheet, View,  StatusBar, Text, TouchableOpacity, FlatList } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import {  Tab, Tabs } from 'native-base';
import { AntDesign } from '@expo/vector-icons';
import { connect } from 'react-redux'



import {MessagesItem, SentMessagesItem} from '../../components/';
import { GlobalStyles } from '../../styles/GlobalStyles';
import useAuthUser from '../../hooks/useAuthUser'
import useFetchData from '../../hooks/useFetchData'




const url = `api/rooms/`
const inboxUrl = `api/inbox/`
const outboxUrl = `api/outbox/`


const Messages = ({ authToken }) => {

    const navigation = useNavigation()

    const token = authToken;

    const user = useAuthUser(token)

    const { data, request } = useFetchData(token, url)

    const inboxData = useFetchData(token, inboxUrl)

    const outboxData = useFetchData(token, outboxUrl)


    useEffect(() => {
        inboxData.request()
        outboxData.request()
        request()
    },[])

    

const { container } = styles
 return(
  <View style={container}>
    <StatusBar backgroundColor="#ddd" barStyle='dark-content' />
     <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingRight: 12 }} >
          <AntDesign name="arrowleft" size={20} color="black" />
        </TouchableOpacity>
        <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#777' }}>My Messages</Text>
    </View> 
            <>
                <Tabs 
                    tabBarUnderlineStyle={{borderBottomWidth:4, borderBottomColor: GlobalStyles.themeColor.color}}
                    tabContainerStyle={{ 
                        height: 45,
                        width: '100%',
                        elevation: 0,
                        shadowOpacity: 0,
                        borderBottomWidth: 0.5,
                        borderBottomColor: '#ddd',
                     }}
                    >
                    <Tab heading="Inbox"
                        tabStyle={{backgroundColor: 'white'}} 
                        textStyle={{color: '#777'}} 
                        activeTabStyle={{backgroundColor: 'white'}} 
                        activeTextStyle={{color: GlobalStyles.themeColor.color, fontWeight: '700'}}
                    >

                        <FlatList
                            data={inboxData.data.results}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <TouchableOpacity onPress={() => navigation.navigate('Chat', {item: item, ID: item.id, chatWithID: item.parent_owner })}>
                                    <MessagesItem item={item} authUser={user} />
                                </TouchableOpacity>
                            )}
                            keyExtractor={item => (item.id.toString())}
                        />

                    </Tab>
                    <Tab heading="Sent"
                        tabStyle={{backgroundColor: 'white'}} 
                        textStyle={{color: '#777'}} 
                        activeTabStyle={{backgroundColor: 'white'}} 
                        activeTextStyle={{color: GlobalStyles.themeColor.color, fontWeight: '700'}}
                    >

                        <FlatList
                                data={outboxData.data.results}
                                showsVerticalScrollIndicator={false}
                                renderItem={({ item }) => (
                                    <TouchableOpacity onPress={() => navigation.navigate('Chat', {item: item, ID: item.id })}>
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
  },
  headerContainer: {  
    backgroundColor: '#fff', 
    padding: 10,
    height: 50,
    borderBottomWidth: 0.1,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 0
}
})

const mapStateToProps = state => {
    return{
        authToken: state.auth.token
    }
}
export default connect(mapStateToProps, null)(Messages)