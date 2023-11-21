import { API } from "../config/index";
import axios from "axios";
import { loginFormType } from "../types/loginTypes";

export const HandleLogin = async (reqData: loginFormType) => {
  return await axios({
    method: "POST",
    url: `${API.login}`,
    data: reqData,
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};
