import React,{ useEffect, useState, useContext } from 'react'
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import moment from 'moment';
import { Caption, Paragraph } from 'react-native-paper';
import { AuthContext } from '../context/authentication/Context'
import { APIROOTURL } from '../ApiRootURL/ApiRootUrl'
import axios from 'axios';
import { GlobalStyles } from '../styles/GlobalStyles';


const CommentComponent = ({ item }) => {

    const { authState } = useContext(AuthContext);

    const token = authState.token;

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
                <Image source={{ uri: item.author.profile_pic }} style={GlobalStyles.smallRoundedPictContainer} />
            </TouchableOpacity>
            <View style={styles.textBody}>
                <Text style={GlobalStyles.darkHeaderText}>{userData.user}</Text>
                <Paragraph style={{ paddingVertical: 6, color: GlobalStyles.darkFontColor.color}}>{item.body}</Paragraph>
                <Caption style={{ fontSize: 10, color: '#777', }}>/ Posted about { moment(item.date_commented).startOf('hour').fromNow()}</Caption>
            </View>
        </View>
    )
}

export default CommentComponent

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
    profileContainer: {
        marginRight: 15
    }
})
