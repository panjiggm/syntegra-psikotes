"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Bell,
  Brain,
  Heart,
  MoreHorizontal,
  Play,
  Shield,
  Target,
  TrendingUp,
  Users,
  CheckCircle,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import LayoutCandidate from "@/layout/LayoutCandidate";
import { Card } from "@/components/ui/card";

// Test modules data following the Jago/Pockets card style
const testModules = [
  {
    id: "disc",
    name: "DISC Assessment",
    description: "Kepribadian & Perilaku",
    icon: Target,
    duration: 20,
    questions: 28,
    status: "completed",
    score: 85,
    color: "from-green-500 to-emerald-600",
    category: "Selesai",
    insights: ["Dominance tinggi", "Leadership natural"],
  },
  {
    id: "big-five",
    name: "Big Five",
    description: "Kepribadian Lima Faktor",
    icon: Users,
    duration: 15,
    questions: 44,
    status: "completed",
    score: 78,
    color: "from-blue-500 to-indigo-600",
    category: "Selesai",
    insights: ["Openness tinggi", "Conscientiousness baik"],
  },
  {
    id: "iq",
    name: "IQ Test",
    description: "Tes Kecerdasan",
    icon: Brain,
    duration: 45,
    questions: 60,
    status: "completed",
    score: 112,
    color: "from-purple-500 to-violet-600",
    category: "Selesai",
    insights: ["IQ di atas rata-rata", "Logical reasoning kuat"],
  },
  {
    id: "emotional-iq",
    name: "Emotional IQ",
    description: "Kecerdasan Emosional",
    icon: Heart,
    duration: 25,
    questions: 35,
    status: "available",
    color: "from-yellow-400 to-amber-500",
    category: "Mulai",
    insights: ["Jawab berdasarkan perasaan", "Jangan takut jawaban salah"],
  },
  {
    id: "leadership",
    name: "Leadership",
    description: "Gaya Kepemimpinan",
    icon: TrendingUp,
    duration: 30,
    questions: 32,
    status: "locked",
    color: "from-gray-400 to-gray-500",
    category: "Terkunci",
    unlockRequirement: "Selesaikan Emotional IQ",
    insights: ["Leadership natural", "Leadership natural"],
  },
  {
    id: "stress",
    name: "Stress Test",
    description: "Manajemen Stres",
    icon: Shield,
    duration: 20,
    questions: 30,
    status: "locked",
    color: "from-gray-400 to-gray-500",
    category: "Terkunci",
    unlockRequirement: "Selesaikan Leadership",
    insights: ["Stress management", "Stress management"],
  },
];

const CandidateTestPage = () => {
  const router = useRouter();
  const [selectedTest, setSelectedTest] = useState<string | null>(null);

  // Calculate progress
  const completedTests = testModules.filter(
    (test) => test.status === "completed"
  );
  const totalTests = testModules.length;
  const progressPercentage = (completedTests.length / totalTests) * 100;

  const handleTestClick = (test: any) => {
    if (test.status === "available") {
      setSelectedTest(test.id);
      // Navigate to test execution or show confirmation
      router.push(`/candidate/test/${test.id}`);
    } else if (test.status === "completed") {
      // Show results or navigate to results page
      router.push(`/candidate/test/${test.id}/results`);
    }
  };

  const getStatusBadge = (test: any) => {
    switch (test.status) {
      case "completed":
        return (
          <span className="bg-white/20 text-xs px-2 py-1 rounded-full font-medium">
            Selesai
          </span>
        );
      case "available":
        return (
          <span className="bg-white/20 text-xs px-2 py-1 rounded-full font-medium">
            Mulai
          </span>
        );
      case "locked":
        return (
          <span className="bg-white/90 text-gray-400 text-xs px-2 py-1 rounded-full font-medium">
            Terkunci
          </span>
        );
      default:
        return null;
    }
  };

  const getActionIcon = (test: any) => {
    switch (test.status) {
      case "completed":
        return <CheckCircle className="h-4 w-4" />;
      case "available":
        return <Play className="h-4 w-4" />;
      case "locked":
        return <Lock className="h-4 w-4 text-gray-400" />;
      default:
        return <ArrowRight className="h-4 w-4" />;
    }
  };

  return (
    <LayoutCandidate>
      <div className="">
        {/* Mobile Header - Jago Style */}
        <div className="bg-white py-4 sticky top-0 z-10">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Psikotes</h1>
            <p className="text-sm text-gray-600">Platform Assessment Digital</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="my-6">
          <div className="grid grid-cols-3 gap-3">
            <Card className="rounded-xl p-4 shadow-sm">
              <div className="text-2xl font-bold text-green-600">
                {completedTests.length}
              </div>
              <div className="text-xs text-gray-600">Tes Selesai</div>
            </Card>
            <Card className="rounded-xl p-4 shadow-sm">
              <div className="text-2xl font-bold text-yellow-600">
                {testModules.filter((t) => t.status === "available").length}
              </div>
              <div className="text-xs text-gray-600">Tersedia</div>
            </Card>
            <Card className="rounded-xl p-4 shadow-sm">
              <div className="text-2xl font-bold text-gray-400">
                {testModules.filter((t) => t.status === "locked").length}
              </div>
              <div className="text-xs text-gray-600">Terkunci</div>
            </Card>
          </div>
        </div>

        {/* Progress Card */}
        <div className="mb-4">
          <Card className="rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-gray-700">
                Progress Tes
              </span>
              <span className="text-sm text-yellow-600 font-semibold">
                {completedTests.length}/{totalTests} Selesai
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
              <div
                className="bg-gradient-to-r from-yellow-400 to-amber-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-600">
              {progressPercentage.toFixed(0)}% dari total assessment telah
              diselesaikan
            </p>
          </Card>
        </div>

        {/* Test Modules Grid - Jago/Pockets Style */}
        <div className="pb-8">
          <div className="grid grid-cols-5 gap-4">
            {testModules.map((test) => (
              <div
                key={test.id}
                onClick={() => handleTestClick(test)}
                className={`rounded-xl p-4 text-white shadow-lg transition-all duration-200 ${
                  test.status === "locked"
                    ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                    : test.status === "available"
                    ? `bg-gradient-to-br ${test.color} cursor-pointer hover:shadow-xl transform hover:scale-105`
                    : `bg-gradient-to-br ${test.color} cursor-pointer hover:shadow-xl`
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <test.icon
                    className={`h-8 w-8 ${
                      test.status === "locked" ? "text-gray-400" : ""
                    }`}
                  />
                  {getStatusBadge(test)}
                </div>

                <h3
                  className={`font-bold text-sm mb-1 ${
                    test.status === "locked"
                      ? "text-gray-500"
                      : test.status === "completed"
                      ? `text-${test.color.split("-")[1]}-100`
                      : `text-${test.color.split("-")[1]}-100`
                  }`}
                >
                  {test.name}
                </h3>
                <p
                  className={`text-xs mb-3 ${
                    test.status === "locked"
                      ? "text-gray-500"
                      : test.status === "completed"
                      ? `text-${test.color.split("-")[1]}-100`
                      : `text-${test.color.split("-")[1]}-100`
                  }`}
                >
                  {test.description}
                </p>

                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs ${
                      test.status === "locked"
                        ? "text-gray-500"
                        : test.status === "completed"
                        ? `text-${test.color.split("-")[1]}-100`
                        : `text-${test.color.split("-")[1]}-100`
                    }`}
                  >
                    {test.status === "completed"
                      ? `Skor: ${test.score}`
                      : test.status === "available"
                      ? `${test.duration} menit`
                      : test.unlockRequirement}
                  </span>
                  {getActionIcon(test)}
                </div>

                {/* Show insights for completed tests */}
                {test.insights && (
                  <div
                    className={`mt-2 pt-2 border-t ${
                      test.status === "locked"
                        ? "border-gray-300"
                        : "border-white/20"
                    }`}
                  >
                    {test.insights.map((insight, index) => (
                      <p
                        key={index}
                        className={`text-xs  ${
                          test.status === "locked"
                            ? "text-gray-400"
                            : "text-white/80"
                        }`}
                      >
                        • {insight}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </LayoutCandidate>
  );
};

export default CandidateTestPage;
