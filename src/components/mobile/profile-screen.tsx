import {
  ArrowRight,
  Bell,
  FileText,
  Settings,
  Shield,
  User,
} from "lucide-react";
import React from "react";

const ProfileScreen = () => {
  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white p-4 flex items-center justify-between shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Profile</h1>
        </div>
      </div>

      {/* Profile Info */}
      <div className="bg-white p-5 text-center border-b border-gray-100">
        <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full mx-auto mb-4 flex items-center justify-center">
          <span className="text-white font-bold text-2xl">A</span>
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-1">
          Ahmad Fauzi Rahman
        </h2>
        <p className="text-gray-600">ahmadfauzi@gmail.com</p>
        <p className="text-sm text-gray-500 mt-2">Kode Tes: PSI2025001</p>
      </div>

      {/* Menu Options */}
      <div className="flex-1 p-4 pb-20">
        <div className="space-y-3">
          {[
            {
              icon: User,
              title: "Edit Profile",
              subtitle: "Ubah informasi personal",
            },
            {
              icon: Bell,
              title: "Notifikasi",
              subtitle: "Pengaturan pemberitahuan",
            },
            {
              icon: Shield,
              title: "Keamanan",
              subtitle: "Password dan keamanan akun",
            },
            {
              icon: FileText,
              title: "Riwayat Tes",
              subtitle: "Lihat semua tes yang pernah dikerjakan",
            },
            {
              icon: Settings,
              title: "Pengaturan",
              subtitle: "Preferensi aplikasi",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-4"
            >
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <item.icon className="h-5 w-5 text-gray-600" />
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
    </div>
  );
};

export default ProfileScreen;
