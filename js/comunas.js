
Highcharts.chart('container-comunas', {
    chart: {
        type: 'column'
    },
    exporting:{
        enabled: false
    },

    title: {
        text: ''
    },
    xAxis: {
        categories: ['Arica y Parinacota','Tarapacá','Antofagasta','Atacama','Coquimbo','Valparaíso','Metropolitana','OHiggins','Maule','Bíobío','Araucanía','De Los Ríos','Los Lagos','Aysén','Magallanes']
    },
    yAxis:{
        title:{text: "Cantidad"}
    },
    credits: {
        enabled: false
    },
    series: [{
        name: 'Privados',
        data: [6,5,4,5,76,55,31,46,86,53,422,18,53,4,8],
        color: "#f97171"
    }, {
        name: 'Municipales',
        data: [2,8,8,9,28,19,7,9,8,62,47,15,31,12,8],
        color: "#66beb2"
    }
    ]
});

