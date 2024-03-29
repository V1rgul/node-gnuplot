var log = console.log

var spawn = require('child_process').spawn

/** EXEMPLE:

var plot = gnuplot()

plot.plot([{
	data:[[x0,y0],[x1,y1],[x2,y2]]
},{
	title:"data2",
	style:"boxes",
	color:"red",
	data:[[x0,y0],[x1,y1],[x2,y2]]
},{
	title:"data3",
	style:"lines",
	color:"#00FF00",
	data:[[x0,y0],[x1,y1],[x2,y2]]
}])

*/

function convertArray(arr){
	//[[x0,y0],[x1,y1],[x2,y2], ...]
	return arr.map(function(p){
		return p.join(" ") + "\n"
	}).join("")
}

gnuPlot = function () {
	var plotObj = spawn('gnuplot')

	var errBuff = ""

	//tidy up stderr
	plotObj.stderr.on('data', function(e){
		errBuff += e
		if(errBuff.indexOf("\n")){
			var lines = errBuff.split("\n")
			errBuff = lines.pop()
			log( "[GNUPLOT ERR]" + lines.join("\n") )
		}
	})

	plotObj.print = function (d) {
		// log(d)
		plotObj.stdin.write(d)
		return plotObj
	}

	plotObj.set = function (options) {
		var str = Object.keys(options).map(function(key){
			var vals = options[key]
			if(vals){
				if(!Array.isArray(vals)){
					vals = [vals]
				}

				return vals.map(function(val){
					if(val === true)
						return "set " + key + "\n"
					else
						return "set " + key + " " + val + "\n"
				}).join("")

			} else {
				return "unset " + key + "\n"
			}
		}).join("")
		plotObj.print(str)
		return plotObj
	}

	function plotString (data) {
		var bodyArr = []

		var head = data.map(function(field, i){
			var r = []
			if(field.data.constructor === String){
				r.push(field.data)
			} else {
				r.push("'-'")
				bodyArr.push( convertArray(field.data) + "e\n" )
			}
			["using", "smooth", "axes", "bins"].forEach( (keyword) => {
				if(field[keyword]  !== undefined) r.push(keyword+" "+field[keyword])
			})

			if(field.title  !== undefined) r.push("title \""+field.title+"\"")
			else                           r.push("title \""+     i     +"\"")

			r.push("with")
			if(field.style)	r.push(field.style)
			else			r.push("lines")

			if     (field.color   )	r.push("linecolor "+field.color)
			else if(field.rgbcolor)	r.push("linecolor rgbcolor \""+field.rgbcolor+"\"")

			return r.join(" ")
		}).join(", ") + "\n"

		var body = bodyArr.join("")

		return head + body
	}

	plotObj.plot = function(d){
		plotObj.print("plot "+plotString(d))
		return plotObj
	}
	plotObj.splot = function(d){
		plotObj.print("splot "+plotString(d))
		return plotObj
	}

	plotObj.end = plotObj.stdin.end.bind(plotObj.stdin)


	return plotObj
}


module.exports = gnuPlot
