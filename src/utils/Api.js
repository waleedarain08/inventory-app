import { ApiUtils } from "./ApiUtils";
const BaseUrl = "https://jsonplaceholder.typicode.com/";

export const Api = {
  GET: function (endPoint) {
    return fetch(`${BaseUrl}${endPoint}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then(ApiUtils.checkStatus)
      .then((response) => response.json())
      .catch((e) => e);
  },
  POST: function (endPoint,data) {
    return fetch(`${BaseUrl}${endPoint}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body:data
    })
      .then(ApiUtils.checkStatus)
      .then((response) => response.json())
      .catch((e) => e);
  },
};
