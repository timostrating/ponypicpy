
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
                    }, {
                        name: 'Neutraal',
                        data: neutraal,
                        color: "darkgrey"
                    }, {
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

                var nieuwsRows = {};

                for (var i in rows) {
                    var row = rows[i];
                    nieuwsRows[row.w] = row;
                }

                db.connection.query(`
                    SELECT COUNT(*) AS aan FROM aanmeldingen
                    GROUP BY DAYOFYEAR(datum)
                `, [], (err, rows1, fields) => {

                        if (err) {
                            console.log(err);
                            return res.json({});
                        }

                        var positief = [];
                        var neutraal = [];
                        var negatief = [];
                        var aanmeldingen = [];

                        for (var i in rows1) {
                            var row = rows1[i];
                            aanmeldingen.push(row.aan);
                            if (i in nieuwsRows) {
                                var nieuwsRow = nieuwsRows[i];
                                positief.push(nieuwsRow.positief);
                                neutraal.push(nieuwsRow.neutraal);
                                negatief.push(nieuwsRow.negatief);
                            } else {
                                positief.push(0);
                                neutraal.push(0);
                                negatief.push(0);
                            }
                        }

                        var chart = {
                            chart: { zoomType: "x" },
                            title: { text: "Nu alleen de relevante artikelen" },
                            yAxis: [
                                { title: { text: "Nieuws" }, opposite: true },
                                { title: { text: "Aanmeldingen" } }
                            ],
                            series: [{
                                type: "column",
                                name: 'Positief',
                                data: positief,
                                yAxis: 0,
                                color: "green"
                            }, {
                                type: "column",
                                name: 'Neutraal',
                                data: neutraal,
                                yAxis: 0,
                                color: "darkgrey"
                            }, {
                                type: "column",
                                name: 'Negatief',
                                data: negatief,
                                yAxis: 0,
                                color: "red"
                            }, {
                                type: "line",
                                name: 'Aanmeldingen',
                                yAxis: 1,
                                data: aanmeldingen
                            }]
                        }

                        res.json(chart);
                    }
                );
            }
        );
    });


}

