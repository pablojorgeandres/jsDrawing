document.addEventListener("mousemove", startTrace);
//document.addEventListener("touchstart", startTrace);

var canvasObj, canvas, canvasOffSetX, canvasOffSetY, startPoint, width, height, x, y;
setCanvasSize();
canvasValues();
getCanvasOffSet();
var color = 'black';
var thickness = 1;
var opacity = 1;

function startTrace() {
    var mouseDown = false;
    startPoint = getCoords(event);
    document.addEventListener(
            'mousedown', 
            function() { mouseDown = true;
                if(startPoint.x > 0 && startPoint.x < width && startPoint.y > 0 && startPoint.y < height){
                    x = startPoint.x;
                    y = startPoint.y;    
                }
             })
    document.addEventListener('mouseup', function() { mouseDown = false })
    document.addEventListener('mousemove', function() {
        if (!mouseDown) {
            return;
        } else if( x > 0 && x < width && y > 0 && y < height) {
            canvas.strokeStyle = color;
            canvas.lineWidth = thickness;
            canvas.globalAlpha = opacity;
            canvas.beginPath();
            canvas.moveTo( x , y );
            var endPoint = getCoords(event);
            //console.log(event.pageX);      
            canvas.lineTo(endPoint.x, endPoint.y);
            canvas.stroke();
            x = endPoint.x;
            y = endPoint.y;
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

function getThikness(n) {
    color = document.getElementById("color").value;
    opacity = document.getElementById("opacity").value;
    thickness = n;
}

function eraser() {
    thickness = 20;
    opacity = 1;
    color = 'white';
}

function getColor() {
    color = document.getElementById("color").value;
}

function clearAll() {
    canvas.clearRect(0, 0, canvasObj.width, canvasObj.height);
}

function getOpacity() {
    opacity = document.getElementById("opacity").value;
}

function setCanvasSize() {
    var innerWidth = window.innerWidth;
    width = (innerWidth * 15)/100;
    width = (innerWidth - width);
    width = parseInt(width);
    document.getElementById("area_de_dibujo").setAttribute("width", width);

    if(innerWidth < 700) {
        height = (window.innerHeight * 30)/100;
        height = window.innerHeight - height;
        height = parseInt(height);
    } else {
        height = (window.innerHeight * 15)/100;
        height = window.innerHeight - height;
        height = parseInt(height);
    }
    document.getElementById("area_de_dibujo").setAttribute("height", height);
}

function getCanvasOffSet() {
    canvasOffSetX = canvasObj.offsetLeft;
    canvasOffSetY = canvasObj.offsetTop;
}

function canvasValues() {
    canvasObj = document.getElementById('area_de_dibujo');
    canvas = canvasObj.getContext("2d");
}