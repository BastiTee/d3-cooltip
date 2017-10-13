# d3-cooltip

> An easy-to-use reusable tooltip plugin for d3v4

![alt text](img/cooltip.gif)

## Usage

First write a selector callback to define what the cooltip should display from your data. You can use `\n`-style linebreaks.

```javascript
var cooltipText = function(d) {
    return "This rectangle is\ncolored " + d["value"]
}
```

Then create a new cooltip instance and configure it programmatically.

```javascript
var cooltip = d3.cooltip()
    .opacity(0.7)
    .padding(10) 
    .color("lightgrey")
    .fill("black")
    .roundCorners(10)
    .lineHeight(25)
    .selector(cooltipText)
```

Check out the [documented source file](src/index.js) to learn about possible options. 
You can style cooltips via CSS as well.

```css
<style>
    @import url('https://fonts.googleapis.com/css?family=Saira+Extra+Condensed');
    .cooltip-box {
        /* The box around the cooltip text */
        stroke: orange;
        stroke-width: 2;
    }
    .cooltip-text {
        /* The cooltip text */
        font-family: 'Saira Extra Condensed', sans-serif;
        font-size: 150%;
    }
</style>
```

Finally invoke a function call for any element you want to provide with your cooltip.

```javascript
svg.selectAll(".rectangles").call(cooltip)
```

## License

Code is licensed under [Apache License Version 2.0](LICENSE).
