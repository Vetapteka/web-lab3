let graph = document.getElementById("graph")
let rField = document.getElementById("pointForm:r-field")

rField.addEventListener("click",
    function drawGraph() {
        removeOldGraph()

        let r = rField.value

        let axisX = document.createElementNS("http://www.w3.org/2000/svg", 'line')
        axisX.setAttributeNS(null, "x1", "0")
        axisX.setAttributeNS(null, "x2", "800")
        axisX.setAttributeNS(null, "y1", "400")
        axisX.setAttributeNS(null, "y2", "400")
        axisX.setAttributeNS(null, "style", "stroke:purple;stroke-width:3;stroke-linecap:round")

        let axisY = document.createElementNS("http://www.w3.org/2000/svg", 'line')
        axisY.setAttributeNS(null, "x1", "400")
        axisY.setAttributeNS(null, "x2", "400")
        axisY.setAttributeNS(null, "y1", "0")
        axisY.setAttributeNS(null, "y2", "800")
        axisY.setAttributeNS(null, "style", "stroke:purple;stroke-width:3;stroke-linecap:round")

        let rectangle = document.createElementNS("http://www.w3.org/2000/svg", 'polygon')
        //400, 400
        //400 - 100*r, 400
        //400 - 100*r, (400 - 100*r/2)
        //400, (400 - 100*r/2)
        let pointA = 400 - 100 * r
        let pointB = 400 - 100 * r / 2
        let rectanglePoints = "400, 400 " + pointA + ", 400 " + pointA + ", " + pointB + " 400, " + pointB
        rectangle.setAttributeNS(null, "points", rectanglePoints)
        rectangle.setAttributeNS(null, "style", "fill:plum;stroke:purple;stroke-width:1")

        let triangle = document.createElementNS("http://www.w3.org/2000/svg", 'polygon')
        let pointC = 400 + 100 * r
        let trianglePoints = "400, 400 " + pointA + ", 400 " + "400, " + pointC
        triangle.setAttributeNS(null, "points", trianglePoints)
        triangle.setAttributeNS(null, "style", "fill:yellowgreen;stroke:purple;stroke-width:1")

        let circle = document.createElementNS("http://www.w3.org/2000/svg", 'path')
        //M 400, 400  L 400, 400 - 100*r  A 100*r 100*r 0 0 1 400+100*r 400 Z
        let pointR = 100 * r
        let circlePoints = "M 400, 400 L 400, " + pointA + " A " + pointR + " " + pointR + " 0 0 1 " + pointC + " 400 Z"
        circle.setAttributeNS(null, 'd', circlePoints)
        circle.setAttributeNS(null, "style", "fill:yellow;stroke:purple;stroke-width:1")


        graph.append(rectangle)
        graph.append(triangle)
        graph.append(axisX)
        graph.append(axisY)
        graph.append(circle)
    })

function removeOldGraph() {
    while (graph.firstChild) {
        graph.removeChild(graph.firstChild)
    }
}


