import React, { useState,} from 'react'
import { StatusBar, StyleSheet, Text, View, Keyboard } from 'react-native'
import axios from 'axios'
import { connect } from 'react-redux'
import { useNavigation, useRoute } from '@react-navigation/native'
import * as Yup from 'yup'




import AppTextInput from '../../components/Forms/AppTextInput'
import { APIROOTURL } from '../../ApiRootURL/ApiRootUrl';
import PostProductHeader from '../../components/PostProductHeader'
import AppForm from '../../components/Forms/AppForm';
import SubmitButton from '../../components/Forms/SubmitButton'
import { hotReloadPosts } from '../../redux/posts/postsRedux';
import useAuthUser from '../../hooks/useAuthUser'
import useFetchData from '../../hooks/useFetchData'


const validationSchema = Yup.object().shape({
    body: Yup.string().required().label("Comment")
})

const AddComment = ({authToken })  => {

    const navigation = useNavigation()
    const route = useRoute()

    const [ loading, setLoading ] = useState(false);

    const token = authToken;

    const userInfo = useAuthUser(token)
 
    const postData = useFetchData(token, )

    //  CAHNGE THIS WARNING USING NAVIGATION.SETOPTIONS
    const { item, refreshPost } = route.params;


    const submitHandler = async (data) => {
        setLoading(true)
        await axios.post(`${APIROOTURL}/api/comment/create/`, data, {
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
            // hotReloadPostsFunc(token)
            refreshPost()
            navigation.goBack()
            
            
    }

    return (
        <>
            <StatusBar backgroundColor="#ddd" barStyle='dark-content' />
            <PostProductHeader />
        <View style={styles.container} onPress={() => Keyboard.dismiss()}>
            
            <Text style={{ color: '#777', fontSize: 12, padding: 15 }}>Your comment:</Text>
            
                <View style={styles.formContainer}>

                    <AppForm 
                        initialValues={{post: item.id, body: "", author: `Profile for ${userInfo.user}`}}
                        validationSchema={validationSchema}
                        onSubmit={(values) => submitHandler(values)}
                    >
                        <AppTextInput
                            name="body"
                            placeholder="Your Comment Here"
                            multiline
                            isInline
                        />
                        <View style={{ paddingLeft: 8}}>
                            <SubmitButton title="Send" loading={loading} />
                        </View>
                    </AppForm>

                </View>
        </View>
    </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 8,
    },

    formContainer: { 
        flexDirection: 'row',
        width: "100%",
        justifyContent: "space-around"
    },
})

const mapStateToProps = state => {
    return{
        authToken: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        hotReloadPostsFunc: (token) => dispatch(hotReloadPosts(token))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddComment)
