import React,{ useContext,  useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, ActivityIndicator, StatusBar, RefreshControl } from 'react-native'
import CompanyCard from '../../components/CompanyCard';
import SecondaryHeader from '../../components/SecondaryHeader';
import * as Animatable from 'react-native-animatable';
import { UserInfoContext } from '../../context/userInfoContext/UserInfoContextProvider'
import { connect } from 'react-redux'
import useAuthUser from '../../hooks/useAuthUser';
import useFetchData from '../../hooks/useFetchData'



const url = "api/profiles/"

const CompanyList = ({ authToken }) => {

    const { userInfo } = useContext(UserInfoContext);

    const token = authToken;

    const dataApi = useFetchData(token, url)

    const authUserName = useAuthUser(token)


useEffect(() => {
  dataApi.request()
},[])


const name = userInfo.user;

const refreshControl = <RefreshControl
    refreshing={dataApi.loading}
    onRefresh={() => dataApi.request()}
/>
 return(
    <View style={{ flex: 1 }}>
       <StatusBar backgroundColor='white' barStyle='dark-content' />
        <SecondaryHeader />
        <View style={{ backgroundColor: '#ddd', padding: 5, paddingBottom: 10, paddingHorizontal: 20, elevation: 1}}>
          <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#777' }}>ALL COMPANIES</Text>
        </View>
        {dataApi.loading ? 
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
            <ActivityIndicator size='small' collapsable color='#B83227' />
        </View>
        :
        <FlatList
            data={dataApi.data.results}
            showsVerticalScrollIndicator={false}
            refreshControl={refreshControl}
            renderItem={({ item }) => (
                <CompanyCard item={item} companyName={name} authUserName={authUserName.user} />
            )}
            keyExtractor={(item) => item.id.toString()}
        />
        }
        {dataApi.errors ? 
          <Animatable.View style={styles.errorStyles}
            animation='fadeInUp'
            delay={10000}
            duration = {2000}> 
            <Text style={{ textAlign: 'center', color: 'white', letterSpacing:1 }}>{dataApi.errors}</Text> 
          </Animatable.View>
          
          : null
         }
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
    // borderLeftWidth: 5,
    // borderLeftColor: '#B83227' 
},
  
})

const mapStateToProps = state => {
  return{
    authToken: state.auth.token
  }
}
export default connect(mapStateToProps)(CompanyList)