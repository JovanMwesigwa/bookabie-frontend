import React,{ useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Image } from 'react-native'
import { APIROOTURL } from '../../ApiRootURL/ApiRootUrl'
import axios from 'axios';
import { Ionicons, MaterialCommunityIcons,Feather, FontAwesome, AntDesign } from '@expo/vector-icons'
import { Avator, Title, Caption, Paragraph, Drawer, Text, TouchableRipple, Switch } from 'react-native-paper'
import {  DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { signOut } from '../../redux/auth/authRedux'
import { useNavigation } from '@react-navigation/native';



const logo = require('../../assets/Logos/bbieL.png')
const logo2 = require('../../assets/Logos/myLogo.png')




const DrawerContent = ({navigation, authToken, authLogout}) => {

    const [ inboxMessagesLength, setInboxMessagesLength ] = useState([]);

    const token = authToken;

    // const logOut = authLogout

    const [ userInfo, setUserInfo ] = useState([]);

    const fetchUserInfo = () => {
      axios.get(`${APIROOTURL}/api/userprofile/user/detail/`,{
        headers: {
            'Authorization': `Token ${token}`
          }
    })
        .then(res => {
            setUserInfo(res.data);
        })
        .catch(err => {
            console.log(err);
        })
    }

    const getInboxMessageList = async() => {
        try{
            const msgResponse = await axios.get(`${APIROOTURL}/api/inbox/`, {
                headers: {
                    'Authorization': `Token ${token}`
                }
            })
            setInboxMessagesLength(msgResponse.data.results.length);
        }catch(err){
            console.log(err);
        } 
    }

    const signOutHandler = () => {
        authLogout(token)
        // navigation.navigate("Splash")
    }

    useEffect(() => {
        fetchUserInfo();
        getInboxMessageList();
    },[])

     return(
         <View style={{ flex: 1 }}>
             <DrawerContentScrollView >
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{ flexDirection: 'row', marginTop: 15, alignItems: 'center' }}>
                                <Image source={{ uri: userInfo.profile_pic }} style={{ width: 50, height: 50, borderRadius: 50, borderWidth: 0.5, borderColor: '#777'}} />
                            <View style={{ marginLeft: 12 }}>
                                <Title style={styles.title}>{userInfo.user}</Title>
                                <Caption style={styles.caption}>@{userInfo.location}</Caption>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph,styles.caption]}>80</Paragraph>
                                <Caption style={styles.caption}>following</Caption>
                            </View>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph,styles.caption]}>100</Paragraph>
                                <Caption style={styles.caption}>followers</Caption>
                            </View>
                        </View>
                    </View> 

                    <Drawer.Section style={styles.drawerSection}>

                    <TouchableOpacity style={{ flexDirection: 'row', 
                        alignItems: 'center', paddingHorizontal: 12, 
                        paddingVertical: 12 }}
                        onPress={() => navigation.navigate('Find')}
                        >
                        {/* <Ionicons name="md-exit"  /> */}
                        <FontAwesome name="home" size={28} color="#777" />

                        <Text style={{ paddingLeft: 15, fontSize: 16, color: '#777' }}>Home</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ flexDirection: 'row', 
                        alignItems: 'center', paddingHorizontal: 12,   
                        paddingVertical: 12 }}
                        onPress={() => navigation.navigate('Profile')}
                        >
                        {/* <Ionicons name="md-exit"  /> */}
                        <MaterialCommunityIcons name="account-circle" size={28} color="#777" />
                        <Text style={{ paddingLeft: 15, fontSize: 15, color: '#777' }}>Profile</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ flexDirection: 'row', 
                        alignItems: 'center', paddingHorizontal: 12, 
                        paddingVertical: 12 }}
                        onPress={() => navigation.navigate('Cart')}
                        >
                    {/* <FontAwesome name="cart"  /> */}
                        <AntDesign name='shoppingcart' size={28} color="#777" />
                        <Text style={{ paddingLeft: 15, fontSize: 15, color: '#777' }}>Cart</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('Messages')} style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 12 }}>
                        <AntDesign name='mail' size={25} color="#777" />
                        <Text style={{ paddingLeft: 15, fontSize: 15, color: '#777' }}>Messages</Text>
                        {
                            inboxMessagesLength <= 0 ? null : 
                            <View style={styles.messageNotification}>
                                <Text style={{ color: '#fff' }}>{inboxMessagesLength}</Text>
                            </View>
                        }
                    </TouchableOpacity>

                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', 
                        paddingHorizontal: 12, paddingVertical: 12 }}
                        onPress={() => navigation.navigate('Settings')}
                        >
                        <Feather name="settings" size={24} color="#777" />
                        <Text style={{ paddingLeft: 15, fontSize: 15, color: '#777' }}>Settings </Text>
                    </TouchableOpacity>

                    </Drawer.Section>

                    <Drawer.Section title="Preferences">
                            <TouchableRipple>
                                <View style={styles.preference}>
                                    <Text style={{fontSize: 15, color: '#777' }}>Dark Theme</Text>
                                    <View pointerEvents="none">
                                        <Switch />
                                    </View>
                                </View>
                            </TouchableRipple>
                    </Drawer.Section>

                </View>
                <View style={{ flexDirection: 'row', elevation: 5, paddingHorizontal: 15, alignItems: 'center' }}>
                    <Image source={logo} style={{ width: 34, height: 34 }} />
                    <Image source={logo2} style={styles.cartStyles} />
                    <View>
                        <Text style={styles.textStyle}>Bookabie</Text>
                        <Text style={styles.capTextStyle}>Sell & Buy Beyond</Text>
                    </View>
                </View> 
             </DrawerContentScrollView>
             <Drawer.Section style={styles.bottomDrawerSection}>
                 <TouchableOpacity style={{ flexDirection: 'row', 
                    alignItems: 'center', paddingHorizontal: 12, 
                    paddingVertical: 12 }}
                    onPress={signOutHandler}
                    >
                    <Ionicons name="md-exit" size={28} color="#777" />
                    <Text style={{ paddingLeft: 15, fontSize: 15, color: '#777' }}>Sign Out</Text>
                 </TouchableOpacity>
             </Drawer.Section>
         </View>
     )
 }

 const styles = StyleSheet.create({
     drawerContent: {
         flex: 1
     },
     userInfoSection: {
         paddingLeft: 20,
     },
     title: {
         fontSize: 16,
         marginTop: 3,
         fontWeight: 'bold'
     },
     textStyle: {
        fontSize: 15,
        paddingHorizontal: 10,
        color: '#B83227',
     },
     capTextStyle: {
        paddingHorizontal: 10,
        color: '#B83227',
        fontSize: 12
     },
     messageNotification: { 
        backgroundColor: 'red', 
        paddingHorizontal: 3,
        borderRadius: 5,
        position: 'absolute',
        top: 15,
        right: 24
    },
     caption: {
         fontSize: 14,
         lineHeight: 14
     },
     row: {
         marginTop: 20,
         flexDirection: 'row',
         marginRight: 15
     },
     section: {
         flexDirection: 'row',
         alignItems: 'center',
         marginRight: 15
     },
     cartStyles: { 
         width: 40, 
         height: 40,
         marginLeft: 5,
         borderRadius: 5
        },
     paragraph: {
         fontWeight: 'bold',
         marginRight: 3
     },
     drawerSection: {
         marginTop: 15
     },
     bottomDrawerSection: {
         marginBottom: 15,
         borderTopColor: '#f4f4f4',
         borderTopWidth: 1
     },
     preference: {
         flexDirection: 'row',
         justifyContent: 'space-between',
         paddingVertical: 12,
        paddingHorizontal: 16
     }
 })

 const mapStateToProps = state => {
     return{
         authToken: state.auth.token
     }
 }

 const mapDispatchToProps = dispatch => {
     return{
         authLogout: (token) => dispatch(signOut(token))
     }
 }

 export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent);