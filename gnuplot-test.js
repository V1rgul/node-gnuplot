
var gnuplot = require('./gnuplot');

var interval = 500, resolution = 4;
var step = 0;

var dataA = [], dataB = [];

plot = gnuplot();

function next(){
	var pos = step/resolution;

	if(step > 100){
		dataA.shift();
		dataB.shift();
	}

	dataA.push( [pos, Math.cos(pos)] );
	dataB.push( [pos, Math.cos(pos/2)] );

	if(step > 0){ //don't draw first step because xrange=[0:0] messes with autoscale
		plot.plot([{
			data:dataA
		},{
			title:"B",
			style:"boxes",
			data:dataB
		}]);
	}

	step++;
}


setInterval(next, interval);
