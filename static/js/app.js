// Import JSON data from samples.json
d3.json("../../data/samples.json").then(function(samples){
    var data = samples
    console.log(data);

    //Create the drop down options
    //select where the dropdown menu is
    var dropDown = d3.select("#selDataset");

    // Grab list of subject ID No. for dropdown menu
    var nameID = data[0].names;
    console.log(nameID);

    // Loop through list of names in import and append to dropdown menu
    nameID.forEach((item) => {
        // Append dropdown menu
        dropDown.append("option").text(item)
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
    otuID.forEach(item => {
        var otuString = otuTop.push(`OTU ${item}`);
    })

    var otuLabel = selectData[0].otu_labels.slice(0,10);

    // Data for Horizontal Bar Chart
    var data = [{
        x: sampleValue,
        y: otuTop,
        mode: 'markers',
        text: otuLabel,
        type: 'bar',
        orientation: 'h'
    }];

    var layout = {
        xaxis: {title: 'Sample Values'},
        yaxis: {title: 'OTU ID', autorange: 'reversed'}
    };

    Plotly.newPlot('bar', data, layout);


    // BUBBLE CHART
    // Get Sample Values
    var sampleValue = selectData[0].sample_values;

    // Get OTUs
    var otuID = selectData[0].otu_ids;

    // Get OTU Labels
    var otuLabel = selectData[0].otu_labels;

    // Data for Bubble Chart
    var data = [{
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
      
    var layout = {
        showlegend: false,
        height: 600,
        width: 1200,
        xaxis:{title:'OTU ID'}
    };

    Plotly.newPlot('bubble', data, layout);
    

    // META DATA //
    // Metadata for selected ID #
    var metaSelect = data[0].metadata.filter(item => item.id === "940");

    // Div for demographic info box
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
        metaBox.append('p').text(`${key}: ${metaSelect[0][key]}`);
    });


    // GAUGE CHART //
    // Get wash frequency data from metadata 
    var washFreq = selectData[0].wfreq;
    console.log (wash_freq);
    // Data for gauge chart
    var data = [
        {
          domain: { x: [0, 1], y: [0, 1] },
          value: washFreq,
          title: { text: "Belly Button Washing Frequency (Scrubs per Week)" },
          type: "indicator",
          mode: "gauge+number",
          gauge: {
            axis: { range: [null, 9] },
            steps: [
              {range: [0, 1], color: "rgba(255, 255, 207, 1)"},
              {range: [1,2], color: "rgba(255, 236, 207, 1)"},
              {range: [2,3], color: "rgba(255, 209, 207, 1)"},
              {range: [3,4], color: "rgba(255, 209, 134, 1)"},
              {range: [4,5], color: "rgba(255, 172, 134, 1)"},
              {range: [5,6], color: "rgba(255, 137, 134, 1)"},
              {range: [6,7], color: "rgba(255, 95, 81, 1)"},
              {range: [7,8], color: "rgba(255, 51, 57, 1)"},
              {range: [8,9], color: "rgba(171, 51, 0, 1)"}
            ],
         }
        }
      ];

      var layout = { 
          width: 600, 
          height: 450, 
          margin: { t: 0, b: 0 } 
        };

      Plotly.newPlot('gauge', data, layout);


// DROPDOWN MENU CHANGE // 












});