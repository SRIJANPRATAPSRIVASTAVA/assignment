const db = require('../config/db');

// Function to get banner details
exports.getBanner = async () => {
    const [rows] = await db.query('SELECT * FROM banner WHERE id = 1');
    return rows[0];
};

// Function to update banner details
exports.updateBanner = async (description, timer, link, visible) => {
    const query = `UPDATE banner SET description = ?, timer = ?, link = ?, visible = ? WHERE id = 1`;
    const [result] = await db.query(query, [description, timer, link, visible]);
    return result;
};
