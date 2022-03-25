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


# Breaking changes

**Note: gnuplot.exe >=v5.4 mangles stdin on my Windows machine**, I recommend staying on 5.2.8

## Version 0.3.0
-	`plotsSettings.color` renamed to `plotsSettings.rgbcolor`  
	Fix : `color:"#FF0000"` -> `rgbcolor:"#FF0000"`  
  
---

# Methods

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

	using:<using>,
	smooth:<smooth>,
	axes:<axes>,
	bin:<using>,

	style:<style>,
	color:<color>,
	rgbcolor:<rgbcolor>,

	data:<data>,
},...]
```

#### title
*default: &lt;index of setting object in plotsSettings array&gt;*  
Title of the data serie  

#### using
*default: undefined*  
Used to tell gnuplot which data columns (or pseudo-column to use). Please refer to gnuplot documentation.  
Can be used to handle datetime data or change missing data handling. 

#### smooth
*default: undefined*  
Used for interpolation and approximation of data. Please refer to gnuplot documentation.  

#### axes
*default: `x1y1`*  
Axes used for the data serie.  
Choose from `["x1y1","x1y2","x2y1","x2y2"]`  
The axes are positionned :  
	- `x1`: bottom  
	- `x2`: top  
	- `y1`: left  
	- `y2`: right  

#### bin
*default: undefined*  
Used to bin data. Please refer to gnuplot documentation.  
You should calculate them in JS instead of with gnuplot.   

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
*shorthand for `style:"linecolor <color>"`*  
Color setting of the data serie  
Used with 

#### rgbcolor
*shorthand for `style:"linecolor rgbcolor \"<color>\""`*  
Color of the data serie  
by name : execute `gnuplot -e "show colornames"` to view all possible values  
by value : `#RRGGBB`, `#AARRGGBB`  



#### data
Data Array with structure   
``` js
[[x0,y0],[x1,y1],[x2,y2], ...]
```
Or mathematical formula  
``` js
"2*x**2+3*x+4"
```

### Example
``` js
plot.plot([{
	title:"A",
	rgbcolor:"#00FF00",
	data:[
		[0  , 10],
		[0.5, 90],
		[1  , 85],
		[1.5, 20],
		[2  , 25]
	]
},{
	title:"B",
	rgbcolor:"red",
	style:"linespoints",
	data:[
		[0.4,30],
		[1.1,70],
		[1.8,40]
	],
},{
	title:"C",
	rgbcolor:"blue",
	data: "-2*x**2+3*x+4",
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
#### Axes label
`{x|y|x2|y2|z}label:<label>`  
``` js
plot.set({xlabel:"'s'",yrange:"'°C'"})
```

#### Fixed axes
`{x|y|x2|y2}range:"[[<min>]:[<max>]]"`  
``` js
plot.set({xrange:"[0:]",yrange:"[-5:5]"})
```
#### Line at origin
`{x|y|x2|y2|z}zeroaxis: true`  
``` js
plot.set({yzeroaxis:true})
```

#### Axes tics interval
`{x|mx|y|my|x2|mx2|y2|my2|z|mz}tics:<interval>`  
``` js
plot.set({
	xtics: 10,      // major xtic every 10
	mxtics: 2,      // 2 minor xtics per major xtic
	ytics: [
		10,         // major ytic every 10
		"add (42)", // add ytic at y=42
	],
	y2tics: true,   // show auto interval tics
})
```

#### Log scale
`logscale:"[x][x2][y][y2][z] <base>"`  
*default base : 10*
``` js
plot.set({
	logscale:[
		"x",     // logscale for x axis with default base 10
		"yy2 2", // logscale for y and y2 axes with base 2
	],
})
```

#### Grid
`grid: "[xtics] [mxtics] [ytics] [mytics] [ztics] [mztics] [<style>]"`  
``` js
plot.set({grid:"xtics ytics"})// default style
plot.set({grid:"xtics mxtics ytics mytics lines -1 dashtype 2, lines 0"}) // dashed for tics, dotted for minor tics
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
