
const db = require("../database.js");

module.exports = (api) => {

    api.get("/week", (req, res) => {

        db.connection.query(`
            select hour(datum), count(*) / 52 as a from aanmeldingen group by 1;
        `, [], (err, rows, fields) => {

                if (err) {
                    console.log(err);
                    return res.json({});
                }

                var data = [];

                for (var i in rows) {
                    var row = rows[i];
                    data.push(row.a);
                }

                var chart = {
                    chart: { zoomType: "x" },
                    title: { text: "Verloop dag" },
                    xAxis: { title: { text: "Uren" } },
                    yAxis: { title: { text: "Overstappers" } },
                    series: [{
                        name: 'Overstappers',
                        data: data
                    }]
                }

                res.json(chart);
            }
        );
    });

}

