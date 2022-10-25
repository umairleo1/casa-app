import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M13.471 10.02c-.031-.112.038-.268.103-.38a5.063 5.063 0 00.928-2.92c.01-2.882-2.422-5.22-5.429-5.22-2.622 0-4.81 1.785-5.323 4.154-.076.351-.115.71-.115 1.069 0 2.885 2.338 5.285 5.345 5.285.478 0 1.122-.143 1.475-.24s.703-.225.794-.26a.827.827 0 01.606.01l1.772.628c.04.016.08.027.122.031a.25.25 0 00.25-.25.404.404 0 00-.015-.084l-.513-1.822z"
        stroke={props?.fill || '#000'}
        strokeWidth={1.2}
        strokeMiterlimit={10}
        strokeLinecap="round"
      />
      <Path
        d="M2.077 7.251a4.57 4.57 0 00.2 4.772c.072.11.112.194.1.25-.013.057-.373 1.934-.373 1.934a.25.25 0 00.085.24.256.256 0 00.252.037l1.757-.688a.49.49 0 01.375.007c.592.23 1.246.375 1.901.375a4.976 4.976 0 002.502-.672"
        stroke={props?.fill || '#000'}
        strokeWidth={1.2}
        strokeMiterlimit={10}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export default SvgComponent;
