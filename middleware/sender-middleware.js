
function setupSender(res){

    return (statusCode, payload) => {

        if(!statusCode){
            return res.sendResponse(500);
        }

        if (payload) {
            if(!payload.statusCode) {
                payload.statusCode = statusCode;
            }
            return res.status(statusCode).send(payload);
        }

        return res.status(statusCode).send({"statusCode": statusCode});

    };

}

exports.addSenderUtility = (req, res, next) => {
    res.sendResponse = setupSender(res);
    next();
};

module.exports = exports;