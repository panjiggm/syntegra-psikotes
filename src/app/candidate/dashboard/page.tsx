"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Brain,
  Clock,
  CheckCircle,
  Play,
  Award,
  TrendingUp,
  Users,
  Target,
  Heart,
  Shield,
  Calendar,
  FileText,
  AlertCircle,
  Info,
  Star,
  BookOpen,
  Timer,
  BarChart3,
  User,
  Mail,
  MapPin,
  Phone,
  Briefcase,
  Bell,
  Settings as SettingsIcon,
  Download,
  Share2,
  Camera,
  Mic,
  Eye,
  Wifi,
  Battery,
  Signal,
  Activity,
} from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import Link from "next/link";
import LayoutCandidate from "@/layout/LayoutCandidate";

// Mock data untuk dashboard kandidat yang komprehensif
const dashboardData = {
  candidate: {
    name: "Ahmad Fauzi Rahman",
    email: "ahmadfauzi@gmail.com",
    testCode: "PSI2025001",
    position: "Senior Software Engineer",
    department: "Engineering",
    registrationDate: "2025-01-10",
    lastLogin: "2025-01-16T09:30:00Z",
    profileCompletion: 85,
  },

  testProgress: {
    totalTests: 8,
    completedTests: 3,
    availableTests: 2,
    lockedTests: 3,
    overallProgress: 37.5,
    averageScore: 85,
    highestScore: 112,
    totalTimeSpent: 158, // in minutes
  },

  tests: [
    {
      id: 1,
      name: "DISC Assessment",
      description: "Analisis kepribadian dan gaya komunikasi",
      icon: Target,
      duration: 25,
      questions: 48,
      status: "completed",
      score: 85,
      percentile: 78,
      completedAt: "2025-01-15T10:30:00Z",
      color: "from-green-500 to-emerald-600",
      category: "Kepribadian",
      difficulty: "Menengah",
      insights: [
        "Anda memiliki kecenderungan kepemimpinan yang kuat",
        "Gaya komunikasi cenderung langsung dan tegas",
      ],
    },
    {
      id: 2,
      name: "Big Five Personality",
      description: "Tes kepribadian lima faktor utama",
      icon: Users,
      duration: 30,
      questions: 60,
      status: "completed",
      score: 78,
      percentile: 65,
      completedAt: "2025-01-14T14:15:00Z",
      color: "from-blue-500 to-indigo-600",
      category: "Kepribadian",
      difficulty: "Menengah",
      insights: [
        "Skor tinggi pada Conscientiousness dan Openness",
        "Menunjukkan kreativitas dan kedisiplinan yang baik",
      ],
    },
    {
      id: 3,
      name: "IQ Test",
      description: "Tes kecerdasan dan kemampuan logika",
      icon: Brain,
      duration: 45,
      questions: 40,
      status: "completed",
      score: 112,
      percentile: 85,
      completedAt: "2025-01-13T16:45:00Z",
      color: "from-purple-500 to-violet-600",
      category: "Kognitif",
      difficulty: "Tinggi",
      insights: [
        "IQ di atas rata-rata populasi umum",
        "Kekuatan pada reasoning logis dan spatial",
      ],
    },
    {
      id: 4,
      name: "Emotional Intelligence",
      description: "Tes kecerdasan emosional",
      icon: Heart,
      duration: 20,
      questions: 35,
      status: "available",
      color: "from-yellow-400 to-amber-500",
      category: "Emosional",
      difficulty: "Menengah",
      estimatedTime: "20 menit",
      tips: [
        "Jawab berdasarkan pengalaman nyata",
        "Tidak ada jawaban benar atau salah",
        "Fokus pada respons emosional natural",
      ],
    },
    {
      id: 5,
      name: "Leadership Style",
      description: "Evaluasi gaya kepemimpinan",
      icon: TrendingUp,
      duration: 30,
      questions: 50,
      status: "available",
      color: "from-pink-500 to-rose-600",
      category: "Kepemimpinan",
      difficulty: "Tinggi",
      estimatedTime: "30 menit",
      tips: [
        "Bayangkan diri Anda dalam posisi leadership",
        "Pertimbangkan berbagai situasi kerja",
        "Jawab sesuai dengan style natural Anda",
      ],
    },
    {
      id: 6,
      name: "Stress Management",
      description: "Kemampuan mengelola stres",
      icon: Shield,
      duration: 25,
      questions: 42,
      status: "locked",
      color: "from-cyan-500 to-blue-600",
      category: "Resiliensi",
      difficulty: "Menengah",
      unlockCondition: "Selesaikan Emotional Intelligence test",
    },
    {
      id: 7,
      name: "Team Compatibility",
      description: "Analisis kompatibilitas tim",
      icon: Users,
      duration: 20,
      questions: 38,
      status: "locked",
      color: "from-teal-500 to-green-600",
      category: "Tim Kerja",
      difficulty: "Menengah",
      unlockCondition: "Selesaikan Leadership Style test",
    },
    {
      id: 8,
      name: "Creativity Index",
      description: "Tingkat kreativitas dan inovasi",
      icon: Star,
      duration: 35,
      questions: 45,
      status: "locked",
      color: "from-orange-500 to-red-600",
      category: "Kreativitas",
      difficulty: "Tinggi",
      unlockCondition: "Selesaikan semua tes dasar",
    },
  ],

  recentActivity: [
    {
      id: 1,
      type: "test_completed",
      title: "Menyelesaikan IQ Test",
      description: "Skor: 112 (Percentile 85)",
      timestamp: "2025-01-13T16:45:00Z",
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      id: 2,
      type: "test_completed",
      title: "Menyelesaikan Big Five Personality",
      description: "Skor: 78 (Percentile 65)",
      timestamp: "2025-01-14T14:15:00Z",
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      id: 3,
      type: "test_completed",
      title: "Menyelesaikan DISC Assessment",
      description: "Skor: 85 (Percentile 78)",
      timestamp: "2025-01-15T10:30:00Z",
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      id: 4,
      type: "profile_updated",
      title: "Profil diperbarui",
      description: "Kelengkapan profil: 85%",
      timestamp: "2025-01-10T12:00:00Z",
      icon: User,
      color: "text-blue-600",
    },
  ],

  systemStatus: {
    internetConnection: "stable",
    cameraAccess: "granted",
    microphoneAccess: "granted",
    browserCompatibility: "optimal",
    lastSystemCheck: "2025-01-16T09:00:00Z",
  },

  notifications: [
    {
      id: 1,
      type: "test_available",
      title: "Tes Baru Tersedia",
      message: "Emotional Intelligence Test sudah dapat dikerjakan",
      timestamp: "2025-01-16T08:00:00Z",
      isRead: false,
      priority: "high",
    },
    {
      id: 2,
      type: "reminder",
      title: "Pengingat Tes",
      message: "Jangan lupa menyelesaikan tes yang tersedia",
      timestamp: "2025-01-15T18:00:00Z",
      isRead: false,
      priority: "medium",
    },
    {
      id: 3,
      type: "result_ready",
      title: "Hasil Tes Siap",
      message: "Hasil DISC Assessment sudah tersedia",
      timestamp: "2025-01-15T11:00:00Z",
      isRead: true,
      priority: "low",
    },
  ],

  upcomingTasks: [
    {
      id: 1,
      title: "Lengkapi profil kandidat",
      description: "Tambahkan informasi pendidikan dan pengalaman",
      progress: 85,
      dueDate: "2025-01-20",
      priority: "high",
    },
    {
      id: 2,
      title: "Selesaikan Emotional Intelligence Test",
      description: "Tes tersedia dan siap dikerjakan",
      progress: 0,
      dueDate: "2025-01-18",
      priority: "high",
    },
    {
      id: 3,
      title: "Review hasil tes yang sudah selesai",
      description: "Baca insight dan rekomendasi dari hasil tes",
      progress: 33,
      dueDate: "2025-01-25",
      priority: "medium",
    },
  ],
};

export default function CandidateDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 1000);

    // Update current time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const completedTests = dashboardData.tests.filter(
    (test) => test.status === "completed"
  );
  const availableTests = dashboardData.tests.filter(
    (test) => test.status === "available"
  );
  const lockedTests = dashboardData.tests.filter(
    (test) => test.status === "locked"
  );

  const getStatusBadge = (status: string, score?: number) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <CheckCircle className="h-3 w-3 mr-1" />
            Selesai {score && `(${score})`}
          </Badge>
        );
      case "available":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            <Play className="h-3 w-3 mr-1" />
            Tersedia
          </Badge>
        );
      case "locked":
        return (
          <Badge variant="outline" className="text-gray-500">
            <Shield className="h-3 w-3 mr-1" />
            Terkunci
          </Badge>
        );
      default:
        return null;
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInHours = Math.floor(
      (now.getTime() - time.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) return "Baru saja";
    if (diffInHours < 24) return `${diffInHours} jam yang lalu`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} hari yang lalu`;
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 80) return "text-blue-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-l-red-500 bg-red-50";
      case "medium":
        return "border-l-yellow-500 bg-yellow-50";
      case "low":
        return "border-l-green-500 bg-green-50";
      default:
        return "border-l-gray-500 bg-gray-50";
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <LayoutCandidate>
      <div className="space-y-8 py-8">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-primary via-yellow-500 to-amber-500 rounded-2xl p-8 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">
                  Selamat Datang, {dashboardData.candidate.name}! 👋
                </h1>
                <p className="text-white/90 mb-4 max-w-2xl">
                  Anda telah menyelesaikan {completedTests.length} dari{" "}
                  {dashboardData.testProgress.totalTests} tes psikologi. Mari
                  lanjutkan perjalanan pengembangan diri Anda dengan
                  menyelesaikan tes yang tersedia.
                </p>

                <div className="flex flex-wrap items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>Kode: {dashboardData.candidate.testCode}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4" />
                    <span>{dashboardData.candidate.position}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>
                      Terdaftar:{" "}
                      {new Date(
                        dashboardData.candidate.registrationDate
                      ).toLocaleDateString("id-ID")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>
                      Login terakhir:{" "}
                      {formatTimeAgo(dashboardData.candidate.lastLogin)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-center lg:text-right">
                <div className="inline-flex items-center justify-center w-32 h-32 bg-white/20 rounded-full mb-4">
                  <div className="text-4xl font-bold">
                    {Math.round(dashboardData.testProgress.overallProgress)}%
                  </div>
                </div>
                <p className="text-sm text-white/90">Progress Keseluruhan</p>
                <div className="mt-3">
                  <Progress
                    value={dashboardData.testProgress.overallProgress}
                    className="h-2 bg-white/20"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Tes</CardTitle>
              <Brain className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {dashboardData.testProgress.totalTests}
              </div>
              <p className="text-xs text-muted-foreground">
                {availableTests.length} tersedia, {lockedTests.length} terkunci
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tes Selesai</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {completedTests.length}
              </div>
              <p className="text-xs text-muted-foreground">
                {Math.round(
                  (completedTests.length /
                    dashboardData.testProgress.totalTests) *
                    100
                )}
                % dari total
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Rata-rata Skor
              </CardTitle>
              <Award className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div
                className={`text-2xl font-bold ${getScoreColor(
                  dashboardData.testProgress.averageScore
                )}`}
              >
                {dashboardData.testProgress.averageScore}
              </div>
              <p className="text-xs text-muted-foreground">
                Tertinggi: {dashboardData.testProgress.highestScore}
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Waktu Total</CardTitle>
              <Timer className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                {Math.floor(dashboardData.testProgress.totalTimeSpent / 60)}h{" "}
                {dashboardData.testProgress.totalTimeSpent % 60}m
              </div>
              <p className="text-xs text-muted-foreground">
                Rata-rata:{" "}
                {Math.round(
                  dashboardData.testProgress.totalTimeSpent /
                    completedTests.length
                )}
                m per tes
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Ringkasan</TabsTrigger>
            <TabsTrigger value="tests">
              Tes Tersedia
              {availableTests.length > 0 && (
                <Badge className="ml-2 bg-blue-600 hover:bg-blue-600 text-white">
                  {availableTests.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="results">Hasil Tes</TabsTrigger>
            <TabsTrigger value="activity">Aktivitas</TabsTrigger>
            <TabsTrigger value="profile">Profil</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Progress Overview */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Progress Keseluruhan
                    </CardTitle>
                    <CardDescription>
                      Perkembangan Anda dalam menyelesaikan semua tes psikologi
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Tes Selesai</span>
                        <span className="text-sm text-gray-600">
                          {completedTests.length}/
                          {dashboardData.testProgress.totalTests}
                        </span>
                      </div>
                      <Progress
                        value={
                          (completedTests.length /
                            dashboardData.testProgress.totalTests) *
                          100
                        }
                        className="h-3"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4 pt-4">
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">
                          {completedTests.length}
                        </div>
                        <div className="text-sm text-green-700">Selesai</div>
                      </div>
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">
                          {availableTests.length}
                        </div>
                        <div className="text-sm text-blue-700">Tersedia</div>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-gray-600">
                          {lockedTests.length}
                        </div>
                        <div className="text-sm text-gray-700">Terkunci</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Upcoming Tasks */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Tugas Mendatang
                    </CardTitle>
                    <CardDescription>
                      Hal-hal yang perlu Anda selesaikan
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {dashboardData.upcomingTasks.map((task) => (
                        <div
                          key={task.id}
                          className={`p-4 rounded-lg border-l-4 ${getPriorityColor(
                            task.priority
                          )}`}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <h4 className="font-medium text-sm">
                                {task.title}
                              </h4>
                              <p className="text-xs text-gray-600 mt-1">
                                {task.description}
                              </p>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {new Date(task.dueDate).toLocaleDateString(
                                "id-ID"
                              )}
                            </Badge>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-xs">
                              <span>Progress</span>
                              <span>{task.progress}%</span>
                            </div>
                            <Progress value={task.progress} className="h-2" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* System Status */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Activity className="h-5 w-5" />
                      Status Sistem
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Wifi className="h-4 w-4 text-green-600" />
                          <span className="text-sm">Koneksi Internet</span>
                        </div>
                        <Badge className="bg-green-100 text-green-800 text-xs">
                          Stabil
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Camera className="h-4 w-4 text-green-600" />
                          <span className="text-sm">Akses Kamera</span>
                        </div>
                        <Badge className="bg-green-100 text-green-800 text-xs">
                          Aktif
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Mic className="h-4 w-4 text-green-600" />
                          <span className="text-sm">Akses Mikrofon</span>
                        </div>
                        <Badge className="bg-green-100 text-green-800 text-xs">
                          Aktif
                        </Badge>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Eye className="h-4 w-4 text-green-600" />
                          <span className="text-sm">Browser</span>
                        </div>
                        <Badge className="bg-green-100 text-green-800 text-xs">
                          Optimal
                        </Badge>
                      </div>
                    </div>

                    <div className="pt-3 border-t">
                      <div className="text-xs text-gray-600">
                        Terakhir dicek:{" "}
                        {formatTimeAgo(
                          dashboardData.systemStatus.lastSystemCheck
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Notifications */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Bell className="h-5 w-5" />
                      Notifikasi
                      {dashboardData.notifications.filter((n) => !n.isRead)
                        .length > 0 && (
                        <Badge className="bg-red-600 hover:bg-red-600 text-white">
                          {
                            dashboardData.notifications.filter((n) => !n.isRead)
                              .length
                          }
                        </Badge>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {dashboardData.notifications
                        .slice(0, 3)
                        .map((notification) => (
                          <div
                            key={notification.id}
                            className={`p-3 rounded-lg border ${
                              notification.isRead
                                ? "bg-gray-50"
                                : "bg-blue-50 border-blue-200"
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div
                                className={`mt-0.5 ${
                                  notification.isRead
                                    ? "text-gray-400"
                                    : "text-blue-600"
                                }`}
                              >
                                {notification.type === "test_available" && (
                                  <Brain className="h-4 w-4" />
                                )}
                                {notification.type === "reminder" && (
                                  <Clock className="h-4 w-4" />
                                )}
                                {notification.type === "result_ready" && (
                                  <CheckCircle className="h-4 w-4" />
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div
                                  className={`text-sm font-medium ${
                                    notification.isRead
                                      ? "text-gray-600"
                                      : "text-gray-900"
                                  }`}
                                >
                                  {notification.title}
                                </div>
                                <div
                                  className={`text-xs mt-1 ${
                                    notification.isRead
                                      ? "text-gray-500"
                                      : "text-gray-700"
                                  }`}
                                >
                                  {notification.message}
                                </div>
                                <div className="text-xs text-gray-400 mt-1">
                                  {formatTimeAgo(notification.timestamp)}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>

                    <Button variant="ghost" className="w-full mt-4 text-sm">
                      Lihat Semua Notifikasi
                    </Button>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Aksi Cepat</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button
                      className="w-full justify-start"
                      variant="outline"
                      asChild
                    >
                      <Link href="/candidate/profile">
                        <User className="h-4 w-4 mr-2" />
                        Lengkapi Profil (
                        {dashboardData.candidate.profileCompletion}%)
                      </Link>
                    </Button>

                    <Button className="w-full justify-start" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Unduh Hasil Tes
                    </Button>

                    <Button className="w-full justify-start" variant="outline">
                      <Share2 className="h-4 w-4 mr-2" />
                      Bagikan ke HR
                    </Button>

                    <Button
                      className="w-full justify-start"
                      variant="outline"
                      asChild
                    >
                      <Link href="/candidate/settings">
                        <SettingsIcon className="h-4 w-4 mr-2" />
                        Pengaturan
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Tests Tab */}
          <TabsContent value="tests" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dashboardData.tests.map((test) => {
                const IconComponent = test.icon;
                return (
                  <Card
                    key={test.id}
                    className="hover:shadow-lg transition-all duration-200 group"
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between mb-3">
                        <div
                          className={`p-3 rounded-xl bg-gradient-to-r ${test.color} transition-transform group-hover:scale-110`}
                        >
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>
                        {getStatusBadge(test.status, test.score)}
                      </div>

                      <CardTitle className="text-lg leading-tight">
                        {test.name}
                      </CardTitle>

                      <CardDescription className="text-sm">
                        {test.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      {/* Test Info */}
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span>{test.duration} menit</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-gray-500" />
                          <span>{test.questions} soal</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-gray-500" />
                          <span>{test.category}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <BarChart3 className="h-4 w-4 text-gray-500" />
                          <span
                            className={
                              test.difficulty === "Mudah"
                                ? "text-green-600"
                                : test.difficulty === "Menengah"
                                ? "text-yellow-600"
                                : "text-red-600"
                            }
                          >
                            {test.difficulty}
                          </span>
                        </div>
                      </div>

                      {/* Completed Test Results */}
                      {test.status === "completed" && (
                        <div className="bg-green-50 rounded-lg p-4 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-green-800">
                              Skor Anda
                            </span>
                            <span className="text-lg font-bold text-green-600">
                              {test.score}
                            </span>
                          </div>
                          <div className="text-xs text-green-600">
                            Percentile: {test.percentile} | Diselesaikan:{" "}
                            {new Date(test.completedAt!).toLocaleDateString(
                              "id-ID"
                            )}
                          </div>
                          {test.insights && (
                            <div className="mt-3 space-y-1">
                              {test.insights.map((insight, index) => (
                                <div
                                  key={index}
                                  className="text-xs text-green-700 flex items-start gap-2"
                                >
                                  <div className="w-1 h-1 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                  <span>{insight}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Available Test Info */}
                      {test.status === "available" && (
                        <div className="bg-blue-50 rounded-lg p-4 space-y-2">
                          <div className="text-sm font-medium text-blue-800 mb-2">
                            Tips Pengerjaan:
                          </div>
                          {test.tips?.map((tip, index) => (
                            <div
                              key={index}
                              className="text-xs text-blue-700 flex items-start gap-2"
                            >
                              <div className="w-1 h-1 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                              <span>{tip}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Locked Test Info */}
                      {test.status === "locked" && (
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="text-sm font-medium text-gray-700 mb-2">
                            Syarat Membuka:
                          </div>
                          <div className="text-xs text-gray-600">
                            {test.unlockCondition}
                          </div>
                        </div>
                      )}

                      {/* Action Button */}
                      <div className="pt-2">
                        {test.status === "completed" && (
                          <Button variant="outline" className="w-full" asChild>
                            <Link href={`/candidate/results/${test.id}`}>
                              <FileText className="h-4 w-4 mr-2" />
                              Lihat Detail Hasil
                            </Link>
                          </Button>
                        )}

                        {test.status === "available" && (
                          <Button
                            className="w-full bg-gradient-to-r from-primary to-yellow-500 hover:opacity-90"
                            asChild
                          >
                            <Link href={`/candidate/test/${test.id}`}>
                              <Play className="h-4 w-4 mr-2" />
                              Mulai Tes Sekarang
                            </Link>
                          </Button>
                        )}

                        {test.status === "locked" && (
                          <Button variant="outline" className="w-full" disabled>
                            <Shield className="h-4 w-4 mr-2" />
                            Tes Terkunci
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Results Tab */}
          <TabsContent value="results" className="space-y-6">
            <div className="space-y-6">
              {completedTests.map((test) => {
                const IconComponent = test.icon;
                return (
                  <Card
                    key={test.id}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div
                            className={`p-4 rounded-xl bg-gradient-to-r ${test.color}`}
                          >
                            <IconComponent className="h-8 w-8 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold">
                              {test.name}
                            </h3>
                            <p className="text-gray-600 text-sm">
                              {test.description}
                            </p>
                            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                              <span>
                                Diselesaikan:{" "}
                                {new Date(test.completedAt!).toLocaleDateString(
                                  "id-ID"
                                )}
                              </span>
                              <span>•</span>
                              <span>Durasi: {test.duration} menit</span>
                              <span>•</span>
                              <span>Soal: {test.questions}</span>
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          <div
                            className={`text-4xl font-bold mb-1 ${getScoreColor(
                              test.score!
                            )}`}
                          >
                            {test.score}
                          </div>
                          <div className="text-sm text-gray-600">
                            Percentile {test.percentile}
                          </div>
                          <Button className="mt-3" size="sm" asChild>
                            <Link href={`/candidate/results/${test.id}`}>
                              <Eye className="h-4 w-4 mr-2" />
                              Detail
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Activity Tab */}
          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Aktivitas Terkini</CardTitle>
                <CardDescription>
                  Riwayat aktivitas dan pencapaian Anda
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboardData.recentActivity.map((activity) => {
                    const IconComponent = activity.icon;
                    return (
                      <div
                        key={activity.id}
                        className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg"
                      >
                        <div className={`mt-1 ${activity.color}`}>
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium text-sm">
                            {activity.title}
                          </div>
                          <div className="text-sm text-gray-600 mt-1">
                            {activity.description}
                          </div>
                          <div className="text-xs text-gray-500 mt-2">
                            {formatTimeAgo(activity.timestamp)}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Informasi Pribadi
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex items-center gap-3">
                      <User className="h-4 w-4 text-gray-500" />
                      <div>
                        <div className="text-sm font-medium">Nama Lengkap</div>
                        <div className="text-sm text-gray-600">
                          {dashboardData.candidate.name}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <div>
                        <div className="text-sm font-medium">Email</div>
                        <div className="text-sm text-gray-600">
                          {dashboardData.candidate.email}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Briefcase className="h-4 w-4 text-gray-500" />
                      <div>
                        <div className="text-sm font-medium">Posisi</div>
                        <div className="text-sm text-gray-600">
                          {dashboardData.candidate.position}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Target className="h-4 w-4 text-gray-500" />
                      <div>
                        <div className="text-sm font-medium">Departemen</div>
                        <div className="text-sm text-gray-600">
                          {dashboardData.candidate.department}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">
                        Kelengkapan Profil
                      </span>
                      <span className="text-sm text-gray-600">
                        {dashboardData.candidate.profileCompletion}%
                      </span>
                    </div>
                    <Progress
                      value={dashboardData.candidate.profileCompletion}
                      className="h-2"
                    />
                    <div className="mt-2">
                      <Button size="sm" asChild>
                        <Link href="/candidate/profile">Lengkapi Profil</Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Pencapaian
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                      <Star className="h-5 w-5 text-yellow-600" />
                      <div>
                        <div className="text-sm font-medium">
                          Skor Tertinggi
                        </div>
                        <div className="text-sm text-gray-600">
                          IQ Test - Skor 112
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <div>
                        <div className="text-sm font-medium">Konsisten</div>
                        <div className="text-sm text-gray-600">
                          3 tes berturut-turut dengan skor tinggi
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                      <TrendingUp className="h-5 w-5 text-blue-600" />
                      <div>
                        <div className="text-sm font-medium">Peningkatan</div>
                        <div className="text-sm text-gray-600">
                          Rata-rata skor meningkat 15%
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </LayoutCandidate>
  );
}
