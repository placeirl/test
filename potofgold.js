var colors = [
6,	6,	6,	5,	5,	5,	8,	8,	8,	8,	8,	8,	8,	8,	10,	10,	10,	10,	10,	10,
8,	8,	5,	5,	8,	8,	8,	8,	5,	8,	5,	8,	8,	8,	8,	8,	10,	10,	10,	10,


];
var colorsABGR = [];

var flag = {
  x: 441,
  y: 562,
  width: 22,
  height: 2
};

var placed = 0;

// hooks
var client;
var canvasse;
var jQuery;

var test = 0;

r.placeModule("Flag", function(e){
  client = e("client");
  canvasse = e("canvasse");
  jQuery = e("jQuery");

  for(var i=0; i<client.palette.length; i++){
    colorsABGR[i] = client.getPaletteColorABGR(i);
  }

  // Start
  if(!test){
    attempt();
  } else {
    drawTestFlag();
  }
});

function attempt(){
  var toWait = client.getCooldownTimeRemaining();
  if(toWait === 0){
     for(var i=0; i<colors.length; i++){
        if(colors[i] === -1){
          continue;
        }
        var targetPoint = getPoint(i);
        var pixelColor = getPixel(targetPoint.x, targetPoint.y);
        if(pixelColor !== colorsABGR[colors[i]]){
            client.setColor(colors[i]);
            client.drawTile(targetPoint.x, targetPoint.y);
            console.log('Pixel Placed at: (' + targetPoint.x + ',' + targetPoint.y + ')');
            break;
        }
     }
  }
  setTimeout(attempt, toWait + Math.round(Math.random() * 1500));
}

function drawTestFlag(){
  for(var i=0; i<colors.length; i++){
    if(colors[i] === -1){
      continue;
    }
    var targetPoint = getPoint(i);
    canvasse.drawTileAt(targetPoint.x, targetPoint.y, colorsABGR[colors[i]]);
  }
}

function getPoint(i){
  var x = i % flag.width;
  return {
    x: flag.x + x,
    y: flag.y + (i - x) / flag.width - flag.height
  };
}


function getPixel(x, y){
  return canvasse.writeBuffer[canvasse.getIndexFromCoords(x, y)];
}