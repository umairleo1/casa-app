import Share from 'react-native-share';

export const onShare = async customOptions => {
  try {
    await Share.open(customOptions);
  } catch (err) {
    console.error(err);
  }
};
