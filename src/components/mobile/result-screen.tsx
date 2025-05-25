import { CheckCircle } from "lucide-react";
import React, { Dispatch, SetStateAction } from "react";

const ResultScreen = ({
  setCurrentScreen,
  setActiveTab,
}: {
  setCurrentScreen: Dispatch<SetStateAction<string>>;
  setActiveTab: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-yellow-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-400 to-amber-500 text-white p-6 text-center">
        <CheckCircle className="h-16 w-16 mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Tes Selesai!</h1>
        <p className="text-yellow-100">Terima kasih atas partisipasinya</p>
      </div>

      {/* Results */}
      <div className="flex-1 p-5 overflow-y-auto">
        <div className="space-y-5">
          {/* Score Summary */}
          <div className="bg-white rounded-xl p-5 shadow-lg border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Hasil Tes</h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-yellow-500 to-amber-600 bg-clip-text text-transparent mb-1">
                  82
                </div>
                <div className="text-sm text-gray-600 font-medium">Skor EQ</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-1">
                  Tinggi
                </div>
                <div className="text-sm text-gray-600 font-medium">Level</div>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-xl p-5">
            <h3 className="font-bold text-yellow-900 mb-3">Ringkasan Hasil</h3>
            <p className="text-sm text-yellow-800 leading-relaxed">
              Anda menunjukkan kemampuan emotional intelligence yang baik dengan
              skor 82. Hal ini menunjukkan kemampuan yang solid dalam mengenali
              dan mengelola emosi dengan efektif.
            </p>
          </div>

          {/* Next Steps */}
          <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
            <h3 className="font-bold text-gray-800 mb-3">
              Langkah Selanjutnya
            </h3>
            <ul className="text-sm text-gray-700 space-y-2 leading-relaxed">
              <li>✅ Hasil lengkap akan dikirim via email</li>
              <li>✅ HR akan menghubungi untuk tahap selanjutnya</li>
              <li>✅ Simpan kode tes untuk referensi</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="bg-white border-t border-gray-200 p-4 space-y-3 shadow-lg">
        <button
          onClick={() => {
            setCurrentScreen("dashboard");
            setActiveTab("home");
          }}
          className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-shadow"
        >
          Kembali ke Dashboard
        </button>
        <button className="w-full border-2 border-gray-300 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
          Download Hasil (PDF)
        </button>
      </div>
    </div>
  );
};

export default ResultScreen;
