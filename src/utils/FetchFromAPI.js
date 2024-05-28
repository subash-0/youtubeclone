import axios from "axios";
const BASE_URL ='https://youtube-v31.p.rapidapi.com';


  export const FetchFromAPI = async (url,token) =>{
    const options = {
      params: {
          'pageToken':token,
          maxResults:50
      },
      headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_RAPID_KEY,
        'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
      }
    };
  
      const {data} =   await axios.get(`${BASE_URL}/${url}`,options);
             return data;
   
  
  }