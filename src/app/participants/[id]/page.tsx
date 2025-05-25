"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  RadarChart,
  Radar,
  RadialBarChart,
  RadialBar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
  Cell,
} from "recharts";
import LayoutDashboard from "@/layout/LayoutDashboard";
import {
  ArrowLeft,
  Download,
  Mail,
  Phone,
  MapPin,
  Calendar,
  User,
  Award,
  Brain,
  Target,
} from "lucide-react";

// Data dummy hasil test berdasarkan ID
const testResults = {
  P001: {
    participant: {
      id: "P001",
      nama: "Ahmad Fauzi Rahman",
      email: "ahmad.fauzi@email.com",
      noHp: "081234567890",
      jenisKelamin: "Laki-laki",
      usia: 29,
      domisili: "Kebayoran Baru, Jakarta Selatan",
      tanggalTest: "2024-01-20",
      status: "Lulus",
    },
    rekomendasi: ["Communication & PR", "Compliance", "Customer Service"],
    iq: {
      skor: 118,
      level: "Diatas Rata-rata",
      kategori: "superior",
    },
    iqRadar: [
      { subject: "Rotasi", value: 85, fullMark: 100 },
      { subject: "Berbahasa", value: 78, fullMark: 100 },
      { subject: "Berpikir Fleksibel", value: 82, fullMark: 100 },
      { subject: "Pengetahuan Umum", value: 75, fullMark: 100 },
      { subject: "Daya Bayang", value: 68, fullMark: 100 },
      { subject: "Konsentrasi", value: 73, fullMark: 100 },
      { subject: "Memecahkan Masalah", value: 88, fullMark: 100 },
      { subject: "Berpikir Analitis", value: 79, fullMark: 100 },
    ],
    gayaKerja: [
      { subject: "Work Direction", value: 75, fullMark: 100 },
      { subject: "Leadership", value: 82, fullMark: 100 },
      { subject: "Activity", value: 78, fullMark: 100 },
      { subject: "Social Nature", value: 85, fullMark: 100 },
      { subject: "Work Style", value: 73, fullMark: 100 },
      { subject: "Temperament", value: 68, fullMark: 100 },
      { subject: "Followership", value: 70, fullMark: 100 },
    ],
    kepribadian: [
      { subject: "Gregarious", value: 80, fullMark: 100 },
      { subject: "Achievement", value: 85, fullMark: 100 },
      { subject: "Aesthetic", value: 65, fullMark: 100 },
      { subject: "Compliance", value: 75, fullMark: 100 },
      { subject: "Anxiety", value: 45, fullMark: 100 },
      { subject: "Survival", value: 70, fullMark: 100 },
      { subject: "Love and Belonging", value: 82, fullMark: 100 },
    ],
    kepuasanHidup: {
      skor: 26,
      level: "Puas",
      kategori: "puas",
    },
    selfEsteem: {
      skor: 80,
      level: "Sangat Tinggi",
      kategori: "sangat-tinggi",
    },
  },
  P002: {
    participant: {
      id: "P002",
      nama: "Siti Nurhaliza",
      email: "siti.nurhaliza@email.com",
      noHp: "081234567891",
      jenisKelamin: "Perempuan",
      usia: 32,
      domisili: "Menteng, Jakarta Pusat",
      tanggalTest: "2024-01-18",
      status: "Sedang Test",
    },
    rekomendasi: ["Human Resources", "Training & Development", "Social Work"],
    iq: {
      skor: 105,
      level: "Rata-rata",
      kategori: "rata-rata",
    },
    iqRadar: [
      { subject: "Rotasi", value: 72, fullMark: 100 },
      { subject: "Berbahasa", value: 88, fullMark: 100 },
      { subject: "Berpikir Fleksibel", value: 76, fullMark: 100 },
      { subject: "Pengetahuan Umum", value: 82, fullMark: 100 },
      { subject: "Daya Bayang", value: 74, fullMark: 100 },
      { subject: "Konsentrasi", value: 68, fullMark: 100 },
      { subject: "Memecahkan Masalah", value: 71, fullMark: 100 },
      { subject: "Berpikir Analitis", value: 69, fullMark: 100 },
    ],
    gayaKerja: [
      { subject: "Work Direction", value: 68, fullMark: 100 },
      { subject: "Leadership", value: 74, fullMark: 100 },
      { subject: "Activity", value: 82, fullMark: 100 },
      { subject: "Social Nature", value: 92, fullMark: 100 },
      { subject: "Work Style", value: 78, fullMark: 100 },
      { subject: "Temperament", value: 85, fullMark: 100 },
      { subject: "Followership", value: 76, fullMark: 100 },
    ],
    kepribadian: [
      { subject: "Gregarious", value: 88, fullMark: 100 },
      { subject: "Achievement", value: 72, fullMark: 100 },
      { subject: "Aesthetic", value: 79, fullMark: 100 },
      { subject: "Compliance", value: 83, fullMark: 100 },
      { subject: "Anxiety", value: 55, fullMark: 100 },
      { subject: "Survival", value: 74, fullMark: 100 },
      { subject: "Love and Belonging", value: 89, fullMark: 100 },
    ],
    kepuasanHidup: {
      skor: 32,
      level: "Puas",
      kategori: "puas",
    },
    selfEsteem: {
      skor: 75,
      level: "Tinggi",
      kategori: "tinggi",
    },
  },
  P003: {
    participant: {
      id: "P003",
      nama: "Budi Santoso",
      email: "budi.santoso@email.com",
      noHp: "081234567892",
      jenisKelamin: "Laki-laki",
      usia: 34,
      domisili: "Serpong, Tangerang Selatan",
      tanggalTest: "2024-01-20",
      status: "Belum Test",
    },
    rekomendasi: ["Operations", "Project Management", "Quality Control"],
    iq: {
      skor: 112,
      level: "Diatas Rata-rata",
      kategori: "superior",
    },
    iqRadar: [
      { subject: "Rotasi", value: 78, fullMark: 100 },
      { subject: "Berbahasa", value: 71, fullMark: 100 },
      { subject: "Berpikir Fleksibel", value: 85, fullMark: 100 },
      { subject: "Pengetahuan Umum", value: 79, fullMark: 100 },
      { subject: "Daya Bayang", value: 82, fullMark: 100 },
      { subject: "Konsentrasi", value: 88, fullMark: 100 },
      { subject: "Memecahkan Masalah", value: 84, fullMark: 100 },
      { subject: "Berpikir Analitis", value: 91, fullMark: 100 },
    ],
    gayaKerja: [
      { subject: "Work Direction", value: 89, fullMark: 100 },
      { subject: "Leadership", value: 77, fullMark: 100 },
      { subject: "Activity", value: 71, fullMark: 100 },
      { subject: "Social Nature", value: 64, fullMark: 100 },
      { subject: "Work Style", value: 86, fullMark: 100 },
      { subject: "Temperament", value: 72, fullMark: 100 },
      { subject: "Followership", value: 68, fullMark: 100 },
    ],
    kepribadian: [
      { subject: "Gregarious", value: 58, fullMark: 100 },
      { subject: "Achievement", value: 91, fullMark: 100 },
      { subject: "Aesthetic", value: 62, fullMark: 100 },
      { subject: "Compliance", value: 84, fullMark: 100 },
      { subject: "Anxiety", value: 42, fullMark: 100 },
      { subject: "Survival", value: 79, fullMark: 100 },
      { subject: "Love and Belonging", value: 67, fullMark: 100 },
    ],
    kepuasanHidup: {
      skor: 28,
      level: "Puas",
      kategori: "puas",
    },
    selfEsteem: {
      skor: 82,
      level: "Sangat Tinggi",
      kategori: "sangat-tinggi",
    },
  },
  P004: {
    participant: {
      id: "P004",
      nama: "Diana Putri",
      email: "diana.putri@email.com",
      noHp: "081234567893",
      jenisKelamin: "Perempuan",
      usia: 31,
      domisili: "Bekasi Utara, Bekasi",
      tanggalTest: "2024-01-17",
      status: "Lulus",
    },
    rekomendasi: ["Marketing", "Creative Design", "Brand Management"],
    iq: {
      skor: 125,
      level: "Superior",
      kategori: "superior",
    },
    iqRadar: [
      { subject: "Rotasi", value: 91, fullMark: 100 },
      { subject: "Berbahasa", value: 89, fullMark: 100 },
      { subject: "Berpikir Fleksibel", value: 93, fullMark: 100 },
      { subject: "Pengetahuan Umum", value: 87, fullMark: 100 },
      { subject: "Daya Bayang", value: 95, fullMark: 100 },
      { subject: "Konsentrasi", value: 78, fullMark: 100 },
      { subject: "Memecahkan Masalah", value: 86, fullMark: 100 },
      { subject: "Berpikir Analitis", value: 84, fullMark: 100 },
    ],
    gayaKerja: [
      { subject: "Work Direction", value: 72, fullMark: 100 },
      { subject: "Leadership", value: 85, fullMark: 100 },
      { subject: "Activity", value: 88, fullMark: 100 },
      { subject: "Social Nature", value: 79, fullMark: 100 },
      { subject: "Work Style", value: 81, fullMark: 100 },
      { subject: "Temperament", value: 74, fullMark: 100 },
      { subject: "Followership", value: 69, fullMark: 100 },
    ],
    kepribadian: [
      { subject: "Gregarious", value: 76, fullMark: 100 },
      { subject: "Achievement", value: 89, fullMark: 100 },
      { subject: "Aesthetic", value: 92, fullMark: 100 },
      { subject: "Compliance", value: 71, fullMark: 100 },
      { subject: "Anxiety", value: 38, fullMark: 100 },
      { subject: "Survival", value: 68, fullMark: 100 },
      { subject: "Love and Belonging", value: 85, fullMark: 100 },
    ],
    kepuasanHidup: {
      skor: 35,
      level: "Sangat Puas",
      kategori: "sangat-puas",
    },
    selfEsteem: {
      skor: 88,
      level: "Sangat Tinggi",
      kategori: "sangat-tinggi",
    },
  },
  P005: {
    participant: {
      id: "P005",
      nama: "Rizki Pratama",
      email: "rizki.pratama@email.com",
      noHp: "081234567894",
      jenisKelamin: "Laki-laki",
      usia: 30,
      domisili: "Cibubur, Depok",
      tanggalTest: "2024-01-15",
      status: "Tidak Lulus",
    },
    rekomendasi: ["Administrative", "Data Entry", "Support Services"],
    iq: {
      skor: 95,
      level: "Rata-rata",
      kategori: "rata-rata",
    },
    iqRadar: [
      { subject: "Rotasi", value: 58, fullMark: 100 },
      { subject: "Berbahasa", value: 62, fullMark: 100 },
      { subject: "Berpikir Fleksibel", value: 55, fullMark: 100 },
      { subject: "Pengetahuan Umum", value: 64, fullMark: 100 },
      { subject: "Daya Bayang", value: 52, fullMark: 100 },
      { subject: "Konsentrasi", value: 48, fullMark: 100 },
      { subject: "Memecahkan Masalah", value: 59, fullMark: 100 },
      { subject: "Berpikir Analitis", value: 56, fullMark: 100 },
    ],
    gayaKerja: [
      { subject: "Work Direction", value: 54, fullMark: 100 },
      { subject: "Leadership", value: 45, fullMark: 100 },
      { subject: "Activity", value: 62, fullMark: 100 },
      { subject: "Social Nature", value: 58, fullMark: 100 },
      { subject: "Work Style", value: 51, fullMark: 100 },
      { subject: "Temperament", value: 67, fullMark: 100 },
      { subject: "Followership", value: 74, fullMark: 100 },
    ],
    kepribadian: [
      { subject: "Gregarious", value: 52, fullMark: 100 },
      { subject: "Achievement", value: 48, fullMark: 100 },
      { subject: "Aesthetic", value: 55, fullMark: 100 },
      { subject: "Compliance", value: 69, fullMark: 100 },
      { subject: "Anxiety", value: 78, fullMark: 100 },
      { subject: "Survival", value: 82, fullMark: 100 },
      { subject: "Love and Belonging", value: 61, fullMark: 100 },
    ],
    kepuasanHidup: {
      skor: 18,
      level: "Kurang Puas",
      kategori: "kurang",
    },
    selfEsteem: {
      skor: 45,
      level: "Sedang",
      kategori: "sedang",
    },
  },
  P006: {
    participant: {
      id: "P006",
      nama: "Maya Sari",
      email: "maya.sari@email.com",
      noHp: "081234567895",
      jenisKelamin: "Perempuan",
      usia: 28,
      domisili: "Gading Serpong, Tangerang",
      tanggalTest: "2024-01-22",
      status: "Terjadwal",
    },
    rekomendasi: ["Sales", "Business Development", "Client Relations"],
    iq: {
      skor: 108,
      level: "Diatas Rata-rata",
      kategori: "diatas-rata",
    },
    iqRadar: [
      { subject: "Rotasi", value: 75, fullMark: 100 },
      { subject: "Berbahasa", value: 84, fullMark: 100 },
      { subject: "Berpikir Fleksibel", value: 79, fullMark: 100 },
      { subject: "Pengetahuan Umum", value: 73, fullMark: 100 },
      { subject: "Daya Bayang", value: 71, fullMark: 100 },
      { subject: "Konsentrasi", value: 77, fullMark: 100 },
      { subject: "Memecahkan Masalah", value: 81, fullMark: 100 },
      { subject: "Berpikir Analitis", value: 76, fullMark: 100 },
    ],
    gayaKerja: [
      { subject: "Work Direction", value: 71, fullMark: 100 },
      { subject: "Leadership", value: 79, fullMark: 100 },
      { subject: "Activity", value: 86, fullMark: 100 },
      { subject: "Social Nature", value: 91, fullMark: 100 },
      { subject: "Work Style", value: 74, fullMark: 100 },
      { subject: "Temperament", value: 69, fullMark: 100 },
      { subject: "Followership", value: 65, fullMark: 100 },
    ],
    kepribadian: [
      { subject: "Gregarious", value: 87, fullMark: 100 },
      { subject: "Achievement", value: 83, fullMark: 100 },
      { subject: "Aesthetic", value: 72, fullMark: 100 },
      { subject: "Compliance", value: 68, fullMark: 100 },
      { subject: "Anxiety", value: 41, fullMark: 100 },
      { subject: "Survival", value: 75, fullMark: 100 },
      { subject: "Love and Belonging", value: 86, fullMark: 100 },
    ],
    kepuasanHidup: {
      skor: 29,
      level: "Puas",
      kategori: "puas",
    },
    selfEsteem: {
      skor: 78,
      level: "Tinggi",
      kategori: "tinggi",
    },
  },
  P007: {
    participant: {
      id: "P007",
      nama: "Andi Kurniawan",
      email: "andi.kurniawan@email.com",
      noHp: "081234567896",
      jenisKelamin: "Laki-laki",
      usia: 33,
      domisili: "Pondok Indah, Jakarta Selatan",
      tanggalTest: "2024-01-19",
      status: "Sedang Test",
    },
    rekomendasi: ["Finance", "Accounting", "Risk Management"],
    iq: {
      skor: 121,
      level: "Superior",
      kategori: "superior",
    },
    iqRadar: [
      { subject: "Rotasi", value: 83, fullMark: 100 },
      { subject: "Berbahasa", value: 76, fullMark: 100 },
      { subject: "Berpikir Fleksibel", value: 87, fullMark: 100 },
      { subject: "Pengetahuan Umum", value: 81, fullMark: 100 },
      { subject: "Daya Bayang", value: 74, fullMark: 100 },
      { subject: "Konsentrasi", value: 89, fullMark: 100 },
      { subject: "Memecahkan Masalah", value: 92, fullMark: 100 },
      { subject: "Berpikir Analitis", value: 94, fullMark: 100 },
    ],
    gayaKerja: [
      { subject: "Work Direction", value: 91, fullMark: 100 },
      { subject: "Leadership", value: 73, fullMark: 100 },
      { subject: "Activity", value: 67, fullMark: 100 },
      { subject: "Social Nature", value: 61, fullMark: 100 },
      { subject: "Work Style", value: 88, fullMark: 100 },
      { subject: "Temperament", value: 75, fullMark: 100 },
      { subject: "Followership", value: 71, fullMark: 100 },
    ],
    kepribadian: [
      { subject: "Gregarious", value: 59, fullMark: 100 },
      { subject: "Achievement", value: 94, fullMark: 100 },
      { subject: "Aesthetic", value: 61, fullMark: 100 },
      { subject: "Compliance", value: 87, fullMark: 100 },
      { subject: "Anxiety", value: 35, fullMark: 100 },
      { subject: "Survival", value: 73, fullMark: 100 },
      { subject: "Love and Belonging", value: 68, fullMark: 100 },
    ],
    kepuasanHidup: {
      skor: 31,
      level: "Puas",
      kategori: "puas",
    },
    selfEsteem: {
      skor: 85,
      level: "Sangat Tinggi",
      kategori: "sangat-tinggi",
    },
  },
  P008: {
    participant: {
      id: "P008",
      nama: "Lestari Dewi",
      email: "lestari.dewi@email.com",
      noHp: "081234567897",
      jenisKelamin: "Perempuan",
      usia: 35,
      domisili: "Kemang, Jakarta Selatan",
      tanggalTest: "2024-01-13",
      status: "Lulus",
    },
    rekomendasi: ["Management", "Consulting", "Executive Assistant"],
    iq: {
      skor: 132,
      level: "Sangat Superior",
      kategori: "superior",
    },
    iqRadar: [
      { subject: "Rotasi", value: 94, fullMark: 100 },
      { subject: "Berbahasa", value: 96, fullMark: 100 },
      { subject: "Berpikir Fleksibel", value: 91, fullMark: 100 },
      { subject: "Pengetahuan Umum", value: 89, fullMark: 100 },
      { subject: "Daya Bayang", value: 87, fullMark: 100 },
      { subject: "Konsentrasi", value: 93, fullMark: 100 },
      { subject: "Memecahkan Masalah", value: 95, fullMark: 100 },
      { subject: "Berpikir Analitis", value: 97, fullMark: 100 },
    ],
    gayaKerja: [
      { subject: "Work Direction", value: 88, fullMark: 100 },
      { subject: "Leadership", value: 92, fullMark: 100 },
      { subject: "Activity", value: 79, fullMark: 100 },
      { subject: "Social Nature", value: 84, fullMark: 100 },
      { subject: "Work Style", value: 89, fullMark: 100 },
      { subject: "Temperament", value: 81, fullMark: 100 },
      { subject: "Followership", value: 71, fullMark: 100 },
    ],
    kepribadian: [
      { subject: "Gregarious", value: 78, fullMark: 100 },
      { subject: "Achievement", value: 96, fullMark: 100 },
      { subject: "Aesthetic", value: 84, fullMark: 100 },
      { subject: "Compliance", value: 79, fullMark: 100 },
      { subject: "Anxiety", value: 28, fullMark: 100 },
      { subject: "Survival", value: 71, fullMark: 100 },
      { subject: "Love and Belonging", value: 83, fullMark: 100 },
    ],
    kepuasanHidup: {
      skor: 38,
      level: "Sangat Puas",
      kategori: "sangat-puas",
    },
    selfEsteem: {
      skor: 92,
      level: "Sangat Tinggi",
      kategori: "sangat-tinggi",
    },
  },
  P009: {
    participant: {
      id: "P009",
      nama: "Hendro Wijaya",
      email: "hendro.wijaya@email.com",
      noHp: "081234567898",
      jenisKelamin: "Laki-laki",
      usia: 27,
      domisili: "BSD City, Tangerang Selatan",
      tanggalTest: "2024-01-23",
      status: "Belum Test",
    },
    rekomendasi: ["IT Support", "Technical Writer", "System Administrator"],
    iq: {
      skor: 115,
      level: "Diatas Rata-rata",
      kategori: "superior",
    },
    iqRadar: [
      { subject: "Rotasi", value: 88, fullMark: 100 },
      { subject: "Berbahasa", value: 72, fullMark: 100 },
      { subject: "Berpikir Fleksibel", value: 85, fullMark: 100 },
      { subject: "Pengetahuan Umum", value: 79, fullMark: 100 },
      { subject: "Daya Bayang", value: 91, fullMark: 100 },
      { subject: "Konsentrasi", value: 86, fullMark: 100 },
      { subject: "Memecahkan Masalah", value: 93, fullMark: 100 },
      { subject: "Berpikir Analitis", value: 89, fullMark: 100 },
    ],
    gayaKerja: [
      { subject: "Work Direction", value: 82, fullMark: 100 },
      { subject: "Leadership", value: 58, fullMark: 100 },
      { subject: "Activity", value: 74, fullMark: 100 },
      { subject: "Social Nature", value: 52, fullMark: 100 },
      { subject: "Work Style", value: 87, fullMark: 100 },
      { subject: "Temperament", value: 69, fullMark: 100 },
      { subject: "Followership", value: 78, fullMark: 100 },
    ],
    kepribadian: [
      { subject: "Gregarious", value: 45, fullMark: 100 },
      { subject: "Achievement", value: 86, fullMark: 100 },
      { subject: "Aesthetic", value: 68, fullMark: 100 },
      { subject: "Compliance", value: 81, fullMark: 100 },
      { subject: "Anxiety", value: 52, fullMark: 100 },
      { subject: "Survival", value: 77, fullMark: 100 },
      { subject: "Love and Belonging", value: 59, fullMark: 100 },
    ],
    kepuasanHidup: {
      skor: 24,
      level: "Cukup Puas",
      kategori: "cukup",
    },
    selfEsteem: {
      skor: 72,
      level: "Tinggi",
      kategori: "tinggi",
    },
  },
  P010: {
    participant: {
      id: "P010",
      nama: "Fitri Handayani",
      email: "fitri.handayani@email.com",
      noHp: "081234567899",
      jenisKelamin: "Perempuan",
      usia: 31,
      domisili: "Kelapa Gading, Jakarta Utara",
      tanggalTest: "2024-01-16",
      status: "Dibatalkan",
    },
    rekomendasi: ["Education", "Content Writer", "Research Assistant"],
    iq: {
      skor: 110,
      level: "Diatas Rata-rata",
      kategori: "diatas-rata",
    },
    iqRadar: [
      { subject: "Rotasi", value: 76, fullMark: 100 },
      { subject: "Berbahasa", value: 92, fullMark: 100 },
      { subject: "Berpikir Fleksibel", value: 81, fullMark: 100 },
      { subject: "Pengetahuan Umum", value: 88, fullMark: 100 },
      { subject: "Daya Bayang", value: 79, fullMark: 100 },
      { subject: "Konsentrasi", value: 74, fullMark: 100 },
      { subject: "Memecahkan Masalah", value: 77, fullMark: 100 },
      { subject: "Berpikir Analitis", value: 83, fullMark: 100 },
    ],
    gayaKerja: [
      { subject: "Work Direction", value: 65, fullMark: 100 },
      { subject: "Leadership", value: 67, fullMark: 100 },
      { subject: "Activity", value: 71, fullMark: 100 },
      { subject: "Social Nature", value: 76, fullMark: 100 },
      { subject: "Work Style", value: 72, fullMark: 100 },
      { subject: "Temperament", value: 81, fullMark: 100 },
      { subject: "Followership", value: 79, fullMark: 100 },
    ],
    kepribadian: [
      { subject: "Gregarious", value: 73, fullMark: 100 },
      { subject: "Achievement", value: 77, fullMark: 100 },
      { subject: "Aesthetic", value: 86, fullMark: 100 },
      { subject: "Compliance", value: 74, fullMark: 100 },
      { subject: "Anxiety", value: 61, fullMark: 100 },
      { subject: "Survival", value: 69, fullMark: 100 },
      { subject: "Love and Belonging", value: 81, fullMark: 100 },
    ],
    kepuasanHidup: {
      skor: 22,
      level: "Cukup Puas",
      kategori: "cukup",
    },
    selfEsteem: {
      skor: 68,
      level: "Sedang",
      kategori: "sedang",
    },
  },
};

// Komponen Circular Progress
const CircularProgress = ({
  value,
  maxValue = 100,
  size = 120,
  strokeWidth = 8,
  color = "#22C55E",
  backgroundColor = "#E5E7EB",
}: {
  value: number;
  maxValue?: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  backgroundColor?: string;
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const percentage = (value / maxValue) * 100;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold">{value}</div>
        </div>
      </div>
    </div>
  );
};

export default function ParticipantDetailPage() {
  const params = useParams();
  const router = useRouter();
  const participantId = params.id as string;

  // Get participant data
  type ParticipantKey = keyof typeof testResults;
  const data = testResults[participantId as ParticipantKey];

  if (!data) {
    return (
      <LayoutDashboard>
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Data Tidak Ditemukan</h2>
            <p className="text-muted-foreground mb-4">
              Peserta dengan ID {participantId} tidak ditemukan
            </p>
            <Button onClick={() => router.back()} variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kembali
            </Button>
          </div>
        </div>
      </LayoutDashboard>
    );
  }

  const {
    participant,
    rekomendasi,
    iq,
    iqRadar,
    gayaKerja,
    kepribadian,
    kepuasanHidup,
    selfEsteem,
  } = data;

  // Colors for different categories
  const getIQColor = (kategori: string) => {
    switch (kategori) {
      case "superior":
        return "#22C55E";
      case "diatas-rata":
        return "#3B82F6";
      case "rata-rata":
        return "#F59E0B";
      case "dibawah-rata":
        return "#EF4444";
      default:
        return "#6B7280";
    }
  };

  const getSelfEsteemColor = (kategori: string) => {
    switch (kategori) {
      case "sangat-tinggi":
        return "#06B6D4";
      case "tinggi":
        return "#3B82F6";
      case "sedang":
        return "#F59E0B";
      case "rendah":
        return "#EF4444";
      default:
        return "#6B7280";
    }
  };

  const getKepuasanColor = (kategori: string) => {
    switch (kategori) {
      case "sangat-puas":
        return "#22C55E";
      case "puas":
        return "#22C55E";
      case "cukup":
        return "#F59E0B";
      case "kurang":
        return "#EF4444";
      default:
        return "#6B7280";
    }
  };

  return (
    <LayoutDashboard>
      <div className="flex flex-1 flex-col gap-6 p-4 pt-0">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <Button onClick={() => router.back()} variant="outline" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Kembali
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  Detail Hasil Test
                </h1>
                <p className="text-muted-foreground">
                  Hasil evaluasi psikotes lengkap untuk {participant.nama}
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Unduh Laporan PDF
            </Button>
          </div>
        </div>

        {/* Participant Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Informasi Peserta
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <div className="text-sm font-medium text-muted-foreground">
                  Nama Lengkap
                </div>
                <div className="font-semibold">{participant.nama}</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm font-medium text-muted-foreground">
                  Email
                </div>
                <div className="flex items-center gap-1">
                  <Mail className="h-3 w-3" />
                  {participant.email}
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm font-medium text-muted-foreground">
                  No. HP
                </div>
                <div className="flex items-center gap-1">
                  <Phone className="h-3 w-3" />
                  {participant.noHp}
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm font-medium text-muted-foreground">
                  Tanggal Test
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {new Date(participant.tanggalTest).toLocaleDateString(
                    "id-ID"
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Rekomendasi Posisi */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Rekomendasi Posisi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {rekomendasi.map((posisi, index) => (
                <Badge
                  key={index}
                  className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                >
                  {posisi}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* IQ WMS Section */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* IQ Score */}
          <Card>
            <CardHeader>
              <CardTitle className="text-center">IQ WMS</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <div className="text-center">
                <div className="text-sm font-medium text-muted-foreground mb-2">
                  Skor IQ
                </div>
                <CircularProgress
                  value={iq.skor}
                  maxValue={200}
                  color={getIQColor(iq.kategori)}
                  size={140}
                />
                <div className="mt-4">
                  <Badge
                    className={`${
                      iq.kategori === "superior"
                        ? "bg-green-100 text-green-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    Level IQ: {iq.level}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* IQ Radar */}
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Skor Radar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={iqRadar}>
                    <PolarGrid />
                    <PolarAngleAxis
                      dataKey="subject"
                      tick={{ fontSize: 10 }}
                      className="text-xs"
                    />
                    <PolarRadiusAxis
                      angle={90}
                      domain={[0, 100]}
                      tick={{ fontSize: 8 }}
                    />
                    <Radar
                      name="Skor"
                      dataKey="value"
                      stroke="#22C55E"
                      fill="#22C55E"
                      fillOpacity={0.3}
                      strokeWidth={2}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Gaya Kerja & Kepribadian */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Gaya Kerja */}
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Gaya Kerja</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={gayaKerja}>
                    <PolarGrid />
                    <PolarAngleAxis
                      dataKey="subject"
                      tick={{ fontSize: 10 }}
                      className="text-xs"
                    />
                    <PolarRadiusAxis
                      angle={90}
                      domain={[0, 100]}
                      tick={{ fontSize: 8 }}
                    />
                    <Radar
                      name="Nilai"
                      dataKey="value"
                      stroke="#3B82F6"
                      fill="#3B82F6"
                      fillOpacity={0.3}
                      strokeWidth={2}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Kepribadian */}
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Kepribadian</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={kepribadian}>
                    <PolarGrid />
                    <PolarAngleAxis
                      dataKey="subject"
                      tick={{ fontSize: 10 }}
                      className="text-xs"
                    />
                    <PolarRadiusAxis
                      angle={90}
                      domain={[0, 100]}
                      tick={{ fontSize: 8 }}
                    />
                    <Radar
                      name="Tingkat"
                      dataKey="value"
                      stroke="#8B5CF6"
                      fill="#8B5CF6"
                      fillOpacity={0.3}
                      strokeWidth={2}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Kepuasan Hidup & Self Esteem */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Kepuasan Hidup */}
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Kepuasan Hidup</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <CircularProgress
                value={kepuasanHidup.skor}
                maxValue={50}
                color={getKepuasanColor(kepuasanHidup.kategori)}
                size={140}
              />
              <div className="text-center">
                <div className="text-sm text-muted-foreground">
                  Level Kepuasan Hidup
                </div>
                <Badge className="bg-green-100 text-green-700 mt-2">
                  {kepuasanHidup.level}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Self Esteem */}
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Self Esteem</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <CircularProgress
                value={selfEsteem.skor}
                maxValue={100}
                color={getSelfEsteemColor(selfEsteem.kategori)}
                size={140}
              />
              <div className="text-center">
                <div className="text-sm text-muted-foreground">
                  Level Self Esteem
                </div>
                <Badge className="bg-cyan-100 text-cyan-700 mt-2">
                  {selfEsteem.level}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Kesimpulan */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Kesimpulan & Rekomendasi
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="prose max-w-none">
              <p>
                Berdasarkan hasil evaluasi psikotes yang telah dilakukan,{" "}
                <strong>{participant.nama}</strong> menunjukkan profil yang
                sangat baik dengan skor IQ {iq.skor} yang termasuk dalam
                kategori <strong>{iq.level}</strong>.
              </p>
              <p>
                Kandidat memiliki kemampuan analitis yang baik dan tingkat
                kepercayaan diri yang tinggi. Kepribadian yang seimbang dan
                tingkat kepuasan hidup yang baik menunjukkan stabilitas
                emosional yang positif.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg mt-4">
                <h4 className="font-semibold text-blue-900 mb-2">
                  Rekomendasi:
                </h4>
                <ul className="list-disc list-inside text-blue-800 space-y-1">
                  <li>
                    Sangat cocok untuk posisi yang membutuhkan kemampuan
                    komunikasi dan analisis
                  </li>
                  <li>
                    Dapat ditempatkan di departemen yang berhubungan dengan
                    layanan pelanggan
                  </li>
                  <li>Memiliki potensi kepemimpinan yang dapat dikembangkan</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </LayoutDashboard>
  );
}
