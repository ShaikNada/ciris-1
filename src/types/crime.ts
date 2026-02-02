export interface FIR {
  id: string;
  firNumber: string;
  dateTime: string;
  crimeType: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'investigating' | 'solved' | 'closed';
  location: string;
  district: string;
  complainant: string;
  description: string;
  assignedOfficer: string;
  evidenceCount: number;
}

export interface Evidence {
  id: string;
  firId: string;
  type: 'document' | 'image' | 'video' | 'forensic' | 'digital';
  name: string;
  dateCollected: string;
  collectedBy: string;
  status: 'pending' | 'analyzing' | 'verified' | 'inconclusive';
  description: string;
}

export interface CrimeStats {
  totalCrimes: number;
  solvedCases: number;
  pendingCases: number;
  activeInvestigations: number;
  crimeRate: number;
  changeFromLastMonth: number;
}

export interface RegionalData {
  region: string;
  crimes: number;
  solved: number;
  pending: number;
}

export interface CrimeTrend {
  month: string;
  theft: number;
  assault: number;
  fraud: number;
  vandalism: number;
  other: number;
}

export interface Alert {
  id: string;
  type: 'warning' | 'danger' | 'info';
  title: string;
  message: string;
  timestamp: string;
  location: string;
  isRead: boolean;
}

export interface CameraFeed {
  id: string;
  name: string;
  location: string;
  status: 'online' | 'offline' | 'alert';
  lastActivity: string;
}
