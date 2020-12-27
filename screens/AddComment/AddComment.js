import React, { useState, useEffect, useContext, } from 'react'
import { StatusBar, StyleSheet, Text, View, TouchableOpacity, Image, KeyboardAvoidingView, Keyboard } from 'react-native'
import PostProductHeader from '../../components/PostProductHeader'
import { AuthContext } from '../../context/authentication/Context'
import { APIROOTURL } from '../../ApiRootURL/ApiRootUrl';
import axios from 'axios'
import { Container, Header, Content, Item, Input, ListItem,  Textarea, Radio, Right, Left } from 'native-base';
import { UserInfoContext } from '../../context/userInfoContext/UserInfoContextProvider';


export default function AddComment({ route, navigation }) {
    const [ content, setContent ] = useState(null);

    const { authState } = useContext(AuthContext);
    const { userInfo } = useContext(UserInfoContext);

    const token = authState.token

    //  CAHNGE THIS WARNING USING NAVIGATION.SETOPTIONS
    const { item, refreshPost } = route.params;

    const data = {
        post: item.id,
        body: content,
        author: `Profile for ${userInfo.user}`
    }

    const submitComment = () => {
        axios.post(`${APIROOTURL}/api/comment/create/`, data, {
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
        refreshPost()
        navigation.goBack()
    }

    // console.log("Profile for ",userInfo.user);
    return (

        
        <View style={styles.container}>
            <StatusBar backgroundColor="#ddd" barStyle='dark-content' />
            <PostProductHeader />
            
            <Text style={{ color: '#777', fontSize: 12, padding: 15 }}>Your comment on</Text>
            <View style={styles.postContainer}>  
                <Image source={{ uri: item.author.profile_pic }} style={styles.authorProfileContainer} />
                <View style={{ flexDirection: 'column', marginRight: 18 }}>
                    <Text style={{ fontSize: 15, paddingLeft: 8, color: '#777' }}>{item.title}</Text>
                    <View style={{ margin: 12, paddingVertical: 8, borderWidth: 0.5, borderColor: '#777', borderRadius: 8 }}>
                        <Text style={{fontSize: 15, padding: 10, color: '#777' }}>{item.description}</Text>
                    </View>
                </View>
            </View>
            
            <View style={{ flex: 2, padding: 12}}>
                    <Image source={{ uri: userInfo.profile_pic }} style={styles.profileContainer} />
                <View style={{ flexDirection: 'row' }}>
                    <Textarea rowSpan={4}  style={styles.inputContainer} 
                        // placeholder='Add your Comment' 
                        placeholderTextColor="grey" 
                        value={content}
                        onChangeText={text => setContent(text)}
                    />
                    <TouchableOpacity style={styles.buttonContainer} onPress={submitComment}> 
                        <Text style={{ fontSize: 15, color: 'white', }}>Send</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    profileContainer: {
        width: 40,
        height: 40,
        // backgroundColor: 'white',
        borderRadius: 45
    },
    authorProfileContainer: {
        width: 35,
        height: 35,
        // backgroundColor: 'white',
        borderRadius: 35
    },
    postContainer: {
        // flex: 1,
        flexDirection: 'row', 
        paddingHorizontal: 15, 
        // borderBottomWidth: 0.5, 
        // borderBottomColor: '#ddd',
        // backgroundColor: '#ddd',
        // alignItems: 'center',
        borderTopWidth: 0.5,
        borderTopColor: '#ddd',
        paddingVertical: 8
},
    inputContainer: {
        flex: 1,
        marginVertical: 10,
        padding: 8,
        borderRadius: 12,
        borderWidth: 0.5,
        borderColor: '#7B8788',
        margin: 18,
    
      },
      buttonContainer: {
        padding: 5,
        backgroundColor: '#B83227',
        borderRadius: 8,
        marginVertical: 18,
        height: '30%'
      },
})
