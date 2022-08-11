import {Text, View} from 'react-native';
import React, {useState} from 'react';
import {styles} from './styles';
import Input from 'src/components/textinput';
import Dropdown from 'src/components/dropdown';
import Button from 'src/components/button';
import CheckBox from 'src/components/checkbox';

export default function LoginForm() {
  const [checked, setUnChecked] = useState(false);

  return (
    <>
      <Text style={styles.text}>Login to Company</Text>
      <View style={styles.borderLine} />
      <View style={styles.mainView}>
        <Input placeholder={'First Name'} />
        <Input placeholder={'Last Name'} />

        <Button text="Complete Registration!" />
      </View>
    </>
  );
}
