import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  UserProfile, 
  UserRole, 
  SteelPlant, 
  DestinationPort, 
  Vessel, 
  CarrierBid, 
  EconomicIndicator, 
  MaritimeNews, 
  LandedCostBreakdown, 
  RawMaterialType, 
  SteelPlantId 
} from '../types';
import { 
  USER_PROFILES, 
  STEEL_PLANTS, 
  DESTINATION_PORTS, 
  INITIAL_VESSELS, 
  MOCK_CARRIER_BIDS, 
  ECONOMIC_INDICATORS, 
  MARITIME_NEWS 
} from '../data/mockData';
import { ToastMessage } from '../components/common/ToastContainer';

interface SimulationContextType {
  currentUser: UserProfile | null;
  setCurrentUserRole: (role: UserRole) => void;
  logout: () => void;
  activeTab: 'requisition' | 'tracker' | 'economy' | 'analytics' | 'inventory' | 'login';
  setActiveTab: (tab: 'requisition' | 'tracker' | 'economy' | 'analytics' | 'inventory' | 'login') => void;
  vessels: Vessel[];
  ports: DestinationPort[];
  plants: SteelPlant[];
  bids: CarrierBid[];
  economicIndicators: EconomicIndicator[];
  news: MaritimeNews[];
  isSimulationRunning: boolean;
  setIsSimulationRunning: (val: boolean | ((prev: boolean) => boolean)) => void;
  toasts: ToastMessage[];
  addToast: (title: string, description?: string, type?: 'success' | 'warning' | 'error' | 'info') => void;
  dismissToast: (id: string) => void;
  
  // Requisition calculation & actions
  activeLandedCost: LandedCostBreakdown | null;
  calculateLandedCost: (params: {
    plantId: SteelPlantId;
    material: RawMaterialType;
    volumeMT: number;
    originId: string;
    destinationPortId: string;
    charterType: string;
  }) => LandedCostBreakdown;
  awardBid: (bidId: string) => void;
  divertVessel: (vesselId: string, newPortId: string) => void;
  
  // Simulation triggers for judges / demo
  triggerCycloneSimulation: () => void;
  triggerBalticSurgeSimulation: () => void;
  triggerBokaroStockDipSimulation: () => void;
  resetSimulation: () => void;
  selectedVesselForDrawer: Vessel | null;
  setSelectedVesselForDrawer: (vessel: Vessel | null) => void;
}

const SimulationContext = createContext<SimulationContextType | undefined>(undefined);

export const SimulationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Mock auth state saved in localStorage
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('ispat_user_role');
    return saved && USER_PROFILES[saved] ? USER_PROFILES[saved] : USER_PROFILES['ministry_director'];
  });

  const [activeTab, setActiveTab] = useState<'requisition' | 'tracker' | 'economy' | 'analytics' | 'inventory' | 'login'>('requisition');
  const [vessels, setVessels] = useState<Vessel[]>(INITIAL_VESSELS);
  const [ports, setPorts] = useState<DestinationPort[]>(DESTINATION_PORTS);
  const [plants, setPlants] = useState<SteelPlant[]>(STEEL_PLANTS);
  const [bids, setBids] = useState<CarrierBid[]>(MOCK_CARRIER_BIDS);
  const [economicIndicators, setEconomicIndicators] = useState<EconomicIndicator[]>(ECONOMIC_INDICATORS);
  const [news, setNews] = useState<MaritimeNews[]>(MARITIME_NEWS);
  const [isSimulationRunning, setIsSimulationRunning] = useState<boolean>(true);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [selectedVesselForDrawer, setSelectedVesselForDrawer] = useState<Vessel | null>(null);

  const addToast = useCallback((title: string, description?: string, type: 'success' | 'warning' | 'error' | 'info' = 'info') => {
    const id = `${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setToasts(prev => [{ id, title, description, type, timestamp: timeStr }, ...prev.slice(0, 4)]);
    
    // Auto dismiss after 6 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 6000);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const setCurrentUserRole = (role: UserRole) => {
    const profile = USER_PROFILES[role];
    if (profile) {
      setCurrentUser(profile);
      localStorage.setItem('ispat_user_role', role);
      addToast(`Switched Profile: ${profile.badge}`, `Active as ${profile.name} (${profile.organization})`, 'info');
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('ispat_user_role');
  };

  // Requisition Calculation Engine
  const [activeLandedCost, setActiveLandedCost] = useState<LandedCostBreakdown | null>(() => {
    // Initial standard calculation for SAIL Bokaro
    return {
      fobPriceUSD: 242.50,
      oceanFreightUSD: 14.15,
      portHandlingUSD: 4.86,
      estimatedDemurrageUSD: 4.25, // 5.2 days wait at Paradip
      inlandRailUSD: 9.80,
      customsDutyUSD: 6.20,
      totalLandedCostUSD: 281.76,
      totalLandedCostINR: 24349.70,
      landedCostPerMTUSD: 281.76,
      landedCostPerMTINR: 24349.70,
      usdInrRate: 86.42,
      primaryPort: 'Paradip Port (PPT)',
      divertedPort: 'Dhamra Port (Adani/Odisha)',
      potentialSavingsUSD: 3.85 * 75000, // $288,750
      potentialSavingsINR: 3.85 * 75000 * 86.42
    };
  });

  const calculateLandedCost = useCallback((params: {
    plantId: SteelPlantId;
    material: RawMaterialType;
    volumeMT: number;
    originId: string;
    destinationPortId: string;
    charterType: string;
  }): LandedCostBreakdown => {
    const port = ports.find(p => p.id === params.destinationPortId) || ports[0];
    const usdRate = economicIndicators.find(e => e.id === 'usdinr')?.value || 86.42;

    // FOB baseline according to material & origin
    let fob = 242.50;
    if (params.material === 'PCI Coal') fob = 145.00;
    if (params.material === 'Iron Ore Pellets') fob = 128.00;
    if (params.material === 'Limestone') fob = 38.00;
    if (params.material === 'Dolomite') fob = 32.00;
    if (params.originId.includes('ZA')) fob *= 0.88; // South Africa discounts
    if (params.originId.includes('ID')) fob *= 0.65; // Indonesia discounts

    // Ocean freight based on origin & charter type
    let oceanFreight = 14.15;
    if (params.originId.includes('AU')) oceanFreight = 14.80;
    if (params.originId.includes('ZA')) oceanFreight = 13.90;
    if (params.originId.includes('ID')) oceanFreight = 9.80;
    if (params.charterType.includes('3 Months')) oceanFreight *= 0.94; // Discount for period
    if (params.charterType.includes('6 Months')) oceanFreight *= 0.90;

    // Port handling charges in USD
    const portHandlingUSD = (port.handlingChargesINRPerMT) / usdRate;

    // Demurrage calculation based on live port congestion wait days
    // Standard capesize charter rate ~$26,000/day. For volume 75,000 MT: daily demurrage per MT = $0.35/day
    const estDemurragePerMT = (port.currentWaitDays * 26000) / params.volumeMT;

    // Inland rail freight by plant distance
    let inlandRailUSD = 9.50;
    if (params.plantId === 'BSP') inlandRailUSD = 11.20; // Bhilai is farther inland
    if (params.plantId === 'BSL') inlandRailUSD = 8.90;
    if (params.plantId === 'VSP') inlandRailUSD = 1.80; // Coastal!

    // Basic customs & cess
    const customsDutyUSD = (fob + oceanFreight) * 0.025;

    const totalLandedUSD = fob + oceanFreight + portHandlingUSD + estDemurragePerMT + inlandRailUSD + customsDutyUSD;
    const totalLandedINR = totalLandedUSD * usdRate;

    // Determine optimal route comparison (e.g. Dhamra vs Paradip)
    let divertedPort: string | undefined = undefined;
    let potentialSavingsUSD: number | undefined = undefined;
    let potentialSavingsINR: number | undefined = undefined;

    if (port.currentWaitDays > 3.0) {
      const lowerCongestionPort = ports.find(p => p.currentWaitDays < 2.0);
      if (lowerCongestionPort) {
        divertedPort = lowerCongestionPort.name;
        const savedDays = port.currentWaitDays - lowerCongestionPort.currentWaitDays;
        potentialSavingsUSD = savedDays * 26000;
        potentialSavingsINR = potentialSavingsUSD * usdRate;
      }
    }

    const result: LandedCostBreakdown = {
      fobPriceUSD: Number(fob.toFixed(2)),
      oceanFreightUSD: Number(oceanFreight.toFixed(2)),
      portHandlingUSD: Number(portHandlingUSD.toFixed(2)),
      estimatedDemurrageUSD: Number(estDemurragePerMT.toFixed(2)),
      inlandRailUSD: Number(inlandRailUSD.toFixed(2)),
      customsDutyUSD: Number(customsDutyUSD.toFixed(2)),
      totalLandedCostUSD: Number(totalLandedUSD.toFixed(2)),
      totalLandedCostINR: Number(totalLandedINR.toFixed(2)),
      landedCostPerMTUSD: Number(totalLandedUSD.toFixed(2)),
      landedCostPerMTINR: Number(totalLandedINR.toFixed(2)),
      usdInrRate: usdRate,
      primaryPort: port.name,
      divertedPort,
      potentialSavingsUSD,
      potentialSavingsINR
    };

    setActiveLandedCost(result);
    return result;
  }, [ports, economicIndicators]);

  const awardBid = (bidId: string) => {
    setBids(prev => prev.map(b => {
      if (b.id === bidId) {
        return { ...b, status: 'Awarded' };
      }
      return { ...b, status: 'Rejected' };
    }));
    const awarded = bids.find(b => b.id === bidId);
    if (awarded) {
      addToast(
        `Tender Awarded to ${awarded.carrierName}`, 
        `Fixture confirmed for ${awarded.vesselName} (${awarded.vesselClass}) at $${awarded.offeredDayRateUSD.toLocaleString()}/day ($${awarded.offeredFreightPerMTUSD}/MT). Letter of Intent (LoI) generated.`,
        'success'
      );
    }
  };

  const divertVessel = (vesselId: string, newPortId: string) => {
    const targetPort = ports.find(p => p.id === newPortId || p.name.includes(newPortId));
    setVessels(prev => prev.map(v => {
      if (v.id === vesselId) {
        return {
          ...v,
          destination: targetPort ? targetPort.name : 'Dhamra Port (Adani/Odisha)',
          status: 'Diverted',
          isAlert: false,
          alertReason: `Optimally diverted to ${targetPort?.name || 'Dhamra'} to eliminate waiting queue demurrage.`
        };
      }
      return v;
    }));

    addToast(
      'Vessel Course Diverted via SatCom',
      `Voyage orders updated. Vessel rerouted away from congested roadstead to ${targetPort?.name || 'Dhamra Port'}. Estimated saving: $115,000 in demurrage avoidance.`,
      'success'
    );
  };

  // Live Simulation Heartbeat: Updates positions, indices, and demurrage tickers every 3-5 seconds
  useEffect(() => {
    if (!isSimulationRunning) return;

    const interval = setInterval(() => {
      // 1. Move vessels smoothly along their progress coordinates
      setVessels(prev => prev.map(v => {
        if (v.status === 'In Transit' && v.routeCoordinates.length > 1) {
          // Increment progress slightly
          const newProgress = (v.routeProgress + 0.003) % 1;
          const idx = Math.min(
            Math.floor(newProgress * (v.routeCoordinates.length - 1)),
            v.routeCoordinates.length - 2
          );
          const p1 = v.routeCoordinates[idx];
          const p2 = v.routeCoordinates[idx + 1];
          const segmentFactor = (newProgress * (v.routeCoordinates.length - 1)) - idx;
          const lat = p1[0] + (p2[0] - p1[0]) * segmentFactor;
          const lng = p1[1] + (p2[1] - p1[1]) * segmentFactor;

          return {
            ...v,
            routeProgress: newProgress,
            currentPosition: [Number(lat.toFixed(4)), Number(lng.toFixed(4))]
          };
        }
        if (v.status === 'Anchored') {
          // Accumulate minor demurrage ($12 per tick)
          return {
            ...v,
            accumulatedDemurrageUSD: v.accumulatedDemurrageUSD + 15
          };
        }
        return v;
      }));

      // 2. Subtle micro-fluctuations in Baltic Indices (within realistic ±0.3%)
      setEconomicIndicators(prev => prev.map(ind => {
        const deltaPercent = (Math.random() - 0.49) * 0.4;
        const delta = (ind.value * deltaPercent) / 100;
        const newValue = Number((ind.value + delta).toFixed(ind.id === 'bdi' || ind.id === 'bci' ? 0 : 2));
        const newSparkline = [...ind.sparkline.slice(1), newValue];
        return {
          ...ind,
          value: newValue,
          change: Number((ind.change + delta).toFixed(2)),
          changePercent: Number((ind.changePercent + deltaPercent).toFixed(2)),
          sparkline: newSparkline
        };
      }));
    }, 4000);

    return () => clearInterval(interval);
  }, [isSimulationRunning]);

  // Demo Trigger 1: Simulate Cyclone in Bay of Bengal
  const triggerCycloneSimulation = () => {
    // Increase Paradip wait time and Haldia wait time
    setPorts(prev => prev.map(p => {
      if (p.id === 'IN-PRT') {
        return { ...p, currentWaitDays: 7.8, berthOccupancyPercent: 96, vesselsInRoadstead: 19 };
      }
      if (p.id === 'IN-HLD') {
        return { ...p, currentWaitDays: 8.5, berthOccupancyPercent: 98, vesselsInRoadstead: 15 };
      }
      return p;
    }));

    // Update vessel alert
    setVessels(prev => prev.map(v => {
      if (v.id === 'vsl-01') {
        return {
          ...v,
          isAlert: true,
          alertReason: 'Cyclone Storm Warning (Signal 4). Paradip berthing halted. AI Recommendation: Divert immediately to Vizag or Dhamra!'
        };
      }
      return v;
    }));

    // Add high urgency news
    const cycloneNews: MaritimeNews = {
      id: `news-${Date.now()}`,
      title: '🚨 LIVE EVENT: Severe Cyclone forming over Bay of Bengal; Paradip & Haldia halt anchorages',
      source: 'IMD Coastal Warning Center',
      timestamp: 'Just now',
      tags: ['#WeatherAlerts', '#PortCongestion'],
      summary: 'Gale wind speeds of 55-65 knots predicted. Paradip Port Trust instructs all laden bulk vessels in roadstead to proceed to deeper waters. Vessel berthing delay expected to surge past 7.8 days.',
      urgency: 'high',
      impact: 'Demurrage risk for pending SAIL coal vessels rises to $28,000/day. Dhamra and Vizag deep-water berths recommended.'
    };
    setNews(prev => [cycloneNews, ...prev]);

    addToast(
      '⚠️ Cyclone Alert Triggered',
      'Bay of Bengal depression escalated. Paradip wait time surged to 7.8 days. Vessels alerted for diversion.',
      'warning'
    );
  };

  // Demo Trigger 2: Simulate Baltic Rate Surge (+12%)
  const triggerBalticSurgeSimulation = () => {
    setEconomicIndicators(prev => prev.map(ind => {
      if (ind.id === 'bdi') {
        return {
          ...ind,
          value: Math.round(ind.value * 1.12),
          change: ind.change + 220,
          changePercent: ind.changePercent + 12.0
        };
      }
      if (ind.id === 'bci') {
        return {
          ...ind,
          value: Math.round(ind.value * 1.14),
          change: ind.change + 380,
          changePercent: ind.changePercent + 14.2
        };
      }
      return ind;
    }));

    // Bids increase
    setBids(prev => prev.map(b => ({
      ...b,
      offeredDayRateUSD: Math.round(b.offeredDayRateUSD * 1.12),
      offeredFreightPerMTUSD: Number((b.offeredFreightPerMTUSD * 1.12).toFixed(2))
    })));

    const surgeNews: MaritimeNews = {
      id: `news-${Date.now()}`,
      title: '📈 MARKET SURGE: Capesize Spot Rates spike +14% amid Pacific vessel shortage',
      source: 'Baltic Exchange Market Report',
      timestamp: 'Just now',
      tags: ['#BunkerFuel', '#Tariffs'],
      summary: 'Aggressive iron ore and metallurgical coal chartering in Australia and Brazil has absorbed spot tonnage. Spot fixtures breaching $32,000/day.',
      urgency: 'medium',
      impact: 'Immediate procurement recommendation: Lock in 3-Month or 6-Month Time Charters to hedge against further upward volatility.'
    };
    setNews(prev => [surgeNews, ...prev]);

    addToast(
      '📈 Baltic Freight Surge (+12%) Simulated',
      'Baltic Dry Index pushed to new quarterly high. All carrier open bids and spot forward rates adjusted upwards.',
      'info'
    );
  };

  // Demo Trigger 3: Simulate Critical Stock Dip at SAIL Bokaro
  const triggerBokaroStockDipSimulation = () => {
    setPlants(prev => prev.map(p => {
      if (p.id === 'BSL') {
        return {
          ...p,
          currentStockMT: 62000,
          daysRemaining: 4.1,
          status: 'critical'
        };
      }
      return p;
    }));

    addToast(
      '🔴 CRITICAL ALERT: SAIL Bokaro Coal Stock < 5 Days',
      'Inventory dropped to 4.1 days (Critical threshold < 7 days). Emergency rake allocation and vessel discharge fast-tracking required.',
      'error'
    );
  };

  // Reset Simulation State
  const resetSimulation = () => {
    setVessels(INITIAL_VESSELS);
    setPorts(DESTINATION_PORTS);
    setPlants(STEEL_PLANTS);
    setBids(MOCK_CARRIER_BIDS);
    setEconomicIndicators(ECONOMIC_INDICATORS);
    setNews(MARITIME_NEWS);
    addToast('Simulation State Reset', 'Restored default baseline logistics parameters, vessel coordinates, and market indices.', 'success');
  };

  return (
    <SimulationContext.Provider
      value={{
        currentUser,
        setCurrentUserRole,
        logout,
        activeTab,
        setActiveTab,
        vessels,
        ports,
        plants,
        bids,
        economicIndicators,
        news,
        isSimulationRunning,
        setIsSimulationRunning,
        toasts,
        addToast,
        dismissToast,
        activeLandedCost,
        calculateLandedCost,
        awardBid,
        divertVessel,
        triggerCycloneSimulation,
        triggerBalticSurgeSimulation,
        triggerBokaroStockDipSimulation,
        resetSimulation,
        selectedVesselForDrawer,
        setSelectedVesselForDrawer
      }}
    >
      {children}
    </SimulationContext.Provider>
  );
};

export const useSimulation = () => {
  const context = useContext(SimulationContext);
  if (!context) {
    throw new Error('useSimulation must be used within a SimulationProvider');
  }
  return context;
};
