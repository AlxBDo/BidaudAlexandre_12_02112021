/**
 * draw rounded top edges at the bars of the graph
 * @param {object} x - d3 object 
 * @param {object} y - d3 object
 * @param {number} height - svg height 
 * @param {number} width - svg width 
 * @returns {string} coordinates of the drawn element
 */
export const topRoundedColumn = function(x, y, height, width) {
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