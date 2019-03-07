const dbHelper = require("../helpers/database-helper");

/**
 * Add sender utility to request
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
exports.addDatabaseConnection = async (req, res, next) => {
    try{
        const conn = await dbHelper.establishConnection();
        res.db = conn;
        next();
    } catch(err) {
        res.sendResponse(500, {message: "Error establishing a connection to the database."})
    }
};

module.exports = exports;