import React,{ useEffect, useState, useContext } from 'react'
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import moment from 'moment';
import { Caption, Paragraph } from 'react-native-paper';
import { AuthContext } from '../context/authentication/Context'
import { APIROOTURL } from '../ApiRootURL/ApiRootUrl'
import axios from 'axios';
import { GlobalStyles } from '../styles/GlobalStyles';
import { connect } from 'react-redux'
import AppText from './AppText';



const CommentComponent = ({ authToken, item }) => {

    const { authState } = useContext(AuthContext);

    const token = authToken;

    const [ userData, setUserData ] = useState({});

    const fetchUser = async() => {
        try{
            const resData = await axios.get(`${APIROOTURL}/api/profile/${item.author.id}/detail/`,{
                headers: {
                    'Authorization': `Token ${token}`
                }
            })
            setUserData(resData.data);
        }catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        fetchUser();
    },[])

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.profileContainer}>
                <Image source={{ uri: item.author.profile_pic }} style={[GlobalStyles.smallRoundedPictContainer, {width: 38, height: 38}]} />
            </TouchableOpacity>
            <View style={styles.textBody}>
                <AppText {...styles.username}>{userData.user}</AppText>
                <AppText {...styles.timeStamp}>/ Posted about { moment(item.date_commented).startOf('hour').fromNow()}</AppText>
                <AppText {...styles.text} >{item.body}</AppText>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 8
    },
    textBody: {
        flex: 1,
        backgroundColor: 'white',
        padding: 8,
        borderRadius: 12,
    },
    text: {
        fontSize: 14,
        paddingVertical: 8
    },
    profileContainer: {
        marginRight: 15
    },
    timeStamp: {
        fontSize: 11, 
        color: '#777'
    },
    username: {
        fontWeight: "700",
        fontSize: 14
    }
})

const mapStateToProps = state => {
    return{
        authToken: state.auth.token
    }
}

export default connect(mapStateToProps, null)(CommentComponent)
