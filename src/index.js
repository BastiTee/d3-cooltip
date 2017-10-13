import * as d3 from "d3" // You could refine this to certain modules only

// Your plugin's closure
export default function() {
    "use strict";

    var opacity = 0.8
    var padding = 5
    var color = "white"
    var fill = "black"
    var lineHeight = 20
    var roundCorners = 5
    var selector = function() {
        return new Date().toDateString() + "\n" +
            String(Math.floor(Math.random() * 9e8))
    }

    function cooltip(selection) {

        selection.each(function() {
            var s = d3.select(this)
            var root = this.ownerSVGElement
            var dim = root.getBBox()
            var active = false
            var gTooltip
            var rect
            var text

            var mousemove = function() {
                var pos = d3.mouse(root)
                var txtBox = rect.node().getBBox()
                var newx = pos[0]
                var newy = pos[1] - txtBox.height
                // STOP ON BORDERS
                // left side 
                newx = newx - (txtBox.width / 2) < 0 ?
                    txtBox.width / 2 : newx
                // right side
                newx = newx + (txtBox.width / 2) > dim.width ?
                    dim.width - (txtBox.width / 2) : newx
                // top side
                newy = newy - padding < 0 ? padding : newy
                // bottom side 
                newy = newy + txtBox.height - padding > dim.height ?
                    dim.height - txtBox.height + padding : newy
                // move 
                gTooltip.attr("transform", "translate(" +
                    newx + "," + newy + ")")
            }

            var mouseout = function() {
                if (!active) {
                    return
                }
                active = false
                gTooltip.remove()
            }

            var mouseover = function(d) {
                if (active) {
                    return
                }
                active = true
                gTooltip = d3.select(root).append("g")
                    .style("pointer-events", "none")
                rect = gTooltip.append("rect")
                text = gTooltip.append("text")
                    .attr("class", "cooltip-text")
                // append tooltip text
                var string = "" + selector(d)
                var split = string.split("\n")
                for (var i in split) {
                    text.append("tspan")
                        .style("text-anchor", "middle")
                        .style("dominant-baseline", "hanging")
                        .style("fill", color)
                        .attr("x", 0)
                        .attr("dy", function() {
                            return i == 0 ? 0 : lineHeight
                        })
                        .text(split[i])
                }
                // append background rectangle depending on text size
                var txtBox = text.node().getBBox()
                rect
                    .attr("class", "cooltip-box")
                    .attr("rx", roundCorners).attr("ry", roundCorners)
                    .attr("width", txtBox.width + padding * 2)
                    .attr("height", txtBox.height + padding * 2)
                    .attr("x", -(txtBox.width / 2) - padding)
                    .attr("y", -padding)
                    .attr("opacity", opacity)
                    .style("fill", fill)
            }

            s.on("mouseover", mouseover)
            s.on("mouseout", mouseout)
            s.on("mousemove", mousemove)

        })
    }

    cooltip.opacity = function(value) {
        if (!arguments.length) return opacity
        opacity = value;
        return cooltip;
    }

    cooltip.padding = function(value) {
        if (!arguments.length) return padding
        padding = value;
        return cooltip;
    }

    cooltip.color = function(value) {
        if (!arguments.length) return color
        color = value;
        return cooltip;
    }

    cooltip.fill = function(value) {
        if (!arguments.length) return fill
        fill = value;
        return cooltip;
    }

    cooltip.lineHeight = function(value) {
        if (!arguments.length) return lineHeight
        lineHeight = value;
        return cooltip;
    }

    cooltip.roundCorners = function(value) {
        if (!arguments.length) return roundCorners
        roundCorners = value;
        return cooltip;
    }

    cooltip.selector = function(value) {
        if (!arguments.length) return selector
        selector = value;
        return cooltip;
    }

    return cooltip
}