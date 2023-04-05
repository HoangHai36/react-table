import axios from 'axios';
import { User, UsersFilters } from '../types/user';
import { objectToQueryString } from '../types/object';
import { API_BASE_URL } from '../config/settings';

axios.defaults.baseURL = API_BASE_URL;
export async function searchUsers(option: UsersFilters = {}): Promise<User[]> {
  try {
    const { data } = await axios.get(`users?${objectToQueryString(option)}`);
    return data;
  } catch (error) {
    console.error('An error occurred while searching for users:', error);
    return [];
  }
};