import { ApiUtils } from "./ApiUtils";
// const BaseUrl = "https://jsonplaceholder.typicode.com/";
const BaseUrl = "http://192.168.8.100:3000/";

export const Api = {
  GET: function (endPoint,token) {
    return fetch(`${BaseUrl}${endPoint}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        'Authorization': 'Bearer ' + token,
        "Content-Type": "application/json",
      },
    })
      .then(ApiUtils.checkStatus)
      .then((response) => response.json())
      .catch((e) => e);
  },
  POST: function (endPoint,data,token) {
    console.log(data);
    return fetch(`${BaseUrl}${endPoint}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        'Authorization': 'Bearer ' + token,
        "Content-Type": "application/json",
      },
      body:JSON.stringify(data)
    })
      //.then(ApiUtils.checkStatus)
      .then((response) => response.json())
      .catch((e) => e);
  },
};
