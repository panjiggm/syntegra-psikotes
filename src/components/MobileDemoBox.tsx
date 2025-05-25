"use client";

import React, { useState } from "react";
import {
  User,
  Brain,
  Shield,
  CheckCircle,
  ArrowRight,
  Users,
  Play,
  Home,
  Bell,
  MoreHorizontal,
  Target,
  FileText,
  TrendingUp,
  Heart,
} from "lucide-react";

const MobileDemoBox = () => {
  const [currentScreen, setCurrentScreen] = useState("home");

  const renderHomeScreen = () => (
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

  const renderDashboardScreen = () => (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header - Jago Style */}
      <div className="bg-white p-4 flex items-center justify-between shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Psikotes</h1>
        </div>
        <div className="flex items-center gap-3">
          <MoreHorizontal className="h-6 w-6 text-gray-600" />
          <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
            <Bell className="h-5 w-5 text-gray-600" />
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="bg-white px-4 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">A</span>
          </div>
          <div>
            <p className="font-semibold text-gray-800">AHMAD FAUZI RAHMAN</p>
            <p className="text-sm text-gray-600">panjiggm@gmail.com</p>
          </div>
        </div>
      </div>

      {/* Progress Card */}
      <div className="px-4 mb-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-gray-700">
              Progress Tes
            </span>
            <span className="text-sm text-yellow-600 font-semibold">
              3/5 Selesai
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-yellow-400 to-amber-500 h-2 rounded-full"
              style={{ width: "60%" }}
            ></div>
          </div>
        </div>
      </div>

      {/* Modul Tes - Card Grid Jago Style */}
      <div className="flex-1 px-4 overflow-y-auto pb-28">
        <div className="grid grid-cols-2 gap-3">
          {/* DISC Assessment */}
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-4 text-white shadow-lg">
            <div className="flex justify-between items-start mb-3">
              <Target className="h-8 w-8" />
              <span className="bg-white/20 text-xs px-2 py-1 rounded-full font-medium">
                Selesai
              </span>
            </div>
            <h3 className="font-bold text-sm mb-1">DISC Assessment</h3>
            <p className="text-xs text-green-100 mb-2">
              Kepribadian & Perilaku
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-green-100">Skor: 85</span>
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>

          {/* Big Five */}
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-4 text-white shadow-lg">
            <div className="flex justify-between items-start mb-3">
              <Users className="h-8 w-8" />
              <span className="bg-white/20 text-xs px-2 py-1 rounded-full font-medium">
                Selesai
              </span>
            </div>
            <h3 className="font-bold text-sm mb-1">Big Five</h3>
            <p className="text-xs text-blue-100 mb-2">
              Kepribadian Lima Faktor
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-blue-100">Skor: 78</span>
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>

          {/* IQ Test */}
          <div className="bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl p-4 text-white shadow-lg">
            <div className="flex justify-between items-start mb-3">
              <Brain className="h-8 w-8" />
              <span className="bg-white/20 text-xs px-2 py-1 rounded-full font-medium">
                Selesai
              </span>
            </div>
            <h3 className="font-bold text-sm mb-1">IQ Test</h3>
            <p className="text-xs text-purple-100 mb-2">Tes Kecerdasan</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-purple-100">Skor: 112</span>
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>

          {/* Emotional Intelligence */}
          <div
            onClick={() => setCurrentScreen("test")}
            className="bg-gradient-to-br from-yellow-400 to-amber-500 rounded-xl p-4 text-white shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
          >
            <div className="flex justify-between items-start mb-3">
              <Heart className="h-8 w-8" />
              <span className="bg-white/20 text-xs px-2 py-1 rounded-full font-medium">
                Mulai
              </span>
            </div>
            <h3 className="font-bold text-sm mb-1">Emotional IQ</h3>
            <p className="text-xs text-yellow-100 mb-2">Kecerdasan Emosional</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-yellow-100">25 menit</span>
              <Play className="h-4 w-4" />
            </div>
          </div>

          {/* Leadership Style */}
          <div className="bg-gray-100 rounded-xl p-4 text-gray-500 shadow-sm">
            <div className="flex justify-between items-start mb-3">
              <TrendingUp className="h-8 w-8" />
              <span className="bg-gray-200 text-xs px-2 py-1 rounded-full font-medium">
                Terkunci
              </span>
            </div>
            <h3 className="font-bold text-sm mb-1">Leadership</h3>
            <p className="text-xs text-gray-400 mb-2">Gaya Kepemimpinan</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">30 menit</span>
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>

          {/* Stress Management */}
          <div className="bg-gray-100 rounded-xl p-4 text-gray-500 shadow-sm">
            <div className="flex justify-between items-start mb-3">
              <Shield className="h-8 w-8" />
              <span className="bg-gray-200 text-xs px-2 py-1 rounded-full font-medium">
                Terkunci
              </span>
            </div>
            <h3 className="font-bold text-sm mb-1">Stress Test</h3>
            <p className="text-xs text-gray-400 mb-2">Manajemen Stres</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-400">20 menit</span>
              <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex shadow-lg">
        <button className="flex-1 p-4 text-center">
          <Home className="h-6 w-6 mx-auto text-yellow-500 mb-1" />
          <span className="text-xs text-yellow-500 font-semibold">Home</span>
        </button>
        <button className="flex-1 p-4 text-center">
          <FileText className="h-6 w-6 mx-auto text-gray-400 mb-1" />
          <span className="text-xs text-gray-400">Hasil</span>
        </button>
        <button className="flex-1 p-4 text-center">
          <User className="h-6 w-6 mx-auto text-gray-400 mb-1" />
          <span className="text-xs text-gray-400">Profile</span>
        </button>
        <button className="flex-1 p-4 text-center">
          <MoreHorizontal className="h-6 w-6 mx-auto text-gray-400 mb-1" />
          <span className="text-xs text-gray-400">More</span>
        </button>
      </div>
    </div>
  );

  const renderTestScreen = () => (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={() => setCurrentScreen("dashboard")}
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

  const renderResultScreen = () => (
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
          onClick={() => setCurrentScreen("dashboard")}
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

  const getCurrentScreen = () => {
    switch (currentScreen) {
      case "dashboard":
        return renderDashboardScreen();
      case "test":
        return renderTestScreen();
      case "result":
        return renderResultScreen();
      default:
        return renderHomeScreen();
    }
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
          <div className="h-[calc(100%-2rem)]">{getCurrentScreen()}</div>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 flex gap-3">
        {["home", "dashboard", "test", "result"].map((screen) => (
          <button
            key={screen}
            onClick={() => setCurrentScreen(screen)}
            className={`h-3 rounded-full transition-all duration-300 ${
              currentScreen === screen
                ? "bg-yellow-500 w-8"
                : "bg-gray-300 w-3 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default MobileDemoBox;
