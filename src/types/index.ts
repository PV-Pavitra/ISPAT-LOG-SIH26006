export type UserRole = 
  | 'ministry_director'
  | 'plant_officer'
  | 'carrier_manager';

export interface UserProfile {
  id: string;
  name: string;
  designation: string;
  organization: string;
  role: UserRole;
  avatar: string;
  badge: string;
}

export type SteelPlantId = 'BSP' | 'BSL' | 'RSP' | 'DSP' | 'ISP' | 'VSP';

export interface SteelPlant {
  id: SteelPlantId;
  name: string;
  code: string;
  location: string;
  state: string;
  primaryPort: string;
  backupPort: string;
  dailyConsumptionMT: number;
  currentStockMT: number;
  daysRemaining: number;
  status: 'critical' | 'caution' | 'optimal';
  coordinates: [number, number]; // lat, lng
}

export type RawMaterialType = 
  | 'Hard Coking Coal'
  | 'PCI Coal'
  | 'Iron Ore Pellets'
  | 'Limestone'
  | 'Dolomite';

export interface OriginPort {
  id: string;
  name: string;
  country: string;
  coordinates: [number, number];
  typicalFOBUSD: number;
  baseTransitDays: number;
}

export interface DestinationPort {
  id: string;
  name: string;
  state: string;
  coordinates: [number, number];
  handlingChargesINRPerMT: number;
  currentWaitDays: number;
  berthOccupancyPercent: number;
  vesselsInRoadstead: number;
  draftMaxMeters: number;
  railEvacuationCapacityRakesPerDay: number;
}

export type VesselStatus = 'In Transit' | 'Anchored' | 'Discharging' | 'Diverted';

export interface Vessel {
  id: string;
  imo: string;
  name: string;
  vesselClass: 'Capesize' | 'Panamax' | 'Supramax' | 'Kamsarmax';
  dwt: number;
  flag: string;
  speedKnots: number;
  heading: number;
  currentPosition: [number, number];
  origin: string;
  destination: string;
  plantDestination: SteelPlantId;
  cargoType: RawMaterialType;
  cargoMT: number;
  status: VesselStatus;
  laycanStart: string;
  laycanEnd: string;
  eta: string;
  dailyCharterRateUSD: number;
  accumulatedDemurrageUSD: number;
  routeCoordinates: [number, number][];
  routeProgress: number; // 0 to 1
  isAlert?: boolean;
  alertReason?: string;
}

export interface CarrierBid {
  id: string;
  carrierName: string;
  vesselName: string;
  vesselClass: 'Capesize' | 'Panamax' | 'Supramax' | 'Kamsarmax';
  builtYear: number;
  offeredDayRateUSD: number;
  offeredFreightPerMTUSD: number;
  score: number;
  rank: 'L1' | 'L2' | 'L3' | 'L4' | 'L5';
  rating: number;
  status: 'Pending' | 'Awarded' | 'Rejected';
  complianceStatus: 'Verified' | 'Audit Pending';
}

export interface LandedCostBreakdown {
  fobPriceUSD: number;
  oceanFreightUSD: number;
  portHandlingUSD: number;
  estimatedDemurrageUSD: number;
  inlandRailUSD: number;
  customsDutyUSD: number;
  totalLandedCostUSD: number;
  totalLandedCostINR: number;
  landedCostPerMTUSD: number;
  landedCostPerMTINR: number;
  usdInrRate: number;
  primaryPort: string;
  divertedPort?: string;
  potentialSavingsUSD?: number;
  potentialSavingsINR?: number;
}

export interface EconomicIndicator {
  id: string;
  name: string;
  symbol: string;
  value: number;
  change: number;
  changePercent: number;
  unit: string;
  description: string;
  sparkline: number[];
}

export interface MaritimeNews {
  id: string;
  title: string;
  source: string;
  timestamp: string;
  tags: string[];
  summary: string;
  urgency: 'high' | 'medium' | 'normal';
  impact: string;
}

export interface ForecastPoint {
  date: string;
  historical?: number;
  baseline: number;
  lowerBound: number;
  upperBound: number;
  bullish: number;
  disruption: number;
}

export interface HistoricalVoyageLog {
  id: string;
  voyageNo: string;
  vesselName: string;
  origin: string;
  destinationPort: string;
  steelPlant: SteelPlantId;
  cargoType: RawMaterialType;
  volumeMT: number;
  voyageDurationDays: number;
  freightPaidPerMTUSD: number;
  demurragePaidUSD: number;
  landedCostPerMTINR: number;
  carrierName: string;
  completedDate: string;
  efficiencyScore: number;
}

export interface SimulationEvent {
  id: string;
  name: string;
  description: string;
  applied: boolean;
}
