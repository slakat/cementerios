
/*
TODO:
- Check data labels after drilling. Label rank? New positions?
[Log] La Araucanía – "cl-2730" (drilldown.js, line 16)
[Log] Bío-Bío – "cl-bi" (drilldown.js, line 16)
[Log] Los Lagos – "cl-ll" (drilldown.js, line 16)
[Log] Libertador General Bernardo O'Higgins – "cl-li" (drilldown.js, line 16)
[Log] Aisén del General Carlos Ibáñez del Campo – "cl-ai" (drilldown.js, line 16)
[Log] Magallanes y Antártica Chilena – "cl-ma" (drilldown.js, line 16)
[Log] Coquimbo – "cl-co" (drilldown.js, line 16)
[Log] Atacama – "cl-at" (drilldown.js, line 16)
[Log] Valparaíso – "cl-vs" (drilldown.js, line 16)
[Log] Región Metropolitana de Santiago – "cl-rm" (drilldown.js, line 16)
[Log] Los Ríos – "cl-ar" (drilldown.js, line 16)
[Log] Maule – "cl-ml" (drilldown.js, line 16)
[Log] Tarapacá – "cl-ta" (drilldown.js, line 16)
[Log] Arica y Parinacota – "cl-2740" (drilldown.js, line 16)
[Log] Antofagasta – "cl-an" (drilldown.js, line 16)
*/

var dict = {
    'cl-2740' : 2,
'cl-ta' : 8,
'cl-an' : 8,
'cl-at' : 9,
'cl-co' : 28,
'cl-vs' : 19,
'cl-rm' : 7,
'cl-li' : 9,
'cl-ml' : 8,
'cl-bi' : 62,
'cl-2730' : 47,
'cl-ar' : 15,
'cl-ll' : 31,
'cl-ai' : 12,
'cl-ma' : 8,
};

var data = Highcharts.geojson(Highcharts.maps['countries/cl/cl-all']),
    separators = Highcharts.geojson(Highcharts.maps['countries/cl/cl-all'], 'mapline'),
    // Some responsiveness
    small = $('#container').width() < 400;

var cementerios;
d3.csv("data.csv", function(data){
   cementerios=data;
   });;
    

// Set drilldown pointers
$.each(data, function (i) {
    this.drilldown = this.properties['hc-key'];
    this.value = dict[this.properties['hc-key']]; // Non-random bogus data
});

Highcharts.setOptions({
    lang: {
        drillUpText: 'Volver a Chile'
    }
});


// Instantiate the map
Highcharts.mapChart('container-drilldown', {
    chart: {
        events: {
            drilldown: function (e) {
                /*console.table(cementerios);*/
                if (!e.seriesOptions) {
                    var chart = this,
                        mapKey = 'assets/geo/'+ e.point.drilldown, 
                        // Handle error, the timeout is cleared on success
                        fail = setTimeout(function () {
                            if (!mapKey) {
                                chart.showLoading('<i class="icon-frown"></i> Failed loading ' + e.point.name);
                                fail = setTimeout(function () {
                                    chart.hideLoading();
                                }, 1000);
                            }
                        }, 3000);

                    // Show the spinner
                    chart.showLoading('<i class="icon-spinner icon-spin icon-3x"></i>'); // Font Awesome spinner

                    // Load the drilldown map
                    $.getScript(mapKey + '.js', function () {

                        data = Highcharts.geojson(Highcharts.maps[e.point.drilldown]);

                        // Set a non-random bogus value
                        $.each(data, function (i) {
                            this.name = this.properties.NOM_COM;
                            this.county = true;
                            this.region = e.point.name;
                            this.reg = e.point.drilldown
                            this.value = getFilteredData(cementerios, this.properties.NOM_COM, e.point.drilldown).length;
                        });

                        // Hide loading and add series
                        chart.hideLoading();
                        clearTimeout(fail);
                        chart.addSeriesAsDrilldown(e.point, {
                            name: e.point.name,
                            data: data,
                            dataLabels: {
                                enabled: true,
                                format: '{point.name}'
                            }
                        });
                    });
                }

                this.setTitle(null, { text: e.point.name });
            },
            drillup: function () {
                this.setTitle(null, { text: '' });
            },
        },
    backgroundColor: "#000",
    },

    title: {
        text: ''
    },

    exporting:{
        enabled: false
    },

    credits:{
        enabled: false
    },

    subtitle: {
        text: '',
        floating: true,
        align: 'right',
        y: 50,
        style: {
            fontSize: '16px',
            color: "#fff"
        }
    },

    legend: small ? {} : {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
    },

    colorAxis: {
        min: 0,
        minColor: '#EEEEFF',
        maxColor: '#f97171',
    },

    mapNavigation: {
        enabled: true,
        buttonOptions: {
            verticalAlign: 'bottom'
        }
    },

    plotOptions: {
        map: {
            states: {
                hover: {
                    color: '#7171f9'
                }
            },
            events:{click: function (e) {
                if (e.point.county){
                    showtable(e.point.name,e.point.region,e.point.reg);
                    $('#myModal').modal('show');
                    }}}
        },
    },

    series: [{
        data: data,
        name: 'Chile',
        dataLabels: {
            enabled: true,
            format: '{point.properties.name}'
        }
    }, {
        type: 'mapline',
        data: separators,
        color: 'silver',
        enableMouseTracking: false,
        animation: {
            duration: 500
        }
    }],

    drilldown: {
        activeDataLabelStyle: {
            color: '#FFFFFF',
            textDecoration: 'none',
            textOutline: '1px #000000'
        },
        drillUpButton: {
            relativeTo: 'spacingBox',
            position: {
                x: 0,
                y: 60
            }
        }
    }
});


var tooltable = d3.select("#drill-table")
         .style("position", "absolute")
         .style("z-index", "10")
         .style("visibility", "hidden");



var showtable = function(name,region,reg){
    var d = getFilteredData(cementerios, name, reg);
    var c="";
    d.forEach(function(result){
        c=c+"<tr><td class='text-right'>"+result.nombre+"</td><td>"+result.region+"</td></tr>";
    })
    if(!c|| c.length === 0){
        text= "<center>Ubicación: <br><b>Región de "+region+"</b><br>"+
               "Nombre: <br><b>"+name+"</b><br>"+
               "<hr><p><b>Cementerios</b></p></hr>"+
              "<span class='alert Sí'>No hay cementerios MUNICIPALES en la comuna</span></center>";
    }

    else{

    text="<center>Ubicación: <br><b>Región de "+region+"</b><br>"+
               "Nombre: <br><b>"+name+"</b><br>"+
               "<hr><p><b>Cementerios</b></p></hr></center>"+
               "<table cellpadding='0' cellspacing='0' border='0'  class='drilldown'>"+
                  "<thead><tr><th>NOMBRE</th></tr></thead>"+
                  "<tbody>"+
                  c+
                  "</tbody>"+
                "</table>";
    }


  $("#myModal .modal-body").html(text);

};

// Get a subset of the data based on the group
function getFilteredData(data, comuna, region) {
    return data.filter(function(point) { return (point.comuna === comuna && point.reg === region); });
}
