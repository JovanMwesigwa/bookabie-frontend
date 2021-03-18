import React from 'react'
import { StyleSheet, View, Text } from 'react-native';
import { AntDesign,} from '@expo/vector-icons';
import moment from 'moment';


import { GlobalStyles } from '../../styles/GlobalStyles';


const ChatMessageComponent = ({ item, bgColor }) => {
    return (
        <>
            <View style={{...styles.container, backgroundColor: bgColor,}}>
            <View  >
                <Text style={styles.textStyle}>{item.msg_content}</Text>
                <AntDesign name="check" size={8} color="grey" style={styles.tickStyle} />
            </View>
            </View>
          <Text style={styles.SentMsgTime}>{ moment(item.date_sent).startOf('hour').fromNow()}</Text>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        padding: 12,
        marginLeft: 8,
        marginRight: 8,
        borderRadius: 5,
    },
    tickStyle: { 
        fontWeight: '700', 
        alignSelf: 'flex-end' 
},
    SentMsgTime:{
        fontSize: 9,
        color: "#ddd",
        alignSelf: 'flex-end'
    },
    textStyle: {
        fontSize: 16,
    }
})

export default ChatMessageComponent
