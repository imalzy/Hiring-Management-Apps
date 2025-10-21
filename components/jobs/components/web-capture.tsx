import Image from "next/image";
import React, { useRef, useState } from "react";

import Webcam from "react-webcam";

interface WebcamCaptureProps {
  onCapture: (image: string) => void;
}

const WebcamCapture: React.FC<WebcamCaptureProps> = React.memo(
  ({ onCapture }) => {
    const webcamRef = useRef<Webcam>(null);
    const [captured, setCaptured] = useState<string | null>(null);
    const [hasPermission, setHasPermission] = useState(true);

    const handleUserMediaError = (error: string | DOMException) => {
      console.error("Webcam error:", error);

      if (error) {
        setHasPermission(false);
      } else {
        setHasPermission(false);
      }
    };

    return (
      <div className="flex flex-col items-center">
        {!captured ? (
          <div className="rounded-lg overflow-hidden shadow-md">
            {hasPermission && (
              <Webcam
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className="object-cover rounded-lg"
                width="100%"
                height="300px"
                videoConstraints={{ facingMode: "user" }}
                onUserMediaError={(error) => handleUserMediaError(error)}
              />
            )}
          </div>
        ) : (
          <Image
            src={captured}
            alt="Captured"
            className="w-full h-[300px] object-cover rounded-lg shadow-md"
            fill
          />
        )}

        {!hasPermission && (
          <>
            <p className="text-red-900 font-bold text-2xl">
              Camera access was denied.
            </p>
            <p className="text-[var(--natural-90)] text-xs">
              Please allow permission to use the webcam.
            </p>
          </>
        )}
      </div>
    );
  },
);

WebcamCapture.displayName = "WebcamCapture";
export default WebcamCapture;
