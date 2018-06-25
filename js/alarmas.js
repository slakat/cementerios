// Prepare demo data
// Data is joined to map using value of 'hc-key' property by default.
// See API docs for 'joinBy' for more info on linking data and map.
var data_expansion = [
['cl-an', 7], //Antofagasta
['cl-2730', 23], //Araucanía
['cl-2740', ], //Arica y Parinacota
['cl-at', 5], //Atacama
['cl-ai', 5], //Aysén
['cl-bi', 14], //Bíobío
['cl-co', 7], //Coquimbo
['cl-ar', 5], //De Los Ríos
['cl-ll', 22], //Los Lagos
['cl-ma', 3], //Magallanes
['cl-ml', 1], //Maule
['cl-rm', 3], //Metropolitana
['cl-li', 5], //O'Higgins
['cl-ta', 4], //Tarapacá
['cl-vs', 7], //Valparaíso
];

var data_colapso = [
['cl-an', 3], //Antofagasta
['cl-2730', 29], //Araucanía
['cl-2740', ], //Arica y Parinacota
['cl-at', 7], //Atacama
['cl-ai', 2], //Aysén
['cl-bi', 20], //Bíobío
['cl-co', 8], //Coquimbo
['cl-ar', 4], //De Los Ríos
['cl-ll', 20], //Los Lagos
['cl-ma', 3], //Magallanes
['cl-ml', 4], //Maule
['cl-rm', 2], //Metropolitana
['cl-li', 8], //O'Higgins
['cl-ta', 5], //Tarapacá
['cl-vs', 9] //Valparaíso
]

var data_sanitario = [
['cl-an', 7], //Antofagasta
['cl-2730', 42], //Araucanía
['cl-2740', ], //Arica y Parinacota
['cl-at', 3], //Atacama
['cl-ai', 4], //Aysén
['cl-bi', 51], //Bíobío
['cl-co', 11], //Coquimbo
['cl-ar', 9], //De Los Ríos
['cl-ll', 15], //Los Lagos
['cl-ma', 7], //Magallanes
['cl-ml', 2], //Maule
['cl-rm', 5], //Metropolitana
['cl-li', 9], //O'Higgins
['cl-ta', 2], //Tarapacá
['cl-vs', 15], //Valparaíso
]

var data_ambiente = [
['cl-an', ], //Antofagasta
['cl-2730', 8], //Araucanía
['cl-2740', ], //Arica y Parinacota
['cl-at', 3], //Atacama
['cl-ai', 1], //Aysén
['cl-bi', 6], //Bíobío
['cl-co', 11], //Coquimbo
['cl-ar', 1], //De Los Ríos
['cl-ll', 7], //Los Lagos
['cl-ma', 2], //Magallanes
['cl-ml', 2], //Maule
['cl-rm', 1], //Metropolitana
['cl-li', 4], //O'Higgins
['cl-ta', 1], //Tarapacá
['cl-vs', 3], //Valparaíso
]



// Create the chart
Highcharts.mapChart('container-map-expansion', {
    chart: {
        map: 'countries/cl/cl-all'
    },

    title: {
        text: 'Cementerios Municipales con problemas de expansión'
    },

    credits: {
        enabled: false
    },

    mapNavigation: {
        enabled: true,
        buttonOptions: {
            verticalAlign: 'bottom'
        }
    },

    colorAxis: {
        min: 0
    },

    series: [{
        data: data_expansion,
        name: 'Cementerios Municipales',
        states: {
            hover: {
                color: '#BADA55'
            }
        },
        dataLabels: {
            enabled: true,
            format: '{point.name}'
        }
    }]
});


$(".button").click(function (e) {
        var newdata = [['cl-an', 100], //Antofagasta
['cl-2730', 47], //Araucanía
['cl-2740', 2], //Arica y Parinacota
['cl-at', 9], //Atacama
['cl-ai', 12], //Aysén
['cl-bi', 62], //Bíobío
['cl-co', 28], //Coquimbo
['cl-ar', 15], //De Los Ríos
['cl-ll', 32], //Los Lagos
['cl-ma', 8], //Magallanes
['cl-ml', 9], //Maule
['cl-rm', 7], //Metropolitana
['cl-li', 9], //O'Higgins
['cl-ta', 8], //Tarapacá
['cl-vs', 20] //Valparaíso
];;
        
        $('#container-map').options.series.setData(newdata);
    });
