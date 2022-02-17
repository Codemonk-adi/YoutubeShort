const auth = require("../middleware/auth")()
const Query = require("../models/queries")
const User = require("../models/user")


// require(")
// const { PythonShell } = require('python-shell');
// const imageToBase64 = require('image-to-base64');
// let fs = require("fs

exports.generateUrl = async(req, res) => {
    const user = req.user;
    const Data = req.body.data;
    const key = req.body.key;
    const isEncrypted = Boolean(key);
    if(isEncrypted){
        
    }
    const timestamp = new Date()
    const ExpireAt = new Date(timestamp.getTime() + 24*60*60*1000);
    const query = new Query({
        timestamp,
        ExpireAt,
        isEncrypted,
        Data
    })
    user.queries.push(query.id);
    user.save()
    query.save()
    res.json({'Status':"Success",'ip':req.ip})
}
exports.hosting = async(req, res) => {
    const userid = req.user.id;
    const user = await User.findById(userid).populate({ path: 'queries' });
    res.json(user.queries)
}


// exports.nosaveparser = async(req, res) => {
//     const templateID = req.body.templateid;
//     if (req.files.length == 0) {
//         res.json({ "msg": "No files Attached" })
//     }
//     // console.dir(query.parsed[0])
//     // console.dir(req.files)

//     // console.dir(query.parsed[0])
//     let finalout = []
//         // const promises = []

//     function create_process(file) {
//         return new bbPromise((resolve, reject) => {
//             // console.dir(query.templateID)
//             // console.dir(file)
//             var c_process = spawn('python', ["./pythonCode/main.py",
//                 file.path,
//                 file.mimetype,
//                 templateID
//             ])

//             c_process.stdout.on('data', data => {
//                 // console.log(data.toString())
//                 // console.log(data.toString())
//                 try {
//                     out = JSON.parse(data.toString())
//                     finalout.push(out)
//                 } catch (e) {
//                     console.log(data.toString())
//                 }
//             })

//             c_process.stderr.on('data', function(err) {
//                 // console.log(err.toString())
//                 reject(err.toString());
//             });
//             // promises.push(c_process)
//             c_process.on('close', () => {
//                 resolve()
//             });
//         })
//     }


//     bbPromise.map(req.files, (file) => {
//         return create_process(file)
//     }).then(() => {
//         res.json(finalout)
//     })

// }
// exports.refinedSearch = async(req, res) => {
//     const {
//         options,
//         queryid,
//     } = req.body
//     const query = await Query.findById(queryid)
//     let output = []
//     let parsed = {}
//     for (doc in query.parsed) {
//         if (doc.isparsed == false) {
//             continue;
//         }
//         parsed = doc.document;
//         for (opt in options) {
//             _.get(parsed, opt)
//         }

//     }


// }

exports.renewLink = async(req, res) => {
    const { queryid } = req.body;
    const timestamp = new Date()
    const ExpireAt = new Date(timestamp.getTime() + 24*60*60*1000);
    await Query.findByIdAndUpdate(queryid, { $set: { ExpireAt } })
    res.json({"status":"Success"});
}
exports.deleteLink = async(req, res) => {
    const { queryid } = req.body;
    // console.log(queryid)
    await User.findByIdAndUpdate(req.user.id, { $pull: { queries: queryid } })
    await Query.findByIdAndDelete(queryid);
    res.json({"status":"Success"});
}
