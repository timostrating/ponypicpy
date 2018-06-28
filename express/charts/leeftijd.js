
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
                leeftijd BETWEEN 21 AND 78
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
                    yAxis: { title: { text: "Percentage groen" } },
                    series: [
                        {
                            name: "Leeftijd vs. groen/grijs",
                            type: 'scatter',
                            data: data
                        },
                        {
                            name: "Regressielijn f(x) = -0,00011568444869x² + 0,011771737004563x + 0,247803907954285",
                            type: "spline",
                            data: [
                                [21, 0.443993543098879],
                                [22, 0.450790848802075],
                                [23, 0.457356785607533],
                                [24, 0.463691353515253],
                                [25, 0.469794552525235],
                                [26, 0.475666382637479],
                                [27, 0.481306843851985],
                                [28, 0.486715936168753],
                                [29, 0.491893659587783],
                                [30, 0.496840014109075],
                                [31, 0.501554999732629],
                                [32, 0.506038616458445],
                                [33, 0.510290864286523],
                                [34, 0.514311743216863],
                                [35, 0.518101253249465],
                                [36, 0.521659394384329],
                                [37, 0.524986166621455],
                                [38, 0.528081569960843],
                                [39, 0.530945604402493],
                                [40, 0.533578269946405],
                                [41, 0.535979566592579],
                                [42, 0.538149494341015],
                                [43, 0.540088053191713],
                                [44, 0.541795243144673],
                                [45, 0.543271064199895],
                                [46, 0.544515516357379],
                                [47, 0.545528599617125],
                                [48, 0.546310313979133],
                                [49, 0.546860659443403],
                                [50, 0.547179636009935],
                                [51, 0.547267243678729],
                                [52, 0.547123482449785],
                                [53, 0.546748352323103],
                                [54, 0.546141853298683],
                                [55, 0.545303985376525],
                                [56, 0.544234748556629],
                                [57, 0.542934142838995],
                                [58, 0.541402168223623],
                                [59, 0.539638824710513],
                                [60, 0.537644112299665],
                                [61, 0.535418030991079],
                                [62, 0.532960580784755],
                                [63, 0.530271761680693],
                                [64, 0.527351573678893],
                                [65, 0.524200016779355],
                                [66, 0.520817090982079],
                                [67, 0.517202796287065],
                                [68, 0.513357132694313],
                                [69, 0.509280100203823],
                                [70, 0.504971698815595],
                                [71, 0.500431928529629],
                                [72, 0.495660789345925],
                                [73, 0.490658281264483],
                                [74, 0.485424404285303],
                                [75, 0.479959158408385],
                                [76, 0.474262543633729],
                                [77, 0.468334559961335],
                                [78, 0.462175207391203]
                            ],
                            marker: {
                                enabled: false
                            },
                            enableMouseTracking: false
                        }
                    ]
                }

                res.json(chart);
            }
        );
    });

    api.get("/leeftijd-tijden", (req, res) => {

        db.connection.query(`
            SELECT 
                leeftijd, avg(hour(datum)) AS uur
            FROM 
                ponydb.aanmeldingen 
            WHERE 
                leeftijd BETWEEN 21 AND 78
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
                    data.push([row.leeftijd, row.uur]);
                }

                var chart = {
                    chart: {
                        zoomType: 'xy'
                    },
                    title: { text: "Leeftijd vs. overstaptijd" },
                    xAxis: { title: { text: "Leeftijd" } },
                    yAxis: { title: { text: "Uur" } },
                    series: [
                        {
                            name: "Leeftijd vs. overstaptijd",
                            type: 'scatter',
                            data: data
                        }
                        ,
                        {
                            name: "Trendlijn f(x) = -0,0191x + 14,873",
                            type: "line",
                            data: [
                                [21, 14.47272507], [78, 13.38663355]
                            ]
                        }
                    ]
                }

                res.json(chart);
            }
        );
    });


    api.get("/leeftijd-tijden", (req, res) => {

        db.connection.query(`
            select groenpersentage, avg(l), group_concat(w) from

                (SELECT 
                    woonplaats as w, 
                    count(aanmeldingen.id) as aantal, 
                    avg(Leeftijd) as l, 
                    round(SUM(GroenGrijs="groen") / (SUM(GroenGrijs="groen")+SUM(GroenGrijs="grijs")) * 10) as groenpersentage
                FROM ponydb.aanmeldingen 
                group by w 
                having aantal > 10
                order by groenpersentage desc, l desc) as subquery
            
            where groenpersentage <> 0 and groenpersentage <> 10
            group by groenpersentage;
        `, [], (err, rows, fields) => {

                if (err) {
                    console.log(err);
                    return res.json({});
                }

                var data = [];

                for (var i in rows) {
                    var row = rows[i];
                    data.push([row.leeftijd, row.uur]);
                }

                var chart = {
                    plotOptions: { series: { animation: { duration: 4000 } } },
                    chart: {
                        zoomType: 'x'
                    },
                    title: { text: "Groene en grijze steden met hun gemiddelde Leeftijd" },
                    xAxis: { title: { text: "Leeftijd" } },
                    yAxis: { title: { text: "Uur" } },
                    series: [
                        {
                            name: "Leeftijd vs. overstaptijd",
                            type: 'columns',
                            data: data
                        }
                    ]
                }

                res.json(chart);
            }
        );
    });

}

