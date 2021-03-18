import React,{ useContext,  useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, StatusBar, RefreshControl } from 'react-native'
import { connect } from 'react-redux'



import {ApploadingComponent, ErrorView, CompanyCard, MainHeaderComponent, } from '../../components/';
import { UserInfoContext } from '../../context/userInfoContext/UserInfoContextProvider'
import useAuthUser from '../../hooks/useAuthUser';
import useFetchData from '../../hooks/useFetchData'




const CompanyList = ({ authToken }) => {

    const { userInfo } = useContext(UserInfoContext);

    const token = authToken;

    const dataApi = useFetchData(token, `api/profiles/`)

    const authUserName = useAuthUser(token)


useEffect(() => {
  dataApi.request()
},[])



const name = userInfo.user;

  if(dataApi.loading) return <ApploadingComponent />

  if (dataApi.errors) return <ErrorView onPress={() => console.log("Reload list...")} error={dataApi.errors} />

const refreshControl = <RefreshControl refreshing={dataApi.loading} onRefresh={() => dataApi.request()} />
 return(
    <View style={styles.container}>
        <StatusBar backgroundColor='white' barStyle='dark-content' />
        <MainHeaderComponent />
        <View style={styles.infoHeader}>
          <Text style={styles.headerText}>ALL COMPANIES</Text>
        </View>
            <FlatList
                data={dataApi.data.results}
                showsVerticalScrollIndicator={false}
                refreshControl={refreshControl}
                renderItem={({ item }) => (
                    <CompanyCard item={item} companyName={name} authUserName={authUserName.user} />
                )}
                keyExtractor={(item) => item.id.toString()}
            />
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorStyles: { 
    padding: 10, 
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: '80%',
    left: '5%',
    backgroundColor: 'black', 
    borderRadius: 5,
    elevation: 2,
},
infoHeader: { 
    backgroundColor: '#ddd', 
    padding: 5, 
    paddingBottom: 10, 
    paddingHorizontal: 20, 
    elevation: 1
},
headerText: { 
    fontSize: 15, 
    fontWeight: 'bold', 
    color: '#777' 
},
})

const mapStateToProps = state => {
  return{
    authToken: state.auth.token
  }
}
export default connect(mapStateToProps)(CompanyList)