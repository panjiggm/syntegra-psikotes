"use client";

import { useRouter, useParams } from "next/navigation";
import {
  ArrowLeft,
  Trophy,
  Target,
  Brain,
  Clock,
  CheckCircle,
  BarChart3,
  Star,
  TrendingUp,
  Share2,
  Download,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import LayoutCandidate from "@/layout/LayoutCandidate";

// Mock results data - in real app this would come from API
const resultsData = {
  "emotional-iq": {
    score: 78,
    percentile: 85,
    level: "Tinggi",
    timeSpent: "18 menit 42 detik",
    totalQuestions: 35,
    correctAnswers: 27,
    categories: [
      { name: "Kesadaran Diri", score: 82, description: "Sangat Baik" },
      { name: "Empati", score: 75, description: "Baik" },
      { name: "Regulasi Emosi", score: 80, description: "Sangat Baik" },
      { name: "Keterampilan Sosial", score: 73, description: "Baik" },
    ],
    insights: [
      "Anda menunjukkan kemampuan yang sangat baik dalam mengenali dan memahami emosi diri sendiri.",
      "Kemampuan empati Anda berada di level yang baik, namun masih ada ruang untuk pengembangan.",
      "Keterampilan dalam mengelola emosi sudah sangat baik, terutama dalam situasi stres.",
      "Interaksi sosial Anda cukup efektif, dengan potensi peningkatan dalam komunikasi nonverbal.",
    ],
    recommendations: [
      "Praktikkan mindfulness untuk meningkatkan kesadaran emosional",
      "Latih kemampuan mendengarkan aktif untuk meningkatkan empati",
      "Ikuti pelatihan komunikasi interpersonal",
      "Baca buku tentang kecerdasan emosional untuk pemahaman yang lebih mendalam",
    ],
  },
  leadership: {
    score: 82,
    percentile: 90,
    level: "Sangat Tinggi",
    timeSpent: "22 menit 15 detik",
    totalQuestions: 32,
    correctAnswers: 26,
    categories: [
      { name: "Visi & Strategi", score: 85, description: "Sangat Baik" },
      { name: "Pengelolaan Tim", score: 80, description: "Sangat Baik" },
      { name: "Komunikasi", score: 78, description: "Baik" },
      { name: "Pengambilan Keputusan", score: 84, description: "Sangat Baik" },
    ],
    insights: [
      "Anda memiliki kemampuan kepemimpinan yang sangat baik dengan visi yang jelas.",
      "Kemampuan mengelola tim dan memotivasi orang lain adalah salah satu kekuatan utama Anda.",
      "Gaya komunikasi kepemimpinan Anda efektif, namun bisa ditingkatkan dalam situasi konflik.",
      "Pengambilan keputusan Anda cenderung analitis dan mempertimbangkan berbagai perspektif.",
    ],
    recommendations: [
      "Kembangkan keterampilan public speaking untuk meningkatkan pengaruh",
      "Pelajari teknik coaching untuk memaksimalkan potensi tim",
      "Ikuti pelatihan manajemen konflik",
      "Bergabung dengan komunitas leader untuk sharing best practices",
    ],
  },
};

const TestResultsPage = () => {
  const router = useRouter();
  const params = useParams();
  const testId = params.testId as string;

  const results = resultsData[testId as keyof typeof resultsData];

  if (!results) {
    return (
      <LayoutCandidate>
        <div className="min-h-screen flex items-center justify-center">
          <Card className="max-w-md mx-4">
            <CardContent className="text-center py-8">
              <Target className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Hasil Tidak Ditemukan
              </h2>
              <p className="text-gray-600 mb-6">
                Hasil test dengan ID "{testId}" tidak tersedia
              </p>
              <Button onClick={() => router.push("/candidate/test")}>
                Kembali ke Daftar Test
              </Button>
            </CardContent>
          </Card>
        </div>
      </LayoutCandidate>
    );
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return "bg-green-50 border-green-200";
    if (score >= 60) return "bg-yellow-50 border-yellow-200";
    return "bg-red-50 border-red-200";
  };

  return (
    <LayoutCandidate>
      <div className="space-y-8">
        {/* Section 1: Header */}
        <div className="border-b pb-6">
          <div className="max-w-7xl container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => router.push("/candidate/test")}
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">
                    Hasil Test
                  </h1>
                  <p className="text-sm text-gray-600">
                    {testId === "emotional-iq"
                      ? "Emotional Intelligence"
                      : "Leadership Assessment"}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Bagikan
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Unduh
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Action Buttons */}
        <div className="max-w-7xl container mx-auto px-6">
          <div className="flex justify-between gap-3">
            <Button
              onClick={() => router.push("/candidate/test")}
              className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white hover:from-blue-600 hover:to-cyan-700"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Kembali ke Daftar Test
            </Button>
            <Button
              onClick={() => router.push(`/candidate/test/${testId}`)}
              variant="outline"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Ulangi Test
            </Button>
          </div>
        </div>

        {/* Section 3: Score & Stats */}
        <div className="max-w-7xl container mx-auto px-6">
          <div className="grid grid-cols-12 gap-6">
            {/* Score Overview - Grid 8 */}
            <div className="col-span-8">
              <Card className={`border-2 ${getScoreBg(results.score)} h-full`}>
                <CardContent className="p-8">
                  <div className="text-center">
                    <div className="flex justify-center mb-6">
                      <div className="relative">
                        <div className="w-28 h-28 rounded-full bg-white border-4 border-current flex items-center justify-center shadow-lg">
                          <span
                            className={`text-4xl font-bold ${getScoreColor(
                              results.score
                            )}`}
                          >
                            {results.score}
                          </span>
                        </div>
                        <Trophy className="absolute -top-2 -right-2 h-8 w-8 text-yellow-500" />
                      </div>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-3">
                      Skor Anda: {results.score}/100
                    </h2>
                    <Badge
                      variant="secondary"
                      className="text-base px-4 py-2 mb-4"
                    >
                      Level: {results.level}
                    </Badge>
                    <p className="text-base text-gray-600 leading-relaxed">
                      Anda berada di persentil ke-{results.percentile}, artinya
                      skor Anda lebih tinggi dari {results.percentile}% peserta
                      lainnya
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Stats - Grid 4 (6 dalam 2x2) */}
            <div className="col-span-4">
              <div className="grid grid-cols-6 gap-4">
                {/* Top Row - 2 cards taking 3 columns each */}
                <div className="col-span-3">
                  <Card className="h-full">
                    <CardContent className="p-6 text-center">
                      <Clock className="h-8 w-8 text-blue-500 mx-auto mb-3" />
                      <p className="text-sm text-gray-600 mb-1">Waktu</p>
                      <p className="text-lg font-bold">{results.timeSpent}</p>
                    </CardContent>
                  </Card>
                </div>
                <div className="col-span-3">
                  <Card className="h-full">
                    <CardContent className="p-6 text-center">
                      <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-3" />
                      <p className="text-sm text-gray-600 mb-1">Benar</p>
                      <p className="text-lg font-bold">
                        {results.correctAnswers}/{results.totalQuestions}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Bottom Row - 2 cards taking 3 columns each */}
                <div className="col-span-3">
                  <Card className="h-full">
                    <CardContent className="p-6 text-center">
                      <BarChart3 className="h-8 w-8 text-purple-500 mx-auto mb-3" />
                      <p className="text-sm text-gray-600 mb-1">Persentil</p>
                      <p className="text-lg font-bold">{results.percentile}%</p>
                    </CardContent>
                  </Card>
                </div>
                <div className="col-span-3">
                  <Card className="h-full">
                    <CardContent className="p-6 text-center">
                      <Star className="h-8 w-8 text-yellow-500 mx-auto mb-3" />
                      <p className="text-sm text-gray-600 mb-1">Akurasi</p>
                      <p className="text-lg font-bold">
                        {Math.round(
                          (results.correctAnswers / results.totalQuestions) *
                            100
                        )}
                        %
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Analysis Cards - Grid 4 each */}
        <div className="max-w-7xl container mx-auto px-6 pb-8">
          <div className="grid grid-cols-12 gap-6">
            {/* Category Breakdown - Grid 4 */}
            <div className="col-span-4">
              <Card className="h-full">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Brain className="h-5 w-5" />
                    Analisis per Kategori
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {results.categories.map((category, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">
                          {category.name}
                        </span>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {category.description}
                          </Badge>
                          <span
                            className={`text-sm font-bold ${getScoreColor(
                              category.score
                            )}`}
                          >
                            {category.score}%
                          </span>
                        </div>
                      </div>
                      <Progress value={category.score} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Insights - Grid 4 */}
            <div className="col-span-4">
              <Card className="h-full">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <TrendingUp className="h-5 w-5" />
                    Insights & Analisis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {results.insights.map((insight, index) => (
                      <div
                        key={index}
                        className="flex gap-3 p-3 bg-blue-50 rounded-lg"
                      >
                        <div className="w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                          {index + 1}
                        </div>
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {insight}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recommendations - Grid 4 */}
            <div className="col-span-4">
              <Card className="h-full">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Target className="h-5 w-5" />
                    Rekomendasi Pengembangan
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {results.recommendations.map((rec, index) => (
                      <div
                        key={index}
                        className="flex gap-3 p-3 bg-green-50 rounded-lg"
                      >
                        <div className="w-5 h-5 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                          {index + 1}
                        </div>
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {rec}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </LayoutCandidate>
  );
};

export default TestResultsPage;
