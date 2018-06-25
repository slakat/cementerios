$(function () {
    // Initiate the chart
    $('#chart').highcharts('Map', {

        title: {
            text: 'Highmaps basic lat/lon demo'
        },

        mapNavigation: {
            enabled: true
        },

        tooltip: {
            headerFormat: '',
            pointFormat: '<b>{point.name}</b><br>{point.z} Deliveries'
        },
        legend: {
            enabled: false
        },
        series: [{
            // Use the gb-all map with no data as a basemap
            mapData: Highcharts.maps['countries/cl/cl-all'],
            name: 'Basemap',
            borderColor: '#A0A0A0',
            nullColor: 'rgba(200, 200, 200, 0.3)',
            showInLegend: false
        }, {
            name: 'Separators',
            type: 'mapline',
            data: Highcharts.geojson(Highcharts.maps['countries/cl/cl-all'],
                'mapline'),
            color: '#707070',
            showInLegend: false,
            enableMouseTracking: false
        }, {
            // Specify points using lat/lon
            type: 'mapbubble',
            name: 'Cities',
            color: Highcharts.getOptions().colors[2],
            data: [
        ['cl-an', 8], //Antofagasta
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
],
    });

    $("#course_form").change(function (e) {
        var newdata = [{
            'lat': 30.40334,
            'z': 1,
            'lon': -88.960499,
            'name': 'Biloxi'
        }, {
            'lat': 41.200508,
            'z': 1,
            'lon': -73.168771,
            'name': 'Bridgeport'
        }, {
            'lat': 40.649748,
            'z': 2,
            'lon': -73.882375,
            'name': 'Brooklyn'
        }, {
            'lat': 26.707947,
            'z': 1,
            'lon': -81.859447,
            'name': 'Fort Myers'
        }, {
            'lat': 40.7445,
            'z': 1,
            'lon': -74.032863,
            'name': 'Hoboken'
        }, {
            'lat': 21.294139,
            'z': 6,
            'lon': -157.828388,
            'name': 'Honolulu'
        }, {
            'lat': 21.981618,
            'z': 1,
            'lon': -159.368258,
            'name': 'Lihue'
        }, {
            'lat': 30.647431,
            'z': 1,
            'lon': -88.229245,
            'name': 'Mobile'
        }, {
            'lat': 41.296284,
            'z': 1,
            'lon': -72.937307,
            'name': 'New Haven'
        }, {
            'lat': 40.710537,
            'z': 4,
            'lon': -74.016323,
            'name': 'New York'
        }, {
            'lat': 28.487102,
            'z': 1,
            'lon': -81.408162,
            'name': 'Orlando'
        }, {
            'lat': 26.113639,
            'z': 1,
            'lon': -80.271019,
            'name': 'Plantation'
        }, {
            'lat': 40.904341,
            'z': 1,
            'lon': -72.410271,
            'name': 'Southampton'
        }, {
            'lat': 39.588149,
            'z': 1,
            'lon': -74.364586,
            'name': 'Tuckerton'
        }];
        var course = $("#course_form option:selected").text();
        $('#chart').highcharts().series[2].setData(newdata);
    });


});