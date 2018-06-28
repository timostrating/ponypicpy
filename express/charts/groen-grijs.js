
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

                var chart = {
                    plotOptions: { series: { animation: { duration: 4000 } } },
                    chart: { zoomType: "x" },
                    title: { text: "Groen/grijs" },
                    yAxis: { title: { text: "" } },
                    series: [{
                        name: 'Groen',
                        data: groen,
                        color: "green"
                    },{
                        name: 'Grijs',
                        data: grijs,
                        color: "darkgrey"
                    }]
                }

                res.json(chart);
            }
        );
    });

}

