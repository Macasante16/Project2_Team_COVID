function init() {  
    var entry = {
        fromdate: "2020-06-13",
        todate: "2020-06-20",
        county: "",
        state: ""
    };

    fetch(`${window.origin}/custom/Search`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(entry),
        cache: "no-cache",
        headers: new Headers({
            "content-type": "application/json"
        })
    })
        .then(function (response) {
            if (response.status !== 200) {
                console.log("Response was not 200")
                return;
            }

            response.json().then(function (data) {
                var dates = [];
                var confirmed = [];
                var deaths = [];
                var active = [];
                var text = [];

                data.forEach(obj => {
                    Object.entries(obj).forEach(([key, value]) => {

                        if (key == "datadate") {
                            dates.push(value);
                        }

                        if (key == "confirmed") {
                            confirmed.push(value);
                        }

                        if (key == "deaths") {
                            deaths.push(value);
                        }

                        if (key == "active") {
                            active.push(value);
                        }

                        if (key == "uscounty") {
                            text.push(value);
                        }
                    });
                });

                var trace_confirmed = {
                    x: dates,
                    y: confirmed,
                    name: 'Confirmed Cases',
                    type: "bar",
                };

                var trace_active = {
                    x: dates,
                    y: active,
                    name: 'Active Cases',
                    type: "bar",
                };

                var data_first_graph = [trace_confirmed, trace_active];

                var layout_first_graph = {
                    title: "USA DATA: Confirmed Vs. Active Cases",
                    barmode: 'group'
                };

                Plotly.newPlot("confirmed_active", data_first_graph, layout_first_graph);

                var trace_deaths = {
                    x: deaths,
                    y: dates,
                    name: 'COVID Deaths',
                    type: "bar",
                    orientation: "h"
                };

                var data_second_graph = [trace_deaths];

                var layout_second_graph = {
                    title: "USA DATA: Deaths due COVID-19",
                };

                Plotly.newPlot("deaths", data_second_graph, layout_second_graph);

            })
        })
}

init();

