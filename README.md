node-gnuplot
============
javascript node.js wrapper for [gnuplot](http://www.gnuplot.info/)

##example
``` js
var gnuplot = require('gnu-plot');
gnuplot().plot([{
    data:[[0,0],[1,1],[2,0]]
}]);
```


#methods

##gnuplot()
Spawn a new gnuplot process and return a plot object inheriting child_process.  
``` js
var plot = gnuplot();
```

##plot.plot(plotsSettings)
Plots with plotsSettings Array.  

###plotsSettings
Array of plot settings objects corresponding to different data series  
``` js
[{
    title:<title>,
    style:<style>,
    color:<color>,
    data:<data>
},...]
```

####title
*default: <index of setting object in plotsSettings array>*  
title of the data serie  

####style
*default: "lines"*  
style of the data serie in :  
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

####color
*shorthand for style:'linecolor rgbcolor "<color>"'*  
color of the data serie  
by name : execute `gnuplot -e "show colornames"` to view all possible values  
by value : `#RRGGBB`, `#AARRGGBB`  

####data
data Array with structure  
``` js
[[x0,y0],[x1,y1],[x2,y2], ...]
```

###Exemple
``` js
plot.plot([{
    title:"data3",
    style:"lines",
    color:"#00FF00",
    data:[[0,0],[1,1],[2,0]]
}]);
```

##plot.splot(plotsSettings)
same as `plot.plot(plotsSettings)` for 3D plots  



##plot.set(options)
set or unset some gnuplot options.  

###options
object containing options as key:values.  
See gnuplot documentation for a complete list of available options.  

Notable options:
####fixed axes
**`{xrange|yrange}:"[[<min>]:[<max>]]"`**  
``` js
plot.set(xrange:"[0:]",yrange:"[-5:5]");
```

####output to image
**`term:"{png|jpeg} size <x>,<y>", output:"<file>"`**  
``` js
plot.set({term:"png size 800,600", output:"plot.png"});
```

####output to terminal
**`term:"dumb [size <x> <y>]"`**  
``` js
plot.stdout.pipe(process.stdout); //print gnuplot output to console
plot.set({term:"dumb 200 50"});
// or for a plot filling the terminal
plot.set({term:"dumb "+process.stdout.columns+" "+process.stdout.rows}); 
```


##plot.print(string)
Write string to stdin of the gnuplot process.  


