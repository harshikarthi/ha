var prediction="";


//setting webcam properties
Webcam.set({
width:350,
height:300,
image_format:'png',
png_quality:90
});

//getting camera element from the "HTML"
camera=document.getElementById("camera");

//attaching the webcam to the CAMERA DIV
Webcam.attach(camera);

function take_snapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML="<img id='captured_img' src="+data_uri+">";
    });  
}

console.log('ml5 version : '+ml5.version);

classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/d0uJNiStN/model.json",modelLoaded);

function modelLoaded()
{
    console.log ("model loaded");
}

function speak()
{
var synth=window.speechSynthesis;
speak_data1="The prediction is "+prediction;
var uttar_this=new SpeechSynthesisUtterance(speak_data1);
synth.speak(uttar_this);
}

function check() {
    img = document.getElementById('captured_img');
    classifier.classify(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(results);
        prediction = results[0].label;
        document.getElementById("result_emotion_name1").innerHTML = prediction;
        speak();
        if (prediction == "write") {
            document.getElementById("result_emoji1").innerHTML = "&#9997;";
        }
        if (prediction == "up") {
            document.getElementById("result_emoji1").innerHTML = "&#128070;";
        }
        if (prediction == "down") {
            document.getElementById("result_emoji1").innerHTML = "&#128071;";
        }

       
    }
}
