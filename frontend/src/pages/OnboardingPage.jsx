import { Activity, CameraIcon, CloudLightning, LoaderIcon, MapPinIcon, User } from "lucide-react";
import React from "react";
import { useState } from "react";
import useAuthUser from "../hooks/useAuthUser.js";
import useOnboard from "../hooks/useOnboard.js";
import Input from "../components/Input.jsx";
import SelectTag from "../components/SelectTag.jsx";
import { FIELDS, LANGUAGES } from "../constants/index.js";
import toast from "react-hot-toast";

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

  const {onboardingMutation, isPending} = useOnboard()

  const handleSubmit = (e)=>{
    e.preventDefault()
    onboardingMutation(formState)
  }

  const handleRandomAvatar = ()=> {
    const idx = Math.floor(Math.random() * 200) + 1
    const randomAvatar = `https://api.dicebear.com/9.x/micah/svg?seed=${idx}.jpg`

    setFormState({...formState, profilePic: randomAvatar})
    toast.success("Random profile picture generated!")
  }

  return (
    <div
      className="h-[100dvh] overflow-y-auto bg-gray-700 bg-base-100 flex lg:items-center justify-center p-4 "
      data-theme="dark"
    >
      <div className="bg-base-200 rounded-2xl h-[103dvh] md:rounded-3xl w-full mb-6 max-w-3xl shadow-xl">
        <div className="p-6 py-8  sm:p-8">
          <h1 className="Capitalize text-2xl sm:text-3xl font-bold text-center mb-6">
            Complete Your Profile
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">
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

              {/* generate random avatar btn */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleRandomAvatar}
                  className="btn btn-accent"
                >
                  <Activity className="size-4 mr-2"/>
                  Generate Random Avatar
                </button>
              </div>

            </div>

            {/* FORM TAGS */}
            {/* Full Name */}
            <Input
              icon={User}
              labelName={"Full Name"}
              name="fullName"
              type="text"
              placeholder="Enter Your Full Name"
              value={formState.fullName}
              onChange={(e)=>{
                setFormState({...formState, fullName: e.target.value})
              }}
            />

            {/* BIO */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Bio</span>
              </label>
              <textarea
                name="bio"
                value={formState.bio}
                onChange={(e) => {
                  setFormState({ ...formState, bio: e.target.value });
                }}
                className="textarea textarea-bordered h-24"
                placeholder="Tell about yourself and your hobbies."
              />
            </div>

            {/* SKILL AND LANGUAGE */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* SKILL */}
              <SelectTag
                labelName={"skill"}
                name="skill"
                value={formState.skill}
                onChange={(e)=>{
                  setFormState({...formState, skill: e.target.value})
                }}
                ArrayName={FIELDS}
              />

              {/* Langauge */}
              <SelectTag
                labelName={"language"}
                name="language"
                value={formState.language}
                onChange={(e)=>{
                  setFormState({...formState, language: e.target.value})
                }}
                ArrayName={LANGUAGES}
              />

            </div>

            {/* LOCATION */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Location</span>
              </label>
              <div className="relative">
                <MapPinIcon className="absolute top-1/2 transform -translate-y-1/2 left-3 size-5
                text-base-content opacity-70"/>
                <input 
                  type="text"
                  name="location"
                  value={formState.location}
                  onChange={(e)=>{
                    setFormState({...formState, location: e.target.value})
                  }}
                  className="input input-bordered w-full pl-10"
                  placeholder="City, Country"
                />
              </div>
            </div>

            {/* submit button */}
            <button className="btn btn-primary w-full"  disabled={isPending} type="submit">
                {!isPending ? (
                  <>
                    <CloudLightning className="size-5 mr-2"/>
                    Complete Onboarding
                  </>
                ) : (
                  <>
                    <LoaderIcon className="animate-spin size-5 mr-2"/>
                    Onboarding...
                  </>
                )}
            </button>
            
          </form>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
