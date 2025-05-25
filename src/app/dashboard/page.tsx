"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LayoutDashboard from "@/layout/LayoutDashboard";
import {
  Users,
  Brain,
  FileText,
  Clock,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Calendar,
} from "lucide-react";

// Data dummy untuk demo
const dashboardStats = {
  totalPeserta: 342,
  tesAktif: 28,
  modulTersedia: 15,
  rataRataWaktu: "24 menit",
  tingkatPenyelesaian: "87%",
  tesHariIni: 12,
  tesPerluReview: 8,
  modulPopuler: "DISC Assessment",
};

export default function DashboardPage() {
  return (
    <LayoutDashboard>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        {/* Header Section */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Dashboard Admin
          </h1>
          <p className="text-muted-foreground">
            Selamat datang di sistem manajemen psikotes Syntegra Services
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Peserta
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {dashboardStats.totalPeserta}
              </div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+12%</span> dari bulan lalu
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tes Aktif</CardTitle>
              <Brain className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {dashboardStats.tesAktif}
              </div>
              <p className="text-xs text-muted-foreground">
                Sedang berlangsung saat ini
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Modul Tersedia
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {dashboardStats.modulTersedia}
              </div>
              <p className="text-xs text-muted-foreground">
                Siap untuk digunakan
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Rata-rata Waktu
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {dashboardStats.rataRataWaktu}
              </div>
              <p className="text-xs text-muted-foreground">Per sesi tes</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          {/* Activity Overview */}
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Ringkasan Aktivitas
              </CardTitle>
              <CardDescription>
                Aktivitas tes psikotes dalam 7 hari terakhir
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Tingkat Penyelesaian</span>
                  <span className="font-semibold text-green-600">
                    {dashboardStats.tingkatPenyelesaian}
                  </span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full"
                    style={{ width: dashboardStats.tingkatPenyelesaian }}
                  ></div>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {dashboardStats.tesHariIni}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Tes Hari Ini
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">
                      {dashboardStats.tesPerluReview}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Perlu Review
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {dashboardStats.modulPopuler}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Modul Terpopuler
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Notifikasi Terbaru
              </CardTitle>
              <CardDescription>
                Update sistem dan aktivitas peserta
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">
                      Tes DISC berhasil diselesaikan
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Kandidat: Ahmad Fauzi • 2 menit lalu
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                    <Users className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">
                      5 peserta baru terdaftar
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Batch rekrutmen PT ABC • 1 jam lalu
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100">
                    <AlertCircle className="h-4 w-4 text-orange-600" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">
                      Sesi tes melebihi batas waktu
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Modul: Personality Test • 3 jam lalu
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                    <Brain className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">
                      Modul baru telah ditambahkan
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Emotional Intelligence Test • 1 hari lalu
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="text-center">
              <Users className="h-12 w-12 mx-auto text-primary mb-2" />
              <CardTitle>Tambah Peserta</CardTitle>
              <CardDescription>
                Daftarkan peserta baru untuk mengikuti tes psikotes
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="text-center">
              <Brain className="h-12 w-12 mx-auto text-primary mb-2" />
              <CardTitle>Buat Modul Baru</CardTitle>
              <CardDescription>
                Tambahkan modul psikotes dengan soal-soal kustomisasi
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="text-center">
              <FileText className="h-12 w-12 mx-auto text-primary mb-2" />
              <CardTitle>Lihat Laporan</CardTitle>
              <CardDescription>
                Analisis hasil tes dan generate laporan komprehensif
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </LayoutDashboard>
  );
}
