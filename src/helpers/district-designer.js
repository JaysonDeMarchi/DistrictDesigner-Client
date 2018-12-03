import { URL, HTTP_STATE, HTTP_STATUS } from '../config/constants';

export const getUpdate = () => {
  const request = new XMLHttpRequest();
  request.onreadystatechange = () => {
    if (request.readyState === HTTP_STATE.DONE && request.status === HTTP_STATUS.OK) {
      return JSON.parse(request.response);
    }
  }

  request.open("GET", URL + "/UpdatePrecincts", false);
  request.send();
  return request.onreadystatechange();
}

export const startAlgorithm = (algoType, shortName, weights) => {
  const request = new XMLHttpRequest();
  const body = JSON.stringify({
    'algoType': algoType,
    'shortName': shortName,
    'weights': weights,
  });
  request.onreadystatechange = () => {
    if (request.readyState === HTTP_STATE.DONE && request.status === HTTP_STATUS.OK) {
      return JSON.parse(request.response);
    }
  }

  request.open("POST", URL + "/StartAlgorithm", false);
  request.send(body);
  return request.onreadystatechange();
}

export const stopAlgorithm = () => {
  console.log("Algorithm Stopped");
  return true;
}

export const toggleAlgorithm = (status) => {
  console.log("Algorithm Paused");  
  return true;
}
