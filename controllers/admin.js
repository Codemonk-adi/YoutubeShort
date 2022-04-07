const auth = require("../middleware/auth")()
const Query = require("../models/queries")
const User = require("../models/user")
const fetch = require('node-fetch')
const https = require('https')
const url_check = require('url')
    // import url from 'url';
const crypto = require('crypto');
const { query } = require("express")
const urlParser = require("js-video-url-parser")
const BitlyClient = require('bitly').BitlyClient;
const bitly = new BitlyClient(process.env.Bitly);
exports.generateUrl = async(req, res) => {
    console.time('local')
    console.time('usersave')
    console.time('querysave')
    const user = req.user;
    let Data = String()
    if (!req.files)
        Data = req.body.data;
    else
        Data = req.files.file.data.toString('utf8')
    let isUrl = true;
    let isYoutube = false;
    let embed = "";
    try {
        const url = new URL(Data)
        parsed = urlParser.parse(Data)
        if (parsed) {
            isYoutube = true;
            embed = parsed.id
        }
    } catch (e) {
        isUrl = false;
    }

    let iv = Buffer.alloc(16)
    const key = req.body.key;
    const isEncrypted = Boolean(key);
    if (isEncrypted) {
        const algorithm = 'aes-256-ctr';
        iv = crypto.randomBytes(16);
        const secret = crypto.createHash('sha256').update(key).digest('base64').substr(0, 32);
        const cipher = crypto.createCipheriv(algorithm, secret, iv);

        const encrypted = Buffer.concat([cipher.update(Data), cipher.final()]);
        Data = encrypted.toString('hex')


    }


    const timestamp = new Date()
    const ExpireAt = new Date(timestamp.getTime() + 24 * 60 * 60 * 1000);
    const query = new Query({
            timestamp,
            ExpireAt,
            isEncrypted,
            Data,
            iv,
            isUrl,
            isYoutube,
            embed
        })
        // console.log(isYoutube)
    user.queries.push(query.id);

    console.timeEnd('local');
    // https://polynomial-front.netlify.app/display/${query.id}/${query.isEncrypted}
    // https://consise-farms.herokuapp.com/host/${query.id}
    user.save()
    console.timeEnd('usersave');


    https.get(`https://api.shrtco.de/v2/shorten?url=https://my-poly.herokuapp.com/admin/host/${query.id}`, (response) => {
        response.on('data', (d) => {
            console.timeEnd('querysave');
            const url = JSON.parse(d.toString()).result.full_short_link
            query.url = url
            query.save()
            res.json({ "URL": url })
        });
    })
    console.time('shortlink')
    const bitly_res = await bitly.shorten(`https://api.shrtco.de/v2/shorten?url=https://my-poly.herokuapp.com/admin/host/${query.id}`);
    console.dir(bitly_res);
    console.timeEnd('shortlink');
}
exports.forward = async(req, res) => {
    const queryid = req.params.queryid;
    const query = await Query.findById(queryid)
    if (!query) {
        res.send("Invalid URL")
    }
    query.accessList.push({ "ip": req.ip, "timestamp": new Date() })
    let redirectUrl;
    if (query.isUrl && !query.isEncrypted) {
        redirectUrl = query.Data;
    } else {
        redirectUrl = `https://polynomial-front.netlify.app/display/${query.id}/${query.isEncrypted}`
    }
    await query.save()
    res.redirect(redirectUrl);

}
exports.hosting = async(req, res) => {
    // const userid = req.user.id;
    const queryid = req.body.queryid;
    const key = req.body.key;
    const query = await Query.findById(queryid)
    Data = query.Data

    if (key) {
        const algorithm = 'aes-256-ctr';
        iv = query.iv;
        const secret = crypto.createHash('sha256').update(key).digest('base64').substr(0, 32);
        const cipher = crypto.createDecipheriv(algorithm, secret, iv);
        const Decrypted = Buffer.concat([cipher.update(Data, 'hex'), cipher.final()]);
        Data = Decrypted.toString('utf-8')
    }
    res.json({ Data })
}

exports.track = async(req, res) => {
    const queries = req.user.queries;
    // console.dir(queries)
    // Finalist = []
    const queryarray = await Query.find({ '_id': { "$in": queries } })
        // console.log(queryarray)

    finalist = queryarray.map(query => {
            const { id, url, isYoutube, embed, timestamp, ExpireAt } = query
            return { id, isYoutube, embed, timestamp, ExpireAt, url }
        })
        // await query.save()
    res.json(finalist)
}


exports.renewLink = async(req, res) => {
    const { queryid } = req.body;
    const timestamp = new Date()
    const ExpireAt = new Date(timestamp.getTime() + 24 * 60 * 60 * 1000);
    await Query.findByIdAndUpdate(queryid, { $set: { ExpireAt } })
    res.json({ "status": "Success" });
}
exports.deleteLink = async(req, res) => {

    const { queryid } = req.body;
    console.log(req.user.id)
    await User.findByIdAndUpdate(req.user.id, { $pull: { queries: queryid } })
    await Query.findByIdAndDelete(queryid);
    res.json({ "status": "Success" });
}
exports.accessdetails = async(req, res) => {
    const { queryid } = req.body;
    const query = await Query.findById(queryid)
    const { accessList } = query
    const sorted = accessList.sort((a, b) => {
        return a.timestamp.getTime() - b.timestamp.getTime()
    })
    res.json({ sorted });
}