import axios from 'axios';




export const api = axios.create({
  baseURL: 'https://api.api-ninjas.com/v1',
  headers: {
    'X-Api-Key': process.env.EXPO_PUBLIC_API_KEY
  }
});