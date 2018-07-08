
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

var data = Highcharts.geojson(Highcharts.maps['countries/cl/cl-all']),
    separators = Highcharts.geojson(Highcharts.maps['countries/cl/cl-all'], 'mapline'),
    // Some responsiveness
    small = $('#container').width() < 400;

// Set drilldown pointers
$.each(data, function (i) {
    this.drilldown = this.properties['hc-key'];
    this.value = i; // Non-random bogus data
});

// Instantiate the map
Highcharts.mapChart('container', {
    chart: {
        events: {
            drilldown: function (e) {
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
                            this.value = i;
                            this.name = this.properties.NOM_COM;
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
            }
        }
    },

    title: {
        text: ''
    },

    subtitle: {
        text: '',
        floating: true,
        align: 'right',
        y: 50,
        style: {
            fontSize: '16px'
        }
    },

    legend: small ? {} : {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
    },

    colorAxis: {
        min: 0,
        minColor: '#E6E7E8',
        maxColor: '#005645'
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
                    color: '#EEDD66'
                }
            }
        }
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

