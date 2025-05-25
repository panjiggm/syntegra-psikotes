"use client";

import { useState } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import LayoutDashboard from "@/layout/LayoutDashboard";
import {
  Settings,
  Building,
  Mail,
  Shield,
  Database,
  Zap,
  Clock,
  Globe,
  Bell,
  Key,
  Download,
  Upload,
  Save,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Eye,
  EyeOff,
  Smartphone,
  Lock,
  Users,
  BarChart3,
  HelpCircle,
  Plus,
} from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  const [showApiKey, setShowApiKey] = useState(false);
  const [showSmtpPassword, setShowSmtpPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // State untuk form data
  const [generalSettings, setGeneralSettings] = useState({
    companyName: "Syntegra Services",
    companyDescription: "Penyedia layanan psikotes digital terdepan",
    contactEmail: "admin@syntegra-services.com",
    contactPhone: "+62 21 1234 5678",
    timezone: "Asia/Jakarta",
    language: "id",
    logoUrl: "/images/syntegra-logo.jpg",
  });

  const [testSettings, setTestSettings] = useState({
    defaultDuration: 30,
    maxAttempts: 3,
    autoSave: true,
    preventScreenshot: true,
    preventTabSwitch: true,
    faceDetection: false,
    warningThreshold: 3,
    autoSubmit: true,
    shuffleQuestions: false,
    showProgress: true,
  });

  const [emailSettings, setEmailSettings] = useState({
    smtpHost: "smtp.gmail.com",
    smtpPort: "587",
    smtpUsername: "admin@syntegra-services.com",
    smtpPassword: "",
    senderName: "Syntegra Services",
    senderEmail: "noreply@syntegra-services.com",
    enableWelcomeEmail: true,
    enableResultEmail: true,
    enableReminderEmail: true,
  });

  const [securitySettings, setSecuritySettings] = useState({
    passwordMinLength: 8,
    requireUppercase: true,
    requireNumbers: true,
    requireSpecialChars: true,
    sessionTimeout: 60,
    maxLoginAttempts: 5,
    enable2FA: false,
    ipWhitelist: "",
  });

  const handleSave = async () => {
    setIsLoading(true);
    // Simulasi API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    // Show success message
    alert("Pengaturan berhasil disimpan!");
  };

  return (
    <LayoutDashboard>
      <div className="flex flex-1 flex-col gap-4 p-4">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground">
              Pengaturan Sistem
            </h1>
            <p className="text-muted-foreground max-w-2xl text-sm">
              Kelola konfigurasi sistem psikotes, pengaturan keamanan, dan
              integrasi untuk memastikan operasional yang optimal dan aman.
            </p>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Reset Default
            </Button>
            <Button onClick={handleSave} disabled={isLoading} className="gap-2">
              {isLoading ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              Simpan Pengaturan
            </Button>
          </div>
        </div>

        {/* Status Banner */}
        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <h4 className="font-medium text-green-800">
                  Sistem Beroperasi Normal
                </h4>
                <p className="text-sm text-green-600">
                  Semua layanan berjalan dengan baik. Terakhir dicek: 2 menit
                  yang lalu
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Settings Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="general" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              Umum
            </TabsTrigger>
            <TabsTrigger value="test" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Tes
            </TabsTrigger>
            {/* <TabsTrigger value="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email
            </TabsTrigger> */}
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Keamanan
            </TabsTrigger>
            {/* <TabsTrigger value="backup" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              Backup
            </TabsTrigger> */}
            {/* <TabsTrigger
              value="integration"
              className="flex items-center gap-2"
            >
              <Zap className="h-4 w-4" />
              Integrasi
            </TabsTrigger> */}
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    Informasi Perusahaan
                  </CardTitle>
                  <CardDescription>
                    Konfigurasi informasi dasar perusahaan
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="company-name">Nama Perusahaan</Label>
                    <Input
                      id="company-name"
                      value={generalSettings.companyName}
                      onChange={(e) =>
                        setGeneralSettings({
                          ...generalSettings,
                          companyName: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor="company-desc">Deskripsi Perusahaan</Label>
                    <Textarea
                      id="company-desc"
                      value={generalSettings.companyDescription}
                      onChange={(e) =>
                        setGeneralSettings({
                          ...generalSettings,
                          companyDescription: e.target.value,
                        })
                      }
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="contact-email">Email Kontak</Label>
                    <Input
                      id="contact-email"
                      type="email"
                      value={generalSettings.contactEmail}
                      onChange={(e) =>
                        setGeneralSettings({
                          ...generalSettings,
                          contactEmail: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor="contact-phone">Nomor Telepon</Label>
                    <Input
                      id="contact-phone"
                      value={generalSettings.contactPhone}
                      onChange={(e) =>
                        setGeneralSettings({
                          ...generalSettings,
                          contactPhone: e.target.value,
                        })
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Pengaturan Regional
                  </CardTitle>
                  <CardDescription>
                    Konfigurasi zona waktu dan bahasa sistem
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="timezone">Zona Waktu</Label>
                    <Select
                      value={generalSettings.timezone}
                      onValueChange={(value) =>
                        setGeneralSettings({
                          ...generalSettings,
                          timezone: value,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Asia/Jakarta">
                          Asia/Jakarta (WIB)
                        </SelectItem>
                        <SelectItem value="Asia/Makassar">
                          Asia/Makassar (WITA)
                        </SelectItem>
                        <SelectItem value="Asia/Jayapura">
                          Asia/Jayapura (WIT)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="language">Bahasa Default</Label>
                    <Select
                      value={generalSettings.language}
                      onValueChange={(value) =>
                        setGeneralSettings({
                          ...generalSettings,
                          language: value,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="id">Bahasa Indonesia</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="logo-upload">Logo Perusahaan</Label>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                        <Building className="h-8 w-8 text-gray-400" />
                      </div>
                      <Button variant="outline" className="gap-2">
                        <Upload className="h-4 w-4" />
                        Upload Logo
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Format: PNG, JPG. Maksimal 2MB
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Test Settings */}
          <TabsContent value="test" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Pengaturan Durasi & Percobaan
                  </CardTitle>
                  <CardDescription>
                    Konfigurasi waktu dan jumlah percobaan tes
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="default-duration">
                      Durasi Default (menit)
                    </Label>
                    <Input
                      id="default-duration"
                      type="number"
                      value={testSettings.defaultDuration}
                      onChange={(e) =>
                        setTestSettings({
                          ...testSettings,
                          defaultDuration: parseInt(e.target.value),
                        })
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor="max-attempts">Maksimal Percobaan</Label>
                    <Select
                      value={testSettings.maxAttempts.toString()}
                      onValueChange={(value) =>
                        setTestSettings({
                          ...testSettings,
                          maxAttempts: parseInt(value),
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 kali</SelectItem>
                        <SelectItem value="2">2 kali</SelectItem>
                        <SelectItem value="3">3 kali</SelectItem>
                        <SelectItem value="5">5 kali</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="warning-threshold">
                      Batas Peringatan Pelanggaran
                    </Label>
                    <Input
                      id="warning-threshold"
                      type="number"
                      value={testSettings.warningThreshold}
                      onChange={(e) =>
                        setTestSettings({
                          ...testSettings,
                          warningThreshold: parseInt(e.target.value),
                        })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Auto Save Jawaban</Label>
                      <p className="text-sm text-muted-foreground">
                        Simpan jawaban secara otomatis
                      </p>
                    </div>
                    <Switch
                      checked={testSettings.autoSave}
                      onCheckedChange={(checked) =>
                        setTestSettings({
                          ...testSettings,
                          autoSave: checked,
                        })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Auto Submit</Label>
                      <p className="text-sm text-muted-foreground">
                        Submit otomatis saat waktu habis
                      </p>
                    </div>
                    <Switch
                      checked={testSettings.autoSubmit}
                      onCheckedChange={(checked) =>
                        setTestSettings({
                          ...testSettings,
                          autoSubmit: checked,
                        })
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Keamanan Tes
                  </CardTitle>
                  <CardDescription>
                    Pengaturan keamanan selama pelaksanaan tes
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Cegah Screenshot</Label>
                      <p className="text-sm text-muted-foreground">
                        Blokir fitur screenshot
                      </p>
                    </div>
                    <Switch
                      checked={testSettings.preventScreenshot}
                      onCheckedChange={(checked) =>
                        setTestSettings({
                          ...testSettings,
                          preventScreenshot: checked,
                        })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Cegah Pindah Tab</Label>
                      <p className="text-sm text-muted-foreground">
                        Deteksi perpindahan tab browser
                      </p>
                    </div>
                    <Switch
                      checked={testSettings.preventTabSwitch}
                      onCheckedChange={(checked) =>
                        setTestSettings({
                          ...testSettings,
                          preventTabSwitch: checked,
                        })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Deteksi Wajah</Label>
                      <p className="text-sm text-muted-foreground">
                        Gunakan kamera untuk deteksi wajah
                      </p>
                    </div>
                    <Switch
                      checked={testSettings.faceDetection}
                      onCheckedChange={(checked) =>
                        setTestSettings({
                          ...testSettings,
                          faceDetection: checked,
                        })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Acak Urutan Soal</Label>
                      <p className="text-sm text-muted-foreground">
                        Randomize pertanyaan setiap peserta
                      </p>
                    </div>
                    <Switch
                      checked={testSettings.shuffleQuestions}
                      onCheckedChange={(checked) =>
                        setTestSettings({
                          ...testSettings,
                          shuffleQuestions: checked,
                        })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Tampilkan Progress</Label>
                      <p className="text-sm text-muted-foreground">
                        Progress bar untuk peserta
                      </p>
                    </div>
                    <Switch
                      checked={testSettings.showProgress}
                      onCheckedChange={(checked) =>
                        setTestSettings({
                          ...testSettings,
                          showProgress: checked,
                        })
                      }
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Email Settings */}
          <TabsContent value="email" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    Konfigurasi SMTP
                  </CardTitle>
                  <CardDescription>
                    Pengaturan server email untuk notifikasi
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="smtp-host">Host SMTP</Label>
                    <Input
                      id="smtp-host"
                      value={emailSettings.smtpHost}
                      onChange={(e) =>
                        setEmailSettings({
                          ...emailSettings,
                          smtpHost: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor="smtp-port">Port SMTP</Label>
                    <Select
                      value={emailSettings.smtpPort}
                      onValueChange={(value) =>
                        setEmailSettings({
                          ...emailSettings,
                          smtpPort: value,
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="587">587 (TLS)</SelectItem>
                        <SelectItem value="465">465 (SSL)</SelectItem>
                        <SelectItem value="25">25 (Non-encrypted)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="smtp-username">Username SMTP</Label>
                    <Input
                      id="smtp-username"
                      type="email"
                      value={emailSettings.smtpUsername}
                      onChange={(e) =>
                        setEmailSettings({
                          ...emailSettings,
                          smtpUsername: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor="smtp-password">Password SMTP</Label>
                    <div className="relative">
                      <Input
                        id="smtp-password"
                        type={showSmtpPassword ? "text" : "password"}
                        value={emailSettings.smtpPassword}
                        onChange={(e) =>
                          setEmailSettings({
                            ...emailSettings,
                            smtpPassword: e.target.value,
                          })
                        }
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowSmtpPassword(!showSmtpPassword)}
                      >
                        {showSmtpPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full">
                    Test Koneksi SMTP
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5" />
                    Pengaturan Notifikasi
                  </CardTitle>
                  <CardDescription>
                    Konfigurasi email otomatis untuk peserta
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="sender-name">Nama Pengirim</Label>
                    <Input
                      id="sender-name"
                      value={emailSettings.senderName}
                      onChange={(e) =>
                        setEmailSettings({
                          ...emailSettings,
                          senderName: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor="sender-email">Email Pengirim</Label>
                    <Input
                      id="sender-email"
                      type="email"
                      value={emailSettings.senderEmail}
                      onChange={(e) =>
                        setEmailSettings({
                          ...emailSettings,
                          senderEmail: e.target.value,
                        })
                      }
                    />
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Email Selamat Datang</Label>
                        <p className="text-sm text-muted-foreground">
                          Kirim email setelah registrasi
                        </p>
                      </div>
                      <Switch
                        checked={emailSettings.enableWelcomeEmail}
                        onCheckedChange={(checked) =>
                          setEmailSettings({
                            ...emailSettings,
                            enableWelcomeEmail: checked,
                          })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Email Hasil Tes</Label>
                        <p className="text-sm text-muted-foreground">
                          Kirim hasil setelah tes selesai
                        </p>
                      </div>
                      <Switch
                        checked={emailSettings.enableResultEmail}
                        onCheckedChange={(checked) =>
                          setEmailSettings({
                            ...emailSettings,
                            enableResultEmail: checked,
                          })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Email Pengingat</Label>
                        <p className="text-sm text-muted-foreground">
                          Kirim pengingat tes yang akan datang
                        </p>
                      </div>
                      <Switch
                        checked={emailSettings.enableReminderEmail}
                        onCheckedChange={(checked) =>
                          setEmailSettings({
                            ...emailSettings,
                            enableReminderEmail: checked,
                          })
                        }
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="h-5 w-5" />
                    Kebijakan Password
                  </CardTitle>
                  <CardDescription>
                    Aturan keamanan password untuk admin
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="min-length">Panjang Minimum</Label>
                    <Select
                      value={securitySettings.passwordMinLength.toString()}
                      onValueChange={(value) =>
                        setSecuritySettings({
                          ...securitySettings,
                          passwordMinLength: parseInt(value),
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="6">6 karakter</SelectItem>
                        <SelectItem value="8">8 karakter</SelectItem>
                        <SelectItem value="10">10 karakter</SelectItem>
                        <SelectItem value="12">12 karakter</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label>Wajib Huruf Besar</Label>
                      <Switch
                        checked={securitySettings.requireUppercase}
                        onCheckedChange={(checked) =>
                          setSecuritySettings({
                            ...securitySettings,
                            requireUppercase: checked,
                          })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label>Wajib Angka</Label>
                      <Switch
                        checked={securitySettings.requireNumbers}
                        onCheckedChange={(checked) =>
                          setSecuritySettings({
                            ...securitySettings,
                            requireNumbers: checked,
                          })
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label>Wajib Karakter Khusus</Label>
                      <Switch
                        checked={securitySettings.requireSpecialChars}
                        onCheckedChange={(checked) =>
                          setSecuritySettings({
                            ...securitySettings,
                            requireSpecialChars: checked,
                          })
                        }
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Keamanan Sesi
                  </CardTitle>
                  <CardDescription>
                    Pengaturan sesi dan akses sistem
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="session-timeout">
                      Timeout Sesi (menit)
                    </Label>
                    <Select
                      value={securitySettings.sessionTimeout.toString()}
                      onValueChange={(value) =>
                        setSecuritySettings({
                          ...securitySettings,
                          sessionTimeout: parseInt(value),
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 menit</SelectItem>
                        <SelectItem value="60">1 jam</SelectItem>
                        <SelectItem value="120">2 jam</SelectItem>
                        <SelectItem value="480">8 jam</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="max-login">Maksimal Percobaan Login</Label>
                    <Select
                      value={securitySettings.maxLoginAttempts.toString()}
                      onValueChange={(value) =>
                        setSecuritySettings({
                          ...securitySettings,
                          maxLoginAttempts: parseInt(value),
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3">3 kali</SelectItem>
                        <SelectItem value="5">5 kali</SelectItem>
                        <SelectItem value="10">10 kali</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">
                        Aktifkan 2FA untuk admin
                      </p>
                    </div>
                    <Switch
                      checked={securitySettings.enable2FA}
                      onCheckedChange={(checked) =>
                        setSecuritySettings({
                          ...securitySettings,
                          enable2FA: checked,
                        })
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor="ip-whitelist">
                      IP Whitelist (opsional)
                    </Label>
                    <Textarea
                      id="ip-whitelist"
                      placeholder="192.168.1.1&#10;10.0.0.1&#10;203.0.113.1"
                      value={securitySettings.ipWhitelist}
                      onChange={(e) =>
                        setSecuritySettings({
                          ...securitySettings,
                          ipWhitelist: e.target.value,
                        })
                      }
                      rows={3}
                    />
                    <p className="text-xs text-muted-foreground">
                      Satu IP per baris. Kosongkan untuk akses dari semua IP
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Backup Settings */}
          <TabsContent value="backup" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    Backup Otomatis
                  </CardTitle>
                  <CardDescription>
                    Konfigurasi backup data sistem
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Aktifkan Backup Otomatis</Label>
                      <p className="text-sm text-muted-foreground">
                        Backup harian pada pukul 02:00
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div>
                    <Label>Frekuensi Backup</Label>
                    <Select defaultValue="daily">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Harian</SelectItem>
                        <SelectItem value="weekly">Mingguan</SelectItem>
                        <SelectItem value="monthly">Bulanan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Retensi Backup</Label>
                    <Select defaultValue="30">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7">7 hari</SelectItem>
                        <SelectItem value="30">30 hari</SelectItem>
                        <SelectItem value="90">90 hari</SelectItem>
                        <SelectItem value="365">1 tahun</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label>Backup Terakhir</Label>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">25 Januari 2025, 02:15</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Ukuran: 245 MB • Status: Berhasil
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Download className="h-5 w-5" />
                    Export & Import Data
                  </CardTitle>
                  <CardDescription>
                    Kelola ekspor dan impor data sistem
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Export Data Peserta</Label>
                    <div className="flex gap-2 mt-2">
                      <Button variant="outline" size="sm">
                        Excel (.xlsx)
                      </Button>
                      <Button variant="outline" size="sm">
                        CSV
                      </Button>
                      <Button variant="outline" size="sm">
                        JSON
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label>Export Hasil Tes</Label>
                    <div className="flex gap-2 mt-2">
                      <Button variant="outline" size="sm">
                        PDF Report
                      </Button>
                      <Button variant="outline" size="sm">
                        Excel Summary
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <Label>Import Data Peserta</Label>
                    <div className="flex gap-2 mt-2">
                      <Button variant="outline" size="sm" className="gap-2">
                        <Upload className="h-4 w-4" />
                        Upload File
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Format: Excel atau CSV
                    </p>
                  </div>

                  <div>
                    <Label>Backup Manual</Label>
                    <Button className="w-full mt-2 gap-2">
                      <Database className="h-4 w-4" />
                      Buat Backup Sekarang
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Integration Settings */}
          <TabsContent value="integration" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Key className="h-5 w-5" />
                    API Keys & Webhooks
                  </CardTitle>
                  <CardDescription>
                    Konfigurasi integrasi dengan sistem eksternal
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="api-key">API Key Sistem</Label>
                    <div className="relative">
                      <Input
                        id="api-key"
                        type={showApiKey ? "text" : "password"}
                        value="sk_live_abcd1234567890..."
                        readOnly
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowApiKey(!showApiKey)}
                      >
                        {showApiKey ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <div className="flex gap-2 mt-2">
                      <Button variant="outline" size="sm">
                        Generate New Key
                      </Button>
                      <Button variant="outline" size="sm">
                        Copy Key
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="webhook-url">Webhook URL</Label>
                    <Input
                      id="webhook-url"
                      placeholder="https://your-app.com/webhook/psikotes"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      URL untuk menerima notifikasi hasil tes
                    </p>
                  </div>

                  <div>
                    <Label>Webhook Events</Label>
                    <div className="space-y-2 mt-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Test Completed</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Test Started</span>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Participant Registered</span>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Integrasi Pihak Ketiga
                  </CardTitle>
                  <CardDescription>
                    Koneksi dengan layanan eksternal
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                        <Mail className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium">Google Gmail</div>
                        <div className="text-sm text-muted-foreground">
                          Email integration
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-100 text-green-700">
                        Connected
                      </Badge>
                      <Button variant="ghost" size="sm">
                        Configure
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-100 rounded flex items-center justify-center">
                        <BarChart3 className="h-4 w-4 text-purple-600" />
                      </div>
                      <div>
                        <div className="font-medium">Microsoft Excel</div>
                        <div className="text-sm text-muted-foreground">
                          Report export
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-100 text-green-700">
                        Connected
                      </Badge>
                      <Button variant="ghost" size="sm">
                        Configure
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-orange-100 rounded flex items-center justify-center">
                        <Smartphone className="h-4 w-4 text-orange-600" />
                      </div>
                      <div>
                        <div className="font-medium">WhatsApp Business</div>
                        <div className="text-sm text-muted-foreground">
                          SMS notifications
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Not Connected</Badge>
                      <Button variant="ghost" size="sm">
                        Connect
                      </Button>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full gap-2">
                    <Plus className="h-4 w-4" />
                    Tambah Integrasi Baru
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* System Health */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Status Sistem
                </CardTitle>
                <CardDescription>
                  Monitor kesehatan dan performa sistem
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-4">
                  <div className="text-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mx-auto mb-2">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="font-medium">Database</div>
                    <div className="text-sm text-green-600">Online</div>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mx-auto mb-2">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="font-medium">Email Service</div>
                    <div className="text-sm text-green-600">Active</div>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mx-auto mb-2">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="font-medium">File Storage</div>
                    <div className="text-sm text-green-600">78% Free</div>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-full mx-auto mb-2">
                      <AlertTriangle className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div className="font-medium">API Rate</div>
                    <div className="text-sm text-yellow-600">85% Used</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Help Section */}
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-900">
              <HelpCircle className="h-5 w-5" />
              Bantuan & Dokumentasi
            </CardTitle>
          </CardHeader>
          <CardContent className="text-blue-800">
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <h4 className="font-semibold mb-2">Panduan Konfigurasi</h4>
                <ul className="text-sm space-y-1">
                  <li>• Panduan setup SMTP untuk email</li>
                  <li>• Konfigurasi keamanan yang direkomendasikan</li>
                  <li>• Best practices untuk backup data</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">API Documentation</h4>
                <ul className="text-sm space-y-1">
                  <li>• Dokumentasi REST API lengkap</li>
                  <li>• Contoh implementasi webhook</li>
                  <li>• SDK untuk berbagai bahasa pemrograman</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Support & Contact</h4>
                <ul className="text-sm space-y-1">
                  <li>• Email: support@syntegra-services.com</li>
                  <li>• WhatsApp: +62 812 3456 7890</li>
                  <li>• Live Chat tersedia 24/7</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </LayoutDashboard>
  );
}
