
const db = require("../database.js");

module.exports = (api) => {

    api.get("/mediauitingen", (req, res) => {

        db.connection.query(`
            SELECT
                COUNT(*) AS aanmeldingen
            FROM aanmeldingen
            WHERE datum < DATE("2014-12-29")
            GROUP BY WEEKOFYEAR(datum)
            ORDER BY WEEKOFYEAR(datum)
        `, [], (err, rows, fields) => {

                if (err) {
                    console.log(err);
                    return res.json({});
                }

                var data = [];

                for (var i in rows) {
                    var row = rows[i];
                    data.push(row.aanmeldingen);
                }

                var chart = {
                    plotOptions: { series: { animation: { duration: 4000 } } },
                    title: {
                        text: 'De verschillende soorten nieuwsuitingen'
                    },
                    yAxis: [{
                        opposite: true,
                        title: {
                            text: 'Aantal nieuwsuitingen'
                        }
                    }, {
                        title: {
                            text: 'Aantal aanmeldingen'
                        }
                    }],
                    tooltip: {
                        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                            '<td style="padding:0"><b>{point.y:1f}</b></td></tr>',
                        footerFormat: '</table>',
                        shared: true,
                        useHTML: true
                    },
                    plotOptions: {
                        column: {
                            pointPadding: 0.2,
                            borderWidth: 0
                        }
                    },
                    series: [
                        {
                            name: 'totaal',
                            type: 'column',
                            data: [3, 0, 1, 0, 5, 1, 1, 1, 1, 0, 1, 1, 0, 2, 0, 0, 1, 1, 0, 2, 1, 1, 1, 0, 3, 1, 2, 3, 2, 0, 1, 1, 2, 2, 2, 2, 1, 0, 2, 2, 1, 3, 0, 1, 1, 0, 3, 1, 1, 0, 3, 0]
                        },
                        {
                            name: 'neutraal',
                            type: 'column',
                            data: [2, 0, 1, 0, 3, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 2, 1, 1, 1, 0, 3, 1, 2, 3, 2, 0, 1, 1, 1, 1, 1, 2, 0, 0, 2, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 2]
                        },
                        {
                            name: 'pos',
                            type: 'column',
                            data: [1, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 1, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 3, 0, 1, 1, 0, 2, 0, 0, 0, 0, 0]
                        },
                        {
                            name: 'neg',
                            type: 'column',
                            data: [0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1]
                        },
                        {
                            name: "Aanmeldingen",
                            type: 'line',
                            yAxis: 1,
                            data: data
                        }
                    ]
                }

                res.json(chart);
            }
        );
    });

}

