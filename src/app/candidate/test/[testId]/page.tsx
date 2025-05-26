"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  ArrowLeft,
  Clock,
  CheckCircle,
  AlertCircle,
  Play,
  Pause,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import LayoutCandidate from "@/layout/LayoutCandidate";

// Test data - in real app this would come from API
const testData = {
  "emotional-iq": {
    id: "emotional-iq",
    name: "Emotional Intelligence Test",
    description:
      "Tes kecerdasan emosional untuk mengukur kemampuan mengenali, memahami, dan mengelola emosi",
    duration: 25,
    totalQuestions: 35,
    questions: [
      {
        id: 1,
        question:
          "Ketika seseorang di tempat kerja mengkritik pekerjaan Anda di depan umum, reaksi pertama Anda adalah:",
        options: [
          "Merasa marah dan langsung membela diri",
          "Mendengarkan kritik tersebut dan meminta penjelasan lebih detail",
          "Merasa sedih dan menarik diri",
          "Mengabaikan kritik tersebut sepenuhnya",
        ],
        correctAnswer: 1, // index of correct answer (0-based)
        category: "Emotional Awareness",
      },
      {
        id: 2,
        question:
          "Saat Anda melihat rekan kerja tampak stres dan kewalahan dengan tugasnya, Anda akan:",
        options: [
          "Menunggu mereka meminta bantuan terlebih dahulu",
          "Menawarkan bantuan dan menanyakan apa yang bisa Anda lakukan",
          "Memberikan saran tanpa diminta",
          "Melaporkan situasi ini kepada atasan",
        ],
        correctAnswer: 1,
        category: "Empathy",
      },
      {
        id: 3,
        question:
          "Ketika Anda merasa sangat frustrasi dengan suatu situasi, cara terbaik untuk mengelola emosi tersebut adalah:",
        options: [
          "Mengekspresikan frustrasi secara langsung kepada orang yang terlibat",
          "Menyimpan perasaan tersebut untuk diri sendiri",
          "Mengambil waktu sejenak untuk menenangkan diri, lalu mencari solusi",
          "Mengalihkan perhatian ke hal lain dan mengabaikan masalah",
        ],
        correctAnswer: 2,
        category: "Emotional Regulation",
      },
      {
        id: 4,
        question:
          "Dalam situasi negosiasi yang sulit, kemampuan yang paling penting adalah:",
        options: [
          "Memenangkan argumen dengan data dan fakta",
          "Memahami perspektif dan perasaan pihak lain",
          "Tetap tenang dan tidak menunjukkan emosi apapun",
          "Menggunakan otoritas dan posisi untuk menekan",
        ],
        correctAnswer: 1,
        category: "Social Skills",
      },
      {
        id: 5,
        question:
          "Ketika Anda membuat kesalahan yang berdampak pada tim, respons yang paling tepat adalah:",
        options: [
          "Menyalahkan faktor eksternal yang di luar kontrol Anda",
          "Mengakui kesalahan, meminta maaf, dan fokus pada solusi",
          "Mengabaikan kesalahan dan berharap tidak ada yang menyadari",
          "Mencari kambing hitam untuk mengalihkan tanggung jawab",
        ],
        correctAnswer: 1,
        category: "Self-Awareness",
      },
    ],
  },
  leadership: {
    id: "leadership",
    name: "Leadership Style Assessment",
    description: "Evaluasi gaya kepemimpinan dan kemampuan memimpin tim",
    duration: 30,
    totalQuestions: 32,
    questions: [
      {
        id: 1,
        question:
          "Ketika menghadapi konflik dalam tim, pendekatan kepemimpinan Anda adalah:",
        options: [
          "Mengambil keputusan sepihak untuk menyelesaikan konflik dengan cepat",
          "Memfasilitasi diskusi terbuka dan mencari solusi bersama",
          "Menghindari konflik dan berharap akan terselesaikan sendiri",
          "Mendelegasikan penyelesaian konflik kepada anggota tim senior",
        ],
        correctAnswer: 1,
        category: "Conflict Resolution",
      },
    ],
  },
};

const TestExecutionPage = () => {
  const router = useRouter();
  const params = useParams();
  const testId = params.testId as string;

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const test = testData[testId as keyof typeof testData];

  useEffect(() => {
    if (test && isStarted && !isPaused && !isCompleted) {
      setTimeRemaining(test.duration * 60); // Convert minutes to seconds
    }
  }, [test, isStarted, isPaused, isCompleted]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isStarted && !isPaused && !isCompleted && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            setIsCompleted(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isStarted, isPaused, isCompleted, timeRemaining]);

  if (!test) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Test Tidak Ditemukan
          </h2>
          <p className="text-gray-600 mb-4">
            Test dengan ID "{testId}" tidak tersedia
          </p>
          <Button onClick={() => router.push("/candidate/test")}>
            Kembali ke Daftar Test
          </Button>
        </div>
      </div>
    );
  }

  const handleAnswerSelect = (questionId: number, answerIndex: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answerIndex }));
  };

  const handleNext = () => {
    if (currentQuestion < test.questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleFinish = () => {
    setIsCompleted(true);
    // Redirect to results page after a short delay
    setTimeout(() => {
      router.push(`/candidate/test/${testId}/results`);
    }, 1500);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const progress = ((currentQuestion + 1) / test.questions.length) * 100;
  const answeredQuestions = Object.keys(answers).length;

  // Pre-test screen
  if (!isStarted) {
    return (
      <LayoutCandidate>
        <div className="min-h-screen">
          <div className="bg-white p-4 flex items-center justify-between shadow-sm sticky top-0 z-10">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push("/candidate/test")}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-xl font-bold text-gray-800">{test.name}</h1>
              </div>
            </div>
          </div>

          <div className="p-6 max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Persiapan Test</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="h-10 w-10 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    {test.name}
                  </h2>
                  <p className="text-gray-600">{test.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-gray-800">
                      {test.duration}
                    </div>
                    <div className="text-sm text-gray-600">Menit</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-gray-800">
                      {test.totalQuestions}
                    </div>
                    <div className="text-sm text-gray-600">Pertanyaan</div>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">
                    Petunjuk:
                  </h3>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Baca setiap pertanyaan dengan teliti</li>
                    <li>• Pilih jawaban yang paling menggambarkan diri Anda</li>
                    <li>• Tidak ada jawaban benar atau salah</li>
                    <li>• Jawab dengan jujur dan spontan</li>
                    <li>• Test akan otomatis berakhir setelah waktu habis</li>
                  </ul>
                </div>

                <Button
                  onClick={() => setIsStarted(true)}
                  className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 text-white hover:from-yellow-500 hover:to-amber-600"
                  size="lg"
                >
                  <Play className="h-5 w-5 mr-2" />
                  Mulai Test
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </LayoutCandidate>
    );
  }

  // Completion screen
  if (isCompleted) {
    return (
      <LayoutCandidate>
        <div className="min-h-screen flex items-center justify-center">
          <div className="max-w-md mx-auto p-6">
            <Card>
              <CardContent className="text-center py-8">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Test Selesai!
                </h2>
                <p className="text-gray-600 mb-6">
                  Terima kasih telah menyelesaikan {test.name}. Hasil akan
                  diproses dan dapat dilihat di dashboard.
                </p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-lg font-bold text-gray-800">
                      {answeredQuestions}
                    </div>
                    <div className="text-xs text-gray-600">Terjawab</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-lg font-bold text-gray-800">
                      {formatTime(timeRemaining)}
                    </div>
                    <div className="text-xs text-gray-600">Sisa Waktu</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button
                    onClick={() => router.push("/candidate/test")}
                    className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 text-white hover:from-yellow-500 hover:to-amber-600"
                  >
                    Kembali ke Daftar Test
                  </Button>
                  <Button
                    onClick={() => router.push("/candidate/dashboard")}
                    variant="outline"
                    className="w-full"
                  >
                    Kembali ke Dashboard
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </LayoutCandidate>
    );
  }

  const currentQ = test.questions[currentQuestion];

  return (
    <LayoutCandidate>
      <div className="min-h-screen">
        {/* Header */}
        <div className="bg-white p-4 shadow-sm sticky top-0 z-10">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsPaused(!isPaused)}
              >
                {isPaused ? (
                  <Play className="h-4 w-4" />
                ) : (
                  <Pause className="h-4 w-4" />
                )}
              </Button>
              <div>
                <h1 className="text-lg font-bold text-gray-800">{test.name}</h1>
                <p className="text-sm text-gray-600">
                  Soal {currentQuestion + 1} dari {test.questions.length}
                </p>
              </div>
            </div>

            <div className="text-right">
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                <Clock className="h-4 w-4" />
                <span
                  className={
                    timeRemaining < 300 ? "text-red-500 font-bold" : ""
                  }
                >
                  {formatTime(timeRemaining)}
                </span>
              </div>
              <div className="text-xs text-gray-500">
                {answeredQuestions}/{test.questions.length} terjawab
              </div>
            </div>
          </div>

          <Progress value={progress} className="h-2" />
        </div>

        {/* Question Content */}
        <div className="p-4 max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="text-sm text-gray-500 mb-2">
                    {currentQ.category}
                  </div>
                  <CardTitle className="text-lg leading-relaxed">
                    {currentQ.question}
                  </CardTitle>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <RadioGroup
                value={answers[currentQ.id]?.toString() || ""}
                onValueChange={(value: string) =>
                  handleAnswerSelect(currentQ.id, parseInt(value))
                }
                className="space-y-3"
              >
                {currentQ.options.map((option, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-colors"
                  >
                    <RadioGroupItem
                      value={index.toString()}
                      id={`option-${index}`}
                      className="mt-1"
                    />
                    <Label
                      htmlFor={`option-${index}`}
                      className="flex-1 text-sm cursor-pointer leading-relaxed"
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-6">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Sebelumnya
            </Button>

            <div className="text-sm text-gray-500">
              {currentQuestion + 1} / {test.questions.length}
            </div>

            {currentQuestion === test.questions.length - 1 ? (
              <Button
                onClick={handleFinish}
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700"
                disabled={!answers[currentQ.id] && answers[currentQ.id] !== 0}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Selesai
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                disabled={!answers[currentQ.id] && answers[currentQ.id] !== 0}
                className="bg-gradient-to-r from-yellow-400 to-amber-500 text-white hover:from-yellow-500 hover:to-amber-600"
              >
                Selanjutnya
                <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
              </Button>
            )}
          </div>
        </div>

        {/* Pause Overlay */}
        {isPaused && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="max-w-sm mx-4">
              <CardContent className="text-center py-8">
                <Pause className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  Test Dijeda
                </h3>
                <p className="text-gray-600 mb-6">
                  Test telah dijeda. Klik tombol play untuk melanjutkan.
                </p>
                <div className="space-y-3">
                  <Button
                    onClick={() => setIsPaused(false)}
                    className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 text-white hover:from-yellow-500 hover:to-amber-600"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Lanjutkan Test
                  </Button>
                  <Button
                    onClick={() => router.push("/candidate/test")}
                    variant="outline"
                    className="w-full"
                  >
                    Keluar dari Test
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </LayoutCandidate>
  );
};

export default TestExecutionPage;
