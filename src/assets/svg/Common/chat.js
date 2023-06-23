/* eslint-disable react/prop-types */
import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function SvgComponent({props, onPress}) {
  return (
    <Svg
      width={20}
      height={19}
      viewBox="0 0 20 19"
      onPress={onPress}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M3.198.315A3.21 3.21 0 000 3.514v8.364a3.21 3.21 0 003.198 3.198h.738v2.706c0 .968 1.195 1.565 1.968.985l4.92-3.69h5.659a3.21 3.21 0 003.198-3.199V3.514A3.21 3.21 0 0016.483.315H3.198zm0 1.477h13.285c.96 0 1.722.762 1.722 1.722v8.364c0 .96-.762 1.722-1.722 1.722h-5.904a.739.739 0 00-.443.148l-4.724 3.543v-2.953a.738.738 0 00-.738-.738H3.198c-.96 0-1.722-.762-1.722-1.722V3.514c0-.96.763-1.722 1.722-1.722zm2.46 3.443a.738.738 0 100 1.476h8.365a.738.738 0 100-1.476H5.658zm0 3.444a.738.738 0 100 1.476h6.397a.738.738 0 100-1.476H5.658z"
        fill="#BBB"
      />
    </Svg>
  );
}

export default SvgComponent;
