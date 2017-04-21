function main(data, row, col){
	//this telling Indesign this is gonna need user intervention. like select files/
	app.scriptPreferences.userInteractionLevel = UserInteractionLevels.interactWithAll;
 	valid_extensions = ['.jpg', '.png']
	//Display the folder browser.
	// var myFolder = Folder.selectDialog("Select the folder containing the images", "");
	data = eval(data);
	//Downloading images
	for (var i= 0; i< data.length; i++){
		var script = "curl -o ~/Desktop/test" + data[i]['imgName' ]+ ' ' + data[i]['imgUrl'];
		app.doScript("do shell script \""+ script + "\"", ScriptLanguage.APPLESCRIPT_LANGUAGE);


	}
	var myFolder = Folder('~/Desktop/test');
	if (myFolder != null){
		if(File.fs == "Macintosh"){
			files = get_files(myFolder);
			$.writeln(files.length);
		}
		if (files.length != 0){
			splatter_flyer(files, row, col, data);
		}
		app.doScript("do shell script \"rm -rf ~/Desktop/test && mkdir ~/Desktop/test\"", ScriptLanguage.APPLESCRIPT_LANGUAGE);
	}
}


function splatter_flyer(files, numberOfRow, numberOfColumn, data){
	var framesPerPage = numberOfRow * numberOfColumn;
	//setting doc
	var doc = app.documents.add();
	doc.viewPreferences.horizontalMeasurementUnits = MeasurementUnits.points;
	doc.viewPreferences.verticalMeasurementUnits = MeasurementUnits.points;
	var docPrefernces = doc.documentPreferences;
	var numberOfFrames = files.length;
	var numberOfPages = Math.round(numberOfFrames / framesPerPage);
	if((numberOfPages * framesPerPage < numberOfFrames)){
		numberOfPages++;
	}
	offerLayer = doc.layers.add({name:"offer"});
	doc.paragraphStyles.add({name: "offer_style"});
	docPrefernces.pagesPerDocument = numberOfPages;
	docPrefernces.facingPages = false;

	//set Page layout
	var page = doc.pages.item(0);
	var marginPreferences = page.marginPreferences;
	var leftMargin = marginPreferences.left;
	var rightMargin = marginPreferences.right;
	var topMargin = marginPreferences.top;
	var bottomMargin = marginPreferences.bottom;
	var liveWidth = docPrefernces.pageWidth - (leftMargin + rightMargin);
	var liveHeight = docPrefernces.pageHeight - (topMargin + bottomMargin);
	var frameWidth = liveWidth / numberOfColumn;
	var frameHeight = liveHeight / numberOfRow;
	var pages = doc.pages;

	var x1, x2, y1, y1, rectangle;

	//creating frames now
	//in reverse order cause saves time later
	for(var pageNum = doc.pages.length-1; pageNum >=0; pageNum --){
		page = doc.pages.item(pageNum);
		for(var rowNum = numberOfRow;  rowNum >=1; rowNum --){ //row start with 1
			y1 = topMargin + (frameHeight*(rowNum-1));
			y2  = y1 + frameHeight;
			for (var columnNum = numberOfColumn; columnNum >=1; columnNum-- ){
				x1 = leftMargin + (frameWidth* (columnNum-1));
				x2 = x1 + frameWidth;
				// myRectangle = myPage.rectangles.add(myDocument.layers.item(-1), undefined, undefined, {geometricBounds:[myY1, myX1, myY2, myX2], strokeWeight:0, strokeColor:myDocument.swatches.item("None")});
				rectangle = page.rectangles.add(doc.layers.item(-1),undefined, undefined, {geometricBounds:[y1, x1, y2, x2], strokeWeight:0, strokeColor:doc.swatches.item("None")});
			}
		}
	}

	for(var frame = 0; frame< numberOfFrames; frame++){
		var file = files[frame];
		var rec = doc.rectangles.item(frame);
		rec.place(File(file));
		rec.label = file.displayName.toString();
		rec.fit(FitOptions.proportionally);
		rec.fit(FitOptions.centerContent);
		var myLink =rec.graphics.item(0).itemLink;
		for (var k=0; k < data.length; k++){
            $.writeln('/' + file.displayName.toString() ); // writeln is eqivalent of console.log for extend script
            $.writeln(data[k]['imgName']);
			if('/' + file.displayName.toString() == data[k]['imgName']){
				myLabel = data[k]['title'];
			}
		}
		var myX1 = rec.geometricBounds[1] + 5;
		var myY1 = rec.geometricBounds[2] - 24;
		var myX2 = rec.geometricBounds[3] + 5;
		var myY2 = rec.geometricBounds[2];
		var myTextFrame = rec.parent.textFrames.add("offer", undefined, undefined,{geometricBounds:[myY1, myX1, myY2, myX2], contents:myLabel});
		myTextFrame.textFramePreferences.firstBaselineOffset = FirstBaseline.leadingOffset;
		myTextFrame.parentStory.texts.item(0).appliedParagraphStyle = "offer_style";
		 var color = doc.colors.itemByName("myRED");
        if (color == null){
                var color=  doc.colors.add();
        color.name = "myRED";
        color.colorValue = [15, 100, 100, 0];

            }
        myTextFrame.fillColor = color;
	}


}




function get_files(folder){
	//can add any format here
	files = folder.getFiles('*'+'.png');
	for(var a = 0; a < files.length; a ++){
		$.writeln(files[0].name);
	}
	return files;
}
