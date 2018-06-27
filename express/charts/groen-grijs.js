
const db = require("../database.js");

module.exports = (api) => {

    api.get("/groen-grijs", (req, res) => {

        db.connection.query(`
            SELECT
                dayofyear(datum) as w,
                SUM(groen = "groen") as sumgroen,
                SUM(groen = "grijs") as sumgrijs
            FROM aanmeldingen
            GROUP BY w
        `, [], (err, rows, fields) => {

                if (err) {
                    console.log(err);
                    return res.json({});
                }

                var groen = [];
                var grijs = [];

                for (var i in rows) {
                    var row = rows[i];
                    groen.push(row.sumgroen);
                    grijs.push(row.sumgrijs);
                }

                console.log(grijs);

                var chart = {
                    chart: { zoomType: "x" },
                    title: { text: "TEST" },
                    yAxis: { title: { text: "" } },
                    series: [{
                        name: 'Groen',
                        data: groen
                    },{
                        name: 'Grijs',
                        data: grijs
                    }]
                }

                res.json(chart);
            }
        );
    });

}

