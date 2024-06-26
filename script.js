// Path to the CSV file
const csvFilePath = "/mnt/data/mock_stock_data.csv";

// Load the CSV file
d3.csv(csvFilePath).then(data => {
    // Parse the data
    data.forEach(d => {
        d.date = new Date(d.date);
        d.value = +d.value;
    });

    // Set up the SVG dimensions
    const svgWidth = 960;
    const svgHeight = 500;
    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const width = svgWidth - margin.left - margin.right;
    const height = svgHeight - margin.top - margin.bottom;

    // Create an SVG container
    const svg = d3.select("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Set up the scales
    const xScale = d3.scaleTime().range([0, width]);
    const yScale = d3.scaleLinear().range([height, 0]);
// Set up the line generator
const line = d3.line()
.x(d => xScale(d.date))
.y(d => yScale(d.value));

// Set up the domains
xScale.domain(d3.extent(data, d => d.date));
yScale.domain([0, d3.max(data, d => d.value)]);

// Append the x-axis
svg.append("g")
.attr("transform", `translate(0,${height})`)
.call(d3.axisBottom(xScale));

// Append the y-axis
svg.append("g")
.call(d3.axisLeft(yScale));

// Append the line
svg.append("path")
.datum(data)
.attr("class", "line")
.attr("d", line);

// Add tooltip functionality
const focus = svg.append("g")
.attr("class", "focus")
.style("display", "none");

focus.append("circle")
.attr("r", 4.5);

focus.append("text")
.attr("x", 9)
.attr("dy", ".35em");

svg.append("rect")
.attr("class", "overlay")
.attr("width", width)
.attr("height", height)
.on("mouseover", () => focus.style("display", null))
.on("mouseout", () => focus.style("display", "none"))
.on("mousemove", mousemove);