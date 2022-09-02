// /* eslint-disable react/prop-types */
// import {TextInput, StyleSheet, View, TouchableOpacity,Text} from 'react-native';
// import React,{useState} from 'react';
// import colors from 'src/utils/themes/global-colors';
// import {
//     heightPercentageToDP,
//   heightPercentageToDP as hp,
//   widthPercentageToDP,
//   widthPercentageToDP as wp,
// } from 'react-native-responsive-screen';
// import RNPickerSelect from 'react-native-picker-select';
// import DropDown from "react-native-paper-dropdown";

// export default function DropdownMenu() {
//   const [showDropDown, setShowDropDown] = useState(false);
//   const [gender, setGender] = useState('');
 

//   const genderList = [
//     {
//       label: "Male",
//       value: "male",
//     },
//     {
//       label: "Female",
//       value: "female",
//     },
//     {
//       label: "Others",
//       value: "others",
//     },
//   ];
//   return (
//     <View style={styles.mainView}>
//     <DropDown
//               label={"Gender"}
//               mode={"outlined"}
//               visible={showDropDown}
//               showDropDown={() => setShowDropDown(true)}
//               onDismiss={() => setShowDropDown(false)}
//               value={gender}
//               setValue={setGender}
//               list={genderList}
              
//             />
//      {/* <RNPickerSelect
//             onValueChange={(value) => console.log(value)}
//             items={[
//                 { label: 'Football', value: 'football' },
//                 { label: 'Baseball', value: 'baseball' },
//                 { label: 'Hockey', value: 'hockey' },
//             ]}
//         /> */}
//     </View>
//   );
// }
// const styles = StyleSheet.create({

//   mainView: {
//     // flex: 1,
//     margin: 20,
//     marginBottom: 15,
//     height:200,
//     justifyContent: "center",
//   },

// });


import  React from 'react';
import {  View, StyleSheet } from 'react-native';

// You can import from local files
import DropDownPicker from 'react-native-dropdown-picker'

export default function CustomPicker() {
  return (
    <View style={styles.container}>
      <DropDownPicker
          items={[
              {label: 'English', value: 'en'},
              {label: 'Deutsch', value: 'de'},
              {label: 'French', value: 'fr'},
          ]}
          defaultIndex={0}
          containerStyle={{height: 40}}
          onChangeItem={item => console.log(item.label, item.value)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 12,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },

});
