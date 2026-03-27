import { CameraIcon } from "lucide-react";
import React from "react";
import { useState } from "react";
import useAuthUser from "../hooks/useAuthUser.js";

const OnboardingPage = () => {

    const {authUser} = useAuthUser()

  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    skill: authUser?.skill || "",
    language: authUser?.language || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
  });

  return (
    <div
      className="min-h-screen bg-base-100 flex items-center justify-center p-4"
      data-theme="dark"
    >
      <div className="card bg-base-200 w-full max-w-3xl shadow-xl">
        <div className="card-body p-6 sm:p-8">
          <h1 className="Capitalize text-2xl sm:text-3xl font-bold text-center mb-6">
            Complete Your Profile
          </h1>

          <form className="space-y-5">
            {/* PROFILE PIC CONTAINER */}
            <div className="flex flex-col items-center justify-center space-y-4">
              {/* IMAGE PREVIEW */}
              <div className="size-32 rounded-full bg-base-300 overflow-hidden">
                {formState.profilePic ? (
                  <img
                    className="w-full h-full object-cover"
                    src={formState.profilePic}
                    alt="Profile Preview"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <CameraIcon className="size-12 text-base-content opacity-40" />
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
