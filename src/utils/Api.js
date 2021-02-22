import { ApiUtils } from "./ApiUtils";
//const BaseUrl = "http://192.168.43.119:3000/";
const BaseUrl = "http://204.236.137.244:3000/";
export const ImageUrl = "http://204.236.137.244:3000/";

export const Api = {
  GET: function (endPoint, token) {
    return (
      fetch(`${BaseUrl}${endPoint}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      })
        //.then(ApiUtils.checkStatus)
        .then((response) => response.json())
        .catch((e) => e)
    );
  },
  POST: function (endPoint, data, token) {
    //console.log(data);
    return (
      fetch(`${BaseUrl}${endPoint}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        //.then(ApiUtils.checkStatus)
        .then((response) => response.json())
        .catch((e) => e)
    );
  },
  PUT: function (endPoint, data, token) {
    //console.log(data);
    return (
      fetch(`${BaseUrl}${endPoint}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        //.then(ApiUtils.checkStatus)
        .then((response) => response.json())
        .catch((e) => e)
    );
  },
  UploadFile: function (endPoint, data, token) {
    console.log(data);
    return(
       fetch(`${BaseUrl}${endPoint}`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "multipart/form-data",
      },
      body: data,
    })
      //.then(ApiUtils.checkStatus)
      .then((response) => response)
      .catch((e) => alert(e))
      );
  },
};
