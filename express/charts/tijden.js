
const db = require("../database.js");

module.exports = (api) => {

    api.get("/tijden", (req, res) => {

        db.connection.query(`
            select avg(hour(datum)) as a, date(datum) as d from aanmeldingen group by 2;
        `, [], (err, rows, fields) => {

                if (err) {
                    console.log(err);
                    return res.json({});
                }

                var data = [];
                var xAxis = [];

                for (var i in rows) {
                    var row = rows[i];
                    data.push(row.a);
                    xAxis.push(row.d);
                }

                var chart = {
                    plotOptions: { series: { animation: { duration: 4000 } } },
                    chart: { zoomType: "x" },
                    title: { text: "Gemiddelde overstaptijd" },
                    xAxis: { title: { text: "Dagen" }, categories: xAxis, tickInterval: 7 },
                    yAxis: { title: { text: "Uren" } },
                    series: [{
                        name: 'Overstaptijd',
                        data: data
                    }]
                }

                res.json(chart);
            }
        );
    });

}

