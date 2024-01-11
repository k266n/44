img = "";
status_1 = "";
objects = [];
function setup(){
    canvas = createCanvas(380, 380);
    canvas.center();
video = createCapture(VIDEO);
video.size(380,380);
video.hide();
}

function modelLoaded(){
    console.log("Model Loaded!")
    status_1 = true;
}
function gotResult(error, results){
if(error){
    console.log(error);
}
console.log(results);
objects = results;
}

function preload(){
    song = loadSound("phone.mp3");
}
function draw(){
    image(video, 0, 0, 380, 380);
    fill("#FF0000");
   if(status_1 != ""){
    r = random(255);
    g = random(255);
    b = random(255);
    objectDetector.detect(video, gotResult);
    for(i = 0; i < objects.length; i++){
    document.getElementById("status").innerHTML = "Status : Object Detected";
    document.getElementById("number_of_objects").innerHTML = "Number of objects detected are : "+ objects.length;
    fill(r,g,b);
    percent = floor(objects[i].confidence * 100);
    text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
    noFill();
    stroke(r,g,b);
    rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
 if(objects[i].label == "person"){
document.getElementById("status").innerHTML = "Baby Found";
song.stop();
 }
 else{
    document.getElementById("status").innerHTML = "Baby Not Found";
    song.play();
 }
}
   }
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Status : Detecting Objects";
}
