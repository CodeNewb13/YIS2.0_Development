"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  Calendar,
  Users,
  CheckCircle2,
  XCircle,
  Clock,
  Plus,
  Search,
  Filter,
  Download,
  Edit3,
  Trash2,
  ExternalLink,
  Bell,
  GraduationCap,
  Award,
  Building2,
  Sparkles,
  ChevronRight,
  LogOut,
  Eye,
  Settings,
  RefreshCw,
  FileSpreadsheet,
  AlertCircle,
  Check,
  X,
  Menu,
  ChevronDown,
  ArrowUpRight,
  Send,
  UserCheck,
  Shield,
  HelpCircle,
  FileText,
} from "lucide-react";

// Types
export type EventCategory =
  | "Kompetisi"
  | "Bootcamp"
  | "Grant & Riset"
  | "Workshop"
  | "Mentorship";

export type EventStatus = "Dibuka" | "Segera Dibuka" | "Ditutup";

export interface AdminEvent {
  id: string;
  name: string;
  category: EventCategory;
  organizer: string;
  date: string;
  deadline: string;
  location: string;
  quota: number;
  registeredCount: number;
  status: EventStatus;
  image: string;
  description: string;
}

export type RegistrationStatus = "Menunggu Review" | "Disetujui" | "Ditolak";

export interface Registration {
  id: string;
  studentName: string;
  email: string;
  phone: string;
  school: string;
  grade: string;
  eventId: string;
  eventName: string;
  submissionDate: string;
  status: RegistrationStatus;
  motivation: string;
  interests: string[];
  resumeUrl?: string;
  notes?: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  school: string;
  grade: string;
  interests: string[];
  eventsJoined: number;
  joinDate: string;
  status: "Aktif" | "Alumni";
}

export interface Partner {
  id: string;
  name: string;
  code: string;
  logoColor: string;
  programsCount: number;
  contactPerson: string;
  email: string;
  mouStatus: "Aktif" | "Dalam Pembahasan";
}

export interface ActivityLog {
  id: string;
  action: string;
  user: string;
  timestamp: string;
  type: "success" | "warning" | "info";
}

// Initial Mock Datasets
const INITIAL_EVENTS: AdminEvent[] = [
  {
    id: "stem-circuit",
    name: "National STEM Circuit & Robotics Championship 2026",
    category: "Kompetisi",
    organizer: "YIS x ITB",
    date: "28 - 30 Nov 2026",
    deadline: "20 Nov 2026",
    location: "ITB Bandung & Hybrid",
    quota: 150,
    registeredCount: 118,
    status: "Dibuka",
    image: "/visuals/stem-circuit.jpg",
    description:
      "Kompetisi rancang prototipe sirkuit IoT, robotika, dan mikrokontroler untuk mitigasi bencana alam tingkat nasional.",
  },
  {
    id: "creative-coding",
    name: "Youth AI & Creative Coding Fellowship",
    category: "Bootcamp",
    organizer: "YIS Tech Lab x UI",
    date: "05 - 20 Des 2026",
    deadline: "30 Nov 2026",
    location: "Nasional (Daring)",
    quota: 80,
    registeredCount: 76,
    status: "Dibuka",
    image: "/visuals/coding-class.jpg",
    description:
      "Program intensif 8 pekan membangun software open-source dan penerapan algoritma machine learning untuk pemula dan menengah.",
  },
  {
    id: "science-lab",
    name: "Young Scientists Renewable Energy Lab Grant",
    category: "Grant & Riset",
    organizer: "BRIN & Sains YIS",
    date: "12 - 15 Jan 2027",
    deadline: "10 Jan 2027",
    location: "Lab Riset Terpadu Jakarta",
    quota: 30,
    registeredCount: 28,
    status: "Dibuka",
    image: "/visuals/science-lab.jpg",
    description:
      "Eksperimen langsung di lab sains meneliti sel surya dan material bio-energi dengan dana hibah riset penuh.",
  },
  {
    id: "stem-workshop",
    name: "Youth Innovation & Maker Faire Expo",
    category: "Workshop",
    organizer: "Inovasi UGM",
    date: "18 - 20 Des 2026",
    deadline: "10 Des 2026",
    location: "Yogyakarta",
    quota: 200,
    registeredCount: 142,
    status: "Dibuka",
    image: "/visuals/stem-workshop.jpg",
    description:
      "Pameran karya inovasi sains remaja dan kelas hands-on prototyping 3D printing serta elektronika terapan.",
  },
  {
    id: "mentorship-circle",
    name: "STEM Community Peer Tutoring Circle",
    category: "Mentorship",
    organizer: "Alumni OSN & NTU",
    date: "Tiap Akhir Pekan",
    deadline: "Penuh",
    location: "Daring (Discord/Zoom)",
    quota: 60,
    registeredCount: 60,
    status: "Ditutup",
    image: "/visuals/stem-workshop.jpg",
    description:
      "Bimbingan 1-on-1 belajar kalkulus, mekanika fisika, kimia, dan algoritma olimpiade bersama mentor berprestasi internasional.",
  },
  {
    id: "astrophysics-summit",
    name: "Indonesia Space Exploration & Astrophysics Camp",
    category: "Workshop",
    organizer: "YIS x Bosscha ITB",
    date: "25 - 28 Feb 2027",
    deadline: "15 Jan 2027",
    location: "Lembang, Bandung",
    quota: 50,
    registeredCount: 12,
    status: "Segera Dibuka",
    image: "/visuals/science-lab.jpg",
    description:
      "Pengamatan langit malam, simulasi orbit satelit, dan pengenalan data sains teleskop radio bersama astronom nasional.",
  },
];

const INITIAL_REGISTRATIONS: Registration[] = [
  {
    id: "REG-2026-001",
    studentName: "Alex Pratama",
    email: "alex.pratama@stem.id",
    phone: "0812-9847-2101",
    school: "SMA Negeri 1 Jakarta",
    grade: "Kelas 12 SMA",
    eventId: "stem-circuit",
    eventName: "National STEM Circuit & Robotics Championship 2026",
    submissionDate: "10 Nov 2026, 14:20",
    status: "Disetujui",
    motivation:
      "Saya telah mengembangkan sensor deteksi banjir berbasis Arduino dan ingin membawanya ke tahap kompetisi nasional bersama bimbingan dosen ITB.",
    interests: ["Robotics & IoT", "Applied Mathematics"],
    resumeUrl: "https://drive.google.com/alex-cv",
    notes: "Portofolio proyek mikrokontroler sangat solid. Lolos tahap seleksi berkas.",
  },
  {
    id: "REG-2026-002",
    studentName: "Nadine Aulia",
    email: "nadine.aulia@gmail.com",
    phone: "0856-1122-3344",
    school: "SMA Labschool Kebayoran",
    grade: "Kelas 11 SMA",
    eventId: "creative-coding",
    eventName: "Youth AI & Creative Coding Fellowship",
    submissionDate: "11 Nov 2026, 09:15",
    status: "Menunggu Review",
    motivation:
      "Ingin mendalami computer vision dengan Python untuk klasifikasi penyakit tanaman daun herbal Indonesia.",
    interests: ["Artificial Intelligence", "Python", "Data Science"],
    resumeUrl: "https://drive.google.com/nadine-cv",
  },
  {
    id: "REG-2026-003",
    studentName: "Dimas Rizky",
    email: "dimas.rizky@itb.ac.id",
    phone: "0813-8877-6655",
    school: "SMAN 3 Bandung",
    grade: "Kelas 12 SMA",
    eventId: "science-lab",
    eventName: "Young Scientists Renewable Energy Lab Grant",
    submissionDate: "09 Nov 2026, 16:40",
    status: "Menunggu Review",
    motivation:
      "Mengajukan riset sel surya perovskite skala laboratorium dengan bahan pendukung lokal ramah lingkungan.",
    interests: ["Renewable Energy", "Biotechnology", "Lab Research"],
  },
  {
    id: "REG-2026-004",
    studentName: "Clarissa Megan",
    email: "clarissa.m@penabur.sch.id",
    phone: "0878-3344-9988",
    school: "SMA Kristen 1 Penabur",
    grade: "Kelas 10 SMA",
    eventId: "stem-circuit",
    eventName: "National STEM Circuit & Robotics Championship 2026",
    submissionDate: "08 Nov 2026, 11:05",
    status: "Disetujui",
    motivation:
      "Memiliki tim robotik sekolah juara 2 regional dan ingin menguji coba sistem navigasi otonom berbasis LIDAR sederhana.",
    interests: ["Robotics & IoT", "C++ / Arduino"],
    notes: "Rekomendasi guru pembimbing robotika lengkap.",
  },
  {
    id: "REG-2026-005",
    studentName: "Fadhil Rahman",
    email: "fadhil.r@ic.sch.id",
    phone: "0821-4455-6677",
    school: "MAN Insan Cendekia Serpong",
    grade: "Kelas 12 SMA",
    eventId: "stem-workshop",
    eventName: "Youth Innovation & Maker Faire Expo",
    submissionDate: "07 Nov 2026, 10:30",
    status: "Disetujui",
    motivation:
      "Ingin memamerkan purwarupa alat filtrasi air laut bertenaga gelombang mikro yang kami buat di ekstrakurikuler KIR.",
    interests: ["Renewable Energy", "Lab Research"],
  },
  {
    id: "REG-2026-006",
    studentName: "Sarah Annisa",
    email: "sarah.annisa@sman8.sch.id",
    phone: "0819-0909-1212",
    school: "SMAN 8 Jakarta",
    grade: "Kelas 11 SMA",
    eventId: "creative-coding",
    eventName: "Youth AI & Creative Coding Fellowship",
    submissionDate: "06 Nov 2026, 18:22",
    status: "Ditolak",
    motivation:
      "Tertarik mempelajari web development dasar untuk membuat blog pribadi sains.",
    interests: ["UI / UX Design"],
    notes: "Tingkat prasyarat coding fellowship tidak terpenuhi (fokus machine learning). Disarankan ikut kelas Web Dasar terlebih dahulu.",
  },
  {
    id: "REG-2026-007",
    studentName: "Kevin Sanjaya",
    email: "kevin.s@kanisius.edu",
    phone: "0852-7788-9900",
    school: "SMA Kolese Kanisius",
    grade: "Kelas 11 SMA",
    eventId: "mentorship-circle",
    eventName: "STEM Community Peer Tutoring Circle",
    submissionDate: "05 Nov 2026, 20:10",
    status: "Disetujui",
    motivation:
      "Persiapan OSN Fisika tingkat provinsi, butuh review materi mekanika analitik dan termodinamika.",
    interests: ["Astrophysics", "Applied Mathematics"],
  },
  {
    id: "REG-2026-008",
    studentName: "Tiara Maharani",
    email: "tiara.maharani@smak5.sch.id",
    phone: "0813-2211-4433",
    school: "SMAK 5 Penabur",
    grade: "Kelas 12 SMA",
    eventId: "science-lab",
    eventName: "Young Scientists Renewable Energy Lab Grant",
    submissionDate: "11 Nov 2026, 13:45",
    status: "Menunggu Review",
    motivation:
      "Riset ekstrak pigmen spirulina sebagai elektrolit baterai ramah lingkungan dengan pengujian spektrofotometer.",
    interests: ["Biotechnology", "Lab Research"],
  },
];

const INITIAL_STUDENTS: Student[] = [
  {
    id: "STD-01",
    name: "Alex Pratama",
    email: "alex.pratama@stem.id",
    school: "SMA Negeri 1 Jakarta",
    grade: "Kelas 12",
    interests: ["Robotics & IoT", "Applied Mathematics", "C++ / Arduino"],
    eventsJoined: 3,
    joinDate: "02 Agu 2026",
    status: "Aktif",
  },
  {
    id: "STD-02",
    name: "Nadine Aulia",
    email: "nadine.aulia@gmail.com",
    school: "SMA Labschool Kebayoran",
    grade: "Kelas 11",
    interests: ["Artificial Intelligence", "Python", "Data Science"],
    eventsJoined: 1,
    joinDate: "15 Sep 2026",
    status: "Aktif",
  },
  {
    id: "STD-03",
    name: "Dimas Rizky",
    email: "dimas.rizky@itb.ac.id",
    school: "SMAN 3 Bandung",
    grade: "Kelas 12",
    interests: ["Renewable Energy", "Biotechnology", "Lab Research"],
    eventsJoined: 2,
    joinDate: "20 Agu 2026",
    status: "Aktif",
  },
  {
    id: "STD-04",
    name: "Clarissa Megan",
    email: "clarissa.m@penabur.sch.id",
    school: "SMA Kristen 1 Penabur",
    grade: "Kelas 10",
    interests: ["Robotics & IoT", "Applied Mathematics"],
    eventsJoined: 2,
    joinDate: "10 Okt 2026",
    status: "Aktif",
  },
  {
    id: "STD-05",
    name: "Fadhil Rahman",
    email: "fadhil.r@ic.sch.id",
    school: "MAN Insan Cendekia Serpong",
    grade: "Kelas 12",
    interests: ["Renewable Energy", "Lab Research"],
    eventsJoined: 4,
    joinDate: "12 Jul 2026",
    status: "Aktif",
  },
  {
    id: "STD-06",
    name: "Sarah Annisa",
    email: "sarah.annisa@sman8.sch.id",
    school: "SMAN 8 Jakarta",
    grade: "Kelas 11",
    interests: ["UI / UX Design", "Software Engineering"],
    eventsJoined: 1,
    joinDate: "01 Nov 2026",
    status: "Aktif",
  },
  {
    id: "STD-07",
    name: "Kevin Sanjaya",
    email: "kevin.s@kanisius.edu",
    school: "SMA Kolese Kanisius",
    grade: "Kelas 11",
    interests: ["Astrophysics", "Applied Mathematics"],
    eventsJoined: 3,
    joinDate: "18 Agu 2026",
    status: "Aktif",
  },
];

const INITIAL_PARTNERS: Partner[] = [
  {
    id: "PTR-ITB",
    name: "Institut Teknologi Bandung",
    code: "ITB",
    logoColor: "#BCD5C6",
    programsCount: 4,
    contactPerson: "Dr. Ir. Hendra Gunawan",
    email: "stem-partnership@itb.ac.id",
    mouStatus: "Aktif",
  },
  {
    id: "PTR-UI",
    name: "Universitas Indonesia",
    code: "UI",
    logoColor: "#CFE4F3",
    programsCount: 3,
    contactPerson: "Prof. Anindita Kusuma",
    email: "riset-kolaborasi@ui.ac.id",
    mouStatus: "Aktif",
  },
  {
    id: "PTR-UGM",
    name: "Universitas Gadjah Mada",
    code: "UGM",
    logoColor: "#EDBD62",
    programsCount: 2,
    contactPerson: "Bambang Wicaksono, M.Sc.",
    email: "inovasi@ugm.ac.id",
    mouStatus: "Aktif",
  },
  {
    id: "PTR-BRIN",
    name: "Badan Riset dan Inovasi Nasional",
    code: "BRIN",
    logoColor: "#E16E68",
    programsCount: 2,
    contactPerson: "Pusat Riset Tenaga & Sains",
    email: "kerjasama@brin.go.id",
    mouStatus: "Aktif",
  },
  {
    id: "PTR-NTU",
    name: "Nanyang Technological University",
    code: "NTU",
    logoColor: "#CFB4E4",
    programsCount: 1,
    contactPerson: "ASEAN Youth STEM Outreach",
    email: "global-outreach@ntu.edu.sg",
    mouStatus: "Aktif",
  },
];

const INITIAL_LOGS: ActivityLog[] = [
  {
    id: "LOG-01",
    action: "Menyetujui pendaftaran Alex Pratama untuk STEM Circuit",
    user: "Admin YIS",
    timestamp: "10 Nov 2026, 14:35",
    type: "success",
  },
  {
    id: "LOG-02",
    action: "Memperbarui kuota peserta Youth Innovation Expo menjadi 200",
    user: "Super Admin",
    timestamp: "10 Nov 2026, 11:20",
    type: "info",
  },
  {
    id: "LOG-03",
    action: "Menolak pendaftaran Sarah Annisa (prasyarat belum sesuai)",
    user: "Admin YIS",
    timestamp: "07 Nov 2026, 09:15",
    type: "warning",
  },
  {
    id: "LOG-04",
    action: "Publikasi event baru: Indonesia Space Exploration Camp",
    user: "Admin YIS",
    timestamp: "05 Nov 2026, 16:00",
    type: "success",
  },
];

export default function AdminDashboardPage() {
  // Navigation active tab
  const [activeTab, setActiveTab] = useState<
    "overview" | "events" | "registrations" | "students" | "partners" | "settings"
  >("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Core Data States with localStorage sync
  const [events, setEvents] = useState<AdminEvent[]>(INITIAL_EVENTS);
  const [registrations, setRegistrations] =
    useState<Registration[]>(INITIAL_REGISTRATIONS);
  const [students, setStudents] = useState<Student[]>(INITIAL_STUDENTS);
  const [partners, setPartners] = useState<Partner[]>(INITIAL_PARTNERS);
  const [logs, setLogs] = useState<ActivityLog[]>(INITIAL_LOGS);

  // Toast Notification State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Filters & Search for Events Tab
  const [eventSearch, setEventSearch] = useState("");
  const [eventCategoryFilter, setEventCategoryFilter] = useState<string>("Semua");
  const [eventStatusFilter, setEventStatusFilter] = useState<string>("Semua");

  // Filters & Search for Registrations Tab
  const [regSearch, setRegSearch] = useState("");
  const [regEventFilter, setRegEventFilter] = useState<string>("Semua");
  const [regStatusFilter, setRegStatusFilter] = useState<string>("Semua");

  // Filters & Search for Students Tab
  const [studentSearch, setStudentSearch] = useState("");
  const [studentInterestFilter, setStudentInterestFilter] = useState<string>("Semua");

  // Filters for Logs Tab
  const [logFilter, setLogFilter] = useState<"semua" | "success" | "warning" | "info">("semua");

  // Modals state
  const [eventModalOpen, setEventModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<AdminEvent | null>(null);

  const [regDetailModalOpen, setRegDetailModalOpen] = useState(false);
  const [selectedReg, setSelectedReg] = useState<Registration | null>(null);

  const [partnerModalOpen, setPartnerModalOpen] = useState(false);

  // Form states for Event creation/editing
  const [eventForm, setEventForm] = useState({
    name: "",
    category: "Kompetisi" as EventCategory,
    organizer: "",
    date: "",
    deadline: "",
    location: "",
    quota: 100,
    status: "Dibuka" as EventStatus,
    image: "/visuals/stem-circuit.jpg",
    description: "",
  });

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const storedEvents = localStorage.getItem("yis_admin_events");
        if (storedEvents) setEvents(JSON.parse(storedEvents));

        const storedRegs = localStorage.getItem("yis_admin_registrations");
        if (storedRegs) setRegistrations(JSON.parse(storedRegs));

        const storedPartners = localStorage.getItem("yis_admin_partners");
        if (storedPartners) setPartners(JSON.parse(storedPartners));
      } catch (e) {
        console.error("Failed to load local storage data", e);
      }
    }
  }, []);

  // Keyboard accessibility: Close modals on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setEventModalOpen(false);
        setRegDetailModalOpen(false);
        setPartnerModalOpen(false);
        setSidebarOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Save to localStorage when state changes
  const saveEvents = (newEvents: AdminEvent[]) => {
    setEvents(newEvents);
    if (typeof window !== "undefined") {
      localStorage.setItem("yis_admin_events", JSON.stringify(newEvents));
    }
  };

  const saveRegistrations = (newRegs: Registration[]) => {
    setRegistrations(newRegs);
    if (typeof window !== "undefined") {
      localStorage.setItem("yis_admin_registrations", JSON.stringify(newRegs));
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const addLog = (
    action: string,
    type: "success" | "warning" | "info" = "info"
  ) => {
    const newLog: ActivityLog = {
      id: `LOG-${Date.now()}`,
      action,
      user: "Admin YIS",
      timestamp: "Baru saja",
      type,
    };
    setLogs((prev) => [newLog, ...prev.slice(0, 19)]);
  };

  // Computed Overview Metrics
  const totalRegistrations = registrations.length;
  const pendingRegistrations = registrations.filter(
    (r) => r.status === "Menunggu Review"
  ).length;
  const approvedRegistrations = registrations.filter(
    (r) => r.status === "Disetujui"
  ).length;
  const activeEventsCount = events.filter((e) => e.status === "Dibuka").length;
  const totalStudentCount = students.length + 1413; // Base demo metric

  // Filtered Events
  const filteredEvents = useMemo(() => {
    return events.filter((e) => {
      const matchSearch =
        e.name.toLowerCase().includes(eventSearch.toLowerCase()) ||
        e.organizer.toLowerCase().includes(eventSearch.toLowerCase()) ||
        e.location.toLowerCase().includes(eventSearch.toLowerCase());
      const matchCategory =
        eventCategoryFilter === "Semua" || e.category === eventCategoryFilter;
      const matchStatus =
        eventStatusFilter === "Semua" || e.status === eventStatusFilter;
      return matchSearch && matchCategory && matchStatus;
    });
  }, [events, eventSearch, eventCategoryFilter, eventStatusFilter]);

  // Filtered Registrations
  const filteredRegistrations = useMemo(() => {
    return registrations.filter((r) => {
      const matchSearch =
        r.studentName.toLowerCase().includes(regSearch.toLowerCase()) ||
        r.email.toLowerCase().includes(regSearch.toLowerCase()) ||
        r.school.toLowerCase().includes(regSearch.toLowerCase()) ||
        r.id.toLowerCase().includes(regSearch.toLowerCase());
      const matchEvent =
        regEventFilter === "Semua" || r.eventId === regEventFilter;
      const matchStatus =
        regStatusFilter === "Semua" || r.status === regStatusFilter;
      return matchSearch && matchEvent && matchStatus;
    });
  }, [registrations, regSearch, regEventFilter, regStatusFilter]);

  // Filtered Students
  const filteredStudents = useMemo(() => {
    return students.filter((st) => {
      const matchSearch =
        st.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
        st.email.toLowerCase().includes(studentSearch.toLowerCase()) ||
        st.school.toLowerCase().includes(studentSearch.toLowerCase());
      const matchInterest =
        studentInterestFilter === "Semua" ||
        st.interests.includes(studentInterestFilter);
      return matchSearch && matchInterest;
    });
  }, [students, studentSearch, studentInterestFilter]);

  // Filtered Logs
  const filteredLogs = useMemo(() => {
    if (logFilter === "semua") return logs;
    return logs.filter((l) => l.type === logFilter);
  }, [logs, logFilter]);

  // Actions for Registration status
  const handleApproveRegistration = (regId: string) => {
    const updated = registrations.map((r) => {
      if (r.id === regId) {
        return { ...r, status: "Disetujui" as RegistrationStatus };
      }
      return r;
    });
    saveRegistrations(updated);
    const reg = registrations.find((r) => r.id === regId);
    showToast(`Pendaftaran ${reg?.studentName || "peserta"} berhasil disetujui!`);
    addLog(`Menyetujui pendaftaran ${reg?.studentName} (${reg?.eventName})`, "success");
    if (selectedReg && selectedReg.id === regId) {
      setSelectedReg({ ...selectedReg, status: "Disetujui" });
    }
  };

  const handleRejectRegistration = (regId: string) => {
    const updated = registrations.map((r) => {
      if (r.id === regId) {
        return { ...r, status: "Ditolak" as RegistrationStatus };
      }
      return r;
    });
    saveRegistrations(updated);
    const reg = registrations.find((r) => r.id === regId);
    showToast(`Pendaftaran ${reg?.studentName || "peserta"} telah ditolak.`);
    addLog(`Menolak pendaftaran ${reg?.studentName}`, "warning");
    if (selectedReg && selectedReg.id === regId) {
      setSelectedReg({ ...selectedReg, status: "Ditolak" });
    }
  };

  // Open Event Modal for Create or Edit
  const handleOpenCreateEvent = () => {
    setEditingEvent(null);
    setEventForm({
      name: "",
      category: "Kompetisi",
      organizer: "Youth in STEM Indonesia",
      date: "",
      deadline: "",
      location: "Jakarta & Hybrid",
      quota: 100,
      status: "Dibuka",
      image: "/visuals/stem-circuit.jpg",
      description: "",
    });
    setEventModalOpen(true);
  };

  const handleOpenEditEvent = (eventItem: AdminEvent) => {
    setEditingEvent(eventItem);
    setEventForm({
      name: eventItem.name,
      category: eventItem.category,
      organizer: eventItem.organizer,
      date: eventItem.date,
      deadline: eventItem.deadline,
      location: eventItem.location,
      quota: eventItem.quota,
      status: eventItem.status,
      image: eventItem.image,
      description: eventItem.description,
    });
    setEventModalOpen(true);
  };

  const handleSaveEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventForm.name.trim()) return;

    if (editingEvent) {
      const updated = events.map((ev) => {
        if (ev.id === editingEvent.id) {
          return {
            ...ev,
            ...eventForm,
          };
        }
        return ev;
      });
      saveEvents(updated);
      showToast(`Event "${eventForm.name}" berhasil diperbarui!`);
      addLog(`Memperbarui data event "${eventForm.name}"`, "info");
    } else {
      const newEvent: AdminEvent = {
        id: `ev-${Date.now()}`,
        ...eventForm,
        registeredCount: 0,
      };
      saveEvents([newEvent, ...events]);
      showToast(`Event baru "${eventForm.name}" berhasil diterbitkan!`);
      addLog(`Menerbitkan event baru "${eventForm.name}"`, "success");
    }
    setEventModalOpen(false);
  };

  const handleDeleteEvent = (id: string, name: string) => {
    if (confirm(`Yakin ingin menghapus event "${name}"?`)) {
      const updated = events.filter((e) => e.id !== id);
      saveEvents(updated);
      showToast(`Event "${name}" telah dihapus.`);
      addLog(`Menghapus event "${name}"`, "warning");
    }
  };

  // Export CSV generator
  const handleExportCSV = () => {
    const headers = [
      "ID Pendaftaran",
      "Nama Siswa",
      "Email",
      "No. Telepon",
      "Asal Sekolah",
      "Tingkat / Kelas",
      "Event yang Dituju",
      "Tanggal Submit",
      "Status",
      "Minat STEM",
    ];

    const rows = filteredRegistrations.map((r) => [
      `"${r.id}"`,
      `"${r.studentName}"`,
      `"${r.email}"`,
      `"${r.phone}"`,
      `"${r.school}"`,
      `"${r.grade}"`,
      `"${r.eventName}"`,
      `"${r.submissionDate}"`,
      `"${r.status}"`,
      `"${r.interests.join(", ")}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `rekap-pendaftar-yis-${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast("File CSV Rekap Pendaftar berhasil diunduh!");
  };

  return (
    <div className="flex min-h-screen bg-[#F4F1EA]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-lg border-2 border-[#1C2533] bg-[#FFF9EF] px-5 py-3.5 text-sm font-black text-[#1C2533] shadow-[4px_4px_0px_#1C2533] transition-all animate-in slide-in-from-bottom-5">
          <Sparkles className="h-4 w-4 text-[#EDBD62]" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="ml-2 hover:opacity-70"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-[#1C2533]/60 backdrop-blur-xs md:hidden"
          aria-hidden="true"
        />
      )}

      {/* Sidebar for Desktop */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform border-r-2 border-[#1C2533] bg-[#1C2533] text-[#FFF9EF] transition-transform duration-200 ease-in-out md:static md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-0 -translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col justify-between p-4">
          <div>
            {/* Brand Logo & Title */}
            <div className="flex items-center justify-between border-b border-[#FFF9EF]/15 pb-4 pt-1">
              <Link href="/" className="flex items-center gap-2.5">
                <div className="relative h-9 w-11 shrink-0 overflow-hidden rounded bg-[#FFF9EF] p-1">
                  <Image
                    src="/YIS Logo Transparent.png"
                    alt="YIS Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                <div>
                  <span className="block text-xs font-black tracking-tight text-[#FFF9EF] uppercase leading-none">
                    YIS ADMIN
                  </span>
                  <span className="block text-[8px] font-bold tracking-[0.2em] text-[#BCD5C6] uppercase mt-0.5">
                    Control Center
                  </span>
                </div>
              </Link>
              <button
                onClick={() => setSidebarOpen(false)}
                className="md:hidden text-[#FFF9EF] hover:opacity-80"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="mt-6 space-y-1.5">
              <button
                onClick={() => {
                  setActiveTab("overview");
                  setSidebarOpen(false);
                }}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-xs font-black uppercase tracking-wider transition-all ${
                  activeTab === "overview"
                    ? "bg-[#EDBD62] text-[#1C2533] shadow-[2px_2px_0px_#FFF9EF]"
                    : "text-[#FFF9EF]/80 hover:bg-[#FFF9EF]/10 hover:text-[#FFF9EF]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <LayoutDashboard className="h-4 w-4" />
                  <span>Ringkasan</span>
                </div>
                {pendingRegistrations > 0 && (
                  <span
                    className={`rounded-full px-1.5 py-0.5 text-[9px] font-black ${
                      activeTab === "overview"
                        ? "bg-[#1C2533] text-[#FFF9EF]"
                        : "bg-[#E16E68] text-[#FFF9EF]"
                    }`}
                  >
                    {pendingRegistrations}
                  </span>
                )}
              </button>

              <button
                onClick={() => {
                  setActiveTab("events");
                  setSidebarOpen(false);
                }}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-xs font-black uppercase tracking-wider transition-all ${
                  activeTab === "events"
                    ? "bg-[#EDBD62] text-[#1C2533] shadow-[2px_2px_0px_#FFF9EF]"
                    : "text-[#FFF9EF]/80 hover:bg-[#FFF9EF]/10 hover:text-[#FFF9EF]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4" />
                  <span>Kelola Event</span>
                </div>
                <span className="text-[10px] opacity-70">{events.length}</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab("registrations");
                  setSidebarOpen(false);
                }}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-xs font-black uppercase tracking-wider transition-all ${
                  activeTab === "registrations"
                    ? "bg-[#EDBD62] text-[#1C2533] shadow-[2px_2px_0px_#FFF9EF]"
                    : "text-[#FFF9EF]/80 hover:bg-[#FFF9EF]/10 hover:text-[#FFF9EF]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <UserCheck className="h-4 w-4" />
                  <span>Pendaftar & Verifikasi</span>
                </div>
                {pendingRegistrations > 0 && (
                  <span className="rounded-full bg-[#E16E68] px-2 py-0.5 text-[9px] font-black text-[#FFF9EF]">
                    {pendingRegistrations} baru
                  </span>
                )}
              </button>

              <button
                onClick={() => {
                  setActiveTab("students");
                  setSidebarOpen(false);
                }}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-xs font-black uppercase tracking-wider transition-all ${
                  activeTab === "students"
                    ? "bg-[#EDBD62] text-[#1C2533] shadow-[2px_2px_0px_#FFF9EF]"
                    : "text-[#FFF9EF]/80 hover:bg-[#FFF9EF]/10 hover:text-[#FFF9EF]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <GraduationCap className="h-4 w-4" />
                  <span>Direktori Siswa</span>
                </div>
                <span className="text-[10px] opacity-70">
                  {students.length}
                </span>
              </button>

              <button
                onClick={() => {
                  setActiveTab("partners");
                  setSidebarOpen(false);
                }}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-xs font-black uppercase tracking-wider transition-all ${
                  activeTab === "partners"
                    ? "bg-[#EDBD62] text-[#1C2533] shadow-[2px_2px_0px_#FFF9EF]"
                    : "text-[#FFF9EF]/80 hover:bg-[#FFF9EF]/10 hover:text-[#FFF9EF]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Building2 className="h-4 w-4" />
                  <span>Mitra Kampus</span>
                </div>
                <span className="text-[10px] opacity-70">
                  {partners.length}
                </span>
              </button>

              <button
                onClick={() => {
                  setActiveTab("settings");
                  setSidebarOpen(false);
                }}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-xs font-black uppercase tracking-wider transition-all ${
                  activeTab === "settings"
                    ? "bg-[#EDBD62] text-[#1C2533] shadow-[2px_2px_0px_#FFF9EF]"
                    : "text-[#FFF9EF]/80 hover:bg-[#FFF9EF]/10 hover:text-[#FFF9EF]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <FileText className="h-4 w-4" />
                  <span>Log Aktivitas</span>
                </div>
              </button>
            </nav>
          </div>

          {/* Admin User Profile Section */}
          <div className="border-t border-[#FFF9EF]/15 pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EDBD62] font-black text-[#1C2533] text-xs">
                  AD
                </div>
                <div className="overflow-hidden">
                  <span className="block truncate text-xs font-black text-[#FFF9EF]">
                    Admin Tim STEM
                  </span>
                  <span className="block truncate text-[10px] text-[#BCD5C6]">
                    superadmin@stem.id
                  </span>
                </div>
              </div>
              <Link
                href="/login"
                title="Log Out"
                className="text-[#FFF9EF]/60 hover:text-[#E16E68] p-1.5 transition-colors"
              >
                <LogOut className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Viewport */}
      <div className="flex flex-1 flex-col overflow-x-hidden">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b-2 border-[#1C2533] bg-[#FFF9EF] px-4 md:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden rounded p-1 text-[#1C2533] hover:bg-[#1C2533]/10"
              aria-label="Buka navigasi menu"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#597865] bg-[#BCD5C6]/40 px-2 py-0.5 rounded border border-[#1C2533]/20">
                ADMIN CONSOLE
              </span>
              <h1 className="text-base sm:text-lg font-black uppercase tracking-tight text-[#1C2533]">
                {activeTab === "overview" && "Dashboard Ringkasan"}
                {activeTab === "events" && "Manajemen Event & Kompetisi"}
                {activeTab === "registrations" && "Verifikasi Pendaftar"}
                {activeTab === "students" && "Direktori Anggota Pelajar"}
                {activeTab === "partners" && "Kolaborasi Universitas & Mitra"}
                {activeTab === "settings" && "Log Aktivitas Administrator"}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Action: New Event */}
            <button
              onClick={handleOpenCreateEvent}
              className="flex items-center gap-1.5 rounded-lg border-2 border-[#1C2533] bg-[#EDBD62] px-3 py-1.5 text-xs font-black uppercase text-[#1C2533] shadow-[2px_2px_0px_#1C2533] hover:translate-y-0.5 transition-all"
            >
              <Plus className="h-3.5 w-3.5 stroke-[3]" />
              <span className="hidden sm:inline">Event Baru</span>
            </button>

            {/* Quick Action: Export CSV */}
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 rounded-lg border-2 border-[#1C2533] bg-[#FFF9EF] px-3 py-1.5 text-xs font-black uppercase text-[#1C2533] shadow-[2px_2px_0px_#1C2533] hover:bg-[#F4F1EA] transition-all"
              title="Unduh Rekap Pendaftar"
            >
              <Download className="h-3.5 w-3.5" />
              <span className="hidden md:inline">Export CSV</span>
            </button>
          </div>
        </header>

        {/* Dynamic Body Content according to activeTab */}
        <main className="flex-1 p-4 sm:p-6 md:p-8 space-y-6">
          {/* ========================================================= */}
          {/* TAB 1: OVERVIEW */}
          {/* ========================================================= */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* 4 Stat Cards */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {/* Stat 1: Total Pendaftar */}
                <div
                  onClick={() => {
                    setRegStatusFilter("Semua");
                    setActiveTab("registrations");
                  }}
                  className="cursor-pointer group rounded-xl border-2 border-[#1C2533] bg-[#FFF9EF] p-5 shadow-[4px_4px_0px_#1C2533] hover:-translate-y-0.5 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-wider text-[#1C2533]/70 group-hover:text-[#1C2533]">
                      Total Pendaftaran
                    </span>
                    <div className="rounded-lg bg-[#BCD5C6] p-2 text-[#1C2533] border border-[#1C2533] group-hover:scale-105 transition-transform">
                      <FileSpreadsheet className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-3xl font-black text-[#1C2533]">
                      {totalRegistrations}
                    </span>
                    <span className="text-xs font-black text-[#597865]">
                      +18% bln ini
                    </span>
                  </div>
                  <div className="mt-2 text-[11px] text-[#1C2533]/60">
                    {approvedRegistrations} pendaftaran disetujui &bull; Buka &rarr;
                  </div>
                </div>

                {/* Stat 2: Verifikasi Menunggu */}
                <div
                  onClick={() => {
                    setRegStatusFilter("Menunggu Review");
                    setActiveTab("registrations");
                  }}
                  className="cursor-pointer group rounded-xl border-2 border-[#1C2533] bg-[#FFF9EF] p-5 shadow-[4px_4px_0px_#1C2533] hover:-translate-y-0.5 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-wider text-[#1C2533]/70 group-hover:text-[#1C2533]">
                      Perlu Verifikasi
                    </span>
                    <div className="rounded-lg bg-[#E16E68] p-2 text-[#FFF9EF] border border-[#1C2533] group-hover:scale-105 transition-transform">
                      <Clock className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-3xl font-black text-[#E16E68]">
                      {pendingRegistrations}
                    </span>
                    <span className="text-[10px] bg-[#E16E68]/15 text-[#E16E68] px-1.5 py-0.5 rounded font-black">
                      Aksi Diperlukan
                    </span>
                  </div>
                  <div className="mt-2 text-[11px] font-bold text-[#1C2533] underline group-hover:text-[#4C84AB]">
                    Buka antrean review &rarr;
                  </div>
                </div>

                {/* Stat 3: Event Aktif */}
                <div
                  onClick={() => setActiveTab("events")}
                  className="cursor-pointer group rounded-xl border-2 border-[#1C2533] bg-[#FFF9EF] p-5 shadow-[4px_4px_0px_#1C2533] hover:-translate-y-0.5 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-wider text-[#1C2533]/70 group-hover:text-[#1C2533]">
                      Event Berjalan
                    </span>
                    <div className="rounded-lg bg-[#CFE4F3] p-2 text-[#1C2533] border border-[#1C2533] group-hover:scale-105 transition-transform">
                      <Calendar className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-3xl font-black text-[#1C2533]">
                      {activeEventsCount}
                    </span>
                    <span className="text-xs font-black text-[#1C2533]/70">
                      / {events.length} total
                    </span>
                  </div>
                  <div className="mt-2 text-[11px] text-[#1C2533]/60">
                    Kelola jadwal & kuota &rarr;
                  </div>
                </div>

                {/* Stat 4: Anggota Terdaftar */}
                <div
                  onClick={() => setActiveTab("students")}
                  className="cursor-pointer group rounded-xl border-2 border-[#1C2533] bg-[#FFF9EF] p-5 shadow-[4px_4px_0px_#1C2533] hover:-translate-y-0.5 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-wider text-[#1C2533]/70 group-hover:text-[#1C2533]">
                      Komunitas Siswa
                    </span>
                    <div className="rounded-lg bg-[#EDBD62] p-2 text-[#1C2533] border border-[#1C2533] group-hover:scale-105 transition-transform">
                      <Users className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-3xl font-black text-[#1C2533]">
                      {totalStudentCount.toLocaleString()}
                    </span>
                    <span className="text-xs font-black text-[#597865]">
                      Pelajar
                    </span>
                  </div>
                  <div className="mt-2 text-[11px] text-[#1C2533]/60">
                    Buka direktori anggota &rarr;
                  </div>
                </div>
              </div>

              {/* Middle Section: Chart / Category Breakdown + Upcoming Deadlines */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
                {/* Visual Category Breakdown (7 cols) */}
                <div className="rounded-xl border-2 border-[#1C2533] bg-[#FFF9EF] p-6 shadow-[4px_4px_0px_#1C2533] lg:col-span-7">
                  <div className="flex items-center justify-between border-b-2 border-[#1C2533]/10 pb-4">
                    <div>
                      <h2 className="text-base font-black uppercase tracking-tight text-[#1C2533]">
                        Distribusi Peminatan STEM & Event
                      </h2>
                      <p className="text-xs text-[#1C2533]/60 mt-0.5">
                        Proporsi pendaftar berdasarkan kategori program aktif
                      </p>
                    </div>
                    <span className="text-xs font-black bg-[#BCD5C6] px-2.5 py-1 rounded border border-[#1C2533]">
                      Q4 2026
                    </span>
                  </div>

                  <div className="mt-5 space-y-4">
                    {/* Item 1 */}
                    <div>
                      <div className="flex justify-between text-xs font-bold text-[#1C2533] mb-1">
                        <span>Robotika & IoT (Kompetisi)</span>
                        <span className="font-black">118 Siswa (42%)</span>
                      </div>
                      <div className="h-3 w-full rounded-full border border-[#1C2533] bg-[#F4F1EA] overflow-hidden">
                        <div
                          className="h-full bg-[#EDBD62]"
                          style={{ width: "42%" }}
                        />
                      </div>
                    </div>

                    {/* Item 2 */}
                    <div>
                      <div className="flex justify-between text-xs font-bold text-[#1C2533] mb-1">
                        <span>AI & Software Fellowship (Bootcamp)</span>
                        <span className="font-black">76 Siswa (28%)</span>
                      </div>
                      <div className="h-3 w-full rounded-full border border-[#1C2533] bg-[#F4F1EA] overflow-hidden">
                        <div
                          className="h-full bg-[#BCD5C6]"
                          style={{ width: "28%" }}
                        />
                      </div>
                    </div>

                    {/* Item 3 */}
                    <div>
                      <div className="flex justify-between text-xs font-bold text-[#1C2533] mb-1">
                        <span>Renewable Energy Grant (Riset)</span>
                        <span className="font-black">28 Siswa (18%)</span>
                      </div>
                      <div className="h-3 w-full rounded-full border border-[#1C2533] bg-[#F4F1EA] overflow-hidden">
                        <div
                          className="h-full bg-[#CFE4F3]"
                          style={{ width: "18%" }}
                        />
                      </div>
                    </div>

                    {/* Item 4 */}
                    <div>
                      <div className="flex justify-between text-xs font-bold text-[#1C2533] mb-1">
                        <span>Mentorship & Peer Tutoring</span>
                        <span className="font-black">60 Siswa (12%)</span>
                      </div>
                      <div className="h-3 w-full rounded-full border border-[#1C2533] bg-[#F4F1EA] overflow-hidden">
                        <div
                          className="h-full bg-[#CFB4E4]"
                          style={{ width: "12%" }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Summary Footer */}
                  <div className="mt-6 pt-4 border-t border-[#1C2533]/10 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <span className="font-bold text-[#1C2533]/70">
                      Kapasitas Kursus Terpakai:{" "}
                      <b className="text-[#1C2533]">424 / 520 Kursi (81%)</b>
                    </span>
                    <button
                      onClick={() => setActiveTab("events")}
                      className="font-black text-[#1C2533] underline hover:text-[#4C84AB]"
                    >
                      Kelola Kuota &rarr;
                    </button>
                  </div>
                </div>

                {/* Upcoming Event Deadlines (5 cols) */}
                <div className="rounded-xl border-2 border-[#1C2533] bg-[#FFF9EF] p-6 shadow-[4px_4px_0px_#1C2533] lg:col-span-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between border-b-2 border-[#1C2533]/10 pb-4">
                      <h2 className="text-base font-black uppercase tracking-tight text-[#1C2533]">
                        Batas Deadline Terdekat
                      </h2>
                      <span className="text-[10px] font-black uppercase text-[#E16E68]">
                        Prioritas
                      </span>
                    </div>

                    <div className="mt-4 space-y-3">
                      {events.slice(0, 3).map((ev) => (
                        <div
                          key={ev.id}
                          className="rounded-lg border border-[#1C2533] bg-[#F4F1EA] p-3 text-xs"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-black text-[#1C2533] truncate max-w-[200px]">
                              {ev.name}
                            </span>
                            <span className="rounded bg-[#1C2533] px-1.5 py-0.5 text-[9px] font-bold text-[#FFF9EF]">
                              {ev.category}
                            </span>
                          </div>
                          <div className="mt-2 flex items-center justify-between text-[11px] text-[#1C2533]/70">
                            <span>Deadline: {ev.deadline}</span>
                            <span className="font-bold text-[#597865]">
                              {ev.registeredCount} / {ev.quota} terdaftar
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveTab("events")}
                    className="mt-4 w-full rounded-lg border-2 border-[#1C2533] bg-[#BCD5C6] py-2 text-center text-xs font-black uppercase text-[#1C2533] hover:bg-[#a9cabb] transition-all"
                  >
                    Buka Semua Jadwal Event
                  </button>
                </div>
              </div>

              {/* Bottom Section: Recent Submissions Waiting Review */}
              <div className="rounded-xl border-2 border-[#1C2533] bg-[#FFF9EF] p-6 shadow-[4px_4px_0px_#1C2533]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b-2 border-[#1C2533]/10 pb-4">
                  <div>
                    <h2 className="text-base font-black uppercase tracking-tight text-[#1C2533]">
                      Pendaftaran Terbaru Membutuhkan Review
                    </h2>
                    <p className="text-xs text-[#1C2533]/60">
                      Segera verifikasi kelengkapan berkas calon peserta
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setRegStatusFilter("Menunggu Review");
                      setActiveTab("registrations");
                    }}
                    className="text-xs font-black uppercase underline hover:text-[#4C84AB]"
                  >
                    Lihat Semua ({pendingRegistrations})
                  </button>
                </div>

                <div className="mt-4 overflow-x-auto">
                  <table className="w-full text-left text-xs text-[#1C2533]">
                    <thead>
                      <tr className="border-b-2 border-[#1C2533] bg-[#F4F1EA] text-[10px] font-black uppercase tracking-wider text-[#1C2533]/70">
                        <th className="py-2.5 px-3">Nama & Asal Sekolah</th>
                        <th className="py-2.5 px-3">Event yang Dituju</th>
                        <th className="py-2.5 px-3">Tanggal Pengajuan</th>
                        <th className="py-2.5 px-3">Status</th>
                        <th className="py-2.5 px-3 text-right">Aksi Cepat</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1C2533]/10">
                      {registrations.slice(0, 5).map((reg) => (
                        <tr key={reg.id} className="hover:bg-[#F4F1EA]/60">
                          <td className="py-3 px-3">
                            <span className="font-black block text-sm">
                              {reg.studentName}
                            </span>
                            <span className="text-[11px] text-[#1C2533]/60 block">
                              {reg.school} &bull; {reg.grade}
                            </span>
                          </td>
                          <td className="py-3 px-3 font-semibold max-w-[200px] truncate">
                            {reg.eventName}
                          </td>
                          <td className="py-3 px-3 text-[#1C2533]/70">
                            {reg.submissionDate}
                          </td>
                          <td className="py-3 px-3">
                            <span
                              className={`rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase ${
                                reg.status === "Disetujui"
                                  ? "bg-[#BCD5C6] text-[#1C2533]"
                                  : reg.status === "Menunggu Review"
                                  ? "bg-[#EDBD62] text-[#1C2533]"
                                  : "bg-[#E16E68] text-[#FFF9EF]"
                              }`}
                            >
                              {reg.status}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => {
                                  setSelectedReg(reg);
                                  setRegDetailModalOpen(true);
                                }}
                                className="rounded border border-[#1C2533] bg-[#FFF9EF] p-1.5 hover:bg-[#EDBD62]"
                                title="Lihat Berkas & Detail"
                              >
                                <Eye className="h-3.5 w-3.5" />
                              </button>
                              {reg.status === "Menunggu Review" && (
                                <>
                                  <button
                                    onClick={() =>
                                      handleApproveRegistration(reg.id)
                                    }
                                    className="rounded border border-[#1C2533] bg-[#BCD5C6] p-1.5 text-[#1C2533] hover:opacity-80"
                                    title="Setujui"
                                  >
                                    <Check className="h-3.5 w-3.5 stroke-[3]" />
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleRejectRegistration(reg.id)
                                    }
                                    className="rounded border border-[#1C2533] bg-[#E16E68] p-1.5 text-[#FFF9EF] hover:opacity-80"
                                    title="Tolak"
                                  >
                                    <X className="h-3.5 w-3.5 stroke-[3]" />
                                  </button>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 2: EVENTS & COMPETITIONS MANAGEMENT */}
          {/* ========================================================= */}
          {activeTab === "events" && (
            <div className="space-y-6">
              {/* Header Filter & Search Toolbar */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-xl border-2 border-[#1C2533] bg-[#FFF9EF] p-4 shadow-[4px_4px_0px_#1C2533]">
                <div className="flex flex-1 flex-wrap items-center gap-3">
                  {/* Search Input */}
                  <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#1C2533]/40" />
                    <input
                      type="text"
                      placeholder="Cari event, penyelenggara, lokasi..."
                      value={eventSearch}
                      onChange={(e) => setEventSearch(e.target.value)}
                      className="w-full rounded-lg border border-[#1C2533] bg-[#F4F1EA] py-2 pl-9 pr-3 text-xs font-semibold text-[#1C2533] placeholder-[#1C2533]/40 focus:outline-none"
                    />
                  </div>

                  {/* Category Filter */}
                  <div className="flex items-center gap-1.5 text-xs font-bold">
                    <Filter className="h-3.5 w-3.5 text-[#1C2533]/60" />
                    <select
                      value={eventCategoryFilter}
                      onChange={(e) => setEventCategoryFilter(e.target.value)}
                      className="rounded-lg border border-[#1C2533] bg-[#F4F1EA] px-3 py-2 text-xs font-bold text-[#1C2533] focus:outline-none"
                    >
                      <option value="Semua">Semua Kategori</option>
                      <option value="Kompetisi">Kompetisi</option>
                      <option value="Bootcamp">Bootcamp</option>
                      <option value="Grant & Riset">Grant & Riset</option>
                      <option value="Workshop">Workshop</option>
                      <option value="Mentorship">Mentorship</option>
                    </select>
                  </div>

                  {/* Status Filter */}
                  <select
                    value={eventStatusFilter}
                    onChange={(e) => setEventStatusFilter(e.target.value)}
                    className="rounded-lg border border-[#1C2533] bg-[#F4F1EA] px-3 py-2 text-xs font-bold text-[#1C2533] focus:outline-none"
                  >
                    <option value="Semua">Semua Status</option>
                    <option value="Dibuka">Dibuka</option>
                    <option value="Segera Dibuka">Segera Dibuka</option>
                    <option value="Ditutup">Ditutup</option>
                  </select>
                </div>

                {/* Create Event Button */}
                <button
                  onClick={handleOpenCreateEvent}
                  className="flex items-center justify-center gap-2 rounded-lg border-2 border-[#1C2533] bg-[#EDBD62] px-4 py-2 text-xs font-black uppercase text-[#1C2533] shadow-[2px_2px_0px_#1C2533] hover:translate-y-0.5 transition-all"
                >
                  <Plus className="h-4 w-4 stroke-[3]" />
                  <span>Tambah Event Baru</span>
                </button>
              </div>

              {/* Event Cards Grid */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredEvents.map((ev) => (
                  <div
                    key={ev.id}
                    className="flex flex-col justify-between rounded-xl border-2 border-[#1C2533] bg-[#FFF9EF] shadow-[4px_4px_0px_#1C2533] overflow-hidden transition-all"
                  >
                    {/* Event Image & Badges */}
                    <div className="relative h-44 w-full bg-[#1C2533]">
                      <Image
                        src={ev.image || "/visuals/stem-circuit.jpg"}
                        alt={ev.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1C2533] via-transparent to-transparent opacity-80" />

                      <div className="absolute top-3 left-3 flex gap-2">
                        <span className="rounded bg-[#1C2533] px-2.5 py-1 text-[9px] font-black uppercase text-[#FFF9EF] border border-[#FFF9EF]/20">
                          {ev.category}
                        </span>
                        <span
                          className={`rounded px-2.5 py-1 text-[9px] font-black uppercase border border-[#1C2533] ${
                            ev.status === "Dibuka"
                              ? "bg-[#BCD5C6] text-[#1C2533]"
                              : ev.status === "Segera Dibuka"
                              ? "bg-[#EDBD62] text-[#1C2533]"
                              : "bg-[#E16E68] text-[#FFF9EF]"
                          }`}
                        >
                          {ev.status}
                        </span>
                      </div>

                      <div className="absolute bottom-2.5 left-3 right-3 text-white">
                        <span className="text-[10px] font-bold text-[#BCD5C6] uppercase">
                          {ev.organizer}
                        </span>
                        <h3 className="text-sm font-black text-[#FFF9EF] leading-snug line-clamp-2">
                          {ev.name}
                        </h3>
                      </div>
                    </div>

                    {/* Event Metadata */}
                    <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                      <p className="text-xs text-[#1C2533]/80 line-clamp-2">
                        {ev.description}
                      </p>

                      <div className="space-y-1.5 text-[11px] text-[#1C2533]/70 border-t border-[#1C2533]/10 pt-3">
                        <div className="flex justify-between">
                          <span>Waktu:</span>
                          <span className="font-bold text-[#1C2533]">
                            {ev.date}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Deadline:</span>
                          <span className="font-bold text-[#E16E68]">
                            {ev.deadline}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Lokasi:</span>
                          <span className="font-bold text-[#1C2533]">
                            {ev.location}
                          </span>
                        </div>
                      </div>

                      {/* Quota Progress Bar */}
                      <div className="pt-1">
                        <div className="flex justify-between text-[11px] font-bold mb-1">
                          <span>Pendaftar Terisi</span>
                          <span>
                            {ev.registeredCount} / {ev.quota} (
                            {Math.round((ev.registeredCount / ev.quota) * 100)}%)
                          </span>
                        </div>
                        <div className="h-2 w-full rounded-full border border-[#1C2533] bg-[#F4F1EA] overflow-hidden">
                          <div
                            className={`h-full ${
                              ev.registeredCount >= ev.quota
                                ? "bg-[#E16E68]"
                                : "bg-[#EDBD62]"
                            }`}
                            style={{
                              width: `${Math.min(
                                100,
                                (ev.registeredCount / ev.quota) * 100
                              )}%`,
                            }}
                          />
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2 pt-2 border-t border-[#1C2533]/10">
                        <button
                          onClick={() => {
                            setRegEventFilter(ev.id);
                            setActiveTab("registrations");
                          }}
                          className="flex-1 rounded border border-[#1C2533] bg-[#BCD5C6]/50 py-1.5 text-center text-xs font-black uppercase text-[#1C2533] hover:bg-[#BCD5C6]"
                        >
                          Pendaftar ({ev.registeredCount})
                        </button>
                        <button
                          onClick={() => handleOpenEditEvent(ev)}
                          className="rounded border border-[#1C2533] bg-[#F4F1EA] p-1.5 hover:bg-[#EDBD62]"
                          title="Edit Event"
                        >
                          <Edit3 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteEvent(ev.id, ev.name)}
                          className="rounded border border-[#1C2533] bg-[#F4F1EA] p-1.5 hover:bg-[#E16E68] hover:text-[#FFF9EF]"
                          title="Hapus Event"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredEvents.length === 0 && (
                <div className="rounded-xl border-2 border-[#1C2533] bg-[#FFF9EF] p-12 text-center">
                  <Calendar className="mx-auto h-12 w-12 text-[#1C2533]/30" />
                  <h3 className="mt-3 text-base font-black text-[#1C2533] uppercase">
                    Tidak ada event yang cocok
                  </h3>
                  <p className="text-xs text-[#1C2533]/60 mt-1">
                    Coba sesuaikan kata kunci pencarian atau filter kategori.
                  </p>
                  {(eventSearch || eventCategoryFilter !== "Semua" || eventStatusFilter !== "Semua") && (
                    <button
                      onClick={() => {
                        setEventSearch("");
                        setEventCategoryFilter("Semua");
                        setEventStatusFilter("Semua");
                      }}
                      className="mt-4 rounded-lg border-2 border-[#1C2533] bg-[#EDBD62] px-4 py-2 text-xs font-black uppercase text-[#1C2533] shadow-[2px_2px_0px_#1C2533] hover:translate-y-0.5 transition-all"
                    >
                      Reset Filter Pencarian
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 3: REGISTRATIONS & VERIFICATION */}
          {/* ========================================================= */}
          {activeTab === "registrations" && (
            <div className="space-y-6">
              {/* Filter Toolbar */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 rounded-xl border-2 border-[#1C2533] bg-[#FFF9EF] p-4 shadow-[4px_4px_0px_#1C2533]">
                <div className="flex flex-1 flex-wrap items-center gap-3">
                  {/* Search Bar */}
                  <div className="relative flex-1 min-w-[220px]">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#1C2533]/40" />
                    <input
                      type="text"
                      placeholder="Cari nama, email, sekolah, ID registrasi..."
                      value={regSearch}
                      onChange={(e) => setRegSearch(e.target.value)}
                      className="w-full rounded-lg border border-[#1C2533] bg-[#F4F1EA] py-2 pl-9 pr-3 text-xs font-semibold text-[#1C2533] placeholder-[#1C2533]/40 focus:outline-none"
                    />
                  </div>

                  {/* Filter by Event */}
                  <select
                    value={regEventFilter}
                    onChange={(e) => setRegEventFilter(e.target.value)}
                    className="rounded-lg border border-[#1C2533] bg-[#F4F1EA] px-3 py-2 text-xs font-bold text-[#1C2533] focus:outline-none max-w-[200px] truncate"
                  >
                    <option value="Semua">Semua Event</option>
                    {events.map((ev) => (
                      <option key={ev.id} value={ev.id}>
                        {ev.name}
                      </option>
                    ))}
                  </select>

                  {/* Filter by Verification Status */}
                  <select
                    value={regStatusFilter}
                    onChange={(e) => setRegStatusFilter(e.target.value)}
                    className="rounded-lg border border-[#1C2533] bg-[#F4F1EA] px-3 py-2 text-xs font-bold text-[#1C2533] focus:outline-none"
                  >
                    <option value="Semua">Semua Status</option>
                    <option value="Menunggu Review">Menunggu Review</option>
                    <option value="Disetujui">Disetujui</option>
                    <option value="Ditolak">Ditolak</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#1C2533]/70">
                    Menampilkan: <b>{filteredRegistrations.length}</b> data
                  </span>
                  <button
                    onClick={handleExportCSV}
                    className="flex items-center gap-1.5 rounded-lg border-2 border-[#1C2533] bg-[#BCD5C6] px-3 py-1.5 text-xs font-black uppercase text-[#1C2533] shadow-[2px_2px_0px_#1C2533] hover:translate-y-0.5 transition-all"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Download CSV</span>
                  </button>
                </div>
              </div>

              {/* Registrations Table */}
              <div className="rounded-xl border-2 border-[#1C2533] bg-[#FFF9EF] shadow-[4px_4px_0px_#1C2533] overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-[#1C2533]">
                    <thead>
                      <tr className="border-b-2 border-[#1C2533] bg-[#1C2533] text-[10px] font-black uppercase tracking-wider text-[#FFF9EF]">
                        <th className="py-3 px-3.5">ID & Siswa</th>
                        <th className="py-3 px-3.5">Asal Sekolah</th>
                        <th className="py-3 px-3.5">Event Pilihan</th>
                        <th className="py-3 px-3.5">Tanggal Submit</th>
                        <th className="py-3 px-3.5">Peminatan STEM</th>
                        <th className="py-3 px-3.5">Status</th>
                        <th className="py-3 px-3.5 text-right">Aksi Verifikasi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1C2533]/15">
                      {filteredRegistrations.map((reg) => (
                        <tr
                          key={reg.id}
                          className="hover:bg-[#F4F1EA] transition-colors"
                        >
                          <td className="py-3 px-3.5">
                            <span className="font-mono text-[10px] text-[#597865] block font-bold">
                              {reg.id}
                            </span>
                            <span className="font-black text-sm block">
                              {reg.studentName}
                            </span>
                            <span className="text-[11px] text-[#1C2533]/60 block">
                              {reg.email}
                            </span>
                          </td>
                          <td className="py-3 px-3.5">
                            <span className="font-bold block">{reg.school}</span>
                            <span className="text-[11px] text-[#1C2533]/70">
                              {reg.grade}
                            </span>
                          </td>
                          <td className="py-3 px-3.5 font-semibold max-w-[200px]">
                            <span className="line-clamp-2">{reg.eventName}</span>
                          </td>
                          <td className="py-3 px-3.5 text-[#1C2533]/70">
                            {reg.submissionDate}
                          </td>
                          <td className="py-3 px-3.5">
                            <div className="flex flex-wrap gap-1 max-w-[160px]">
                              {reg.interests.map((it, idx) => (
                                <span
                                  key={idx}
                                  className="rounded bg-[#F4F1EA] border border-[#1C2533]/20 px-1.5 py-0.5 text-[9px] font-bold"
                                >
                                  {it}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="py-3 px-3.5">
                            <span
                              className={`rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase border border-[#1C2533] ${
                                reg.status === "Disetujui"
                                  ? "bg-[#BCD5C6] text-[#1C2533]"
                                  : reg.status === "Menunggu Review"
                                  ? "bg-[#EDBD62] text-[#1C2533]"
                                  : "bg-[#E16E68] text-[#FFF9EF]"
                              }`}
                            >
                              {reg.status}
                            </span>
                          </td>
                          <td className="py-3 px-3.5 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => {
                                  setSelectedReg(reg);
                                  setRegDetailModalOpen(true);
                                }}
                                className="flex items-center gap-1 rounded border border-[#1C2533] bg-[#FFF9EF] px-2 py-1 text-[11px] font-black hover:bg-[#EDBD62]"
                              >
                                <Eye className="h-3.5 w-3.5" />
                                <span>Detail</span>
                              </button>
                              {reg.status !== "Disetujui" && (
                                <button
                                  onClick={() =>
                                    handleApproveRegistration(reg.id)
                                  }
                                  className="rounded border border-[#1C2533] bg-[#BCD5C6] p-1 text-[#1C2533] hover:opacity-80"
                                  title="Setujui"
                                >
                                  <Check className="h-3.5 w-3.5 stroke-[3]" />
                                </button>
                              )}
                              {reg.status !== "Ditolak" && (
                                <button
                                  onClick={() =>
                                    handleRejectRegistration(reg.id)
                                  }
                                  className="rounded border border-[#1C2533] bg-[#E16E68] p-1 text-[#FFF9EF] hover:opacity-80"
                                  title="Tolak"
                                >
                                  <X className="h-3.5 w-3.5 stroke-[3]" />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {filteredRegistrations.length === 0 && (
                  <div className="p-10 text-center text-xs">
                    <UserCheck className="mx-auto h-10 w-10 text-[#1C2533]/30 mb-2" />
                    <p className="font-bold text-[#1C2533] text-sm">
                      Tidak ditemukan data pendaftar yang sesuai filter
                    </p>
                    <p className="text-[#1C2533]/60 text-xs mt-1">
                      Coba ganti kata kunci atau pilih &quot;Semua Status&quot;.
                    </p>
                    {(regSearch || regEventFilter !== "Semua" || regStatusFilter !== "Semua") && (
                      <button
                        onClick={() => {
                          setRegSearch("");
                          setRegEventFilter("Semua");
                          setRegStatusFilter("Semua");
                        }}
                        className="mt-4 rounded-lg border-2 border-[#1C2533] bg-[#EDBD62] px-4 py-2 text-xs font-black uppercase text-[#1C2533] shadow-[2px_2px_0px_#1C2533] hover:translate-y-0.5 transition-all"
                      >
                        Reset Filter
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 4: STUDENTS DIRECTORY */}
          {/* ========================================================= */}
          {activeTab === "students" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border-2 border-[#1C2533] bg-[#FFF9EF] p-4 shadow-[4px_4px_0px_#1C2533]">
                <div>
                  <h2 className="text-base font-black uppercase tracking-tight text-[#1C2533]">
                    Direktori Komunitas Siswa YIS
                  </h2>
                  <p className="text-xs text-[#1C2533]/60">
                    Data pelajar STEM yang aktif mengikuti program, kelas, dan event
                  </p>
                </div>
                <div className="text-xs font-bold bg-[#BCD5C6] px-3 py-1.5 rounded-lg border border-[#1C2533]">
                  Total Anggota: <b>{totalStudentCount.toLocaleString()} Siswa</b>
                </div>
              </div>

              {/* Students Search Toolbar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border-2 border-[#1C2533] bg-[#FFF9EF] p-4 shadow-[4px_4px_0px_#1C2533]">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#1C2533]/40" />
                  <input
                    type="text"
                    placeholder="Cari nama siswa, email, atau sekolah..."
                    value={studentSearch}
                    onChange={(e) => setStudentSearch(e.target.value)}
                    className="w-full rounded-lg border border-[#1C2533] bg-[#F4F1EA] py-2 pl-9 pr-3 text-xs font-semibold text-[#1C2533] placeholder-[#1C2533]/40 focus:outline-none"
                  />
                </div>
                <select
                  value={studentInterestFilter}
                  onChange={(e) => setStudentInterestFilter(e.target.value)}
                  className="rounded-lg border border-[#1C2533] bg-[#F4F1EA] px-3 py-2 text-xs font-bold text-[#1C2533] focus:outline-none"
                >
                  <option value="Semua">Semua Minat STEM</option>
                  <option value="Robotics & IoT">Robotics &amp; IoT</option>
                  <option value="Artificial Intelligence">Artificial Intelligence</option>
                  <option value="Renewable Energy">Renewable Energy</option>
                  <option value="Biotechnology">Biotechnology</option>
                  <option value="Astrophysics">Astrophysics</option>
                  <option value="Applied Mathematics">Applied Mathematics</option>
                  <option value="UI / UX Design">UI / UX Design</option>
                </select>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredStudents.map((st) => (
                  <div
                    key={st.id}
                    className="rounded-xl border-2 border-[#1C2533] bg-[#FFF9EF] p-5 shadow-[4px_4px_0px_#1C2533] flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#1C2533] bg-[#EDBD62] font-black text-sm text-[#1C2533]">
                            {st.name.charAt(0)}
                          </div>
                          <div>
                            <h3 className="font-black text-sm text-[#1C2533]">
                              {st.name}
                            </h3>
                            <span className="text-[11px] text-[#1C2533]/60">
                              {st.email}
                            </span>
                          </div>
                        </div>
                        <span className="rounded bg-[#BCD5C6] px-2 py-0.5 text-[9px] font-black uppercase text-[#1C2533]">
                          {st.status}
                        </span>
                      </div>

                      <div className="mt-4 space-y-2 text-xs border-t border-[#1C2533]/10 pt-3">
                        <div className="flex justify-between">
                          <span className="text-[#1C2533]/60">Sekolah:</span>
                          <span className="font-bold">{st.school}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#1C2533]/60">Tingkat:</span>
                          <span className="font-bold">{st.grade}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#1C2533]/60">Event Diikuti:</span>
                          <span className="font-bold text-[#597865]">
                            {st.eventsJoined} Program
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#1C2533]/60">Bergabung:</span>
                          <span className="font-bold">{st.joinDate}</span>
                        </div>
                      </div>

                      <div className="mt-3">
                        <span className="block text-[10px] font-bold text-[#1C2533]/60 uppercase mb-1">
                          Minat Utama:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {st.interests.map((it, idx) => (
                            <span
                              key={idx}
                              className="rounded bg-[#F4F1EA] border border-[#1C2533]/20 px-2 py-0.5 text-[10px] font-bold text-[#1C2533]"
                            >
                              {it}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredStudents.length === 0 && (
                <div className="rounded-xl border-2 border-[#1C2533] bg-[#FFF9EF] p-12 text-center">
                  <GraduationCap className="mx-auto h-12 w-12 text-[#1C2533]/30" />
                  <h3 className="mt-3 text-base font-black text-[#1C2533] uppercase">
                    Tidak ada siswa ditemukan
                  </h3>
                  <p className="text-xs text-[#1C2533]/60 mt-1">
                    Coba sesuaikan kata kunci pencarian atau filter peminatan.
                  </p>
                  {(studentSearch || studentInterestFilter !== "Semua") && (
                    <button
                      onClick={() => {
                        setStudentSearch("");
                        setStudentInterestFilter("Semua");
                      }}
                      className="mt-4 rounded-lg border-2 border-[#1C2533] bg-[#EDBD62] px-4 py-2 text-xs font-black uppercase text-[#1C2533] shadow-[2px_2px_0px_#1C2533] hover:translate-y-0.5 transition-all"
                    >
                      Reset Filter
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 5: CAMPUS PARTNERS */}
          {/* ========================================================= */}
          {activeTab === "partners" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border-2 border-[#1C2533] bg-[#FFF9EF] p-4 shadow-[4px_4px_0px_#1C2533]">
                <div>
                  <h2 className="text-base font-black uppercase tracking-tight text-[#1C2533]">
                    Mitra Perguruan Tinggi & Lembaga Sains
                  </h2>
                  <p className="text-xs text-[#1C2533]/60">
                    Kolaborasi resmi kurikulum, workshop, beasiswa, dan dewan juri
                  </p>
                </div>
                <button
                  onClick={() => setPartnerModalOpen(true)}
                  className="flex items-center gap-1.5 rounded-lg border-2 border-[#1C2533] bg-[#EDBD62] px-3.5 py-1.5 text-xs font-black uppercase text-[#1C2533] shadow-[2px_2px_0px_#1C2533] hover:translate-y-0.5 transition-all"
                >
                  <Plus className="h-4 w-4 stroke-[3]" />
                  <span>Tambah Mitra Baru</span>
                </button>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                {partners.map((ptr) => (
                  <div
                    key={ptr.id}
                    className="rounded-xl border-2 border-[#1C2533] bg-[#FFF9EF] p-5 shadow-[4px_4px_0px_#1C2533] flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <div
                          className="flex h-12 w-12 items-center justify-center rounded-lg border-2 border-[#1C2533] font-black text-sm"
                          style={{ backgroundColor: ptr.logoColor }}
                        >
                          {ptr.code}
                        </div>
                        <span className="rounded bg-[#BCD5C6] px-2 py-0.5 text-[9px] font-black uppercase text-[#1C2533] border border-[#1C2533]">
                          MoU {ptr.mouStatus}
                        </span>
                      </div>

                      <h3 className="mt-3 text-sm font-black text-[#1C2533]">
                        {ptr.name}
                      </h3>

                      <div className="mt-3 space-y-1.5 text-xs text-[#1C2533]/80 border-t border-[#1C2533]/10 pt-3">
                        <div className="flex justify-between">
                          <span className="text-[#1C2533]/60">Program Aktif:</span>
                          <span className="font-bold text-[#597865]">
                            {ptr.programsCount} Event Kolaborasi
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#1C2533]/60">PIC Kontak:</span>
                          <span className="font-semibold">{ptr.contactPerson}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#1C2533]/60">Email:</span>
                          <span className="font-mono text-[11px] truncate max-w-[150px]">
                            {ptr.email}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() =>
                        showToast(`Menghubungkan ke kontak ${ptr.name}`)
                      }
                      className="mt-4 w-full rounded border border-[#1C2533] bg-[#F4F1EA] py-1.5 text-center text-xs font-black uppercase hover:bg-[#BCD5C6] transition-colors"
                    >
                      Kirim Pesan Resmi
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* TAB 6: ACTIVITY AUDIT LOGS */}
          {/* ========================================================= */}
          {activeTab === "settings" && (
            <div className="space-y-6">
              {/* Activity Audit Logs */}
              <div className="rounded-xl border-2 border-[#1C2533] bg-[#FFF9EF] p-6 shadow-[4px_4px_0px_#1C2533]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-[#1C2533]/10 pb-4">
                  <div>
                    <h2 className="text-base font-black uppercase tracking-tight text-[#1C2533]">
                      Log Aktivitas Administrator
                    </h2>
                    <p className="text-xs text-[#1C2533]/60">
                      Riwayat aksi persetujuan, penolakan, dan perubahan event
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {(["semua", "success", "warning", "info"] as const).map((type) => (
                      <button
                        key={type}
                        onClick={() => setLogFilter(type)}
                        className={`rounded px-2.5 py-1 text-[10px] font-black uppercase transition-all border border-[#1C2533] ${
                          logFilter === type
                            ? "bg-[#1C2533] text-[#FFF9EF]"
                            : "bg-[#F4F1EA] text-[#1C2533] hover:bg-[#EDBD62]"
                        }`}
                      >
                        {type === "semua" ? "Semua" : type === "success" ? "Sukses" : type === "warning" ? "Peringatan" : "Info"}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-4 space-y-2.5">
                  {filteredLogs.map((log) => (
                    <div
                      key={log.id}
                      className="flex items-center justify-between rounded-lg border border-[#1C2533] bg-[#F4F1EA] p-3 text-xs"
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`h-2.5 w-2.5 rounded-full ${
                            log.type === "success"
                              ? "bg-[#597865]"
                              : log.type === "warning"
                              ? "bg-[#E16E68]"
                              : "bg-[#4C84AB]"
                          }`}
                        />
                        <span className="font-bold text-[#1C2533]">
                          {log.action}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-[11px] text-[#1C2533]/60">
                        <span>Oleh: {log.user}</span>
                        <span>&bull;</span>
                        <span>{log.timestamp}</span>
                      </div>
                    </div>
                  ))}
                  {filteredLogs.length === 0 && (
                    <div className="p-8 text-center text-xs text-[#1C2533]/60">
                      Tidak ada log aktivitas dalam kategori ini.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ========================================================= */}
      {/* MODAL: ADD / EDIT EVENT */}
      {/* ========================================================= */}
      {eventModalOpen && (
        <div
          onClick={() => setEventModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#1C2533]/60 p-4 backdrop-blur-xs"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-xl border-2 border-[#1C2533] bg-[#FFF9EF] p-6 shadow-[6px_6px_0px_#1C2533]"
          >
            <div className="flex items-center justify-between border-b-2 border-[#1C2533]/10 pb-3">
              <h3 className="text-base font-black uppercase text-[#1C2533]">
                {editingEvent ? "Edit Data Event" : "Terbitkan Event Baru"}
              </h3>
              <button
                onClick={() => setEventModalOpen(false)}
                className="rounded p-1 hover:bg-[#1C2533]/10"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEvent} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="block font-black text-[#1C2533] mb-1 uppercase">
                  Nama Event / Kompetisi *
                </label>
                <input
                  type="text"
                  required
                  value={eventForm.name}
                  onChange={(e) =>
                    setEventForm({ ...eventForm, name: e.target.value })
                  }
                  placeholder="Contoh: National STEM Circuit & Robotics 2026"
                  className="w-full rounded border-2 border-[#1C2533] bg-[#F4F1EA] p-2.5 font-bold focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="block font-black text-[#1C2533] mb-1 uppercase">
                    Kategori Program *
                  </label>
                  <select
                    value={eventForm.category}
                    onChange={(e) =>
                      setEventForm({
                        ...eventForm,
                        category: e.target.value as EventCategory,
                      })
                    }
                    className="w-full rounded border-2 border-[#1C2533] bg-[#F4F1EA] p-2.5 font-bold focus:outline-none"
                  >
                    <option value="Kompetisi">Kompetisi</option>
                    <option value="Bootcamp">Bootcamp</option>
                    <option value="Grant & Riset">Grant & Riset</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Mentorship">Mentorship</option>
                  </select>
                </div>

                <div>
                  <label className="block font-black text-[#1C2533] mb-1 uppercase">
                    Penyelenggara / Mitra
                  </label>
                  <input
                    type="text"
                    value={eventForm.organizer}
                    onChange={(e) =>
                      setEventForm({ ...eventForm, organizer: e.target.value })
                    }
                    placeholder="Contoh: YIS x ITB"
                    className="w-full rounded border-2 border-[#1C2533] bg-[#F4F1EA] p-2.5 font-bold focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="block font-black text-[#1C2533] mb-1 uppercase">
                    Tanggal Pelaksanaan
                  </label>
                  <input
                    type="text"
                    value={eventForm.date}
                    onChange={(e) =>
                      setEventForm({ ...eventForm, date: e.target.value })
                    }
                    placeholder="Contoh: 28 - 30 Nov 2026"
                    className="w-full rounded border-2 border-[#1C2533] bg-[#F4F1EA] p-2.5 font-bold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-black text-[#1C2533] mb-1 uppercase">
                    Batas Pendaftaran (Deadline)
                  </label>
                  <input
                    type="text"
                    value={eventForm.deadline}
                    onChange={(e) =>
                      setEventForm({ ...eventForm, deadline: e.target.value })
                    }
                    placeholder="Contoh: 20 Nov 2026"
                    className="w-full rounded border-2 border-[#1C2533] bg-[#F4F1EA] p-2.5 font-bold focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="block font-black text-[#1C2533] mb-1 uppercase">
                    Lokasi Acara
                  </label>
                  <input
                    type="text"
                    value={eventForm.location}
                    onChange={(e) =>
                      setEventForm({ ...eventForm, location: e.target.value })
                    }
                    placeholder="Bandung & Hybrid / Daring"
                    className="w-full rounded border-2 border-[#1C2533] bg-[#F4F1EA] p-2.5 font-bold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-black text-[#1C2533] mb-1 uppercase">
                    Kuota Maksimal Peserta
                  </label>
                  <input
                    type="number"
                    value={eventForm.quota}
                    onChange={(e) =>
                      setEventForm({
                        ...eventForm,
                        quota: parseInt(e.target.value) || 0,
                      })
                    }
                    className="w-full rounded border-2 border-[#1C2533] bg-[#F4F1EA] p-2.5 font-bold focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="block font-black text-[#1C2533] mb-1 uppercase">
                    Status Event
                  </label>
                  <select
                    value={eventForm.status}
                    onChange={(e) =>
                      setEventForm({
                        ...eventForm,
                        status: e.target.value as EventStatus,
                      })
                    }
                    className="w-full rounded border-2 border-[#1C2533] bg-[#F4F1EA] p-2.5 font-bold focus:outline-none"
                  >
                    <option value="Dibuka">Dibuka</option>
                    <option value="Segera Dibuka">Segera Dibuka</option>
                    <option value="Ditutup">Ditutup</option>
                  </select>
                </div>

                <div>
                  <label className="block font-black text-[#1C2533] mb-1 uppercase">
                    Preset Gambar Visual
                  </label>
                  <select
                    value={eventForm.image}
                    onChange={(e) =>
                      setEventForm({ ...eventForm, image: e.target.value })
                    }
                    className="w-full rounded border-2 border-[#1C2533] bg-[#F4F1EA] p-2.5 font-bold focus:outline-none"
                  >
                    <option value="/visuals/stem-circuit.jpg">
                      Robotika & Sirkuit
                    </option>
                    <option value="/visuals/coding-class.jpg">
                      Kelas Coding & AI
                    </option>
                    <option value="/visuals/science-lab.jpg">
                      Laboratorium Sains
                    </option>
                    <option value="/visuals/stem-workshop.jpg">
                      Workshop & Pembuat
                    </option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-black text-[#1C2533] mb-1 uppercase">
                  Deskripsi & Penjelasan
                </label>
                <textarea
                  rows={3}
                  value={eventForm.description}
                  onChange={(e) =>
                    setEventForm({ ...eventForm, description: e.target.value })
                  }
                  placeholder="Jelaskan tujuan, syarat, dan benefit program ini..."
                  className="w-full rounded border-2 border-[#1C2533] bg-[#F4F1EA] p-2.5 font-medium focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 border-t-2 border-[#1C2533]/10 pt-4">
                <button
                  type="button"
                  onClick={() => setEventModalOpen(false)}
                  className="rounded border border-[#1C2533] bg-[#FFF9EF] px-4 py-2 font-black uppercase text-[#1C2533] hover:bg-[#F4F1EA]"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="rounded border-2 border-[#1C2533] bg-[#EDBD62] px-5 py-2 font-black uppercase text-[#1C2533] shadow-[2px_2px_0px_#1C2533] hover:translate-y-0.5"
                >
                  {editingEvent ? "Simpan Perubahan" : "Terbitkan Event"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: DETAIL PENDAFTAR & VERIFIKASI */}
      {/* ========================================================= */}
      {regDetailModalOpen && selectedReg && (
        <div
          onClick={() => setRegDetailModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#1C2533]/60 p-4 backdrop-blur-xs"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-xl border-2 border-[#1C2533] bg-[#FFF9EF] p-6 shadow-[6px_6px_0px_#1C2533]"
          >
            <div className="flex items-center justify-between border-b-2 border-[#1C2533]/10 pb-3">
              <div>
                <span className="font-mono text-[10px] font-bold text-[#597865]">
                  {selectedReg.id}
                </span>
                <h3 className="text-base font-black uppercase text-[#1C2533]">
                  Detail Berkas Pendaftar
                </h3>
              </div>
              <button
                onClick={() => setRegDetailModalOpen(false)}
                className="rounded p-1 hover:bg-[#1C2533]/10"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 space-y-4 text-xs">
              {/* Profile Card */}
              <div className="rounded-lg border border-[#1C2533] bg-[#F4F1EA] p-3.5 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-black text-sm text-[#1C2533]">
                      {selectedReg.studentName}
                    </h4>
                    <span className="text-[11px] text-[#1C2533]/60">
                      {selectedReg.email} &bull; {selectedReg.phone}
                    </span>
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[9px] font-black uppercase border border-[#1C2533] ${
                      selectedReg.status === "Disetujui"
                        ? "bg-[#BCD5C6] text-[#1C2533]"
                        : selectedReg.status === "Menunggu Review"
                        ? "bg-[#EDBD62] text-[#1C2533]"
                        : "bg-[#E16E68] text-[#FFF9EF]"
                    }`}
                  >
                    {selectedReg.status}
                  </span>
                </div>
                <div className="text-[11px] text-[#1C2533]/80">
                  <b>{selectedReg.school}</b> &bull; {selectedReg.grade}
                </div>
              </div>

              {/* Event Target */}
              <div>
                <span className="block text-[10px] font-black uppercase text-[#1C2533]/60 mb-0.5">
                  Event yang Didaftar
                </span>
                <div className="font-bold text-[#1C2533] bg-[#BCD5C6]/30 p-2.5 rounded border border-[#1C2533]/30">
                  {selectedReg.eventName}
                </div>
              </div>

              {/* Motivation Essay */}
              <div>
                <span className="block text-[10px] font-black uppercase text-[#1C2533]/60 mb-0.5">
                  Pernyataan Motivasi & Esai Singkat
                </span>
                <p className="rounded border border-[#1C2533]/20 bg-[#F4F1EA] p-3 text-[11px] leading-relaxed text-[#1C2533]">
                  {selectedReg.motivation}
                </p>
              </div>

              {/* Minat STEM */}
              <div>
                <span className="block text-[10px] font-black uppercase text-[#1C2533]/60 mb-1">
                  Peminatan & Keterampilan
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedReg.interests.map((it, idx) => (
                    <span
                      key={idx}
                      className="rounded bg-[#EDBD62]/40 border border-[#1C2533]/30 px-2 py-0.5 text-[10px] font-bold"
                    >
                      {it}
                    </span>
                  ))}
                </div>
              </div>

              {/* CV Attachment if any */}
              {selectedReg.resumeUrl && (
                <div>
                  <span className="block text-[10px] font-black uppercase text-[#1C2533]/60 mb-1">
                    Lampiran Berkas / Portofolio
                  </span>
                  <a
                    href={selectedReg.resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded border border-[#1C2533] bg-[#CFE4F3] px-3 py-1.5 text-xs font-black text-[#1C2533] hover:underline"
                  >
                    <FileText className="h-3.5 w-3.5" />
                    <span>Buka Tautan Portofolio / CV Peserta</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              )}

              {/* Internal Notes */}
              {selectedReg.notes && (
                <div>
                  <span className="block text-[10px] font-black uppercase text-[#1C2533]/60 mb-0.5">
                    Catatan Tim Verifikator
                  </span>
                  <div className="text-[11px] italic text-[#597865] bg-[#BCD5C6]/20 p-2 rounded border border-[#BCD5C6]">
                    &ldquo;{selectedReg.notes}&rdquo;
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-between border-t-2 border-[#1C2533]/10 pt-4">
                <span className="text-[10px] text-[#1C2533]/50">
                  Diajukan: {selectedReg.submissionDate}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleRejectRegistration(selectedReg.id)}
                    className="rounded border-2 border-[#1C2533] bg-[#E16E68] px-3.5 py-1.5 font-black uppercase text-[#FFF9EF] hover:opacity-90"
                  >
                    Tolak Pendaftaran
                  </button>
                  <button
                    onClick={() => handleApproveRegistration(selectedReg.id)}
                    className="rounded border-2 border-[#1C2533] bg-[#BCD5C6] px-4 py-1.5 font-black uppercase text-[#1C2533] shadow-[2px_2px_0px_#1C2533] hover:translate-y-0.5"
                  >
                    Setujui Berkas
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MODAL: ADD NEW PARTNER */}
      {/* ========================================================= */}
      {partnerModalOpen && (
        <div
          onClick={() => setPartnerModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#1C2533]/60 p-4 backdrop-blur-xs"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-xl border-2 border-[#1C2533] bg-[#FFF9EF] p-6 shadow-[6px_6px_0px_#1C2533]"
          >
            <div className="flex items-center justify-between border-b-2 border-[#1C2533]/10 pb-3">
              <h3 className="text-base font-black uppercase text-[#1C2533]">
                Tambah Mitra Perguruan Tinggi
              </h3>
              <button
                onClick={() => setPartnerModalOpen(false)}
                className="rounded p-1 hover:bg-[#1C2533]/10"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const name = (form.elements.namedItem("name") as HTMLInputElement).value;
                const code = (form.elements.namedItem("code") as HTMLInputElement).value;
                const pic = (form.elements.namedItem("pic") as HTMLInputElement).value;
                const email = (form.elements.namedItem("email") as HTMLInputElement).value;

                if (name && code) {
                  const newPtr: Partner = {
                    id: `PTR-${code.toUpperCase()}`,
                    name,
                    code: code.toUpperCase(),
                    logoColor: "#EDBD62",
                    programsCount: 1,
                    contactPerson: pic || "Koordinator Kerjasama",
                    email: email || "kontak@kampus.ac.id",
                    mouStatus: "Aktif",
                  };
                  const updated = [...partners, newPtr];
                  setPartners(updated);
                  if (typeof window !== "undefined") {
                    localStorage.setItem("yis_admin_partners", JSON.stringify(updated));
                  }
                  showToast(`Mitra "${name}" berhasil ditambahkan!`);
                  addLog(`Menambahkan mitra kerjasama baru: ${name}`, "success");
                  setPartnerModalOpen(false);
                }
              }}
              className="mt-4 space-y-3 text-xs"
            >
              <div>
                <label className="block font-black text-[#1C2533] mb-1 uppercase">
                  Nama Institusi / Universitas *
                </label>
                <input
                  name="name"
                  type="text"
                  required
                  placeholder="Contoh: Universitas Airlangga"
                  className="w-full rounded border-2 border-[#1C2533] bg-[#F4F1EA] p-2.5 font-bold focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-black text-[#1C2533] mb-1 uppercase">
                  Singkatan Kode Kampus (2-4 Huruf) *
                </label>
                <input
                  name="code"
                  type="text"
                  required
                  maxLength={5}
                  placeholder="Contoh: UNAIR"
                  className="w-full rounded border-2 border-[#1C2533] bg-[#F4F1EA] p-2.5 font-bold focus:outline-none uppercase"
                />
              </div>

              <div>
                <label className="block font-black text-[#1C2533] mb-1 uppercase">
                  Nama PIC / Narahubung
                </label>
                <input
                  name="pic"
                  type="text"
                  placeholder="Contoh: Dr. Rian Pratama, M.T."
                  className="w-full rounded border-2 border-[#1C2533] bg-[#F4F1EA] p-2.5 font-bold focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-black text-[#1C2533] mb-1 uppercase">
                  Email Kerjasama Resmi
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="kerjasama@unair.ac.id"
                  className="w-full rounded border-2 border-[#1C2533] bg-[#F4F1EA] p-2.5 font-bold focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 border-t-2 border-[#1C2533]/10 pt-4">
                <button
                  type="button"
                  onClick={() => setPartnerModalOpen(false)}
                  className="rounded border border-[#1C2533] bg-[#FFF9EF] px-4 py-2 font-black uppercase text-[#1C2533] hover:bg-[#F4F1EA]"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="rounded border-2 border-[#1C2533] bg-[#EDBD62] px-5 py-2 font-black uppercase text-[#1C2533] shadow-[2px_2px_0px_#1C2533] hover:translate-y-0.5"
                >
                  Simpan Mitra
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
