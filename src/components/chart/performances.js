import * as d3 from "d3";

/**
 * generate user's performances chart
 * @param {array} data - array of objects with day and sessionLength attributes
 * @param {number} height - chart height 
 * @param {object} svg - svg contains chart
 * @param {number} width - chart width
 * @param {object} [margin] - contains attributes : marginTop, marginRight, marginBottom, marginLeft
 */
function performances(data, height, svg, width, margin ){
    
    svg.attr("transform", `translate(${(width*0.9)/5},${height/4})`);
      
    // Radius of radar chart
    const r = width*0.29


    // data preparation
    let frenchDimensions = ["Cardio", "Energie", "Endurance", "Force", "Vitesse", "Intensité"]
    const dimensions = Object.values(data.kind).map((d, i) => frenchDimensions[i]).reverse()

    let values = data.data.reduce((a, k) => {
        a.push(k.value)
        return a
    }, []).sort((a, b) => {return b - a})

    const tricksValues = (maxValue) => { 
        let ticksArray = []
        for(let i = 0; i < 7 ; i++){ ticksArray.push(parseInt((maxValue/6) * i)) }
        return ticksArray
    }

    let performancesValues = data.data.reduce((a, k) => Object.assign(a, {[dimensions[(k.kind - 1)]]: k.value}), {})


    // Line generator for radial lines
    const radialLine = d3.lineRadial()

    // Mapping 0 - 255 to 0 - r
    const yScale = d3.scaleLinear()
        .range([0, r])
        .domain([0, values[0]])

    // customized tricks
    const ticks = tricksValues(values[0])

    // axis
    dimensions.forEach((dimension, i) => {
        const g = svg.append('g')
        .attr('transform', `translate(${r}, ${r}) rotate(${i * 60})`)
        .attr('stroke-width', 0)

        // Combining a left oriented axis with a right oriented axis
        // to make an axis with tick marks on both side
        g.append('g')
        .call(d3.axisLeft(yScale).tickFormat('').tickValues(ticks))
        g.append('g')
        .call(d3.axisRight(yScale).tickFormat('').tickValues(ticks))

        // Add a text label for each axis
        g.append('text')
        .text(dimension)
        .style("font-size", width < 250 ? "x-small" : "small")
        .style("font-weight", width < 250 ? 500 : 700)
        .attr("fill", "white")
        .attr("class", "categories")
        .attr('text-anchor', i === 0 || i === 3 ? 'middle' : i < 3 ? "start" : "end")
        .attr('transform', `translate(0, -${r + 10}) rotate(${i * -60}) ${width < 200 ? " scale(0.9)" : ""}`)
    })

    // Line for the base stats of Snorlax
    svg.append('g')
        .selectAll('path')
        .data([performancesValues])
        .enter()
        .append('path')
        .attr('d', radialLine([
            performancesValues["Intensité"],
            performancesValues["Vitesse"],
            performancesValues["Force"],
            performancesValues["Endurance"],
            performancesValues["Energie"],
            performancesValues["Cardio"]
            ].map((v, i) => [Math.PI * 2 * i / 6 /* radian */, yScale(v) /* distance from the origin */])) 
        )
        .attr('transform', `translate(${r}, ${r})`)
        .attr('fill', 'rgba(255, 1, 1, 0.7)');

    // Gird lines for references
    svg.append('g')
        .selectAll('path')
        .data(ticks)
        .enter()
        .append('path')
        .attr('d', d => radialLine(ticks.map((v, i) => [Math.PI * 2 * i / 6, yScale(d)])))
        .attr('transform', `translate(${r}, ${r})`)
        .attr('stroke', 'white')
        .attr('opacity', 0.5)
        .attr('fill', 'transparent')

};
 
export default performances;