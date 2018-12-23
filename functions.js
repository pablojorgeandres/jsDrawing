document.addEventListener("mousemove", detectWhereIsMouse);

var canvasObj = document.getElementById('area_de_dibujo');
var canvas = canvasObj.getContext("2d");
var canvasOffSetX = canvasObj.offsetLeft;
var canvasOffSetY = canvasObj.offsetTop;
var color = 'black';


function detectWhereIsMouse(event) {
    var point = getCoords(event);
    if (point.x > 0 && point.x < 501 && point.y > 0 && point.y < 501) {
        document.addEventListener("mousemove", startTrace);
        document.addEventListener("mousemove", startTrace);
        document.addEventListener("mousemove", startTrace);
        document.addEventListener("mousemove", startTrace);
    }
}

function startTrace() {
    var mouseDown = false;
    document.addEventListener('mousedown', function() { mouseDown = true })
    document.addEventListener('mouseup', function() { mouseDown = false })
    document.addEventListener('mousemove', function() { 
        if (!mouseDown) {
            canvas.closePath();
            return;
        } else {
            var startPoint = getCoords(event);        
            canvas.strokeStyle = color;
            canvas.lineWidth = 2;
            canvas.beginPath();
            canvas.moveTo(startPoint.x, startPoint.y);
            canvas.lineTo(startPoint.x - 2, startPoint.y);
            canvas.stroke();        
        }
    }); 
}

function endTrace() {
    canvas.closePath();
}

function getCoords(event) {
    var mouseX = event.pageX;
    var mouseY = event.pageY;
    var canvasRealX = mouseX - canvasOffSetX;
    var canvasRealY = mouseY - canvasOffSetY;
    return { x:canvasRealX, y:canvasRealY };
}