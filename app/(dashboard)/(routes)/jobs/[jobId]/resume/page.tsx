"use client";

import { useState } from "react";
import Image from "next/image";
import { CameraIcon } from "lucide-react";
import WebcamModal from "@/components/jobs/modals/camera-modal";

export default function ResumePage() {
  const [photo, setPhoto] = useState("/assets/images/profile-placeholder.svg");
  const [open, setOpen] = useState(false);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen flex justify-center bg-[var(--background)] font-[var(--font-nunito-sans)] px-4 mt-[50px] pb-4">
      <div className="w-full max-w-2xl bg-white shadow-md rounded-md border border-[var(--natural-40)]">
        <div className="flex items-center justify-between p-10">
          <div className="flex items-center gap-4">
            <button
              onClick={() => window.history.back()}
              className="h-6 w-6 rounded-lg transition border border-[var(--natural-40)] p-1 cursor-pointer"
              style={{ boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.12)" }}
            >
              <Image
                src={"/assets/icons/chevron-left.svg"}
                alt="Back"
                width={20}
                height={20}
              />
            </button>
            <h2 className="font-bold text-[var(--natural-100)] text-lg">
              Apply Front End at Rakamin
            </h2>
          </div>
          <p className="text-xs text-[var(--natural-70)]">
            ℹ️ This field required to fill
          </p>
        </div>

        <form className="px-10 pb-10 space-y-5">
          <p className="text-sm text-red-500 font-bold">* Required</p>

          <div className="flex flex-col justify-start">
            <label className="block text-sm text-[var(--natural-90)] font-bold mb-2">
              Photo Profile
            </label>
            <div className="flex flex-col items-start">
              <div className="w-24 h-24 rounded-lg overflow-hidden mb-2">
                <Image
                  src={photo}
                  alt="Profile"
                  width={96}
                  height={96}
                  className="object-cover w-full h-full"
                />
              </div>
              <label
                onClick={() => setOpen(true)}
                className="flex items-center gap-2 border border-[var(--natural-40)] rounded-md px-3 py-1 text-sm cursor-pointer hover:bg-[var(--primary-color)] hover:text-white transition"
              >
                <CameraIcon /> Take a Picture
              </label>
              <input
                id="photo"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleUpload}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--natural-90)] mb-1">
              Full name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full border border-[var(--natural-40)] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--natural-90)] mb-1">
              Date of birth <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              className="w-full border border-[var(--natural-40)] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--natural-90)] mb-1">
              Pronoun (gender) <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-4">
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  className="accent-[var(--primary-color)]"
                />
                <span className="text-sm text-[var(--natural-80)]">
                  She/her (Female)
                </span>
              </label>
              <label className="flex items-center gap-1">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  className="accent-[var(--primary-color)]"
                />
                <span className="text-sm text-[var(--natural-80)]">
                  He/him (Male)
                </span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--natural-90)] mb-1">
              Domicile <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Choose your domicile"
              className="w-full border border-[var(--natural-40)] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--natural-90)] mb-1">
              Phone number <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center border border-[var(--natural-40)] rounded-md">
              <span className="px-3 text-sm text-[var(--natural-80)]">+62</span>
              <input
                type="tel"
                placeholder="81XXXXXXXXXX"
                className="flex-1 px-2 py-2 text-sm focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--natural-90)] mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full border border-[var(--natural-40)] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--natural-90)] mb-1">
              Link LinkedIn <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              placeholder="https://linkedin.com/in/username"
              className="w-full border border-[var(--natural-40)] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[var(--primary-color)] text-white rounded-md py-2 font-medium hover:opacity-90 transition"
          >
            Submit
          </button>
        </form>
      </div>

      <WebcamModal
        open={open}
        onClose={() => setOpen(false)}
        onCapture={(image) => {
          setPhoto(image);
          setOpen(false);
        }}
      />
    </div>
  );
}
