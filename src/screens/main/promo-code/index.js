/* eslint-disable no-unused-vars */
import {Text, View, ScrollView} from 'react-native';
import React from 'react';
import Header from 'src/components/headerView';
import {PromoCodeImage} from 'src/assets/svg/promo-code';
import InvitationLink from 'src/components/invitation-link';
import {styles} from './styles';
import Button from 'src/components/button';
import colors from 'src/utils/themes/global-colors';
import {useNavigation} from '@react-navigation/native';
import {postServices} from 'src/services/post-service';
import {showMessage} from 'react-native-flash-message';
import Clipboard from '@react-native-community/clipboard';

export default function PromoCode() {
  const navigation = useNavigation();
  const [code, setCode] = React.useState('');
  const [copiedText, setCopiedText] = React.useState('');

  React.useEffect(() => {
    getPromoCode();
  }, []);

  const copyToClipboard = () => {
    Clipboard.setString(code);
    showMessage({
      message: 'Code coppied successfully',
      type: 'success',
    });
  };

  const fetchCopiedText = async () => {
    const text = await Clipboard.getString();
    setCopiedText(text);
  };

  const getPromoCode = async () => {
    try {
      const result = await postServices.getPromoCodeApi();
      console.log('Here is the promo code ', result);
      setCode(result?.message?.code || '');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Header onPressBack={() => navigation.goBack()} heading={'Promo Code'}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.image}>
            <PromoCodeImage />
          </View>
          <Text style={styles.title}>Invite People with your Promo Code </Text>
          <Text style={styles.description}>
            Share the code below and ask them to enter it.If people enter your
            special promo code then you’ll be friends.
          </Text>
          <InvitationLink
            text={'Promo Code'}
            linkText={code}
            onPress={() => {
              code !== '' && copyToClipboard();
            }}
          />
          {/* <Text>{copiedText}</Text> */}
        </View>
      </ScrollView>
      <View style={styles.buttonView}>
        <Button
          backgroundColor={colors.buttonColor}
          text={'Invite People'}
          onPress={() => fetchCopiedText()}
        />
      </View>
    </Header>
  );
}
