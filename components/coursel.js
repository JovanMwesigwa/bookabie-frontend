// import React from 'react'
// import { View, Text, StyleSheet, ImageBackground, Image } from 'react-native'
// import { TouchableOpacity } from 'react-native-gesture-handler';
// import { GlobalStyles } from '../styles/GlobalStyles'
// import { Video } from 'expo-av';

// const video = require('../assets/videos/vid3.mp4');

// const Coursel = ({ backgroundImage, description, profileImg, name }) => {

//  return(
//   <View style={{...styles.image}}>
//     <Video 
//         source={backgroundImage}
//         rate={1.0}
//         volume={1.0}
//         isMuted={true}
//         resizeMode="cover"
//         shouldPlay={false}
//         isLooping
//         style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', opacity: 0.5,shadowRadius: 4.84, }}
//       />
//       <View style={{...styles.promTextContainer}}>
//           <TouchableOpacity style={styles.profilePositioning}>
//               <Image source={profileImg} style={{...GlobalStyles.roundProfilePic, ...styles.profileImage, }} />
//               <Text style={styles.text}>{name}</Text>
//           </TouchableOpacity>
//       </View>
//       <View style={styles.descriptionTextTextContainer}>
//            <Text style={styles.descriptionText}>{description}</Text>
//        </View>
//       <TouchableOpacity style={styles.seeMoreContainer}>
//           <Text style={{...styles.text, textAlign: 'center', fontSize: 9, padding: 2, fontWeight: '700'}}>See More</Text>
//       </TouchableOpacity>
//   </View>
//   // <ImageBackground source={backgroundImage} style={styles.image}>

//   //     <View style={styles.child}>
//   //       <View style={styles.promTextContainer}>
//   //       <TouchableOpacity style={styles.profilePositioning}>
//   //           <Image source={profileImg} style={{...GlobalStyles.roundProfilePic, ...styles.profileImage}} />
//   //           <Text style={styles.text}>{name}</Text>
//   //       </TouchableOpacity>
//   //       </View>
      

//   //       <View style={styles.descriptionTextTextContainer}>
//   //         <Text style={styles.descriptionText}>{description}</Text>
//   //       </View>
//   //     </View>
//   //     <TouchableOpacity style={styles.seeMoreContainer}>
//   //         <Text style={{...styles.text, textAlign: 'center', fontSize: 15, padding: 8, fontWeight: '700'}}>See More</Text>
//   //     </TouchableOpacity>
//   // </ImageBackground>
//   )
// }


// const styles = StyleSheet.create({
//   image: {
//       justifyContent: "center",
//       borderRadius: 15,
//       width: 200,
//       height: 200,
//       overflow: 'hidden',
//       marginHorizontal: 5,
//       // borderBottomRightRadius: 25,
//       elevation: 5,
//   },
//   seeMoreContainer: {
//     backgroundColor: '#EA7773',
//     shadowOpacity: 0.6,
//     shadowRadius: 4.84,
//   },
//   text: { 
//     color: 'white', 
//     paddingHorizontal: 8, 
//     fontSize: 14, 
//     fontWeight: 'bold' 
//   },
//   profilePositioning: {
//     flexDirection: 'row', 
//     justifyContent: 'center',
//     alignItems: 'center',
//     elevation: 5
//   },
//   profileImage: {
//     width: 32, 
//     height: 32,
//     borderWidth: 1,
//     borderColor: 'grey',
//   },
//   child: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.4)'
//   },
//   promText: {
//     fontSize: 15,
//     backgroundColor: '#fff',
//     // fontWeight: 'bold',
//     padding: 8,
//     letterSpacing: 1,
//     color: '#B83227'
//     // color: 'white',
//     // borderRadius: 5
//   },
//   promTextContainer: {
//     position: 'absolute',
//     borderBottomWidth: 1,
//     borderBottomColor: 'white',
//     top: 19,
//     left: 19,
//     padding: 5,
//   },
//   descriptionTextTextContainer: {
//     position: 'absolute',
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     shadowOpacity: 0.8,
//     shadowRadius: 4.84,
//     bottom: 16,
//     padding: 8
//   },
//   descriptionText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#fff',
//     letterSpacing: 2,
    
//   },
//   companyContainer: {
//     backgroundColor: '#fff',
//     position: 'absolute',
//     right: 1,
//     bottom: 5,
//     borderRadius: 5
//   }
// })
// export default Coursel