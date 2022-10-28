import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function Settings(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        stroke="#BBB"
        strokeWidth={0.4}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.77 9.362c-.857-.062-1.68-.985-1.376-1.858.086-.246.238-.463.387-.677.224-.32.448-.642.604-.998.099-.227.169-.478.156-.728-.012-.251-.13-.478-.23-.699a3.738 3.738 0 00-.429-.718c-.318-.418-.73-.785-1.216-.993-.941-.404-1.862-.234-2.666.497-.473.431-.945.53-1.486.307-.556-.227-.846-.62-.914-1.238C14.44.79 13.564.008 12.068 0h-.032C10.38 0 9.493.738 9.32 2.255c-.07.614-.362 1.01-.917 1.244-.514.219-.975.12-1.496-.315-1.212-1.017-2.41-.95-3.558.194-1.125 1.124-1.176 2.321-.15 3.559.438.53.51 1.042.226 1.615-.235.475-.628.708-1.355.807-1.422.191-2.1 1.117-2.074 2.828.02 1.36.849 2.282 2.161 2.408.68.064 1.088.34 1.32.898.232.556.124 1.036-.363 1.607-.935 1.095-.865 2.335.191 3.402 1.13 1.143 2.34 1.265 3.5.35l.046-.035c.201-.159.411-.325.62-.397a1.31 1.31 0 011.136.106c.38.234.638.662.707 1.173C9.514 23.165 10.47 24 11.94 24l.065-.001c1.504-.024 2.449-.87 2.594-2.317.062-.625.35-1.017.904-1.233.511-.199.98-.117 1.474.257.314.237.792.565 1.31.672 1.097.227 2.22-.37 2.859-1.524.5-.902.361-1.925-.382-2.806-.43-.511-.527-1.011-.303-1.572.216-.538.613-.817 1.254-.876 1.384-.13 2.236-1.085 2.28-2.556.044-1.553-.808-2.58-2.224-2.682zm-.192 3.85c-1.19.205-2.079.846-2.438 1.757-.364.927-.145 2.024.604 3.01.428.566.38 1.057-.156 1.596-.393.399-.983.755-1.552.199a2.82 2.82 0 00-3.008-.625c-1.063.407-1.771 1.388-1.849 2.563-.024.362-.193.581-.42.712-.229.13-.515.17-.774.173h-.026c-.8 0-1.16-.307-1.236-1.053a2.853 2.853 0 00-1.808-2.392 2.858 2.858 0 00-1.03-.196c-.68 0-1.344.253-1.886.74-.558.499-1.059.474-1.622-.087-.603-.597-.642-1.057-.143-1.7.709-.912.913-1.968.56-2.898-.351-.923-1.196-1.574-2.32-1.784-.874-.163-1.152-.474-1.143-1.283.008-.791.287-1.081 1.193-1.239 1.053-.184 1.895-.845 2.253-1.767.36-.931.18-1.997-.482-2.853-.56-.724-.544-1.15.065-1.75.581-.574 1.01-.588 1.7-.051.892.693 1.941.878 2.878.51.945-.374 1.593-1.237 1.774-2.37.128-.792.465-1.089 1.238-1.089h.017c.784.004 1.14.301 1.23 1.025.147 1.194.837 2.09 1.895 2.456 1.016.354 2.144.116 2.871-.604.316-.311.825-.637 1.614.14.874.861.325 1.422.146 1.605-.728.743-.957 1.892-.584 2.926.373 1.038 1.283 1.728 2.432 1.846.72.076 1.015.431 1.022 1.228.006.776-.279 1.127-1.015 1.255z"
        fill="#BBB"
      />
      <Path
        stroke="#BBB"
        strokeWidth={0}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14.823 9.213a3.962 3.962 0 00-2.832-1.188h-.009a3.938 3.938 0 00-2.8 1.189 3.917 3.917 0 00-1.16 2.798 3.985 3.985 0 001.176 2.8 3.948 3.948 0 002.794 1.163h.003c2.203 0 3.949-1.734 3.975-3.949a3.91 3.91 0 00-1.147-2.813zm-4.61 4.344a2.224 2.224 0 01-.56-1.65c.093-1.295 1.089-2.258 2.3-2.258.05 0 .101.003.153.006 1.517.101 2.289 1.31 2.245 2.4-.028.688-.284 1.275-.745 1.698a2.325 2.325 0 01-1.664.6c-.685-.03-1.297-.313-1.728-.796z"
        fill="#BBB"
      />
    </Svg>
  );
}

export default Settings;
