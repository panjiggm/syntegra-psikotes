import {
  ArrowRight,
  Bell,
  Brain,
  Heart,
  MoreHorizontal,
  Play,
  Shield,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import React, { Dispatch, SetStateAction } from "react";
import BottomNavigation from "./bottom-navigation";

const DashboardScreen = ({
  setCurrentScreen,
  setActiveTab,
  activeTab,
}: {
  setCurrentScreen: Dispatch<SetStateAction<string>>;
  setActiveTab: Dispatch<SetStateAction<string>>;
  activeTab: string;
}) => {
  return (
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

      <BottomNavigation
        setCurrentScreen={setCurrentScreen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </div>
  );
};

export default DashboardScreen;
