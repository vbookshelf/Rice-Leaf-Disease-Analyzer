/*

This code is based on Tensorflow.js Version: 1.6.0
===================================================

NOTES: 

-1. Select version 1.6.0 before reading the Tensorflow.js API  docs.
There are different docs for different versions. My previous web apps
used Tensorflow.js version 0.13.3.
https://js.tensorflow.org/api/1.6.0

-2. Tensorflow.js version 1.6.0 is what has been imported into the index.html file:
<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.6.0/dist/tf.min.js"> 
</script>

-3. tf.loadLayersModel and tf.browser.fromPixels are new.
More info: 
https://stackoverflow.com/questions/55402551/why-am-i-getting-the-error-tf-frompixels-is-not-a-function

-4. onProgress is also new in this version. I've used it to create a progress
bar to monitor the download of the model.
More info on progress bars:
w3schools:
https://www.w3schools.com/w3css/w3css_progressbar.asp

Stackoverfow answer:
https://stackoverflow.com/questions/58867977/it-is-possible-to-cache-tensorflow-models-in-browser-or-monitor-downloading-pro


-5. The code used here is based on a YouTube tutorial by deeplizard
https://www.youtube.com/watch?v=HEQDRWMK6yY



*/









// After the model loads we want to make a prediction on the default image.
// Thus, the user will see predictions when the page is first loaded.

function simulateClick(tabID) {
	
	document.getElementById(tabID).click();
}

function predictOnLoad() {
	
	// Simulate a click on the predict button
	setTimeout(simulateClick.bind(null,'predict-button'), 500);
};


$("#image-selector").change(function () {
	let reader = new FileReader();
	reader.onload = function () {
		let dataURL = reader.result;
		$("#selected-image").attr("src", dataURL);
		$("#prediction-list").empty();
	}
	
		
		let file = $("#image-selector").prop('files')[0];
		reader.readAsDataURL(file);
		
		
		// Simulate a click on the predict button
		// This introduces a 0.5 second delay before the click.
		// Without this long delay the model loads but may not automatically
		// predict.
		setTimeout(simulateClick.bind(null,'predict-button'), 500);

});



/*

This functions takes the output p from onProgress
and uses it to adjust the width attribute of the progress bar.

onProgress gives the following out as the model loads:
0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1

*/

function move(p) {
  var elem = document.getElementById("myBar");
  
  // Write the progress to the console
  console.log(p);

  // Take the value given by onProgress --> 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1
  // Replace move(p) with console.log(p) below to see the above values of p.
  var width = 100 * p;
  
  // Change the width attribute in the element.
  // The width is a percentage e.g. 20%
  elem.style.width = width + '%';
  
  // Replace the innerhtml percentage e.g. <div>20%</div>
  elem.innerHTML = width + '%';
    
}



/*

This functions replaces the text within an element.
Here it's used the replace the three dots (...) with the word 'Results'.

*/


function changeStatus(status) {
  var elem = document.getElementById("status");
  
  // Replace the innerhtml percentage e.g. <div>20%</div>
  elem.innerHTML = status;
     
}


// Call the function.
// Make the text three dots (...) when the page loads.
changeStatus("...");





let model;
(async function () {
	
	model = await tf.loadLayersModel('http://apple.test.woza.work/model_v2/model.json', 
	{onProgress: p => move(p)}); // <-- Take note of this
	
	$("#selected-image").attr("src", "http://apple.test.woza.work/assets/Train_1784_multiple_diseases.jpg")
	
	
	
	// Hide the model loading spinner
	$('.progress-bar').hide();
	
	// Simulate a click on the predict button
	predictOnLoad();
	
	// Change the text from ... to 'Results'
	changeStatus("Results");
	
	
})();






$("#predict-button").click(async function () {
	
	
	
	let image = $('#selected-image').get(0);
	
	// Pre-process the image
	let tensor = tf.browser.fromPixels(image)
	.resizeNearestNeighbor([224,224]) // change the image size here
	.toFloat()
	.div(tf.scalar(255.0))
	.expandDims();
	
	
	
	
	
	// Pass the tensor to the model and call predict on it.
	// Predict returns a tensor.
	// data() loads the values of the output tensor and returns
	// a promise of a typed array when the computation is complete.
	// Notice the await and async keywords are used together.
	let predictions = await model.predict(tensor).data();
	let top5 = Array.from(predictions)
		.map(function (p, i) { // this is Array.map
			return {
				probability: p,
				className: TARGET_CLASSES[i] // we are selecting the value from the obj
			};
				
			
		}).sort(function (a, b) {
			return b.probability - a.probability;
				
		}).slice(0, 4);
	
	
$("#prediction-list").empty();
top5.forEach(function (p) {

	$("#prediction-list").append(`<li>${p.className}: ${p.probability.toFixed(3)}</li>`);

	
	});
	
	
});









