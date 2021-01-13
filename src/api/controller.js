let controllers = {};

const URL = 'http://localhost:3005';

controllers.signUp = function(body) {
  return fetch(URL + '/createUser', {
    method: 'POST',
    body: JSON.stringify(body),
  })
}

export default controllers;
