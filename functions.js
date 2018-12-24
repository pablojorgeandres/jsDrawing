

document.addEventListener("mousemove", startTrace);

var canvasObj = document.getElementById('area_de_dibujo');
var canvas = canvasObj.getContext("2d");
console.log(canvas);
var canvasOffSetX = canvasObj.offsetLeft;
var canvasOffSetY = canvasObj.offsetTop;
var color = 'black';
var x,y;
var thickness = 1;
var opacity = 1;

function startTrace() {
    var mouseDown = false;
    var startPoint = getCoords(event);
    document.addEventListener(
            'mousedown', 
            function() { mouseDown = true;
                if(startPoint.x > 0 && startPoint.x < 500 && startPoint.y > 0 && startPoint.y < 500){
                    x = startPoint.x; 
                    y = startPoint.y;    
                }
             })
    document.addEventListener('mouseup', function() { mouseDown = false })
    document.addEventListener('mousemove', function() {
        if (!mouseDown) {
            return;
        } else if( x > 0 && x < 500 && y > 0 && y < 500) {
            canvas.strokeStyle = color;
            canvas.lineWidth = thickness;
            canvas.globalAlpha = opacity;
            canvas.beginPath();
            canvas.moveTo( x , y );
            var endPoint = getCoords(event);        
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