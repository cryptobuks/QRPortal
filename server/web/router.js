const express = require('express');
const options = require('./options');
const technoMapping = require('../lib/technologies-map');
const errorHandler = require('../middleware/errorHandler');
const extensionsMap = require('../lib/extensions-map');
const getStandardsMap = require('../lib/standards-map');
const businessCriteriaMap = require('../lib/business-criteria-map');
const navigationData = require('../lib/navigation-map');
const filterDeprecated = require('../lib/filterDeprecated');
const {ProcessRuleDetailsRequest} = require('../lib/ruleDetailsStruct');
const StandardHandler = require('../lib/standardNotApplicable');
let extVersionMap;

// extensionsMap.INIT();

let WebRouter = express.Router();

WebRouter.get('/technologies', (req, res) => {
  res.json( technoMapping );
});

WebRouter.get('/technologies/:technoID', (req, res) => {
  filterDeprecated(req, res, errorHandler);
  // res.sendFile(req.url + '/quality-rules.json', options, (err) => errorHandler(err, res));
});

WebRouter.get('/extensions', (req, res) => {
  res.json( extensionsMap.extensions );
});

WebRouter.get('/extensions/:extID', ( req, res ) => {
  const key = req.params.extID;
  if ( !extVersionMap ) extVersionMap = extensionsMap.readExtMap();
  if( extVersionMap.hasOwnProperty( key ) ){
    res.json( extVersionMap[key] );
  } else {
    errorHandler( {query: key, statusCode: 404}, res );
  }
});

WebRouter.get('/extensions/:extID/versions/:version', ( req, res ) => {
  filterDeprecated(req, res, errorHandler);
});

WebRouter.get('/quality-standards', ( req, res ) => {
  getStandardsMap(res);
});

WebRouter.get('/quality-standards/:stdID/categories', ( req, res ) => {
  if (!req.params.stdID) return res.json([]);
  const categories = require('../lib/std-cat-map').filter( e => e.standard === req.params.stdID.toUpperCase() );
  res.json(categories);
});

WebRouter.get('/quality-standards/:stdID/categories/:stdCatName', ( req, res ) => {
  if (req.params.stdCatName === 'OWASP-2017') {
    StandardHandler(req, res, errorHandler);
  } else {
    res.sendFile(req.url + '/items.json', options, err => errorHandler(err, res));
  }
});

WebRouter.get('/quality-standards/:stdID/items/:stdTagName', ( req, res ) => {
  // res.sendFile(req.url + '/quality-rules.json', options, err => errorHandler(err, res));
  filterDeprecated(req, res, errorHandler);
});

WebRouter.get('/business-criteria', (req, res) => {
  businessCriteriaMap(res);
});

WebRouter.get('/business-criteria/:bcID', ( req, res ) => {
  filterDeprecated(req, res, errorHandler);
  // res.sendFile(req.url + '/quality-rules.json', options, err => errorHandler(err, res));
});

WebRouter.get('/quality-rules/:ruleID', ( req, res ) => {
  ProcessRuleDetailsRequest(req, res, errorHandler);
});

WebRouter.get('/versions.json', (req, res) => {
  res.redirect('/AIP/extensions/com.castsoftware.aip');
});

WebRouter.get('/versions/:aipVersion', (req, res) => {
  filterDeprecated(req, res, errorHandler);
  // res.sendFile(req.url + '/quality-rules.json', options, err => errorHandler(err, res));
});

WebRouter.get('/web-navigation', (req, res) => {
  const navData = navigationData;
  res.json(navData);
});

module.exports = WebRouter;