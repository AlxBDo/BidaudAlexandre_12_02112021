import * as d3 from "d3";


/**
 * draw rounded top edges at the bars of the graph
 * @param {object} x - d3 object 
 * @param {object} y - d3 object
 * @param {number} height - svg height 
 * @param {number} width - svg width 
 * @returns {string} coordinates of the drawn element
 */
 const topRoundedColumn = function(x, y, height, width) {
  const radius = width / 2;
  const heightBeforeArc = height - radius;
  return (
    `M${x-11.76},${y} ` + // Mx,y Move the pen to(x, y)
    `v-${heightBeforeArc} ` + // h<length> Draw a vertical line of length <height>px
    `a ${radius},${radius} 0 0 1 ${radius},-${radius} ` + // arc
    `a ${radius},${radius} 0 0 1 ${radius},${radius} ` +
    `v${heightBeforeArc} ` +
    `z` // close shape
  );
}


/**
 * create user daily activity chart
 * @param {array} data - array of objects containing the data needed for the daily activity graph
 * @example data : [ { day: <string>, kilogram : <integer>, calories : <integer>}]
 * @param {number} height - chart height 
 * @param {object} svg - svg contains chart
 * @param {number} width - chart width
 * @param {object} [margin] - contains attributes : marginTop, marginRight, marginBottom, marginLeft
 */
function dailyActivity(data, height, svg, width, margin) {
  
  svg.attr("transform", `translate(5 ,${margin.top+margin.bottom})`);
    let chartHeight = height * 0.85

    // Create axes
    const xScale = d3.scaleBand()
    .range([0, width])
    .padding(0.1)
    .domain(data.map((d) => d.day.substring(9)));

    const yScale = d3.scaleLinear()
    .range([chartHeight, 0])
    .domain([0, d3.max(data, d => d.kilogram > d.calories ? d.kilogram : d.calories+100)]);

    // Add tooltip
    const div = d3.select("body").append("div")
    .attr("class", "tooltip")         
    .style("opacity", 0);

   // Add X grid lines with labels
   const xAxis = d3.axisBottom(xScale).tickSize(0);
   const xAxisGroup = svg.append("g")
     .attr("transform", `translate(${-width*0.11}, ${chartHeight*0.95})`)
     .attr("color", "#DEDEDE")
     .call(xAxis);
   xAxisGroup.selectAll("text")
     .style("text-anchor", "end")
     .style("color", "#9B9EAC")
     .style("font-size", "14px")
     .style("font-weight", "bold")
     .attr("dx", "-2.5em")
     .attr("dy", "1.5em")
     .attr("transform", `translate(${width < 600 ? width*0.11 : width*0.09}, 0)`);

    // Add Y grid lines with labels
    const yAxis = d3.axisRight(yScale).ticks(3).tickSize(-width*0.9);
    const yAxisGroup = svg.append("g")
    .attr("transform", `translate(${width-(margin.right)}, ${-chartHeight*0.05})`)
    .attr("stroke-width", "0").call(yAxis);
    yAxisGroup.selectAll("line")
      .attr("transform", `translate(${-width*0.08}, 0)`)
      .attr("stroke", "#DEDEDE")
      .attr("stroke-width", "1")
      .style("stroke-dasharray", "2 2");

    // Add the day bar
    svg.selectAll(".day")
      .data(data)
      .enter().append("path")
      .attr("class", "day")
      .attr("d", d => `M${xScale(d.day.substring(9))-28.76},${chartHeight} ` + // Mx,y Move the pen to(x, y)
      `v-${chartHeight - yScale(d.calories) + 20} ` +  // arc
      `a ${width},0 1 1 1 56,0  ` +
      `v${chartHeight- yScale(d.calories)+20} ` +
      `z`)
      .attr("fill", "transparent")
      .attr("height", d => chartHeight - yScale(d.kilogram))
      .attr("transform", `translate(0, ${-chartHeight*0.05})`)
      .style("position", "relative")
      .style("z-index", 9)
      .on("mouseover", (event, d) => {
          div.transition()        
              .duration(200)      
              .style("opacity", .9);
            div.html("<p>"+d.kilogram + "kg</p><p>" + d.calories + "Kcal</p>")
              .style("left", (event.pageX + 25) + "px")     
              .style("top", (event.pageY - 50) + "px");
      })
      .on("mouseout", (event, d) => {
          div.transition()
              .duration(500)
              .style("opacity", 0);
    });
    
    // Add the kilogram bars
    svg.selectAll(".bar.kilogram")
      .data(data)
      .enter().append("path")
      .attr("class", "kilogram")
      .attr("x", d => xScale('kilogram'))
      .attr("y", d => yScale(d.kilogram))
      .attr("d", d => topRoundedColumn(xScale(d.day.substring(9)), chartHeight, chartHeight - yScale(d.kilogram), 7))
      .attr("fill", "#282D30")
      .attr("height", d => chartHeight - yScale(d.kilogram))
      .attr("transform", `scale(0)`)
      .attr("transform-origin", `left ${chartHeight*0.95}px`)
      .transition("scale").duration(1000)
      .attr("transform", `translate(0, ${-chartHeight*0.05}) scale(1)`)
      .style("position", "relative")
      .style("z-index", 1);

    // Add the calories bars
    svg.selectAll(".bar.calories")
      .data(data)
      .enter().append("path")
      .attr("class", "calories")
      .attr("x", d => xScale('calories'))
      .attr("y", d => yScale(d.calories))
      .attr("d", d => topRoundedColumn(xScale(d.day.substring(9)), chartHeight, chartHeight - yScale(d.calories), 7))
      .attr("fill", "#E60000")
      .attr("height", d => chartHeight - yScale(d.calories))
      .attr("transform", `scale(0)`)
      .attr("transform-origin", `left ${chartHeight*0.95}px`)
      .transition("scale").duration(1000)
      .attr("transform", `translate(${(margin.left/3)}, ${-chartHeight*0.05}) scale(1)`)
      .style("position", "relative")
      .style("z-index", 1);

    // add title   
    var title = svg.append("g")
    .attr("id", "daily-activity-graphic-title")
    .attr("x", 65)
    .attr("y", 25)
    .attr("height", 100)
    .attr("width", 150)
    .style("transform", `translateY(-${chartHeight*0.025}px)`);
    title.append("text")
    .text("Activité quotidienne");

    // add legend   
    var legend = svg.append("g")
    .attr("class", "legend")
    .attr("x", width - 65)
    .attr("y", 25)
    .attr("height", 100)
    .attr("width", 100)
    .style("transform", `translate(-${width*0.15}px, -${chartHeight*0.05}px)`)
    .style("font-size", width>600 ? "small" : "x-small");
    legend.selectAll('g').data(["Poids (kg)", "Calories brûlées (kCal)"])
      .enter()
      .append('g')
      .each(function(d, i){
        var g = d3.select(this);
        g.append("circle")
          .attr("cx", ((width * 0.65)+(125*i)))
          .attr("cy", 0)
          .attr("r", 4)
          .style("fill", i === 0 ? "#282D30" : "#E60000");
        g.append("text")
          .attr("x", ((width * 0.65)+10+(125*i)))
          .attr("y", 4)
          .attr("height",30)
          .attr("width",100)
          .style("fill", "rgb(116, 121, 140)")
          .text(d);

      });
};
 
export default dailyActivity;