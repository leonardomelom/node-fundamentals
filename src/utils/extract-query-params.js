

export function extractQueryParams(query){
  return query.substr(1).split('&').reduce((qParams, param) => {
    const [key, value] = param.split('=');
    qParams[key] = value;
    return qParams;
  },{});
}
