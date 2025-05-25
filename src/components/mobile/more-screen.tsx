import { ArrowRight, Brain, FileText, Shield, Users } from "lucide-react";
import React from "react";

const MoreScreen = () => {
  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white p-4 flex items-center justify-between shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">More</h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 overflow-y-auto pb-28">
        <div className="space-y-6">
          {/* Help Section */}
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-3">
              Bantuan & Dukungan
            </h2>
            <div className="space-y-3">
              {[
                {
                  icon: FileText,
                  title: "FAQ",
                  subtitle: "Pertanyaan yang sering diajukan",
                },
                {
                  icon: Users,
                  title: "Hubungi HR",
                  subtitle: "Kontak departemen HR",
                },
                {
                  icon: Shield,
                  title: "Panduan Tes",
                  subtitle: "Cara mengerjakan tes psikologi",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-4"
                >
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <item.icon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 text-sm">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-600">{item.subtitle}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                </div>
              ))}
            </div>
          </div>

          {/* App Info */}
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-3">
              Tentang Aplikasi
            </h2>
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                  <Brain className="h-8 w-8 text-white" />
                </div>
                <h3 className="font-bold text-gray-800 mb-1">
                  Syntegra Psikotes
                </h3>
                <p className="text-sm text-gray-600 mb-2">Versi 1.0.0</p>
                <p className="text-xs text-gray-500">
                  © 2025 Syntegra Services
                </p>
                <p className="text-xs  font-semibold">
                  Dikembangkan oleh{" "}
                  <a
                    href="https://oknum.studio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-600 font-bold hover:underline transition-colors"
                  >
                    Oknum Studio
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoreScreen;
