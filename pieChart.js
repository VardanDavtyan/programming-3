function convertArrToRGB(colorArr) {
    let colorText = "rgb("
    for (let i = 0; i < colorArr.length; i++) {
        colorText += colorArr[i] + (i != colorArr.length - 1 ? "," : ")")
    }
    return colorText
}

function renderDiagram(data) {

    document.getElementById("my_dataviz").innerHTML = ""

    // set the dimensions and margins of the graph
    var width = 450
    height = 450
    margin = 40

    // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
    var radius = Math.min(width, height) / 2 - margin

    // append the svg object to the div called 'my_dataviz'
    var svg = d3.select("#my_dataviz")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");


    // set the color scale
    var color = d3.scaleOrdinal()
        .domain(data)
        .range([
            convertArrToRGB(cellColors.grass),
            convertArrToRGB(cellColors.grassEater),
            convertArrToRGB(cellColors.predator),
            convertArrToRGB(cellColors.mutant),
            convertArrToRGB(cellColors.switcher),
            convertArrToRGB(cellColors.bomber)
        ])

    // Compute the position of each group on the pie:
    var pie = d3.pie()
        .sort(null)
        .value(function(d) { return d.value; })
    var data_ready = pie(d3.entries(data))

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    svg
        .selectAll('whatever')
        .data(data_ready)
        .enter()
        .append('path')
        .attr('d', d3.arc()
            .innerRadius(0)
            .outerRadius(radius)
        )
        .attr('fill', function(d) { return (color(d.data.key)) })
        .attr("stroke", "black")
        .style("stroke-width", "2px")
        .style("opacity", 0.7)

        svg.append("text")
    	.attr("transform", function(d) {
        var _d = arc.centroid(d);
        _d[0] *= 1.5;	//multiply by a constant factor
        _d[1] *= 1.5;	//multiply by a constant factor
        return "translate(" + _d + ")";
      })
      .attr("dy", ".50em")
      .style("text-anchor", "middle")
      .text(d => "");
}

function renderData(data) {

    let statsPanel = document.getElementById("stats")
    statsPanel.innerHTML = ""

    for (let property in data) {

        let cellColorPanel = document.createElement("div")
        cellColorPanel.setAttribute("class", "cellColorPanel")
        cellColorPanel.style.backgroundColor = convertArrToRGB(cellColors[property])

        let textInfo = document.createElement("label")
        textInfo.setAttribute("class", "cellInfo")
        textInfo.innerHTML = `${property}: ${data[property]}<br>`

        let singleStatPanel = document.createElement("div")
        singleStatPanel.setAttribute("class", "singleStat")

        singleStatPanel.appendChild(cellColorPanel)
        singleStatPanel.appendChild(textInfo)

        statsPanel.appendChild(singleStatPanel)

    }

}


setInterval(() => {

    var data = getStatistics()

    renderDiagram(data)
    renderData(data)

}, maxFrameRate)