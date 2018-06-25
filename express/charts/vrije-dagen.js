
const db = require("../database.js");

module.exports = (api) => {

    api.get("/vrije-dagen", (req, res) => {

        res.json({
            series: [{
                data: [3, 3, 4, 5, 6, 6, 1, 2, 4, 5, 0]
            }]
        });

    });

}

