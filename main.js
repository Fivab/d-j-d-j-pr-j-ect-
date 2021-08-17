d = "";
a = "";
c = "";
b = "";
function preload() {
    d = loadSound("d.mp3");
    a = loudSound("a.mp3");
    c = loadSound("c.mp3");
    b = loudSound("b.mp3");
}
scoreRightWrist = 0;
scoreLeftWrist = 0;
rightWristX = 0;
rightWristY = 0;
leftWristX = 0;
leftWristY = 0;

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('PoseNet Is Initialized');
}

function gotPoses(results) {
    if (results.length > 0) {
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreRightWrist = " + scoreRightWrist + " scoreLeftWrist = " + scoreLeftWrist);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + " rightWristY = " + rightWristY);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + " leftWristY = " + leftWristY);
    }
}

function draw() {
    image(video, 0, 0, 600, 500);
    fill("#FF0000");
    stroke("#FF0000");
    if(scoreRightWrist > 0.2) {
        circle(rightWristX, rightWristY, 20);
        
        if (rightWristY > 100 && rightWristY <= 200) {
            document.getElementById("source").innerHTML="Source = 1.0X";
            a.play();
        }
        else if (rightWristY > 200 && rightWristY <= 300) {
            document.getElementById("source").innerHTML="Source = 1.5X";
            b.play();
        }
        else if (rightWristY > 300 && rightWristY <= 400) {
            document.getElementById("source").innerHTML="Source = 2.0X";
            c.play();
        }
        else if (rightWristY > 400 && rightWristY <= 500) {
            document.getElementById("source").innerHTML="Source = 2.5X";
            d.play();
        }
    }

    if (scoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        InNumberleftWristY = Number(leftWristY);
        new_leftWristY = floor(InNumberleftWristY * 2);
        leftWristY_divide_1000 = new_leftWristY / 1000;
        document.getElementById("volume").innerHTML = "Volume = " + leftWristY_divide_1000;
        song.setVolume(leftWristY_divide_1000);
    }
}

function play() {
    d.play();
    d.setVolume(1);
    d.rate(1);
}