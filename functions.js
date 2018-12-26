var onMobile = false;

if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
    onMobile = true;
    addCss('../css/mobile_style.css');
    window.onload =init;
    // openFullscreen();
} else {
    addCss('../css/style.css');
    window.onload = setCanvasSize;
}

var canvasObj, canvas2D, canvasOffSetX, canvasOffSetY, startPoint, width, height, x, y;
var color = 'black';
var thickness = 1;
var opacity = 1;

canvasValues();
document.addEventListener("mousemove", startTrace);

function startTrace() {
    var mouseDown = false;

    document.addEventListener(
            'mousedown', 
            function() { mouseDown = true;
                getCanvasOffSet();
                startPoint = getCoords(event);
                if(startPoint.x > 0 && startPoint.x < width && startPoint.y > 0 && startPoint.y < height){
                    x = startPoint.x;
                    y = startPoint.y;
                }
             })
    document.addEventListener('mouseup', function() { mouseDown = false; endTrace(); })
    document.addEventListener('mousemove', function() {
        if (!mouseDown) {
            return;
        } else if( x > 0 && x < width && y > 0 && y < height) {
            canvas2D.strokeStyle = color;
            canvas2D.lineWidth = thickness;
            canvas2D.globalAlpha = opacity;
            canvas2D.beginPath();
            canvas2D.moveTo( x , y );
            var endPoint = getCoords(event);
            canvas2D.lineTo(endPoint.x, endPoint.y);
            canvas2D.stroke();
            x = endPoint.x;
            y = endPoint.y;
        }
    }); 
}

function endTrace() {
    canvas2D.closePath();
}

function getCoords(event) {
    var mouseX = event.pageX;
    var mouseY = event.pageY;
    var canvasRealX = mouseX - canvasOffSetX;
    var canvasRealY = mouseY - canvasOffSetY;
    return { x:canvasRealX, y:canvasRealY };
}

function getThikness(n) {
    if (onMobile) {
        color = document.getElementById("colorSelect").value;
    } else {
        color = document.getElementById("color").value;
    }
    opacity = document.getElementById("opacity").value;
    thickness = n;
}

function eraser() {
    thickness = 30;
    opacity = 1;
    color = 'white';
}

function getColor(c) {
    color = document.getElementById(c).value;
}

function clearAll() {
    canvas2D.clearRect(0, 0, canvasObj.width, canvasObj.height);
}

function getOpacity() {
    opacity = document.getElementById("opacity").value;
}

function setCanvasSize() {
    if (onMobile) {
        width = window.innerWidth - 4;
        height = window.innerHeight - 4;
        document.getElementById("area_de_dibujo").setAttribute("width", width);
        document.getElementById("area_de_dibujo").setAttribute("height", height);
    } else {
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
}

function getCanvasOffSet() {
    canvasOffSetX = canvasObj.offsetLeft;
    canvasOffSetY = canvasObj.offsetTop;
}

function canvasValues() {
    canvasObj = document.getElementById('area_de_dibujo');
    canvas2D = canvasObj.getContext("2d");
}


//*** Add style Sheet ***//
function addCss(fileName) {

    var head = document.head;
    var link = document.createElement("link");
  
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = fileName;
  
    head.appendChild(link);
}


//***  TOUCH CODE  ***//
var lastPt = new Object();
var title = false;
var toolBar = false;

function init() {
  canvasObj = document.getElementById("area_de_dibujo");
  canvasObj.addEventListener("touchmove", draw, false);
  canvasObj.addEventListener("touchend", end, false);   
  canvas2D = canvasObj.getContext("2d");
}

function draw(e) {
  e.preventDefault();
  getCanvasOffSet();
  //Iterate over all touches
  for(var i=0;i<e.touches.length;i++) {
    var id = e.touches[i].identifier;   
    if(lastPt[id]) {
      canvas2D.beginPath();
      canvas2D.moveTo(lastPt[id].x - canvasOffSetX, lastPt[id].y - canvasOffSetY);
      canvas2D.lineTo(e.touches[i].pageX - canvasOffSetX, e.touches[i].pageY - canvasOffSetY);
      canvas2D.strokeStyle = color;
      canvas2D.lineWidth = thickness;
      canvas2D.globalAlpha = opacity;
      canvas2D.stroke();

    }
    // Store last point
    lastPt[id] = {x:e.touches[i].pageX, y:e.touches[i].pageY};
  }
}

function end(e) {
  e.preventDefault();
  for(var i=0;i<e.changedTouches.length;i++) {
    var id = e.changedTouches[i].identifier;
    // Terminate this touch
    delete lastPt[id];
  }
} 

function getOffset(obj) {
    var offsetLeft = 0;
    var offsetTop = 0;
    do {
      if (!isNaN(obj.offsetLeft)) {
        offsetLeft += obj.offsetLeft;
      }
      if (!isNaN(obj.offsetTop)) {
        offsetTop += obj.offsetTop;
      }   
    } while(obj = obj.offsetParent );
    return {left: offsetLeft, top: offsetTop};
  } 

  //*** Show and Hide Title and Tools for mobile ***//
  function showTitle(){
    var titleElem = document.getElementById('title');
    if(!title) {
        titleElem.classList.remove("title-show");
        titleElem.classList.add("title-hide");
        title = true;
    } else {
        titleElem.classList.add("title-remove");
        //titleElem.classList.remove("title-hide");
        title = false;
    }
  }


//*** Show and Hide Title and Tools for mobile ***//
function toggleClassMenu() {
    titleContainer.classList.add("menu--animatable");

    if(!titleContainer.classList.contains("title-show")) {		
        titleContainer.classList.add("title-show");
    } else {
        titleContainer.classList.remove('title-show');		
    }	
}
function toggleToolsMenu() {
    toolbarContainer.classList.add("menu--animatable");

    if(!toolbarContainer.classList.contains("toolbar-hide")) {		
        toolbarContainer.classList.add("toolbar-hide");
    } else {
        toolbarContainer.classList.remove('toolbar-hide');
    }	
}

function OnTransitionEnd() {
    titleContainer.classList.remove("menu--animatable");
}
function OnTransitionToolsEnd() {
    toolbarContainer.classList.remove("menu--animatable");
}

var titleContainer = document.querySelector(".canvas");
var title = document.querySelector("#title");

var toolbarContainer = document.querySelector(".tools-container");
var toolbar = document.querySelector(".tools-toogle");


titleContainer.addEventListener("transitionend", OnTransitionEnd, false);
title.addEventListener("click", toggleClassMenu, false);

toolbarContainer.addEventListener("transitionend", OnTransitionToolsEnd, false);
toolbar.addEventListener("click", toggleToolsMenu, false);
