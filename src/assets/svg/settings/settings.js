import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function Settings(props) {
  return (
    <Svg
      width={27}
      height={26}
      viewBox="0 0 27 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M9.916 25a12.48 12.48 0 01-5.428-3.31 3.745 3.745 0 00-3.235-6.142A12.542 12.542 0 011 13.033c0-1.304.2-2.563.572-3.745h.052a3.745 3.745 0 003.362-5.4A12.464 12.464 0 0110.146 1a3.745 3.745 0 006.677 0 12.464 12.464 0 015.16 2.888 3.747 3.747 0 003.414 5.4 12.562 12.562 0 01.318 6.26 3.745 3.745 0 00-3.234 6.142A12.48 12.48 0 0117.052 25a3.747 3.747 0 00-7.136 0z"
        stroke="#000"
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <Path
        d="M13.484 17.402a4.369 4.369 0 100-8.738 4.369 4.369 0 000 8.739v0z"
        stroke="#000"
        strokeWidth={2}
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default Settings;
