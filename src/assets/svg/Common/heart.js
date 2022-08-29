/* eslint-disable react/prop-types */
import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      width={20}
      height={18}
      viewBox="0 0 20 18"
      fill={props.color}
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M2.272 2.764c-.404.41-.723.896-.942 1.43a4.467 4.467 0 000 3.374c.219.535.538 1.021.942 1.43l7.41 7.525 7.412-7.525a4.443 4.443 0 001.272-3.117c0-1.169-.458-2.29-1.272-3.117a4.309 4.309 0 00-3.07-1.29 4.309 4.309 0 00-3.07 1.29L9.683 4.055 8.41 2.765a4.338 4.338 0 00-1.408-.956 4.285 4.285 0 00-3.323 0 4.338 4.338 0 00-1.408.955v0z"
        stroke={props.color}
        strokeWidth={1.99878}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SvgComponent;
