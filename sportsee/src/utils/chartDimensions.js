import PropTypes from "prop-types"

/**
 * adapts the dimensions of the graphic to those of the window
 */
const chartDimensions = {
    windowWidth: parseInt(window.innerWidth),

    /**
     * 
     * @param {number} multiplierOfWidth - multiplying coefficient indicating 
     * the desired width of the graph in relation to the width of the window
     * @param {number | string[]} [height = width] - 
     * @param {*} marginTop 
     * @param {*} marginRight 
     * @param {*} marginBottom 
     * @param {*} marginLeft 
     * @returns 
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
        if(height === "width"){ height = width}
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