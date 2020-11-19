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

function metaDataSearchLoop(selectedID) {
    d3.json("data/samples.json").then((bbDdata) => {
        // selectedID = 1260 // Need to remove this once I've got the listener working
        selectedIDLocal = selectedID
        nos = 0
        metadataArray = bbDdata.metadata
        metadataArray.forEach(entry => {
            if (selectedIDLocal == metadataArray[nos].id) {
                d3.select('#Demographic_id').text(`ID: ${(metadataArray[nos].id)}`);
                d3.select('#Demographic_ethnicity').text(`Ethnicity: ${metadataArray[nos].ethnicity}`);
                d3.select('#Demographic_gender').text(`Gender: ${metadataArray[nos].gender}`);
                d3.select('#Demographic_age').text(`Age: ${metadataArray[nos].age}`);
                d3.select('#Demographic_location').text(`Location: ${metadataArray[nos].location}`);
                d3.select('#Demographic_bbtype').text(`Bbtype: ${metadataArray[nos].bbtype}`);
                d3.select('#Demographic_wfreq').text(`Wfreq: ${metadataArray[nos].wfreq}`);
            };
            nos = nos + 1;
        });
    });
};

// metaDataSearchLoop(950)
// //     // --------------------------------------------------------

function plotGraphsLoop(selectedID) {
    d3.json("data/samples.json").then((bbDdata) => {
        var sampleValuesAll
        var otu_idsAll
        var otu_labelsAll
        var samplesArray

        // selectedID = 1260 // Need to remove this once I've got the listener working
        selectedIDLocal = selectedID
        nos = 0
        samplesArray = bbDdata.samples;
        samplesArray.forEach(entry => {
            if (selectedIDLocal == samplesArray[nos].id) {
                sampleValuesAll = samplesArray[nos].sample_values;
                otu_idsAll = samplesArray[nos].otu_ids;
                otu_labelsAll = samplesArray[nos].otu_labels;
            };
            nos = nos + 1;
        });

        var sampleValuesAll
        var otu_idsAll
        var otu_labelsAll
        var sampleValuesTop10
        var otu_idsTop10
        var otu_labelsTop10


        // Slice the first 10 objects for plotting
        sampleValuesTop10 = sampleValuesAll.slice(0, 10);
        otu_idsTop10 = otu_idsAll.slice(0, 10);
        otu_labelsTop10 = otu_labelsAll.slice(0, 10);

        var sampleValuesTop10Sort = sampleValuesTop10.sort((a, b) => b - a);
        console.log(sampleValuesTop10Sort)

        // build bar plot
        var trace1 = {
            x: sampleValuesTop10Sort,
            y: otu_idsTop10,
            type: "bar",
            orientation: 'h',

        };

        var data = [trace1];

        var layout = {
            title: `Top 10 Belly Button bacteria for ${selectedIDLocal} `
        }

        Plotly.newPlot("bar", data, layout);


        // build bubble plot
        var trace1 = {
            x: otu_idsAll,
            y: sampleValuesAll,
            mode: "markers",
            marker: {
                size: sampleValuesAll,
                color: 'light blue'
            }
        };

        var data = [trace1];

        var layout = {
            title: `Belly Button bacteria for ${selectedIDLocal}`,
            showlegend: false,

        }

        Plotly.newPlot("bubble", data, layout);
    });
};

//     // --------------------------------------------------------

//  EVENT LISTENER AND TO HANDLE A SELECTION
// Function to handle a selection
function optionChanged(selectedID) {
    // d3.event.preventDefault();
    var selectedID = d3.select("#selDataset").property("value");
    d3.select("#selDataset").node().value = "";
    plotGraphsLoop(selectedID)
    metaDataSearchLoop(selectedID)
    console.log(selectedID)
}

// Add event listener for submit button
// d3.select('#selDataset').on('change', handleSelection);

//     // -----------------------------------------------------------------------------------------------------------------------------------------------------

// // TO SETUP AN INITIALIZE FUNCTION THAT'LL POPULATE THE DROPDOWN, SELECT A RANDOM DEFAULT ID AND CALL THE PLOT GRAPH AND METADATA FUNCTIONS TO POPULATE LANDING PAGE
// // 1ST TRY
function initialize() {
    var selector = d3.select('#selDataset');

    d3.json("data/samples.json").then((bbDdata) => {

        var idNames = bbDdata.names;
        // console.log(idNames)

        idNames.forEach((sample) => {
            selector
                .append("option")
                .text(sample)
                .property("value", sample);
        });

        //         // Select a sample from your data and call your build charts and metadata functions.
        selectedID = idNames[Math.floor(Math.random() * idNames.length)]
        plotGraphsLoop(selectedID)
        metaDataSearchLoop(selectedID)
        console.log(selectedID)

    });
}

initialize()

// };

//2ND TRY
// function initialize() {
//     var selector = document.getElementById(selDataset);

//     d3.json("data/samples.json").then((bbDdata) => {

//         var idNames = bbDdata.names;
//         console.log(idNames)
//         for (var i = 0; i < idNames.length; i++) {
//             var option = document.createElement("OPTION"),
//                 txt = document.createTextNode(idNames[i]);
//             option.appendChild(txt);
//             option.setAttribute("value", idNames[i]);
//             selector.insertBefore(option, select.lastChild);
//         };
//         // Select a sample from your data and call your build charts and metadata functions.
//         selectedID = idNames[Math.floor(Math.random() * idNames.length)]
//         plotGraphsLoop(selectedID)
//         metaDataSearchLoop(selectedID)
//     });

// };

// initialize();