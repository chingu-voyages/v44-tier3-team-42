// NOTE: Replace instance of 'getDummyData' with a method of the service.
// Also, remember to export * from this file into the `index.ts`

import { SERVER_URL } from '@/config/constants';
import { LoginData, RegisterData } from '../type/UserdataType';
import { post } from 'cypress/types/jquery';

//register user
const registerUser = async (userData: RegisterData): Promise<any> => {
  const res = await fetch(`${SERVER_URL}/`, {
    method: 'POST',
    body: JSON.stringify(userData),
  });
  console.log(userData);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error);
  }

  return data;
};

//log in user
const logInUser = async (userData: LoginData): Promise<any> => {
  const res = await fetch(`${SERVER_URL}/`, {
    method: 'POST',
    body: JSON.stringify(userData),
  });
  console.log(userData);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error);
  }
  return data;
};

export { registerUser, logInUser };
