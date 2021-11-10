const chartDimensions = {
    windowWidth: parseInt(window.innerWidth),

    calculate : function (
        multiplierOfWidth, 
        height, 
        marginTop = 25, 
        marginRight = 25, 
        marginBottom = 50,
        marginLeft = 25
    ) {
        return {
            width: parseInt(this.windowWidth * multiplierOfWidth), 
            height: height-(marginTop+marginBottom), 
            margin: { top: marginTop, right: marginRight, bottom: marginBottom, left: marginLeft }
        }
    }

}

export default chartDimensions