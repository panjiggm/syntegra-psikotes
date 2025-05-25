import { Brain } from "lucide-react";
import React, { Dispatch } from "react";

const HomeScereen = ({
  setCurrentScreen,
}: {
  setCurrentScreen: Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header - Jago Style */}
      <div className="bg-white p-6 text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg">
          <Brain className="h-8 w-8 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Syntegra Psikotes
        </h1>
        <p className="text-gray-600 text-sm">Platform psikotes digital</p>
      </div>

      {/* Login Form */}
      <div className="flex-1 px-6 flex flex-col justify-center">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Kode Tes
            </label>
            <input
              type="text"
              placeholder="Masukkan kode tes"
              className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors text-center font-medium"
              defaultValue="PSI2025001"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Nama Lengkap
            </label>
            <input
              type="text"
              placeholder="Masukkan nama lengkap"
              className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors text-center font-medium"
              defaultValue="Ahmad Fauzi Rahman"
            />
          </div>

          <button
            onClick={() => setCurrentScreen("dashboard")}
            className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all"
          >
            Masuk ke Tes
          </button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Butuh bantuan? Hubungi HR Anda
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomeScereen;
