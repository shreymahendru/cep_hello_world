//Referance to CSInterface obj
//This runs the JSX scripts
var csInterface = new CSInterface();
var button = window.document.getElementById("btn");
button.onclick = function(){
  var url = 'your_url_here';
  var auth = 'secret_here';
  $.get(
    {// "type":'GET',
    url: url,
    headers: {"Authorization": auth}
  }, function(data, status){
    console.log("is it working?????");

    var product = data['Products'];
    data_to_script = [];
    for (i =0; i < product.length; i++){
      var imgUrl = product[i]['ImageURL']
      var image_name = imgUrl.substring(imgUrl.lastIndexOf('/'));
      data_to_script.push({
        "imgUrl": imgUrl,
        "imgName": image_name,
        "BrandName": product[i]['BrandName'],
        "price" : product[i]['Price'],
        "title" : product[i]['ProductTitle']
      });
    }
    var row_val = window.document.getElementById("inptRow").value;
    var col_val = window.document.getElementById("inptCol").value;
    var txt = "main(" + JSON.stringify(data_to_script)  + "," + row_val + ", " + col_val +  ")";
    console.log(txt);
    a = csInterface.evalScript(txt);
    console.log(data_to_script);
  });



  // a = csInterface.evalScript("main()");
  // console.log("Button clicked");
  // b = csInterface.evalScript("addDocument()");
  // console.log(b);
}
