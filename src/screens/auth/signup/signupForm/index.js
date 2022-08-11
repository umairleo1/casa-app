import {Text, View} from 'react-native';
import React, {useState} from 'react';
import {styles} from './styles';
import Input from 'src/components/textinput';
import Dropdown from 'src/components/dropdown';
import Button from 'src/components/button';
import CheckBox from 'src/components/checkbox';
import Datepicker from 'src/components/datePicker';
import moment from 'moment';

export default function SignupForm() {
  const [selectedValue, setSelectedValue] = useState('');
  const [checked, setUnChecked] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState();

  const handleConfirm = date => {
    setSelectedDate(date);
    hideDatePicker();
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  return (
    <>
      <Text style={styles.text}>Register to Company</Text>
      <View style={styles.borderLine} />
      <View style={styles.mainView}>
        <Input placeholder={'First Name'} />
        <Input placeholder={'Last Name'} />
        <Input placeholder={'Your Email'} />
        <Input placeholder={'Your Password'} secureTextEntry={true} />
        <Datepicker
          handleConfirm={handleConfirm}
          hideDatePicker={hideDatePicker}
          showDatePicker={showDatePicker}
          isVisible={isDatePickerVisible}
          date={` ${
            selectedDate
              ? moment(selectedDate).format('MM/DD/YYYY')
              : 'Your Birthday'
          }`}
        />
        <Dropdown
          selectedValue={selectedValue}
          onValueChange={item => setSelectedValue(item)}
        />
        <CheckBox
          isChecked={checked}
          onPress={() => setUnChecked(!checked)}
          tc1="I accept the"
          tc2="Terms and Conditions"
          tc3="of the app"
        />
        <Button text="Complete Registration!" disabled={!checked && true} />
      </View>
    </>
  );
}
