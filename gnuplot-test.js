
let gnuplot = require('./gnuplot')

const interval = 200, resolution = 4
let step = 0

let dataA = [], dataB = []

plot = gnuplot()

function next(){
	let pos = step/resolution

	if(step > 100){
		dataA.shift()
		dataB.shift()
	}

	dataA.push( [pos, Math.cos(pos  )] )
	dataB.push( [pos, Math.cos(pos/2)] )

	if(step > 0){ //don't draw first step because xrange=[0:0] messes with autoscale
		plot.plot([{
			data:dataA,
		},{
			title:"B",
			style:"boxes",
			data:dataB,
		}])
	}

	step++
}


setInterval(next, interval)
