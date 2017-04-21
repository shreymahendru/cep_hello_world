
function addDocument() {
app.documents.add();
return "Done!"
};

function putTextIn(txt){
  var document = app.documents.item(0); //get first Doc
  document.viewPreferences.horizontalMeasurementUnits = MeasurementUnits.points;
  document.viewPreferences.verticalMeasurementUnits = MeasurementUnits.points;
  var page = document.pages.item(0); //get the first page doc
  var textFrame = page.textFrames.add(); //add a text frame to the page
  textFrame.geometricBounds = [72, 72, 288, 288]; //set size of the frame. This can be dynamic which is cool.
  textFrame.contents = txt;
  console.log(textFrame);
  return textFrame
};
