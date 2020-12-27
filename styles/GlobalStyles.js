import { StyleSheet } from 'react-native'

export const GlobalStyles = StyleSheet.create({
  text: {
    color: '#2C3335', 
    fontWeight: '500',
    fontSize: 15,
    lineHeight: 18, 
    letterSpacing: 0.3,
  },
  primaryText: { 
      textAlign: 'center', 
    color: '#292E2E', 
    letterSpacing:1, 
    paddingHorizontal: 5 
  },
  roundedPictContainer: { 
    width: 55, 
    height: 55, 
    borderRadius: 25 
  },
  feedContainer: {
    // paddingTop: 15,
    // paddingHorizontal: 15,
    // paddingBottom: 15,
    // backgroundColor: "white",
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', 
    // borderBottomWidth: 1,
    // borderBottomColor: '#7777',
    // borderBottomLeftRadius: 5,
    // borderBottomLeftRadius: 5
  },
  headerContainer: { 
    flex: 1, 
    marginVertical: 15, 
    marginHorizontal: 12, 
    flexDirection: 'row', 
    width: '100%', 
    alignItems: 'center', 
    justifyContent: 'space-between',
    lineHeight: 18, 
    letterSpacing: 0.3,
},
  fillerText: { 
    fontSize: 14, 
    backgroundColor: '#ddd',
    padding: 5, 
    borderRadius: 15,
    lineHeight: 18, 
    letterSpacing: 0.3,
},
  roundProfilePic: {
    width: 55, 
    height: 55, 
    borderRadius: 25
  },
  mainColor: {
    color: '#B83227'
  },
  mutedText: {
    color: '#777E8B',
  },
  headerText: {
    fontSize: 15, 
    color: '#333945',
    // color: 'green',
    fontWeight: '700',
    paddingHorizontal: 5, 
    lineHeight: 18, 
    letterSpacing: 0.3,
  },
  secondaryHeaderText: {
    color: '#05325a',
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 18, 
    letterSpacing: 0.3,
  }
});