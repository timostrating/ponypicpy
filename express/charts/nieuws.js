
const db = require("../database.js");

module.exports = (api) => {

    api.get("/nieuws", (req, res) => {

        db.connection.query(`
            SELECT
                dayofyear(datum) as w,
                SUM(sentiment > 0) as positief,
                SUM(sentiment = 0   ) as neutraal,
                SUM(sentiment < 0) as negatief
            FROM nieuws
            GROUP BY w
        `, [], (err, rows, fields) => {

                if (err) {
                    console.log(err);
                    return res.json({});
                }

                var positief = [];
                var neutraal = [];
                var negatief = [];

                for (var i in rows) {
                    var row = rows[i];
                    positief.push(row.positief);
                    neutraal.push(row.neutraal);
                    negatief.push(row.negatief);
                }

                var chart = {
                    chart: { zoomType: "x" },
                    title: { text: "Het sentiment van alle artikelen" },
                    yAxis: { title: { text: "" } },
                    series: [{
                        name: 'Positief',
                        data: positief,
                        color: "green"
                    },{
                        name: 'Neutraal',
                        data: neutraal,
                        color: "darkgrey"
                    },{
                        name: 'Negatief',
                        data: negatief,
                        color: "red"
                    }]
                }

                res.json(chart);
            }
        );
    });

    api.get("/nieuws-fix", (req, res) => {

        db.connection.query(`
            SELECT
                dayofyear(datum) as w,
                SUM(sentiment > 0) as positief,
                SUM(sentiment = 0   ) as neutraal,
                SUM(sentiment < 0) as negatief
            FROM nieuws
            where relevantiescore > 100 and naam <> "parool"
            GROUP BY w
        `, [], (err, rows, fields) => {

                if (err) {
                    console.log(err);
                    return res.json({});
                }

                var positief = [];
                var neutraal = [];
                var negatief = [];

                for (var i in rows) {
                    var row = rows[i];
                    positief.push(row.positief);
                    neutraal.push(row.neutraal);
                    negatief.push(row.negatief);
                }

                var chart = {
                    chart: { zoomType: "x", type: "column" },
                    title: { text: "Nu alleen de relevante artikelen" },
                    yAxis: { title: { text: "" } },
                    series: [{
                        name: 'Positief',
                        data: positief,
                        color: "green"
                    },{
                        name: 'Neutraal',
                        data: neutraal,
                        color: "darkgrey"
                    },{
                        name: 'Negatief',
                        data: negatief,
                        color: "red"
                    }]
                }

                res.json(chart);
            }
        );
    });


}

