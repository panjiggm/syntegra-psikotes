import React, { Dispatch, SetStateAction } from "react";

const TestScreen = ({
  setCurrentScreen,
  setActiveTab,
}: {
  setCurrentScreen: Dispatch<SetStateAction<string>>;
  setActiveTab: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={() => {
              setCurrentScreen("dashboard");
              setActiveTab("home");
            }}
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            ←
          </button>
          <h1 className="text-lg font-bold text-gray-800">Emotional IQ</h1>
          <span className="text-sm font-bold text-yellow-600 bg-yellow-100 px-3 py-1 rounded-full">
            15:23
          </span>
        </div>

        {/* Progress */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
          <div
            className="bg-gradient-to-r from-yellow-400 to-amber-500 h-2 rounded-full transition-all duration-300"
            style={{ width: "40%" }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 font-medium">Soal 8 dari 20</p>
      </div>

      {/* Question */}
      <div className="flex-1 p-5 overflow-y-auto">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6 leading-relaxed">
            Ketika menghadapi konflik di tempat kerja, saya biasanya:
          </h2>

          <div className="space-y-4">
            {[
              "Langsung mengatasi masalah secara tegas",
              "Mencari solusi yang menguntungkan semua pihak",
              "Menganalisis akar masalah dengan teliti",
              "Membantu meredakan suasana dengan humor",
            ].map((option, index) => (
              <label
                key={index}
                className="flex items-start gap-4 p-4 border-2 border-gray-200 rounded-xl cursor-pointer hover:border-yellow-300 hover:bg-yellow-50 transition-all"
              >
                <input
                  type="radio"
                  name="question"
                  className="mt-1 text-yellow-500 focus:ring-yellow-500"
                />
                <span className="text-sm text-gray-700 font-medium leading-relaxed">
                  {option}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="bg-white border-t border-gray-200 p-4 flex gap-3 shadow-lg">
        <button className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
          Sebelumnya
        </button>
        <button
          onClick={() => setCurrentScreen("result")}
          className="flex-1 bg-gradient-to-r from-yellow-400 to-amber-500 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-shadow"
        >
          Selanjutnya
        </button>
      </div>
    </div>
  );
};

export default TestScreen;
