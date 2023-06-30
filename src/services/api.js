import axios from 'axios';

export const fetchData = async () => {
  try {
    const response = await axios.get('https://myfakeapi.com/api/cars/')
    return response.data.cars;
  } catch (error) {
   return error
  }
};