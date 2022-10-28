import React from 'react';

import LoginForm from './loginForm';

export default function Login({isMetaLoading, connect}) {
  return (
    <>
      <LoginForm isMetaLoading={isMetaLoading} connect={connect} />
    </>
  );
}
