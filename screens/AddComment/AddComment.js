import React, { useState,} from 'react'
import { StatusBar, StyleSheet, Text, View, Keyboard, ScrollView } from 'react-native'
import axios from 'axios'
import { connect } from 'react-redux'
import { useNavigation, useRoute } from '@react-navigation/native'
import * as Yup from 'yup'




import { AppTextInput, AppForm, SubmitButton, PostProductHeader} from '../../components/'
import { APIROOTURL } from '../../ApiRootURL/ApiRootUrl';
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
        <ScrollView style={styles.container} onPress={() => Keyboard.dismiss()}>
            
            <Text style={{ color: '#777', fontSize: 12, padding: 15 }}>Your comment:</Text>
            
                

                <AppForm 
                    initialValues={{post: item.id, body: "", author: `Profile for ${userInfo.user}`}}
                    validationSchema={validationSchema}
                    onSubmit={(values) => submitHandler(values)}
                >
                    <View style={styles.formContainer}>
                        <View style={{ flex: 2, marginHorizontal: 20 }}>
                            <AppTextInput
                                name="body"
                                placeholder="Your Comment Here......."
                                inline
                                multiline
                            />
                        </View>
                    <View style={styles.input}>
                        <SubmitButton title="Send" loading={loading} />
                    </View>
                    </View>
                </AppForm>

        </ScrollView>
    </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    formContainer: { 
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    input: { marginRight: 12}
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
