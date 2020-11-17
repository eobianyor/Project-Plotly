// If using python server, visit here to see data: http://localhost:8000/data/data.json

// Declare variables
var sampleValuesSorted
var sampleValuesTop10
var otu_idsTop10
var otu_labelsTop10
var indvMetadata
var selectedID
var metadataArray
var nos

//     // -----------------------------------------------------------------------------------------------------------------------------------------------------

// // function metaDataSearchLoop() {
// d3.json("data/samples.json").then((bbDdata) => {
//     selectedID = 1260 // Need to remove this once I've got the listener working
//     Nos = 0
//     metadataArray = bbDdata.metadata
//     metadataArray.forEach(entry => {
//         if (selectedID == metadataArray[Nos].id) {
//             d3.select('#Demographic_id').text(`ID: ${(MetadataArray[nos].id)}`);
//             d3.select('#Demographic_ethnicity').text(`Ethnicity: ${MetadataArray[nos].ethnicity}`);
//             d3.select('#Demographic_gender').text(`Gender: ${MetadataArray[nos].gender}`);
//             d3.select('#Demographic_age').text(`Age: ${MetadataArray[nos].age}`);
//             d3.select('#Demographic_location').text(`Location: ${MetadataArray[nos].location}`);
//             d3.select('#Demographic_bbtype').text(`Bbtype: ${MetadataArray[nos].bbtype}`);
//             d3.select('#Demographic_wfreq').text(`Wfreq: ${MetadataArray[nos].wfreq}`);
//         };
//         nos = nos + 1;
//     });
// });
// // };

// //     // --------------------------------------------------------

// // function plotGraphsLoop() {
// d3.json("data/samples.json").then((bbDdata) => {
//     var sampleValuesAll
//     var otu_idsAll
//     var otu_labelsAll
//     var samplesArray

//     selectedID = 1260 // Need to remove this once I've got the listener working
//     nos = 0
//     samplesArray = bbDdata.samples;
//     samplesArray.forEach(entry => {
//         if (selectedID == samplesArray[nos].id) {
//             sampleValuesAll = samplesArray[nos].sample_values;
//             otu_idsAll = samplesArray[nos].otu_ids;
//             otu_labelsAll = samplesArray[nos].otu_labels;
//         };
//         nos = nos + 1;
//     });

//     var sampleValuesAll
//     var otu_idsAll
//     var otu_labelsAll
//     var sampleValuesTop10
//     var otu_idsTop10
//     var otu_labelsTop10

//     // Slice the first 10 objects for plotting
//     sampleValuesTop10 = sampleValuesAll.slice(0, 10);
//     otu_idsTop10 = otu_idsAll.slice(0, 10);
//     otu_labelsTop10 = otu_labelsAll.slice(0, 10);

//     // build bar plot
//     var trace1 = {
//         x: sampleValuesTop10,
//         y: otu_idsTop10,
//         type: "bar",
//         orientation: 'h'
//     };

//     var data = [trace1];

//     var layout = {
//         title: `Top 10 BB bacteria for ${indvMetadata} `
//     }

//     Plotly.newPlot("bar", data, layout);


//     // build bubble plot
//     var trace1 = {
//         x: otu_idsAll,
//         y: sampleValuesAll,
//         mode: "markers",
//         marker: {
//             size: sampleValuesAll,
//             color: 'light blue'
//         }
//     };

//     var data = [trace1];

//     var layout = {
//         title: `BB bacteria for ${indvMetadata} `,
//         showlegend: false,

//     }

//     Plotly.newPlot("bubble", data, layout);
// });
// // };

//     // --------------------------------------------------------


//     // --------------------------------------------------------

// //  EVENT LISTENER AND TO HANDLE A SELECTION
// // Function to handle a selection
// function optionChanged(selectedID) {
//     d3.event.preventDefault();
//     //var selectedID = d3.select("#selDataset").property("value");
//     // d3.select("#dropdownMenuButton").node().value = "";
//     console.log(selectedID);
//     console.log('Its working 2!!!!');
// }

// // Add event listener for submit button
// d3.select('#selDataset').on('change', handleSelection);



//     // -----------------------------------------------------------------------------------------------------------------------------------------------------
// })

function initilize() {
    var selector = d3.select('#selDataset');

    d3.json("data/samples.json").then((bbDdata) => {

        var names = bbDdata.names;

        names.forEach((sample) => {
            selector
                .append("option")
                .append(sample)
                .property("value", sample);
        });

        //s3eletc a sample from your data and call your build charts and metadata functions.
    });

};

initilize();