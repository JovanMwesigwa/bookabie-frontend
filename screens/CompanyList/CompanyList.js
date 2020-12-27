import React,{ useContext } from 'react'
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity, StatusBar, RefreshControl } from 'react-native'
import { AccountContext } from '../../context/accounts/AccountContextProvider'
import CompanyCard from '../../components/CompanyCard';
import SecondaryHeader from '../../components/SecondaryHeader';
import * as Animatable from 'react-native-animatable';
import { UserInfoContext } from '../../context/userInfoContext/UserInfoContextProvider'

const CompanyList = ({ navigation }) => {

    const { accounts, accLoading, accErrors, fetchRefreshedData }  = useContext(AccountContext);

    const { userInfo } = useContext(UserInfoContext);

    const navigateBack = () => {
      navigation.goBack()
    }

// const accList = state.accounts.results

const name = userInfo.user;

// console.log(accList);
const { container } = styles

const refreshControl = <RefreshControl
    refreshing={accLoading}
    onRefresh={fetchRefreshedData}
/>
 return(
    <View style={{ flex: 1 }}>
       <StatusBar backgroundColor='white' barStyle='dark-content' />
        <SecondaryHeader />
        <View style={{ backgroundColor: '#ddd', padding: 5, paddingBottom: 10, paddingHorizontal: 20, elevation: 1}}>
          <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#777' }}>ALL COMPANIES</Text>
        </View>
        {accLoading ? 
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', }}>
            <ActivityIndicator size='small' collapsable color='#B83227' />
        </View>
        :
        <FlatList
            data={accounts}
            refreshControl={refreshControl}
            renderItem={({ item }) => (
                <CompanyCard item={item} companyName={name} />
            )}
            keyExtractor={(item) => item.id.toString()}
        />
        }
        {accErrors ? 
        <Animatable.View style={styles.errorStyles}
          animation='fadeInUp'
          delay={10000}
          duration = {2000}> 
          <Text style={{ textAlign: 'center', color: 'white', letterSpacing:1 }}>{accErrors}</Text> 
        </Animatable.View>
        
        : null }
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
export default CompanyList