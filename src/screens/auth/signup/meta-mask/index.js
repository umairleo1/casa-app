/* eslint-disable no-unused-vars */

import React from 'react';

import {userService} from 'src/services/auth-service';
import {useNavigation} from '@react-navigation/native';

import MetaMaskSDK from '@metamask/sdk';
import {Linking} from 'react-native';
import BackgroundTimer from 'react-native-background-timer';
import {ethers} from 'ethers';

import {useDispatch, useSelector} from 'react-redux';
import {setUserReduxToken} from 'src/redux/auth/auth-actions';

import asyncStorage from 'utils/async-storage/index';

// import ErrorBoundary from 'src/components/error-boundaries';

const MMSDK = new MetaMaskSDK({
  openDeeplink: link => {
    Linking.openURL(link); // Use React Native Linking method or your favourite way of opening deeplinks
  },
  timer: BackgroundTimer, // To keep the app alive once it goes to background
  dappMetadata: {
    name: 'Casa App', // The name of your application
    url: 'https://CasaApp.com', // The url of your website
  },
});

const ethereum = MMSDK.getProvider();

const provider = new ethers.providers.Web3Provider(ethereum);

export default function MetaMask() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const fcmToken = useSelector(state => state?.auth?.fcmToken);
  const [isMetaLoading, setIsMetaLoading] = React.useState(false);

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
    const isInstalled = await Linking.canOpenURL('yourUrl');
    if (isInstalled) {
      return alert(
        'MetaMask not detected. Please try again after installing MetaMask.',
      );
    }
    try {
      const result = await ethereum.request({method: 'eth_requestAccounts'});

      checkIfExists(result);
      // console.log('RESULT public address ', result);
      // sign();

      // setAccount(result?.[0]);
      // getBalance();
    } catch (e) {
      console.log('ERROR', e);
    }
  };

  const checkIfExists = async publicAddress => {
    try {
      setIsMetaLoading(true);
      const result = await userService.metaSignUpVerify(publicAddress[0]);
      console.log('Checki if Exists ', result);

      if (result?.success) {
        dispatch(setUserReduxToken(result.token));
        await asyncStorage.storeToken(result.token);
        await asyncStorage.storeFcmToken(fcmToken);
      } else {
        navigation.navigate('MetaSignUP', {publicAddress: publicAddress});
      }

      setIsMetaLoading(false);
    } catch (error) {
      setIsMetaLoading(false);
      console.log(error);
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
        contents: 'Casa App!',
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
}
