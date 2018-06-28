
const db = require("../database.js");

module.exports = (api) => {

    api.get("/vrije-dagen", (req, res) => {

        db.connection.query(`
            SELECT
                DATE(aanmeldingen.datum) AS d,
                COUNT(*) AS aanmeldingen,
                MIN(vrijedagen.titel) AS feestdag,
                IF(WEEKDAY(MIN(aanmeldingen.datum)) IN (5, 6), true, false) AS weekend
            FROM aanmeldingen
            LEFT JOIN vrijedagen ON vrijedagen.datum = DATE(aanmeldingen.datum)
            GROUP BY d;
        `, [], (err, rows, fields) => {

                if (err) {
                    console.log(err);
                    return res.json({});
                }

                var xAxis = [];
                var data = [];
                var plotBands = [];

                for (var i in rows) {
                    var row = rows[i];
                    xAxis.push(row.d);
                    data.push(
                        {
                            y: row.aanmeldingen,
                            feestdag: row.feestdag
                        }
                    );
                    if (row.feestdag != null) {

                        plotBands.push(
                            {
                                color: "#008c2e",
                                from: parseInt(i) - .5,
                                to: parseInt(i) + .5
                            }
                        )

                    } else if (row.weekend) {
                        plotBands.push(
                            {
                                color: "#7a3700",
                                from: parseInt(i) - .5,
                                to: parseInt(i) + .5
                            }
                        );
                    }
                }

                var chart = {
                    plotOptions: { series: { animation: { duration: 4000 } } },
                    chart: { zoomType: "x" },
                    title: { text: "Vrije- / feestdagen" },
                    xAxis: {
                        categories: xAxis,
                        tickInterval: 14,
                        plotBands: plotBands
                    },
                    yAxis: { title: { text: "" } },
                    series: [{
                        type: "line",
                        name: "Aanmeldingen",
                        data: data
                    }]
                }

                res.json(chart);
            }
        );
    });

}

