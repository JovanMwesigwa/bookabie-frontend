import React from 'react'
import { View,  StyleSheet, StatusBar } from 'react-native'
import OtherHeaderComponent from '../../components/OtherHeaderComponent';
import { Container, Header, Content, List, ListItem, Text, Form, Item, Input, Button, Label } from 'native-base';

const SettingsComponent = (props) => {

const { container } = styles
 return(
  <>
    <StatusBar backgroundColor="#ddd" barStyle='dark-content' />
      <OtherHeaderComponent  />
      <Container>
        <Content>
          <List>
            <ListItem itemDivider>
              <Text>ACCOUNT</Text>
            </ListItem>                    
                <Content>
              <Form >

                <View style={styles.editContainer}>
                  <Item stackedLabel style={{ flex: 2 }} >
                    <Label>Edit username</Label>
                    <Input />
                  </Item>
                    <View style={styles.editBtn}>
                      <Text style={{ color: '#B83227',  fontSize: 12 }}>Edit</Text>
                    </View>
                </View>

                <View style={styles.editContainer}>
                  <Item stackedLabel style={{ flex: 2 }}>
                    <Label>Confirm Change username</Label>
                    <Input  />
                  </Item>
                    <View style={styles.editBtn}>
                      <Text style={{ color: '#B83227',  fontSize: 12 }}>Edit</Text>
                    </View>
                </View>

                <View style={styles.editContainer}>
                  <Item stackedLabel style={{ flex: 2 }}>
                    <Label>Edit email</Label>
                    <Input />
                  </Item>
                    <View style={styles.editBtn}>
                      <Text style={{ color: '#B83227', fontSize: 12  }}>Edit</Text>
                    </View>
                </View>

              </Form>
              </Content>
            <ListItem itemDivider>
              <Text>SECURITY</Text>
            </ListItem>                    
                <Content>
              <Form style={styles.form}>

              <View style={styles.editContainer}>
                <Item stackedLabel style={{ flex: 2 }}>
                  <Label>Change password</Label>
                  <Input  />
                </Item>
                  <View style={styles.editBtn}>
                    <Text style={{ color: '#B83227', fontSize: 12 }}>Edit</Text>
                  </View>
              </View>

              <View style={styles.editContainer}>
                <Item stackedLabel style={{ flex: 2 }}>
                  <Label>Confirm Change password</Label>
                  <Input />
                </Item>
                  <View style={styles.editBtn}>
                    <Text style={{ color: '#B83227', fontSize: 12 }}>Edit</Text>
                  </View>
              </View>

              </Form>
              </Content>
              <ListItem itemDivider>
              <Text style={{ color: '#B83227' }}>DANGER ZONE</Text>
            </ListItem>                    
                <Content>
              <Form>

              <View style={styles.editContainer}>
              <Item stackedLabel style={{ flex: 2 }}>
                  <Label style={{ color: '#B83227'  }}>Change Uid Code</Label>
                  <Input />
                </Item>
                  <View style={styles.editBtn}>
                    <Text style={{ color: '#B83227', fontSize: 12 }}>Edit</Text>
                  </View>
              </View>

                <Item style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12, margin: 12 }} >
                  <Label style={{ color: '#B83227'  }}>deactivate account</Label>
                  <View style={styles.btn}>
                    <Text style={{ color: '#fff',  }}>Delete</Text>
                  </View>
                </Item>
              </Form>
              </Content>
          </List>
        </Content>
      </Container>
  </>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 15
   },
   btn: {
     padding: 8,
     backgroundColor: '#B83227',
     borderRadius: 8,
     elevation: 4
   },
   editBtn: {
    padding: 8,
    height: 35,
     backgroundColor: '#fff',
     borderRadius: 8,
     elevation: 2,
     marginHorizontal: 12
   },
   editContainer: { 
     flex: 1, 
     flexDirection: 'row',
     alignItems: 'center' 
    },
   form: {
     marginVertical: 15
   }
})
export default SettingsComponent