import React from 'react';
import {View} from 'react-native';
import Svg, {Path, Circle} from 'react-native-svg';

const EditIcon = () => (
  <View>
    <Svg
      width="29"
      height="29"
      viewBox="0 0 29 29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Circle cx="14.5" cy="14.5" r="14" fill="#0A2540" stroke="white" />
      <Path
        d="M18.1125 9C17.9779 9 17.8431 9.0513 17.7404 9.15419L16.842 10.0526L18.9472 12.1579L19.8457 11.2595C20.0514 11.0537 20.0514 10.7205 19.8457 10.5152L18.4847 9.15419C18.3818 9.0513 18.2472 9 18.1125 9ZM16.0525 10.8421L10 16.8947V19H12.1052L18.1578 12.9474L16.0525 10.8421Z"
        fill="white"
      />
    </Svg>
  </View>
);

export {EditIcon};
