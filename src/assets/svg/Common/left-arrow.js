/* eslint-disable react/prop-types */
import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SendIcon({onPress, height, width}) {
  return (
    <Svg
      width={height}
      height={width}
      viewBox="0 0 26 26"
      fill="none"
      onPress={onPress}
      xmlns="http://www.w3.org/2000/svg">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M23.5282 12.678C23.5282 6.89737 18.8366 2.20581 13.056 2.20581C7.2753 2.20581 2.58374 6.89737 2.58374 12.678C2.58374 18.4587 7.2753 23.1503 13.056 23.1503C18.8366 23.1503 23.5282 18.4587 23.5282 12.678ZM8.86704 11.6308H13.0559V8.48911L17.2448 12.678L13.0559 16.8669V13.7252H8.86704V11.6308Z"
        fill="#7A7A7A"
      />
    </Svg>
  );
}

export default SendIcon;
