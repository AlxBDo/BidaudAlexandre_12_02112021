import * as d3 from "d3";

/**
 * generate user score chart
 * @param {number} data - user score in float format 
 * @example data : 0.17
 * @param {number} height - chart height 
 * @param {object} svg - svg contains chart
 * @param {number} width - chart width
 * @param {string} backgroundColor - chart background color
 */
function score(data, height, svg, width, backgroundColor ){
    
    svg.attr("transform", "translate(" 
    + width *0.47 + "," 
    + height / 2  + ")")

// data preparation
let score = data * 100
const colors = [backgroundColor, "rgba(255, 0, 0, 1)"]
var dataset = {things: [(100-score), score],};

// d3 configuration
var radius = width < 200 ? width * 0.6 : width * 0.45;
var pie = d3.pie().sort(null);
var arc = d3.arc()
    .innerRadius(radius - 42)
    .outerRadius(radius - 50)
    .cornerRadius(50);

// add title
svg.append("text").text("Score").attr("transform", `translate(${-width*0.33}, ${-height*0.35})`)

// add path and draw chart arcs
svg.append("circle")
.attr("cx",0)
.attr("cy", 15)
.attr("r",radius-50)
.attr("fill", "white");
svg.selectAll("path")
    .data(pie(dataset.things))
    .enter().append("path")
    .attr("fill", function(d, i) { return colors[i]; })
    .attr("d", arc)
    .attr("transform", `translate(0, 15)`);
    
// add text
let text = svg.append("text").attr("text-anchor", "middle")
text.append("tspan")
.attr("x", 0)
.attr("y", -0.5)
.style("font-size", `${width/10}px`)
.style("font-weight", "bold")
.text(`${score}%`)
text.append("tspan")
.attr("x", 0)
.style("font-size", `${(width/10)*0.75}px`)
.attr("dy", "1.75em")
.attr("fill", "grey")
.text(`de votre`)
text.append("tspan")
.attr("x", 0)
.attr("dy", "1.25em")
.style("font-size", `${(width/10)*0.75}px`)
.attr("fill", "grey")
.text(`objectif`)

};
 
export default score;