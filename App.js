function extractBedMeshData(inputString) {

    if(inputString == null) return; // NULL CHECK

    // Extract lines containing bed mesh data
    const dataLines = inputString.split('\n')
        .filter(line => line.includes('|'))
        .map(line => line.trim());

    // Extract and format the bed mesh values
    const bedMeshValues = dataLines.map(line => {
        // Extract the numeric values using regular expression
        const values = line.match(/[-+]?\d*\.?\d+/g);

        // Check if values exist and skip the first one
        if (values && values.length > 1) {
            // Join the values with space separator, starting from the second value
            return values.slice(1).join(' ');
        } else {
            return '';
        }
    });

    // Join the formatted values with newline separator
    const formattedBedMeshData = bedMeshValues.join('\n');

    //console.log(formattedBedMeshData);
    visualizeBedData(formattedBedMeshData);
}

function visualizeBedData(bedDataString) {
    meshGraph = document.getElementById('meshGraph');
    meshSize = document.getElementById('meshSize').value;

    const rows = bedDataString.trim().split('\n')
        .map(row => row.trim().split(/\s+/).map(Number))
        .filter(row => row.length === 10);

    console.log(rows);

    var data = [{
        z: rows,
        x: [1, 2, 3, 4, 5],
        y: [1, 2, 3, 4, 5],
        type: 'contour',
        colorscale: [

        ['0.0', 'rgb(128,128,128)'],  
        ['0.111111111111', 'rgb(133,133,133)'],
        ['0.222222222222', 'rgb(138,138,138)'],
        ['0.333333333333', 'rgb(143,143,143)'],
        ['0.444444444444', 'rgb(148,148,148)'],
        ['0.555555555556', 'rgb(153,153,153)'],
        ['0.666666666667', 'rgb(158,158,158)'],
        ['0.777777777778', 'rgb(163,163,163)'],
        ['0.888888888889', 'rgb(168,168,168)'],
        ['1.0', 'rgb(173,173,173)']
        
          ],
    }];

    var layout = {
        title: 'Result',
        autoSize: false,
        width: 600,
        height: 600,        
    };

    Plotly.newPlot('meshGraph', data, layout, {staticPlot: true});
}
