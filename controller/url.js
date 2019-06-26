const URL = require('../model/urls');
const counter = require('../model/counter');
const btoa = require('btoa');
const atob = require('atob');
class Url {
    constructor() {

    }
    // API for redirection
    async redirectionUrl(req, res) {
        var baseid = req.params.hash;
        if (baseid) {
            console.log('APP: Hash received: ' + baseid);
            var id = atob(baseid);
            console.log('APP: Decoding Hash: ' + baseid);
            URL.findOne({ _id: id }, function (err, doc) {
                if (doc) {
                    console.log('APP: Found ID in DB, redirecting to URL');
                    res.redirect(doc.url);
                } else {
                    console.log('APP: Could not find ID in DB, redirecting to home');
                    res.redirect('/');
                }
            });
        }
    }


    // API for shortening
    async shortenUrl(req, res, next) {
        var urlData = req.body.url;
        URL.findOne({ url: urlData }, function (err, doc) {
            if (doc) {
                console.log('APP: URL found in DB');
                res.send({
                    url: urlData,
                    hash: btoa(doc._id),
                    status: 200,
                    statusTxt: 'OK'
                });
            } else {
                console.log('APP: URL not found in DB, creating new document');
                var url = new URL({
                    url: urlData
                });
                url.save(function (err) {
                    if (err) {
                        return console.error(err);
                    }
                    res.send({
                        url: urlData,
                        hash: btoa(url._id),
                        status: 200,
                        statusTxt: 'OK'
                    });
                });
            }
        });
    }
}
module.exports = Url;