    console.clear()
    var w = 940, h = 700;
    
    var radius = 5;
    var color = d3.scaleOrdinal(d3.schemeCategory20);
    var centerScale = d3.scalePoint().padding(1).range([0, w]);
    var forceStrength = 0.2;
    //var colors=["rgb(255, 187, 120)","rgb(255, 127, 14)","rgb(174, 199, 232)","rgb(44, 160, 44)","rgb(31, 119, 180)"]

    
    var svg = d3.select("#visual").append("svg")
      .attr("width", w)
      .attr("height", h)

    var simulation = d3.forceSimulation()
            .force("collide",d3.forceCollide( function(d){
              	return d.r + 8 }).iterations(16) 
            )
            .force("charge", d3.forceManyBody())
            .force("y", d3.forceY().y(h / 2))
            .force("x", d3.forceX().x(w / 2))
    
    d3.csv("data.csv", function(data){
      
      data.forEach(function(d){
        d.r = radius;
        d.x = w / 2;
        d.y = h / 2;
      })
      
      //console.table(data); 
           
      
      
      var circles = svg.selectAll("circle")
      	.data(data, function(d){ return d.ID ;});

       var tooltip = d3.select("#tooltip")
         .style("position", "absolute")
         .style("z-index", "10")
         .style("visibility", "hidden");
      
      var circlesEnter = circles.enter().append("circle")
      	.attr("r", function(d, i){ return d.r; })
        .attr("cx", function(d, i){ return 175 + 25 * i + 2 * i ** 2; })
				.attr("cy", function(d, i){ return 250; })
      	.style("fill", function(d, i){ return color(d.Alertas); })
      	.style("stroke", function(d, i){ return color(d.Alertas); })
      	.style("stroke-width", 10)
      	.style("pointer-events", "all")
      	.call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended)
                )
        .on("mouseover", function(d){
          text="<center>Ubicación: <br><b>"+d.comuna +", Región de "+d.region+"</b><br>"+
               "Nombre: <br><b>"+d.nombre +"</b><br>"+
               "<hr><p><b>ALERTAS</b></p></hr></center>"+
               "<table>"+
                  "<tr><th class='text-right'>Res. Sanitaria</th><th><span class='alerta "+d.resolucion+"'>"+d.resolucion +"</span></th></tr>"+
                  "<tr><th class='text-right'>Colapso</th><th><span class='alerta "+d.colapso+"'>"+d.colapso +"</span></th></tr>"+
                  "<tr><th class='text-right'>Expansión</th><th><span class='alerta "+d.expansion+"'>"+d.expansion +"</span></th></tr>"+
                  "<tr><th class='text-right'>Medioambiente</th><th><span class='alerta "+d.medioambiente+"'>"+d.medioambiente +"</span></th></tr>"+
                "</table>";
          tooltip.html(text);
          return tooltip.style("visibility", "visible");})
        .on("mousemove", function(){return tooltip.style("top",
            (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
        .on("mouseout", function(){return tooltip.style("visibility", "hidden");});
    
      circles = circles.merge(circlesEnter)
      
      function ticked() {
        //console.log("tick")
        //console.log(data.map(function(d){ return d.x; }));
        circles
            .attr("cx", function(d){ return d.x; })
            .attr("cy", function(d){ return d.y; });
      }   

      simulation
            .nodes(data)
            .on("tick", ticked);
      
      function dragstarted(d,i) {
        //console.log("dragstarted " + i)
        if (!d3.event.active) simulation.alpha(1).restart();
        d.fx = d.x;
        d.fy = d.y;
      }

      function dragged(d,i) {
        //console.log("dragged " + i)
        d.fx = d3.event.x;
        d.fy = d3.event.y;
      }

      function dragended(d,i) {
        //console.log("dragended " + i)
        if (!d3.event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
        var me = d3.select(this)
        console.log(me.classed("selected"))
        me.classed("selected", !me.classed("selected"))
        
        d3.selectAll("circle")
          .style("fill", function(d, i){ return color(d.Alertas); })
      	
        d3.selectAll("circle.selected")
          .style("fill", "none")
      	
      } 
      
      function groupBubbles() {
        hideTitles();

        // @v4 Reset the 'x' force to draw the bubbles to the center.
        simulation.force('x', d3.forceX().strength(forceStrength).x(w / 2));

        // @v4 We can reset the alpha value and restart the simulation
        simulation.alpha(1).restart();
      }
      
      function splitBubbles(byVar) {
        
        centerScale.domain(data.map(function(d){return d[byVar]; }));

        if(byVar==="Alertas"){
          centerScale.domain(["0","1","2","3","4"]);
        }


        
        if(byVar == "all"){
          hideTitles()
        } else {
	        showTitles(byVar, centerScale);
        }
        
        // @v4 Reset the 'x' force to draw the bubbles to their year centers
        simulation.force('x', d3.forceX().strength(forceStrength).x(function(d){ 
        	return centerScale(d[byVar]);
        }));

        // @v4 We can reset the alpha value and restart the simulation
        simulation.alpha(2).restart();
      }
      
      function hideTitles() {
        svg.selectAll('.title').remove();
      }

      function showTitles(byVar, scale) {
        // Another way to do this would be to create
        // the year texts once and then just hide them.
       	var titles = svg.selectAll('.title')
          .data(scale.domain());

        titles.enter().append('text')
          	.attr('class', 'title')
        	.merge(titles)
            .attr('x', function (d) { return scale(d); })
            .attr('y', 40)
            .attr('text-anchor', 'middle')
            .text(function (d) { return byVar + ' ' + d; });
        
        titles.exit().remove() 
      }
      
      function setupButtons() {
        d3.selectAll('.button')
          .on('click', function () {
          	
            // Remove active class from all buttons
            d3.selectAll('.button').classed('active', false);
            // Find the button just clicked
            var button = d3.select(this);

            // Set it as the active button
            button.classed('active', true);

            // Get the id of the button
            var buttonId = button.attr('id');

	          console.log(buttonId)
            // Toggle the bubble chart based on
            // the currently clicked button.
            splitBubbles(buttonId);
          });
      }
      
      setupButtons()
      
    });