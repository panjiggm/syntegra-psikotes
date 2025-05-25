"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import LayoutDashboard from "@/layout/LayoutDashboard";
import {
  Brain,
  FileText,
  Users,
  Target,
  BookOpen,
  Clock,
  Star,
  Zap,
  Rocket,
  Mail,
  Bell,
  ChevronRight,
  Download,
  Copy,
  Heart,
  Sparkles,
} from "lucide-react";

// Data dummy untuk preview template yang akan datang
const upcomingTemplates = [
  {
    id: "TEMP001",
    nama: "MBTI Personality Indicator",
    kategori: "Kepribadian",
    deskripsi:
      "Template lengkap untuk tes kepribadian berdasarkan Myers-Briggs Type Indicator dengan 16 tipe kepribadian",
    estimasiSoal: 93,
    durasi: 30,
    tingkatKesulitan: "Sedang",
    popularitas: 95,
    icon: Brain,
    color: "bg-purple-100 text-purple-700",
  },
  {
    id: "TEMP002",
    nama: "Tes Potensi Akademik (TPA)",
    kategori: "Inteligensi",
    deskripsi:
      "Template TPA komprehensif meliputi verbal, numerik, dan logika untuk seleksi perguruan tinggi dan beasiswa",
    estimasiSoal: 120,
    durasi: 90,
    tingkatKesulitan: "Sulit",
    popularitas: 88,
    icon: Target,
    color: "bg-blue-100 text-blue-700",
  },
  {
    id: "TEMP003",
    nama: "Holland Career Interest",
    kategori: "Minat Bakat",
    deskripsi:
      "Template untuk mengidentifikasi minat karir berdasarkan 6 tipe kepribadian Holland (RIASEC)",
    estimasiSoal: 60,
    durasi: 20,
    tingkatKesulitan: "Mudah",
    popularitas: 78,
    icon: Star,
    color: "bg-green-100 text-green-700",
  },
  {
    id: "TEMP004",
    nama: "Tes Wartegg Lengkap",
    kategori: "Kepribadian",
    deskripsi:
      "Template tes Wartegg untuk evaluasi kepribadian melalui gambar dan interpretasi psikologis",
    estimasiSoal: 8,
    durasi: 45,
    tingkatKesulitan: "Sulit",
    popularitas: 72,
    icon: FileText,
    color: "bg-orange-100 text-orange-700",
  },
  {
    id: "TEMP005",
    nama: "Burnout Assessment Tool",
    kategori: "Kondisi Mental",
    deskripsi:
      "Template untuk mengukur tingkat burnout dan kelelahan mental di tempat kerja",
    estimasiSoal: 42,
    durasi: 15,
    tingkatKesulitan: "Mudah",
    popularitas: 85,
    icon: Heart,
    color: "bg-red-100 text-red-700",
  },
  {
    id: "TEMP006",
    nama: "Team Building Assessment",
    kategori: "Kerja",
    deskripsi:
      "Template untuk evaluasi dinamika tim dan kesesuaian peran dalam kelompok kerja",
    estimasiSoal: 38,
    durasi: 25,
    tingkatKesulitan: "Sedang",
    popularitas: 91,
    icon: Users,
    color: "bg-cyan-100 text-cyan-700",
  },
];

const features = [
  {
    icon: Download,
    title: "Template Siap Pakai",
    description:
      "Library template psikotes yang telah divalidasi secara ilmiah dan siap digunakan langsung",
  },
  {
    icon: Copy,
    title: "Kustomisasi Mudah",
    description:
      "Modifikasi template sesuai kebutuhan dengan editor drag-and-drop yang intuitif",
  },
  {
    icon: Zap,
    title: "Implementasi Cepat",
    description:
      "Deploy template ke sistem dalam hitungan menit dengan konfigurasi minimal",
  },
  {
    icon: Target,
    title: "Standar Industri",
    description:
      "Template mengikuti standar psikologi terkini dan best practices internasional",
  },
];

const stats = [
  { label: "Template Tersedia", value: "50+", icon: BookOpen },
  { label: "Kategori Psikotes", value: "12", icon: Brain },
  { label: "Bahasa Didukung", value: "5", icon: FileText },
  { label: "Tingkat Akurasi", value: "96%", icon: Target },
];

export default function TemplatesPage() {
  return (
    <LayoutDashboard>
      <div className="flex flex-1 flex-col gap-6 p-4">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-full blur-xl"></div>
              <div className="relative bg-gradient-to-r from-primary to-blue-500 p-4 rounded-full">
                <Sparkles className="h-12 w-12 text-white" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Badge className="bg-gradient-to-r from-primary to-blue-500 text-white px-4 py-1">
              <Rocket className="h-3 w-3 mr-1" />
              Segera Hadir
            </Badge>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Template Modul Psikotes
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Koleksi template psikotes premium yang telah divalidasi oleh para
              ahli psikologi. Siap pakai dengan kustomisasi penuh untuk
              kebutuhan rekrutmen Anda.
            </p>
          </div>
        </div>

        {/* Coming Soon Banner */}
        <Card className="border-2 border-dashed border-primary/30 bg-gradient-to-r from-primary/5 to-blue-500/5">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="flex justify-center space-x-2">
                <div className="w-3 h-3 bg-primary rounded-full animate-bounce"></div>
                <div
                  className="w-3 h-3 bg-primary rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-3 h-3 bg-primary rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
              <h2 className="text-2xl font-bold text-primary">
                Sedang Dalam Pengembangan
              </h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Tim ahli psikologi kami sedang mempersiapkan template-template
                berkualitas tinggi untuk mempermudah proses rekrutmen Anda.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button className="gap-2">
                  <Bell className="h-4 w-4" />
                  Beritahu Saya Saat Tersedia
                </Button>
                <Button variant="outline" className="gap-2">
                  <Mail className="h-4 w-4" />
                  Bergabung dengan Waiting List
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        <div className="grid gap-4 md:grid-cols-4">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="text-center hover:shadow-lg transition-shadow"
            >
              <CardContent className="pt-6">
                <div className="flex flex-col items-center space-y-2">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Preview Templates */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold">
              Preview Template yang Akan Datang
            </h3>
            <Badge variant="outline" className="text-primary border-primary">
              Dalam Pengembangan
            </Badge>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {upcomingTemplates.map((template) => {
              const IconComponent = template.icon;
              return (
                <Card
                  key={template.id}
                  className="hover:shadow-lg transition-all duration-300 group opacity-75"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${template.color}`}>
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <div>
                          <CardTitle className="text-lg group-hover:text-primary transition-colors">
                            {template.nama}
                          </CardTitle>
                          <Badge className={template.color} variant="secondary">
                            {template.kategori}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <CardDescription className="mt-2">
                      {template.deskripsi}
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <div className="flex items-center gap-1">
                          <FileText className="h-3 w-3 text-muted-foreground" />
                          <span>{template.estimasiSoal} soal</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span>{template.durasi} menit</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <Badge
                          className={
                            template.tingkatKesulitan === "Mudah"
                              ? "bg-green-100 text-green-700"
                              : template.tingkatKesulitan === "Sedang"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                          }
                          variant="secondary"
                        >
                          {template.tingkatKesulitan}
                        </Badge>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium">
                            {template.popularitas}%
                          </span>
                        </div>
                      </div>

                      <div className="pt-2">
                        <Button
                          variant="outline"
                          className="w-full opacity-50 cursor-not-allowed"
                          disabled
                        >
                          Segera Tersedia
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Features Section */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-center">
            Fitur yang Akan Hadir
          </h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow"
              >
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center space-y-3">
                    <div className="p-3 bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-full">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h4 className="font-semibold">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground text-center">
                      {feature.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <Card className="bg-gradient-to-r from-primary/10 via-blue-500/10 to-purple-500/10 border-primary/20">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-bold">
                Tertarik dengan Template Premium?
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Daftarkan email Anda untuk mendapat notifikasi pertama kali saat
                template tersedia, plus akses early bird dengan harga spesial!
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="masukkan@email.anda"
                  className="flex-1 px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button className="gap-2">
                  <Mail className="h-4 w-4" />
                  Daftarkan
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                * Kami menghargai privasi Anda. Email hanya digunakan untuk
                notifikasi template.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Timeline */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Roadmap Pengembangan
            </CardTitle>
            <CardDescription>
              Jadwal rilis template modul psikotes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-4 h-4 bg-primary rounded-full"></div>
                <div className="flex-1">
                  <div className="font-medium">
                    Q2 2025 - Template Kepribadian
                  </div>
                  <div className="text-sm text-muted-foreground">
                    MBTI, Big Five, DISC Premium
                  </div>
                </div>
                <Badge className="bg-blue-100 text-blue-700">
                  Dalam Proses
                </Badge>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-4 h-4 bg-muted rounded-full"></div>
                <div className="flex-1">
                  <div className="font-medium">
                    Q3 2025 - Template Inteligensi
                  </div>
                  <div className="text-sm text-muted-foreground">
                    IQ, TPA, Cognitive Assessment
                  </div>
                </div>
                <Badge variant="outline">Direncanakan</Badge>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-4 h-4 bg-muted rounded-full"></div>
                <div className="flex-1">
                  <div className="font-medium">Q4 2025 - Template Khusus</div>
                  <div className="text-sm text-muted-foreground">
                    Leadership, Team Building, Stress Management
                  </div>
                </div>
                <Badge variant="outline">Direncanakan</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Section */}
        <Card className="border-2 border-primary/20 bg-primary/5">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <h3 className="text-xl font-bold">
                Punya Pertanyaan atau Saran Template?
              </h3>
              <p className="text-muted-foreground">
                Tim kami senang mendengar masukan dari Anda untuk mengembangkan
                template yang sesuai kebutuhan
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button variant="outline" className="gap-2">
                  <Mail className="h-4 w-4" />
                  Hubungi Tim Pengembang
                </Button>
                <Button variant="outline" className="gap-2">
                  <FileText className="h-4 w-4" />
                  Request Template Khusus
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </LayoutDashboard>
  );
}
