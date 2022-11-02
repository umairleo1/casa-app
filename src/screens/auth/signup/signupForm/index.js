/* eslint-disable no-unused-vars */
import {Text, View} from 'react-native';
import React, {useMemo, useState} from 'react';
import {styles} from './styles';
import Input from 'src/components/textinput';
import Button from 'src/components/button';
import Datepicker from 'src/components/datePicker';
import moment from 'moment';
import {Formik} from 'formik';
import * as Yup from 'yup';
import colors from 'src/utils/themes/global-colors';
import {userService} from 'src/services/auth-service';
// import {useNavigation} from '@react-navigation/native';
import {showMessage} from 'react-native-flash-message';
import {PromoCodeModal} from 'src/components/promo-code-modal';
import MultiSelectPicker from 'src/components/multi-select-picker';
import {getCountries} from 'src/utils/functions/location';

import {useDispatch, useSelector} from 'react-redux';
import {useMetaMask} from 'src/utils/functions/useMetaMask';

export default function SignupForm({setShowSignUp}) {
  // const dispatch = useDispatch();
  // const navigation = useNavigation();
  const passwordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/;

  // const fcmToken = useSelector(state => state?.auth?.fcmToken);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [isMetaLoading, setIsMetaLoading] = React.useState(false);
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [openPromoCode, setOpenPromoCode] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [countryCode, setCountryCode] = React.useState({
    cca2: 'US',
    flag: 'flag-us',
    name: 'United States',
    region: 'Americas',
  });
  const [DATA, setDAta] = React.useState([]);
  const [InviteCode, setInviteCode] = React.useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const heritageList = [
    'Mexico',
    'El Salvador',
    'Guatemala',
    'Honduras',
    'Nicaragua',
    'Panama',
    'Argentina',
    'Bolivia',
    'Brazil',
    'Chile',
    'Colombia',
    'Ecuador',
    'Guyana',
    'Paraguay',
    'Peru',
    'Suriname',
    'Uruguay',
    'Venezuela',
    'Cuba',
    'Haiti',
    'Dominican Republic',
  ];

  const {connect} = useMetaMask({setIsMetaLoading});

  React.useEffect(() => {
    for (var i = 0; i < getCountries().length; i++) {
      heritageList?.includes(getCountries()[i]) &&
        DATA.push({label: getCountries()[i], value: i + 1});
      i == getCountries().length - 1 &&
        DATA.push({label: 'Others', value: i + 1});
    }
  }, []);

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

  const onSelect = Country => {
    setCountryCode(Country);
  };

  const signupFormSchema = useMemo(
    () =>
      Yup.object({
        firstName: Yup.string()
          .trim('The contact name cannot include leading and trailing spaces')
          .min(3, 'Must be longer than 2 characters')
          .max(20, 'Nice try, nobody has a first name that long')
          .required('First name is required'),
        lastName: Yup.string()
          .trim('The contact name cannot include leading and trailing spaces')
          .min(3, 'Must be longer than 2 characters')
          .max(20, 'Nice try, nobody has a last name that long')
          .required('Last name is required'),
        userName: Yup.string()
          .trim('The contact name cannot include leading and trailing spaces')
          .min(3, 'Must be longer than 2 characters')
          .max(20, 'Nice try, nobody has a user name that long')
          .required('User name is required'),
        inviteCode: Yup.string()
          .trim('The contact name cannot include leading and trailing spaces')
          .required('Invite code is required'),
        email: Yup.string()
          .required('Email is required')
          .email('Email format is incorrect'),
        password: Yup.string()
          .required('Password is required')
          .min(8)
          .matches(
            passwordRegex,
            'Atleast have one digit, one capital letter and one special character.',
          ),
      }),
    [],
  );

  const handleSignup = async values => {
    console.log('code ', promoCode);
    if (selectedDate == '') {
      showMessage({
        message: 'Dob must not be empty',
        type: 'danger',
      });
    } else {
      try {
        setIsLoading(true);
        const signupData = {
          firstName: values.firstName,
          lastName: values.lastName,
          userName: values.userName,
          email: values.email,
          password: values.password,
          dob: moment(selectedDate).format('YYYY-MM-DD'),
          promoCode: values.inviteCode,
          ...(selectedItems && {heritage: selectedItems}),
        };

        const result = await userService.signup(signupData);

        showMessage({
          message: result.message,
          type: 'success',
        });
        setShowSignUp(false);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        showMessage({
          message: error.errMsg,
          type: 'danger',
        });
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <View style={styles.scrollView}>
        <Text style={styles.text}>Register for the CasaApp</Text>
        <View style={styles.borderLine} />
        <View style={styles.mainView}>
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              userName: '',
              inviteCode: '',
              email: '',
              password: '',
              birthDate: '',
            }}
            onSubmit={values => handleSignup(values)}
            validationSchema={signupFormSchema}>
            {({
              handleSubmit,
              errors,
              handleChange,
              values,
              touched,
              setFieldTouched,
            }) => (
              <>
                <Input
                  placeholder={'First Name'}
                  value={values.firstName}
                  error={touched.firstName ? errors.firstName : ''}
                  onChangeText={handleChange('firstName')}
                  onBlur={() => setFieldTouched('firstName')}
                />
                <Input
                  placeholder={'Last Name'}
                  value={values.lastName}
                  error={touched.lastName ? errors.lastName : ''}
                  onChangeText={handleChange('lastName')}
                  onBlur={() => setFieldTouched('lastName')}
                />
                <Input
                  placeholder={'User Name'}
                  value={values.userName}
                  error={touched.userName ? errors.userName : ''}
                  onChangeText={handleChange('userName')}
                  onBlur={() => setFieldTouched('userName')}
                />
                <Input
                  placeholder={'Your Email'}
                  value={values.email}
                  error={touched.email ? errors.email : ''}
                  onChangeText={handleChange('email')}
                  onBlur={() => setFieldTouched('email')}
                  type="email-address"
                />
                <Input
                  placeholder={'Your Password'}
                  secureTextEntry={passwordVisible}
                  value={values.password}
                  error={touched.password ? errors.password : ''}
                  onChangeText={handleChange('password')}
                  onBlur={() => setFieldTouched('password')}
                  eyeIcon={!passwordVisible ? 'eye' : 'eye-off'}
                  onPressEye={() => setPasswordVisible(!passwordVisible)}
                />
                <Input
                  placeholder={'Invitation Code'}
                  type="numeric"
                  maxLength={4}
                  value={values.inviteCode}
                  error={touched.inviteCode ? errors.inviteCode : ''}
                  onChangeText={handleChange('inviteCode')}
                  onBlur={() => setFieldTouched('inviteCode')}
                />
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
                  placeholder={!selectedDate}
                  error={touched.birthDate ? errors.birthDate : ''}
                />

                {/* <View style={styles.SearchInputView}>
                  <CountryPickerModal
                    onSelect={Country => onSelect(Country)}
                    countryText={countryCode?.name}
                    countryCode={countryCode?.cca2}
                  />
                </View> */}
                {/* <Dropdown
                      selectedValue={values.gender}
                      onValueChange={handleChange('gender')}
                      error={touched.gender ? errors.gender : ''}
                    /> */}

                <View style={{marginVertical: 10}}>
                  <MultiSelectPicker
                    multiSelect={selectedItems}
                    setMultiSelect={setSelectedItems}
                    data={DATA}
                  />
                </View>
                {/* <TouchableOpacity
                  onPress={() => setOpenPromoCode(true)}
                  style={styles.promoCodeView}>
                  <Text style={styles.promoCode}>
                    Do You Have A Invite Code ?
                  </Text>
                </TouchableOpacity> */}

                <Button
                  loader={isLoading}
                  text="Complete Registration!"
                  onPress={handleSubmit}
                  backgroundColor={colors.buttonColor}
                />
                <Button
                  loader={isMetaLoading}
                  text="Signup With MetaMask"
                  onPress={() => {
                    connect();
                  }}
                  backgroundColor={colors.buttonColor}
                />
              </>
            )}
          </Formik>
        </View>
      </View>
      <PromoCodeModal
        visible={openPromoCode}
        iconPress={() => setOpenPromoCode(false)}
        onPress={() => setOpenPromoCode(false)}
        onCodeChange={code => setPromoCode(code)}
      />
    </>
  );
}
