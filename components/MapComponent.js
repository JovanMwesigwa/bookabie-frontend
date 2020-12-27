import React from 'react';
import MapView from 'react-native-maps';
import {View, Text,  StyleSheet,  Dimensions, Modal, TouchableOpacity, StatusBar } from 'react-native';
import { Marker } from 'react-native-maps';


const MapModalComponent = ({visible, close}) => {

    
    const [ region, setRegion ] = React.useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421})
        // AIzaSyDEM-3D5FE9DUWhKYfcnUxzqVCQSberxD4
const { container } = styles
 return(
     <>
        <StatusBar backgroundColor="#ddd" barStyle='light-content' />
        <Modal visible={visible} style={styles.container}>
            <MapView 
                region={region}
                style={styles.mapStyle} >
            </MapView>
            <TouchableOpacity style={styles.closeBtn}
                onPress={close}>
                <Text style={{ fontSize: 12, color: 'white', paddingHorizontal: 15 }}>Close</Text>
            </TouchableOpacity>
        </Modal>
    </>
  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    mapStyle: {

      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
    closeBtn: {
        position: 'absolute',
        top: 10,
        left: 10,
        flexDirection: 'row', 
        padding: 5, 
        backgroundColor: '#B83227', 
        borderRadius: 15, 
        justifyContent: 'center',
        alignItems: 'center'
    },
  });
export default MapModalComponent