// Import JSON data from samples.json
d3.json("../../data/samples.json").then(function(samples){
    var data = samples;
    console.log(data);

    //Create the drop down options
    //select Div id where the dropdown menu is
    var dropDown = d3.select("#selDataset");

    // Grab list of subject ID No. for dropdown menu
    var nameID = data[0].names;
    console.log(nameID);

    // Loop through list of names in import and append to dropdown menu
    nameID.forEach((item) => 
    {
        // Append dropdown menu
        dropDown.append("option").text(item);
    });

    // GRAPHS - ID# 904 //

    // Value of selected dropdown option
    var selectID = dropDown.property("value");

    // Data for first ID # 904
    var selectData = data[0].samples.filter(item => item.id === "940");

    // Graphs - Top 10 OTUs for selected ID # 

    // HORIZONTAL BAR CHART //
    // Top 10 sample values for for ID# 904
    var sampleValue = selectData[0].sample_values.slice(0,10);

    // Top 10 OTUs for ID# 904
    var otuID = selectData[0].otu_ids.slice(0,10);

    // New array for otuID string
    var otuTop = [];

    // Loop through otuIDs and get strings versions
    otuID.forEach(item => 
    {
        var otuString = otuTop.push(`OTU ${item}`);
    });

    var otuLabel = selectData[0].otu_labels.slice(0,10);

    // Data for Horizontal Bar Chart
    var dataBar = [{
        x: sampleValue,
        y: otuTop,
        mode: 'markers',
        text: otuLabel,
        type: 'bar',
        orientation: 'h'
    }];

    var layoutBar = {
        xaxis: {title: 'Sample Values'},
        yaxis: {title: 'OTU ID', autorange: 'reversed'}
    };

    Plotly.newPlot('bar', dataBar, layoutBar);


    // BUBBLE CHART
    // Get Sample Values
    var sampleValue = selectData[0].sample_values;

    // Get OTUs
    var otuID = selectData[0].otu_ids;

    // Get OTU Labels
    var otuLabel = selectData[0].otu_labels;

    // Data for Bubble Chart
    var dataBub = [{
        x: otuID,
        y: sampleValue,
        mode: 'markers',
        marker: {
            size: sampleValue,
            color: otuID,
            colorscale: [[0, 'rgb(211, 55, 170)'], [1, 'rgba(21, 152, 212, 1)']]
        },
        text: otuLabel
    }];
      
    var layoutBub = {
        showlegend: false,
        height: 600,
        width: 1200,
        xaxis:{title:'OTU ID'}
    };

    Plotly.newPlot('bubble', dataBub, layoutBub);
    

    // META DATA //
    // Metadata for selected ID #
    var metaSelect = data[0].metadata.filter(item => item.id === 940);

    // Div id for demographic info box
    var metaBox = d3.select('#sample-metadata');

    // // Append paragraph tags for the demographic box
    // metaBox.append('p').text(`id: ${starterMeta[0].id}`);
    // MetaBox.append('p').text(`ethnicity: ${starterMeta[0].ethnicity}`);
    // metaBox.append('p').text(`gender: ${starterMeta[0].gender}`);
    // metaBox.append('p').text(`age: ${starterMeta[0].age}`);
    // metaBox.append('p').text(`location: ${starterMeta[0].location}`);
    // metaBox.append('p').text(`bbtype: ${starterMeta[0].bbtype}`);
    // metaBox.append('p').text(`wfreq: ${starterMeta[0].wfreq}`);

    // Keys for Metadata
    const keys = Object.keys(metaSelect[0]);

    // Append paragraph tags for the demographics box via loop
    keys.forEach((key,index) => {
        metaBox.append("p").text(`${key}: ${metaSelect[0][key]}`);
    });


    // GAUGE CHART //
    // Get wash frequency data from metadata 
    var washFreq = metaSelect[0].wfreq;
    // console.log(washFreq);
    // Data for gauge chart
    var dataGauge = [{
        domain: { x: [0, 1], y: [0, 1] },
        value: washFreq,
        title: { text: "Belly Button Washing Frequency (Scrubs per Week)" },
        type: "indicator",
        mode: "gauge+number",
        gauge: {
            bar: {thickness: 0.4, color: "#ff006e"},
            axis: { range: [null, 9] },
            steps: [
                {range: [0, 1], color: "#caf0f8"},
                {range: [1,2], color: "#ade8f4"},
                {range: [2,3], color: "#90e0ef"},
                {range: [3,4], color: "#48cae4"},
                {range: [4,5], color: "#00b4d8"},
                {range: [5,6], color: "#0096c7"},
                {range: [6,7], color: "#0077b6"},
                {range: [7,8], color: "#023e8a"},
                {range: [8,9], color: "#03045e"}
            ]
            
        }
    }];

    var layoutGauge = {
        width: 600, 
        height: 450, 
        margin: { t: 0, b: 0 } 
    };

    Plotly.newPlot('gauge', dataGauge, layoutGauge);


    // DROPDOWN MENU CHANGE // 
    //capture change in the dropdown menu 
    dropDown.on("change", function(){
        var selectID = dropDown.property("value");
        var selectData = data[0].samples.filter(item => item.id === selectID);
        console.log(selectData);

        var otuTop = [];
        var sampleValue = selectData[0].sample_values.slice(0,10);
        var otuID = selectData[0].otu_ids.slice(0,10);
        
        otuID.forEach(item => {
            otuTop.push(`OTU ${item}`);
        });

        var otuLabel = selectData[0].otu_labels.slice(0, 10);

        // Horizontal Bar Chart
        var dataBar = [{
            x: sampleValue,
            y: otuTop,
            mode: 'markers',
            text: otuLabel,
            type: 'bar',
            orientation: 'h'
        }];
    
        var layoutBar = {
            xaxis: {title: 'Sample Values'},
            yaxis: {title: 'OTU ID', autorange: 'reversed'}
        };

        // Make chart responsive
        var configBar = {responsive:true};
    
        Plotly.newPlot('bar', dataBar, layoutBar, configBar);


        // Bubble Chart
        var sampleValue = selectData[0].sample_values;
        var otuID = selectData[0].otu_ids;
        var otuLabel = selectData[0].otu_labels;

        var dataBub = [{
            x: otuID,
            y: sampleValue,
            mode: 'markers',
            marker: {
                size: sampleValue,
                color: otuID,
                colorscale: [[0, 'rgb(211, 55, 170)'], [1, 'rgba(21, 152, 212, 1)']]
            },
            text: otuLabel
        }];
      
        var layoutBub = {
            showlegend: false,
            height: 600,
            width: 1200,
            xaxis:{title:'OTU ID'}
        };

        Plotly.newPlot('bubble', dataBub, layoutBub);


        // Meta Data (Demographic Info Box)
        
        var metaSelect = data[0].metadata.filter(item => item.id === parseInt(selectID));
        console.log(metaSelect);
        var metaBox = d3.select('#sample-metadata');
        // Clear text
        metaBox.text("");
        const keys = Object.keys(metaSelect[0]);
        keys.forEach((key,index) => {
            metaBox.append('p').text(`${key}: ${metaSelect[0][key]}`);
        });

            // GAUGE CHART //
        var washFreq = metaSelect[0].wfreq;
        // console.log(washFreq);

        var dataGauge = [{
            domain: { x: [0, 1], y: [0, 1] },
            value: washFreq,
            title: { text: "Belly Button Washing Frequency (Scrubs per Week)" },
            type: "indicator",
            mode: "gauge+number",
            gauge: {
                bar: {thickness: 0.4, color: "#ff006e"},
                axis: { range: [null, 9] },
                steps: [
                    {range: [0, 1], color: "#caf0f8"},
                    {range: [1,2], color: "#ade8f4"},
                    {range: [2,3], color: "#90e0ef"},
                    {range: [3,4], color: "#48cae4"},
                    {range: [4,5], color: "#00b4d8"},
                    {range: [5,6], color: "#0096c7"},
                    {range: [6,7], color: "#0077b6"},
                    {range: [7,8], color: "#023e8a"},
                    {range: [8,9], color: "#03045e"}
                ],
            }
        }];

        var layoutGauge = {
            width: 600, 
            height: 450, 
            margin: { t: 0, b: 0 } 
        };

        Plotly.newPlot('gauge', dataGauge, layoutGauge);
    

    });
});