
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
    credits: {
        enabled: false
    },
    series: [{
        name: 'Privados',
        data: [3,10,12,12,75,19,14,46,85,53,422,32,52,16,18],
        color: "#f97171"
    }, {
        name: 'Municipales',
        data: [2,8,8,9,28,20,7,9,9,62,47,15,32,12,8],
        color: "#66beb2"
    }
    ]
});