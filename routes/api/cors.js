const cors = require('cors');

const whitelist = ['http://localhost:8082']; // TODO: implement https

const corsOptionsDelegate = (req, callback) => {
    let corsOptions;
    console.log(req.header('Origin'));
    if (whitelist.indexOf(req.header('Origin')) !== -1) {
        // Can an origin be found in the whitelist?
        corsOptions = {origin: true};
    } else {
        corsOptions = {origin: false};
    }

    callback(null, corsOptions);
};

exports.cors = cors();
exports.corsWithOptions = cors(corsOptionsDelegate);