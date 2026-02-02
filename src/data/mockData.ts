import { FIR, Evidence, CrimeStats, RegionalData, CrimeTrend, Alert, CameraFeed } from '@/types/crime';

export const mockFIRs: FIR[] = [
  {
    id: '1',
    firNumber: 'FIR-2024-001234',
    dateTime: '2024-01-15T14:30:00',
    crimeType: 'Theft',
    severity: 'medium',
    status: 'investigating',
    location: '123 Main Street, Downtown',
    district: 'Central District',
    complainant: 'John Smith',
    description: 'Reported theft of electronic items from a commercial establishment during night hours.',
    assignedOfficer: 'Officer James Wilson',
    evidenceCount: 5
  },
  {
    id: '2',
    firNumber: 'FIR-2024-001235',
    dateTime: '2024-01-15T16:45:00',
    crimeType: 'Assault',
    severity: 'high',
    status: 'pending',
    location: '456 Park Avenue, Westside',
    district: 'West District',
    complainant: 'Sarah Johnson',
    description: 'Physical assault reported near the park area. Suspect fled the scene.',
    assignedOfficer: 'Officer Maria Garcia',
    evidenceCount: 3
  },
  {
    id: '3',
    firNumber: 'FIR-2024-001236',
    dateTime: '2024-01-14T09:15:00',
    crimeType: 'Fraud',
    severity: 'high',
    status: 'investigating',
    location: '789 Business Plaza, Financial District',
    district: 'Financial District',
    complainant: 'Robert Chen',
    description: 'Financial fraud involving unauthorized transactions totaling significant amounts.',
    assignedOfficer: 'Detective Michael Brown',
    evidenceCount: 12
  },
  {
    id: '4',
    firNumber: 'FIR-2024-001237',
    dateTime: '2024-01-14T11:00:00',
    crimeType: 'Vandalism',
    severity: 'low',
    status: 'solved',
    location: '321 School Lane, Education Zone',
    district: 'North District',
    complainant: 'Emily Davis',
    description: 'Property damage reported at local community center. Graffiti on walls.',
    assignedOfficer: 'Officer Lisa Thompson',
    evidenceCount: 2
  },
  {
    id: '5',
    firNumber: 'FIR-2024-001238',
    dateTime: '2024-01-13T22:30:00',
    crimeType: 'Burglary',
    severity: 'critical',
    status: 'investigating',
    location: '567 Residential Blvd, Suburbs',
    district: 'South District',
    complainant: 'David Miller',
    description: 'Home invasion during late night hours. Valuable items stolen.',
    assignedOfficer: 'Detective Amanda Foster',
    evidenceCount: 8
  },
  {
    id: '6',
    firNumber: 'FIR-2024-001239',
    dateTime: '2024-01-13T08:00:00',
    crimeType: 'Cybercrime',
    severity: 'high',
    status: 'pending',
    location: 'Online - IP traced to East District',
    district: 'Cyber Cell',
    complainant: 'Tech Solutions Inc.',
    description: 'Ransomware attack on company servers. Data encrypted and ransom demanded.',
    assignedOfficer: 'Cyber Expert Raj Patel',
    evidenceCount: 15
  }
];

export const mockEvidence: Evidence[] = [
  {
    id: '1',
    firId: '1',
    type: 'image',
    name: 'CCTV_Footage_Screenshot.jpg',
    dateCollected: '2024-01-15',
    collectedBy: 'CSI Team Alpha',
    status: 'verified',
    description: 'Screenshot from CCTV showing suspect entering the premises'
  },
  {
    id: '2',
    firId: '1',
    type: 'forensic',
    name: 'Fingerprint_Analysis_Report.pdf',
    dateCollected: '2024-01-16',
    collectedBy: 'Forensic Lab',
    status: 'analyzing',
    description: 'Fingerprint samples collected from crime scene'
  },
  {
    id: '3',
    firId: '2',
    type: 'video',
    name: 'Witness_Statement_Recording.mp4',
    dateCollected: '2024-01-15',
    collectedBy: 'Officer Garcia',
    status: 'verified',
    description: 'Video recording of witness statement'
  },
  {
    id: '4',
    firId: '3',
    type: 'digital',
    name: 'Transaction_Logs.xlsx',
    dateCollected: '2024-01-14',
    collectedBy: 'Cyber Forensics',
    status: 'analyzing',
    description: 'Digital transaction records showing fraudulent activity'
  },
  {
    id: '5',
    firId: '5',
    type: 'document',
    name: 'Insurance_Claim_Copy.pdf',
    dateCollected: '2024-01-14',
    collectedBy: 'Officer Foster',
    status: 'pending',
    description: 'Copy of insurance documents for stolen items'
  }
];

export const mockCrimeStats: CrimeStats = {
  totalCrimes: 1247,
  solvedCases: 892,
  pendingCases: 234,
  activeInvestigations: 121,
  crimeRate: 12.4,
  changeFromLastMonth: -5.2
};

export const mockRegionalData: RegionalData[] = [
  { region: 'Central District', crimes: 245, solved: 189, pending: 56 },
  { region: 'North District', crimes: 178, solved: 134, pending: 44 },
  { region: 'South District', crimes: 312, solved: 256, pending: 56 },
  { region: 'East District', crimes: 198, solved: 145, pending: 53 },
  { region: 'West District', crimes: 167, solved: 112, pending: 55 },
  { region: 'Financial District', crimes: 147, solved: 98, pending: 49 }
];

export const mockCrimeTrends: CrimeTrend[] = [
  { month: 'Jul', theft: 45, assault: 23, fraud: 34, vandalism: 12, other: 18 },
  { month: 'Aug', theft: 52, assault: 28, fraud: 29, vandalism: 15, other: 22 },
  { month: 'Sep', theft: 48, assault: 31, fraud: 38, vandalism: 18, other: 25 },
  { month: 'Oct', theft: 55, assault: 25, fraud: 42, vandalism: 14, other: 20 },
  { month: 'Nov', theft: 42, assault: 22, fraud: 35, vandalism: 11, other: 17 },
  { month: 'Dec', theft: 38, assault: 19, fraud: 28, vandalism: 9, other: 15 },
  { month: 'Jan', theft: 35, assault: 21, fraud: 32, vandalism: 10, other: 16 }
];

export const mockAlerts: Alert[] = [
  {
    id: '1',
    type: 'danger',
    title: 'Suspicious Activity Detected',
    message: 'Camera 7 detected unusual movement in restricted area',
    timestamp: '2024-01-15T18:45:00',
    location: 'Industrial Zone - Sector 4',
    isRead: false
  },
  {
    id: '2',
    type: 'warning',
    title: 'Pattern Alert',
    message: 'Increased theft reports in Downtown area over past 48 hours',
    timestamp: '2024-01-15T16:30:00',
    location: 'Central District',
    isRead: false
  },
  {
    id: '3',
    type: 'info',
    title: 'Case Update',
    message: 'FIR-2024-001234 evidence analysis completed',
    timestamp: '2024-01-15T14:00:00',
    location: 'Forensic Lab',
    isRead: true
  },
  {
    id: '4',
    type: 'danger',
    title: 'High Priority Case',
    message: 'New critical severity case reported requiring immediate attention',
    timestamp: '2024-01-15T12:15:00',
    location: 'South District',
    isRead: true
  }
];

export const mockCameraFeeds: CameraFeed[] = [
  { id: '1', name: 'CAM-001', location: 'Main Gate - Central', status: 'online', lastActivity: '2 min ago' },
  { id: '2', name: 'CAM-002', location: 'Parking Lot A', status: 'online', lastActivity: '5 min ago' },
  { id: '3', name: 'CAM-003', location: 'Bank Street Junction', status: 'alert', lastActivity: 'Now' },
  { id: '4', name: 'CAM-004', location: 'Mall Entrance', status: 'online', lastActivity: '1 min ago' },
  { id: '5', name: 'CAM-005', location: 'Industrial Zone Gate', status: 'offline', lastActivity: '2 hours ago' },
  { id: '6', name: 'CAM-006', location: 'School Zone', status: 'online', lastActivity: '3 min ago' },
  { id: '7', name: 'CAM-007', location: 'Highway Checkpoint', status: 'online', lastActivity: '1 min ago' },
  { id: '8', name: 'CAM-008', location: 'Market Square', status: 'alert', lastActivity: 'Now' }
];
