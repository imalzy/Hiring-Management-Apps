import Image from "next/image";
import React from "react";
import WebcamCapture from "../components/web-capture";

interface WebcamModalProps {
  open: boolean;
  onClose: () => void;
  onCapture: (image: string) => void;
}

const WebcamModal: React.FC<WebcamModalProps> = ({
  open,
  onClose,
  onCapture,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div
        className="bg-white w-full max-w-[637px] rounded-[10px] overflow-hidden font-['Nunito_Sans']"
        style={{ boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)" }}
      >
        <div className="flex items-center justify-between p-6">
          <div>
            <h2 className="text-lg font-bold text-[var(--natural-100)]">
              Raise Your Hand to Capture
            </h2>
            <p className="text-sm text-[var(--natural-100)]">
              We’ll take the photo once your hand pose is detected.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <Image
              src={"/assets/icons/close.svg"}
              alt="close"
              height={20}
              width={20}
            />
          </button>
        </div>
        <div className="px-6 pb-6 flex flex-col items-center gap-6">
          <WebcamCapture onCapture={onCapture} />

          <p className="text-sm text-[var(--natural-100)] w-full self-start">
            To take a picture, follow the hand poses in the order shown below.
            The system will automatically capture the image once the final pose
            is detected.
          </p>

          <div className="flex items-center gap-3">
            <Image
              src={"/assets/images/rules-camera.svg"}
              alt="camera"
              width={250}
              height={57}
              sizes="(max-width: 640px) 180px, 250px"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebcamModal;
