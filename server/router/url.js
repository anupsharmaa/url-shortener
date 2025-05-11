const express = require("express");
const { handleGenerateShortUrl, handleGetRedirectedUrl, handleGetStats, handleGetAllUrl } = require("../controller/url");

const router = express.Router()


// router.post('/', handleGenerateShortUrl); // POST that take original original url and return short url 
// router.get('/:shortId', handleGetRedirectedUrl); 
// router.get('/analytics/:shortId', handleGetStats); 
// router.get('/all', handleGetAllUrl); 

router.post('/', handleGenerateShortUrl);
router.get('/analytics/:shortId', handleGetStats);
router.get('/all', handleGetAllUrl);
router.get('/:shortId', handleGetRedirectedUrl); // this should always come last
// router.get('/ping', (req, res) => res.json('OK'));

module.exports = router