import axios from "axios";


export async function apiUpload(url:string, file: File){

  let config = {
    method: 'put',
    url: url,
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    },
    data : file
  };

  try {
    const response = await axios(config);
    console.log("RESPONSE UPLOAD FILE S3");
    console.log(response);
    return response;
  } catch (e){
    console.error("RESPONSE UPLOAD ERROR S3");
    console.error(e);
  }
/*
  const config = {
      headers:{
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      }
  };

  const axiosInstance = axios.create(config);

  try{
    const response = await axiosInstance.put(url, file);
    console.log("Response axios upload ", response);
    return response
  }catch (e){
    console.error("ERROR AXIOS UPLOAD");
    console.error(e);
    return e;
  }
*/
}