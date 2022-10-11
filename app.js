console.log("Hello DS10!🎉");
let viz; 
// this let viz part is important!

//Create a variable to store the URL - if doesn't load, might need to specify height and width
const url =
  "https://public.tableau.com/views/LearnEmbeddedAnalytics/SalesOverviewDashboard";
//Create a variable to store the dashboard options
const options = {
  device: "desktop",
  height: "800px",
  width: "1100px",
};
//Create a variable to store the vizContainer
const containerDiv = document.getElementById("vizContainer");
//Create a variable to store the show viz button & hide viz button
const showVizButton = document.getElementById("showViz");
const hideVizButton = document.getElementById("hideViz");
// Create Variables for Export buttons
const exportpdfbutton = document.getElementById("exportPDF");
const exportpptbutton = document.getElementById("exportPPT");
//Create a function that shows the dashboard
function initViz() {
  console.log("Viz Initialised");

  viz = new tableau.Viz(containerDiv, url, options);
}
//Function to show /hide viz
function showViz() {
  viz.show();
}
function hideViz() {
  viz.hide();
}
// Function to export PDF/PPT
function exportPDFfunction() {
  viz.showExportPDFDialog();
}

// Function to export PDF/PPT
function exportPPTfunction() {
  viz.showExportPowerPointDialog();
}

// Function to use the filters
function getRangeValues(){
  const minValue = document.getElementById("minValue").value;
  const maxValue = document.getElementById("maxValue").value;
  console.log(minValue, maxValue);
  
const workbook = viz.getWorkbook();
// need to get active sheet, but this could be a dashboard or a worksheet
const activeSheet = workbook.getActiveSheet();
const sheets = activeSheet.getWorksheets();
console.log(sheets);
const sheetToFilter = sheet[1]
sheetToFilter.applyRangeFilterAsync("Sum(Sales)", {min: minValue, max:maxValue}).then(alert("viz filtered"));
}

document.getElementById("filterButton").addEventListener("click",getRangeValues);


// Create events to link the viz.show call to the buttons.
showVizButton.addEventListener("click", showViz);
hideVizButton.addEventListener("click", hideViz);

// Create Events to link the export buttons
exportpdfbutton.addEventListener("click", exportPDFfunction);
exportpptbutton.addEventListener("click", exportPPTfunction);

//Listens for the content being loaded, and when finished, loads the viz.
document.addEventListener("DOMContentLoaded", initViz);
