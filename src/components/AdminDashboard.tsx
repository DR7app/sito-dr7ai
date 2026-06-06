/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Car, Droplet, Users, Megaphone, TrendingUp, CreditCard, Zap, 
  Globe, ShieldCheck, Route, Lock, Bell, Clock, Settings, X, 
  Menu, Plus, Trash2, Edit3, ShieldAlert, CheckCircle2, AlertTriangle, 
  DollarSign, ArrowUpRight, LogOut, Send, Check, RotateCcw, Sparkles,
  Search, ShieldAlert as AlertIcon, Eye, Check as CheckIcon, AlertCircle, FileText,
  Calendar, Moon, Sun, Palette, Download, Sliders, ChevronDown
} from 'lucide-react';
import { LeadRequest } from '../types';
import BrandLogo from './BrandLogo';

interface Vehicle {
  id: string;
  brand: string;
  model: string;
  plate: string;
  status: 'available' | 'rented' | 'maintenance';
  costPerDay: number;
  upcomingDeadline: string;
  deadlineType: 'Assicurazione' | 'Bollo' | 'Revisione' | 'Tagliando';
  fuelLevel: number; // 0-100
  mileage: number; // in km
}

interface RentalBooking {
  id: string;
  vehicleId: string;
  vehicleName: string;
  clientName: string;
  startDate: string;
  endDate: string;
  dailyRate: number;
  totalPaid: number;
  status: 'active' | 'pending_return' | 'completed';
}

interface WashTask {
  id: string;
  vehicleName: string;
  plate: string;
  type: 'Completo' | 'Interno' | 'Esterno' | 'Sanificazione';
  status: 'Attesa' | 'In Corso' | 'Pronto';
  timeRemaining: number; // in minutes
}

interface Quotation {
  id: string;
  vehicleName: string;
  vehicleImage: string;
  plate: string;
  dateCreated: string;
  clientName: string;
  clientPhone: string;
  clientCodeBadge: string;
  startDate: string;
  endDate: string;
  durationDays: number;
  totalWithIva: number;
  status: 'bozza' | 'inviato' | 'accettato' | 'rifiutato' | 'scaduto';
}

interface TrusteraDocument {
  id: string;
  clientName: string;
  documentType: 'Patente' | 'Passaporto' | 'ID Nazionale';
  country: string;
  status: 'pending' | 'approved' | 'rejected';
  imagePlaceholder: string;
}

interface EmtnPass {
  id: string;
  vehicleName: string;
  plate: string;
  destinationCountry: 'Svizzera' | 'Francia' | 'Austria' | 'Monaco';
  approved: boolean;
  validUntil: string;
}

const DEFAULT_VEHICLES: Vehicle[] = [
  { id: 'v1', brand: 'Lamborghini', model: 'Huracán Evo', plate: 'DXB-703', status: 'available', costPerDay: 950, upcomingDeadline: '18 Giu 2026', deadlineType: 'Assicurazione', fuelLevel: 85, mileage: 12400 },
  { id: 'v2', brand: 'Mercedes-AMG', model: 'G63 V8', plate: 'DXB-701', status: 'rented', costPerDay: 800, upcomingDeadline: '12 Giu 2026', deadlineType: 'Bollo', fuelLevel: 98, mileage: 24100 },
  { id: 'v3', brand: 'Tesla', model: 'Model Y Performance', plate: 'DXB-702', status: 'available', costPerDay: 180, upcomingDeadline: '28 Lug 2026', deadlineType: 'Revisione', fuelLevel: 45, mileage: 8700 },
  { id: 'v4', brand: 'Ferrari', model: 'F8 Tributo', plate: 'DXB-704', status: 'maintenance', costPerDay: 1200, upcomingDeadline: 'Oggi', deadlineType: 'Tagliando', fuelLevel: 30, mileage: 4120 },
  { id: 'v5', brand: 'Rolls-Royce', model: 'Ghost Series II', plate: 'DXB-705', status: 'rented', costPerDay: 1500, upcomingDeadline: '22 Giu 2026', deadlineType: 'Assicurazione', fuelLevel: 60, mileage: 16500 },
  { id: 'v6', brand: 'Audi', model: 'RS6 Avant', plate: 'DXB-706', status: 'available', costPerDay: 450, upcomingDeadline: '30 Ago 2026', deadlineType: 'Bollo', fuelLevel: 75, mileage: 19800 },
];

const DEFAULT_BOOKINGS: RentalBooking[] = [
  { id: 'b1', vehicleId: 'v2', vehicleName: 'Mercedes-AMG G63 V8', clientName: 'Emirates Travel (NCC)', startDate: '06 Giu 2026', endDate: '10 Giu 2026', dailyRate: 800, totalPaid: 3200, status: 'active' },
  { id: 'b2', vehicleId: 'v5', vehicleName: 'Rolls-Royce Ghost Series II', clientName: 'VIP Luxury Club', startDate: '04 Giu 2026', endDate: '08 Giu 2026', dailyRate: 1500, totalPaid: 6000, status: 'active' },
  { id: 'b3', vehicleId: 'v1', vehicleName: 'Lamborghini Huracán Evo', clientName: 'Klaus G. (Frankfurt)', startDate: '12 Giu 2026', endDate: '15 Giu 2026', dailyRate: 950, totalPaid: 2850, status: 'pending_return' },
];

const DEFAULT_WASH_TASKS: WashTask[] = [
  { id: 'w1', vehicleName: 'Lamborghini Huracán Evo', plate: 'DXB-703', type: 'Completo', status: 'Attesa', timeRemaining: 45 },
  { id: 'w2', vehicleName: 'Ferrari F8 Tributo', plate: 'DXB-704', type: 'Interno', status: 'In Corso', timeRemaining: 15 },
  { id: 'w3', vehicleName: 'Tesla Model Y Performance', plate: 'DXB-702', type: 'Sanificazione', status: 'Pronto', timeRemaining: 0 },
];

const DEFAULT_TRUSTERA_DOCUMENTS: TrusteraDocument[] = [
  { id: 'd1', clientName: 'John Smithson', documentType: 'Patente', country: 'Regno Unito', status: 'approved', imagePlaceholder: 'PATENTE_UK_APPROVED' },
  { id: 'd2', clientName: 'Mohammed Al-Maktoum', documentType: 'Passaporto', country: 'Emirati Arabi', status: 'approved', imagePlaceholder: 'PASSPORT_UAE_APPROVED' },
  { id: 'd3', clientName: 'Klaus G.', documentType: 'ID Nazionale', country: 'Germania', status: 'pending', imagePlaceholder: 'ID_DE_PENDING' },
];

const DEFAULT_EMTN_PASSES: EmtnPass[] = [
  { id: 'ep1', vehicleName: 'Audi RS6 Avant', plate: 'DXB-706', destinationCountry: 'Svizzera', approved: true, validUntil: '30 Giu 2026' },
  { id: 'ep2', vehicleName: 'Mercedes-AMG G63 V8', plate: 'DXB-701', destinationCountry: 'Francia', approved: false, validUntil: 'Richiesto' },
];

interface AdminDashboardProps {
  onLogout: () => void;
  onBackToLanding: () => void;
}

export default function AdminDashboard({ onLogout, onBackToLanding }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'noleggio' | 'prime-wash' | 'flotta' | 'clienti' | 'marketing' | 'report' | 'amministrazione' | 'centralina-pro' | 'sito' | 'trustera' | 'emtn'>('noleggio');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  
  // Theme and Color states as requested by the user
  const [isDark, setIsDark] = useState<boolean>(() => {
    return localStorage.getItem('dr7_is_dark') === 'true';
  });
  const [colorTheme, setColorTheme] = useState<'ocean' | 'rosso' | 'gold' | 'neon'>(() => {
    return (localStorage.getItem('dr7_color_theme') as any) || 'ocean';
  });

  // Top subtabs representing the CRM screenshots
  const [subTabNoleggio, setSubTabNoleggio] = useState<'preventivi' | 'noleggio' | 'calendario' | 'contratti' | 'danni-penali' | 'multe' | 'cargos'>('preventivi');
  const [subTabWash, setSubTabWash] = useState<'noleggio' | 'lavaggio' | 'clienti' | 'autisti' | 'penali_danni' | 'preventivi_rep' | 'rendimento_sito' | 'rendimento_gmb' | 'operatori' | 'dashboard'>('lavaggio');
  
  // Search and filter states for sub-components
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedQuotationStatus, setSelectedQuotationStatus] = useState<string>('Tutti');

  const [quotations, setQuotations] = useState<Quotation[]>(() => {
    const saved = localStorage.getItem('dr7_quotations');
    if (saved) return JSON.parse(saved);
    return [
      { id: 'q1', vehicleName: 'Ferrari 296 gtb', vehicleImage: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=300&auto=format&fit=crop&q=60', plate: 'GN296TE', dateCreated: '06 Giu 2026', clientName: 'Nessun cliente', clientPhone: '+39 375 654 4502', clientCodeBadge: '3', startDate: '19/08/2026', endDate: '20/08/2026', durationDays: 1, totalWithIva: 879.00, status: 'inviato' },
      { id: 'q2', vehicleName: 'Mercedes-AMG GLE 63', vehicleImage: 'https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=300&auto=format&fit=crop&q=60', plate: 'KNGL630', dateCreated: '06 Giu 2026', clientName: 'Claudio R.', clientPhone: '+39 328 584 8977', clientCodeBadge: '+3', startDate: '20/06/2026', endDate: '22/06/2026', durationDays: 2, totalWithIva: 490.00, status: 'inviato' },
      { id: 'q3', vehicleName: 'Ferrari 296 gtb', vehicleImage: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=300&auto=format&fit=crop&q=60', plate: 'GN296TE', dateCreated: '08 Giu 2026', clientName: 'Roberto B.', clientPhone: '+39 388 345 2988', clientCodeBadge: '38', startDate: '08/06/2026', endDate: '11/06/2026', durationDays: 3, totalWithIva: 1790.00, status: 'inviato' },
      { id: 'q4', vehicleName: 'Ferrari 296 gtb', vehicleImage: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=300&auto=format&fit=crop&q=60', plate: 'GN296TE', dateCreated: '06 Giu 2026', clientName: 'John S. (UK)', clientPhone: '+39 328 776 8827', clientCodeBadge: '+3', startDate: '06/06/2026', endDate: '08/06/2026', durationDays: 2, totalWithIva: 1189.00, status: 'inviato' },
      { id: 'q5', vehicleName: 'Mercedes-AMG GT53', vehicleImage: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=300&auto=format&fit=crop&q=60', plate: 'HA332BE', dateCreated: '06 Giu 2026', clientName: 'Alessandro M.', clientPhone: '+39 328 776 8827', clientCodeBadge: '+3', startDate: '06/06/2026', endDate: '08/06/2026', durationDays: 2, totalWithIva: 579.00, status: 'inviato' },
      { id: 'q6', vehicleName: 'Mercedes-AMG GT53', vehicleImage: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=300&auto=format&fit=crop&q=60', plate: 'HA332BE', dateCreated: '08 Giu 2026', clientName: 'Ilenia V.', clientPhone: '+39 339 123 4567', clientCodeBadge: '+3', startDate: '06/06/2026', endDate: '08/06/2026', durationDays: 2, totalWithIva: 690.00, status: 'bozza' },
    ];
  });

  const [showQuotationModal, setShowQuotationModal] = useState<boolean>(false);
  const [newQuotation, setNewQuotation] = useState({ vehicleName: 'Ferrari 296 gtb', plate: 'GN296TE', clientName: '', clientPhone: '', startDate: '', endDate: '', durationDays: 1, totalWithIva: 879.00, status: 'bozza' as any });

  const [alarmsEnabled, setAlarmsEnabled] = useState<boolean>(() => {
    return localStorage.getItem('dr7_alarms_enabled') !== 'false';
  });

  // Database States loaded and saved to localStorage
  const [vehicles, setVehicles] = useState<Vehicle[]>(() => {
    const saved = localStorage.getItem('dr7_vehicles');
    return saved ? JSON.parse(saved) : DEFAULT_VEHICLES;
  });
  const [bookings, setBookings] = useState<RentalBooking[]>(() => {
    const saved = localStorage.getItem('dr7_bookings');
    return saved ? JSON.parse(saved) : DEFAULT_BOOKINGS;
  });
  const [washTasks, setWashTasks] = useState<WashTask[]>(() => {
    const saved = localStorage.getItem('dr7_wash_tasks');
    return saved ? JSON.parse(saved) : DEFAULT_WASH_TASKS;
  });
  const [documents, setDocuments] = useState<TrusteraDocument[]>(() => {
    const saved = localStorage.getItem('dr7_trustera_docs');
    return saved ? JSON.parse(saved) : DEFAULT_TRUSTERA_DOCUMENTS;
  });
  const [emtnPasses, setEmtnPasses] = useState<EmtnPass[]>(() => {
    const saved = localStorage.getItem('dr7_emtn_passes');
    return saved ? JSON.parse(saved) : DEFAULT_EMTN_PASSES;
  });
  const [leads, setLeads] = useState<LeadRequest[]>([]);

  // Modals & Dialogue controls
  const [showContactModal, setShowContactModal] = useState<boolean>(false);
  const [selectedLead, setSelectedLead] = useState<LeadRequest | null>(null);
  const [messageSentId, setMessageSentId] = useState<string | null>(null);
  const [showAddVehicleForm, setShowAddVehicleForm] = useState<boolean>(false);
  const [showBookingModal, setShowBookingModal] = useState<boolean>(false);
  const [showPasswordModal, setShowPasswordModal] = useState<boolean>(false);
  const [showHoursModal, setShowHoursModal] = useState<boolean>(false);

  // Forms states
  const [newVehicle, setNewVehicle] = useState({ brand: '', model: '', plate: '', costPerDay: 400, deadlineType: 'Assicurazione' as any, upcomingDeadline: '30 Set 2026', fuelLevel: 100, mileage: 5000 });
  const [newBooking, setNewBooking] = useState({ vehicleId: '', clientName: '', startDate: '', endDate: '', dailyRate: 400 });
  const [passwordForm, setPasswordForm] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });
  const [passwordMsg, setPasswordMsg] = useState<{ text: string; success: boolean } | null>(null);

  useEffect(() => {
    // Load prospects/leads from public portal
    const stored = localStorage.getItem('dr7_leads');
    if (stored) {
      try {
        setLeads(JSON.parse(stored));
      } catch (err) {
        console.error("Error loading leads:", err);
      }
    }
  }, [activeTab]);

  const saveVehiclesDirect = (list: Vehicle[]) => {
    localStorage.setItem('dr7_vehicles', JSON.stringify(list));
    setVehicles(list);
  };

  const saveBookingsDirect = (list: RentalBooking[]) => {
    localStorage.setItem('dr7_bookings', JSON.stringify(list));
    setBookings(list);
  };

  const saveWashesDirect = (list: WashTask[]) => {
    localStorage.setItem('dr7_wash_tasks', JSON.stringify(list));
    setWashTasks(list);
  };

  const saveDocsDirect = (list: TrusteraDocument[]) => {
    localStorage.setItem('dr7_trustera_docs', JSON.stringify(list));
    setDocuments(list);
  };

  const saveEmtnDirect = (list: EmtnPass[]) => {
    localStorage.setItem('dr7_emtn_passes', JSON.stringify(list));
    setEmtnPasses(list);
  };

  const toggleAlarms = () => {
    const nextVal = !alarmsEnabled;
    setAlarmsEnabled(nextVal);
    localStorage.setItem('dr7_alarms_enabled', String(nextVal));
  };

  const handleResetToDemo = () => {
    if (confirm("Sei sicuro di voler ripristinare tutti i dati originali del sistema? Questa azione sovrascriverà le modifiche locali.")) {
      localStorage.removeItem('dr7_vehicles');
      localStorage.removeItem('dr7_bookings');
      localStorage.removeItem('dr7_wash_tasks');
      localStorage.removeItem('dr7_trustera_docs');
      localStorage.removeItem('dr7_emtn_passes');
      localStorage.removeItem('dr7_quotations');
      setVehicles(DEFAULT_VEHICLES);
      setBookings(DEFAULT_BOOKINGS);
      setWashTasks(DEFAULT_WASH_TASKS);
      setDocuments(DEFAULT_TRUSTERA_DOCUMENTS);
      setEmtnPasses(DEFAULT_EMTN_PASSES);
      setQuotations([
        { id: 'q1', vehicleName: 'Ferrari 296 gtb', vehicleImage: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=300&auto=format&fit=crop&q=60', plate: 'GN296TE', dateCreated: '06 Giu 2026', clientName: 'Nessun cliente', clientPhone: '+39 375 654 4502', clientCodeBadge: '3', startDate: '19/08/2026', endDate: '20/08/2026', durationDays: 1, totalWithIva: 879.00, status: 'inviato' },
        { id: 'q2', vehicleName: 'Mercedes-AMG GLE 63', vehicleImage: 'https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=300&auto=format&fit=crop&q=60', plate: 'KNGL630', dateCreated: '06 Giu 2026', clientName: 'Claudio R.', clientPhone: '+39 328 584 8977', clientCodeBadge: '+3', startDate: '20/06/2026', endDate: '22/06/2026', durationDays: 2, totalWithIva: 490.00, status: 'inviato' },
        { id: 'q3', vehicleName: 'Ferrari 296 gtb', vehicleImage: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=300&auto=format&fit=crop&q=60', plate: 'GN296TE', dateCreated: '08 Giu 2026', clientName: 'Roberto B.', clientPhone: '+39 388 345 2988', clientCodeBadge: '38', startDate: '08/06/2026', endDate: '11/06/2026', durationDays: 3, totalWithIva: 1790.00, status: 'inviato' },
        { id: 'q4', vehicleName: 'Ferrari 296 gtb', vehicleImage: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=300&auto=format&fit=crop&q=60', plate: 'GN296TE', dateCreated: '06 Giu 2026', clientName: 'John S. (UK)', clientPhone: '+39 328 776 8827', clientCodeBadge: '+3', startDate: '06/06/2026', endDate: '08/06/2026', durationDays: 2, totalWithIva: 1189.00, status: 'inviato' },
        { id: 'q5', vehicleName: 'Mercedes-AMG GT53', vehicleImage: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=300&auto=format&fit=crop&q=60', plate: 'HA332BE', dateCreated: '06 Giu 2026', clientName: 'Alessandro M.', clientPhone: '+39 328 776 8827', clientCodeBadge: '+3', startDate: '06/06/2026', endDate: '08/06/2026', durationDays: 2, totalWithIva: 579.00, status: 'inviato' },
        { id: 'q6', vehicleName: 'Mercedes-AMG GT53', vehicleImage: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=300&auto=format&fit=crop&q=60', plate: 'HA332BE', dateCreated: '08 Giu 2026', clientName: 'Ilenia V.', clientPhone: '+39 339 123 4567', clientCodeBadge: '+3', startDate: '06/06/2026', endDate: '08/06/2026', durationDays: 2, totalWithIva: 690.00, status: 'bozza' },
      ]);
      alert("Database ripristinato con successo!");
    }
  };

  // Archive lead
  const handleArchiveLead = (id: string) => {
    const updated = leads.map(l => l.id === id ? { ...l, status: 'reviewed' as const } : l);
    localStorage.setItem('dr7_leads', JSON.stringify(updated));
    setLeads(updated);
  };

  const handleCreateVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVehicle.brand.trim() || !newVehicle.model.trim() || !newVehicle.plate.trim()) return;

    const added: Vehicle = {
      id: 'v_' + Math.random().toString(36).substring(2, 9),
      ...newVehicle
    };

    const list = [...vehicles, added];
    saveVehiclesDirect(list);
    setNewVehicle({ brand: '', model: '', plate: '', costPerDay: 400, deadlineType: 'Assicurazione', upcomingDeadline: '30 Set 2026', fuelLevel: 100, mileage: 5000 });
    setShowAddVehicleForm(false);
  };

  const handleDeleteVehicle = (id: string) => {
    if (confirm("Sei sicuro di voler rimuovere definitivamente questa vettura dalla flotta?")) {
      const filtered = vehicles.filter(v => v.id !== id);
      saveVehiclesDirect(filtered);
    }
  };

  const handleCreateBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBooking.vehicleId || !newBooking.clientName.trim() || !newBooking.startDate || !newBooking.endDate) {
      alert("Compila tutti i campi obbligatori");
      return;
    }

    const selectedVeh = vehicles.find(v => v.id === newBooking.vehicleId);
    if (!selectedVeh) return;

    // Calculate days between start and end date
    const d1 = new Date(newBooking.startDate);
    const d2 = new Date(newBooking.endDate);
    const diffMs = Math.abs(d2.getTime() - d1.getTime());
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24)) || 1;
    const computedPaid = diffDays * newBooking.dailyRate;

    const created: RentalBooking = {
      id: 'b_' + Math.random().toString(36).substring(2, 9),
      vehicleId: newBooking.vehicleId,
      vehicleName: `${selectedVeh.brand} ${selectedVeh.model}`,
      clientName: newBooking.clientName,
      startDate: new Date(newBooking.startDate).toLocaleDateString('it-IT', { day: '2-digit', month: 'short', year: 'numeric' }),
      endDate: new Date(newBooking.endDate).toLocaleDateString('it-IT', { day: '2-digit', month: 'short', year: 'numeric' }),
      dailyRate: newBooking.dailyRate,
      totalPaid: computedPaid,
      status: 'active'
    };

    // Update vehicle state to rented
    const updatedVehicles = vehicles.map(v => v.id === newBooking.vehicleId ? { ...v, status: 'rented' as const } : v);
    saveVehiclesDirect(updatedVehicles);

    const list = [...bookings, created];
    saveBookingsDirect(list);
    setShowBookingModal(false);
    setNewBooking({ vehicleId: '', clientName: '', startDate: '', endDate: '', dailyRate: 400 });
  };

  const handleCompleteBooking = (bookingId: string, vehicleId: string) => {
    // End rental
    const updatedBookings = bookings.map(b => b.id === bookingId ? { ...b, status: 'completed' as const } : b);
    saveBookingsDirect(updatedBookings);

    // Free up vehicle and send for Prime Wash
    const matchedVeh = vehicles.find(v => v.id === vehicleId);
    if (matchedVeh) {
      const updatedVehs = vehicles.map(v => v.id === vehicleId ? { ...v, status: 'maintenance' as const } : v);
      saveVehiclesDirect(updatedVehs);

      // Register wash queue task
      const newWash: WashTask = {
        id: 'w_' + Math.random().toString(36).substring(2, 9),
        vehicleName: `${matchedVeh.brand} ${matchedVeh.model}`,
        plate: matchedVeh.plate,
        type: 'Completo',
        status: 'Attesa',
        timeRemaining: 30
      };
      saveWashesDirect([...washTasks, newWash]);
    }
    alert("Noleggio concluso con successo. Vettura assegnata alla coda Prime Wash per la preparazione igienica.");
  };

  const handleUpdateWash = (id: string, nextStatus: 'Attesa' | 'In Corso' | 'Pronto') => {
    const updated = washTasks.map(w => {
      if (w.id === id) {
        return { 
          ...w, 
          status: nextStatus,
          timeRemaining: nextStatus === 'Pronto' ? 0 : nextStatus === 'In Corso' ? 15 : 30
        };
      }
      return w;
    });
    saveWashesDirect(updated);
  };

  const handleReleaseWashedVehicle = (washId: string, plate: string) => {
    // Delete wash task
    saveWashesDirect(washTasks.filter(w => w.id !== washId));

    // Release vehicle
    const updatedVehs = vehicles.map(v => v.plate === plate ? { ...v, status: 'available' as const, fuelLevel: 100 } : v);
    saveVehiclesDirect(updatedVehs);
    alert("Vettura igienizzata e contrassegnata come Libera in flotta.");
  };

  const handleToggleDocumentStatus = (id: string, status: 'approved' | 'rejected') => {
    const updated = documents.map(d => d.id === id ? { ...d, status } : d);
    saveDocsDirect(updated);
  };

  const handleToggleEmtn = (id: string) => {
    const updated = emtnPasses.map(ep => ep.id === id ? { ...ep, approved: !ep.approved } : ep);
    saveEmtnDirect(updated);
  };

  const saveQuotationsDirect = (list: Quotation[]) => {
    localStorage.setItem('dr7_quotations', JSON.stringify(list));
    setQuotations(list);
  };

  const handleCreateQuotation = (e: React.FormEvent) => {
    e.preventDefault();
    const id = 'q_' + Math.random().toString(36).substring(2, 9);
    const newQ: Quotation = {
      id,
      vehicleName: newQuotation.vehicleName,
      vehicleImage: newQuotation.vehicleName.toLowerCase().includes('ferrari') ? 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=300&auto=format&fit=crop&q=60' : 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=300&auto=format&fit=crop&q=60',
      plate: newQuotation.plate || 'GN296TE',
      dateCreated: new Date().toLocaleDateString('it-IT', { day: '2-digit', month: 'short', year: 'numeric' }),
      clientName: newQuotation.clientName || 'Cliente VIP',
      clientPhone: newQuotation.clientPhone || '+39 333 123 4567',
      clientCodeBadge: '+' + (Math.floor(Math.random() * 5) + 1),
      startDate: newQuotation.startDate || '15/06/2026',
      endDate: newQuotation.endDate || '18/06/2026',
      durationDays: newQuotation.durationDays || 3,
      totalWithIva: newQuotation.totalWithIva || 879.00,
      status: newQuotation.status || 'bozza'
    };
    saveQuotationsDirect([newQ, ...quotations]);
    setShowQuotationModal(false);
    setNewQuotation({ vehicleName: 'Ferrari 296 gtb', plate: 'GN296TE', clientName: '', clientPhone: '', startDate: '', endDate: '', durationDays: 1, totalWithIva: 879.00, status: 'bozza' });
    alert('Preventivo creato con successo!');
  };

  const handleDeleteQuotation = (id: string) => {
    if (confirm('Sei sicuro di voler eliminare questo preventivo?')) {
      const filtered = quotations.filter(q => q.id !== id);
      saveQuotationsDirect(filtered);
    }
  };

  const handleUpdateQuotationStatus = (id: string, newStatus: Quotation['status']) => {
    const updated = quotations.map(q => q.id === id ? { ...q, status: newStatus } : q);
    saveQuotationsDirect(updated);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwordForm.newPassword || !passwordForm.confirmPassword) {
      setPasswordMsg({ text: "Completa tutti i campi di password", success: false });
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordMsg({ text: "Le password non coincidono", success: false });
      return;
    }
    setPasswordMsg({ text: "Password modificata con successo sul portale Dubai Rent!", success: true });
    setTimeout(() => {
      setShowPasswordModal(false);
      setPasswordForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
      setPasswordMsg(null);
    }, 1800);
  };

  // Metrics Engine
  const totalCount = vehicles.length;
  const inUseCount = vehicles.filter(v => v.status === 'rented').length;
  const maintCount = vehicles.filter(v => v.status === 'maintenance').length;
  const availCount = vehicles.filter(v => v.status === 'available').length;
  const occupancyPercentage = totalCount ? Math.round((inUseCount / totalCount) * 100) : 0;
  const activeDailyRevenue = vehicles.filter(v => v.status === 'rented').reduce((sum, v) => sum + v.costPerDay, 0);

  // Marketing Badge 3 simulation
  const numNewLeads = leads.filter(l => l.status === 'pending').length;
  const marketingBadge = numNewLeads > 0 ? numNewLeads : 3;

  // Theme and Color system definitions
  const ts = {
    isDark,
    colorTheme,
    bgMain: isDark ? 'bg-[#070913] text-slate-100' : 'bg-[#F2F4F7] text-slate-800',
    bgCard: isDark ? 'bg-[#0A0D18]' : 'bg-white',
    bgSidebar: isDark ? 'bg-[#0A0D18]' : 'bg-white',
    borderCol: isDark ? 'border-slate-900' : 'border-slate-200',
    textTitle: isDark ? 'text-white' : 'text-[#111111]',
    textMuted: isDark ? 'text-slate-400' : 'text-[#6e6e73]',
    textMutedLight: isDark ? 'text-slate-500' : 'text-slate-400',
    bgAlt: isDark ? 'bg-slate-950/60' : 'bg-slate-50',
    bgInput: isDark ? 'bg-[#03050a]' : 'bg-slate-100',
    textAccent: 
      colorTheme === 'ocean' ? 'text-cyan-400' :
      colorTheme === 'rosso' ? 'text-red-500' :
      colorTheme === 'gold' ? 'text-amber-500' :
      'text-emerald-500',
    textAccentMuted: 
      colorTheme === 'ocean' ? 'text-cyan-600' :
      colorTheme === 'rosso' ? 'text-red-600' :
      colorTheme === 'gold' ? 'text-amber-600' :
      'text-emerald-600',
    borderAccentAlpha: 
      colorTheme === 'ocean' ? 'border-cyan-500/20' :
      colorTheme === 'rosso' ? 'border-red-500/20' :
      colorTheme === 'gold' ? 'border-amber-500/20' :
      'border-emerald-500/20',
    bgAccentAlpha: 
      colorTheme === 'ocean' ? 'bg-cyan-500/10' :
      colorTheme === 'rosso' ? 'bg-red-500/10' :
      colorTheme === 'gold' ? 'bg-amber-500/10' :
      'bg-emerald-500/10',
    bgAccent: 
      colorTheme === 'ocean' ? 'bg-cyan-500' :
      colorTheme === 'rosso' ? 'bg-red-600' :
      colorTheme === 'gold' ? 'bg-amber-500' :
      'bg-emerald-500',
    bgAccentHover: 
      colorTheme === 'ocean' ? 'hover:bg-cyan-400' :
      colorTheme === 'rosso' ? 'hover:bg-red-500' :
      colorTheme === 'gold' ? 'hover:bg-amber-400' :
      'hover:bg-emerald-400',
    gradientAccent: 
      colorTheme === 'ocean' ? 'from-cyan-600 to-cyan-500' :
      colorTheme === 'rosso' ? 'from-red-600 to-red-500' :
      colorTheme === 'gold' ? 'from-amber-600 to-amber-500' :
      'from-emerald-600 to-emerald-500',
  };

  const getSidebarBtnClass = (tab: string, hasBadge = false) => {
    const isActive = activeTab === tab;
    const baseFlex = hasBadge ? 'justify-between' : 'gap-3';
    if (isActive) {
      return `w-full flex items-center ${baseFlex} px-3 py-2.5 rounded-xl transition-all duration-150 text-xs font-semibold ${ts.bgAccentAlpha} ${ts.textAccent} border ${ts.borderAccentAlpha} shadow-sm`;
    }
    return `w-full flex items-center ${baseFlex} px-3 py-2.5 rounded-xl transition-all duration-150 text-xs font-semibold ${
      isDark 
        ? 'text-slate-400 hover:text-white hover:bg-slate-900/30' 
        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
    } border border-transparent`;
  };

  return (
    <div className={`flex h-screen ${ts.bgMain} overflow-hidden font-sans`}>
      
      {/* 1. SIDEBAR NAVIGATION - Designed EXACTLY to mirror the uploaded portrait menu */}
      <aside className={`${ts.bgSidebar} border-r ${ts.borderCol} shadow-2xl flex flex-col justify-between transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'} shrink-0 z-20`}>
        <div className="flex flex-col flex-1 overflow-y-auto">
          
          {/* Menu Drawer Header */}
          <div className={`h-20 border-b ${ts.borderCol} px-4 flex items-center justify-between`}>
            {sidebarOpen ? (
              <div onClick={onBackToLanding} className="cursor-pointer active:scale-98 transition">
                <BrandLogo className="h-10" showSubText={false} variant={isDark ? "neon" : "dark"} />
              </div>
            ) : (
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-600 to-blue-500 flex items-center justify-center mx-auto text-xs font-black">
                DR7
              </div>
            )}
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-1 rounded-md text-slate-450 hover:text-white transition"
              aria-label="Toggle Navigation size"
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>

          <div className="py-6 px-3 space-y-7">
            
            {/* CATEGORIA 1: CORE BUSINESS */}
            <div className="space-y-1.5">
              {sidebarOpen && (
                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest px-3">CORE BUSINESS</p>
              )}
              <div className="space-y-1">
                <button
                  onClick={() => setActiveTab('noleggio')}
                  className={getSidebarBtnClass('noleggio')}
                >
                  <Calendar className="w-4.5 h-4.5 shrink-0 text-cyan-400" />
                  {sidebarOpen && <span>Noleggio</span>}
                </button>

                <button
                  onClick={() => setActiveTab('prime-wash')}
                  className={getSidebarBtnClass('prime-wash', true)}
                >
                  <div className="flex items-center gap-3">
                    <Droplet className="w-4.5 h-4.5 shrink-0 text-cyan-400" />
                    {sidebarOpen && <span>Prime Wash</span>}
                  </div>
                  {sidebarOpen && washTasks.filter(w => w.status !== 'Pronto').length > 0 && (
                    <span className="text-[9px] font-mono bg-cyan-950 text-cyan-400 px-1.5 py-0.5 rounded-full font-bold">
                      {washTasks.filter(w => w.status !== 'Pronto').length}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setActiveTab('flotta')}
                  className={getSidebarBtnClass('flotta')}
                >
                  <Car className="w-4.5 h-4.5 shrink-0 text-cyan-400" />
                  {sidebarOpen && <span>Flotta</span>}
                </button>

                <button
                  onClick={() => setActiveTab('clienti')}
                  className={getSidebarBtnClass('clienti')}
                >
                  <Users className="w-4.5 h-4.5 shrink-0 text-cyan-400" />
                  {sidebarOpen && <span>Clienti</span>}
                </button>
              </div>
            </div>

            {/* CATEGORIA 2: GESTIONE */}
            <div className="space-y-1.5">
              {sidebarOpen && (
                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest px-3">GESTIONE</p>
              )}
              <div className="space-y-1">
                <button
                  onClick={() => setActiveTab('marketing')}
                  className={getSidebarBtnClass('marketing', true)}
                >
                  <div className="flex items-center gap-3">
                    <Megaphone className="w-4.5 h-4.5 shrink-0 text-indigo-400" />
                    {sidebarOpen && <span>Marketing</span>}
                  </div>
                  {sidebarOpen && (
                    <span className="text-[9px] font-mono font-bold bg-sky-950 text-sky-400 px-2 py-0.5 rounded-full">
                      {marketingBadge}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setActiveTab('report')}
                  className={getSidebarBtnClass('report')}
                >
                  <TrendingUp className="w-4.5 h-4.5 shrink-0 text-indigo-400" />
                  {sidebarOpen && <span>Report</span>}
                </button>
              </div>
            </div>

            {/* CATEGORIA 3: SISTEMI */}
            <div className="space-y-1.5">
              {sidebarOpen && (
                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest px-3">SISTEMI</p>
              )}
              <div className="space-y-1">
                <button
                  onClick={() => setActiveTab('amministrazione')}
                  className={getSidebarBtnClass('amministrazione', true)}
                >
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-4.5 h-4.5 shrink-0 text-emerald-400" />
                    {sidebarOpen && <span>Amministrazione</span>}
                  </div>
                  {sidebarOpen && (
                    <span className="text-[9px] font-mono font-bold bg-rose-950 text-rose-400 px-2 py-0.5 rounded-full">
                      3
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setActiveTab('centralina-pro')}
                  className={getSidebarBtnClass('centralina-pro')}
                >
                  <Zap className="w-4.5 h-4.5 shrink-0 text-amber-400" />
                  {sidebarOpen && <span>Centralina Pro</span>}
                </button>

                <button
                  onClick={() => setActiveTab('sito')}
                  className={getSidebarBtnClass('sito')}
                >
                  <Globe className="w-4.5 h-4.5 shrink-0 text-cyan-400" />
                  {sidebarOpen && <span>Sito</span>}
                </button>

                <button
                  onClick={() => setActiveTab('trustera')}
                  className={getSidebarBtnClass('trustera', true)}
                >
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-4.5 h-4.5 shrink-0 text-emerald-400" />
                    {sidebarOpen && <span>Trustera</span>}
                  </div>
                  {sidebarOpen && documents.filter(d => d.status === 'pending').length > 0 && (
                    <span className="text-[9px] bg-emerald-950 text-emerald-400 px-1.5 py-0.2 rounded font-mono font-bold">1</span>
                  )}
                </button>

                <button
                  onClick={() => setActiveTab('emtn')}
                  className={getSidebarBtnClass('emtn')}
                >
                  <Route className="w-4.5 h-4.5 shrink-0 text-sky-400" />
                  {sidebarOpen && <span>E.M.T.N.</span>}
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* 2. SIDEBAR PROFILE CARD BLOCK - Formed specifically after Ophélie's Super Admin design */}
        <div className="p-4 border-t border-slate-900 bg-[#080B14] space-y-4">
          <div className="bg-[#0f1424] rounded-2xl p-3.5 border border-slate-800 space-y-3 shadow-md text-left">
            
            {/* Ophelie Row */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-400 to-sky-500 p-0.5 shadow-md shrink-0 flex items-center justify-center font-bold text-slate-950 text-sm">
                OP
              </div>
              {sidebarOpen && (
                <div className="truncate">
                  <h4 className="text-xs font-bold text-white tracking-tight truncate">Ophélie</h4>
                  <p className="text-[9px] font-bold text-cyan-400 font-mono tracking-wider uppercase">SUPER ADMIN</p>
                </div>
              )}
            </div>

            {sidebarOpen && (
              <div className="space-y-2.5 pt-1.5 border-t border-slate-800/85">
                {/* Attiva Allarmi Toggle */}
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Bell className={`w-3.5 h-3.5 ${alarmsEnabled ? 'text-cyan-400 animate-pulse' : 'text-slate-500'}`} />
                    Attiva Allarmi
                  </span>
                  
                  {/* Beautiful custom styled toggle */}
                  <button 
                    onClick={toggleAlarms}
                    className={`w-8 h-4 rounded-full p-0.5 transition-colors duration-250 cursor-pointer focus:outline-none ${alarmsEnabled ? 'bg-cyan-500' : 'bg-slate-700'}`}
                  >
                    <div className={`w-3 h-3 rounded-full bg-white transition-transform duration-250 ${alarmsEnabled ? 'translate-x-4' : 'translate-x-0'}`} />
                  </button>
                </div>

                {/* I miei orari Button */}
                <button
                  onClick={() => setShowHoursModal(true)}
                  className="w-full text-left py-1.5 px-2.5 bg-slate-900 hover:bg-slate-800 rounded-lg text-[10px] text-slate-300 hover:text-white transition-colors flex items-center gap-2 border border-slate-800"
                >
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>I miei orari</span>
                </button>

                {/* Password & Logout lines */}
                <div className="flex items-center justify-between pt-1 border-t border-slate-800/50 text-[10px] text-slate-500">
                  <button 
                    onClick={() => {
                      setPasswordForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
                      setShowPasswordModal(true);
                    }} 
                    className="hover:text-cyan-450 hover:text-slate-300 font-medium inline-flex items-center gap-1 bg-transparent border-none p-0 cursor-pointer"
                  >
                    <Lock className="w-2.5 h-2.5" /> Password
                  </button>
                  <button 
                    onClick={onLogout}
                    className="hover:text-red-400 font-medium inline-flex items-center gap-1 bg-transparent border-none p-0 cursor-pointer"
                  >
                    <LogOut className="w-2.5 h-2.5 text-slate-500" /> Esci
                  </button>
                </div>
              </div>
            )}

            {!sidebarOpen && (
              <div className="pt-2 text-center">
                <button 
                  onClick={toggleAlarms} 
                  title={alarmsEnabled ? "Disattiva Allarmi" : "Attiva Allarmi"}
                  className={`p-1.5 rounded-lg ${alarmsEnabled ? 'bg-cyan-500/15 text-cyan-400' : 'bg-slate-800 text-slate-500'}`}
                >
                  <Bell className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

          </div>
        </div>
      </aside>

      {/* 3. MAIN DASHBOARD SURFACE WORKSPACE CONTENT */}
      <main className={`flex-1 flex flex-col min-w-0 ${ts.bgMain} overflow-hidden transition-colors duration-200`}>
        
        {/* System Global Warning Tickers for Active Alarms */}
        {alarmsEnabled && (
          <div className={`px-6 py-2.5 flex items-center justify-between text-left text-xs shrink-0 font-mono transition-colors duration-200 ${
            isDark 
              ? 'bg-[#00C884]/10 border-b border-[#00C884]/20 text-cyan-300' 
              : 'bg-[#5bdfb0]/15 border-b border-[#00C884]/30 text-[#0c704e]'
          }`}>
            <div className="flex items-center gap-2 overflow-hidden">
              <span className={`w-1.5 h-1.5 rounded-full ${ts.bgAccent} animate-ping shrink-0`} />
              <span className={`font-bold text-[9px] uppercase tracking-wider px-2 py-0.5 rounded border ${
                isDark ? 'bg-cyan-900/40 border-cyan-500/30' : 'bg-emerald-100 border-emerald-300'
              }`}>ALLERTA PARCO AUTO</span>
              <p className="truncate font-sans font-medium text-[11px]">Ferrari F8 Tagliando Scaduto (Oggi) • Assicurazione AMG G63 in scadenza fra 6 giorni</p>
            </div>
            <button onClick={toggleAlarms} className="text-[10px] text-emerald-600 hover:text-emerald-500 underline font-bold pl-4 shrink-0">
              Silenziatore
            </button>
          </div>
        )}

        {/* Global Nav Bar Header */}
        <header className={`h-16 ${ts.bgSidebar} border-b ${ts.borderCol} px-6 flex items-center justify-between shrink-0 transition-colors duration-200`}>
          <div className="flex items-center gap-2">
            <span className="inline-block md:hidden mr-2">
              <BrandLogo className="h-7" showSubText={false} variant={isDark ? "neon" : "dark"} />
            </span>
            <div className="text-left">
              <h2 className={`text-xs md:text-sm font-bold uppercase tracking-wider font-sans flex items-center gap-2 ${ts.textTitle}`}>
                <span>CONSOLLE DUBAI RENT 7 OS</span>
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              </h2>
              <p className="text-[9px] font-bold text-slate-450 font-mono opacity-85">
                {activeTab === 'noleggio' && 'GESTIONE NOLEGGI, CONTRATTI E ARCHIVIO PRENOTAZIONI'}
                {activeTab === 'prime-wash' && 'CONTROLLO PREPARAZIONE RIENTRI E CODA LAVAGGIO'}
                {activeTab === 'flotta' && 'CONTROLLO COMPLETO PARCO AUTO E ALERT MANUTENTIVI'}
                {activeTab === 'clienti' && 'MARKET CRM CLIENTILE E VISITE PROFILATE'}
                {activeTab === 'marketing' && 'SMS MARKETING AUTOMATION E RELANCES ATTIVE'}
                {activeTab === 'report' && 'PERFORMANCE FINANZIARIE E OCCUPAZIONE PARCO MEZZI'}
                {activeTab === 'amministrazione' && 'REGISTRO FATTURAZIONE SDI E DEPOSITI CAUZIONALI'}
                {activeTab === 'centralina-pro' && 'LOCALIZZAZIONE TELEMETRIA IOT INTELLIGENTE'}
                {activeTab === 'sito' && 'PORTALE PUBBLICO CONFIGURATION & STATO TRAFFICO'}
                {activeTab === 'trustera' && 'VERIFICA DOCUMENTALE IDENTITY CHECKER'}
                {activeTab === 'emtn' && 'CLEARANCE DOGANALE E SCONFINAMENTO CONTINENTALE'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-5">
            
            {/* Color Accent Themes switcher (Interactive circles representing multiple color themes) */}
            <div className="hidden lg:flex items-center gap-2 bg-slate-100 dark:bg-slate-900 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 transition-all">
              <Palette className="w-3.5 h-3.5 text-slate-500" />
              <button 
                onClick={() => { setColorTheme('ocean'); localStorage.setItem('dr7_color_theme', 'ocean'); }}
                className={`w-3.5 h-3.5 rounded-full bg-cyan-400 border transition ${colorTheme === 'ocean' ? 'ring-2 ring-cyan-500 scale-110 border-white dark:border-slate-950' : 'opacity-85 hover:scale-105 border-transparent'}`}
                title="Dubai Ocean Theme"
              />
              <button 
                onClick={() => { setColorTheme('rosso'); localStorage.setItem('dr7_color_theme', 'rosso'); }}
                className={`w-3.5 h-3.5 rounded-full bg-red-600 border transition ${colorTheme === 'rosso' ? 'ring-2 ring-red-500 scale-110 border-white dark:border-slate-950' : 'opacity-85 hover:scale-105 border-transparent'}`}
                title="GP Rosso Theme"
              />
              <button 
                onClick={() => { setColorTheme('gold'); localStorage.setItem('dr7_color_theme', 'gold'); }}
                className={`w-3.5 h-3.5 rounded-full bg-amber-500 border transition ${colorTheme === 'gold' ? 'ring-2 ring-amber-500 scale-110 border-white dark:border-slate-950' : 'opacity-85 hover:scale-105 border-transparent'}`}
                title="Golden Luxury Theme"
              />
              <button 
                onClick={() => { setColorTheme('neon'); localStorage.setItem('dr7_color_theme', 'neon'); }}
                className={`w-3.5 h-3.5 rounded-full bg-emerald-500 border transition ${colorTheme === 'neon' ? 'ring-2 ring-emerald-500 scale-110 border-white dark:border-slate-950' : 'opacity-85 hover:scale-105 border-transparent'}`}
                title="Al Active Neon"
              />
            </div>

            {/* Dark/Light mode toggle (Apple style minimal Sun/Moon interaction) */}
            <button
              onClick={() => {
                const target = !isDark;
                setIsDark(target);
                localStorage.setItem('dr7_is_dark', String(target));
              }}
              className={`p-2 rounded-xl border transition duration-200 cursor-pointer ${
                isDark 
                  ? 'bg-slate-900 border-slate-800 text-amber-400 hover:bg-slate-800 hover:text-amber-300 shadow-inner' 
                  : 'bg-slate-100 border-slate-200 text-indigo-600 hover:bg-slate-200 shadow-sm'
              }`}
              title={isDark ? "Passa a Modalità Chiara" : "Passa a Modalità Scura"}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Systems Operations Buttons */}
            <button 
              onClick={handleResetToDemo}
              className={`text-[10px] font-mono font-bold px-2.5 py-1.8 rounded-xl border transition flex items-center gap-1.5 ${
                isDark 
                  ? 'bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border-slate-800' 
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 border-slate-200'
              }`}
              title="Azzera e ripristina la demo"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
            <button 
              onClick={onBackToLanding}
              className={`px-3 py-1.8 text-slate-950 font-bold rounded-xl text-[10px] tracking-wide uppercase transition-all duration-150 shadow-sm bg-gradient-to-r ${ts.gradientAccent}`}
            >
              Sito
            </button>
          </div>
        </header>

        {/* Outer Workspace Shell Pane (Scrollable Content viewport) */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">

          {/* Core Mini Metrics Bar for high context overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-[#0A0D18] p-4.5 rounded-2xl border border-slate-900 text-left">
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider font-mono">RICAVO NOLEGGI ATTIVI / GIORNO</span>
              <p className="text-xl md:text-2xl font-black font-mono text-[#00C884] mt-0.5">€ {activeDailyRevenue.toLocaleString('it-IT')}</p>
              <span className="text-[10px] text-slate-450 font-mono">Su {inUseCount} vetture in corsa</span>
            </div>

            <div className="bg-[#0A0D18] p-4.5 rounded-2xl border border-slate-900 text-left">
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider font-mono">OCCUPAZIONE PARCO MEZZI</span>
              <p className="text-xl md:text-2xl font-black font-mono text-cyan-400 mt-0.5">{occupancyPercentage}%</p>
              <div className="w-full bg-slate-800 h-1 rounded-full mt-1.5 overflow-hidden">
                <div className="bg-cyan-500 h-full rounded-full" style={{ width: `${occupancyPercentage}%` }} />
              </div>
            </div>

            <div className="bg-[#0A0D18] p-4.5 rounded-2xl border border-slate-900 text-left">
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider font-mono">STATO FLOTTA MEZZI</span>
              <p className="text-xl md:text-2xl font-black font-mono text-white mt-0.5">{totalCount} Auto</p>
              <p className="text-[9px] font-sans text-slate-450 mt-1 flex gap-1.5">
                <span className="text-emerald-400 font-semibold">{availCount} Libere</span>•
                <span className="text-amber-500 font-semibold">{inUseCount} Corsa</span>•
                <span className="text-red-400 font-semibold">{maintCount} Stop</span>
              </p>
            </div>

            <div className="bg-[#0A0D18] p-4.5 rounded-2xl border border-slate-900 text-left">
              <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider font-mono">PROSPETTI IN ARRIVO (CRM)</span>
              <p className="text-xl md:text-2xl font-black font-mono text-[#38bdf8] mt-0.5">{leads.filter(l => l.status === 'pending').length} Nuovi</p>
              <span className="text-[10px] text-slate-450 font-mono">In attesa di contatto</span>
            </div>
          </div>

          {/* TAB PORT: NOLEGGIO */}
          {activeTab === 'noleggio' && (
            <div className="space-y-6 text-left">
              
              {/* Nested CRM Subtabs perfectly mirroring the platform screenshots */}
              <div className={`flex border-b ${ts.borderCol} overflow-x-auto pb-px space-x-6 shrink-0 scrollbar-none`}>
                <button
                  onClick={() => setSubTabNoleggio('preventivi')}
                  className={`py-3.5 text-xs font-semibold uppercase tracking-wider relative transition-colors cursor-pointer whitespace-nowrap ${
                    subTabNoleggio === 'preventivi'
                      ? `${ts.textAccent} font-extrabold border-b-2 ${colorTheme === 'ocean' ? 'border-cyan-500' : colorTheme === 'rosso' ? 'border-red-500' : colorTheme === 'gold' ? 'border-amber-500' : 'border-emerald-500'}`
                      : 'text-slate-400 hover:text-slate-700 dark:hover:text-white border-b-2 border-transparent'
                  }`}
                >
                  Preventivi / Quotazioni
                  <span className={`ml-2 px-1.5 py-0.2 text-[9px] rounded-full font-mono ${isDark ? 'bg-slate-900 border border-slate-800' : 'bg-slate-200 text-slate-800'} font-bold`}>
                    {quotations.length}
                  </span>
                </button>
                <button
                  onClick={() => setSubTabNoleggio('noleggio')}
                  className={`py-3.5 text-xs font-semibold uppercase tracking-wider relative transition-colors cursor-pointer whitespace-nowrap ${
                    subTabNoleggio === 'noleggio'
                      ? `${ts.textAccent} font-extrabold border-b-2 ${colorTheme === 'ocean' ? 'border-cyan-500' : colorTheme === 'rosso' ? 'border-red-500' : colorTheme === 'gold' ? 'border-amber-500' : 'border-emerald-500'}`
                      : 'text-slate-400 hover:text-slate-700 dark:hover:text-white border-b-2 border-transparent'
                  }`}
                >
                  Noleggi Attivi
                  <span className={`ml-2 px-1.5 py-0.2 text-[9px] rounded-full font-mono ${isDark ? 'bg-slate-900 border border-slate-800' : 'bg-slate-200 text-slate-800'} font-bold`}>
                    {bookings.filter(b => b.status === 'active').length}
                  </span>
                </button>
                <button
                  onClick={() => setSubTabNoleggio('calendario')}
                  className={`py-3.5 text-xs font-semibold uppercase tracking-wider relative transition-colors cursor-pointer whitespace-nowrap ${
                    subTabNoleggio === 'calendario'
                      ? `${ts.textAccent} font-extrabold border-b-2 ${colorTheme === 'ocean' ? 'border-cyan-500' : colorTheme === 'rosso' ? 'border-red-500' : colorTheme === 'gold' ? 'border-amber-500' : 'border-emerald-500'}`
                      : 'text-slate-400 hover:text-slate-700 dark:hover:text-white border-b-2 border-transparent'
                  }`}
                >
                  Planning Grafico
                </button>
                <button
                  onClick={() => setSubTabNoleggio('contratti')}
                  className={`py-3.5 text-xs font-semibold uppercase tracking-wider relative transition-colors cursor-pointer whitespace-nowrap ${
                    subTabNoleggio === 'contratti'
                      ? `${ts.textAccent} font-extrabold border-b-2 ${colorTheme === 'ocean' ? 'border-cyan-500' : colorTheme === 'rosso' ? 'border-red-500' : colorTheme === 'gold' ? 'border-amber-500' : 'border-emerald-500'}`
                      : 'text-slate-400 hover:text-slate-700 dark:hover:text-white border-b-2 border-transparent'
                  }`}
                >
                  Archivio Contratti
                </button>
                <button
                  onClick={() => setSubTabNoleggio('danni-penali')}
                  className={`py-3.5 text-xs font-semibold uppercase tracking-wider relative transition-colors cursor-pointer whitespace-nowrap ${
                    subTabNoleggio === 'danni-penali'
                      ? `${ts.textAccent} font-extrabold border-b-2 ${colorTheme === 'ocean' ? 'border-cyan-500' : colorTheme === 'rosso' ? 'border-red-500' : colorTheme === 'gold' ? 'border-amber-500' : 'border-emerald-500'}`
                      : 'text-slate-400 hover:text-slate-700 dark:hover:text-white border-b-2 border-transparent'
                  }`}
                >
                  Danni & Penali
                </button>
                <button
                  onClick={() => setSubTabNoleggio('multe')}
                  className={`py-3.5 text-xs font-semibold uppercase tracking-wider relative transition-colors cursor-pointer whitespace-nowrap ${
                    subTabNoleggio === 'multe'
                      ? `${ts.textAccent} font-extrabold border-b-2 ${colorTheme === 'ocean' ? 'border-cyan-500' : colorTheme === 'rosso' ? 'border-red-500' : colorTheme === 'gold' ? 'border-amber-500' : 'border-emerald-500'}`
                      : 'text-slate-400 hover:text-slate-700 dark:hover:text-white border-b-2 border-transparent'
                  }`}
                >
                  Multe CDS
                </button>
              </div>

              {/* A. VIEWPORT INDEX: PREVENTIVI / CRM TABLE (SCREENSHOT 2 CONTENT) */}
              {subTabNoleggio === 'preventivi' && (
                <div className="space-y-6 fade-in duration-200">
                  
                  {/* Performance Metrics Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className={`${ts.bgCard} border ${ts.borderCol} rounded-2xl p-4.5 text-left shadow-sm`}>
                      <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest font-mono">FATTURATO POTENZIALE ATTIVO</span>
                      <p className={`text-xl md:text-2xl font-black font-mono ${ts.textAccent} mt-0.5`}>
                        € {quotations.reduce((sum, q) => sum + q.totalWithIva, 0).toLocaleString('it-IT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                      <span className="text-[10px] text-slate-450 font-sans">Valore totale dei preventivi in corso</span>
                    </div>

                    <div className={`${ts.bgCard} border ${ts.borderCol} rounded-2xl p-4.5 text-left shadow-sm`}>
                      <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest font-mono">CONVERSION RATIO (ACCETTATI)</span>
                      <p className="text-xl md:text-2xl font-black font-mono text-emerald-500 mt-0.5">
                        {quotations.length ? Math.round((quotations.filter(q => q.status === 'accettato').length / quotations.length) * 100) : 0} %
                      </p>
                      <span className="text-[10px] text-slate-450 font-sans">Percentuale successo trattative</span>
                    </div>

                    <div className={`${ts.bgCard} border ${ts.borderCol} rounded-2xl p-4.5 text-left shadow-sm`}>
                      <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest font-mono">TICKET MEDIO PREVISTO</span>
                      <p className="text-xl md:text-2xl font-black font-mono text-indigo-500 mt-0.5">
                        € {quotations.length ? Math.round(quotations.reduce((sum, q) => sum + q.totalWithIva, 0) / quotations.length).toLocaleString('it-IT') : 0}
                      </p>
                      <span className="text-[10px] text-slate-450 font-sans">Prezzo medio per singola fustella</span>
                    </div>
                  </div>

                  {/* Filter and Control actions matching CRM header layout */}
                  <div className={`p-4 ${ts.bgCard} border ${ts.borderCol} rounded-2xl flex flex-col md:flex-row justify-between items-center gap-4`}>
                    
                    {/* Search and Filters buttons */}
                    <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                      <div className="relative w-full sm:w-64">
                        <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                        <input
                          type="text"
                          placeholder="Cerca veicolo o cliente..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className={`w-full pl-9 pr-4 py-2 border text-xs rounded-xl outline-none focus:ring-1 focus:ring-cyan-500 ${
                            isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
                          }`}
                        />
                      </div>

                      {/* Filter pill selectors */}
                      <div className="flex bg-slate-100 dark:bg-slate-950 p-1 rounded-xl border border-slate-200 dark:border-slate-900 gap-1 text-[11px] font-medium">
                        {['Tutti', 'bozza', 'inviato', 'accettato'].map((st) => (
                          <button
                            key={st}
                            onClick={() => setSelectedQuotationStatus(st)}
                            className={`px-3 py-1.5 rounded-lg transition-all capitalize whitespace-nowrap cursor-pointer ${
                              selectedQuotationStatus === st
                                ? (isDark ? 'bg-slate-800 text-white' : 'bg-white text-slate-950 shadow-sm')
                                : 'text-slate-450 hover:text-slate-800 dark:hover:text-white'
                            }`}
                          >
                            {st === 'Tutti' ? 'Tutti' : st}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => setShowQuotationModal(true)}
                      className={`w-full md:w-auto px-4.5 py-2.5 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition uppercase tracking-wider bg-gradient-to-r ${ts.gradientAccent}`}
                    >
                      <Plus className="w-4 h-4 text-slate-950" /> Nuovo Preventivo
                    </button>
                  </div>

                  {/* Main Quotations CRM Table */}
                  <div className={`border ${ts.borderCol} ${ts.bgCard} rounded-2xl overflow-hidden shadow-sm`}>
                    <div className={`px-6 py-4.5 border-b ${ts.borderCol} bg-slate-50 dark:bg-slate-950/40 flex justify-between items-center`}>
                      <span className={`text-xs font-bold ${ts.textTitle} uppercase tracking-wider`}>Elenco Preventivi Attivi (Dubai CRM)</span>
                      <span className="text-[10px] text-slate-500 font-mono">Ultimo update: oggi alle {new Date().getHours()}:{new Date().getMinutes() < 10 ? '0' : ''}{new Date().getMinutes()}</span>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className={`bg-slate-50/85 dark:bg-slate-950/80 ${ts.textMuted} font-bold uppercase text-[9px] font-mono border-b ${ts.borderCol}`}>
                            <th className="p-4 w-28">ID / Creazione</th>
                            <th className="p-4">Vettura ed Immagine</th>
                            <th className="p-4">Cliente / Info</th>
                            <th className="p-4">Periodo Rent</th>
                            <th className="p-4 text-right">Totale IVA Compresa</th>
                            <th className="p-4 text-center">Stato</th>
                            <th className="p-4 text-center">Azioni</th>
                          </tr>
                        </thead>
                        <tbody className={`divide-y ${ts.borderCol}`}>
                          {quotations
                            .filter(q => {
                              const matchesSearch = q.vehicleName.toLowerCase().includes(searchQuery.toLowerCase()) || q.clientName.toLowerCase().includes(searchQuery.toLowerCase());
                              const matchesStatus = selectedQuotationStatus === 'Tutti' || q.status === selectedQuotationStatus;
                              return matchesSearch && matchesStatus;
                            })
                            .map((q) => (
                              <tr key={q.id} className="hover:bg-slate-100/40 dark:hover:bg-slate-900/10 transition-colors">
                                <td className="p-4">
                                  <div className="font-mono text-[10px] font-bold text-slate-450 uppercase">#{q.id}</div>
                                  <div className="text-[10px] text-slate-500 mt-0.5">{q.dateCreated}</div>
                                </td>
                                <td className="p-4">
                                  <div className="flex items-center gap-3">
                                    <img 
                                      src={q.vehicleImage} 
                                      alt={q.vehicleName}
                                      referrerPolicy="no-referrer"
                                      className="w-12 h-8 object-cover rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 bg-slate-900/50 shrink-0"
                                    />
                                    <div>
                                      <div className={`font-bold text-[13px] ${ts.textTitle}`}>{q.vehicleName}</div>
                                      <span className="text-[10px] font-mono font-extrabold bg-slate-100 dark:bg-slate-900 px-1.5 py-0.5 rounded text-slate-400 border border-slate-200 dark:border-slate-800">
                                        {q.plate}
                                      </span>
                                    </div>
                                  </div>
                                </td>
                                <td className="p-4">
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs font-semibold dark:text-slate-200 text-slate-800">{q.clientName}</span>
                                    <span className="text-[9px] font-bold px-1 py-0.2 rounded bg-indigo-50 dark:bg-indigo-950/40 text-indigo-500 border border-indigo-500/10 font-mono">
                                      {q.clientCodeBadge}
                                    </span>
                                  </div>
                                  <div className="text-[10px] text-slate-500 mt-0.5 font-mono">{q.clientPhone}</div>
                                </td>
                                <td className="p-4">
                                  <div className="font-medium dark:text-slate-300 text-slate-705">
                                    {q.startDate} <span className="text-slate-500">al</span> {q.endDate}
                                  </div>
                                  <div className="text-[10px] text-[#00C884] font-bold mt-0.5">{q.durationDays} Giorni Previsti</div>
                                </td>
                                <td className="p-4 text-right font-mono font-extrabold text-[13px] text-slate-800 dark:text-white">
                                  € {q.totalWithIva.toLocaleString('it-IT', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </td>
                                <td className="p-4 text-center">
                                  {q.status === 'bozza' && (
                                    <span className="bg-slate-100 dark:bg-slate-800 text-slate-500 text-[10px] font-bold px-2 py-0.5 rounded-md border border-slate-200 dark:border-slate-800 font-sans tracking-wide">
                                      Bozza
                                    </span>
                                  )}
                                  {q.status === 'inviato' && (
                                    <span className="bg-sky-100 dark:bg-sky-950/45 text-sky-600 dark:text-sky-400 text-[10px] font-bold px-2 py-0.5 rounded-md border border-sky-500/20 font-sans tracking-wide">
                                      Inviato
                                    </span>
                                  )}
                                  {q.status === 'accettato' && (
                                    <span className="bg-emerald-100 dark:bg-emerald-950/45 text-emerald-600 dark:text-[#00C884] text-[10px] font-bold px-2 py-0.5 rounded-md border border-emerald-500/20 font-sans tracking-wide animate-pulse">
                                      Accettato
                                    </span>
                                  )}
                                </td>
                                <td className="p-4 text-center">
                                  <div className="flex items-center justify-center gap-2">
                                    <button 
                                      onClick={() => handleUpdateQuotationStatus(q.id, 'accettato')}
                                      className="px-2 py-1 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-[9px] rounded-lg transition"
                                      title="Accetta preventivo"
                                    >
                                      ✓ Accetta
                                    </button>
                                    <select
                                      value={q.status}
                                      onChange={(e) => handleUpdateQuotationStatus(q.id, e.target.value as any)}
                                      className="bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded px-1 py-0.5 text-[10px] outline-none"
                                    >
                                      <option value="bozza">Bozza</option>
                                      <option value="inviato">Inviato</option>
                                      <option value="accettato">Accettato</option>
                                    </select>
                                    <button
                                      onClick={() => handleDeleteQuotation(q.id)}
                                      className="text-red-500 hover:text-red-400 p-1 hover:bg-slate-100 dark:hover:bg-slate-900 rounded transition"
                                      title="Elimina"
                                    >
                                      ✕
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          {quotations.filter(q => {
                            const matchesSearch = q.vehicleName.toLowerCase().includes(searchQuery.toLowerCase()) || q.clientName.toLowerCase().includes(searchQuery.toLowerCase());
                            const matchesStatus = selectedQuotationStatus === 'Tutti' || q.status === selectedQuotationStatus;
                            return matchesSearch && matchesStatus;
                          }).length === 0 && (
                            <tr>
                              <td colSpan={7} className="p-8 text-center text-slate-500 font-sans italic">
                                Nessun preventivo registrato corrisponde ai filtri di ricerca.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* B. VIEWPORT INDEX: NOLEGGI ATTIVI (ORIGINAL TAB VIEW) */}
              {subTabNoleggio === 'noleggio' && (
                <div className="space-y-6 fade-in duration-200">
                  <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 ${ts.bgCard} p-5 rounded-2xl border ${ts.borderCol}`}>
                    <div>
                      <h3 className={`text-base font-bold ${ts.textTitle}`}>Console Prenotazioni e Contratti Attivi</h3>
                      <p className="text-xs text-slate-500">Verifica i noleggi attivi, registra i contratti o pianifica le consegne.</p>
                    </div>
                    <button 
                      onClick={() => setShowBookingModal(true)}
                      className={`px-4 py-2.5 text-slate-950 font-bold rounded-xl text-xs flex items-center gap-1.5 transition bg-gradient-to-r ${ts.gradientAccent}`}
                    >
                      <Plus className="w-4 h-4 text-slate-950" /> Nuovo Noleggio
                    </button>
                  </div>

                  <div className={`border ${ts.borderCol} ${ts.bgCard} rounded-2xl overflow-hidden shadow-md`}>
                    <div className={`px-6 py-4.5 border-b ${ts.borderCol} flex justify-between items-center bg-slate-50 dark:bg-slate-950/40`}>
                      <span className={`text-xs font-bold ${ts.textTitle} uppercase tracking-wider`}>Planning Noleggi Attivi</span>
                      <span className="text-[10px] text-slate-550 font-mono font-bold">{bookings.length} contratti registrati</span>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead>
                          <tr className={`bg-slate-50/30 dark:bg-slate-950 ${ts.textMuted} font-bold uppercase text-[9px] font-mono border-b ${ts.borderCol}`}>
                            <th className="p-4">Codice Contratto</th>
                            <th className="p-4">Veicolo</th>
                            <th className="p-4">Cliente / NCC Operator</th>
                            <th className="p-4">Periodo Noleggio</th>
                            <th className="p-4 text-right">Tariffa Giornale</th>
                            <th className="p-4 text-right">Fatturato Totale</th>
                            <th className="p-4">Stato</th>
                            <th className="p-4 text-center">Azioni</th>
                          </tr>
                        </thead>
                        <tbody className={`divide-y ${ts.borderCol}`}>
                          {bookings.map(b => (
                            <tr key={b.id} className="hover:bg-slate-100/5 dark:hover:bg-slate-900/10">
                              <td className="p-4 font-mono font-bold text-slate-450">#{b.id.toUpperCase()}</td>
                              <td className={`p-4 font-bold ${ts.textTitle}`}>{b.vehicleName}</td>
                              <td className="p-4 text-slate-500 dark:text-slate-300 font-medium">{b.clientName}</td>
                              <td className="p-4 text-slate-450">{b.startDate} @ {b.endDate}</td>
                              <td className="p-4 text-right font-mono font-semibold text-slate-500">€ {b.dailyRate.toLocaleString()}</td>
                              <td className={`p-4 text-right font-mono font-bold ${ts.textAccent}`}>€ {b.totalPaid.toLocaleString()}</td>
                              <td className="p-4">
                                {b.status === 'active' && (
                                  <span className="bg-emerald-500/10 text-emerald-500 dark:text-[#00C884] text-[9.5px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/20 font-sans">
                                    Attivo in Corso
                                  </span>
                                )}
                                {b.status === 'pending_return' && (
                                  <span className="bg-amber-500/10 text-amber-500 text-[9.5px] font-bold px-2.5 py-0.5 rounded-full border border-amber-500/20 font-sans">
                                    Attesa Rientro
                                  </span>
                                )}
                                {b.status === 'completed' && (
                                  <span className="bg-slate-200 dark:bg-slate-800 text-slate-450 dark:text-slate-400 text-[9.5px] font-bold px-2.5 py-0.5 rounded-full font-sans">
                                    Chiuso Completato
                                  </span>
                                )}
                              </td>
                              <td className="p-4 text-center">
                                {b.status !== 'completed' ? (
                                  <button
                                    onClick={() => handleCompleteBooking(b.id, b.vehicleId)}
                                    className="px-3 py-1 bg-red-500/10 hover:bg-red-500 hover:text-white text-red-500 rounded-lg text-[10px] font-bold border border-red-505/15 transition cursor-pointer"
                                  >
                                    Chiudi Rientro →
                                  </button>
                                ) : (
                                  <span className="text-slate-500 text-[10px] italic">Archiviato</span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* C. VIEWPORT INDEX: PLANNING GRAFICO */}
              {subTabNoleggio === 'calendario' && (
                <div className={`p-6 ${ts.bgCard} border ${ts.borderCol} rounded-2xl space-y-6 fade-in duration-200 text-left`}>
                  <div className="border-b border-slate-800 pb-3 flex justify-between items-center">
                    <div>
                      <h4 className={`text-base font-bold ${ts.textTitle}`}>Pianificazione Temporale Flotta</h4>
                      <p className="text-xs text-slate-500">Mappa temporale delle uscite, rientri programmabili e manutenzioni.</p>
                    </div>
                    <span className="text-xs font-mono font-bold bg-[#00C884]/10 text-emerald-500 border border-emerald-500/20 px-2.5 py-0.8 rounded">
                      Mese Corrente: Giugno 2026
                    </span>
                  </div>

                  {/* Calendar Mock Time block */}
                  <div className="grid grid-cols-7 gap-2 text-center text-xs">
                    {['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'].map(day => (
                      <div key={day} className="text-slate-550 font-bold py-2 font-mono uppercase bg-slate-100 dark:bg-slate-950 rounded">{day}</div>
                    ))}
                    {Array.from({ length: 30 }).map((_, i) => {
                      const dayNr = i + 1;
                      const hasEvent = dayNr % 6 === 0;
                      const hasMaint = dayNr === 8 || dayNr === 22;
                      return (
                        <div key={i} className={`min-h-[70px] rounded-xl border p-2 text-left relative ${
                          isDark ? 'border-slate-900 bg-slate-950/30' : 'border-slate-105 bg-slate-50/50'
                        }`}>
                          <span className="font-bold text-[10px] font-mono text-slate-500">{dayNr}</span>
                          {hasEvent && (
                            <div className="mt-1 text-[9px] truncate bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-bold px-1 py-0.5 rounded">
                              Ferrari GN296
                            </div>
                          )}
                          {hasMaint && (
                            <div className="mt-1 text-[9px] truncate bg-red-500/10 border border-red-500/20 text-red-500 font-bold px-1 py-0.5 rounded">
                              Tagliando F8
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* D. VIEWPORT INDEX: ARCHIVIO CONTRATTI */}
              {subTabNoleggio === 'contratti' && (
                <div className={`p-6 ${ts.bgCard} border ${ts.borderCol} rounded-2xl space-y-4 fade-in duration-200 text-left`}>
                  <h4 className={`text-base font-bold ${ts.textTitle}`}>Registro Contratti Digitali</h4>
                  <p className="text-xs text-slate-400">Tutti i contratti generati vengono timbrati digitalmente in cloud e inviati a Trustera per la validazione dell'identità.</p>
                  
                  <div className="space-y-2.5 font-mono text-xs">
                    <div className="flex justify-between items-center py-2.5 border-b border-slate-800">
                      <div className="flex items-center gap-3">
                        <FileText className="w-4 h-4 text-emerald-400" />
                        <div>
                          <p className="text-slate-200 font-bold">#CTR-F296-3</p>
                          <span className="text-[10px] text-slate-500">Lorenzo Magnifico • Firmato</span>
                        </div>
                      </div>
                      <span className="text-[10px] uppercase font-bold bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded border border-emerald-500/20">Valido</span>
                    </div>
                    <div className="flex justify-between items-center py-2.5 border-b border-slate-800">
                      <div className="flex items-center gap-3">
                        <FileText className="w-4 h-4 text-emerald-400" />
                        <div>
                          <p className="text-slate-200 font-bold">#CTR-AMG-22</p>
                          <span className="text-[10px] text-slate-500">Claudio R. • In attesa di firma</span>
                        </div>
                      </div>
                      <span className="text-[10px] uppercase font-bold bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded border border-amber-500/20">Pending</span>
                    </div>
                  </div>
                </div>
              )}

              {/* E. VIEWPORT INDEX: DANNI E PENALI */}
              {subTabNoleggio === 'danni-penali' && (
                <div className={`p-6 ${ts.bgCard} border ${ts.borderCol} rounded-2xl space-y-4 fade-in duration-200 text-left`}>
                  <h4 className={`text-base font-bold ${ts.textTitle}`}>Registro Danni, Penali e Rifornimenti mancanti</h4>
                  <p className="text-xs text-slate-450 text-slate-500">
                    Traccia gli addebiti per graffi, franchigie e benzina non ripristinata rilevata dai sensori IOT.
                  </p>
                  <div className="p-4 bg-red-500/10 border-l-4 border-red-500 rounded-lg text-xs leading-relaxed text-slate-705 text-red-500/90">
                    <strong>Nessuna penale pendente rilevata al checkpoint!</strong> Tutti i rientri registrati nelle ultime 48 ore sono conformi ai parametri contrattuali.
                  </div>
                </div>
              )}

              {/* F. VIEWPORT INDEX: MULTE */}
              {subTabNoleggio === 'multe' && (
                <div className={`p-6 ${ts.bgCard} border ${ts.borderCol} rounded-2xl space-y-4 fade-in duration-200 text-left`}>
                  <h4 className={`text-base font-bold ${ts.textTitle}`}>Notifiche Codice della Strada (Multe)</h4>
                  <p className="text-xs text-slate-450">Tracciamento verbali d'infrazione con re-imputazione automatica della responsabilità al locatario.</p>
                  <div className="p-8 text-center italic text-slate-500 text-xs">
                    Zero infrazioni attive registrate su dr7ai.com per il parco veicoli noleggiati.
                  </div>
                </div>
              )}

            </div>
          )}

          {/* TAB PORT: PRIME WASH */}
          {activeTab === 'prime-wash' && (
            <div className="space-y-6 text-left">
              <div className="bg-[#0A0D18] p-5 rounded-2xl border border-slate-900">
                <h3 className="text-base font-bold text-white">Console Prime Wash e Preparazione</h3>
                <p className="text-xs text-slate-400">
                  Ogni volta che un veicolo noleggiato viene chiuso, viene inserito qui per una pulizia interna, esterna o igienizzazione programmata prima della consegna successiva.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Attesa */}
                <div className="bg-[#0A0D18] p-4.5 rounded-2xl border border-slate-900 space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">1. IN ATTESA DI LAVAGGIO</span>
                    <span className="bg-slate-900 text-slate-400 px-2 py-0.5 rounded-lg text-[10px] font-bold">
                      {washTasks.filter(w => w.status === 'Attesa').length}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {washTasks.filter(w => w.status === 'Attesa').map(w => (
                      <div key={w.id} className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3.5 text-left">
                        <div>
                          <h4 className="text-xs font-bold text-white">{w.vehicleName}</h4>
                          <span className="text-[10px] font-mono text-slate-500 block">Targa: {w.plate} • Tipo: <strong className="text-cyan-400 font-bold">{w.type}</strong></span>
                        </div>
                        <div className="flex justify-between items-center text-[10px] text-slate-400">
                          <span>Stato: Lavaggio pendente</span>
                          <button
                            onClick={() => handleUpdateWash(w.id, 'In Corso')}
                            className="px-3 py-1 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold rounded-lg text-[10px] cursor-pointer"
                          >
                            Inizia Lavaggio
                          </button>
                        </div>
                      </div>
                    ))}
                    {washTasks.filter(w => w.status === 'Attesa').length === 0 && (
                      <p className="text-slate-600 text-xs py-4 text-center">Nessun veicolo in coda di attesa.</p>
                    )}
                  </div>
                </div>

                {/* In Corso */}
                <div className="bg-[#0A0D18] p-4.5 rounded-2xl border border-slate-900 space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">2. IN LAVAGGIO CORSO</span>
                    <span className="bg-cyan-950 text-cyan-400 px-2 py-0.5 rounded-lg text-[10px] font-bold">
                      {washTasks.filter(w => w.status === 'In Corso').length}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {washTasks.filter(w => w.status === 'In Corso').map(w => (
                      <div key={w.id} className="p-4 bg-slate-950 border border-cyan-500/10 rounded-xl space-y-3.5 text-left">
                        <div>
                          <div className="flex justify-between items-center">
                            <h4 className="text-xs font-bold text-white">{w.vehicleName}</h4>
                            <span className="text-[10px] font-mono text-cyan-400 font-extrabold animate-pulse">~ {w.timeRemaining} min</span>
                          </div>
                          <span className="text-[10px] font-mono text-slate-500 block">Targa: {w.plate} • Sanificazione attiva</span>
                        </div>
                        <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                          <div className="bg-cyan-500 h-full animate-pulse" style={{ width: '65%' }} />
                        </div>
                        <div className="flex justify-end">
                          <button
                            onClick={() => handleUpdateWash(w.id, 'Pronto')}
                            className="px-3 py-1 bg-[#00C884] hover:bg-[#00b577] text-white font-bold rounded-lg text-[10px] cursor-pointer"
                          >
                            Segna Pronto
                          </button>
                        </div>
                      </div>
                    ))}
                    {washTasks.filter(w => w.status === 'In Corso').length === 0 && (
                      <p className="text-slate-600 text-xs py-4 text-center">Nessun veicolo attualmente in lavaggio.</p>
                    )}
                  </div>
                </div>

                {/* Pronto */}
                <div className="bg-[#0A0D18] p-4.5 rounded-2xl border border-slate-900 space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">3. PRONTO PER LA CONSEGNA</span>
                    <span className="bg-emerald-950 text-[#00C884] px-2 py-0.5 rounded-lg text-[10px] font-bold">
                      {washTasks.filter(w => w.status === 'Pronto').length}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {washTasks.filter(w => w.status === 'Pronto').map(w => (
                      <div key={w.id} className="p-4 bg-slate-950 border border-emerald-500/10 rounded-xl space-y-3.5 text-left">
                        <div>
                          <h4 className="text-xs font-bold text-slate-200">{w.vehicleName}</h4>
                          <span className="text-[10px] font-mono text-emerald-400 block font-bold">✓ IGIENIZZATO AL 100% (READY)</span>
                        </div>
                        <p className="text-[10px] text-slate-400 leading-relaxed font-light">
                          Igienizzazione interna ad ozono completata, controllo pressione pneumatici e livello carburante eseguito.
                        </p>
                        <button
                          onClick={() => handleReleaseWashedVehicle(w.id, w.plate)}
                          className="w-full text-center py-2 bg-emerald-500/10 hover:bg-emerald-505 hover:bg-emerald-500 text-[#00C884] hover:text-slate-950 font-bold rounded-lg text-[10px] transition cursor-pointer"
                        >
                          Rilascia in flotta
                        </button>
                      </div>
                    ))}
                    {washTasks.filter(w => w.status === 'Pronto').length === 0 && (
                      <p className="text-slate-600 text-xs py-4 text-center">Nessun veicolo pronto per il rilascio flotta.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB PORT: FLOTTA */}
          {activeTab === 'flotta' && (
            <div className="space-y-6 text-left animate-fade-in">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#0A0D18] p-5 rounded-2xl border border-slate-900">
                <div>
                  <h3 className="text-base font-bold text-white">Parco Veicoli Dubai Rent 7</h3>
                  <p className="text-xs text-slate-400">Verifica i livelli, le scadenze (Assicurazione, Bollo, Revisione) e lo stato operativo in tempo reale.</p>
                </div>
                <button 
                  onClick={() => setShowAddVehicleForm(!showAddVehicleForm)}
                  className="px-4 py-2.5 bg-gradient-to-r from-cyan-600 to-cyan-500 text-slate-950 hover:from-cyan-500 hover:to-cyan-400 font-bold rounded-xl text-xs flex items-center gap-1.5 transition"
                >
                  <Plus className="w-4 h-4 text-slate-950" /> Registra Veicolo
                </button>
              </div>

              {/* Add Vehicle Drawer form */}
              {showAddVehicleForm && (
                <form onSubmit={handleCreateVehicle} className="p-5 bg-[#0A0D18] border border-slate-800 rounded-2xl space-y-4">
                  <div className="text-xs font-bold text-cyan-400 uppercase font-mono mb-2">Aggiungi Nuova Vettura Flotta</div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Marca / Produttore *</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="es: Ferrari, Lamborghini" 
                        value={newVehicle.brand}
                        onChange={(e) => setNewVehicle({ ...newVehicle, brand: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white" 
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Modello Veicolo *</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="es: F8 Tributo, Urus" 
                        value={newVehicle.model}
                        onChange={(e) => setNewVehicle({ ...newVehicle, model: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white" 
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Numero Targa / ID *</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="es: DXB-809, EH123ZZ" 
                        value={newVehicle.plate}
                        onChange={(e) => setNewVehicle({ ...newVehicle, plate: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white font-mono uppercase" 
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Prezzo Giornaliero (€) *</label>
                      <input 
                        type="number" 
                        required 
                        min="1"
                        value={newVehicle.costPerDay}
                        onChange={(e) => setNewVehicle({ ...newVehicle, costPerDay: Number(e.target.value) })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white" 
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Tipo Prossima Scadenza</label>
                      <select 
                        value={newVehicle.deadlineType}
                        onChange={(e) => setNewVehicle({ ...newVehicle, deadlineType: e.target.value as any })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white"
                      >
                        <option value="Assicurazione">Assicurazione</option>
                        <option value="Bollo">Bollo</option>
                        <option value="Revisione">Revisione</option>
                        <option value="Tagliando">Tagliando</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Distanza Prossima Scadenza</label>
                      <input 
                        type="text" 
                        value={newVehicle.upcomingDeadline}
                        onChange={(e) => setNewVehicle({ ...newVehicle, upcomingDeadline: e.target.value })}
                        placeholder="es: 18 Ago 2026"
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white" 
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button 
                      type="button" 
                      onClick={() => setShowAddVehicleForm(false)}
                      className="px-3.5 py-2 bg-slate-900 border border-slate-800 text-slate-400 text-xs rounded-xl"
                    >
                      Annulla
                    </button>
                    <button 
                      type="submit" 
                      className="px-4 py-2 bg-[#00C884] text-slate-950 font-bold text-xs rounded-xl"
                    >
                      Registra Vettura
                    </button>
                  </div>
                </form>
              )}

              {/* Fleet Vehicles Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {vehicles.map(v => (
                  <div key={v.id} className="bg-[#0A0D18] border border-slate-900 rounded-2xl p-5 space-y-4 flex flex-col justify-between hover:border-slate-800 transition">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-500 font-mono tracking-wider">Flotta Dubai</span>
                        <h4 className="text-base font-bold text-white mt-0.5">{v.brand} <span className="text-cyan-400 font-medium">{v.model}</span></h4>
                        <span className="inline-block mt-1.5 font-mono text-[10px] bg-slate-950 text-slate-400 border border-slate-900 px-2 py-0.5 rounded font-bold">
                          {v.plate}
                        </span>
                      </div>
                      <button
                        onClick={() => handleDeleteVehicle(v.id)}
                        className="text-slate-500 hover:text-red-400 p-1.5 hover:bg-red-500/10 rounded-lg transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="space-y-2.5 bg-slate-950 p-3 rounded-xl border border-slate-900">
                      <div className="flex justify-between text-[11px] text-slate-400">
                        <span>Carburante / Batteria</span>
                        <span className="font-mono font-bold text-white">{v.fuelLevel}%</span>
                      </div>
                      <div className="w-full bg-slate-900 h-1 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${v.fuelLevel > 50 ? 'bg-[#00C884]' : v.fuelLevel > 20 ? 'bg-amber-400' : 'bg-red-500'}`} 
                          style={{ width: `${v.fuelLevel}%` }} 
                        />
                      </div>
                      <div className="flex justify-between text-[10px] text-slate-500 font-mono pt-1">
                        <span>Chilometri: {v.mileage.toLocaleString()} km</span>
                        <span>€ {v.costPerDay}/giorno</span>
                      </div>
                    </div>

                    {/* Deadline Section */}
                    <div className="flex justify-between items-center text-[11px] bg-slate-900/60 p-2 rounded-lg border border-slate-950">
                      <span className="text-slate-450">{v.deadlineType}:</span>
                      <span className={`font-mono font-bold ${v.upcomingDeadline === 'Oggi' ? 'text-red-400 animate-pulse' : 'text-slate-400'}`}>
                        {v.upcomingDeadline}
                      </span>
                    </div>

                    {/* Status Selectors */}
                    <div className="flex gap-1.5 pt-1">
                      <button
                        onClick={() => {
                          const updated = vehicles.map(x => x.id === v.id ? { ...x, status: 'available' as const } : x);
                          saveVehiclesDirect(updated);
                        }}
                        className={`flex-1 text-[10px] font-bold py-1.5 rounded-lg transition ${v.status === 'available' ? 'bg-[#00C884]/20 text-[#00C884] border border-[#00C884]/30' : 'bg-slate-900 text-slate-500 hover:text-white'}`}
                      >
                        Libero
                      </button>
                      <button
                        onClick={() => {
                          const updated = vehicles.map(x => x.id === v.id ? { ...x, status: 'rented' as const } : x);
                          saveVehiclesDirect(updated);
                        }}
                        className={`flex-1 text-[10px] font-bold py-1.5 rounded-lg transition ${v.status === 'rented' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'bg-slate-900 text-slate-500 hover:text-white'}`}
                      >
                        In Corsa
                      </button>
                      <button
                        onClick={() => {
                          const updated = vehicles.map(x => x.id === v.id ? { ...x, status: 'maintenance' as const } : x);
                          saveVehiclesDirect(updated);
                        }}
                        className={`flex-1 text-[10px] font-bold py-1.5 rounded-lg transition ${v.status === 'maintenance' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-slate-900 text-slate-500 hover:text-white'}`}
                      >
                        Stop
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB PORT: CLIENTI */}
          {activeTab === 'clienti' && (
            <div className="space-y-6 text-left">
              <div className="bg-[#0A0D18] p-5 rounded-2xl border border-slate-900">
                <h3 className="text-base font-bold text-white font-sans">CRM - Archivio Clienti VIP e Relazioni</h3>
                <p className="text-xs text-slate-400 font-light">Mappa dei contatti regolari, storico preferenze e solvibilità aziendale.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                {/* Active Leads Inbox */}
                <div className="md:col-span-8 bg-[#0A0D18] border border-slate-900 rounded-2xl p-5 md:p-6 space-y-4">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Users className="w-4 h-4 text-cyan-400" />
                    Richieste Lead capturing Ricevute
                  </h4>
                  
                  <div className="space-y-3.5 max-h-[500px] overflow-y-auto">
                    {leads.filter(l => l.status === 'pending').map(l => (
                      <div key={l.id} className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3 hover:border-slate-800 transition">
                        <div className="flex justify-between items-start">
                          <div>
                            <strong className="text-xs text-white block">{l.name}</strong>
                            <p className="text-[10px] text-slate-450 font-mono mt-0.5">{l.company} • Tel: {l.phone}</p>
                          </div>
                          <span className="text-[9.5px] bg-[#38bdf8]/15 text-[#38bdf8] px-2.0 py-0.5 rounded border border-[#38bdf8]/15 font-mono">
                            Dimensione Flotta: {l.size} vetture
                          </span>
                        </div>
                        <div className="p-2.5 bg-slate-900/60 rounded-lg text-xs border border-slate-900 text-slate-400 leading-relaxed italic">
                          "{l.painPoint === 'prospects_dispersion' && 'Dati di flotta e contratti sparsi tra carte e file excel'}"
                          "{l.painPoint === 'oublis_relances' && 'Difficoltà a coordinare ricarichi, lavaggi e rientri auto'}"
                          "{l.painPoint === 'manque_visibilite' && 'Mancanza di statistiche di rendimento e flussi di cassa'}"
                          "{l.painPoint === 'perte_temps_admin' && 'Troppe telefonate e moduli contrattuali scritti a mano'}"
                        </div>
                        <div className="flex gap-2 text-[10px] font-bold">
                          <button
                            onClick={() => {
                              setSelectedLead(l);
                              setShowContactModal(true);
                              setMessageSentId(null);
                            }}
                            className="flex-1 py-1.5 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 hover:text-white rounded-lg border border-cyan-500/20 cursor-pointer transition flex items-center justify-center gap-1"
                          >
                            <Send className="w-3 h-3" /> Gestisci Trattativa
                          </button>
                          <button
                            onClick={() => handleArchiveLead(l.id)}
                            className="bg-slate-900 hover:bg-slate-800 hover:text-white text-slate-400 px-3 py-1.5 rounded-lg border border-slate-800 cursor-pointer"
                          >
                            Contattato & Archivia
                          </button>
                        </div>
                      </div>
                    ))}

                    {leads.filter(l => l.status === 'pending').length === 0 && (
                      <div className="text-center py-10 border border-dashed border-slate-800 rounded-xl">
                        <p className="text-slate-600 text-xs font-mono">Nessun lead attivo da ricontattare.</p>
                        <p className="text-[10px] text-slate-500 mt-1 max-w-sm mx-auto leading-relaxed">
                          Tutte le pendenze di lead captcha sono state processate o convertite legalmente su dr7ai.com.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* VIP Customers list */}
                <div className="md:col-span-4 bg-[#0A0D18] border border-slate-900 rounded-2xl p-5 space-y-4">
                  <h4 className="text-sm font-bold text-white">VIP Luxury Club Members</h4>
                  <div className="space-y-3.5">
                    <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs space-y-1.5">
                      <span className="text-[9px] font-bold text-[#00C884] uppercase font-mono">FASCIA SUPREME VIP</span>
                      <p className="font-bold text-white">S. Sherif Al Maktoum</p>
                      <p className="text-[10px] text-slate-400 line-clamp-2">Predilige vetture Giallo carbonio (Lamborghini), richiede autista personale NCC bilingue.</p>
                    </div>
                    <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs space-y-1.5">
                      <span className="text-[9px] font-bold text-[#00C884] uppercase font-mono">CLIENTE REGOLARE NCC</span>
                      <p className="font-bold text-white">Emirates Travel Services</p>
                      <p className="text-[10px] text-slate-400">Pianifica 3 furgoni Classe V Mercedes a settimana, fatturazione differita fine mese SDI.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB PORT: MARKETING */}
          {activeTab === 'marketing' && (
            <div className="space-y-6 text-left">
              <div className="bg-[#0A0D18] p-5 rounded-2xl border border-slate-900">
                <h3 className="text-base font-bold text-white">SMS & WhatsApp Relance Automation</h3>
                <p className="text-xs text-slate-400 font-light">Invia messaggi automatici con proposte promozionali o solleciti per massimizzare il tasso di rientro.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#0A0D18] p-5 rounded-2xl border border-slate-900 space-y-4">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Megaphone className="w-4 h-4 text-indigo-400" />
                    Campagne Promozionali Supercar
                  </h4>
                  <div className="space-y-3">
                    <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                      <div className="flex justify-between items-center text-[11px] font-bold text-indigo-400 uppercase font-mono">
                        <span>Weekend Supercar Luxury</span>
                        <span>Frenesia 15% sconto</span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed font-light">
                        Campagna bulk inviata via SMS WhatsApp a tutti i clienti VIP che hanno noleggiato una Lamborghini o Ferrari nell'ultimo anno.
                      </p>
                      <button 
                        onClick={() => alert("Campagna bulk preparata! 182 destinatari inviati con successo in lista di coda.")}
                        className="py-1.5 px-3 bg-indigo-650/15 hover:bg-indigo-650 text-indigo-400 hover:text-white rounded-lg text-xs font-bold transition cursor-pointer"
                      >
                        Invia a 124 VIP
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-[#0A0D18] p-5 rounded-2xl border border-slate-900 text-left space-y-4">
                  <h4 className="text-sm font-bold text-white">Statistiche Tasso Conversione</h4>
                  <div className="space-y-4">
                    <div className="bg-slate-950 p-4.5 rounded-xl border border-slate-800">
                      <span className="text-[10px] uppercase font-bold text-slate-500 block font-mono">Click rate medio campagna</span>
                      <strong className="text-2xl font-black font-mono text-white mt-1 block">42.4 %</strong>
                      <div className="w-full bg-slate-900 h-1 mt-2.5 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-500" style={{ width: '42%' }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB PORT: REPORT */}
          {activeTab === 'report' && (
            <div className="space-y-6 text-left">
              <div className="bg-[#0A0D18] p-5 rounded-2xl border border-slate-900">
                <h3 className="text-base font-bold text-white">Analisi Ricavi e KPI Operativi</h3>
                <p className="text-xs text-slate-400 font-light">Monitoraggio dei margini operativi, tassi di occupazione flotta e andamento del noleggio.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#0A0D18] p-5 rounded-2xl border border-slate-900 space-y-4">
                  <h4 className="text-sm font-bold text-white">Fatturato Mensile per Categoria</h4>
                  <div className="space-y-3.5">
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-white">
                        <span>Autonoleggio Supercar Luxury (Ferrari / Lamborghini)</span>
                        <span className="font-mono font-bold text-[#00C884]">€ 32.500 (68%)</span>
                      </div>
                      <div className="w-full bg-slate-950 h-2.5 rounded-lg overflow-hidden border border-slate-900">
                        <div className="bg-[#00C884] h-full" style={{ width: '68%' }} />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-white">
                        <span>Furgoni NCC & Driver Classe V Mercedes</span>
                        <span className="font-mono font-bold text-cyan-400">€ 11.200 (23%)</span>
                      </div>
                      <div className="w-full bg-slate-950 h-2.5 rounded-lg overflow-hidden border border-slate-900">
                        <div className="bg-cyan-500 h-full" style={{ width: '23%' }} />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-white">
                        <span>Retail & Business Sedan (Model Y / Audi RS6)</span>
                        <span className="font-mono font-bold text-indigo-400">€ 4.540 (9%)</span>
                      </div>
                      <div className="w-full bg-slate-950 h-2.5 rounded-lg overflow-hidden border border-slate-900">
                        <div className="bg-indigo-500 h-full" style={{ width: '9%' }} />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#0A0D18] p-5 rounded-2xl border border-slate-900 space-y-4">
                  <h4 className="text-sm font-bold text-white">Massimi Fatturatori per Veicolo</h4>
                  <div className="space-y-2.5 text-xs">
                    <div className="flex justify-between items-center p-3.5 bg-slate-950 border border-slate-800 rounded-xl">
                      <strong>Ferrari F8 Tributo</strong>
                      <span className="font-mono text-[#00C884] font-bold font-mono text-right">€ 28.300 / mese</span>
                    </div>
                    <div className="flex justify-between items-center p-3.5 bg-slate-950 border border-slate-800 rounded-xl">
                      <strong>Rolls-Royce Ghost Series II</strong>
                      <span className="font-mono text-[#00C884] font-bold font-mono text-right">€ 18.500 / mese</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB PORT: AMMINISTRAZIONE */}
          {activeTab === 'amministrazione' && (
            <div className="space-y-6 text-left">
              <div className="bg-[#0A0D18] p-5 rounded-2xl border border-slate-900">
                <h3 className="text-base font-bold text-white">Fatturazione Elettronica SDI e Pre-autorizzazioni</h3>
                <p className="text-xs text-slate-400 font-light">Spedizione fatture all'Agenzia delle Entrate SDI, gestione depositi e cauzioni bancarie.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* SDI Queue */}
                <div className="bg-[#0A0D18] p-5 rounded-2xl border border-slate-900 space-y-4">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-rose-450 text-rose-400" />
                    Fatture Elettroniche in Coda SDI
                  </h4>
                  <div className="space-y-3 Text-xs text-left">
                    <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
                      <div>
                        <p className="font-bold text-white">Fattura Elettronica #F-1029</p>
                        <p className="text-[10px] text-slate-500 font-mono">Emirates Travel srl • SDI: 128YUJ • Conforme</p>
                      </div>
                      <span className="text-[10px] font-mono bg-emerald-950 text-[#00C884] px-2 py-0.5 rounded font-bold">✓ TRASMESSA</span>
                    </div>
                    <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
                      <div>
                        <p className="font-bold text-white">Fattura Elettronica #F-1030</p>
                        <p className="text-[10px] text-slate-500 font-mono">Klaus G. • ID: #W902JJ • Generato OTP SMS</p>
                      </div>
                      <span className="text-[10px] font-mono bg-amber-950 text-amber-500 px-2 py-0.5 rounded font-bold">PROCESSO</span>
                    </div>
                  </div>
                </div>

                {/* Pre-authorizations vault */}
                <div className="bg-[#0A0D18] p-5 rounded-2xl border border-slate-900 space-y-4">
                  <h4 className="text-sm font-bold text-white">Depositi Cauzionali Bloccati (Banca Sella POS)</h4>
                  <div className="space-y-3.5">
                    <div className="p-3.5 bg-slate-950 border border-slate-950 rounded-xl flex justify-between items-center">
                      <div>
                        <p className="font-bold text-white">Deposito Ferrari F8 Tributo</p>
                        <p className="text-[10px] text-slate-500 font-mono font-bold text-[#00C884]">Visa Platinuum • BLOCCATO</p>
                      </div>
                      <strong className="text-slate-200 font-mono">€ 5.000,00</strong>
                    </div>
                    <div className="p-3.5 bg-slate-950 border border-slate-950 rounded-xl flex justify-between items-center">
                      <div>
                        <p className="font-bold text-white">Deposito Lamborghini Huracán</p>
                        <p className="text-[10px] text-slate-500 font-mono text-amber-400 font-bold">Amex Centurion • CONTROLLO DANNI</p>
                      </div>
                      <strong className="text-slate-200 font-mono">€ 4.500,00</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB PORT: CENTRALINA PRO */}
          {activeTab === 'centralina-pro' && (
            <div className="space-y-6 text-left">
              <div className="bg-[#0A0D18] p-5 rounded-2xl border border-slate-900">
                <h3 className="text-base font-bold text-white">Centralina Pro IoT - Telemetria e Localizzazione</h3>
                <p className="text-xs text-slate-400 font-light">Tracciamento satellitare GPS, controllo remoto motore e blocco avviamento d'emergenza.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                {/* Simulated Telemetry list */}
                <div className="md:col-span-8 bg-[#0A0D18] border border-slate-900 rounded-2xl p-5 md:p-6 space-y-4">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Zap className="w-4 h-4 text-amber-400" />
                    Stato Satellitare Veicoli Attivi
                  </h4>

                  <div className="space-y-3">
                    <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3.5">
                      <div className="text-left">
                        <strong className="text-xs text-white block">Mercedes-AMG G63 V8 (Targa: DXB-701)</strong>
                        <p className="text-[10.5px] text-slate-500 font-mono mt-0.5">Velocità: <span className="text-[#00C884] font-bold">112 km/h</span> • Giri Motore: 2,400 rpm • Lat: 45.464 • Lon: 9.190 (Milano Centro)</p>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-500/20 px-2 py-1 rounded-md font-mono font-bold">CONSIGLIATO OK</span>
                        <button 
                          onClick={() => alert("Comando blocco motore preparato. In attesa di OTP del proprietario per procedere di sicurezza.")}
                          className="px-2.5 py-1 bg-red-950/20 hover:bg-red-900 text-red-400 hover:text-white rounded-lg text-[10px] border border-red-500/10 font-bold transition cursor-pointer"
                        >
                          Spegni Motore
                        </button>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3.5">
                      <div className="text-left">
                        <strong className="text-xs text-white block">Rolls-Royce Ghost Series II (Targa: DXB-705)</strong>
                        <p className="text-[10.5px] text-slate-500 font-mono mt-0.5">Velocità: <span className="text-amber-500 font-bold">Stazionario (Motore Acceso)</span> • Carburante: 60% • Località: Malpensa Terminal 1</p>
                      </div>
                      <div>
                        <span className="text-[10px] bg-[#38bdf8]/15 text-[#38bdf8] border border-[#38bdf8]/20 px-20 py-1.5 rounded-lg font-mono font-bold">MOTORE ON</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cyber Security Status */}
                <div className="md:col-span-4 bg-[#0A0D18] border border-slate-900 rounded-2xl p-5 space-y-4">
                  <h4 className="text-sm font-bold text-white">Stato Connessioni IoT</h4>
                  <div className="p-4 bg-slate-950 rounded-xl space-y-2.5 text-xs text-left">
                    <div className="flex justify-between">
                      <span className="text-slate-450">Centraline Attive:</span>
                      <strong className="text-slate-100">6 / 6 online</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-450">Crittografia Local:</span>
                      <strong className="text-[#00C884]">AES-256 AES Sec</strong>
                    </div>
                    <p className="text-[10px] text-slate-500 leading-relaxed pt-2 border-t border-slate-800">
                      Tutte le auto di lusso dispongono di localizzazione satellitare integrata con la centrale allarmi Dubai Rent 7.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB PORT: SITO */}
          {activeTab === 'sito' && (
            <div className="space-y-6 text-left animate-fade-in">
              <div className="bg-[#0A0D18] p-5 rounded-2xl border border-slate-900">
                <h3 className="text-base font-bold text-white font-sans">Landing Portal & Configuration</h3>
                <p className="text-xs text-slate-400 font-light">Controlla l'avanzamento tecnologico e la visibilità del sito ufficiale dr7ai.com.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#0A0D18] p-5 rounded-2xl border border-slate-900 space-y-3.5">
                  <h4 className="text-sm font-bold text-white">Stato Server del Portale</h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="text-slate-400">Dominio registrato:</span>
                      <strong className="text-white">dr7ai.com (SSL Attivo)</strong>
                    </div>
                    <div className="flex justify-between p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <span className="text-slate-400">Server Status:</span>
                      <strong className="text-[#00C884]">OPERATIVO (100% Uptime)</strong>
                    </div>
                  </div>
                </div>

                <div className="bg-[#0A0D18] p-5 rounded-2xl border border-slate-900 space-y-3.5">
                  <h4 className="text-sm font-bold text-white">Lead capture statistiche</h4>
                  <div className="p-4 bg-slate-950 rounded-xl text-xs space-y-1.5">
                    <p className="text-slate-400">Moduli compilati nelle ultime 24 ore: <strong>{leads.length} demo richieste</strong></p>
                    <p className="text-[10px] text-slate-550 text-slate-500 leading-relaxed">
                      Ciascuna richiesta compilata dalla Landing viene reindirizzata istantaneamente sulla sezione "Clienti" ed evidenziata con una notifica sonora all'interno della dashboard di Ophélie.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB PORT: TRUSTERA */}
          {activeTab === 'trustera' && (
            <div className="space-y-6 text-left">
              <div className="bg-[#0A0D18] p-5 rounded-2xl border border-slate-900">
                <h3 className="text-base font-bold text-white">Trustera KYC - Verifica dell'Identità</h3>
                <p className="text-xs text-slate-400 font-light">Analisi forense e verifica KYC di patenti d'identità, visti di soggiorno e firma OTP dei contratti.</p>
              </div>

              <div className="bg-[#0A0D18] border border-slate-900 rounded-2xl overflow-hidden text-xs">
                <div className="p-4 bg-slate-950 font-bold text-slate-400 border-b border-slate-900 uppercase font-mono">
                  Documenti Conducente sottomessi per l'Approvazione
                </div>
                <div className="divide-y divide-slate-900 text-left">
                  {documents.map(d => (
                    <div key={d.id} className="p-4.5 flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:bg-slate-900/10 transition">
                      <div className="space-y-1">
                        <strong className="text-sm font-bold text-white block">{d.clientName}</strong>
                        <p className="text-[10.5px] text-slate-500 font-mono">Tipo: <span className="text-cyan-400 font-bold">{d.documentType} ({d.country})</span> • ID Scansione: #{d.id.toUpperCase()}</p>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono ${d.status === 'approved' ? 'bg-emerald-950 text-emerald-400' : d.status === 'pending' ? 'bg-amber-950 text-amber-500 animate-pulse' : 'bg-red-950 text-red-400'}`}>
                          {d.status === 'approved' ? 'APPROVATO OK' : d.status === 'pending' ? 'IN ATTESA MANUAL REW' : 'DECLINATO'}
                        </span>

                        {d.status === 'pending' && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleToggleDocumentStatus(d.id, 'approved')}
                              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold rounded-lg text-[10px] transition cursor-pointer"
                            >
                              Approva Documento
                            </button>
                            <button
                              onClick={() => handleToggleDocumentStatus(d.id, 'rejected')}
                              className="px-3 py-1.5 bg-red-650/15 hover:bg-red-600 text-red-400 text-[10px] rounded-lg transition cursor-pointer"
                            >
                              Declina
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB PORT: EMTN */}
          {activeTab === 'emtn' && (
            <div className="space-y-6 text-left">
              <div className="bg-[#0A0D18] p-5 rounded-2xl border border-slate-900">
                <h3 className="text-base font-bold text-white">E.M.T.N. Clearance Internazionale</h3>
                <p className="text-xs text-[#6E6E73] text-slate-450 font-light">
                  Abilitazione dei veicoli Dubai Rent per l'attraversamento delle frontiere e dogane europee (Sconfinamento e autorizzazioni transfrontaliere conformi).
                </p>
              </div>

              <div className="bg-[#0A0D18] border border-slate-900 rounded-2xl p-5 md:p-6 space-y-4">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Route className="w-4 h-4 text-cyan-400" />
                  Pass Transfrontalieri Autorizzati
                </h4>

                <div className="divide-y divide-slate-900">
                  {emtnPasses.map(ep => (
                    <div key={ep.id} className="py-4.5 flex items-center justify-between gap-4">
                      <div>
                        <strong className="text-sm text-slate-200">{ep.vehicleName}</strong>
                        <p className="text-[10.5px] text-slate-500 font-mono mt-0.5">Targa: {ep.plate} • Destinazione: <strong className="text-slate-400">{ep.destinationCountry}</strong></p>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full ${ep.approved ? 'bg-emerald-950 text-[#00C884]' : 'bg-red-950 text-red-400'}`}>
                          {ep.approved ? 'AUTORIZZATO' : 'CANCELLATO / IN ATTESA'}
                        </span>
                        <button
                          onClick={() => handleToggleEmtn(ep.id)}
                          className="px-3 py-1.5 bg-slate-950 hover:bg-slate-900 text-slate-400 rounded-lg text-[10px] transition font-mono"
                        >
                          Inverti Abilitazione
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Global Footer log entry */}
        <footer className="h-10 bg-[#0A0D18] border-t border-slate-900 px-6 flex items-center justify-between text-[9px] text-slate-500 font-mono shrink-0">
          <span>Stato: 100% Connesso • dr7ai.com Secure Enterprise Gateway • Ophélie super_admin console</span>
          <span>Log: system_active // zero_errors_logged</span>
        </footer>

      </main>

      {/* 4. DIALOG POPUP MODAL: CONTACT LEADS FROM CRM */}
      {showContactModal && selectedLead && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#0A0D18] border border-slate-800 rounded-3xl p-6 max-w-md w-full relative space-y-4 text-left shadow-2xl animate-fade-in text-white">
            <h4 className="text-base font-bold text-white flex items-center gap-1.5 font-sans">
              <Send className="w-4 h-4 text-cyan-400" />
              Gestione Trattativa con {selectedLead.name}
            </h4>
            
            <p className="text-xs text-slate-450 leading-relaxed font-light">
              Invia messaggi personalizzati compilati su misura per far avanzare il cliente di <strong className="text-slate-300">{selectedLead.company}</strong> ({selectedLead.phone}).
            </p>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-2.5 leading-relaxed">
              <p className="font-mono text-[9px] font-bold text-cyan-400 tracking-wider">SMS / WHATSAPP PROPOSTA AUTOMATICA:</p>
              <p className="font-light italic">
                "Gentile {selectedLead.name}, ho esaminato la sottomissione di {selectedLead.company} su dr7ai.com. Ho visto che riscontrate ostacoli stringenti con la fatturazione SDI e le scadenze manuali dei veicoli. Vogliamo personalizzare una video demo di 10 minuti per ridurre i tempi amministrativi della tua flotta?"
              </p>
            </div>

            <div className="flex gap-2.5 justify-end pt-2">
              <button
                onClick={() => setShowContactModal(false)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-white rounded-xl text-xs"
              >
                Annulla
              </button>
              <button
                onClick={() => {
                  setMessageSentId(selectedLead.id);
                  setTimeout(() => {
                    handleArchiveLead(selectedLead.id);
                    setShowContactModal(false);
                    alert("Proposta inviata con successo via WhatsApp / SMS a " + selectedLead.name + "!");
                  }, 1500);
                }}
                disabled={messageSentId === selectedLead.id}
                className="px-5 py-2.5 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-slate-950 font-bold text-xs rounded-xl inline-flex items-center gap-2"
              >
                {messageSentId === selectedLead.id ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    Generazione link...
                  </>
                ) : (
                  <>
                    Invia WhatsApp / SMS
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. DIALOG POPUP MODAL: REGISTER BOOKING FORM */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <form onSubmit={handleCreateBooking} className="bg-[#0A0D18] border border-slate-800 rounded-3xl p-6 max-w-md w-full relative space-y-4 text-left shadow-2xl text-white">
            <h4 className="text-base font-bold text-white flex items-center gap-1.5">
              <Calendar className="w-4.5 h-4.5 text-cyan-400" />
              Registra Nuovo Contratto Noleggio
            </h4>
            
            <p className="text-xs text-slate-400 font-light leading-relaxed">
              Associa i veicoli disponibili in flotta con rientro programmato ad un cliente VIP NCC o privato.
            </p>

            <div className="space-y-3.5">
              <div>
                <label className="block text-[10px] text-slate-450 uppercase font-mono font-bold mb-1">Seleziona Veicolo Libero *</label>
                <select
                  required
                  value={newBooking.vehicleId}
                  onChange={(e) => {
                    const matched = vehicles.find(v => v.id === e.target.value);
                    setNewBooking({ 
                      ...newBooking, 
                      vehicleId: e.target.value,
                      dailyRate: matched ? matched.costPerDay : 400
                    });
                  }}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white"
                >
                  <option value="">Seleziona...</option>
                  {vehicles.filter(v => v.status === 'available').map(v => (
                    <option key={v.id} value={v.id}>{v.brand} {v.model} ({v.plate}) - € {v.costPerDay}/g</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] text-slate-450 uppercase font-mono font-bold mb-1">Nome Cliente / NCC Operator *</label>
                <input
                  type="text"
                  required
                  placeholder="es: VIP Luxury Club"
                  value={newBooking.clientName}
                  onChange={(e) => setNewBooking({ ...newBooking, clientName: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] text-slate-450 uppercase font-mono font-bold mb-1">Data Inizio *</label>
                  <input
                    type="date"
                    required
                    value={newBooking.startDate}
                    onChange={(e) => setNewBooking({ ...newBooking, startDate: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-300"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-450 uppercase font-mono font-bold mb-1">Data Consegna Rientro *</label>
                  <input
                    type="date"
                    required
                    value={newBooking.endDate}
                    onChange={(e) => setNewBooking({ ...newBooking, endDate: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] text-slate-450 uppercase font-mono font-bold mb-1">Tariffa Giornaliera Pattuita *</label>
                <input
                  type="number"
                  required
                  min="1"
                  value={newBooking.dailyRate}
                  onChange={(e) => setNewBooking({ ...newBooking, dailyRate: Number(e.target.value) })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white font-mono"
                />
              </div>
            </div>

            <div className="flex gap-2.5 justify-end pt-3">
              <button
                type="button"
                onClick={() => setShowBookingModal(false)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-400 text-xs rounded-xl"
              >
                Annulla
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-bold text-xs rounded-xl"
              >
                Registra Contratto
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 6. PASSWORD DIALOG MODAL */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <form onSubmit={handlePasswordSubmit} className="bg-[#0A0D18] border border-slate-800 rounded-3xl p-6 max-w-md w-full relative space-y-4 text-left shadow-2xl text-white">
            <h4 className="text-base font-bold text-white flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-cyan-400" />
              Cambia Password Amministratore
            </h4>
            <p className="text-xs text-slate-400 font-light leading-relaxed">
              Aggiorna le credenziali d'accesso protette del portale di Dubai Rent per l'account Ophélie.
            </p>

            <div className="space-y-3.5">
              <div>
                <label className="block text-[10px] text-slate-400 uppercase font-mono mb-1">Nuova Password *</label>
                <input 
                  type="password"
                  required 
                  placeholder="Nuova password sicura"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] text-slate-400 uppercase font-mono mb-1">Conferma Nuova Password *</label>
                <input 
                  type="password"
                  required 
                  placeholder="Ripeti la stessa password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white"
                />
              </div>
            </div>

            {passwordMsg && (
              <p className={`text-xs font-semibold ${passwordMsg.success ? 'text-emerald-400' : 'text-red-400'}`}>
                {passwordMsg.text}
              </p>
            )}

            <div className="flex gap-2.5 justify-end pt-2">
              <button
                type="button"
                onClick={() => setShowPasswordModal(false)}
                className="px-4 py-2 bg-slate-900 border border-slate-800 text-slate-450 text-xs rounded-xl"
              >
                Annulla
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-cyan-500 text-slate-950 font-bold text-xs rounded-xl"
              >
                Aggiorna Password
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 7. HOURS DIALOG MODAL */}
      {showHoursModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#0A0D18] border border-slate-800 rounded-3xl p-6 max-w-md w-full relative space-y-4 text-left shadow-2xl text-white">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-805 border-b-slate-800">
              <Clock className="w-5 h-5 text-cyan-400" />
              <h4 className="text-base font-bold text-white">I Miei Orari di Servizio</h4>
            </div>
            
            <p className="text-xs text-slate-400 leading-relaxed font-light">
              Tabella dei turni operativi pianificati per super admin <strong className="text-white">Ophélie</strong> sul portale della flotta.
            </p>

            <div className="space-y-2.5 font-mono text-xs">
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-450">Lunedì - Venerdì:</span>
                <strong className="text-slate-200">09:00 - 13:00 / 14:30 - 18:30</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-450">Sabato:</span>
                <strong className="text-amber-400">09:00 - 13:00 (Solo Reperibilità)</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-450">Domenica:</span>
                <strong className="text-red-400">CHIUSO (Allarmi Centralizzati)</strong>
              </div>
            </div>

            <div className="pt-3 text-right">
              <button
                onClick={() => setShowHoursModal(false)}
                className="px-5 py-2.5 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-300 hover:text-white rounded-xl text-xs font-semibold cursor-pointer transition-colors"
              >
                Ottimo, Chiudi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* NEW INTERACTIVE MODAL FOR "Nuovo Preventivo" (CRM SCREENSHOT 2 FEATURE) */}
      {showQuotationModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className={`w-full max-w-lg ${ts.bgCard} rounded-2xl border ${ts.borderCol} p-6 shadow-2xl space-y-5 animate-in fade-in-50 duration-200 text-left`}>
            
            <div className="flex justify-between items-center pb-2 border-b border-dashed border-slate-705 border-slate-800">
              <div>
                <span className={`text-[9px] font-bold uppercase tracking-widest ${ts.textAccent}`}>GESTIONALE CRM</span>
                <h3 className={`text-base font-bold ${ts.textTitle}`}>Registra Nuovo Preventivo</h3>
              </div>
              <button 
                onClick={() => setShowQuotationModal(false)}
                className="text-slate-450 hover:text-white p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateQuotation} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Vehicle Choice selection */}
                <div className="space-y-1.5 col-span-2">
                  <label className="text-[10px] font-bold text-slate-450 uppercase tracking-wider font-mono">SELEZIONA VEICOLO DISPONIBILE</label>
                  <select 
                    value={newQuotation.vehicleName}
                    onChange={(e) => {
                      const selName = e.target.value;
                      const matched = vehicles.find(v => `${v.brand} ${v.model}` === selName);
                      setNewQuotation({
                        ...newQuotation,
                        vehicleName: selName,
                        plate: matched ? matched.plate : 'GN296TE',
                        totalWithIva: matched ? matched.costPerDay : 879.00
                      });
                    }}
                    className={`w-full px-3 py-2.5 rounded-xl border text-xs focus:ring-1 focus:ring-cyan-500 outline-none ${
                      isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  >
                    {vehicles.map((v) => (
                      <option key={v.plate} value={`${v.brand} ${v.model}`}>
                        {v.brand} {v.model} ({v.plate}) — €{v.costPerDay}/gg
                      </option>
                    ))}
                  </select>
                </div>

                {/* Cliente VIP name */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-450 uppercase tracking-wider font-mono">NOME CLIENTE</label>
                  <input 
                    type="text"
                    required
                    placeholder="Es: Lorenzo Magnifico"
                    value={newQuotation.clientName}
                    onChange={(e) => setNewQuotation({ ...newQuotation, clientName: e.target.value })}
                    className={`w-full px-3 py-2 border text-xs rounded-xl focus:ring-1 outline-none ${
                      isDark ? 'bg-slate-900 border-slate-800 text-white focus:border-cyan-500' : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-indigo-500'
                    }`}
                  />
                </div>

                {/* Cliente Phone */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-450 uppercase tracking-wider font-mono">TELEFONO / WHATSAPP</label>
                  <input 
                    type="tel"
                    required
                    placeholder="Es: +39 333 456 7890"
                    value={newQuotation.clientPhone}
                    onChange={(e) => setNewQuotation({ ...newQuotation, clientPhone: e.target.value })}
                    className={`w-full px-3 py-2 border text-xs rounded-xl focus:ring-1 outline-none ${
                      isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  />
                </div>

                {/* Start Date */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-450 uppercase tracking-wider font-mono">DATA INIZIO RITIRO</label>
                  <input 
                    type="date"
                    required
                    value={newQuotation.startDate}
                    onChange={(e) => setNewQuotation({ ...newQuotation, startDate: e.target.value })}
                    className={`w-full px-3 py-2 border text-xs rounded-xl focus:ring-1 outline-none ${
                      isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  />
                </div>

                {/* End Date */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-450 uppercase tracking-wider font-mono">DATA RICONSEGNA FINE</label>
                  <input 
                    type="date"
                    required
                    value={newQuotation.endDate}
                    onChange={(e) => setNewQuotation({ ...newQuotation, endDate: e.target.value })}
                    className={`w-full px-3 py-2 border text-xs rounded-xl focus:ring-1 outline-none ${
                      isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  />
                </div>

                {/* Price (derived or overridable) */}
                <div className="space-y-1.5 col-span-2">
                  <div className="flex justify-between items-center text-[10px] font-bold text-slate-450 uppercase tracking-wider font-mono">
                    <span>PREVENTIVO TOTALE CON IVA (EUR)</span>
                    <span className="text-slate-400">Durata: {newQuotation.durationDays} giorni</span>
                  </div>
                  <div className="relative">
                    <span className="absolute left-3.5 top-2.5 text-xs text-slate-450 font-mono">€</span>
                    <input 
                      type="number"
                      required
                      placeholder="879.0"
                      value={newQuotation.totalWithIva}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value) || 0;
                        setNewQuotation({ ...newQuotation, totalWithIva: val });
                      }}
                      className={`w-full pl-8 pr-4 py-2 border text-xs rounded-xl focus:ring-1 outline-none ${
                        isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-800'
                      }`}
                    />
                  </div>
                </div>

                {/* Initial Status draft vs sent */}
                <div className="space-y-1.5 col-span-2">
                  <label className="text-[10px] font-bold text-slate-450 uppercase tracking-wider font-mono">STATO INIZIALE</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setNewQuotation({ ...newQuotation, status: 'bozza' })}
                      className={`px-4 py-2.5 rounded-xl text-xs font-semibold border transition ${
                        newQuotation.status === 'bozza'
                          ? `border-slate-400 bg-slate-105 ${isDark ? 'bg-slate-800 text-white' : 'bg-slate-200 text-slate-900'}`
                          : 'border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      Bozza (Salva Locale)
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewQuotation({ ...newQuotation, status: 'inviato' })}
                      className={`px-4 py-2.5 rounded-xl text-xs font-semibold border transition ${
                        newQuotation.status === 'inviato'
                          ? `${ts.bgAccentAlpha} ${ts.textAccent} border-cyan-500`
                          : 'border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      Inviato (Pronto all'invio)
                    </button>
                  </div>
                </div>

              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowQuotationModal(false)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold border transition ${
                    isDark ? 'border-slate-800 text-slate-400 hover:text-white' : 'border-slate-200 text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Annulla
                </button>
                <button
                  type="submit"
                  className={`px-5 py-2 rounded-xl text-xs font-bold text-slate-950 transition uppercase tracking-wider bg-gradient-to-r ${ts.gradientAccent}`}
                >
                  Salva Preventivo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
