export const ApiUtils = {  
    checkStatus: function(response) {
      if (response.ok) {
        return response;
      } else {
        throw Error(response.statusText);
      }
    }
  };