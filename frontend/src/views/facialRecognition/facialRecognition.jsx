import React, { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import * as faceapi from 'face-api.js';

const Camera = () => {
  const webcamRef = useRef(null);
  const [isModelLoaded, setIsModelLoaded] = useState(false);

  const capture = async () => {
    if (webcamRef.current && isModelLoaded) {
        const imageSrc = webcamRef.current.getScreenshot();
        const img = new Image();
        img.src = imageSrc;
  
        img.onload = async () => {
          const detections = await faceapi.detectAllFaces(img, new faceapi.TinyFaceDetectorOptions());
          console.log(detections);
        };
      } else {
        console.log("Models are not loaded yet.");
    }
  };

//   async function loadModels() {
//     const MODEL_URL = process.env.PUBLIC_URL + '/models';
//     await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
//     await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
//     await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
//     await faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL); // Depending on which model you want to use
//   }

  useEffect(() => {
    async function loadModels() {
        const MODEL_URL = '../../models/face-api.js-master/';
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
          faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
          faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL) // Depending on which models you need
        ]);
        setIsModelLoaded(true);
    }
    loadModels();
  }, []);

  return (
    <div>
      <Webcam ref={webcamRef} screenshotFormat="image/jpeg" />
      <button onClick={capture}>Detect Faces</button>
    </div>
  );
}

export default Camera;
