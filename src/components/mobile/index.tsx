"use client";

import React, { useState } from "react";
import TestScreen from "./test-screen";
import ResultScreen from "./result-screen";
import HasilScreen from "./hasil-screen";
import ProfileScreen from "./profile-screen";
import MoreScreen from "./more-screen";
import DashboardScreen from "./dashboard-screen";
import HomeScereen from "./home-screen";
import BottomNavigation from "./bottom-navigation";

const MobileDemo = () => {
  const [currentScreen, setCurrentScreen] = useState("home");
  const [activeTab, setActiveTab] = useState("home");

  const getCurrentScreen = () => {
    // Handle test flow screens
    if (currentScreen === "test")
      return (
        <TestScreen
          setActiveTab={setActiveTab}
          setCurrentScreen={setCurrentScreen}
        />
      );
    if (currentScreen === "result")
      return (
        <ResultScreen
          setActiveTab={setActiveTab}
          setCurrentScreen={setCurrentScreen}
        />
      );

    // Handle tab navigation screens
    if (activeTab === "hasil") return <HasilScreen />;
    if (activeTab === "profile") return <ProfileScreen />;
    if (activeTab === "more") return <MoreScreen />;

    // Default screens
    if (currentScreen === "dashboard" || activeTab === "home")
      return (
        <DashboardScreen
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setCurrentScreen={setCurrentScreen}
        />
      );
    return <HomeScereen setCurrentScreen={setCurrentScreen} />;
  };

  return (
    <div className="relative">
      {/* Phone Frame - Larger Size */}
      <div className="w-96 h-[700px] bg-black rounded-[3rem] p-3 shadow-2xl mx-auto">
        {/* Screen */}
        <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
          {/* Realistic Status Bar */}
          <div className="bg-gray-900 text-white text-sm flex justify-between items-center px-6 py-2 relative z-10">
            <span className="font-semibold">9:41</span>
            <div className="flex items-center gap-1">
              {/* Signal bars */}
              <div className="flex gap-1">
                <div className="w-1 h-3 bg-white rounded-full"></div>
                <div className="w-1 h-3 bg-white rounded-full"></div>
                <div className="w-1 h-3 bg-white rounded-full"></div>
                <div className="w-1 h-3 bg-white/60 rounded-full"></div>
              </div>
              {/* WiFi */}
              <svg className="w-4 h-4 ml-1" fill="white" viewBox="0 0 20 20">
                <path d="M16.338 14.784l-2.848-2.858a5.985 5.985 0 00-6.98 0l-2.848 2.858a1 1 0 01-1.414-1.414l2.848-2.858a7.985 7.985 0 019.808 0l2.848 2.858a1 1 0 01-1.414 1.414z" />
              </svg>
              {/* Battery */}
              <div className="w-6 h-3 border border-white rounded-sm ml-1">
                <div className="w-5 h-2 bg-white rounded-sm m-0.5"></div>
              </div>
            </div>
            <span className="font-semibold">100%</span>
          </div>

          {/* App Content */}
          <div className="h-[calc(100%-2rem)] relative">
            {getCurrentScreen()}

            {/* Show bottom navigation except for login, test, and result screens */}
            {currentScreen !== "home" &&
              currentScreen !== "test" &&
              currentScreen !== "result" && (
                <BottomNavigation
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  setCurrentScreen={setCurrentScreen}
                />
              )}
          </div>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3">
        {["home", "dashboard", "test", "result"].map((screen) => (
          <button
            key={screen}
            onClick={() => {
              setCurrentScreen(screen);
              if (screen === "dashboard") setActiveTab("home");
            }}
            className={`h-3 rounded-full transition-all duration-300 ${
              currentScreen === screen
                ? "bg-yellow-600 w-8"
                : "bg-gray-400 w-3 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default MobileDemo;
