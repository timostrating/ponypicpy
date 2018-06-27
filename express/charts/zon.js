
const db = require("../database.js");

module.exports = (api) => {

    api.get("/zon", (req, res) => {

        db.connection.query(`
            select w.yyyymmdd, a.aant, w.q
            from weer w
            join 
                (
                    select date(datum) as datum, count(*) as aant
                    from aanmeldingen
                    group by 1
                ) a on a.datum = w.yyyymmdd
            where YEAR(w.yyyymmdd) = 2014;
        `, [], (err, rows, fields) => {

                if (err) {
                    console.log(err);
                    return res.json({});
                }

                var xAxis = [];
                var aanmeldingen = [];
                var zon = [];

                for (var i in rows) {
                    var row = rows[i];
                    xAxis.push(row.yyyymmdd);
                    aanmeldingen.push(row.aant);
                    zon.push(parseInt(row.q));
                }

                var chart = {
                    chart: { zoomType: "x" },
                    title: { text: "Zonnestraling & overstappers" },
                    xAxis: {
                        categories: xAxis,
                        tickInterval: 14
                    },
                    yAxis: [
                        { title: { text: "Aanmeldingen" } },
                        { title: { text: "Zonnestraling J/cm²" }, opposite: true }
                    ],
                    series: [
                        {
                            type: "column",
                            name: "Aanmeldingen",
                            data: aanmeldingen,
                            yAxis: 0,
                            color: "#053568"
                        },
                        {
                            name: "Zonnestraling J/cm²",
                            data: zon,
                            yAxis: 1,
                            color: "red"
                        }
                    ]
                }

                res.json(chart);
            }
        );
    });

    api.get("/zon-scatter", (req, res) => {

        db.connection.query(`
            select w.yyyymmdd, a.aant, w.q
            from weer w
            join 
                (
                    select date(datum) as datum, count(*) as aant
                    from aanmeldingen
                    group by 1
                ) a on a.datum = w.yyyymmdd
            where YEAR(w.yyyymmdd) = 2014;
        `, [], (err, rows, fields) => {

                if (err) {
                    console.log(err);
                    return res.json({});
                }

                var data = [];

                for (var i in rows) {
                    var row = rows[i];
                    data.push([row.q, row.aant]);
                }

                var chart = {
                    chart: {
                        zoomType: 'xy'
                    },
                    title: { text: "Zonnestraling vs. overstappers" },
                    xAxis: { title: { text: "Zonnestraling J/cm²" } },
                    yAxis: { title: { text: "Overstappers" } },
                    series: [
                        {
                            name: "Dag",
                            type: 'scatter',
                            data: data
                        },
                        {
                            name: "Trendlijn",
                            type: "line",
                            data: [
                                [0, 350], [2946, 190]
                            ]
                        }
                    ]
                }

                res.json(chart);
            }
        );
    });

}

