

Yak.Backend = function(){
  this.path = '/api/'

}
Yak.Backend.prototype.getPath = function(url){
  return this.path.concat(url)
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
  return fetch(this.getPath(url), {credentials: 'include' })  
  .then(this.status)  
  .then(this.json)
  .then(function(data) {
    return Promise.resolve(data);   
  })
  .catch(this.error);
};

Yak.Backend.prototype.postJSON = function(url, jsonData) {
  return fetch(this.getPath(url), {  
    credentials: 'include',
    method: 'post',  
    headers: {  
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-CSRF-Token' : Yak.CONST.CSRF_TOKEN
    },  
    body: JSON.stringify(jsonData)
  })
  .then(this.json)  
  .then(function (data) {  
    return Promise.resolve(data) 
  })  
  .catch(this.error);
};

 
