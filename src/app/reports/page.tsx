// src/app/reports/page.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import LayoutDashboard from "@/layout/LayoutDashboard";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  RadialBarChart,
  RadialBar,
} from "recharts";
import {
  Download,
  Filter,
  Calendar,
  Users,
  TrendingUp,
  Award,
  Brain,
  Target,
  FileText,
  PieChart as PieChartIcon,
  BarChart3,
  Activity,
} from "lucide-react";

// Data dummy untuk laporan
const reportData = {
  // Data per bulan
  monthlyData: [
    { month: "Jan 2024", total: 45, lulus: 32, tidakLulus: 13, completion: 71 },
    { month: "Feb 2024", total: 52, lulus: 38, tidakLulus: 14, completion: 73 },
    { month: "Mar 2024", total: 38, lulus: 28, tidakLulus: 10, completion: 74 },
    { month: "Apr 2024", total: 61, lulus: 44, tidakLulus: 17, completion: 72 },
    { month: "Mei 2024", total: 48, lulus: 35, tidakLulus: 13, completion: 73 },
    { month: "Jun 2024", total: 55, lulus: 42, tidakLulus: 13, completion: 76 },
  ],

  // Data berdasarkan jenis kelamin
  genderData: [
    {
      gender: "Laki-laki",
      total: 156,
      lulus: 115,
      tidakLulus: 41,
      percentage: 73.7,
    },
    {
      gender: "Perempuan",
      total: 143,
      lulus: 104,
      tidakLulus: 39,
      percentage: 72.7,
    },
  ],

  // Data berdasarkan usia
  ageData: [
    {
      ageRange: "20-25",
      total: 89,
      lulus: 62,
      tidakLulus: 27,
      percentage: 69.7,
    },
    {
      ageRange: "26-30",
      total: 112,
      lulus: 85,
      tidakLulus: 27,
      percentage: 75.9,
    },
    {
      ageRange: "31-35",
      total: 68,
      lulus: 52,
      tidakLulus: 16,
      percentage: 76.5,
    },
    {
      ageRange: "36-40",
      total: 30,
      lulus: 20,
      tidakLulus: 10,
      percentage: 66.7,
    },
  ],

  // Data berdasarkan domisili
  locationData: [
    { location: "Jakarta", total: 145, lulus: 108, tidakLulus: 37 },
    { location: "Tangerang", total: 82, lulus: 59, tidakLulus: 23 },
    { location: "Bekasi", total: 41, lulus: 29, tidakLulus: 12 },
    { location: "Depok", total: 31, lulus: 23, tidakLulus: 8 },
  ],

  // Data berdasarkan tipe tes
  testTypeData: [
    { type: "DISC Assessment", total: 299, avgScore: 78, completion: 95 },
    { type: "IQ Test", total: 299, avgScore: 112, completion: 88 },
    { type: "Personality Test", total: 299, avgScore: 82, completion: 92 },
    {
      type: "Emotional Intelligence",
      total: 255,
      avgScore: 75,
      completion: 85,
    },
  ],

  // Data tingkat kompeten berdasarkan posisi
  positionData: [
    { position: "Management", applied: 45, competent: 12, percentage: 26.7 },
    {
      position: "Sales & Marketing",
      applied: 78,
      competent: 52,
      percentage: 66.7,
    },
    { position: "Finance", applied: 34, competent: 28, percentage: 82.4 },
    { position: "HR", applied: 29, competent: 21, percentage: 72.4 },
    { position: "IT", applied: 52, competent: 38, percentage: 73.1 },
    { position: "Operations", applied: 61, competent: 44, percentage: 72.1 },
  ],
};

// Warna untuk grafik
const COLORS = [
  "#22C55E",
  "#EF4444",
  "#F59E0B",
  "#3B82F6",
  "#8B5CF6",
  "#EC4899",
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize={12}
      fontWeight="bold"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function ReportsPage() {
  const [dateFilter, setDateFilter] = useState("6months");
  const [genderFilter, setGenderFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");

  // Data untuk pie chart status
  const statusPieData = [
    { name: "Lulus", value: 219, color: "#22C55E" },
    { name: "Tidak Lulus", value: 80, color: "#EF4444" },
  ];

  // Data untuk pie chart gender
  const genderPieData = [
    { name: "Laki-laki", value: 156, color: "#3B82F6" },
    { name: "Perempuan", value: 143, color: "#EC4899" },
  ];

  // Summary statistics
  const summaryStats = {
    totalPeserta: 299,
    totalLulus: 219,
    totalTidakLulus: 80,
    tingkatKelulusan: 73.2,
    rataRataIQ: 112,
    rataRataWaktu: 24,
    tesPerBulan: 50,
    peningkatanBulanIni: 12.5,
  };

  const handleExportPDF = () => {
    // Simulasi export PDF
    alert(
      "Fitur export PDF akan segera tersedia. Data laporan akan diunduh dalam format PDF."
    );
  };

  return (
    <LayoutDashboard>
      <div className="flex flex-1 flex-col gap-6 p-4 pt-0">
        {/* Header Section */}
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground">
              Laporan & Analisis
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              Analisis komprehensif hasil psikotes dengan visualisasi data yang
              mendalam untuk pengambilan keputusan strategis dalam proses
              rekrutmen.
            </p>
          </div>

          <div className="flex gap-3">
            <Button onClick={handleExportPDF} className="gap-2">
              <Download className="h-4 w-4" />
              Export PDF
            </Button>
          </div>
        </div>

        {/* Filter Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filter Laporan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              <div>
                <Label htmlFor="date-filter">Periode Waktu</Label>
                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Periode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1month">1 Bulan Terakhir</SelectItem>
                    <SelectItem value="3months">3 Bulan Terakhir</SelectItem>
                    <SelectItem value="6months">6 Bulan Terakhir</SelectItem>
                    <SelectItem value="1year">1 Tahun Terakhir</SelectItem>
                    <SelectItem value="all">Semua Waktu</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="gender-filter">Jenis Kelamin</Label>
                <Select value={genderFilter} onValueChange={setGenderFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Semua" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua</SelectItem>
                    <SelectItem value="male">Laki-laki</SelectItem>
                    <SelectItem value="female">Perempuan</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="status-filter">Status Hasil</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Semua Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Status</SelectItem>
                    <SelectItem value="pass">Lulus</SelectItem>
                    <SelectItem value="fail">Tidak Lulus</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="location-filter">Domisili</Label>
                <Select
                  value={locationFilter}
                  onValueChange={setLocationFilter}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Semua Lokasi" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Lokasi</SelectItem>
                    <SelectItem value="jakarta">Jakarta</SelectItem>
                    <SelectItem value="tangerang">Tangerang</SelectItem>
                    <SelectItem value="bekasi">Bekasi</SelectItem>
                    <SelectItem value="depok">Depok</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Summary Statistics */}
        <div className="grid gap-4 md:grid-cols-4 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Peserta
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {summaryStats.totalPeserta}
              </div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">
                  +{summaryStats.peningkatanBulanIni}%
                </span>{" "}
                dari bulan lalu
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Tingkat Kelulusan
              </CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {summaryStats.tingkatKelulusan}%
              </div>
              <p className="text-xs text-muted-foreground">
                {summaryStats.totalLulus} dari {summaryStats.totalPeserta}{" "}
                peserta
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Rata-rata IQ
              </CardTitle>
              <Brain className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {summaryStats.rataRataIQ}
              </div>
              <p className="text-xs text-muted-foreground">
                Kategori: Diatas Rata-rata
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Tes per Bulan
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {summaryStats.tesPerBulan}
              </div>
              <p className="text-xs text-muted-foreground">
                Rata-rata dalam 6 bulan terakhir
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Trend Bulanan */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Trend Bulanan
              </CardTitle>
              <CardDescription>
                Perkembangan jumlah peserta dan tingkat kelulusan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={reportData.monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="month"
                      tick={{ fontSize: 12 }}
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="total"
                      stroke="#3B82F6"
                      strokeWidth={2}
                      name="Total Peserta"
                    />
                    <Line
                      type="monotone"
                      dataKey="lulus"
                      stroke="#22C55E"
                      strokeWidth={2}
                      name="Lulus"
                    />
                    <Line
                      type="monotone"
                      dataKey="tidakLulus"
                      stroke="#EF4444"
                      strokeWidth={2}
                      name="Tidak Lulus"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Status Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChartIcon className="h-5 w-5" />
                Distribusi Status Hasil
              </CardTitle>
              <CardDescription>
                Perbandingan peserta yang lulus dan tidak lulus
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusPieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomizedLabel}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {statusPieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Gender and Age Analysis */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Gender Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Distribusi Berdasarkan Jenis Kelamin</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {reportData.genderData.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{item.gender}</span>
                      <span className="font-medium">{item.total} peserta</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{
                            width: `${(item.lulus / item.total) * 100}%`,
                          }}
                        />
                      </div>
                      <span className="text-sm font-medium">
                        {item.percentage}%
                      </span>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Lulus: {item.lulus}</span>
                      <span>Tidak Lulus: {item.tidakLulus}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Age Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Distribusi Berdasarkan Usia</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={reportData.ageData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="ageRange" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="lulus"
                      stackId="a"
                      fill="#22C55E"
                      name="Lulus"
                    />
                    <Bar
                      dataKey="tidakLulus"
                      stackId="a"
                      fill="#EF4444"
                      name="Tidak Lulus"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Position Competency Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Analisis Kompetensi Berdasarkan Posisi
            </CardTitle>
            <CardDescription>
              Tingkat kompetensi kandidat untuk setiap posisi yang dilamar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Posisi</TableHead>
                    <TableHead>Total Pelamar</TableHead>
                    <TableHead>Kompeten</TableHead>
                    <TableHead>Tidak Kompeten</TableHead>
                    <TableHead>Tingkat Kompetensi</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reportData.positionData.map((position, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">
                        {position.position}
                      </TableCell>
                      <TableCell>{position.applied}</TableCell>
                      <TableCell className="text-green-600 font-medium">
                        {position.competent}
                      </TableCell>
                      <TableCell className="text-red-600 font-medium">
                        {position.applied - position.competent}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-20">
                            <div
                              className="bg-green-500 h-2 rounded-full"
                              style={{ width: `${position.percentage}%` }}
                            />
                          </div>
                          <span className="font-medium">
                            {position.percentage}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            position.percentage >= 75
                              ? "bg-green-100 text-green-700"
                              : position.percentage >= 50
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                          }
                        >
                          {position.percentage >= 75
                            ? "Sangat Baik"
                            : position.percentage >= 50
                            ? "Baik"
                            : "Perlu Perbaikan"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Test Type Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Performa Berdasarkan Jenis Tes
            </CardTitle>
            <CardDescription>
              Analisis hasil untuk setiap modul psikotes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {reportData.testTypeData.map((test, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold">{test.type}</h4>
                      <p className="text-sm text-muted-foreground">
                        {test.total} peserta mengikuti
                      </p>
                    </div>
                    <Badge className="bg-blue-100 text-blue-700">
                      {test.completion}% completion
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Rata-rata Skor</span>
                      <span className="font-medium">{test.avgScore}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${test.completion}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Location Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Distribusi Berdasarkan Domisili</CardTitle>
            <CardDescription>
              Analisis peserta berdasarkan area tempat tinggal
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={reportData.locationData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" tick={{ fontSize: 12 }} />
                  <YAxis
                    dataKey="location"
                    type="category"
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="lulus" fill="#22C55E" name="Lulus" />
                  <Bar dataKey="tidakLulus" fill="#EF4444" name="Tidak Lulus" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Insights and Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Insight & Rekomendasi
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h4 className="font-semibold text-green-800 mb-2">
                  Kinerja Positif
                </h4>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>
                    • Tingkat kelulusan 73.2% menunjukkan kualitas kandidat yang
                    baik
                  </li>
                  <li>
                    • Posisi Finance memiliki tingkat kompetensi tertinggi
                    (82.4%)
                  </li>
                  <li>• Kelompok usia 31-35 menunjukkan performa terbaik</li>
                  <li>• Tren peningkatan positif dalam 3 bulan terakhir</li>
                </ul>
              </div>

              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <h4 className="font-semibold text-yellow-800 mb-2">
                  Area Perbaikan
                </h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>
                    • Tingkat completion Emotional Intelligence perlu
                    ditingkatkan
                  </li>
                  <li>
                    • Posisi Management memerlukan strategi rekrutmen yang lebih
                    selektif
                  </li>
                  <li>
                    • Diperlukan program pengembangan untuk kandidat usia 20-25
                    tahun
                  </li>
                  <li>• Perlu evaluasi soal untuk meningkatkan kualitas tes</li>
                </ul>
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-2">
                Rekomendasi Strategis
              </h4>
              <div className="grid gap-2 md:grid-cols-2 text-sm text-blue-700">
                <div>
                  <p className="font-medium">Jangka Pendek:</p>
                  <ul className="space-y-1 mt-1">
                    <li>• Tingkatkan kualitas soal untuk posisi Management</li>
                    <li>• Buat program persiapan untuk kandidat muda</li>
                    <li>• Optimalkan user experience untuk tes online</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium">Jangka Panjang:</p>
                  <ul className="space-y-1 mt-1">
                    <li>• Kembangkan sistem adaptive testing</li>
                    <li>• Implementasi AI untuk analisis prediktif</li>
                    <li>• Bangun database benchmarking industri</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </LayoutDashboard>
  );
}
