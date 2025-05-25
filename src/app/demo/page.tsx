import MobileDemoBox from "@/components/MobileDemoBox";
import React from "react";

const DemoPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Title Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-black text-gray-800 mb-4">
          DEMO MOBILE APPLICATION
        </h1>
        <p className="text-lg md:text-xl text-gray-600 font-medium">
          Syntegra Psikotes - Platform Digital untuk Peserta
        </p>
      </div>

      {/* Mobile Demo Box - Larger */}
      <div className="flex-1 flex items-center justify-center">
        <MobileDemoBox />
      </div>

      {/* Footer */}
      <div className="mt-12 text-center">
        <p className="text-sm text-gray-500">
          © 2025 Syntegra Services | Dikembangkan oleh{" "}
          <a
            href="https://oknum.studio"
            className="text-emerald-600 font-bold hover:underline transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Oknum Studio
          </a>
        </p>
      </div>
    </div>
  );
};

export default DemoPage;
