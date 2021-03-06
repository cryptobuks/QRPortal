const fs = require('fs');
const root = require('app-root-path');

function getQualityStandardsMap ( response ){
  fs.readFile(root.resolve('rest/AIP/quality-standards.json'), ( err, data ) => {
    if (err) {
      console.log(err);
    }
    // const businessCriteria = {
    //   name: 'CAST',
    //   href: 'AIP/business-criteria',
    //   icon: 'img/castsoftwareblackbg.svg'
    // };
    const ret = JSON.parse(data).filter( e => e.name !== 'AIP' /*&& e.name !== 'CWE'*/).map( e => {
      return {
        name: e.name,
        href: e.href + '/categories',
        icon: 'img/'+ e.name.toLowerCase() +'.svg'
      };
    });

    response.json(ret);
  });
}

module.exports = getQualityStandardsMap;