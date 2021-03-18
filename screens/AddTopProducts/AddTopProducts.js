import React, {useEffect } from 'react'
import { StyleSheet, View,  FlatList,TouchableOpacity } from 'react-native'



import { GlobalStyles } from '../../styles/GlobalStyles';
import { ApploadingComponent, AppText, ErrorView, TopProductTwoCard} from '../../components/';
import useFetchData from '../../hooks/useFetchData'





const AddTopProducts = ({ route, navigation }) => {

    const { token, item, reload } = route.params;
    
    const { data, loading, errors, request } = useFetchData(token, `api/profileposts/${item.user}/`)

    const submit = () => {
        reload()
        navigation.goBack()
    }

    useEffect(() => {
        request()
    },[])

    if(loading) return <ApploadingComponent />

    if(errors) return <ErrorView onPress={reload} error="OOPs!, Something went wrong.." />

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
