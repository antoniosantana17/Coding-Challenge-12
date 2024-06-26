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
