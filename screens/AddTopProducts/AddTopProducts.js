import React, {useEffect } from 'react'
import { ActivityIndicator, StyleSheet, Text, View,  FlatList,TouchableOpacity } from 'react-native'



import useFetchData from '../../hooks/useFetchData'
import { GlobalStyles } from '../../styles/GlobalStyles';
import TopProductTwoCard from '../../components/TopProductTwoCard';
import AppText from '../../components/AppText';




const AddTopProducts = ({ route, navigation }) => {

    const { token, item } = route.params;
    
    const { data, loading, errors, request } = useFetchData(token, `api/profileposts/${item.user}/`)

    const submit = () => {
        navigation.goBack()
    }

    useEffect(() => {
        request()
    },[])

    if(loading) return <ActivityIndicator color={GlobalStyles.themeColor.color} size={18} />

    if(errors) return <Text>error occured</Text>

    return (
        <View style={styles.container}>
            <FlatList
                data={data.results}
                keyExtractor={( item ) => item.id.toString()}
                renderItem={({ item }) => (
                    <TopProductTwoCard 
                        item={item}
                        token={token}
                    />
                )}
                ListFooterComponent={
                    <TouchableOpacity style={styles.button} onPress={submit}>
                        <AppText textAlign="center" fontSize={18} fontWeight="bold" color="#fff">Done</AppText>
                    </TouchableOpacity>
                }
            /> 
            
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        alignSelf: 'center',
        backgroundColor: GlobalStyles.themeColor.color,
        borderRadius: 15,
        marginVertical: 15,
        padding: 8,
        width: "80%",
    },
    container: {
        flex: 1
    }
})

export default AddTopProducts
