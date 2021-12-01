import PropTypes from "prop-types"

/**
 * adapts the dimensions of the graphic to those of the window
 */
const chartDimensions = {
    
    windowWidth: parseInt(window.innerWidth),

    /**
     * calculate chart dimensions
     * @param {number} multiplierOfWidth - multiplying coefficient indicating 
     * the desired width of the graph in relation to the width of the window
     * @param {number | string[]} [height = width] - the height in number to 
     * apply in pixels or the keyword "width" to obtain a height equal to the width
     * @param {number} [marginTop] - the multiplier to apply to the width of the chart to obtain the margin top
     * @param {number} [marginRight] - the multiplier to apply to the width of the chart to obtain the margin right
     * @param {number} [marginBottom] - the multiplier to apply to the width of the chart to obtain the margin bottom
     * @param {number} [marginLeft] - the multiplier to apply to the width of the chart to obtain the margin left
     * @returns {object} dimensions - object storing the dimensions and margins of the chart, in its attributes : width, height and margin (object)
     * @returns {number} dimensions.width - chart width 
     * @returns {number} dimensions.height - chart height
     * @returns {object} dimensions.margin - object storing the margins of the chart, in its attributes : top, right, bottom and left
     */
    calculate : function (
        multiplierOfWidth, 
        height, 
        marginTop = 0, 
        marginRight = 0, 
        marginBottom = 0,
        marginLeft = 0
    ) {
        let width = parseInt(this.windowWidth * multiplierOfWidth)
        if(height === "width"){ height = width 
        } else if(height < 3){ height = width * height } 
        return {
            width: width-(marginTop+marginBottom), 
            height: height-(marginTop+marginBottom), 
            margin: { 
                top: height*marginTop, 
                right: width*marginRight, 
                bottom: height*marginBottom, 
                left: width*marginLeft 
            }
        }
    }

}

chartDimensions.calculate.PropTypes = {
    multiplierOfWidth: PropTypes.number.isRequired,
    height: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]).isRequired,
    marginTop: PropTypes.number,
    marginRight: PropTypes.number,
    marginBottom: PropTypes.number,
    marginLeft: PropTypes.number
}

chartDimensions.calculate.defaultProps = {
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0
}

export default chartDimensions