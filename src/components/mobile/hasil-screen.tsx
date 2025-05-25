import { Brain } from "lucide-react";
import React from "react";

const HasilScreen = () => {
  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white p-4 flex items-center justify-between shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Hasil Tes</h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 overflow-y-auto pb-20">
        <div className="space-y-4">
          {/* Completed Tests */}
          {[
            {
              name: "DISC Assessment",
              score: "85",
              date: "15 Jan 2025",
              color: "from-green-500 to-emerald-600",
              status: "Excellent",
            },
            {
              name: "Big Five Personality",
              score: "78",
              date: "14 Jan 2025",
              color: "from-blue-500 to-indigo-600",
              status: "Good",
            },
            {
              name: "IQ Test",
              score: "112",
              date: "13 Jan 2025",
              color: "from-purple-500 to-violet-600",
              status: "Above Average",
            },
          ].map((test, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${test.color} rounded-xl flex items-center justify-center`}
                  >
                    <Brain className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 text-sm">
                      {test.name}
                    </h3>
                    <p className="text-xs text-gray-600">{test.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-800">
                    {test.score}
                  </div>
                  <div className="text-xs text-green-600 font-medium">
                    {test.status}
                  </div>
                </div>
              </div>
              <button className="w-full border border-yellow-500 text-yellow-600 py-2 rounded-lg text-sm font-medium hover:bg-yellow-50 transition-colors">
                Lihat Detail
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HasilScreen;
