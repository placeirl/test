const modhash = window.reddit.modhash;  //API call to prevent CSRF

var sec = 0;
var index = -1; 

if (sec < -10) {
	sec = 100;
}
setInterval(() => console.log("Beginning traversal again in: " + (sec--) + " secs, keep the faith brethren"), 1e3); //set pace


const draw = seconds => {
    index++
    sec = seconds = Math.ceil(seconds) //max value of seconds
    
    setTimeout(() => {
        const x = index % 19; 
        const y = Math.floor(index / 19); //60 wide
        const flagColor = [
	
[6,	6,	6,	5,	5,	5,	8,	8,	8,	8,	8,	8,	8,	8,	10,	10,	10,	10,	10,	10], //496
[6,	6,	6,	5,	5,	5,	8,	8,	8,	8,	8,	8,	8,	8,	10,	10,	10,	10,	10,	10	],
[8,	8,	5,	5,	8,	8,	8,	8,	5,	8,	5,	8,	8,	8,	8,	8,	10,	10,	10,	10	],
[8,	8,	5,	5,	8,	8,	8,	8,	5,	8,	5,	8,	8,	8,	8,	8,	10,	10,	10,	10	],
[8,	8,	5,	5,	8,	8,	8,	8,	5,	8,	5,	8,	8,	8,	8,	8,	10,	10,	10,	10	],
[8,	8,	5,	5,	8,	8,	8,	8,	5,	8,	5,	8,	8,	8,	8,	8,	10,	10,	10,	10	],
[8,	8,	5,	5,	8,	8,	8,	8,	5,	8,	5,	8,	8,	8,	8,	8,	10,	10,	10,	10	],
[8,	8,	5,	5,	8,	8,	8,	8,	5,	8,	5,	8,	8,	8,	8,	8,	10,	10,	10,	10	]//506
	][y][x];
        const ax = x + 441; //value of x
        const ay = y + 562; //value of y

        //get x and y co-ords
        $.get("https://www.reddit.com/api/place/pixel.json?x=" + ax + "&y=" + ay)
        .then(res => {
        	if (res.color == -1 || flagColor == -1){
        		console.log("SKIP:" + (ax + ", " + ay) + "<- not a pixel we deal with"); //skip
        		return draw(1); //set timer to 1
        	}
            if (res.color == flagColor) { //if match
                console.log("SKIP:" + (ax + ", " + ay) + "<- pride intact"); //skip
                return draw(1); //set timer to 1
            }
            console.log("CONGRATULATIONS BRETHREN: " + ax + ", " + ay + " (https://www.reddit.com/r/place/#x=" + ax + "&y=" + ay + ")");
            
            $.ajax({ url: "https://www.reddit.com/api/place/draw.json", type: "POST",
                headers: { "x-modhash": modhash }, data: { x: ax, y: ay, color: flagColor }
            })
            .done(data => draw(data.wait_seconds))
            .error(data => draw(data.responseJSON.wait_seconds));
        });
    }, seconds * 1000);

}
draw(0);
