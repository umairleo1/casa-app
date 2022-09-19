import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent(props) {
  return (
    <Svg
      width={20}
      height={15}
      viewBox="0 0 20 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M8.488 3.866a.625.625 0 00-.988.51v6.25a.625.625 0 00.988.508l4.375-3.125a.624.624 0 000-1.018L8.488 3.866z"
        fill="#BBB"
      />
      <Path
        d="M0 2.5A2.5 2.5 0 012.5 0h15A2.5 2.5 0 0120 2.5v10a2.5 2.5 0 01-2.5 2.5h-15A2.5 2.5 0 010 12.5v-10zm18.75 0a1.25 1.25 0 00-1.25-1.25h-15A1.25 1.25 0 001.25 2.5v10a1.25 1.25 0 001.25 1.25h15a1.25 1.25 0 001.25-1.25v-10z"
        fill="#BBB"
      />
    </Svg>
  );
}

export default SvgComponent;
