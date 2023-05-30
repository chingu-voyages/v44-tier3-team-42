// NOTE: Replace instance of 'getDummyData' with a method of the service.
// Also, remember to export * from this file into the `index.ts`

import { SERVER_URL } from '@/config/constants';
import axios from 'axios';
import { LoginData, RegisterData } from '../../type/UserdataType';

//register user

/*const registerUser = async (userData: RegisterData): Promise<any> => {
  const res = await fetch("http://localhost:3000/signup", {
    method: 'POST',
    mode: "cors",
    body: JSON.stringify(userData),
  });
  
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error);
  }
  console.log(data);
  return data;
};*/

const registerUser = async (userData: RegisterData): Promise<any> => {
  const response = await axios.post(`${SERVER_URL}signup`, userData);

  if (response.data) {
    //  localStorage.setItem[("user", JSON.stringify(response.data))];
    console.log(response.data);
  }

  return response.data;
};

//log in user

const logInUser = async (userData: LoginData): Promise<any> => {
  const response = await axios.post(`${SERVER_URL}login`, userData);

  if (response.data) {
    //  localStorage.setItem[("user", JSON.stringify(response.data))];
    console.log(response.data);
  }

  return response.data;
};

/*const logInUser = async (userData: LoginData): Promise<any> => {
  const res = await fetch(`${SERVER_URL}/login/password`, {
    method: 'POST',
    body: JSON.stringify(userData),
  });
  console.log(userData);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error);
  }
  return data;
};*/

export { registerUser, logInUser };
