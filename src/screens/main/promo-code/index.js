/* eslint-disable no-unused-vars */
import {Text, View, ScrollView, Platform} from 'react-native';
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
import {onShare} from 'src/components/social-share';

export default function PromoCode() {
  const navigation = useNavigation();
  const [code, setCode] = React.useState('');
  const [copiedText, setCopiedText] = React.useState('');
  const [limit, setLimit] = React.useState('');

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
      setLimit(result?.message?.usedCount);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Header onPressBack={() => navigation.goBack()} heading={'Referral Invite'}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.image}>
            <PromoCodeImage />
          </View>
          <Text style={styles.title}>
            Invite People with your Referral Invite
          </Text>
          <Text style={styles.description}>
            Share the code below and ask them to enter it.If people enter your
            special referral invite then you’ll be friends.
          </Text>
          <InvitationLink
            text={'Referral Invite'}
            linkText={code}
            onPress={() => {
              code !== '' && copyToClipboard();
            }}
          />
          {code !== '0000' && (
            <Text
              style={[
                styles.description,
                {color: limit >= 3 && colors.danger},
              ]}>
              Referral Invite Limit {limit < 3 ? `${limit} / 3` : 'Exceeds'}
            </Text>
          )}
        </View>
      </ScrollView>
      <View style={styles.buttonView}>
        <Button
          backgroundColor={colors.buttonColor}
          text={'Invite People'}
          onPress={async () => {
            await onShare({
              title:
                'Share this referral code with friends to invite then in Casa',
              ...(Platform.OS == 'ios'
                ? {
                    message: `Share this ${code} code with your friends to invite then in Casa.`,
                  }
                : {
                    url: `Share this ${code} code with your friends to invite then in Casa.`,
                  }),
            });
          }}
        />
      </View>
    </Header>
  );
}
