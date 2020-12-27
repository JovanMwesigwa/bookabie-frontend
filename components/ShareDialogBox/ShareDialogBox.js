import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Button, Paragraph, Dialog, Portal, Text } from 'react-native-paper';
import { RadioButton } from 'react-native-paper';

const ShareDialogBox = ({shareBoxvisible, hideShareDialog}) => {

    const [checked, setChecked] = React.useState('first');
    const [value, setValue] = React.useState('first');

  const hideDialog = () => showShowShareDialog(false);

  return (
    <View>
      {/* <Button onPress={showDialog}>Show Dialog</Button> */}
      <Portal>
        <Dialog visible={shareBoxvisible} onDismiss={hideDialog}>
          <Dialog.Title>Share post to</Dialog.Title>
          <Dialog.ScrollArea>
            <ScrollView contentContainerStyle={{paddingHorizontal: 24}}>
            <RadioButton.Group onValueChange={value => setValue(value)} value={value} >
                <RadioButton.Item color="#B83227" label="First item" value="first" />
                <RadioButton.Item color="#B83227" label="Second item" value="second" />
                <RadioButton.Item color="#B83227" label="First item" value="Third" />
                <RadioButton.Item color="#B83227" label="Second item" value="fourth" />
            </RadioButton.Group>
            </ScrollView>
            </Dialog.ScrollArea>
          <Dialog.Actions>
            <Button onPress={hideShareDialog} color="#B83227">Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
    btn: {
        color: "red",
    }
});

export default ShareDialogBox;