import _ from 'lodash';
import {GDR_MESSAGE} from './../constants/constants';

export function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    var error = new Error('Une erreur est survenue durant le traitement : '+response.statusText);
    error.response = response;
    throw error;
  }
}


export function getJson(response){
  const statusResponse = response.status;
  const statusText = response.statusText;
  if (statusResponse >= 200 && statusResponse < 300) {
    return response.json();
  }
  return response.json().then((json) => {
    if(isBusinessException(json)){
      throw new Error(getBusinessException(json));
    }else{
      throw new Error('Une erreur est survenue durant le traitement : '+ statusText);
    }
  })
}

export function isBusinessException(rep){
  return _.has(rep,'exception.faultInfo.businessException.errors');
}

export function getBusinessException(jsonError){
  let msg = null;
  const errorsBusiness = jsonError.exception.faultInfo.businessException.errors;
  if(errorsBusiness && errorsBusiness.length > 0){
    msg = toBuildMessageBusiness(errorsBusiness);
    return msg;
  }
  return msg;
}

function toBuildMessageBusiness(errors){
  const messages = errors.map( error => getMessageWithCodeAndParameters(error.code, error.parameters));
  if(messages && messages.length > 0){
    return messages.join(' <br>');
  }
}
function getNumberParameters(message){
  return _.filter(_.split(message,' '), (word) => _.startsWith(word,'${')).length;
}

function getMessageWithCodeAndParameters(code,params){
  const gdrMsg = GDR_MESSAGE[code];
  if(gdrMsg){
    const compiled = _.template(gdrMsg);
    let nbParams = getNumberParameters(gdrMsg);
    if(nbParams > 0){
      let paramsObject = {}
      for (var i = 0; i < nbParams; i++) {
        paramsObject[`p${i}`] = params[i];
      }
      return compiled(paramsObject);
    }
    return compiled();
  }
}
