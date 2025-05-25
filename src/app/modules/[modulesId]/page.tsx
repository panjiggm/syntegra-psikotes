"use client";

import { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import LayoutDashboard from "@/layout/LayoutDashboard";
import {
  ArrowLeft,
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Copy,
  Eye,
  Clock,
  Users,
  Brain,
  Target,
  BookOpen,
  FileText,
  Settings,
  BarChart3,
  Save,
  AlertCircle,
  TrendingUp,
  Award,
  HelpCircle,
  Lightbulb,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Cell,
  BarChart,
  Pie,
} from "recharts";

// Types
interface Question {
  id: string;
  nomorSoal: number;
  tipeSoal:
    | "Multiple Choice"
    | "Skala Likert"
    | "True/False"
    | "Essay"
    | "Matching";
  pertanyaan: string;
  opsiJawaban: string[];
  jawabanBenar?: string | number;
  bobotSkor: number;
  waktuMaksimal?: number;
  kategoriSoal: string;
  tingkatKesulitan: "Mudah" | "Sedang" | "Sulit";
  instruksiKhusus?: string;
  gambar?: string;
  status: "Aktif" | "Draft" | "Archived";
  validitasKorelasi: number;
  reliabilitasKronbach: number;
  discriminationIndex: number;
  difficultyLevel: number;
  dibuatOleh: string;
  tanggalDibuat: string;
  terakhirDiubah: string;
}

interface ModuleDetail {
  id: string;
  nama: string;
  kategori:
    | "Kepribadian"
    | "Inteligensi"
    | "Minat Bakat"
    | "Kondisi Mental"
    | "Kerja";
  deskripsi: string;
  instruksiUmum: string;
  tujuanTes: string;
  durasi: number;
  jumlahSoal: number;
  passingScore: number;
  tingkatKesulitan: "Mudah" | "Sedang" | "Sulit";
  status: "Aktif" | "Tidak Aktif" | "Draft";
  tanggalDibuat: string;
  terakhirDiubah: string;
  dibuatOleh: string;
  jumlahPengguna: number;
  rataRataSkor: number;
  tingkatPenyelesaian: number;
  validitasModul: number;
  reliabilitasModul: number;
  normaPenilai: {
    tinggi: { min: number; max: number };
    sedang: { min: number; max: number };
    rendah: { min: number; max: number };
  };
  interpretasiSkor: {
    tinggi: string;
    sedang: string;
    rendah: string;
  };
  skalaLikert?: {
    min: number;
    max: number;
    label: string[];
  };
}

// Dummy data untuk modul DISC
const moduleData: ModuleDetail = {
  id: "MOD001",
  nama: "DISC Personality Assessment",
  kategori: "Kepribadian",
  deskripsi:
    "Tes kepribadian untuk mengidentifikasi gaya komunikasi dan perilaku berdasarkan model DISC (Dominance, Influence, Steadiness, Conscientiousness)",
  instruksiUmum:
    "Jawablah setiap pernyataan dengan memilih salah satu pilihan yang paling menggambarkan diri Anda. Tidak ada jawaban yang benar atau salah, jawablah dengan jujur sesuai dengan kepribadian Anda.",
  tujuanTes:
    "Mengidentifikasi gaya kepribadian dominan untuk penempatan posisi yang sesuai dan pengembangan tim yang efektif",
  durasi: 20,
  jumlahSoal: 28,
  passingScore: 70,
  tingkatKesulitan: "Sedang",
  status: "Aktif",
  tanggalDibuat: "2024-01-15",
  terakhirDiubah: "2024-01-25",
  dibuatOleh: "Admin System",
  jumlahPengguna: 245,
  rataRataSkor: 78,
  tingkatPenyelesaian: 95,
  validitasModul: 0.85,
  reliabilitasModul: 0.92,
  normaPenilai: {
    tinggi: { min: 81, max: 100 },
    sedang: { min: 61, max: 80 },
    rendah: { min: 0, max: 60 },
  },
  interpretasiSkor: {
    tinggi:
      "Memiliki gaya kepribadian yang sangat jelas dan konsisten. Cocok untuk posisi leadership dan komunikasi intensif.",
    sedang:
      "Memiliki gaya kepribadian yang seimbang dengan fleksibilitas dalam berbagai situasi kerja.",
    rendah:
      "Memerlukan pengembangan lebih lanjut dalam mengidentifikasi gaya komunikasi dan perilaku yang efektif.",
  },
  skalaLikert: {
    min: 1,
    max: 5,
    label: [
      "Sangat Tidak Setuju",
      "Tidak Setuju",
      "Netral",
      "Setuju",
      "Sangat Setuju",
    ],
  },
};

// Dummy data untuk soal-soal
const questionsData: Question[] = [
  {
    id: "Q001",
    nomorSoal: 1,
    tipeSoal: "Multiple Choice",
    pertanyaan: "Dalam situasi kerja tim, saya cenderung:",
    opsiJawaban: [
      "Mengambil inisiatif memimpin diskusi",
      "Memberikan dukungan dan mencari konsensus",
      "Fokus pada detail dan akurasi",
      "Membawa energi positif dan antusiasme",
    ],
    bobotSkor: 4,
    kategoriSoal: "Dominance vs Steadiness",
    tingkatKesulitan: "Sedang",
    instruksiKhusus: "Pilih satu jawaban yang paling menggambarkan diri Anda",
    status: "Aktif",
    validitasKorelasi: 0.76,
    reliabilitasKronbach: 0.88,
    discriminationIndex: 0.65,
    difficultyLevel: 0.58,
    dibuatOleh: "Dr. Sarah Psikolog",
    tanggalDibuat: "2024-01-15",
    terakhirDiubah: "2024-01-20",
  },
  {
    id: "Q002",
    nomorSoal: 2,
    tipeSoal: "Skala Likert",
    pertanyaan:
      "Saya merasa nyaman mengambil keputusan cepat tanpa banyak konsultasi",
    opsiJawaban: ["1", "2", "3", "4", "5"],
    bobotSkor: 3,
    kategoriSoal: "Dominance",
    tingkatKesulitan: "Mudah",
    status: "Aktif",
    validitasKorelasi: 0.82,
    reliabilitasKronbach: 0.91,
    discriminationIndex: 0.71,
    difficultyLevel: 0.45,
    dibuatOleh: "Dr. Sarah Psikolog",
    tanggalDibuat: "2024-01-15",
    terakhirDiubah: "2024-01-18",
  },
  {
    id: "Q003",
    nomorSoal: 3,
    tipeSoal: "Multiple Choice",
    pertanyaan: "Ketika menghadapi konflik di tempat kerja, saya biasanya:",
    opsiJawaban: [
      "Langsung mengatasi masalah secara tegas",
      "Mencari solusi yang menguntungkan semua pihak",
      "Menganalisis akar masalah dengan teliti",
      "Membantu meredakan suasana dengan humor",
    ],
    bobotSkor: 4,
    kategoriSoal: "Conflict Resolution Style",
    tingkatKesulitan: "Sulit",
    status: "Aktif",
    validitasKorelasi: 0.79,
    reliabilitasKronbach: 0.86,
    discriminationIndex: 0.68,
    difficultyLevel: 0.72,
    dibuatOleh: "Dr. Michael Hartono",
    tanggalDibuat: "2024-01-16",
    terakhirDiubah: "2024-01-22",
  },
  {
    id: "Q004",
    nomorSoal: 4,
    tipeSoal: "True/False",
    pertanyaan:
      "Saya lebih suka bekerja dengan data dan fakta daripada intuisi",
    opsiJawaban: ["Benar", "Salah"],
    bobotSkor: 2,
    kategoriSoal: "Conscientiousness",
    tingkatKesulitan: "Mudah",
    status: "Aktif",
    validitasKorelasi: 0.73,
    reliabilitasKronbach: 0.84,
    discriminationIndex: 0.59,
    difficultyLevel: 0.38,
    dibuatOleh: "Dr. Sarah Psikolog",
    tanggalDibuat: "2024-01-17",
    terakhirDiubah: "2024-01-21",
  },
  {
    id: "Q005",
    nomorSoal: 5,
    tipeSoal: "Skala Likert",
    pertanyaan: "Saya mudah bergaul dan membangun hubungan dengan orang baru",
    opsiJawaban: ["1", "2", "3", "4", "5"],
    bobotSkor: 3,
    kategoriSoal: "Influence",
    tingkatKesulitan: "Sedang",
    status: "Draft",
    validitasKorelasi: 0.81,
    reliabilitasKronbach: 0.89,
    discriminationIndex: 0.73,
    difficultyLevel: 0.52,
    dibuatOleh: "Dr. Linda Sari",
    tanggalDibuat: "2024-01-18",
    terakhirDiubah: "2024-01-24",
  },
];

// Component untuk menampilkan soal dalam format yang sesuai
const QuestionPreview = ({ question }: { question: Question }) => {
  return (
    <div className="space-y-4 p-4 border rounded-lg bg-muted/20">
      <div className="flex items-start gap-3">
        <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">
          {question.nomorSoal}
        </div>
        <div className="flex-1">
          <p className="font-medium text-foreground mb-2">
            {question.pertanyaan}
          </p>

          {question.tipeSoal === "Multiple Choice" && (
            <div className="space-y-2">
              {question.opsiJawaban.map((opsi, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-6 h-6 border rounded-full flex items-center justify-center text-xs">
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className="text-sm">{opsi}</span>
                </div>
              ))}
            </div>
          )}

          {question.tipeSoal === "Skala Likert" && (
            <div className="flex items-center gap-4">
              {question.opsiJawaban.map((opsi, index) => (
                <div key={index} className="flex flex-col items-center gap-1">
                  <div className="w-8 h-8 border rounded-full flex items-center justify-center text-sm">
                    {opsi}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {moduleData.skalaLikert?.label[index]}
                  </span>
                </div>
              ))}
            </div>
          )}

          {question.tipeSoal === "True/False" && (
            <div className="flex gap-4">
              {question.opsiJawaban.map((opsi, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-6 h-6 border rounded-full"></div>
                  <span className="text-sm">{opsi}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {question.instruksiKhusus && (
        <div className="bg-blue-50 border border-blue-200 rounded p-3 ml-11">
          <div className="flex items-start gap-2">
            <HelpCircle className="h-4 w-4 text-blue-600 mt-0.5" />
            <p className="text-sm text-blue-800">{question.instruksiKhusus}</p>
          </div>
        </div>
      )}
    </div>
  );
};

// Data untuk chart statistik
const performanceData = [
  { month: "Jan", peserta: 45, lulus: 32, rataRata: 76 },
  { month: "Feb", peserta: 52, lulus: 38, rataRata: 78 },
  { month: "Mar", peserta: 38, lulus: 28, rataRata: 79 },
  { month: "Apr", peserta: 61, lulus: 44, rataRata: 77 },
  { month: "Mei", peserta: 48, lulus: 35, rataRata: 80 },
];

const difficultyDistribution = [
  { name: "Mudah", value: 35, color: "#22C55E" },
  { name: "Sedang", value: 45, color: "#F59E0B" },
  { name: "Sulit", value: 20, color: "#EF4444" },
];

export default function ModuleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const moduleId = params.moduleId as string;

  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isEditMode, setIsEditMode] = useState(false);
  const [showAddQuestion, setShowAddQuestion] = useState(false);

  // Filter soal berdasarkan pencarian dan filter
  const filteredQuestions = useMemo(() => {
    return questionsData.filter((question) => {
      const matchesSearch =
        question.pertanyaan.toLowerCase().includes(searchTerm.toLowerCase()) ||
        question.kategoriSoal.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType =
        filterType === "all" || question.tipeSoal === filterType;
      const matchesStatus =
        filterStatus === "all" || question.status === filterStatus;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [searchTerm, filterType, filterStatus]);

  return (
    <LayoutDashboard>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="flex items-start">
          <Button
            onClick={() => router.push("/modules")}
            variant="link"
            size="sm"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali ke Modul
          </Button>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  {moduleData.nama}
                </h1>
                <p className="text-muted-foreground max-w-2xl text-sm">
                  {moduleData.deskripsi || "Tidak ada deskripsi tersedia."}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className="bg-pink-100 text-pink-700">
                    {moduleData.kategori}
                  </Badge>
                  <Badge
                    className={
                      moduleData.status === "Aktif"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }
                  >
                    {moduleData.status}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    ID: {moduleData.id}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <Eye className="h-4 w-4" />
              Preview Tes
            </Button>
            <Button className="gap-2">
              <Settings className="h-4 w-4" />
              Pengaturan
            </Button>
          </div>
        </div>

        {/* Tabs Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="questions" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Bank Soal
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Analitik
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Pengaturan
            </TabsTrigger>
          </TabsList>

          {/* Tab Content: Overview */}
          <TabsContent value="overview" className="space-y-6">
            <div className="w-full space-y-4">
              <div className="grid gap-6 md:grid-cols-2">
                {/* Informasi Dasar */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="h-5 w-5" />
                      Informasi Modul
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">
                        Deskripsi
                      </Label>
                      <p className="text-sm mt-1">{moduleData.deskripsi}</p>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">
                        Tujuan Tes
                      </Label>
                      <p className="text-sm mt-1">{moduleData.tujuanTes}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">
                          Durasi
                        </Label>
                        <div className="flex items-center gap-1 mt-1">
                          <Clock className="h-4 w-4 text-primary" />
                          <span className="font-medium">
                            {moduleData.durasi} menit
                          </span>
                        </div>
                      </div>

                      <div>
                        <Label className="text-sm font-medium text-muted-foreground">
                          Jumlah Soal
                        </Label>
                        <div className="flex items-center gap-1 mt-1">
                          <FileText className="h-4 w-4 text-primary" />
                          <span className="font-medium">
                            {moduleData.jumlahSoal} soal
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-muted-foreground">
                        Passing Score
                      </Label>
                      <div className="flex items-center gap-1 mt-1">
                        <Target className="h-4 w-4 text-primary" />
                        <span className="font-medium">
                          {moduleData.passingScore}%
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Statistik Penggunaan */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Statistik Penggunaan
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">
                          {moduleData.jumlahPengguna}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Total Pengguna
                        </p>
                      </div>

                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                          {moduleData.tingkatPenyelesaian}%
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Tingkat Penyelesaian
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">
                          {moduleData.rataRataSkor}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Rata-rata Skor
                        </p>
                      </div>

                      <div className="text-center">
                        <div className="text-2xl font-bold text-orange-600">
                          {(moduleData.validitasModul * 100).toFixed(0)}%
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Validitas
                        </p>
                      </div>
                    </div>

                    <div className="pt-2">
                      <Label className="text-sm font-medium text-muted-foreground">
                        Reliabilitas (Cronbach's Alpha)
                      </Label>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{
                            width: `${moduleData.reliabilitasModul * 100}%`,
                          }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        α = {moduleData.reliabilitasModul} (Sangat Reliabel)
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Instruksi Umum */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5" />
                    Instruksi untuk Peserta
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-blue-900">{moduleData.instruksiUmum}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Norma Penilaian */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Norma Penilaian & Interpretasi
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div>
                        <div className="font-medium text-green-800">
                          Skor Tinggi
                        </div>
                        <div className="text-sm text-green-600">
                          {moduleData.normaPenilai.tinggi.min} -{" "}
                          {moduleData.normaPenilai.tinggi.max}
                        </div>
                      </div>
                      <div className="text-xs text-green-700 max-w-md">
                        {moduleData.interpretasiSkor.tinggi}
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <div>
                        <div className="font-medium text-yellow-800">
                          Skor Sedang
                        </div>
                        <div className="text-sm text-yellow-600">
                          {moduleData.normaPenilai.sedang.min} -{" "}
                          {moduleData.normaPenilai.sedang.max}
                        </div>
                      </div>
                      <div className="text-xs text-yellow-700 max-w-md">
                        {moduleData.interpretasiSkor.sedang}
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
                      <div>
                        <div className="font-medium text-red-800">
                          Skor Rendah
                        </div>
                        <div className="text-sm text-red-600">
                          {moduleData.normaPenilai.rendah.min} -{" "}
                          {moduleData.normaPenilai.rendah.max}
                        </div>
                      </div>
                      <div className="text-xs text-red-700 max-w-md">
                        {moduleData.interpretasiSkor.rendah}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Tab Content: Bank Soal */}
          <TabsContent value="questions" className="space-y-6">
            {/* Header Bank Soal */}
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-lg font-semibold">Bank Soal</h3>
                <p className="text-sm text-muted-foreground">
                  Kelola soal-soal untuk modul {moduleData.nama}
                </p>
              </div>

              <Button
                onClick={() => setShowAddQuestion(true)}
                className="gap-2"
              >
                <Plus className="h-4 w-4" />
                Tambah Soal Baru
              </Button>
            </div>

            {/* Filter & Search */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-end">
                  <div className="flex-1">
                    <Label htmlFor="question-search">Cari Soal</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        id="question-search"
                        placeholder="Cari berdasarkan pertanyaan atau kategori..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="w-full md:w-48">
                    <Label>Tipe Soal</Label>
                    <Select value={filterType} onValueChange={setFilterType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Semua Tipe" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Semua Tipe</SelectItem>
                        <SelectItem value="Multiple Choice">
                          Multiple Choice
                        </SelectItem>
                        <SelectItem value="Skala Likert">
                          Skala Likert
                        </SelectItem>
                        <SelectItem value="True/False">True/False</SelectItem>
                        <SelectItem value="Essay">Essay</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="w-full md:w-48">
                    <Label>Status</Label>
                    <Select
                      value={filterStatus}
                      onValueChange={setFilterStatus}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Semua Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Semua Status</SelectItem>
                        <SelectItem value="Aktif">Aktif</SelectItem>
                        <SelectItem value="Draft">Draft</SelectItem>
                        <SelectItem value="Archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Daftar Soal */}
            <div className="space-y-4">
              {filteredQuestions.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium mb-2">Belum Ada Soal</h3>
                    <p className="text-muted-foreground text-center mb-4">
                      Mulai buat soal pertama untuk modul ini
                    </p>
                    <Button onClick={() => setShowAddQuestion(true)}>
                      Tambah Soal Baru
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                filteredQuestions.map((question) => (
                  <Card key={question.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">
                              Soal #{question.nomorSoal}
                            </Badge>
                            <Badge
                              className={
                                question.tipeSoal === "Multiple Choice"
                                  ? "bg-blue-100 text-blue-700"
                                  : question.tipeSoal === "Skala Likert"
                                  ? "bg-green-100 text-green-700"
                                  : question.tipeSoal === "True/False"
                                  ? "bg-purple-100 text-purple-700"
                                  : "bg-orange-100 text-orange-700"
                              }
                            >
                              {question.tipeSoal}
                            </Badge>
                            <Badge
                              className={
                                question.status === "Aktif"
                                  ? "bg-green-100 text-green-700"
                                  : question.status === "Draft"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-gray-100 text-gray-700"
                              }
                            >
                              {question.status}
                            </Badge>
                          </div>

                          <div className="text-sm text-muted-foreground">
                            Kategori: {question.kategoriSoal} • Bobot:{" "}
                            {question.bobotSkor} poin • Tingkat:{" "}
                            {question.tingkatKesulitan}
                          </div>
                        </div>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              Preview
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Soal
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Copy className="mr-2 h-4 w-4" />
                              Duplikasi
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Hapus Soal
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <QuestionPreview question={question} />

                      {/* Statistik Soal */}
                      <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">
                              Validitas:
                            </span>
                            <span className="ml-2 font-medium">
                              {question.validitasKorelasi.toFixed(2)}
                            </span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">
                              Reliabilitas:
                            </span>
                            <span className="ml-2 font-medium">
                              {question.reliabilitasKronbach.toFixed(2)}
                            </span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">
                              Daya Beda:
                            </span>
                            <span className="ml-2 font-medium">
                              {question.discriminationIndex.toFixed(2)}
                            </span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">
                              Tingkat Kesulitan:
                            </span>
                            <span className="ml-2 font-medium">
                              {question.difficultyLevel.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          {/* Tab Content: Analytics */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid gap-6">
              <div className="grid gap-6 md:grid-cols-2">
                {/* Performance Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle>Performa Bulanan</CardTitle>
                    <CardDescription>
                      Tren jumlah peserta dan tingkat kelulusan
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={performanceData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line
                            type="monotone"
                            dataKey="peserta"
                            stroke="#3B82F6"
                            name="Total Peserta"
                          />
                          <Line
                            type="monotone"
                            dataKey="lulus"
                            stroke="#22C55E"
                            name="Lulus"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Difficulty Distribution */}
                <Card>
                  <CardHeader>
                    <CardTitle>Distribusi Tingkat Kesulitan</CardTitle>
                    <CardDescription>
                      Komposisi soal berdasarkan tingkat kesulitan
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsPieChart>
                          <Pie
                            data={difficultyDistribution}
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, value }) => `${name}: ${value}%`}
                          >
                            {difficultyDistribution.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </RechartsPieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Analytics Summary */}
              <div className="grid gap-4 md:grid-cols-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Item Discrimination
                        </p>
                        <p className="text-2xl font-bold">0.68</p>
                        <p className="text-xs text-green-600">Sangat Baik</p>
                      </div>
                      <BarChart className="h-8 w-8 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Difficulty Index
                        </p>
                        <p className="text-2xl font-bold">0.55</p>
                        <p className="text-xs text-blue-600">Optimal</p>
                      </div>
                      <Target className="h-8 w-8 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Standard Error
                        </p>
                        <p className="text-2xl font-bold">2.8</p>
                        <p className="text-xs text-orange-600">Rendah</p>
                      </div>
                      <AlertCircle className="h-8 w-8 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Test Efficiency
                        </p>
                        <p className="text-2xl font-bold">92%</p>
                        <p className="text-xs text-green-600">Tinggi</p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Tab Content: Settings */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Pengaturan Modul</CardTitle>
                <CardDescription>
                  Konfigurasi dan pengaturan untuk modul psikotes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="module-name">Nama Modul</Label>
                      <Input
                        id="module-name"
                        defaultValue={moduleData.nama}
                        disabled={!isEditMode}
                      />
                    </div>

                    <div>
                      <Label htmlFor="module-duration">Durasi (menit)</Label>
                      <Input
                        id="module-duration"
                        type="number"
                        defaultValue={moduleData.durasi}
                        disabled={!isEditMode}
                      />
                    </div>

                    <div>
                      <Label htmlFor="passing-score">Passing Score (%)</Label>
                      <Input
                        id="passing-score"
                        type="number"
                        defaultValue={moduleData.passingScore}
                        disabled={!isEditMode}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="module-description">Deskripsi</Label>
                      <Textarea
                        id="module-description"
                        defaultValue={moduleData.deskripsi}
                        disabled={!isEditMode}
                        rows={4}
                      />
                    </div>

                    <div>
                      <Label htmlFor="test-purpose">Tujuan Tes</Label>
                      <Textarea
                        id="test-purpose"
                        defaultValue={moduleData.tujuanTes}
                        disabled={!isEditMode}
                        rows={3}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Pengaturan Tambahan</h4>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Aktifkan Modul</Label>
                        <p className="text-sm text-muted-foreground">
                          Modul dapat digunakan untuk tes
                        </p>
                      </div>
                      <Switch
                        checked={moduleData.status === "Aktif"}
                        disabled={!isEditMode}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Randomize Questions</Label>
                        <p className="text-sm text-muted-foreground">
                          Acak urutan soal
                        </p>
                      </div>
                      <Switch disabled={!isEditMode} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Show Progress</Label>
                        <p className="text-sm text-muted-foreground">
                          Tampilkan progress bar
                        </p>
                      </div>
                      <Switch disabled={!isEditMode} />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Allow Review</Label>
                        <p className="text-sm text-muted-foreground">
                          Peserta dapat mengulas jawaban
                        </p>
                      </div>
                      <Switch disabled={!isEditMode} />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  {isEditMode ? (
                    <>
                      <Button
                        variant="outline"
                        onClick={() => setIsEditMode(false)}
                      >
                        Batal
                      </Button>
                      <Button onClick={() => setIsEditMode(false)}>
                        <Save className="mr-2 h-4 w-4" />
                        Simpan Perubahan
                      </Button>
                    </>
                  ) : (
                    <Button onClick={() => setIsEditMode(true)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Pengaturan
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Dialog untuk menambah soal baru */}
        <Dialog open={showAddQuestion} onOpenChange={setShowAddQuestion}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Tambah Soal Baru</DialogTitle>
              <DialogDescription>
                Buat soal baru untuk modul {moduleData.nama}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="question-type">Tipe Soal</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih tipe soal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="multiple-choice">
                        Multiple Choice
                      </SelectItem>
                      <SelectItem value="likert">Skala Likert</SelectItem>
                      <SelectItem value="true-false">True/False</SelectItem>
                      <SelectItem value="essay">Essay</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="question-category">Kategori</Label>
                  <Input
                    id="question-category"
                    placeholder="Contoh: Dominance, Influence"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="question-text">Pertanyaan</Label>
                <Textarea
                  id="question-text"
                  placeholder="Masukkan pertanyaan..."
                  rows={3}
                />
              </div>

              <div>
                <Label>Pilihan Jawaban</Label>
                <div className="space-y-2">
                  <Input placeholder="Pilihan A" />
                  <Input placeholder="Pilihan B" />
                  <Input placeholder="Pilihan C" />
                  <Input placeholder="Pilihan D" />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <Label>Bobot Skor</Label>
                  <Input type="number" defaultValue="1" />
                </div>

                <div>
                  <Label>Tingkat Kesulitan</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih tingkat" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mudah">Mudah</SelectItem>
                      <SelectItem value="sedang">Sedang</SelectItem>
                      <SelectItem value="sulit">Sulit</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Status</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="aktif">Aktif</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setShowAddQuestion(false)}
              >
                Batal
              </Button>
              <Button onClick={() => setShowAddQuestion(false)}>
                Simpan Soal
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </LayoutDashboard>
  );
}
