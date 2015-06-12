

Yak.Backend = function(){

}

Yak.Backend.prototype.status = function(response) {  
  if (response.status == 200) {  
    return Promise.resolve(response);
  } else {  
    return Promise.reject(new Error(response.statusText)); 
  }  
};

Yak.Backend.prototype.json = function(response) {  
  return response.json();
};

Yak.Backend.prototype.error = function(response) {};

Yak.Backend.prototype.fetch = function(url) {
  return fetch(url, {credentials: 'include' })  
  .then(this.status)  
  .then(this.json)
  .then(function(data) {
    return Promise.resolve(data);   
  })
  .catch(this.error);
};

Yak.Backend.prototype.postJSON = function(url, jsonData) {
  return fetch(url, {  
    credentials: 'include',
    method: 'post',  
    headers: {  
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },  
    body: JSON.stringify(jsonData)
  })
  .then(this.json)  
  .then(function (data) {  
    return Promise.resolve(data) 
  })  
  .catch(this.error);
};

 
