import { FileText, Home, MoreHorizontal, User } from "lucide-react";
import React, { Dispatch } from "react";

const BottomNavigation = ({
  setCurrentScreen,
  setActiveTab,
  activeTab,
}: {
  setCurrentScreen: Dispatch<React.SetStateAction<string>>;
  setActiveTab: Dispatch<React.SetStateAction<string>>;
  activeTab: string;
}) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex shadow-lg">
      <button
        onClick={() => {
          setActiveTab("home");
          setCurrentScreen("dashboard");
        }}
        className="flex-1 p-4 text-center"
      >
        <Home
          className={`h-6 w-6 mx-auto mb-1 ${
            activeTab === "home" ? "text-yellow-500" : "text-gray-400"
          }`}
        />
        <span
          className={`text-xs font-semibold ${
            activeTab === "home" ? "text-yellow-500" : "text-gray-400"
          }`}
        >
          Home
        </span>
      </button>
      <button
        onClick={() => {
          setActiveTab("hasil");
          setCurrentScreen("dashboard");
        }}
        className="flex-1 p-4 text-center"
      >
        <FileText
          className={`h-6 w-6 mx-auto mb-1 ${
            activeTab === "hasil" ? "text-yellow-500" : "text-gray-400"
          }`}
        />
        <span
          className={`text-xs font-semibold ${
            activeTab === "hasil" ? "text-yellow-500" : "text-gray-400"
          }`}
        >
          Hasil
        </span>
      </button>
      <button
        onClick={() => {
          setActiveTab("profile");
          setCurrentScreen("dashboard");
        }}
        className="flex-1 p-4 text-center"
      >
        <User
          className={`h-6 w-6 mx-auto mb-1 ${
            activeTab === "profile" ? "text-yellow-500" : "text-gray-400"
          }`}
        />
        <span
          className={`text-xs font-semibold ${
            activeTab === "profile" ? "text-yellow-500" : "text-gray-400"
          }`}
        >
          Profile
        </span>
      </button>
      <button
        onClick={() => {
          setActiveTab("more");
          setCurrentScreen("dashboard");
        }}
        className="flex-1 p-4 text-center"
      >
        <MoreHorizontal
          className={`h-6 w-6 mx-auto mb-1 ${
            activeTab === "more" ? "text-yellow-500" : "text-gray-400"
          }`}
        />
        <span
          className={`text-xs font-semibold ${
            activeTab === "more" ? "text-yellow-500" : "text-gray-400"
          }`}
        >
          More
        </span>
      </button>
    </div>
  );
};

export default BottomNavigation;
