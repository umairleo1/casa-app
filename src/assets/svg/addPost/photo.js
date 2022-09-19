import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      width={22}
      height={17}
      viewBox="0 0 22 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M1 12.25l5.159-5.159a2.25 2.25 0 013.182 0L14.5 12.25m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0L20.5 12.25M2.5 16H19a1.5 1.5 0 001.5-1.5v-12A1.5 1.5 0 0019 1H2.5A1.5 1.5 0 001 2.5v12A1.5 1.5 0 002.5 16zM13 4.75h.008v.008H13V4.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0v0z"
        stroke="#BBB"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SvgComponent;
