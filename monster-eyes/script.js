// Copyright 2023 The MediaPipe Authors.
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//      http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
import { FaceDetector, FilesetResolver } from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.9";
const demosSection = document.getElementById("demos");
let faceDetector;
let runningMode = "IMAGE";
// Initialize the object detector
const initializefaceDetector = async () => {
    const vision = await FilesetResolver.forVisionTasks("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.9/wasm");
    faceDetector = await FaceDetector.createFromOptions(vision, {
        baseOptions: {
            modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/1/blaze_face_short_range.tflite`,
            delegate: "GPU"
        },
        runningMode: runningMode
    });
    demosSection.classList.remove("invisible");
};
initializefaceDetector();
/********************************************************************
 // Demo 1: Grab a bunch of images from the page and detection them
 // upon click.
 ********************************************************************/
const imageContainers = document.getElementsByClassName("detectOnClick");
for (let imageContainer of imageContainers) {
    imageContainer.children[0].addEventListener("click", handleClick);
}
/**
 * Detect faces in still images on click
 */
async function handleClick(event) {
    const highlighters = event.target.parentNode.getElementsByClassName("highlighter");
    while (highlighters[0]) {
        highlighters[0].parentNode.removeChild(highlighters[0]);
    }
    const infos = event.target.parentNode.getElementsByClassName("info");
    while (infos[0]) {
        infos[0].parentNode.removeChild(infos[0]);
    }
    const keyPoints = event.target.parentNode.getElementsByClassName("key-point");
    while (keyPoints[0]) {
        keyPoints[0].parentNode.removeChild(keyPoints[0]);
    }
    if (!faceDetector) {
        console.log("Wait for objectDetector to load before clicking");
        return;
    }
    // if video mode is initialized, set runningMode to image
    if (runningMode === "VIDEO") {
        runningMode = "IMAGE";
        await faceDetector.setOptions({ runningMode: "IMAGE" });
    }
    // const ratio = event.target.height / event.target.naturalHeight;
    // faceDetector.detect returns a promise which, when resolved, is an array of Detection faces
    const detections = faceDetector.detect(event.target).detections;
    // displayImageDetections(detections, event.target);
    displayImageDetectionsInPhaser(detections, event.target);
}
class EvilEye extends Phaser.Physics.Arcade.Sprite {
    constructor(options, scene, x = 0, y = 0) {
        super(scene, x, y, "evil-brain-eye", 2);
        this.health = 6000;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setFlipX(options.flipX);
        this.boundingBox = options.boundingBox;
    }
    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        let { left, right } = this.boundingBox;
        // PLAYER LEFT OF BRAIN
        if (this.scene.player.x < left) {
            this.flipX ? this.setFrame(3) : this.setFrame(1);
            // PLAYER RIGHT OF BRAIN
        }
        else if (this.scene.player.x > right) {
            this.flipX ? this.setFrame(1) : this.setFrame(3);
            // PLAYER BELOW BRAIN
        }
        else {
            this.setFrame(2);
        }
    }
}
function displayImageDetectionsInPhaser(detections, resultElement) {
    let ratio = resultElement.height / resultElement.naturalHeight;
    class Game extends Phaser.Scene {
        constructor() {
            super("Game");
        }
        preload() {
            this.load.baseURL = "https://assets.codepen.io/11817390/";
            this.load.spritesheet("evil-brain-eye", "evil-brain-eye.png", {
                frameHeight: 10,
                frameWidth: 22
            });
        }
        create() {
            this.player = { x: 0, y: 0 };
            let gameDivOffset = resultElement.parentNode.getBoundingClientRect();
            window.addEventListener("mousemove", (event) => {
                this.player = {
                    x: event.clientX - gameDivOffset.left,
                    y: event.clientY - gameDivOffset.top
                };
            });
            this.enemies = this.add.group();
            for (let detection of detections) {
                let boundingBox = {
                    left: detection.boundingBox.originX * ratio,
                    right: detection.boundingBox.originX * ratio +
                        detection.boundingBox.width * ratio
                };
                for (let [idx, keypoint] of detection.keypoints.entries()) {
                    // eyes
                    if (idx < 2) {
                        let options = {
                            boundingBox,
                            flipX: idx === 0
                        };
                        this.enemies.add(new EvilEye(options, this, keypoint.x * resultElement.width, keypoint.y * resultElement.height));
                    }
                }
            }
        }
    }
    const div = document.createElement("div");
    div.setAttribute("width", resultElement.naturalWidth + "px");
    div.setAttribute("height", resultElement.naturalHeight + "px");
    div.style.left = "0px";
    div.style.top = "0px";
    div.style.width = `${resultElement.width}px`;
    div.style.height = `${resultElement.height}px`;
    div.style.position = "absolute";
    div.style.zIndex = "2";
    div.id = "game";
    resultElement.parentNode.prepend(div);
    //   create a phaser game div and append it inside relatively positioned parent which also contains the image
    const config = {
        parent: div,
        transparent: true,
        scene: [Game],
        height: resultElement.naturalHeight * ratio,
        width: resultElement.naturalWidth * ratio,
        pixelArt: true,
        physics: {
            default: "arcade",
            arcade: {
                debug: false
            }
        }
    };
    window.game = new Phaser.Game(config);
}
function displayImageDetections(detections, resultElement) {
    const ratio = resultElement.height / resultElement.naturalHeight;
    console.log(ratio);
    for (let detection of detections) {
        // Description text
        const p = document.createElement("p");
        p.setAttribute("class", "info");
        p.innerText =
            "Confidence: " +
                Math.round(parseFloat(detection.categories[0].score) * 100) +
                "% .";
        // Positioned at the top left of the bounding box.
        // Height is whatever the text takes up.
        // Width subtracts text padding in CSS so fits perfectly.
        p.style =
            "left: " +
                detection.boundingBox.originX * ratio +
                "px;" +
                "top: " +
                (detection.boundingBox.originY * ratio - 30) +
                "px; " +
                "width: " +
                (detection.boundingBox.width * ratio - 10) +
                "px;" +
                "height: " +
                20 +
                "px;";
        const highlighter = document.createElement("div");
        highlighter.setAttribute("class", "highlighter");
        highlighter.style =
            "left: " +
                detection.boundingBox.originX * ratio +
                "px;" +
                "top: " +
                detection.boundingBox.originY * ratio +
                "px;" +
                "width: " +
                detection.boundingBox.width * ratio +
                "px;" +
                "height: " +
                detection.boundingBox.height * ratio +
                "px;";
        resultElement.parentNode.appendChild(highlighter);
        resultElement.parentNode.appendChild(p);
        for (let keypoint of detection.keypoints) {
            const keypointEl = document.createElement("spam");
            keypointEl.className = "key-point";
            keypointEl.style.top = `${keypoint.y * resultElement.height - 3}px`;
            keypointEl.style.left = `${keypoint.x * resultElement.width - 3}px`;
            resultElement.parentNode.appendChild(keypointEl);
        }
    }
}
/********************************************************************
 // Demo 2: Continuously grab image from webcam stream and detect it.
 ********************************************************************/
let video = document.getElementById("webcam");
const liveView = document.getElementById("liveView");
let enableWebcamButton;
// Check if webcam access is supported.
const hasGetUserMedia = () => { var _a; return !!((_a = navigator.mediaDevices) === null || _a === void 0 ? void 0 : _a.getUserMedia); };
// Keep a reference of all the child elements we create
// so we can remove them easilly on each render.
var children = [];
// If webcam supported, add event listener to button for when user
// wants to activate it.
if (hasGetUserMedia()) {
    enableWebcamButton = document.getElementById("webcamButton");
    enableWebcamButton.addEventListener("click", enableCam);
}
else {
    console.warn("getUserMedia() is not supported by your browser");
}
// Enable the live webcam view and start detection.
async function enableCam(event) {
    if (!faceDetector) {
        alert("Face Detector is still loading. Please try again..");
        return;
    }
    // Hide the button.
    enableWebcamButton.classList.add("removed");
    // getUsermedia parameters
    const constraints = {
        video: true
    };
    // Activate the webcam stream.
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function (stream) {
        video.srcObject = stream;
        video.addEventListener("loadeddata", predictWebcam);
    })
        .catch((err) => {
        console.error(err);
    });
}
let lastVideoTime = -1;
async function predictWebcam() {
    // if image mode is initialized, create a new classifier with video runningMode
    if (runningMode === "IMAGE") {
        runningMode = "VIDEO";
        await faceDetector.setOptions({ runningMode: "VIDEO" });
    }
    let startTimeMs = performance.now();
    // Detect faces using detectForVideo
    if (video.currentTime !== lastVideoTime) {
        lastVideoTime = video.currentTime;
        const detections = faceDetector.detectForVideo(video, startTimeMs)
            .detections;
        displayVideoDetections(detections);
    }
    // Call this function again to keep predicting when the browser is ready
    window.requestAnimationFrame(predictWebcam);
}
function displayVideoDetections(detections) {
    // Remove any highlighting from previous frame.
    for (let child of children) {
        liveView.removeChild(child);
    }
    children.splice(0);
    // Iterate through predictions and draw them to the live view
    for (let detection of detections) {
        const p = document.createElement("p");
        p.innerText =
            "Confidence: " +
                Math.round(parseFloat(detection.categories[0].score) * 100) +
                "% .";
        p.style =
            "left: " +
                (video.offsetWidth -
                    detection.boundingBox.width -
                    detection.boundingBox.originX) +
                "px;" +
                "top: " +
                (detection.boundingBox.originY - 30) +
                "px; " +
                "width: " +
                (detection.boundingBox.width - 10) +
                "px;";
        const highlighter = document.createElement("div");
        highlighter.setAttribute("class", "highlighter");
        highlighter.style =
            "left: " +
                (video.offsetWidth -
                    detection.boundingBox.width -
                    detection.boundingBox.originX) +
                "px;" +
                "top: " +
                detection.boundingBox.originY +
                "px;" +
                "width: " +
                (detection.boundingBox.width - 10) +
                "px;" +
                "height: " +
                detection.boundingBox.height +
                "px;";
        liveView.appendChild(highlighter);
        liveView.appendChild(p);
        // Store drawn objects in memory so they are queued to delete at next call
        children.push(highlighter);
        children.push(p);
        for (let keypoint of detection.keypoints) {
            const keypointEl = document.createElement("spam");
            keypointEl.className = "key-point";
            keypointEl.style.top = `${keypoint.y * video.offsetHeight - 3}px`;
            keypointEl.style.left = `${video.offsetWidth - keypoint.x * video.offsetWidth - 3}px`;
            liveView.appendChild(keypointEl);
            children.push(keypointEl);
        }
    }
}