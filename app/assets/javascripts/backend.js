Backend = function(){

}

Backend.prototype.status = function(response) {  
  if (response.status == 200) {  
    return Promise.resolve(response);
  } else {  
    return Promise.reject(new Error(response.statusText)); 
  }  
};

Backend.prototype.json = function(response) {  
  return response.json();
};

Backend.prototype.error = function(response) {
   console.log('Request failed', response);
};

Backend.prototype.fetch = function(url) {
  return fetch(url, {credentials: 'include' })  
          .then(this.status)  
          .then(this.json)
          .then(function(data) {
            console.log('Get request succeeded with JSON response', data);  
            return Promise.resolve(data);   
          })
          .catch(this.error);
};

Backend.prototype.postJSON = function(url, jsonData) {
  return fetch(url, {  
                      credentials: 'include',
                      method: 'post',  
                      headers: {  
                                  'Accept': 'application/json',
                                  'Content-Type': 'application/json',
                                },  
                      body: JSON.stringify(jsonData)
                    }
          )
          .then(this.json)  
          .then(function (data) {  
            console.log('Post request succeeded with JSON response', data); 
            return Promise.resolve(data) 
          })  
          .catch(this.error);
};




 
