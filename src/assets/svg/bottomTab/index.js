import React from 'react';
import {View} from 'react-native';
import Svg, {Path} from 'react-native-svg';

const HomeIcon = () => (
  <View>
    <Svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M9 0C4.02975 0 0 4.02975 0 9C0 13.9703 4.02975 18 9 18C13.9703 18 18 13.9703 18 9C18 4.02975 13.9703 0 9 0ZM12.75 9.75H9.75V12.75C9.75 13.1648 9.414 13.5 9 13.5C8.586 13.5 8.25 13.1648 8.25 12.75V9.75H5.25C4.836 9.75 4.5 9.41475 4.5 9C4.5 8.58525 4.836 8.25 5.25 8.25H8.25V5.25C8.25 4.83525 8.586 4.5 9 4.5C9.414 4.5 9.75 4.83525 9.75 5.25V8.25H12.75C13.164 8.25 13.5 8.58525 13.5 9C13.5 9.41475 13.164 9.75 12.75 9.75Z"
        fill="#BBBBBB"
      />
    </Svg>
  </View>
);

export {HomeIcon};
