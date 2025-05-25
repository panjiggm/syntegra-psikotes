// src/app/modules/page.tsx
"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import LayoutDashboard from "@/layout/LayoutDashboard";
import {
  Plus,
  Search,
  Filter,
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
  ChevronLeft,
  ChevronRight,
  Settings,
  BarChart3,
} from "lucide-react";

// Tipe data modul
interface PsychologicalModule {
  id: string;
  nama: string;
  kategori:
    | "Kepribadian"
    | "Inteligensi"
    | "Minat Bakat"
    | "Kondisi Mental"
    | "Kerja";
  deskripsi: string;
  durasi: number; // dalam menit
  jumlahSoal: number;
  tingkatKesulitan: "Mudah" | "Sedang" | "Sulit";
  status: "Aktif" | "Tidak Aktif" | "Draft";
  tanggalDibuat: string;
  terakhirDiubah: string;
  dibuatOleh: string;
  jumlahPengguna: number;
  rataRataSkor: number;
  tingkatPenyelesaian: number;
}

// Data dummy modul psikotes umum
const dummyModules: PsychologicalModule[] = [
  {
    id: "MOD001",
    nama: "DISC Personality Assessment",
    kategori: "Kepribadian",
    deskripsi:
      "Tes kepribadian untuk mengidentifikasi gaya komunikasi dan perilaku berdasarkan model DISC (Dominance, Influence, Steadiness, Conscientiousness)",
    durasi: 20,
    jumlahSoal: 28,
    tingkatKesulitan: "Sedang",
    status: "Aktif",
    tanggalDibuat: "2024-01-15",
    terakhirDiubah: "2024-01-25",
    dibuatOleh: "Admin System",
    jumlahPengguna: 245,
    rataRataSkor: 78,
    tingkatPenyelesaian: 95,
  },
  {
    id: "MOD002",
    nama: "Tes IQ Wechsler (WAIS-IV)",
    kategori: "Inteligensi",
    deskripsi:
      "Tes kecerdasan komprehensif yang mengukur kemampuan kognitif meliputi verbal comprehension, perceptual reasoning, working memory, dan processing speed",
    durasi: 45,
    jumlahSoal: 60,
    tingkatKesulitan: "Sulit",
    status: "Aktif",
    tanggalDibuat: "2024-01-10",
    terakhirDiubah: "2024-01-28",
    dibuatOleh: "Dr. Sarah Psikolog",
    jumlahPengguna: 298,
    rataRataSkor: 112,
    tingkatPenyelesaian: 88,
  },
  {
    id: "MOD003",
    nama: "Big Five Personality Test",
    kategori: "Kepribadian",
    deskripsi:
      "Tes kepribadian berdasarkan model Lima Faktor Besar: Openness, Conscientiousness, Extraversion, Agreeableness, dan Neuroticism",
    durasi: 15,
    jumlahSoal: 44,
    tingkatKesulitan: "Mudah",
    status: "Aktif",
    tanggalDibuat: "2024-01-12",
    terakhirDiubah: "2024-01-20",
    dibuatOleh: "Admin System",
    jumlahPengguna: 187,
    rataRataSkor: 82,
    tingkatPenyelesaian: 92,
  },
  {
    id: "MOD004",
    nama: "Emotional Intelligence Quotient (EQ)",
    kategori: "Kondisi Mental",
    deskripsi:
      "Tes kecerdasan emosional yang mengukur kemampuan mengenali, memahami, dan mengelola emosi diri sendiri maupun orang lain",
    durasi: 25,
    jumlahSoal: 35,
    tingkatKesulitan: "Sedang",
    status: "Aktif",
    tanggalDibuat: "2024-01-08",
    terakhirDiubah: "2024-01-22",
    dibuatOleh: "Dr. Michael Hartono",
    jumlahPengguna: 156,
    rataRataSkor: 75,
    tingkatPenyelesaian: 85,
  },
  {
    id: "MOD005",
    nama: "Holland Interest Inventory",
    kategori: "Minat Bakat",
    deskripsi:
      "Tes minat karir berdasarkan teori Holland yang mengidentifikasi kesesuaian dengan 6 tipe kepribadian karir: RIASEC",
    durasi: 18,
    jumlahSoal: 48,
    tingkatKesulitan: "Mudah",
    status: "Aktif",
    tanggalDibuat: "2024-01-14",
    terakhirDiubah: "2024-01-26",
    dibuatOleh: "Dr. Linda Sari",
    jumlahPengguna: 134,
    rataRataSkor: 88,
    tingkatPenyelesaian: 94,
  },
  {
    id: "MOD006",
    nama: "Stress Management Assessment",
    kategori: "Kondisi Mental",
    deskripsi:
      "Evaluasi tingkat stres dan kemampuan manajemen stres dalam situasi kerja dan kehidupan sehari-hari",
    durasi: 12,
    jumlahSoal: 30,
    tingkatKesulitan: "Mudah",
    status: "Aktif",
    tanggalDibuat: "2024-01-16",
    terakhirDiubah: "2024-01-24",
    dibuatOleh: "Dr. Ahmad Wijaya",
    jumlahPengguna: 89,
    rataRataSkor: 72,
    tingkatPenyelesaian: 87,
  },
  {
    id: "MOD007",
    nama: "Work Values Inventory",
    kategori: "Kerja",
    deskripsi:
      "Tes untuk mengidentifikasi nilai-nilai penting dalam pekerjaan seperti otonomi, keamanan, kreativitas, dan pengakuan",
    durasi: 15,
    jumlahSoal: 36,
    tingkatKesulitan: "Sedang",
    status: "Aktif",
    tanggalDibuat: "2024-01-18",
    terakhirDiubah: "2024-01-27",
    dibuatOleh: "Hr. Specialist",
    jumlahPengguna: 98,
    rataRataSkor: 79,
    tingkatPenyelesaian: 91,
  },
  {
    id: "MOD008",
    nama: "Leadership Style Assessment",
    kategori: "Kerja",
    deskripsi:
      "Evaluasi gaya kepemimpinan berdasarkan berbagai model seperti Situational Leadership dan Transformational Leadership",
    durasi: 22,
    jumlahSoal: 32,
    tingkatKesulitan: "Sedang",
    status: "Draft",
    tanggalDibuat: "2024-01-20",
    terakhirDiubah: "2024-01-29",
    dibuatOleh: "Dr. Sarah Psikolog",
    jumlahPengguna: 12,
    rataRataSkor: 0,
    tingkatPenyelesaian: 0,
  },
  {
    id: "MOD009",
    nama: "Cognitive Ability Test (CAT)",
    kategori: "Inteligensi",
    deskripsi:
      "Tes kemampuan kognitif yang mencakup reasoning verbal, numerical, dan abstract untuk prediksi kinerja kerja",
    durasi: 35,
    jumlahSoal: 45,
    tingkatKesulitan: "Sulit",
    status: "Aktif",
    tanggalDibuat: "2024-01-11",
    terakhirDiubah: "2024-01-23",
    dibuatOleh: "Dr. Michael Hartono",
    jumlahPengguna: 167,
    rataRataSkor: 86,
    tingkatPenyelesaian: 78,
  },
  {
    id: "MOD010",
    nama: "Team Roles Inventory (Belbin)",
    kategori: "Kerja",
    deskripsi:
      "Identifikasi peran dalam tim berdasarkan model Belbin: Plant, Resource Investigator, Coordinator, Shaper, dll",
    durasi: 16,
    jumlahSoal: 40,
    tingkatKesulitan: "Mudah",
    status: "Tidak Aktif",
    tanggalDibuat: "2024-01-13",
    terakhirDiubah: "2024-01-21",
    dibuatOleh: "Hr. Specialist",
    jumlahPengguna: 56,
    rataRataSkor: 74,
    tingkatPenyelesaian: 83,
  },
  {
    id: "MOD011",
    nama: "Depression Anxiety Stress Scale (DASS-21)",
    kategori: "Kondisi Mental",
    deskripsi:
      "Screening awal untuk mendeteksi tingkat depresi, kecemasan, dan stres pada kandidat",
    durasi: 10,
    jumlahSoal: 21,
    tingkatKesulitan: "Mudah",
    status: "Aktif",
    tanggalDibuat: "2024-01-17",
    terakhirDiubah: "2024-01-30",
    dibuatOleh: "Dr. Linda Sari",
    jumlahPengguna: 78,
    rataRataSkor: 68,
    tingkatPenyelesaian: 89,
  },
  {
    id: "MOD012",
    nama: "Multiple Intelligence Assessment",
    kategori: "Inteligensi",
    deskripsi:
      "Evaluasi berbagai jenis kecerdasan berdasarkan teori Howard Gardner: linguistic, logical-mathematical, spatial, dll",
    durasi: 28,
    jumlahSoal: 56,
    tingkatKesulitan: "Sedang",
    status: "Draft",
    tanggalDibuat: "2024-01-19",
    terakhirDiubah: "2024-01-31",
    dibuatOleh: "Dr. Ahmad Wijaya",
    jumlahPengguna: 8,
    rataRataSkor: 0,
    tingkatPenyelesaian: 0,
  },
];

// Status badge component
const StatusBadge = ({ status }: { status: PsychologicalModule["status"] }) => {
  const variants = {
    Aktif: "bg-green-100 text-green-700 hover:bg-green-200",
    "Tidak Aktif": "bg-red-100 text-red-700 hover:bg-red-200",
    Draft: "bg-yellow-100 text-yellow-700 hover:bg-yellow-200",
  };

  return (
    <Badge className={variants[status]} variant="secondary">
      {status}
    </Badge>
  );
};

// Difficulty badge component
const DifficultyBadge = ({
  difficulty,
}: {
  difficulty: PsychologicalModule["tingkatKesulitan"];
}) => {
  const variants = {
    Mudah: "bg-blue-100 text-blue-700",
    Sedang: "bg-orange-100 text-orange-700",
    Sulit: "bg-purple-100 text-purple-700",
  };

  return (
    <Badge className={variants[difficulty]} variant="secondary">
      {difficulty}
    </Badge>
  );
};

// Category badge component
const CategoryBadge = ({
  category,
}: {
  category: PsychologicalModule["kategori"];
}) => {
  const variants = {
    Kepribadian: "bg-pink-100 text-pink-700",
    Inteligensi: "bg-cyan-100 text-cyan-700",
    "Minat Bakat": "bg-emerald-100 text-emerald-700",
    "Kondisi Mental": "bg-amber-100 text-amber-700",
    Kerja: "bg-indigo-100 text-indigo-700",
  };

  return (
    <Badge className={variants[category]} variant="secondary">
      {category}
    </Badge>
  );
};

export default function ModulesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filter dan pencarian data
  const filteredModules = useMemo(() => {
    return dummyModules.filter((module) => {
      const matchesSearch =
        module.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
        module.deskripsi.toLowerCase().includes(searchTerm.toLowerCase()) ||
        module.dibuatOleh.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        categoryFilter === "all" || module.kategori === categoryFilter;
      const matchesStatus =
        statusFilter === "all" || module.status === statusFilter;
      const matchesDifficulty =
        difficultyFilter === "all" ||
        module.tingkatKesulitan === difficultyFilter;

      return (
        matchesSearch && matchesCategory && matchesStatus && matchesDifficulty
      );
    });
  }, [searchTerm, categoryFilter, statusFilter, difficultyFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredModules.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentModules = filteredModules.slice(startIndex, endIndex);

  // Reset pagination when filters change
  const handleFilterChange = () => {
    setCurrentPage(1);
  };

  // Format tanggal
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Statistik singkat
  const stats = {
    total: dummyModules.length,
    aktif: dummyModules.filter((m) => m.status === "Aktif").length,
    draft: dummyModules.filter((m) => m.status === "Draft").length,
    totalPengguna: dummyModules.reduce((sum, m) => sum + m.jumlahPengguna, 0),
  };

  return (
    <LayoutDashboard>
      <div className="flex flex-1 flex-col gap-4 p-4">
        {/* Header Section */}
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground">
              Modul Psikotes
            </h1>
            <p className="text-muted-foreground max-w-2xl text-sm">
              Kelola berbagai jenis modul psikotes untuk evaluasi kandidat. Buat
              modul baru, edit yang sudah ada, dan pantau performa setiap tes
              untuk pengambilan keputusan yang tepat.
            </p>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <Settings className="h-4 w-4" />
              Pengaturan Modul
            </Button>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Buat Modul Baru
            </Button>
          </div>
        </div>

        {/* Statistik Singkat */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Modul</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-xs text-muted-foreground">
                Tersedia dalam sistem
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Modul Aktif</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {stats.aktif}
              </div>
              <p className="text-xs text-muted-foreground">
                Siap digunakan untuk tes
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Draft Modul</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">
                {stats.draft}
              </div>
              <p className="text-xs text-muted-foreground">
                Dalam tahap pengembangan
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Pengguna
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {stats.totalPengguna.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                Telah menggunakan modul
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filter dan Pencarian */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filter & Pencarian Modul
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 md:flex-row md:items-end">
              <div className="flex-1">
                <Label htmlFor="search">Cari Modul</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="Cari nama modul, deskripsi, atau pembuat..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      handleFilterChange();
                    }}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="w-full md:w-48">
                <Label htmlFor="category-filter">Kategori</Label>
                <Select
                  value={categoryFilter}
                  onValueChange={(value) => {
                    setCategoryFilter(value);
                    handleFilterChange();
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Kategori</SelectItem>
                    <SelectItem value="Kepribadian">Kepribadian</SelectItem>
                    <SelectItem value="Inteligensi">Inteligensi</SelectItem>
                    <SelectItem value="Minat Bakat">Minat Bakat</SelectItem>
                    <SelectItem value="Kondisi Mental">
                      Kondisi Mental
                    </SelectItem>
                    <SelectItem value="Kerja">Kerja</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="w-full md:w-48">
                <Label htmlFor="status-filter">Status</Label>
                <Select
                  value={statusFilter}
                  onValueChange={(value) => {
                    setStatusFilter(value);
                    handleFilterChange();
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Status</SelectItem>
                    <SelectItem value="Aktif">Aktif</SelectItem>
                    <SelectItem value="Tidak Aktif">Tidak Aktif</SelectItem>
                    <SelectItem value="Draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="w-full md:w-48">
                <Label htmlFor="difficulty-filter">Tingkat Kesulitan</Label>
                <Select
                  value={difficultyFilter}
                  onValueChange={(value) => {
                    setDifficultyFilter(value);
                    handleFilterChange();
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Tingkat" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Tingkat</SelectItem>
                    <SelectItem value="Mudah">Mudah</SelectItem>
                    <SelectItem value="Sedang">Sedang</SelectItem>
                    <SelectItem value="Sulit">Sulit</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabel Modul */}
        <Card>
          <CardHeader>
            <CardTitle>Daftar Modul Psikotes</CardTitle>
            <CardDescription>
              Menampilkan {filteredModules.length} dari {dummyModules.length}{" "}
              modul
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama & Kategori</TableHead>
                    <TableHead>Durasi & Soal</TableHead>
                    <TableHead>Tingkat Kesulitan</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Statistik</TableHead>
                    <TableHead>Terakhir Diubah</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentModules.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8">
                        <div className="text-muted-foreground">
                          Tidak ada modul yang ditemukan
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    currentModules.map((module) => (
                      <TableRow key={module.id}>
                        <TableCell>
                          <div className="space-y-2">
                            <div className="font-medium">{module.nama}</div>
                            <div className="flex items-center gap-2">
                              <CategoryBadge category={module.kategori} />
                            </div>
                            <div className="text-sm text-muted-foreground max-w-xs truncate">
                              {module.deskripsi}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center gap-1 text-sm">
                              <Clock className="h-3 w-3 text-muted-foreground" />
                              {module.durasi} menit
                            </div>
                            <div className="flex items-center gap-1 text-sm">
                              <FileText className="h-3 w-3 text-muted-foreground" />
                              {module.jumlahSoal} soal
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <DifficultyBadge
                            difficulty={module.tingkatKesulitan}
                          />
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={module.status} />
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1 text-sm">
                            <div className="flex items-center gap-1">
                              <Users className="h-3 w-3 text-muted-foreground" />
                              {module.jumlahPengguna} pengguna
                            </div>
                            {module.status === "Aktif" && (
                              <>
                                <div className="flex items-center gap-1">
                                  <BarChart3 className="h-3 w-3 text-muted-foreground" />
                                  Skor: {module.rataRataSkor}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Target className="h-3 w-3 text-muted-foreground" />
                                  {module.tingkatPenyelesaian}% selesai
                                </div>
                              </>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1 text-sm">
                            <div>{formatDate(module.terakhirDiubah)}</div>
                            <div className="text-muted-foreground">
                              oleh {module.dibuatOleh}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Buka menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Aksi Modul</DropdownMenuLabel>
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                Lihat Detail
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Modul
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Copy className="mr-2 h-4 w-4" />
                                Duplikasi
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>
                                <BarChart3 className="mr-2 h-4 w-4" />
                                Lihat Statistik
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Hapus Modul
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-2 py-4">
                <div className="text-sm text-muted-foreground">
                  Menampilkan {startIndex + 1} hingga{" "}
                  {Math.min(endIndex, filteredModules.length)} dari{" "}
                  {filteredModules.length} modul
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Sebelumnya
                  </Button>
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(page)}
                          className="w-8 h-8 p-0"
                        >
                          {page}
                        </Button>
                      )
                    )}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Berikutnya
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions Section */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors mb-3">
                <Plus className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Buat Modul Baru</CardTitle>
              <CardDescription>
                Mulai dari template atau buat modul psikotes kustom sesuai
                kebutuhan spesifik
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors mb-3">
                <Copy className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle>Import Template</CardTitle>
              <CardDescription>
                Import modul dari template standar industri atau file eksternal
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors mb-3">
                <BarChart3 className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle>Analisis Performa</CardTitle>
              <CardDescription>
                Lihat statistik lengkap dan performa semua modul yang telah
                digunakan
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Info Panel */}
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-900">
              <Brain className="h-5 w-5" />
              Tips Penggunaan Modul
            </CardTitle>
          </CardHeader>
          <CardContent className="text-blue-800">
            <div className="grid gap-3 md:grid-cols-2">
              <div>
                <h4 className="font-semibold mb-2">Praktik Terbaik:</h4>
                <ul className="text-sm space-y-1">
                  <li>
                    • Gunakan kombinasi beberapa modul untuk evaluasi
                    komprehensif
                  </li>
                  <li>
                    • Sesuaikan durasi tes dengan tingkat posisi yang dilamar
                  </li>
                  <li>
                    • Lakukan kalibrasi berkala untuk memastikan validitas hasil
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Rekomendasi Modul:</h4>
                <ul className="text-sm space-y-1">
                  <li>
                    • <strong>Entry Level:</strong> DISC, Big Five, Holland
                    Interest
                  </li>
                  <li>
                    • <strong>Middle Management:</strong> IQ Test, EQ,
                    Leadership Style
                  </li>
                  <li>
                    • <strong>Senior Level:</strong> CAT, Work Values, Stress
                    Management
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </LayoutDashboard>
  );
}
