"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
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
  UserPlus,
  Upload,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Mail,
  Phone,
  Calendar,
  MapPin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// Tipe data peserta
interface Participant {
  id: string;
  nama: string;
  jenisKelamin: "Laki-laki" | "Perempuan";
  tanggalLahir: string;
  usia: number;
  domisili: string;
  noHp: string;
  email: string;
  status:
    | "Belum Test"
    | "Sedang Test"
    | "Lulus"
    | "Tidak Lulus"
    | "Terjadwal"
    | "Dibatalkan";
  tanggalDaftar: string;
  tesSelesai?: string;
}

// Data dummy peserta
const dummyParticipants: Participant[] = [
  {
    id: "P001",
    nama: "Ahmad Fauzi Rahman",
    jenisKelamin: "Laki-laki",
    tanggalLahir: "1995-03-15",
    usia: 29,
    domisili: "Kebayoran Baru, Jakarta Selatan",
    noHp: "081234567890",
    email: "ahmad.fauzi@email.com",
    status: "Lulus",
    tanggalDaftar: "2024-01-15",
    tesSelesai: "2024-01-20",
  },
  {
    id: "P002",
    nama: "Siti Nurhaliza",
    jenisKelamin: "Perempuan",
    tanggalLahir: "1992-07-22",
    usia: 32,
    domisili: "Menteng, Jakarta Pusat",
    noHp: "081234567891",
    email: "siti.nurhaliza@email.com",
    status: "Sedang Test",
    tanggalDaftar: "2024-01-18",
  },
  {
    id: "P003",
    nama: "Budi Santoso",
    jenisKelamin: "Laki-laki",
    tanggalLahir: "1990-11-08",
    usia: 34,
    domisili: "Serpong, Tangerang Selatan",
    noHp: "081234567892",
    email: "budi.santoso@email.com",
    status: "Belum Test",
    tanggalDaftar: "2024-01-20",
  },
  {
    id: "P004",
    nama: "Diana Putri",
    jenisKelamin: "Perempuan",
    tanggalLahir: "1993-05-12",
    usia: 31,
    domisili: "Bekasi Utara, Bekasi",
    noHp: "081234567893",
    email: "diana.putri@email.com",
    status: "Lulus",
    tanggalDaftar: "2024-01-12",
    tesSelesai: "2024-01-17",
  },
  {
    id: "P005",
    nama: "Rizki Pratama",
    jenisKelamin: "Laki-laki",
    tanggalLahir: "1994-09-30",
    usia: 30,
    domisili: "Cibubur, Depok",
    noHp: "081234567894",
    email: "rizki.pratama@email.com",
    status: "Tidak Lulus",
    tanggalDaftar: "2024-01-10",
    tesSelesai: "2024-01-15",
  },
  {
    id: "P006",
    nama: "Maya Sari",
    jenisKelamin: "Perempuan",
    tanggalLahir: "1996-02-14",
    usia: 28,
    domisili: "Gading Serpong, Tangerang",
    noHp: "081234567895",
    email: "maya.sari@email.com",
    status: "Terjadwal",
    tanggalDaftar: "2024-01-22",
  },
  {
    id: "P007",
    nama: "Andi Kurniawan",
    jenisKelamin: "Laki-laki",
    tanggalLahir: "1991-12-05",
    usia: 33,
    domisili: "Pondok Indah, Jakarta Selatan",
    noHp: "081234567896",
    email: "andi.kurniawan@email.com",
    status: "Sedang Test",
    tanggalDaftar: "2024-01-19",
  },
  {
    id: "P008",
    nama: "Lestari Dewi",
    jenisKelamin: "Perempuan",
    tanggalLahir: "1989-08-18",
    usia: 35,
    domisili: "Kemang, Jakarta Selatan",
    noHp: "081234567897",
    email: "lestari.dewi@email.com",
    status: "Lulus",
    tanggalDaftar: "2024-01-08",
    tesSelesai: "2024-01-13",
  },
  {
    id: "P009",
    nama: "Hendro Wijaya",
    jenisKelamin: "Laki-laki",
    tanggalLahir: "1997-04-25",
    usia: 27,
    domisili: "BSD City, Tangerang Selatan",
    noHp: "081234567898",
    email: "hendro.wijaya@email.com",
    status: "Belum Test",
    tanggalDaftar: "2024-01-23",
  },
  {
    id: "P010",
    nama: "Fitri Handayani",
    jenisKelamin: "Perempuan",
    tanggalLahir: "1993-10-07",
    usia: 31,
    domisili: "Kelapa Gading, Jakarta Utara",
    noHp: "081234567899",
    email: "fitri.handayani@email.com",
    status: "Dibatalkan",
    tanggalDaftar: "2024-01-16",
  },
  {
    id: "P011",
    nama: "Dedi Supriadi",
    jenisKelamin: "Laki-laki",
    tanggalLahir: "1988-06-20",
    usia: 36,
    domisili: "Cengkareng, Jakarta Barat",
    noHp: "081234567800",
    email: "dedi.supriadi@email.com",
    status: "Lulus",
    tanggalDaftar: "2024-01-05",
    tesSelesai: "2024-01-10",
  },
  {
    id: "P012",
    nama: "Nur Aini",
    jenisKelamin: "Perempuan",
    tanggalLahir: "1995-01-11",
    usia: 29,
    domisili: "Cinere, Depok",
    noHp: "081234567801",
    email: "nur.aini@email.com",
    status: "Sedang Test",
    tanggalDaftar: "2024-01-21",
  },
  {
    id: "P013",
    nama: "Agus Setiawan",
    jenisKelamin: "Laki-laki",
    tanggalLahir: "1992-03-28",
    usia: 32,
    domisili: "Cilandak, Jakarta Selatan",
    noHp: "081234567802",
    email: "agus.setiawan@email.com",
    status: "Terjadwal",
    tanggalDaftar: "2024-01-24",
  },
  {
    id: "P014",
    nama: "Wulan Dari",
    jenisKelamin: "Perempuan",
    tanggalLahir: "1994-07-03",
    usia: 30,
    domisili: "Cipete, Jakarta Selatan",
    noHp: "081234567803",
    email: "wulan.dari@email.com",
    status: "Tidak Lulus",
    tanggalDaftar: "2024-01-11",
    tesSelesai: "2024-01-16",
  },
  {
    id: "P015",
    nama: "Irwan Setiabudi",
    jenisKelamin: "Laki-laki",
    tanggalLahir: "1990-09-15",
    usia: 34,
    domisili: "PIK, Jakarta Utara",
    noHp: "081234567804",
    email: "irwan.setiabudi@email.com",
    status: "Belum Test",
    tanggalDaftar: "2024-01-25",
  },
  {
    id: "P016",
    nama: "Ratna Sari",
    jenisKelamin: "Perempuan",
    tanggalLahir: "1996-12-02",
    usia: 28,
    domisili: "Bintaro, Tangerang Selatan",
    noHp: "081234567805",
    email: "ratna.sari@email.com",
    status: "Lulus",
    tanggalDaftar: "2024-01-07",
    tesSelesai: "2024-01-12",
  },
  {
    id: "P017",
    nama: "Teguh Prasetyo",
    jenisKelamin: "Laki-laki",
    tanggalLahir: "1987-11-19",
    usia: 37,
    domisili: "Bogor Tengah, Bogor",
    noHp: "081234567806",
    email: "teguh.prasetyo@email.com",
    status: "Sedang Test",
    tanggalDaftar: "2024-01-26",
  },
  {
    id: "P018",
    nama: "Indah Permata",
    jenisKelamin: "Perempuan",
    tanggalLahir: "1991-05-26",
    usia: 33,
    domisili: "Setiabudi, Jakarta Selatan",
    noHp: "081234567807",
    email: "indah.permata@email.com",
    status: "Terjadwal",
    tanggalDaftar: "2024-01-27",
  },
  {
    id: "P019",
    nama: "Bambang Sutrisno",
    jenisKelamin: "Laki-laki",
    tanggalLahir: "1989-08-14",
    usia: 35,
    domisili: "Cibinong, Bogor",
    noHp: "081234567808",
    email: "bambang.sutrisno@email.com",
    status: "Tidak Lulus",
    tanggalDaftar: "2024-01-09",
    tesSelesai: "2024-01-14",
  },
  {
    id: "P020",
    nama: "Dewi Kartika",
    jenisKelamin: "Perempuan",
    tanggalLahir: "1998-01-30",
    usia: 26,
    domisili: "Pancoran, Jakarta Selatan",
    noHp: "081234567809",
    email: "dewi.kartika@email.com",
    status: "Belum Test",
    tanggalDaftar: "2024-01-28",
  },
];

// Status badge component
const StatusBadge = ({ status }: { status: Participant["status"] }) => {
  const variants = {
    "Belum Test": "bg-gray-100 text-gray-700 hover:bg-gray-200",
    "Sedang Test": "bg-blue-100 text-blue-700 hover:bg-blue-200",
    Lulus: "bg-green-100 text-green-700 hover:bg-green-200",
    "Tidak Lulus": "bg-red-100 text-red-700 hover:bg-red-200",
    Terjadwal: "bg-yellow-100 text-yellow-700 hover:bg-yellow-200",
    Dibatalkan: "bg-gray-100 text-gray-500 hover:bg-gray-200",
  };

  return (
    <Badge className={variants[status]} variant="secondary">
      {status}
    </Badge>
  );
};

export default function ParticipantsPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [genderFilter, setGenderFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter dan pencarian data
  const filteredParticipants = useMemo(() => {
    return dummyParticipants.filter((participant) => {
      const matchesSearch =
        participant.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
        participant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        participant.noHp.includes(searchTerm) ||
        participant.domisili.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || participant.status === statusFilter;
      const matchesGender =
        genderFilter === "all" || participant.jenisKelamin === genderFilter;

      return matchesSearch && matchesStatus && matchesGender;
    });
  }, [searchTerm, statusFilter, genderFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredParticipants.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentParticipants = filteredParticipants.slice(startIndex, endIndex);

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

  return (
    <LayoutDashboard>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        {/* Header Section */}
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground">
              Manajemen Peserta
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              Kelola data peserta psikotes, pantau status tes, dan atur jadwal
              evaluasi dengan sistem yang terintegrasi dan efisien.
            </p>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <Upload className="h-4 w-4" />
              Import Data Peserta
            </Button>
            <Button className="gap-2">
              <UserPlus className="h-4 w-4" />
              Tambah Peserta
            </Button>
          </div>
        </div>

        {/* Statistik Singkat */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Peserta
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {dummyParticipants.length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sudah Lulus</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {dummyParticipants.filter((p) => p.status === "Lulus").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sedang Test</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {
                  dummyParticipants.filter((p) => p.status === "Sedang Test")
                    .length
                }
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Belum Test</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-600">
                {
                  dummyParticipants.filter((p) => p.status === "Belum Test")
                    .length
                }
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filter dan Pencarian */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filter & Pencarian
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 md:flex-row md:items-end">
              <div className="flex-1">
                <Label htmlFor="search">Cari Peserta</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="Cari nama, email, atau nomor HP..."
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
                    <SelectItem value="Belum Test">Belum Test</SelectItem>
                    <SelectItem value="Sedang Test">Sedang Test</SelectItem>
                    <SelectItem value="Lulus">Lulus</SelectItem>
                    <SelectItem value="Tidak Lulus">Tidak Lulus</SelectItem>
                    <SelectItem value="Terjadwal">Terjadwal</SelectItem>
                    <SelectItem value="Dibatalkan">Dibatalkan</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="w-full md:w-48">
                <Label htmlFor="gender-filter">Jenis Kelamin</Label>
                <Select
                  value={genderFilter}
                  onValueChange={(value) => {
                    setGenderFilter(value);
                    handleFilterChange();
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Jenis Kelamin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua</SelectItem>
                    <SelectItem value="Laki-laki">Laki-laki</SelectItem>
                    <SelectItem value="Perempuan">Perempuan</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabel Peserta */}
        <Card>
          <CardHeader>
            <CardTitle>Daftar Peserta</CardTitle>
            <CardDescription>
              Menampilkan {filteredParticipants.length} dari{" "}
              {dummyParticipants.length} peserta
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Peserta</TableHead>
                    <TableHead>Jenis Kelamin</TableHead>
                    <TableHead>Usia</TableHead>
                    <TableHead>Domisili</TableHead>
                    <TableHead>Kontak</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Tanggal Daftar</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentParticipants.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8">
                        <div className="text-muted-foreground">
                          Tidak ada peserta yang ditemukan
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    currentParticipants.map((participant) => (
                      <TableRow key={participant.id}>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="font-medium">
                              {participant.nama}
                            </div>
                            <div className="text-sm text-muted-foreground flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              {participant.email}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{participant.jenisKelamin}</TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div>{participant.usia} tahun</div>
                            <div className="text-sm text-muted-foreground flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {formatDate(participant.tanggalLahir)}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-sm">
                            <MapPin className="h-3 w-3 text-muted-foreground" />
                            <span
                              className="max-w-[150px] truncate"
                              title={participant.domisili}
                            >
                              {participant.domisili}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-sm">
                            <Phone className="h-3 w-3 text-muted-foreground" />
                            {participant.noHp}
                          </div>
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={participant.status} />
                        </TableCell>
                        <TableCell>
                          {formatDate(participant.tanggalDaftar)}
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
                              <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                              <DropdownMenuItem
                                onClick={() =>
                                  router.push(`/participants/${participant.id}`)
                                }
                              >
                                <Eye className="mr-2 h-4 w-4" />
                                Lihat Detail
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Peserta
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Hapus Peserta
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
                  {Math.min(endIndex, filteredParticipants.length)} dari{" "}
                  {filteredParticipants.length} peserta
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
      </div>
    </LayoutDashboard>
  );
}
