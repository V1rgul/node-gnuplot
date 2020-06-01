node-gnuplot
============
javascript node.js wrapper for [gnuplot](http://www.gnuplot.info/)

## example
``` js
var gnuplot = require('gnu-plot')
gnuplot().plot([{
    data:[[0,0],[1,1],[2,0]]
}])
```


# methods

## gnuplot()
Spawn a new gnuplot process and return a plot object inheriting child_process.  
``` js
var plot = gnuplot()
```

## plot.plot(plotsSettings)
Plots with plotsSettings Array.  

### plotsSettings
Array of plot settings objects corresponding to different data series  
``` js
[{
	title:<title>,
	style:<style>,
	color:<color>,
	axes:<axes>,
	data:<data>,
},...]
```

#### title
*default: &lt;index of setting object in plotsSettings array&gt;*  
Title of the data serie  

#### style
*default: `"lines"`*  
Style of the data serie in :  
```
lines
points
linespoints
surface
dots
impulse
boxes
```
see `with` clause of the plot command in gnuplot documentation for more.  

#### color
*shorthand for `style:"linecolor rgbcolor <color>"`*  
Color of the data serie  
by name : execute `gnuplot -e "show colornames"` to view all possible values  
by value : `#RRGGBB`, `#AARRGGBB`  

#### axes
*default: `x1y1`*  
Axes used for the data serie.  
Choose from `["x1y1","x1y2","x2y1","x2y2"]`  
The axes are positionned :  
	- `x1`: bottom  
	- `x2`: top  
	- `y1`: left  
	- `y2`: right  

#### data
Data Array with structure  
``` js
[[x0,y0],[x1,y1],[x2,y2], ...]
```

### Example
``` js
plot.plot([{
	title:"A",
	color:"#00FF00",
	data:[
		[0  , 10],
		[0.5, 90],
		[1  , 85],
		[1.5, 20],
		[2  , 25]
	]
},{
	title:"B",
	color:"red",
	style:"linespoints",
	data:[
		[0.4,30],
		[1.1,70],
		[1.8,40]
	]
}])
```

## plot.splot(plotsSettings)
Same as `plot.plot(plotsSettings)` for 3D plots  



## plot.set(options)
Set or unset some gnuplot options.  

### options
Object containing options as key:values.  
See gnuplot documentation for a complete list of available options.  

Notable options:
#### Fixed axes
`{x|y|x2|y2}range:"[[<min>]:[<max>]]"`  
``` js
plot.set({xrange:"[0:]",yrange:"[-5:5]"})
```

#### Line at origin
`{x|y|x2|y2}zeroaxis: true`  
``` js
plot.set({yzeroaxis:true})
```

#### output to image
`term:"{png|jpeg} size <x>,<y>", output:"<file>"`  
``` js
plot.set({term:"png size 800,600", output:"plot.png"})
```

#### output to terminal
`term:"dumb [size <x> <y>]"`  
``` js
plot.stdout.pipe(process.stdout) //print gnuplot output to console
// plot 200 characters wide & 50 chararcters tall 
plot.set({term:"dumb 200 50"})
// or for a plot filling the terminal
plot.set({term:"dumb "+process.stdout.columns+" "+process.stdout.rows})
```


## plot.print(string)
Write string to stdin of the gnuplot process.  


