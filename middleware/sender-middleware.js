/**
 * Setup render utility
 * @param res
 * @returns {Function}
 */
function setupSender(res){

    return (statusCode, payload) => {

        if(!statusCode){
            return res.sendResponse(500);
        }

        if (payload) {
            let length;
            if(!payload.statusCode) {
                payload.statusCode = statusCode;
            }

            length = Array.isArray(payload) ? payload.length : 'N/A';
            return res.status(statusCode).send({date: new Date().toDateString(), payloadLength: length, payload: payload});
        }

        return res.status(statusCode).send({"statusCode": statusCode});

    };

}

exports.addSenderUtility = (req, res, next) => {
    res.sendResponse = setupSender(res);
    next();
};

module.exports = exports;