var Yak = Yak || {};

Yak.backend = {
  path: '/api/'
};

Yak.backend.getPath = function(url){
  return this.path.concat(url);
};

Yak.backend.status = function(response) {
  if (response.status === 200) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
};

Yak.backend.json = function(response) {
  return response.json();
};

Yak.backend.error = function(response) {};

Yak.backend.fetch = function(url) {
  return fetch(this.getPath(url), {credentials: 'include'})
  .then(this.status)
  .then(this.json)
  .then(function(data) {
    return Promise.resolve(data);
  }).catch(this.error);
};

Yak.backend.postJSON = function(url, jsonData) {
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
    return Promise.resolve(data);
  }).catch(this.error);
}; 

Yak.backend.delete = function(url) {
  return fetch(this.getPath(url), {
    credentials: 'include',
    method: 'delete',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-CSRF-Token' : Yak.CONST.CSRF_TOKEN
    }
  })
  .then(this.status)
  .then(this.json)
  .then(function(data) {
    return Promise.resolve(data);
  }).catch(this.error);
};
