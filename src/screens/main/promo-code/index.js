import {Text, View, ScrollView} from 'react-native';
import React from 'react';
import Header from 'src/components/headerView';
import {PromoCodeImage} from 'src/assets/svg/promo-code';
import InvitationLink from 'src/components/invitation-link';
import {styles} from './styles';
import Button from 'src/components/button';
import colors from 'src/utils/themes/global-colors';
import {useNavigation} from '@react-navigation/native';

export default function PromoCode() {
  const navigation = useNavigation();

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
            text={'Invitation Link'}
            linkText={'crumina.net/html-olympus/03-Newsfeed'}
            onPress={undefined}
          />
        </View>
      </ScrollView>
      <View style={styles.buttonView}>
        <Button
          backgroundColor={colors.buttonColor}
          text={'Invite People'}
          onPress={() => navigation.navigate('PROMO_CODE')}
        />
      </View>
    </Header>
  );
}
