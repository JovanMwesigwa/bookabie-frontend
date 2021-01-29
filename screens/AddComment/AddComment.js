import React, { useState, useEffect, useContext, } from 'react'
import { StatusBar, StyleSheet, Text, View, TouchableOpacity, Image, KeyboardAvoidingView, Keyboard } from 'react-native'
import PostProductHeader from '../../components/PostProductHeader'
import { AuthContext } from '../../context/authentication/Context'
import { APIROOTURL } from '../../ApiRootURL/ApiRootUrl';
import axios from 'axios'
import { Container, Header, Content, Item, Input, ListItem,  Textarea, Radio, Right, Left } from 'native-base';
import { UserInfoContext } from '../../context/userInfoContext/UserInfoContextProvider';
import { connect } from 'react-redux'
import { ActivityIndicator } from 'react-native';
import { GlobalStyles } from '../../styles/GlobalStyles';




const AddComment = ({authToken, route, navigation })  => {

    const [ content, setContent ] = useState(null);
    const [ loading, setLoading ] = useState(false);
    const { authState } = useContext(AuthContext);
    const { userInfo } = useContext(UserInfoContext);

    const token = authToken

    //  CAHNGE THIS WARNING USING NAVIGATION.SETOPTIONS
    const { item,  reloadPosts } = route.params;

    const data = {
        post: item.id,
        body: content,
        author: `Profile for ${userInfo.user}`
    }

    const postCommentHandler = () => {
        setLoading(true)
        setTimeout(() => {
            submitComment()
        },1000)
        
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
            setLoading(false)
            // reloadPosts()
            navigation.goBack()
    }

    // console.log("Profile for ",userInfo.user);
    return (

        <View style={styles.container} onPress={() => Keyboard.dismiss()}>
            <StatusBar backgroundColor="#ddd" barStyle='dark-content' />
            <PostProductHeader />
            
            <Text style={{ color: '#777', fontSize: 12, padding: 15 }}>Your comment:</Text>
            
            <View style={{ flex: 1, padding: 12}}>
                    <Image source={{ uri: userInfo.profile_pic }} style={styles.profileContainer} />
                <View style={{ flexDirection: 'row' }}>
                    <Textarea rowSpan={4}  style={styles.inputContainer} 
                        // placeholder='Add your Comment' 
                        placeholderTextColor="grey" 
                        value={content}
                        onChangeText={text => setContent(text)}
                    />
                    <TouchableOpacity style={styles.buttonContainer} onPress={postCommentHandler}> 
                    {
                        loading ? <ActivityIndicator color="#fff" size={15} style={styles.indicatorStyles} /> :
                        <Text style={{ fontSize: 15, color: 'white', }}>Send</Text>
                    }
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
    indicatorStyles: {
        paddingHorizontal: 15,
        paddingTop: 4
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
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: '#7B8788',
        margin: 18,
    
      },
      buttonContainer: {
        padding: 5,
        paddingHorizontal: 8,
        backgroundColor: '#B83227',
        borderRadius: 5,
        marginVertical: 18,
        height: '30%'
      },
})

const mapStateToProps = state => {
    return{
        authToken: state.auth.token
    }
}

export default connect(mapStateToProps, null)(AddComment)
