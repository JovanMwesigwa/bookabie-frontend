import { StyleSheet } from 'react-native'

export const GlobalStyles = StyleSheet.create({
  themeColor: {
    color: "#B83227",
  },
  darkFontColor: {
    color: "#333945",
  },
  darkHeaderText: {
    fontSize: 14,
    color: "#333945",
    fontWeight: "700",
  },
  greyTextSmall: {
    fontSize: 12,
    color: "#777",
    paddingHorizontal: 3,
    letterSpacing: 0.5
  },
  greyTextLarge: {
    fontSize: 16,
    color: "#777",
    paddingHorizontal: 3,
    letterSpacing: 0.5,
    fontWeight: '700'
  },
  darkTitleText: {
    fontSize: 18,
    color: "#333945",
    fontWeight: '700',
    letterSpacing: 0.5
  },
  customGreyText: { 
    fontSize: 15, 
    fontWeight: '700', 
    color: '#777', 
    paddingLeft: 4 
  },
  text: {
    color: '#2C3335', 
    fontWeight: '500',
    fontSize: 15,
    lineHeight: 18, 
    letterSpacing: 0.3,
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowSpaceBtn: { 
    flex: 1, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between'
  },
  primaryText: { 
    textAlign: 'center', 
    color: '#292E2E', 
    letterSpacing:1, 
    paddingHorizontal: 5 
  },
  smallRoundedPictContainer: { 
    width: 40, 
    height: 40, 
    borderRadius: 35,
    borderWidth: 0.5,
    borderColor: '#ddd'
  },
  largeRoundedPictContainer: { 
    width: 50, 
    height: 50, 
    borderRadius: 45,
    borderWidth: 0.5,
    borderColor: '#ddd'
  },
  feedContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', 
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