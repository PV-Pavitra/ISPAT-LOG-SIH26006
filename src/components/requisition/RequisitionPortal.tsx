import React, { useState } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { 
  STEEL_PLANTS, 
  ORIGIN_PORTS, 
  DESTINATION_PORTS 
} from '../../data/mockData';
import { 
  SteelPlantId, 
  RawMaterialType 
} from '../../types';
import { 
  Calculator, 
  Ship, 
  Anchor, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle, 
  ArrowRight, 
  FileCheck, 
  Sparkles, 
  DollarSign, 
  Train, 
  ShieldAlert, 
  Compass, 
  Award,
  Layers,
  ArrowUpRight,
  Printer
} from 'lucide-react';

export const RequisitionPortal: React.FC = () => {
  const { 
    ports, 
    plants, 
    bids, 
    awardBid, 
    activeLandedCost, 
    calculateLandedCost,
    addToast,
    divertVessel,
    vessels
  } = useSimulation();

  // Requisition Form State
  const [selectedPlantId, setSelectedPlantId] = useState<SteelPlantId>('BSL');
  const [selectedMaterial, setSelectedMaterial] = useState<RawMaterialType>('Hard Coking Coal');
  const [cargoVolumeMT, setCargoVolumeMT] = useState<number>(75000);
  const [originPortId, setOriginPortId] = useState<string>('AU-HPG');
  const [destinationPortId, setDestinationPortId] = useState<string>('IN-PRT');
  const [laycanStart, setLaycanStart] = useState<string>('2026-09-28');
  const [laycanEnd, setLaycanEnd] = useState<string>('2026-10-06');
  const [charterType, setCharterType] = useState<string>('Spot Charter');
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [awardedModalBid, setAwardedModalBid] = useState<any>(null);

  const selectedPlant = plants.find(p => p.id === selectedPlantId) || plants[0];
  const selectedOrigin = ORIGIN_PORTS.find(o => o.id === originPortId) || ORIGIN_PORTS[0];
  const selectedDestPort = ports.find(p => p.id === destinationPortId) || ports[0];

  // Quick Preset Handlers
  const handleLoadPreset = (preset: 'bokaro_coking' | 'bhilai_pci' | 'rinl_coastal') => {
    if (preset === 'bokaro_coking') {
      setSelectedPlantId('BSL');
      setSelectedMaterial('Hard Coking Coal');
      setCargoVolumeMT(150000);
      setOriginPortId('AU-HPG');
      setDestinationPortId('IN-PRT');
      setCharterType('Spot Charter');
    } else if (preset === 'bhilai_pci') {
      setSelectedPlantId('BSP');
      setSelectedMaterial('PCI Coal');
      setCargoVolumeMT(75000);
      setOriginPortId('ZA-RCB');
      setDestinationPortId('IN-VTZ');
      setCharterType('Time Charter (3 Months)');
    } else if (preset === 'rinl_coastal') {
      setSelectedPlantId('VSP');
      setSelectedMaterial('Hard Coking Coal');
      setCargoVolumeMT(160000);
      setOriginPortId('AU-HPG');
      setDestinationPortId('IN-VTZ');
      setCharterType('Time Charter (6 Months)');
    }

    addToast('Preset Requisition Loaded', `Applied standard parameters for ${preset.replace('_', ' ').toUpperCase()}`, 'info');
  };

  const handleCalculate = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsCalculating(true);
    setTimeout(() => {
      calculateLandedCost({
        plantId: selectedPlantId,
        material: selectedMaterial,
        volumeMT: cargoVolumeMT,
        originId: originPortId,
        destinationPortId: destinationPortId,
        charterType: charterType
      });
      setIsCalculating(false);
      addToast(
        'Optimization Grid Calculated', 
        `Landed cost computed: $${activeLandedCost?.landedCostPerMTUSD}/MT (₹${activeLandedCost?.landedCostPerMTINR.toLocaleString()}/MT) with carrier ranking.`, 
        'success'
      );
    }, 400);
  };

  return (
    <div className="space-y-6 pb-16">
      
      {/* Top Requisition Title & Presets Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-blue-50 text-[#002147]">
              <FileCheck className="w-5 h-5 text-sky-600" />
            </span>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-[#002147]">
                Ministry Requisition & Landed Cost Optimization Grid
              </h1>
              <p className="text-xs text-slate-500">
                Automated multi-modal freight calculation, carrier auction matching, and port demurrage risk engine
              </p>
            </div>
          </div>
        </div>

        {/* Quick Presets */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0">
            Quick Scenarios:
          </span>
          <button
            onClick={() => handleLoadPreset('bokaro_coking')}
            className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-800 border border-slate-200 transition-all shrink-0"
          >
            SAIL Bokaro (150K MT Coal)
          </button>
          <button
            onClick={() => handleLoadPreset('bhilai_pci')}
            className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-800 border border-slate-200 transition-all shrink-0"
          >
            SAIL Bhilai (75K MT PCI)
          </button>
          <button
            onClick={() => handleLoadPreset('rinl_coastal')}
            className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-800 border border-slate-200 transition-all shrink-0"
          >
            RINL Vizag Coastal Capesize
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: Input Form Fields (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Calculator className="w-4 h-4 text-sky-600" />
              1. Enter Import Requisition Parameters
            </h2>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-[#002147]">
              FORM PS-SIH26006
            </span>
          </div>

          <form onSubmit={handleCalculate} className="space-y-4">
            
            {/* Field 1: Target Steel Plant */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Target Steel Plant (Consignee)
              </label>
              <select
                id="select-steel-plant"
                value={selectedPlantId}
                onChange={(e) => setSelectedPlantId(e.target.value as SteelPlantId)}
                className="w-full text-xs font-semibold bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              >
                {plants.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} [{p.code}] — {p.state} (Current Stock: {p.daysRemaining}d)
                  </option>
                ))}
              </select>
            </div>

            {/* Field 2 & 3: Raw Material & Cargo Volume */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Raw Material Type
                </label>
                <select
                  id="select-raw-material"
                  value={selectedMaterial}
                  onChange={(e) => setSelectedMaterial(e.target.value as RawMaterialType)}
                  className="w-full text-xs font-semibold bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                >
                  <option value="Hard Coking Coal">Hard Coking Coal (HCC)</option>
                  <option value="PCI Coal">PCI Coal (Pulverized)</option>
                  <option value="Iron Ore Pellets">Iron Ore Pellets (DR Grade)</option>
                  <option value="Limestone">Limestone (Blast Furnace)</option>
                  <option value="Dolomite">Dolomite (Flux Grade)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Cargo Volume (Metric Tons)
                </label>
                <div className="relative">
                  <input
                    id="input-cargo-volume"
                    type="number"
                    step="5000"
                    min="20000"
                    max="200000"
                    value={cargoVolumeMT}
                    onChange={(e) => setCargoVolumeMT(Number(e.target.value))}
                    className="w-full text-xs font-semibold bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                  />
                  <span className="absolute right-3 top-2.5 text-[11px] font-bold text-slate-400">
                    MT
                  </span>
                </div>
              </div>
            </div>

            {/* Field 4: Origin / Load Port */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Origin / Global Load Hub (FOB Origin)
              </label>
              <select
                id="select-origin-port"
                value={originPortId}
                onChange={(e) => setOriginPortId(e.target.value)}
                className="w-full text-xs font-semibold bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              >
                {ORIGIN_PORTS.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.name} ({o.country}) — Base FOB: ${o.typicalFOBUSD}/MT
                  </option>
                ))}
              </select>
            </div>

            {/* Field 5: Destination Port */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center justify-between">
                <span>Destination Port (Indian Bulk Discharge)</span>
                <span className="text-[10px] text-amber-600 font-semibold">
                  Wait: {selectedDestPort.currentWaitDays} days
                </span>
              </label>
              <select
                id="select-destination-port"
                value={destinationPortId}
                onChange={(e) => setDestinationPortId(e.target.value)}
                className="w-full text-xs font-semibold bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              >
                {ports.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} — Wait: {p.currentWaitDays}d ({p.vesselsInRoadstead} waiting)
                  </option>
                ))}
              </select>
            </div>

            {/* Field 6: Target Laycan Window */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Laycan Start Date
                </label>
                <input
                  id="input-laycan-start"
                  type="date"
                  value={laycanStart}
                  onChange={(e) => setLaycanStart(e.target.value)}
                  className="w-full text-xs font-semibold bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Laycan End Date
                </label>
                <input
                  id="input-laycan-end"
                  type="date"
                  value={laycanEnd}
                  onChange={(e) => setLaycanEnd(e.target.value)}
                  className="w-full text-xs font-semibold bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                />
              </div>
            </div>

            {/* Field 7: Preferred Charter Type */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Preferred Charter Contract Structure
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['Spot Charter', 'Time Charter (3 Months)', 'Time Charter (6 Months)'].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setCharterType(type)}
                    className={`py-2 px-2 text-center rounded-xl text-[11px] font-semibold transition-all border ${
                      charterType === type
                        ? 'bg-[#002147] text-white border-[#002147] shadow-sm'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Action Button */}
            <div className="pt-2">
              <button
                id="btn-calculate-freight-and-bids"
                type="submit"
                disabled={isCalculating}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#002147] to-blue-700 hover:from-[#0B3B73] hover:to-blue-800 shadow-md shadow-blue-950/20 active:scale-[0.99] transition-all"
              >
                {isCalculating ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Executing Optimization Model...</span>
                  </>
                ) : (
                  <>
                    <Calculator className="w-4 h-4 text-amber-300" />
                    <span>Calculate Freight & Match Bids</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

          </form>
        </div>

        {/* RIGHT COLUMN: Dynamic Output Engine (7 cols) */}
        <div className="lg:col-span-7 space-y-6">

          {/* Card 1: Live Freight Rate & Landed Cost Card */}
          {activeLandedCost && (
            <div 
              id="card-landed-cost-output"
              className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700 bg-sky-50 px-2 py-0.5 rounded">
                    Landed Cost Calculation Model
                  </span>
                  <h3 className="font-bold text-slate-900 text-base mt-1">
                    Delivered Landed Cost at {selectedPlant.name}
                  </h3>
                </div>

                <div className="text-right">
                  <span className="text-[11px] font-bold text-slate-400">Total Shipment Value</span>
                  <div className="text-lg font-black text-[#002147] font-mono">
                    ₹{((activeLandedCost.landedCostPerMTINR * cargoVolumeMT) / 10000000).toFixed(2)} Cr
                    <span className="text-xs font-normal text-slate-500 ml-1">
                      (${((activeLandedCost.landedCostPerMTUSD * cargoVolumeMT) / 1000000).toFixed(2)}M)
                    </span>
                  </div>
                </div>
              </div>

              {/* High-Level Dual Currency Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-gradient-to-br from-slate-900 to-[#002147] text-white">
                  <div className="flex items-center justify-between text-xs text-sky-200">
                    <span className="font-semibold uppercase tracking-wider">USD Landed Metric</span>
                    <span className="font-mono text-[11px]">FOB + Freight + Port + Demurrage</span>
                  </div>
                  <div className="text-3xl font-extrabold font-mono mt-2 text-white">
                    ${activeLandedCost.landedCostPerMTUSD.toFixed(2)}
                    <span className="text-sm font-semibold text-slate-300 ml-1">/ MT</span>
                  </div>
                  <p className="text-[11px] text-slate-300 mt-1">
                    Benchmark CIF price delivered to railhead
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-br from-blue-900 to-sky-900 text-white">
                  <div className="flex items-center justify-between text-xs text-sky-200">
                    <span className="font-semibold uppercase tracking-wider">INR Delivered Price</span>
                    <span className="font-mono text-[11px]">RBI Ref: 1$ = ₹{activeLandedCost.usdInrRate}</span>
                  </div>
                  <div className="text-3xl font-extrabold font-mono mt-2 text-amber-300">
                    ₹{activeLandedCost.landedCostPerMTINR.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    <span className="text-sm font-semibold text-sky-100 ml-1">/ MT</span>
                  </div>
                  <p className="text-[11px] text-sky-100 mt-1">
                    Includes Indian Railways freight rake tariff to plant
                  </p>
                </div>
              </div>

              {/* Exact Formula Breakdown */}
              <div>
                <div className="text-xs font-bold text-slate-600 mb-2 flex items-center justify-between">
                  <span className="font-mono text-[11px] text-slate-500">
                    Formula: [Landed = FOB + Ocean Freight + Port Handling + Demurrage + Inland Rail + Customs]
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 text-center text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="block text-[10px] text-slate-500 font-bold uppercase">1. FOB Price</span>
                    <span className="font-bold text-slate-800 font-mono">${activeLandedCost.fobPriceUSD}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200">
                    <span className="block text-[10px] text-blue-700 font-bold uppercase">2. Ocean Freight</span>
                    <span className="font-bold text-blue-900 font-mono">${activeLandedCost.oceanFreightUSD}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="block text-[10px] text-slate-500 font-bold uppercase">3. Port Handling</span>
                    <span className="font-bold text-slate-800 font-mono">${activeLandedCost.portHandlingUSD}</span>
                  </div>
                  <div className={`p-2.5 rounded-xl border ${activeLandedCost.estimatedDemurrageUSD > 3 ? 'bg-amber-50 border-amber-200 text-amber-900' : 'bg-slate-50 border-slate-200 text-slate-800'}`}>
                    <span className="block text-[10px] font-bold uppercase">4. Demurrage</span>
                    <span className="font-bold font-mono">${activeLandedCost.estimatedDemurrageUSD}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="block text-[10px] text-slate-500 font-bold uppercase">5. Inland Rail</span>
                    <span className="font-bold text-slate-800 font-mono">${activeLandedCost.inlandRailUSD}</span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="block text-[10px] text-slate-500 font-bold uppercase">6. Customs</span>
                    <span className="font-bold text-slate-800 font-mono">${activeLandedCost.customsDutyUSD}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Card 2: Optimal Route & Port Congestion Risk Card */}
          {activeLandedCost && (
            <div 
              id="card-optimal-route-risk"
              className={`p-5 rounded-2xl border shadow-sm transition-all ${
                activeLandedCost.potentialSavingsUSD 
                  ? 'bg-gradient-to-r from-amber-50/70 via-white to-emerald-50/70 border-amber-300'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className={`p-2.5 rounded-xl ${activeLandedCost.potentialSavingsUSD ? 'bg-amber-100 text-amber-900' : 'bg-blue-100 text-blue-900'}`}>
                    {activeLandedCost.potentialSavingsUSD ? <AlertTriangle className="w-5 h-5 text-amber-600" /> : <Compass className="w-5 h-5 text-blue-600" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-slate-900">
                        Route Recommendation & Demurrage Risk Shield
                      </h4>
                      {activeLandedCost.potentialSavingsUSD && (
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-emerald-600 text-white uppercase tracking-wider">
                          DIVERSION RECOMMENDED
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Primary discharge port <strong className="text-slate-900">{selectedDestPort.name}</strong> currently has an estimated wait time of <strong className="text-amber-700">{selectedDestPort.currentWaitDays} days</strong> with {selectedDestPort.vesselsInRoadstead} vessels in roadstead.
                    </p>

                    {activeLandedCost.divertedPort && activeLandedCost.potentialSavingsUSD && (
                      <div className="mt-3 p-3 rounded-xl bg-white border border-emerald-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                            Recommended Alternative Port
                          </span>
                          <p className="text-xs font-bold text-slate-900">
                            Divert to {activeLandedCost.divertedPort} (Avg Wait: 1.1 Days)
                          </p>
                        </div>
                        <div className="text-left sm:text-right">
                          <span className="text-[10px] font-bold uppercase text-slate-400">Demurrage Avoided</span>
                          <div className="text-sm font-black text-emerald-700 font-mono">
                            +${activeLandedCost.potentialSavingsUSD.toLocaleString()}
                            <span className="text-xs text-slate-500 font-normal ml-1">
                              (₹{((activeLandedCost.potentialSavingsINR || 0) / 100000).toFixed(1)} Lakhs)
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Card 3: Carrier Tender Matching Grid */}
          <div 
            id="carrier-tender-matching-grid"
            className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-500" />
                  <h3 className="font-bold text-slate-900 text-sm">
                    Live Carrier Tender Matching Grid (Reverse Auction)
                  </h3>
                </div>
                <p className="text-xs text-slate-500">
                  Direct spot / contract bids evaluated via CVC compliance and dynamic L1/L2/L3 scoring
                </p>
              </div>

              <span className="text-[11px] font-semibold text-slate-500">
                Active Bids: <strong className="text-slate-800">{bids.length} Qualified Vessels</strong>
              </span>
            </div>

            {/* Bids Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 uppercase font-bold text-[10px]">
                    <th className="py-2.5 px-3">Rank</th>
                    <th className="py-2.5 px-3">Carrier / Vessel Details</th>
                    <th className="py-2.5 px-3">Offered Day Rate</th>
                    <th className="py-2.5 px-3">Freight / MT</th>
                    <th className="py-2.5 px-3">Rating</th>
                    <th className="py-2.5 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {bids.map((bid) => {
                    const isAwarded = bid.status === 'Awarded';
                    const isL1 = bid.rank === 'L1';
                    
                    return (
                      <tr 
                        key={bid.id} 
                        className={`transition-colors ${
                          isAwarded 
                            ? 'bg-emerald-50/60 font-medium' 
                            : isL1 
                            ? 'bg-blue-50/40 hover:bg-blue-50/70' 
                            : 'hover:bg-slate-50'
                        }`}
                      >
                        {/* Rank Badge */}
                        <td className="py-3 px-3">
                          <span className={`inline-flex items-center justify-center font-extrabold px-2 py-0.5 rounded text-[11px] font-mono ${
                            bid.rank === 'L1'
                              ? 'bg-emerald-600 text-white shadow-sm'
                              : bid.rank === 'L2'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-slate-100 text-slate-700'
                          }`}>
                            {bid.rank}
                          </span>
                        </td>

                        {/* Carrier & Vessel */}
                        <td className="py-3 px-3">
                          <div className="font-bold text-slate-900">{bid.carrierName}</div>
                          <div className="text-[11px] text-slate-500 flex items-center gap-1.5 mt-0.5">
                            <span className="font-medium">{bid.vesselName}</span>
                            <span>•</span>
                            <span className="text-slate-400">{bid.vesselClass} (Built {bid.builtYear})</span>
                          </div>
                        </td>

                        {/* Offered Day Rate */}
                        <td className="py-3 px-3 font-mono font-bold text-slate-800">
                          ${bid.offeredDayRateUSD.toLocaleString()}/day
                        </td>

                        {/* Freight / MT */}
                        <td className="py-3 px-3 font-mono font-bold text-blue-900">
                          ${bid.offeredFreightPerMTUSD.toFixed(2)}
                        </td>

                        {/* Rating */}
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-1 font-semibold text-slate-700">
                            <span className="text-amber-500 text-xs">★</span>
                            <span>{bid.rating}</span>
                            <span className="text-[10px] text-slate-400">({bid.score}%)</span>
                          </div>
                        </td>

                        {/* Award Action */}
                        <td className="py-3 px-3 text-right">
                          {isAwarded ? (
                            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-lg">
                              <CheckCircle className="w-3.5 h-3.5" /> Awarded
                            </span>
                          ) : (
                            <button
                              id={`btn-award-bid-${bid.id}`}
                              onClick={() => {
                                awardBid(bid.id);
                                setAwardedModalBid(bid);
                              }}
                              className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all ${
                                isL1
                                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
                                  : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                              }`}
                            >
                              Award Tender
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-100 flex items-center justify-between">
              <span>Dynamic L1 assignment conforms to General Financial Rules (GFR 2017) & CVC Guidelines.</span>
              <span className="font-semibold text-slate-500">Security Deposit & Bank Guarantee Validated</span>
            </div>
          </div>

        </div>

      </div>

      {/* Tender Awarded Confirmation Modal */}
      {awardedModalBid && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                <FileCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Commercial Tender Fixture Confirmed
                </h3>
                <p className="text-xs text-slate-500">
                  Letter of Intent (LoI) Ref: LOI/SAIL/BULK/2026/0491
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Selected Carrier:</span>
                <strong className="text-slate-900">{awardedModalBid.carrierName}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Charter Vessel:</span>
                <strong className="text-slate-900">{awardedModalBid.vesselName} ({awardedModalBid.vesselClass})</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Agreed Freight Rate:</span>
                <strong className="text-blue-900 font-mono font-bold">${awardedModalBid.offeredFreightPerMTUSD}/MT</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Day Rate:</span>
                <strong className="text-slate-800 font-mono">${awardedModalBid.offeredDayRateUSD.toLocaleString()}/day</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Target Laycan:</span>
                <strong className="text-slate-800">{laycanStart} to {laycanEnd}</strong>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setAwardedModalBid(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors"
              >
                Close Summary
              </button>
              <button
                onClick={() => {
                  window.print();
                  setAwardedModalBid(null);
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#002147] hover:bg-[#0B3B73] transition-colors flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Export Official LoI</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
