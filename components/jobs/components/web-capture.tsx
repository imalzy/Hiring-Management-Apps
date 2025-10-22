"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import Webcam from "react-webcam";
import * as handpose from "@tensorflow-models/handpose";
import "@tensorflow/tfjs";

interface WebcamCaptureProps {
  onCapture: (image: string) => void;
}

const gestureSequence = [3, 2, 1];

const WebcamCapture: React.FC<WebcamCaptureProps> = React.memo(
  ({ onCapture }) => {
    const webcamRef = useRef<Webcam>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [model, setModel] = useState<handpose.HandPose | null>(null);
    const [sequence, setSequence] = useState<number[]>([]);
    const [countdown, setCountdown] = useState<number | null>(null);
    const [captured, setCaptured] = useState<string | null>(null);
    const [isCapturing, setIsCapturing] = useState(false);

    // Load model
    useEffect(() => {
      const loadModel = async () => {
        const net = await handpose.load();
        setModel(net);
        console.log("✅ Handpose model loaded");
      };
      loadModel();
    }, []);

    // Detection loop
    useEffect(() => {
      if (!model) return;
      const interval = setInterval(() => detectHands(), 200);
      return () => clearInterval(interval);
    }, [model]);

    const detectHands = useCallback(async () => {
      if (!webcamRef.current || !model) return;
      const video = webcamRef.current.video as HTMLVideoElement;
      if (!video || video.readyState !== 4) return;

      const predictions = await model.estimateHands(video);
      const ctx = canvasRef.current?.getContext("2d");
      if (!ctx) return;
      if (!canvasRef.current) return;
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      ctx.clearRect(0, 0, videoWidth, videoHeight);

      if (predictions.length === 0) return;

      const landmarks = predictions[0].landmarks;
      const fingerCount = countRaisedFingers(landmarks);

      // Rectangle coordinates
      const xs = landmarks.map((p) => p[0]);
      const ys = landmarks.map((p) => p[1]);
      const minX = Math.min(...xs);
      const minY = Math.min(...ys);
      const maxX = Math.max(...xs);
      const maxY = Math.max(...ys);

      // Determine color + label
      let color = "#00FF80";
      let label = `Pose ${fingerCount}`;

      if (fingerCount > 3) {
        color = "#FF2D2D";
        label = "Undetected";
        setSequence([]);
      } else {
        setSequence((prev) => {
          const next = [...prev];
          if (gestureSequence[next.length] === fingerCount) {
            next.push(fingerCount);
          }
          return next;
        });
      }

      // Draw rectangle
      ctx.beginPath();
      ctx.lineWidth = 3;
      ctx.strokeStyle = color;
      ctx.rect(minX - 10, minY - 10, maxX - minX + 20, maxY - minY + 20);
      ctx.stroke();

      // Label
      ctx.fillStyle = color;
      ctx.font = "bold 20px Nunito Sans";
      ctx.fillText(label, minX, minY - 15);
    }, [model, sequence, isCapturing]);

    useEffect(() => {
      if (sequence.length === gestureSequence.length && !isCapturing) {
        startCountdown();
      }
    }, [sequence, isCapturing]);

    const countRaisedFingers = (
      landmarks: [number, number, number][],
    ): number => {
      const tips = [8, 12, 16, 20]; // Finger tips
      let count = 0;
      for (const tip of tips) {
        const tipY = landmarks[tip][1];
        const pipY = landmarks[tip - 2][1];
        if (tipY < pipY) count++;
      }
      // Thumb check
      if (landmarks[4][0] > landmarks[3][0]) count++;
      return count;
    };

    const startCountdown = useCallback(() => {
      setIsCapturing(true);
      let counter = 3;
      setCountdown(counter);
      console.log("Countdown started");
      const interval = setInterval(() => {
        counter--;
        setCountdown(counter);
        if (counter === 0) {
          clearInterval(interval);
          capture();
          setCountdown(null);
          setSequence([]);
          setIsCapturing(false);
        }
      }, 1000);
    }, []);

    const capture = useCallback(() => {
      const imageSrc = webcamRef.current?.getScreenshot();
      if (imageSrc) {
        setCaptured(imageSrc);
        onCapture(imageSrc);
      }
    }, [onCapture]);

    if (!model)
      return (
        <div className="relative w-[480px] h-[360px] flex justify-center items-center">
          {" "}
          Starting Video...{" "}
        </div>
      );

    return (
      <div className="relative w-[480px] h-[360px] flex justify-center items-center">
        <Webcam
          ref={webcamRef}
          mirrored
          screenshotFormat="image/jpeg"
          videoConstraints={{ facingMode: "user" }}
          className="rounded-lg shadow-md"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
        />
        {countdown !== null && (
          <div className="absolute inset-0 flex flex-col justify-center items-center bg-black/40 text-white text-3xl font-bold">
            <p>Capturing photo in</p>
            <p className="text-5xl mt-2 animate-pulse">{countdown}</p>
          </div>
        )}
        {captured && (
          <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
            ✅ Captured
          </div>
        )}
      </div>
    );
  },
);

WebcamCapture.displayName = "WebcamCapture";
export default WebcamCapture;
