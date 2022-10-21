/* eslint-disable no-unused-vars */
import {Text, View, TouchableOpacity} from 'react-native';
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
import {useNavigation} from '@react-navigation/native';
import {showMessage} from 'react-native-flash-message';
import {PromoCodeModal} from 'src/components/promo-code-modal';
import CountryPickerModal from 'src/components/country-picker';
import MultiSelectPicker from 'src/components/multi-select-picker';
import {getCountries, getStates} from 'src/utils/functions/location';

import MetaMaskSDK from '@metamask/sdk';
import {Linking} from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import {ethers} from 'ethers';

// import ErrorBoundary from 'src/components/error-boundaries';

const MMSDK = new MetaMaskSDK({
  openDeeplink: link => {
    Linking.openURL(link); // Use React Native Linking method or your favourite way of opening deeplinks
  },
  timer: BackgroundTimer, // To keep the app alive once it goes to background
  dappMetadata: {
    name: 'My App', // The name of your application
    url: 'https://myapp.com', // The url of your website
  },
});

const ethereum = MMSDK.getProvider();

const provider = new ethers.providers.Web3Provider(ethereum);

export default function SignupForm({setShowSignUp}) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [isLoading, setIsLoading] = React.useState(false);
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

  const navigation = useNavigation();

  const passwordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/;

  React.useEffect(() => {
    for (var i = 0; i < getCountries().length; i++) {
      heritageList?.includes(getCountries()[i]) &&
        DATA.push({label: getCountries()[i], value: i + 1});
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
    // console.log('code ', promoCode);
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
          ...(promoCode && {promoCode}),
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

  const getBalance = async () => {
    if (!ethereum.selectedAddress) {
      return;
    }
    const bal = await provider.getBalance(ethereum.selectedAddress);
    // setBalance(ethers.utils.formatEther(bal));
    console.log('getBalance ', ethers.utils.formatEther(bal));
  };

  React.useEffect(() => {
    ethereum.on('chainChanged', chain => {
      console.log('chain ', chain);
      // setChain(chain);
    });
    ethereum.on('accountsChanged', accounts => {
      console.log('accounts ', accounts);
      // setAccount(accounts?.[0]);

      getBalance();
    });
  }, []);

  const connect = async () => {
    try {
      const result = await ethereum.request({method: 'eth_requestAccounts'});

      console.log('RESULT', result);

      // setAccount(result?.[0]);
      getBalance();
    } catch (e) {
      console.log('ERROR', e);
    }
  };

  const exampleRequest = async () => {
    try {
      const result = await ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: '0x89',
            chainName: 'Polygon',
            blockExplorerUrls: ['https://polygonscan.com'],
            nativeCurrency: {symbol: 'MATIC', decimals: 18},
            rpcUrls: ['https://polygon-rpc.com/'],
          },
        ],
      });
      console.log('RESULT', result);
      // setResponse(result);
    } catch (e) {
      console.log('ERROR', e);
    }
  };

  const sign = async () => {
    const msgParams = JSON.stringify({
      domain: {
        // Defining the chain aka Rinkeby testnet or Ethereum Main Net
        chainId: parseInt(ethereum.chainId, 16),
        // Give a user friendly name to the specific contract you are signing for.
        name: 'Ether Mail',
        // If name isn't enough add verifying contract to make sure you are establishing contracts with the proper entity
        verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
        // Just let's you know the latest version. Definitely make sure the field name is correct.
        version: '1',
      },

      // Defining the message signing data content.
      message: {
        /*
         - Anything you want. Just a JSON Blob that encodes the data you want to send
         - No required fields
         - This is DApp Specific
         - Be as explicit as possible when building out the message schema.
        */
        contents: 'Umair, Leo!',
        attachedMoneyInEth: 4.2,
        from: {
          name: 'Cow',
          wallets: [
            '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
            '0xDeaDbeefdEAdbeefdEadbEEFdeadbeEFdEaDbeeF',
          ],
        },
        to: [
          {
            name: 'Bob',
            wallets: [
              '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
              '0xB0BdaBea57B0BDABeA57b0bdABEA57b0BDabEa57',
              '0xB0B0b0b0b0b0B000000000000000000000000000',
            ],
          },
        ],
      },
      // Refers to the keys of the *types* object below.
      primaryType: 'Mail',
      types: {
        // TODO: Clarify if EIP712Domain refers to the domain the contract is hosted on
        EIP712Domain: [
          {name: 'name', type: 'string'},
          {name: 'version', type: 'string'},
          {name: 'chainId', type: 'uint256'},
          {name: 'verifyingContract', type: 'address'},
        ],
        // Not an EIP712Domain definition
        Group: [
          {name: 'name', type: 'string'},
          {name: 'members', type: 'Person[]'},
        ],
        // Refer to PrimaryType
        Mail: [
          {name: 'from', type: 'Person'},
          {name: 'to', type: 'Person[]'},
          {name: 'contents', type: 'string'},
        ],
        // Not an EIP712Domain definition
        Person: [
          {name: 'name', type: 'string'},
          {name: 'wallets', type: 'address[]'},
        ],
      },
    });

    var from = ethereum.selectedAddress;

    var params = [from, msgParams];
    var method = 'eth_signTypedData_v4';

    const resp = await ethereum.request({method, params});
    // setResponse(resp);
    console.log('ethereum.request ', resp);
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
                <TouchableOpacity
                  onPress={() => setOpenPromoCode(true)}
                  style={styles.promoCodeView}>
                  <Text style={styles.promoCode}>
                    Do You Have A Invite Code ?
                  </Text>
                </TouchableOpacity>
                <Button
                  loader={isLoading}
                  text="Complete Registration!"
                  onPress={handleSubmit}
                  backgroundColor={colors.buttonColor}
                />
                <Button
                  loader={isLoading}
                  text="Signup Metamask"
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
