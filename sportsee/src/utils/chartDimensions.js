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
        let width = parseInt(this.windowWidth * multiplierOfWidth)
        if(height === "width"){ height = width}
        return {
            width: width, 
            height: height-(marginTop+marginBottom), 
            margin: { top: marginTop, right: marginRight, bottom: marginBottom, left: marginLeft }
        }
    }

}

export default chartDimensions