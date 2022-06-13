let graph = document.getElementById("graph")
let rField = document.getElementById("pointForm:r-field")
let allPoints = []


rField.addEventListener("click",
    function drawGraph() {
        let r = rField.value

        removeOldGraph()

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
        reDrawPoints()
    })

function removeOldGraph() {
    while (graph.firstChild) {
        graph.removeChild(graph.firstChild)
    }
}

graph.addEventListener("click", function (e) {
    //нарисовать точку
    let top = graph.getBoundingClientRect().top + window.pageYOffset;
    let left = graph.getBoundingClientRect().left + window.pageXOffset;
    let width = 400
    let dimensionReductionCoef = 4

    let x = (e.pageX - left - width) / width * dimensionReductionCoef
    let y = (width - e.pageY + top) / width * dimensionReductionCoef
    let r = rField.value

    let circle = document.createElementNS("http://www.w3.org/2000/svg", 'circle')
    circle.setAttributeNS(null, 'cx', (e.pageX - left).toString());
    circle.setAttributeNS(null, 'cy', (e.pageY - top).toString());
    circle.setAttributeNS(null, 'r', '2');
    circle.setAttributeNS(null, 'stroke', setColor(x, y, r));
    circle.setAttributeNS(null, 'stroke-width', '5');
    circle.setAttributeNS(null, 'fill-opacity', '0');

    let pointWithRadius = {
        circle: circle,
        x: x,
        y: y
    };
    allPoints.push(pointWithRadius)

    graph.append(circle)

    document.getElementById("hidden-form:graph-x").value = x;
    document.getElementById("hidden-form:graph-y").value = y;
    document.getElementById("hidden-form:graph-r").value = r;

    document.getElementById("hidden-form:graph-send").click();

    setTimeout(setSound, 1000)

})

function setSound() {
    let table = document.getElementById("resTable").lastElementChild
    let tableBody = table.lastElementChild
    let res = tableBody.lastElementChild.querySelector(".result").textContent

    let audio = new Audio()
    audio.src = (res === "yes") ? "assets/yes.mp3" : "assets/no.mp3"
    audio.autoplay = true
}

//перерисовать все точки
function reDrawPoints() {
    // получить радиус и если точка
    allPoints.forEach(point => graph.append(changeColor(point)))
}

function changeColor(point) {
    let r = rField.value
    let x = point.x
    let y = point.y

    point.circle.setAttributeNS(null, 'stroke', setColor(x, y, r));
    return point.circle
}

function setColor(x, y, r) {
    return ((x <= 0 && y <= 0 && y >= -x - r) ||
        (x <= 0 && y >= 0 && x >= -r && y <= 0.5 * r) ||
        (x >= 0 && y >= 0 && x * x + y * y <= r * r)) ? "purple" : "white"
}




