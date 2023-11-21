import { API } from "../config/index";
import axios from "axios";
import { authHeader } from "../utils/token";
import { productsParams } from "../types/productsTypes";

export const HandleProducts = async (reqDataURL?:productsParams) => {
    //const reqURL = reqDataURL ? `${API.products}/search?q=${reqDataURL?.search}&limit=${reqDataURL?.limit}&skip=${reqDataURL?.skip}` : `${API.products}`;
    
    let reqURL = API.products

    if(reqDataURL?.search){
      reqURL = reqURL+ `/search?q=${reqDataURL?.search}&limit=${reqDataURL?.limit}&skip=${reqDataURL?.skip}`;
    } else {
      reqURL = reqURL+ `?limit=${reqDataURL?.limit}&skip=${reqDataURL?.skip}`;
    }    
  return await axios({
    method: "GET",
    url: reqURL,
    headers: authHeader(),
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};
