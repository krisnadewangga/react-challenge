import axios from 'axios';

export const api = axios.create({
    baseURL: process.env.REACT_APP_URI_API,
    headers: { "Content-type": "application/json", "Access-Control-Allow-Origin": "*"}
  });
  
  