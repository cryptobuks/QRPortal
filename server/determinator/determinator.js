const queryParser = require('../lib/queryParser');
const { queryKey } = require('./constants');
const matcher = require('./matcher');
const getRecommendedVersion = require('./latestVersion');

function determinator ( query ){
  if( !query ) return;
  const keyWords = queryParser( query, queryKey ),
    len = keyWords.length;
  
  let ret = {};
  
  for (let i = 0; i < len; i++) {
    const matching = matcher( keyWords[i].toLowerCase() );
    if (matching) {
      const extUID = matching.extensionuid;
      ret[keyWords[i]] = matching ;
      ret[keyWords[i]].recommendedversion = getRecommendedVersion(extUID);
    } else {
      ret[keyWords[i]] = {id: null, errormessage: 'Technology not supported' };
    }
  }

  return ret;
}

module.exports = determinator;