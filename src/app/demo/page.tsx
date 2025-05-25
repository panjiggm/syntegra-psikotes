"use client";

import React, { useState, useEffect } from "react";
import {
  User,
  Brain,
  Clock,
  Shield,
  CheckCircle,
  Download,
  Smartphone,
  Star,
  Users,
  Award,
  Play,
  Home,
  Bell,
  Settings,
  LogIn,
} from "lucide-react";

const MobileAppDemo = () => {
  const [currentScreen, setCurrentScreen] = useState("home");
  const [isInstallPromptVisible, setIsInstallPromptVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInstallPromptVisible(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      icon: Brain,
      title: "15+ Modul Tes",
      description: "DISC, Big Five, IQ Test",
    },
    {
      icon: Clock,
      title: "Fleksibel Waktu",
      description: "Kerjakan kapan saja",
    },
    {
      icon: Shield,
      title: "Aman & Terpercaya",
      description: "Data terenkripsi",
    },
    {
      icon: Award,
      title: "Hasil Instant",
      description: "Feedback langsung",
    },
  ];

  const renderHomeScreen = () => (
    <div className="h-full overflow-y-auto">
      {/* PWA Install Prompt */}
      {isInstallPromptVisible && (
        <div className="bg-blue-600 text-white p-2 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Download className="h-3 w-3" />
            <span>Install app</span>
          </div>
          <button
            onClick={() => setIsInstallPromptVisible(false)}
            className="text-white/80 hover:text-white text-sm"
          >
            ✕
          </button>
        </div>
      )}

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-4 text-center">
        <div className="w-12 h-12 bg-white/20 rounded-full mx-auto mb-3 flex items-center justify-center">
          <Brain className="h-6 w-6" />
        </div>
        <h1 className="text-lg font-bold mb-1">Syntegra Psikotes</h1>
        <p className="text-blue-100 text-xs">Platform psikotes digital</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 p-3 bg-white border-b">
        <div className="text-center">
          <div className="text-lg font-bold text-blue-600">15+</div>
          <div className="text-xs text-gray-600">Modul</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-green-600">98%</div>
          <div className="text-xs text-gray-600">Akurasi</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-purple-600">50K+</div>
          <div className="text-xs text-gray-600">User</div>
        </div>
      </div>

      {/* Features */}
      <div className="p-3 space-y-2">
        <h2 className="text-sm font-bold text-gray-800 mb-2">Fitur Utama</h2>
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg"
          >
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <feature.icon className="h-4 w-4 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-gray-800 text-xs">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-xs">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="p-3 space-y-2">
        <button
          onClick={() => setCurrentScreen("login")}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-2.5 rounded-lg font-medium text-sm flex items-center justify-center gap-2"
        >
          <LogIn className="h-4 w-4" />
          Mulai Tes Sekarang
        </button>

        <button
          onClick={() => setCurrentScreen("demo")}
          className="w-full border border-blue-600 text-blue-600 py-2.5 rounded-lg font-medium text-sm flex items-center justify-center gap-2"
        >
          <Play className="h-4 w-4" />
          Lihat Demo
        </button>
      </div>

      {/* Testimonial */}
      <div className="p-3 bg-gray-50 m-3 rounded-lg">
        <div className="flex items-center gap-1 mb-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />
          ))}
        </div>
        <p className="text-gray-700 text-xs mb-1">
          "Interface yang mudah digunakan!"
        </p>
        <div className="text-xs text-gray-600">
          <strong>Sarah W.</strong> - PT Tech Indonesia
        </div>
      </div>
    </div>
  );

  const renderLoginScreen = () => (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-white border-b p-4 flex items-center">
        <button
          onClick={() => setCurrentScreen("home")}
          className="mr-3 text-gray-600"
        >
          ←
        </button>
        <h1 className="text-lg font-semibold">Login Peserta</h1>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 flex flex-col justify-center">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
            <User className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Selamat Datang
          </h2>
          <p className="text-gray-600 text-sm">
            Masukkan kode tes yang diberikan HR
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Kode Tes
            </label>
            <input
              type="text"
              placeholder="Contoh: PSI2025001"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              defaultValue="PSI2025001"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nama Lengkap
            </label>
            <input
              type="text"
              placeholder="Masukkan nama lengkap"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              defaultValue="Ahmad Fauzi Rahman"
            />
          </div>

          <button
            onClick={() => setCurrentScreen("dashboard")}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium"
          >
            Masuk ke Tes
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Butuh bantuan? Hubungi HR Anda
          </p>
        </div>
      </div>
    </div>
  );

  const renderDashboardScreen = () => (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-4">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-lg font-semibold">Dashboard</h1>
          <Bell className="h-5 w-5" />
        </div>
        <p className="text-blue-100 text-sm">Halo, Ahmad Fauzi Rahman</p>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-4">
          {/* Progress */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-green-800">
                Progress Tes
              </span>
            </div>
            <div className="w-full bg-green-200 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full"
                style={{ width: "60%" }}
              ></div>
            </div>
            <p className="text-xs text-green-700 mt-1">3 dari 5 tes selesai</p>
          </div>

          {/* Available Tests */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Tes Tersedia
            </h2>
            <div className="space-y-3">
              {[
                {
                  name: "DISC Assessment",
                  status: "completed",
                  duration: "20 menit",
                  score: "85",
                },
                {
                  name: "Big Five Personality",
                  status: "completed",
                  duration: "15 menit",
                  score: "78",
                },
                {
                  name: "IQ Test",
                  status: "completed",
                  duration: "45 menit",
                  score: "112",
                },
                {
                  name: "Emotional Intelligence",
                  status: "available",
                  duration: "25 menit",
                },
                {
                  name: "Leadership Style",
                  status: "locked",
                  duration: "30 menit",
                },
              ].map((test, index) => (
                <div key={index} className="bg-white border rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-800 text-sm">
                        {test.name}
                      </h3>
                      <p className="text-xs text-gray-600">
                        Durasi: {test.duration}
                      </p>
                      {test.score && (
                        <p className="text-xs text-green-600 font-medium">
                          Skor: {test.score}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {test.status === "completed" && (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                          Selesai
                        </span>
                      )}
                      {test.status === "available" && (
                        <button
                          onClick={() => setCurrentScreen("test")}
                          className="bg-blue-600 text-white text-xs px-3 py-1 rounded"
                        >
                          Mulai
                        </button>
                      )}
                      {test.status === "locked" && (
                        <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                          Terkunci
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bg-white border-t flex">
        <button className="flex-1 p-3 text-center">
          <Home className="h-5 w-5 mx-auto text-blue-600" />
          <span className="text-xs text-blue-600 font-medium">Home</span>
        </button>
        <button className="flex-1 p-3 text-center">
          <User className="h-5 w-5 mx-auto text-gray-400" />
          <span className="text-xs text-gray-400">Profile</span>
        </button>
        <button className="flex-1 p-3 text-center">
          <Settings className="h-5 w-5 mx-auto text-gray-400" />
          <span className="text-xs text-gray-400">Setting</span>
        </button>
      </div>
    </div>
  );

  const renderTestScreen = () => (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-white border-b p-4">
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={() => setCurrentScreen("dashboard")}
            className="text-gray-600"
          >
            ←
          </button>
          <h1 className="text-lg font-semibold">Emotional Intelligence</h1>
          <span className="text-sm text-gray-600">15:23</span>
        </div>

        {/* Progress */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full"
            style={{ width: "40%" }}
          ></div>
        </div>
        <p className="text-xs text-gray-600 mt-1">Soal 8 dari 20</p>
      </div>

      {/* Question */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Ketika menghadapi konflik di tempat kerja, saya biasanya:
          </h2>

          <div className="space-y-3">
            {[
              "Langsung mengatasi masalah secara tegas",
              "Mencari solusi yang menguntungkan semua pihak",
              "Menganalisis akar masalah dengan teliti",
              "Membantu meredakan suasana dengan humor",
            ].map((option, index) => (
              <label
                key={index}
                className="flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
              >
                <input type="radio" name="question" className="mt-1" />
                <span className="text-sm text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="bg-white border-t p-4 flex gap-3">
        <button className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg">
          Sebelumnya
        </button>
        <button
          onClick={() => setCurrentScreen("result")}
          className="flex-1 bg-blue-600 text-white py-2 rounded-lg"
        >
          Selanjutnya
        </button>
      </div>
    </div>
  );

  const renderResultScreen = () => (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white p-4 text-center">
        <CheckCircle className="h-12 w-12 mx-auto mb-2" />
        <h1 className="text-lg font-bold">Tes Selesai!</h1>
        <p className="text-green-100 text-sm">
          Terima kasih atas partisipasinya
        </p>
      </div>

      {/* Results */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-4">
          {/* Score Summary */}
          <div className="bg-white border rounded-lg p-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              Hasil Tes
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">82</div>
                <div className="text-xs text-gray-600">Skor EQ</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">Tinggi</div>
                <div className="text-xs text-gray-600">Level</div>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">Ringkasan</h3>
            <p className="text-sm text-blue-800">
              Anda menunjukkan kemampuan emotional intelligence yang baik dengan
              skor 82. Hal ini menunjukkan kemampuan yang solid dalam mengenali
              dan mengelola emosi.
            </p>
          </div>

          {/* Next Steps */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-2">
              Langkah Selanjutnya
            </h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Hasil lengkap akan dikirim via email</li>
              <li>• HR akan menghubungi untuk tahap selanjutnya</li>
              <li>• Simpan kode tes untuk referensi</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="bg-white border-t p-4 space-y-2">
        <button
          onClick={() => setCurrentScreen("dashboard")}
          className="w-full bg-blue-600 text-white py-2 rounded-lg"
        >
          Kembali ke Dashboard
        </button>
        <button className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg">
          Download Hasil (PDF)
        </button>
      </div>
    </div>
  );

  const getCurrentScreen = () => {
    switch (currentScreen) {
      case "login":
        return renderLoginScreen();
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col items-center justify-center p-4">
      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          DEMO MOBILE APPLICATION
        </h1>
        <p className="text-gray-600">
          Syntegra Psikotes - Platform Digital untuk Peserta
        </p>
      </div>

      {/* Mobile Frame */}
      <div className="relative">
        {/* Phone Frame */}
        <div className="w-80 h-[600px] bg-black rounded-[2.5rem] p-2 shadow-2xl">
          {/* Screen */}
          <div className="w-full h-full bg-white rounded-[2rem] overflow-hidden relative">
            {/* Status Bar */}
            <div className="bg-gray-900 text-white text-xs flex justify-between items-center px-4 py-1 relative z-10">
              <span>9:41</span>
              <div className="flex items-center gap-1">
                <div className="w-4 h-2 border border-white rounded-sm">
                  <div className="w-3 h-1 bg-white rounded-sm"></div>
                </div>
              </div>
              <span>100%</span>
            </div>

            {/* App Content */}
            <div className="h-[calc(100%-1.5rem)]">{getCurrentScreen()}</div>
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 flex gap-2">
          {["home", "login", "dashboard", "test", "result"].map((screen) => (
            <button
              key={screen}
              onClick={() => setCurrentScreen(screen)}
              className={`w-2 h-2 rounded-full transition-all ${
                currentScreen === screen ? "bg-blue-600 w-6" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Info Section */}
      <div className="mt-16 max-w-2xl text-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Tentang Demo Mobile App
        </h2>
        <div className="grid md:grid-cols-3 gap-6 text-sm text-gray-600">
          <div className="flex flex-col items-center">
            <Smartphone className="h-8 w-8 text-blue-600 mb-2" />
            <strong className="text-gray-800">Mobile First</strong>
            <p>Dioptimalkan untuk penggunaan di smartphone</p>
          </div>
          <div className="flex flex-col items-center">
            <Users className="h-8 w-8 text-green-600 mb-2" />
            <strong className="text-gray-800">User Friendly</strong>
            <p>Interface yang mudah digunakan untuk semua kalangan</p>
          </div>
          <div className="flex flex-col items-center">
            <Shield className="h-8 w-8 text-purple-600 mb-2" />
            <strong className="text-gray-800">Secure & Reliable</strong>
            <p>Sistem keamanan tinggi dan hasil yang akurat</p>
          </div>
        </div>

        <div className="mt-6 text-xs text-gray-500">
          <p>
            © 2025 Syntegra Services | Dikembangkan oleh{" "}
            <strong className="text-emerald-600">Oknum Studio</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MobileAppDemo;
