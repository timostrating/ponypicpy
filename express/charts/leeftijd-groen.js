
const db = require("../database.js");

module.exports = (api) => {

    api.get("/leeftijd-groen", (req, res) => {

        db.connection.query(`
            SELECT 
                leeftijd, 
                SUM(groen = "groen") / COUNT(*) AS green
            FROM 
                aanmeldingen 
            WHERE
                leeftijd < 80
            GROUP BY 
                leeftijd;
        `, [], (err, rows, fields) => {

                if (err) {
                    console.log(err);
                    return res.json({});
                }

                var data = [];

                for (var i in rows) {
                    var row = rows[i];
                    data.push([row.leeftijd, row.green]);
                }

                var chart = {
                    chart: {
                        zoomType: 'xy'
                    },
                    title: { text: "Leeftijd vs. groen/grijs" },
                    xAxis: { title: { text: "Leeftijd" } },
                    yAxis: { title: { text: "Percentage groen/grijs" } },
                    series: [
                        {
                            // name: "Dag",
                            type: 'scatter',
                            data: data
                        }
                        // ,
                        // {
                        //     name: "Trendlijn",
                        //     type: "line",
                        //     data: [
                        //         [0, 350], [2946, 190]
                        //     ]
                        // }
                    ]
                }

                res.json(chart);
            }
        );
    });

}

