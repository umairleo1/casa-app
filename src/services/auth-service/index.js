import client from '../client';
import {API_URLS} from '../url-paths';

const signup = obj => {
  return client.post(API_URLS.SIGNUP, obj);
};

const login = obj => {
  return client.post(API_URLS.LOGIN, obj);
};

const forgotPassword = obj => {
  return client.post(API_URLS.FORGOT_PASSWORD, obj);
};

const otpVerification = obj => {
  return client.post(API_URLS.OTP_VERIFICATION, obj);
};

const resetPassword = obj => {
  return client.post(API_URLS.RESET_PASSWORD, obj);
};

const metaSignUpVerify = publicAddress => {
  // return client.get(API_URLS.META_MAST_SIGNUP, {params: {publicAddress}});
  return client.get(`${API_URLS.META_MAST_SIGNUP}/${publicAddress}`);
};

export const userService = {
  signup,
  login,
  forgotPassword,
  otpVerification,
  resetPassword,
  metaSignUpVerify,
};
