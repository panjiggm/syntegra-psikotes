"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Save,
  Edit,
  Camera,
  Download,
} from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import LayoutCandidate from "@/layout/LayoutCandidate";

// Mock profile data
const mockProfile = {
  personalInfo: {
    fullName: "Ahmad Fauzi Rahman",
    email: "ahmadfauzi@gmail.com",
    phone: "+62 812-3456-7890",
    dateOfBirth: "1995-06-15",
    address: "Jl. Sudirman No. 123, Jakarta Selatan",
    city: "Jakarta",
    province: "DKI Jakarta",
    postalCode: "12190",
    nationality: "Indonesia",
    gender: "Laki-laki",
    maritalStatus: "Belum Menikah",
  },
  professional: {
    currentPosition: "Software Engineer",
    company: "Tech Startup Indonesia",
    experience: "3 tahun",
    industry: "Teknologi Informasi",
    skills: ["JavaScript", "React", "Node.js", "Python", "SQL"],
    linkedIn: "https://linkedin.com/in/ahmadfauzi",
    portfolio: "https://github.com/ahmadfauzi",
  },
  education: {
    degree: "Sarjana Komputer",
    university: "Universitas Indonesia",
    graduationYear: "2018",
    gpa: "3.65",
  },
  testInfo: {
    testCode: "PSI2025001",
    registrationDate: "2025-01-10",
    position: "Senior Software Engineer",
    department: "Engineering",
    recruiter: "Sarah Wilson",
  },
  preferences: {
    language: "Bahasa Indonesia",
    timezone: "WIB (UTC+7)",
    notifications: {
      email: true,
      sms: false,
      push: true,
    },
    privacy: {
      shareResults: false,
      allowMonitoring: true,
      dataRetention: "6 bulan",
    },
  },
};

export default function CandidateProfile() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(mockProfile);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSaving(false);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setProfile(mockProfile); // Reset to original data
    setIsEditing(false);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <LayoutCandidate>
      <div className="space-y-8 py-8">
        {/* Profile Header */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="" alt={profile.personalInfo.fullName} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                      {getInitials(profile.personalInfo.fullName)}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute -bottom-2 -right-2 rounded-full p-2 h-8 w-8"
                  >
                    <Camera className="h-3 w-3" />
                  </Button>
                </div>

                <div className="space-y-2">
                  <h1 className="text-2xl font-bold">
                    {profile.personalInfo.fullName}
                  </h1>
                  <p className="text-gray-600">
                    {profile.professional.currentPosition}
                  </p>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-primary">
                      Kode Tes: {profile.testInfo.testCode}
                    </Badge>
                    <Badge className="bg-green-100 text-green-800">
                      Status: Aktif
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                {isEditing ? (
                  <>
                    <Button variant="outline" onClick={handleCancel}>
                      Batal
                    </Button>
                    <Button onClick={handleSave} disabled={isSaving}>
                      {isSaving ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Menyimpan...
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          Simpan
                        </>
                      )}
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Export Data
                    </Button>
                    <Button onClick={() => setIsEditing(true)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profil
                    </Button>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Tabs */}

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Informasi Pribadi
            </CardTitle>
            <CardDescription>Data pribadi dan kontak Anda</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="fullName">Nama Lengkap</Label>
                <Input
                  id="fullName"
                  value={profile.personalInfo.fullName}
                  disabled={!isEditing}
                  onChange={(e) =>
                    setProfile((prev) => ({
                      ...prev,
                      personalInfo: {
                        ...prev.personalInfo,
                        fullName: e.target.value,
                      },
                    }))
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    className="pl-10"
                    value={profile.personalInfo.email}
                    disabled={!isEditing}
                    onChange={(e) =>
                      setProfile((prev) => ({
                        ...prev,
                        personalInfo: {
                          ...prev.personalInfo,
                          email: e.target.value,
                        },
                      }))
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Nomor Telepon</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="phone"
                    className="pl-10"
                    value={profile.personalInfo.phone}
                    disabled={!isEditing}
                    onChange={(e) =>
                      setProfile((prev) => ({
                        ...prev,
                        personalInfo: {
                          ...prev.personalInfo,
                          phone: e.target.value,
                        },
                      }))
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Tanggal Lahir</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="dateOfBirth"
                    type="date"
                    className="pl-10"
                    value={profile.personalInfo.dateOfBirth}
                    disabled={!isEditing}
                    onChange={(e) =>
                      setProfile((prev) => ({
                        ...prev,
                        personalInfo: {
                          ...prev.personalInfo,
                          dateOfBirth: e.target.value,
                        },
                      }))
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender">Jenis Kelamin</Label>
                <Select
                  value={profile.personalInfo.gender}
                  disabled={!isEditing}
                  onValueChange={(value) =>
                    setProfile((prev) => ({
                      ...prev,
                      personalInfo: { ...prev.personalInfo, gender: value },
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Laki-laki">Laki-laki</SelectItem>
                    <SelectItem value="Perempuan">Perempuan</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="maritalStatus">Status Pernikahan</Label>
                <Select
                  value={profile.personalInfo.maritalStatus}
                  disabled={!isEditing}
                  onValueChange={(value) =>
                    setProfile((prev) => ({
                      ...prev,
                      personalInfo: {
                        ...prev.personalInfo,
                        maritalStatus: value,
                      },
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Belum Menikah">Belum Menikah</SelectItem>
                    <SelectItem value="Menikah">Menikah</SelectItem>
                    <SelectItem value="Cerai">Cerai</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Alamat Lengkap</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Textarea
                  id="address"
                  className="pl-10"
                  value={profile.personalInfo.address}
                  disabled={!isEditing}
                  onChange={(e) =>
                    setProfile((prev) => ({
                      ...prev,
                      personalInfo: {
                        ...prev.personalInfo,
                        address: e.target.value,
                      },
                    }))
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">Kota</Label>
                <Input
                  id="city"
                  value={profile.personalInfo.city}
                  disabled={!isEditing}
                  onChange={(e) =>
                    setProfile((prev) => ({
                      ...prev,
                      personalInfo: {
                        ...prev.personalInfo,
                        city: e.target.value,
                      },
                    }))
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="province">Provinsi</Label>
                <Input
                  id="province"
                  value={profile.personalInfo.province}
                  disabled={!isEditing}
                  onChange={(e) =>
                    setProfile((prev) => ({
                      ...prev,
                      personalInfo: {
                        ...prev.personalInfo,
                        province: e.target.value,
                      },
                    }))
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="postalCode">Kode Pos</Label>
                <Input
                  id="postalCode"
                  value={profile.personalInfo.postalCode}
                  disabled={!isEditing}
                  onChange={(e) =>
                    setProfile((prev) => ({
                      ...prev,
                      personalInfo: {
                        ...prev.personalInfo,
                        postalCode: e.target.value,
                      },
                    }))
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </LayoutCandidate>
  );
}
