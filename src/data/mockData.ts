import { 
  UserProfile, 
  SteelPlant, 
  OriginPort, 
  DestinationPort, 
  Vessel, 
  CarrierBid, 
  EconomicIndicator, 
  MaritimeNews, 
  ForecastPoint, 
  HistoricalVoyageLog 
} from '../types';

export const USER_PROFILES: Record<string, UserProfile> = {
  ministry_director: {
    id: 'usr_01',
    name: 'Dr. Rajeshwar Sharma, IAS',
    designation: 'Director General (Procurement & Raw Material Logistics)',
    organization: 'Ministry of Steel, Govt. of India',
    role: 'ministry_director',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    badge: 'Ministry Admin'
  },
  plant_officer: {
    id: 'usr_02',
    name: 'Er. Vikramaditya Sen',
    designation: 'Chief General Manager (Inbound Raw Materials & Logistics)',
    organization: 'SAIL Bhilai Steel Plant (BSP)',
    role: 'plant_officer',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    badge: 'Plant Logistics'
  },
  carrier_manager: {
    id: 'usr_03',
    name: 'Capt. Ananya Iyer',
    designation: 'Head of Bulk Chartering & Commercial Operations',
    organization: 'Shipping Corporation of India (SCI Bulk)',
    role: 'carrier_manager',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    badge: 'Chartering Line'
  }
};

export const STEEL_PLANTS: SteelPlant[] = [
  {
    id: 'BSP',
    name: 'SAIL Bhilai Steel Plant',
    code: 'BSP',
    location: 'Bhilai, Durg',
    state: 'Chhattisgarh',
    primaryPort: 'Vizag',
    backupPort: 'Paradip',
    dailyConsumptionMT: 18500,
    currentStockMT: 314500,
    daysRemaining: 17,
    status: 'optimal',
    coordinates: [21.1938, 81.3857]
  },
  {
    id: 'BSL',
    name: 'SAIL Bokaro Steel Plant',
    code: 'BSL',
    location: 'Bokaro Steel City',
    state: 'Jharkhand',
    primaryPort: 'Paradip',
    backupPort: 'Dhamra',
    dailyConsumptionMT: 15200,
    currentStockMT: 136800,
    daysRemaining: 9,
    status: 'caution',
    coordinates: [23.6693, 86.1511]
  },
  {
    id: 'RSP',
    name: 'SAIL Rourkela Steel Plant',
    code: 'RSP',
    location: 'Rourkela, Sundargarh',
    state: 'Odisha',
    primaryPort: 'Dhamra',
    backupPort: 'Paradip',
    dailyConsumptionMT: 12400,
    currentStockMT: 235600,
    daysRemaining: 19,
    status: 'optimal',
    coordinates: [22.2257, 84.8640]
  },
  {
    id: 'DSP',
    name: 'SAIL Durgapur Steel Plant',
    code: 'DSP',
    location: 'Durgapur, Paschim Bardhaman',
    state: 'West Bengal',
    primaryPort: 'Haldia',
    backupPort: 'Dhamra',
    dailyConsumptionMT: 8900,
    currentStockMT: 115700,
    daysRemaining: 13,
    status: 'caution',
    coordinates: [23.5204, 87.3119]
  },
  {
    id: 'ISP',
    name: 'SAIL IISCO Steel Plant',
    code: 'ISP',
    location: 'Burnpur, Asansol',
    state: 'West Bengal',
    primaryPort: 'Haldia',
    backupPort: 'Paradip',
    dailyConsumptionMT: 7800,
    currentStockMT: 124800,
    daysRemaining: 16,
    status: 'optimal',
    coordinates: [23.6739, 86.9389]
  },
  {
    id: 'VSP',
    name: 'RINL Visakhapatnam Steel Plant',
    code: 'VSP',
    location: 'Visakhapatnam (Coastal)',
    state: 'Andhra Pradesh',
    primaryPort: 'Vizag',
    backupPort: 'Krishnapatnam',
    dailyConsumptionMT: 21000,
    currentStockMT: 399000,
    daysRemaining: 19,
    status: 'optimal',
    coordinates: [17.6253, 83.1818]
  }
];

export const ORIGIN_PORTS: OriginPort[] = [
  {
    id: 'AU-HPG',
    name: 'Hay Point / Gladstone',
    country: 'Australia',
    coordinates: [-21.2863, 149.2995],
    typicalFOBUSD: 242.50,
    baseTransitDays: 16
  },
  {
    id: 'ZA-RCB',
    name: 'Richards Bay Coal Terminal',
    country: 'South Africa',
    coordinates: [-28.8020, 32.0911],
    typicalFOBUSD: 118.00,
    baseTransitDays: 14
  },
  {
    id: 'ID-EKL',
    name: 'East Kalimantan (Balikpapan/Muara Berau)',
    country: 'Indonesia',
    coordinates: [-1.2692, 116.8253],
    typicalFOBUSD: 86.50,
    baseTransitDays: 7
  }
];

export const DESTINATION_PORTS: DestinationPort[] = [
  {
    id: 'IN-PRT',
    name: 'Paradip Port (PPT)',
    state: 'Odisha',
    coordinates: [20.2644, 86.6710],
    handlingChargesINRPerMT: 420,
    currentWaitDays: 5.2,
    berthOccupancyPercent: 88,
    vesselsInRoadstead: 14,
    draftMaxMeters: 17.5,
    railEvacuationCapacityRakesPerDay: 28
  },
  {
    id: 'IN-VTZ',
    name: 'Visakhapatnam Port (VPA / Gangavaram)',
    state: 'Andhra Pradesh',
    coordinates: [17.6868, 83.2185],
    handlingChargesINRPerMT: 460,
    currentWaitDays: 2.8,
    berthOccupancyPercent: 74,
    vesselsInRoadstead: 8,
    draftMaxMeters: 18.0,
    railEvacuationCapacityRakesPerDay: 32
  },
  {
    id: 'IN-HLD',
    name: 'Haldia Dock Complex (Kolkata Syama Prasad Mookerjee Port)',
    state: 'West Bengal',
    coordinates: [22.0227, 88.0583],
    handlingChargesINRPerMT: 510,
    currentWaitDays: 6.4,
    berthOccupancyPercent: 92,
    vesselsInRoadstead: 11,
    draftMaxMeters: 12.5,
    railEvacuationCapacityRakesPerDay: 18
  },
  {
    id: 'IN-DHM',
    name: 'Dhamra Port (Adani/Odisha)',
    state: 'Odisha',
    coordinates: [20.8258, 86.9602],
    handlingChargesINRPerMT: 440,
    currentWaitDays: 1.1,
    berthOccupancyPercent: 58,
    vesselsInRoadstead: 3,
    draftMaxMeters: 19.5,
    railEvacuationCapacityRakesPerDay: 24
  },
  {
    id: 'IN-KRI',
    name: 'Krishnapatnam Port',
    state: 'Andhra Pradesh',
    coordinates: [14.2547, 80.1264],
    handlingChargesINRPerMT: 475,
    currentWaitDays: 1.8,
    berthOccupancyPercent: 62,
    vesselsInRoadstead: 4,
    draftMaxMeters: 18.5,
    railEvacuationCapacityRakesPerDay: 20
  },
  {
    id: 'IN-JNP',
    name: 'Jawaharlal Nehru Port (JNPT Mumbai)',
    state: 'Maharashtra',
    coordinates: [18.9499, 72.9511],
    handlingChargesINRPerMT: 560,
    currentWaitDays: 3.5,
    berthOccupancyPercent: 81,
    vesselsInRoadstead: 7,
    draftMaxMeters: 15.0,
    railEvacuationCapacityRakesPerDay: 26
  }
];

// Initial vessels currently in ocean transit or at port
export const INITIAL_VESSELS: Vessel[] = [
  {
    id: 'vsl-01',
    imo: '9784321',
    name: 'M/V Bharat Ocean Pride',
    vesselClass: 'Capesize',
    dwt: 181200,
    flag: 'India (DGS Approved)',
    speedKnots: 12.4,
    heading: 310,
    currentPosition: [8.52, 88.42], // Bay of Bengal, en route Paradip
    origin: 'Hay Point, Australia',
    destination: 'Paradip Port (PPT)',
    plantDestination: 'BSL',
    cargoType: 'Hard Coking Coal',
    cargoMT: 152000,
    status: 'In Transit',
    laycanStart: '2026-09-20',
    laycanEnd: '2026-09-25',
    eta: '2026-09-24 14:00',
    dailyCharterRateUSD: 28400,
    accumulatedDemurrageUSD: 0,
    routeProgress: 0.72,
    routeCoordinates: [
      [-21.28, 149.29],
      [-10.50, 130.00],
      [-8.20, 115.00],
      [0.20, 98.00],
      [5.80, 92.00],
      [8.52, 88.42],
      [20.26, 86.67]
    ]
  },
  {
    id: 'vsl-02',
    imo: '9651289',
    name: 'M/V Kalinga Glory',
    vesselClass: 'Panamax',
    dwt: 82400,
    flag: 'Liberia',
    speedKnots: 0.1,
    heading: 45,
    currentPosition: [20.15, 86.82], // Anchorage outside Paradip
    origin: 'Richards Bay, South Africa',
    destination: 'Paradip Port (PPT)',
    plantDestination: 'RSP',
    cargoType: 'PCI Coal',
    cargoMT: 76500,
    status: 'Anchored',
    laycanStart: '2026-09-15',
    laycanEnd: '2026-09-18',
    eta: 'Arrived (Awaiting Berth)',
    dailyCharterRateUSD: 19200,
    accumulatedDemurrageUSD: 86400, // 4.5 days demurrage!
    routeProgress: 0.99,
    isAlert: true,
    alertReason: 'Excess Anchorage Delay (>4 days). Demurrage accumulating at $800/hr.',
    routeCoordinates: [
      [-28.80, 32.09],
      [-15.00, 48.00],
      [5.00, 68.00],
      [10.00, 78.00],
      [18.00, 85.00],
      [20.15, 86.82]
    ]
  },
  {
    id: 'vsl-03',
    imo: '9840112',
    name: 'M/V Swarna Sindhu',
    vesselClass: 'Capesize',
    dwt: 179500,
    flag: 'India (DGS Approved)',
    speedKnots: 11.8,
    heading: 325,
    currentPosition: [5.20, 83.40], // Indian ocean south of Sri Lanka
    origin: 'Hay Point, Australia',
    destination: 'Visakhapatnam (VPA)',
    plantDestination: 'VSP',
    cargoType: 'Hard Coking Coal',
    cargoMT: 160000,
    status: 'In Transit',
    laycanStart: '2026-09-22',
    laycanEnd: '2026-09-27',
    eta: '2026-09-26 08:30',
    dailyCharterRateUSD: 29500,
    accumulatedDemurrageUSD: 0,
    routeProgress: 0.65,
    routeCoordinates: [
      [-21.28, 149.29],
      [-12.00, 125.00],
      [-5.00, 105.00],
      [2.00, 92.00],
      [5.20, 83.40],
      [17.68, 83.21]
    ]
  },
  {
    id: 'vsl-04',
    imo: '9718443',
    name: 'M/V Mahavir Fortune',
    vesselClass: 'Supramax',
    dwt: 58500,
    flag: 'Panama',
    speedKnots: 0.0,
    heading: 180,
    currentPosition: [20.8258, 86.9602], // At berth in Dhamra
    origin: 'East Kalimantan, Indonesia',
    destination: 'Dhamra Port',
    plantDestination: 'RSP',
    cargoType: 'PCI Coal',
    cargoMT: 54000,
    status: 'Discharging',
    laycanStart: '2026-09-18',
    laycanEnd: '2026-09-22',
    eta: 'Berthed (ETD: 2026-09-23)',
    dailyCharterRateUSD: 14500,
    accumulatedDemurrageUSD: 0,
    routeProgress: 1.0,
    routeCoordinates: [
      [-1.26, 116.82],
      [4.00, 105.00],
      [8.00, 95.00],
      [15.00, 88.00],
      [20.82, 86.96]
    ]
  },
  {
    id: 'vsl-05',
    imo: '9823901',
    name: 'M/V Pacific Pioneer',
    vesselClass: 'Kamsarmax',
    dwt: 84900,
    flag: 'Singapore',
    speedKnots: 13.1,
    heading: 305,
    currentPosition: [-12.40, 68.20], // Central Indian Ocean from Richards Bay
    origin: 'Richards Bay, South Africa',
    destination: 'Krishnapatnam Port',
    plantDestination: 'BSP',
    cargoType: 'Hard Coking Coal',
    cargoMT: 78000,
    status: 'In Transit',
    laycanStart: '2026-09-24',
    laycanEnd: '2026-09-29',
    eta: '2026-09-28 19:00',
    dailyCharterRateUSD: 21000,
    accumulatedDemurrageUSD: 0,
    routeProgress: 0.48,
    routeCoordinates: [
      [-28.80, 32.09],
      [-20.00, 50.00],
      [-12.40, 68.20],
      [2.00, 76.00],
      [10.00, 79.50],
      [14.25, 80.12]
    ]
  },
  {
    id: 'vsl-06',
    imo: '9912044',
    name: 'M/V Ganga Pioneer',
    vesselClass: 'Capesize',
    dwt: 176000,
    flag: 'India (DGS Approved)',
    speedKnots: 0.1,
    heading: 10,
    currentPosition: [21.80, 88.10], // Sandheads / Haldia anchorage
    origin: 'Hay Point, Australia',
    destination: 'Haldia Dock Complex',
    plantDestination: 'DSP',
    cargoType: 'Hard Coking Coal',
    cargoMT: 75000, // Lightened cargo due to draft
    status: 'Anchored',
    laycanStart: '2026-09-16',
    laycanEnd: '2026-09-21',
    eta: 'Awaiting River Pilot & Draft Window',
    dailyCharterRateUSD: 27800,
    accumulatedDemurrageUSD: 55600, // 2 days demurrage
    routeProgress: 0.98,
    isAlert: true,
    alertReason: 'Draft restriction at Hooghly estuary causing tidal delay.',
    routeCoordinates: [
      [-21.28, 149.29],
      [-5.00, 105.00],
      [10.00, 88.00],
      [21.80, 88.10]
    ]
  }
];

export const MOCK_CARRIER_BIDS: CarrierBid[] = [
  {
    id: 'bid-01',
    carrierName: 'Shipping Corporation of India (SCI Bulk)',
    vesselName: 'M/V Desh Shanti',
    vesselClass: 'Capesize',
    builtYear: 2021,
    offeredDayRateUSD: 24800,
    offeredFreightPerMTUSD: 14.15,
    score: 96.4,
    rank: 'L1',
    rating: 4.9,
    status: 'Pending',
    complianceStatus: 'Verified'
  },
  {
    id: 'bid-02',
    carrierName: 'Oldendorff Carriers GmbH',
    vesselName: 'M/V Henrik Oldendorff',
    vesselClass: 'Capesize',
    builtYear: 2020,
    offeredDayRateUSD: 25600,
    offeredFreightPerMTUSD: 14.62,
    score: 93.8,
    rank: 'L2',
    rating: 4.8,
    status: 'Pending',
    complianceStatus: 'Verified'
  },
  {
    id: 'bid-03',
    carrierName: 'Great Eastern Shipping Co. (GE Ship)',
    vesselName: 'M/V Jag Anand',
    vesselClass: 'Kamsarmax',
    builtYear: 2019,
    offeredDayRateUSD: 26200,
    offeredFreightPerMTUSD: 14.98,
    score: 91.2,
    rank: 'L3',
    rating: 4.7,
    status: 'Pending',
    complianceStatus: 'Verified'
  },
  {
    id: 'bid-04',
    carrierName: 'Star Bulk Carriers Corp',
    vesselName: 'M/V Star Polaris',
    vesselClass: 'Capesize',
    builtYear: 2018,
    offeredDayRateUSD: 27100,
    offeredFreightPerMTUSD: 15.45,
    score: 87.5,
    rank: 'L4',
    rating: 4.6,
    status: 'Pending',
    complianceStatus: 'Verified'
  },
  {
    id: 'bid-05',
    carrierName: 'Berge Bulk Maritime',
    vesselName: 'M/V Berge Mawson',
    vesselClass: 'Capesize',
    builtYear: 2017,
    offeredDayRateUSD: 28400,
    offeredFreightPerMTUSD: 16.20,
    score: 84.1,
    rank: 'L5',
    rating: 4.5,
    status: 'Pending',
    complianceStatus: 'Verified'
  }
];

export const ECONOMIC_INDICATORS: EconomicIndicator[] = [
  {
    id: 'bdi',
    name: 'Baltic Dry Index',
    symbol: 'BDI',
    value: 1845,
    change: +42,
    changePercent: +2.33,
    unit: 'pts',
    description: 'Benchmark assessment of the price of moving raw materials by sea across bulk routes.',
    sparkline: [1760, 1785, 1770, 1810, 1805, 1820, 1845]
  },
  {
    id: 'bci',
    name: 'Baltic Capesize Index',
    symbol: 'BCI',
    value: 2980,
    change: +115,
    changePercent: +4.01,
    unit: 'pts',
    description: 'Specific to Capesize iron ore & coking coal bulkers (150,000+ DWT).',
    sparkline: [2780, 2810, 2840, 2890, 2910, 2950, 2980]
  },
  {
    id: 'bunker',
    name: 'VLSFO Bunker Fuel (Singapore/Fujairah)',
    symbol: 'VLSFO',
    value: 612.50,
    change: -4.20,
    changePercent: -0.68,
    unit: '$/MT',
    description: 'Very Low Sulfur Fuel Oil for marine propulsion. Dictates 40% of voyage operational costs.',
    sparkline: [628, 624, 620, 618, 615, 616, 612.5]
  },
  {
    id: 'usdinr',
    name: 'USD / INR Exchange Rate',
    symbol: 'USDINR',
    value: 86.42,
    change: +0.14,
    changePercent: +0.16,
    unit: '₹',
    description: 'Reference RBI foreign exchange rate determining CIF landed duty and payments.',
    sparkline: [85.90, 86.05, 86.12, 86.25, 86.30, 86.38, 86.42]
  }
];

export const MARITIME_NEWS: MaritimeNews[] = [
  {
    id: 'news-01',
    title: 'East Coast Cyclone Advisory: Depression forming in Central Bay of Bengal',
    source: 'IMD Maritime Met Bureau',
    timestamp: '18 mins ago',
    tags: ['#WeatherAlerts', '#PortCongestion'],
    summary: 'A deep depression over east-central Bay of Bengal is expected to intensify into a cyclonic storm by tomorrow evening. Paradip and Dhamra ports issued Signal 3 alert; berthing speeds may be suspended.',
    urgency: 'high',
    impact: 'High risk of 2-3 additional anchorage days at Paradip and Haldia. Recommend diversion of Capesize vessels to Vizag or Dhamra deep berths.'
  },
  {
    id: 'news-02',
    title: 'Australian Coking Coal Port Loading Rates Stabilize as Rail Line Reopens',
    source: 'S&P Global Commodity Insights',
    timestamp: '1 hour ago',
    tags: ['#BunkerFuel', '#Tariffs'],
    summary: 'Aurizon rail network servicing Queensland Goonyella rail system has cleared backlog after maintenance shut down. Vessel turnaround times at Hay Point and Dalrymple Bay improved from 9.2 days to 5.4 days.',
    urgency: 'normal',
    impact: 'FOB pricing softened slightly to $242.50/MT. Positive window for SAIL quarterly contract fixtures.'
  },
  {
    id: 'news-03',
    title: 'Ministry of Steel Mandates Multi-Port Diversion Grid to Cut PSU Demurrage Bills',
    source: 'Steel Express Daily',
    timestamp: '3 hours ago',
    tags: ['#PortCongestion', '#Tariffs'],
    summary: 'Under SIH 2026 directives, steel public sector undertakings (SAIL/RINL) are deploying intelligent freight diversion models to avoid multi-crore demurrage penalties at congested state-run ports.',
    urgency: 'normal',
    impact: 'Average turnaround optimization projected to save ₹185 Crore annually across 6 major steel complexes.'
  },
  {
    id: 'news-04',
    title: 'Global Capesize Freight Rates Climb as China Ramps Up Iron Ore Restocking',
    source: 'Clarksons Platou Securities',
    timestamp: '5 hours ago',
    tags: ['#BunkerFuel'],
    summary: 'Pacific round voyages witnessed a 7% surge in spot fixtures with Capesize earnings climbing past $28,000/day. Australian coal chartering activity remains robust.',
    urgency: 'medium',
    impact: 'Prompt laycan vessels commanding 8-10% premium. Time charters recommended over spot for 60-day window.'
  },
  {
    id: 'news-05',
    title: 'Indian Railways Augments BOXN Rake Supply for Coal Evacuation at Dhamra & Vizag',
    source: 'Railway Board Logistics Division',
    timestamp: '7 hours ago',
    tags: ['#PortCongestion'],
    summary: 'East Coast Railway (ECoR) inducted 14 additional dedicated merry-go-round and BOXN rake formations to fast-track evacuation of imported coking coal to Bokaro and Rourkela.',
    urgency: 'normal',
    impact: 'Evacuation speed up by 22%; reduces port yard storage charges.'
  }
];

export const FREIGHT_FORECAST_DATA: ForecastPoint[] = [
  { date: 'Apr 25', historical: 12.80, baseline: 12.80, lowerBound: 12.80, upperBound: 12.80, bullish: 12.80, disruption: 12.80 },
  { date: 'May 25', historical: 13.40, baseline: 13.40, lowerBound: 13.40, upperBound: 13.40, bullish: 13.40, disruption: 13.40 },
  { date: 'Jun 25', historical: 14.10, baseline: 14.10, lowerBound: 14.10, upperBound: 14.10, bullish: 14.10, disruption: 14.10 },
  { date: 'Jul 25', historical: 13.80, baseline: 13.80, lowerBound: 13.80, upperBound: 13.80, bullish: 13.80, disruption: 13.80 },
  { date: 'Aug 25', historical: 14.25, baseline: 14.25, lowerBound: 14.25, upperBound: 14.25, bullish: 14.25, disruption: 14.25 },
  { date: 'Sep 25', historical: 14.65, baseline: 14.65, lowerBound: 14.65, upperBound: 14.65, bullish: 14.65, disruption: 14.65 },
  // 30, 60, 90-day predictive curves
  { date: 'Oct 25 (+30D)', baseline: 15.10, lowerBound: 14.30, upperBound: 15.90, bullish: 16.40, disruption: 17.80 },
  { date: 'Nov 25 (+60D)', baseline: 15.60, lowerBound: 14.60, upperBound: 16.60, bullish: 17.50, disruption: 19.40 },
  { date: 'Dec 25 (+90D)', baseline: 16.20, lowerBound: 15.10, upperBound: 17.30, bullish: 18.80, disruption: 21.10 },
  { date: 'Jan 26', baseline: 15.80, lowerBound: 14.70, upperBound: 16.90, bullish: 18.20, disruption: 20.20 },
  { date: 'Feb 26', baseline: 15.40, lowerBound: 14.20, upperBound: 16.60, bullish: 17.60, disruption: 19.50 },
  { date: 'Mar 26', baseline: 15.90, lowerBound: 14.60, upperBound: 17.20, bullish: 18.40, disruption: 20.80 }
];

export const HISTORICAL_VOYAGES: HistoricalVoyageLog[] = [
  {
    id: 'log-01',
    voyageNo: 'VOY-2026-089',
    vesselName: 'M/V Ocean Diamond',
    origin: 'Hay Point, Australia',
    destinationPort: 'Paradip Port (PPT)',
    steelPlant: 'BSL',
    cargoType: 'Hard Coking Coal',
    volumeMT: 154000,
    voyageDurationDays: 21,
    freightPaidPerMTUSD: 14.80,
    demurragePaidUSD: 62000,
    landedCostPerMTINR: 26850,
    carrierName: 'SCI Bulk',
    completedDate: '2026-08-28',
    efficiencyScore: 84
  },
  {
    id: 'log-02',
    voyageNo: 'VOY-2026-082',
    vesselName: 'M/V Vishva Nidhi',
    origin: 'Hay Point, Australia',
    destinationPort: 'Dhamra Port',
    steelPlant: 'RSP',
    cargoType: 'Hard Coking Coal',
    volumeMT: 148500,
    voyageDurationDays: 16,
    freightPaidPerMTUSD: 14.30,
    demurragePaidUSD: 0,
    landedCostPerMTINR: 25920,
    carrierName: 'GE Ship',
    completedDate: '2026-08-15',
    efficiencyScore: 98
  },
  {
    id: 'log-03',
    voyageNo: 'VOY-2026-077',
    vesselName: 'M/V Cape Venture',
    origin: 'Richards Bay, South Africa',
    destinationPort: 'Visakhapatnam (VPA)',
    steelPlant: 'VSP',
    cargoType: 'PCI Coal',
    volumeMT: 78200,
    voyageDurationDays: 17,
    freightPaidPerMTUSD: 13.90,
    demurragePaidUSD: 18500,
    landedCostPerMTINR: 15400,
    carrierName: 'Oldendorff Carriers',
    completedDate: '2026-07-30',
    efficiencyScore: 91
  },
  {
    id: 'log-04',
    voyageNo: 'VOY-2026-069',
    vesselName: 'M/V Bengal Fortune',
    origin: 'East Kalimantan, Indonesia',
    destinationPort: 'Haldia Dock Complex',
    steelPlant: 'DSP',
    cargoType: 'PCI Coal',
    volumeMT: 48000,
    voyageDurationDays: 14,
    freightPaidPerMTUSD: 10.20,
    demurragePaidUSD: 41000,
    landedCostPerMTINR: 13150,
    carrierName: 'Star Bulk',
    completedDate: '2026-07-12',
    efficiencyScore: 78
  },
  {
    id: 'log-05',
    voyageNo: 'VOY-2026-061',
    vesselName: 'M/V Maharshi Dayanand',
    origin: 'Hay Point, Australia',
    destinationPort: 'Krishnapatnam Port',
    steelPlant: 'BSP',
    cargoType: 'Hard Coking Coal',
    volumeMT: 165000,
    voyageDurationDays: 18,
    freightPaidPerMTUSD: 14.10,
    demurragePaidUSD: 0,
    landedCostPerMTINR: 26110,
    carrierName: 'SCI Bulk',
    completedDate: '2026-06-25',
    efficiencyScore: 96
  },
  {
    id: 'log-06',
    voyageNo: 'VOY-2026-054',
    vesselName: 'M/V Jag Arnav',
    origin: 'Richards Bay, South Africa',
    destinationPort: 'Paradip Port (PPT)',
    steelPlant: 'ISP',
    cargoType: 'Hard Coking Coal',
    volumeMT: 74500,
    voyageDurationDays: 23,
    freightPaidPerMTUSD: 15.20,
    demurragePaidUSD: 78000,
    landedCostPerMTINR: 27400,
    carrierName: 'GE Ship',
    completedDate: '2026-06-08',
    efficiencyScore: 72
  },
  {
    id: 'log-07',
    voyageNo: 'VOY-2026-048',
    vesselName: 'M/V Golden Horizon',
    origin: 'Hay Point, Australia',
    destinationPort: 'Visakhapatnam (VPA)',
    steelPlant: 'BSP',
    cargoType: 'Hard Coking Coal',
    volumeMT: 158000,
    voyageDurationDays: 17,
    freightPaidPerMTUSD: 14.05,
    demurragePaidUSD: 12000,
    landedCostPerMTINR: 25890,
    carrierName: 'Berge Bulk',
    completedDate: '2026-05-19',
    efficiencyScore: 94
  }
];
