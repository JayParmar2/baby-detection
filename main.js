song = "";
Status = "";
objects = [];



function setup() {
    canvas = createCanvas(400, 400);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(400, 400);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelloaded);
    document.getElementById("status").innerHTML = "STATUS : Detecting Objects";


}

function modelloaded() {
    console.log("modelloaded");
    Status = true;


}

function gotresults(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);

    objects = results;


}

function preload() {
    song = loadSound("krishna_flute.mp3");
}

function draw() {
    image(video, 0, 0, 400, 400);

    if (Status != "") {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotresults);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "status : object detected";

            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if (objects[i].label == "person") {
                document.getElementById("baby_found").innerHTML = "baby found ";
                song.stop();
            } else {
                document.getElementById("baby_found").innerHTML = "baby not found ";
                song.play();
            }

        }
    }

}