scoreLeftWrist=0;
scoreRightWrist=0;
song="";
rightWristx=0;
rightWristy=0;
leftWristx=0;
leftWristy=0;
function preload(){
song=loadSound("music.mp3");
}

function setup(){
canvas=createCanvas(600,500);  
canvas.center();  
video=createCapture(VIDEO);
video.hide();
poseNet=ml5.poseNet(video, modelLoaded);
poseNet.on("pose",gotPoses);
}

function modelLoaded(){
    console.log("Model is ready! :)");
}

function gotPoses(results){
if (results.length > 0){
    console.log(results);
scoreLeftWrist = results[0].pose.keypoints[9].score;
scoreRightWrist = results[0].pose.keypoints[10].score;
rightWristx=results[0].pose.rightWrist.x;
rightWristy=results[0].pose.rightWrist.y;

leftWristx=results[0].pose.leftWrist.x;
leftWristy=results[0].pose.leftWrist.y;

console.log("Right wrist - x is",rightWristx,"and y is",rightWristy);
console.log("Left wrist - x is",leftWristx,"and y is",leftWristy);
}
}
function draw(){
image(video, 0,0,600,500)

if(scoreRightWrist > 0.2)
{
    fill("teal");
stroke("teal");
circle(rightWristx, rightWristy, 20);

if(rightWristy > 0 && rightWristy <= 100)
{
    document.getElementById("speed").innerHTML="Speed = 0.5x";
    song.rate(0.5);
}
else if(rightWristy > 100 && rightWristy <= 200)
{
    document.getElementById("speed").innerHTML="Speed = 1.0x";
    song.rate(1.0);
}

else if(rightWristy > 200 && rightWristy <= 300)
{
    document.getElementById("speed").innerHTML="Speed = 1.5x";
    song.rate(1.5);
}

else if(rightWristy > 300 && rightWristy <= 400)
{
    document.getElementById("speed").innerHTML="Speed = 2.0x";
    song.rate(2.0);
}

else if(rightWristy > 400 && rightWristy <= 500)
{
    document.getElementById("speed").innerHTML="Speed = 2.5x";
    song.rate(2.5);
}
}


fill("magenta");
stroke("magenta");

if(scoreLeftWrist > 0.2)
{
circle(leftWristx, leftWristy, 20)
inNum= Number(leftWristY);
rem=floor(inNum);
volume=rem/500;
document.getElementById("volume").innerHTML="Volume = "+ volume;
song.setVolume(volume);
}
}

function play(){
song.play();
song.setVolume(1);
song.rate(1);
}

