import React from 'react';
import {View} from 'react-native';
import Svg, {Path, Mask} from 'react-native-svg';

const AddIcon = ({strokeColor}) => (
  <View>
    <Svg
      width="18"
      height="17"
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M8.5 1.21429C12.5071 1.21429 15.7857 4.49286 15.7857 8.5C15.7857 12.5071 12.5071 15.7857 8.5 15.7857C4.49286 15.7857 1.21429 12.5071 1.21429 8.5C1.21429 4.49286 4.49286 1.21429 8.5 1.21429ZM8.5 0C3.825 0 0 3.825 0 8.5C0 13.175 3.825 17 8.5 17C13.175 17 17 13.175 17 8.5C17 3.825 13.175 0 8.5 0Z"
        fill={strokeColor}
      />
      <Path
        d="M13.3571 7.89282H9.10714V3.64282H7.89285V7.89282H3.64285V9.10711H7.89285V13.3571H9.10714V9.10711H13.3571V7.89282Z"
        fill="black"
      />
    </Svg>
  </View>
);

const HomeIcon = ({fillColor, strokeColor}) => (
  <View>
    <Svg
      width="18"
      height="17"
      viewBox="0 0 18 17"
      fill={fillColor}
      color="red"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M9.05179 0.538537L9.05227 0.539012L17.1937 8.71343C17.4938 9.01499 17.4938 9.5046 17.1949 9.80609L17.1942 9.80685C17.0519 9.95106 16.8582 10.0315 16.6546 10.0315H15.7968H15.2968V10.5315V16.3645C15.2968 16.4421 15.2358 16.5 15.1643 16.5H10.4086V12.5513V12.0513H9.90859H7.69482H7.19482V12.5513V16.5H2.75535C2.68389 16.5 2.62285 16.4421 2.62285 16.3645V10.5315V10.0315H2.12285H1.26501C0.845669 10.0315 0.5 9.68758 0.5 9.2604C0.5 9.05545 0.581713 8.8584 0.725993 8.71343L8.86739 0.539013L8.86786 0.538536C8.88015 0.526164 8.89462 0.516477 8.91037 0.509911C8.92612 0.503347 8.94292 0.5 8.95983 0.5C8.97674 0.5 8.99354 0.503347 9.00929 0.509911C9.02504 0.516476 9.03951 0.526163 9.05179 0.538537Z"
        stroke={strokeColor}
      />
    </Svg>
  </View>
);

const NotificationIcon = ({strokeColor}) => (
  <View>
    <Svg
      width="18"
      height="17"
      viewBox="0 0 18 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Mask id="path-1-inside-1_1045_253" fill="fillColor">
        <Path
          fill-rule="evenodd"
          clip-rule="evenodd"
          stroke={strokeColor}
          d="M16 8V11.586L17.707 13.293C17.8 13.3857 17.8738 13.4959 17.9241 13.6172C17.9744 13.7386 18.0002 13.8687 18 14V16C18 16.2652 17.8946 16.5196 17.7071 16.7071C17.5196 16.8946 17.2652 17 17 17H1C0.734786 17 0.480432 16.8946 0.292895 16.7071C0.105359 16.5196 2.01712e-06 16.2652 2.01712e-06 16V14C-0.00018848 13.8687 0.0256011 13.7386 0.0758864 13.6172C0.126172 13.4959 0.199959 13.3857 0.293002 13.293L2 11.586V8C2 4.783 4.185 2.074 7.145 1.258C7.438 0.52 8.154 0 9 0C9.846 0 10.562 0.52 10.855 1.258C13.815 2.073 16 4.783 16 8ZM10.7285 19.4502C10.2235 19.8086 9.6193 20.0008 9 20C8.3807 20.0008 7.77654 19.8086 7.27151 19.4502C6.76648 19.0917 6.38566 18.5849 6.182 18H9H11.818C11.6143 18.5849 11.2335 19.0917 10.7285 19.4502Z"
        />
      </Mask>
      <Path
        stroke={strokeColor}
        d="M16 11.586H15V12.0002L15.2929 12.2931L16 11.586ZM17.707 13.293L16.9999 14.0001L17.0012 14.0014L17.707 13.293ZM17.9241 13.6172L18.8479 13.2344L18.8479 13.2344L17.9241 13.6172ZM18 14L17 13.9986V14H18ZM17.7071 16.7071L18.4142 17.4142L18.4142 17.4142L17.7071 16.7071ZM0.292895 16.7071L1 16L1 16L0.292895 16.7071ZM2.01712e-06 16L-0.999998 16L2.01712e-06 16ZM2.01712e-06 14L1 14L1 13.9985L2.01712e-06 14ZM0.293002 13.293L0.998826 14.0014L1.00011 14.0001L0.293002 13.293ZM2 11.586L2.70711 12.2931L3 12.0002V11.586H2ZM7.145 1.258L7.41076 2.22204L7.89072 2.08973L8.07443 1.627L7.145 1.258ZM10.855 1.258L9.92557 1.627L10.1094 2.08991L10.5895 2.22212L10.855 1.258ZM9 20L9.00126 19L8.99874 19L9 20ZM6.182 18V17H4.77488L5.23762 18.3289L6.182 18ZM11.818 18L12.7624 18.3289L13.2251 17H11.818V18ZM17 11.586V8H15V11.586H17ZM18.4141 12.5859L16.7071 10.8789L15.2929 12.2931L16.9999 14.0001L18.4141 12.5859ZM18.8479 13.2344C18.7472 12.9912 18.5993 12.7704 18.4128 12.5846L17.0012 14.0014C17.0008 14.001 17.0005 14.0006 17.0003 14.0001L18.8479 13.2344ZM19 14.0014C19.0004 13.7382 18.9487 13.4776 18.8479 13.2344L17.0003 14.0001C17.0001 13.9996 17 13.9991 17 13.9986L19 14.0014ZM19 16V14H17V16H19ZM18.4142 17.4142C18.7893 17.0391 19 16.5304 19 16H17L17 16L18.4142 17.4142ZM17 18C17.5304 18 18.0391 17.7893 18.4142 17.4142L17 16L17 16V18ZM1 18H17V16H1V18ZM-0.414211 17.4142C-0.0391375 17.7893 0.469571 18 1 18V16L1 16L-0.414211 17.4142ZM-0.999998 16C-0.999998 16.5304 -0.789285 17.0391 -0.414211 17.4142L1 16L1 16L-0.999998 16ZM-0.999998 14V16H1V14H-0.999998ZM-0.847924 13.2344C-0.948696 13.4775 -1.00038 13.7382 -0.999997 14.0015L1 13.9985C1 13.9991 0.999898 13.9996 0.999696 14.0001L-0.847924 13.2344ZM-0.412821 12.5846C-0.599278 12.7704 -0.74715 12.9912 -0.847924 13.2344L0.999696 14.0001C0.999494 14.0006 0.999197 14.001 0.998825 14.0014L-0.412821 12.5846ZM1.2929 10.8789L-0.414105 12.5859L1.00011 14.0001L2.70711 12.2931L1.2929 10.8789ZM1 8V11.586H3V8H1ZM6.87924 0.293961C3.49974 1.22561 1 4.31845 1 8H3C3 5.24755 4.87026 2.92239 7.41076 2.22204L6.87924 0.293961ZM9 -1C7.73038 -1 6.65465 -0.216946 6.21557 0.888999L8.07443 1.627C8.22135 1.25695 8.57763 1 9 1V-1ZM11.7844 0.888999C11.3453 -0.216946 10.2696 -1 9 -1V1C9.42237 1 9.77865 1.25695 9.92557 1.627L11.7844 0.888999ZM17 8C17 4.31868 14.5004 1.22452 11.1205 0.293878L10.5895 2.22212C13.1296 2.92148 15 5.24732 15 8H17ZM8.99874 21C9.82586 21.001 10.6328 20.7444 11.3073 20.2657L10.1497 18.6347C9.81416 18.8728 9.41274 19.0005 9.00126 19L8.99874 21ZM6.69274 20.2657C7.36725 20.7444 8.17414 21.001 9.00126 21L8.99874 19C8.58726 19.0005 8.18584 18.8728 7.85028 18.6347L6.69274 20.2657ZM5.23762 18.3289C5.50963 19.11 6.01823 19.7869 6.69274 20.2657L7.85028 18.6347C7.51473 18.3965 7.2617 18.0597 7.12638 17.6711L5.23762 18.3289ZM9 17H6.182V19H9V17ZM11.818 17H9V19H11.818V17ZM11.3073 20.2657C11.9818 19.7869 12.4904 19.11 12.7624 18.3289L10.8736 17.6711C10.7383 18.0597 10.4853 18.3965 10.1497 18.6347L11.3073 20.2657Z"
        fill="black"
        mask="url(#path-1-inside-1_1045_253)"
      />
    </Svg>
  </View>
);

const FindPeopleIcon = ({strokeColor}) => (
  <View>
    <Svg
      width="18"
      height="17"
      viewBox="0 0 23 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M9.91667 17C9.91667 17 8.5 17 8.5 15.5833C8.5 14.1667 9.91667 9.91667 15.5833 9.91667C21.25 9.91667 22.6667 14.1667 22.6667 15.5833C22.6667 17 21.25 17 21.25 17H9.91667ZM15.5833 8.5C16.7105 8.5 17.7915 8.05223 18.5885 7.2552C19.3856 6.45817 19.8333 5.37717 19.8333 4.25C19.8333 3.12283 19.3856 2.04183 18.5885 1.2448C17.7915 0.447767 16.7105 0 15.5833 0C14.4562 0 13.3752 0.447767 12.5781 1.2448C11.7811 2.04183 11.3333 3.12283 11.3333 4.25C11.3333 5.37717 11.7811 6.45817 12.5781 7.2552C13.3752 8.05223 14.4562 8.5 15.5833 8.5V8.5Z"
        fill="none"
        stroke={strokeColor}
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M7.38933 17C7.17932 16.5577 7.07458 16.0728 7.08333 15.5833C7.08333 13.6637 8.04667 11.6875 9.826 10.3133C8.93788 10.0396 8.01259 9.90582 7.08333 9.91662C1.41667 9.91662 0 14.1666 0 15.5833C0 17 1.41667 17 1.41667 17H7.38933Z"
        fill="none"
        stroke={strokeColor}
      />
      <Path
        d="M6.37501 8.50008C7.31432 8.50008 8.21516 8.12694 8.87935 7.46275C9.54354 6.79856 9.91668 5.89772 9.91668 4.95841C9.91668 4.01911 9.54354 3.11827 8.87935 2.45408C8.21516 1.78989 7.31432 1.41675 6.37501 1.41675C5.4357 1.41675 4.53487 1.78989 3.87067 2.45408C3.20648 3.11827 2.83334 4.01911 2.83334 4.95841C2.83334 5.89772 3.20648 6.79856 3.87067 7.46275C4.53487 8.12694 5.4357 8.50008 6.37501 8.50008V8.50008Z"
        fill="none"
        stroke={strokeColor}
      />
    </Svg>
  </View>
);

const ProfileIcon = ({strokeColor}) => (
  <View>
    <Svg
      width="18"
      height="17"
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M6.18226 1.46004C6.79696 0.845336 7.63068 0.5 8.5 0.5C9.36932 0.5 10.203 0.845336 10.8177 1.46004C11.4324 2.07474 11.7778 2.90846 11.7778 3.77778C11.7778 4.6471 11.4324 5.48081 10.8177 6.09552C10.203 6.71022 9.36932 7.05556 8.5 7.05556C7.63068 7.05556 6.79696 6.71022 6.18226 6.09552C5.56756 5.48081 5.22222 4.6471 5.22222 3.77778C5.22222 2.90846 5.56756 2.07474 6.18226 1.46004ZM0.5 14.6389C0.5 14.1161 0.757951 13.6211 1.26827 13.1501C1.78197 12.676 2.51737 12.2608 3.37203 11.9184C5.08218 11.2332 7.14397 10.8889 8.5 10.8889C9.85603 10.8889 11.9178 11.2332 13.628 11.9184C14.4826 12.2608 15.218 12.676 15.7317 13.1501C16.242 13.6211 16.5 14.1161 16.5 14.6389V16.0556C16.5 16.3007 16.3007 16.5 16.0556 16.5H0.944444C0.699253 16.5 0.5 16.3007 0.5 16.0556V14.6389Z"
        stroke={strokeColor}
      />
    </Svg>
  </View>
);
export {AddIcon, HomeIcon, NotificationIcon, FindPeopleIcon, ProfileIcon};
