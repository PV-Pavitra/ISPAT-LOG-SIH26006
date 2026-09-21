import React, { useState } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { HISTORICAL_VOYAGES } from '../../data/mockData';
import { 
  Warehouse, 
  AlertTriangle, 
  CheckCircle2, 
  History, 
  Search, 
  Filter, 
  Train, 
  Ship, 
  ArrowUpRight, 
  ExternalLink, 
  TrendingUp, 
  Download,
  Clock,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { SteelPlant } from '../../types';

export const PlantInventoryLogs: React.FC = () => {
  const { plants, addToast } = useSimulation();
  const [searchLog, setSearchLog] = useState<string>('');
  const [selectedPlantFilter, setSelectedPlantFilter] = useState<string>('ALL');

  const filteredLogs = HISTORICAL_VOYAGES.filter(log => {
    if (selectedPlantFilter !== 'ALL' && log.steelPlant !== selectedPlantFilter) return false;
    if (searchLog.trim() !== '') {
      const q = searchLog.toLowerCase();
      return (
        log.voyageNo.toLowerCase().includes(q) ||
        log.vesselName.toLowerCase().includes(q) ||
        log.carrierName.toLowerCase().includes(q) ||
        log.origin.toLowerCase().includes(q) ||
        log.destinationPort.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleOrderEmergencyRake = (plant: SteelPlant) => {
    addToast(
      `Emergency Rake Requisition Sent: ${plant.name}`,
      `Triggered FOIS / Indian Railways prioritized BOXN rake requisition for 3 rakes (~11,400 MT) from ${plant.primaryPort} to ${plant.name}.`,
      'success'
    );
  };

  return (
    <div className="space-y-6 pb-16">
      
      {/* Header Banner */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-50 text-[#002147]">
            <Warehouse className="w-5 h-5 text-sky-600" />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-[#002147]">
              Plant Inventory Stock Gauges & Historical Voyage Logs
            </h1>
            <p className="text-xs text-slate-500">
              Cross-enterprise coking coal reserves monitoring across 6 public sector steel complexes & 12-month voyage audit logs
            </p>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 text-xs bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
          <span className="font-bold text-slate-500 uppercase text-[10px]">Thresholds:</span>
          <span className="flex items-center gap-1 font-semibold text-rose-700">
            <span className="w-2 h-2 rounded-full bg-rose-500" /> Critical (&lt;7d)
          </span>
          <span className="flex items-center gap-1 font-semibold text-amber-700">
            <span className="w-2 h-2 rounded-full bg-amber-500" /> Caution (7-14d)
          </span>
          <span className="flex items-center gap-1 font-semibold text-emerald-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500" /> Optimal (&gt;14d)
          </span>
        </div>
      </div>

      {/* 1. Plant Inventory Stock Gauges (6 Plants) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {plants.map((plant) => {
          const isCritical = plant.daysRemaining < 7;
          const isCaution = plant.daysRemaining >= 7 && plant.daysRemaining <= 14;
          const statusColor = isCritical ? 'border-rose-400 bg-rose-50/20' : isCaution ? 'border-amber-300 bg-amber-50/20' : 'border-emerald-300 bg-emerald-50/20';
          const badgeColor = isCritical ? 'bg-rose-100 text-rose-800' : isCaution ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800';

          return (
            <div
              key={plant.id}
              id={`plant-card-${plant.id}`}
              className={`bg-white rounded-2xl border-2 p-5 shadow-sm hover:shadow-md transition-all space-y-4 ${statusColor}`}
            >
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-900 text-sm">{plant.name}</h3>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 font-bold text-slate-600">
                      {plant.code}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">{plant.location}, {plant.state}</p>
                </div>

                <span className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full ${badgeColor}`}>
                  {isCritical ? 'CRITICAL' : isCaution ? 'CAUTION' : 'OPTIMAL'}
                </span>
              </div>

              {/* Big Days Gauge Metric */}
              <div className="flex items-baseline justify-between pt-1">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Coal Buffer Days
                  </span>
                  <div className="text-3xl font-black font-mono text-[#002147]">
                    {plant.daysRemaining.toFixed(1)}
                    <span className="text-sm font-semibold text-slate-400 ml-1">Days</span>
                  </div>
                </div>

                <div className="text-right font-mono text-xs">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Current Stock</span>
                  <strong className="text-slate-800 text-sm font-bold">
                    {(plant.currentStockMT / 1000).toFixed(0)}k MT
                  </strong>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1">
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isCritical ? 'bg-rose-500' : isCaution ? 'bg-amber-500' : 'bg-emerald-500'
                    }`}
                    style={{ width: `${Math.min((plant.daysRemaining / 21) * 100, 100)}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>0d</span>
                  <span>7d (Crit)</span>
                  <span>14d</span>
                  <span>21d+</span>
                </div>
              </div>

              {/* Operational Stats */}
              <div className="grid grid-cols-2 gap-2 text-[11px] pt-1 border-t border-slate-100">
                <div>
                  <span className="text-slate-400">Daily Burn Rate:</span>
                  <p className="font-bold text-slate-800 font-mono">
                    {plant.dailyConsumptionMT.toLocaleString()} MT/day
                  </p>
                </div>
                <div>
                  <span className="text-slate-400">Primary Discharge:</span>
                  <p className="font-bold text-slate-800">
                    {plant.primaryPort} Port
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <button
                id={`btn-emergency-rake-${plant.id}`}
                onClick={() => handleOrderEmergencyRake(plant)}
                className={`w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                  isCritical
                    ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-sm'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                }`}
              >
                <Train className="w-3.5 h-3.5" />
                <span>{isCritical ? 'Dispatch Emergency Rake' : 'Request Rake Evacuation'}</span>
              </button>
            </div>
          );
        })}
      </div>

      {/* 2. Historical Voyage Log Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <History className="w-4 h-4 text-sky-600" />
              <h2 className="font-bold text-slate-900 text-sm sm:text-base">
                12-Month Historical Benchmark Voyage Logs
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Verified voyage performance records, demurrage paid, and delivered landed costs per metric ton
            </p>
          </div>

          {/* Filters & Search */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search voyage / vessel..."
                value={searchLog}
                onChange={(e) => setSearchLog(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-900"
              />
            </div>

            <select
              value={selectedPlantFilter}
              onChange={(e) => setSelectedPlantFilter(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="ALL">All Plants</option>
              {plants.map(p => (
                <option key={p.id} value={p.id}>{p.code} - {p.name.replace('SAIL ', '').replace('RINL ', '')}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Table View */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-400 uppercase font-bold text-[10px]">
                <th className="py-2.5 px-3">Voyage No</th>
                <th className="py-2.5 px-3">Vessel & Carrier</th>
                <th className="py-2.5 px-3">Origin Hub ➔ Destination</th>
                <th className="py-2.5 px-3">Plant</th>
                <th className="py-2.5 px-3">Cargo (MT)</th>
                <th className="py-2.5 px-3">Days</th>
                <th className="py-2.5 px-3">Freight Paid</th>
                <th className="py-2.5 px-3">Demurrage</th>
                <th className="py-2.5 px-3">Landed ₹/MT</th>
                <th className="py-2.5 px-3 text-right">Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLogs.map((log) => {
                const hadDemurrage = log.demurragePaidUSD > 0;
                return (
                  <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-3 font-mono font-bold text-slate-700">
                      {log.voyageNo}
                    </td>
                    <td className="py-3 px-3">
                      <div className="font-bold text-slate-900">{log.vesselName}</div>
                      <div className="text-[11px] text-slate-500">{log.carrierName}</div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="text-slate-800 font-medium">{log.origin.split(',')[0]}</div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-1">
                        <span>➔</span> {log.destinationPort.split('(')[0]}
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <span className="font-mono font-bold text-[11px] px-2 py-0.5 rounded bg-slate-100 text-[#002147]">
                        {log.steelPlant}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-mono">
                      {(log.volumeMT / 1000).toFixed(0)}k MT
                    </td>
                    <td className="py-3 px-3 font-mono font-semibold text-slate-700">
                      {log.voyageDurationDays}d
                    </td>
                    <td className="py-3 px-3 font-mono font-bold text-blue-900">
                      ${log.freightPaidPerMTUSD.toFixed(2)}
                    </td>
                    <td className={`py-3 px-3 font-mono font-bold ${hadDemurrage ? 'text-amber-700' : 'text-emerald-700'}`}>
                      {hadDemurrage ? `$${log.demurragePaidUSD.toLocaleString()}` : '$0'}
                    </td>
                    <td className="py-3 px-3 font-mono font-bold text-slate-900">
                      ₹{log.landedCostPerMTINR.toLocaleString()}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <span className={`inline-flex items-center font-extrabold px-2 py-0.5 rounded text-[11px] font-mono ${
                        log.efficiencyScore >= 90
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {log.efficiencyScore}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Table summary footer */}
        <div className="text-[11px] text-slate-400 pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Showing {filteredLogs.length} completed PSU raw material voyages.</span>
          <span className="font-medium text-slate-600">
            Average Turnaround: 17.5 Days • Total Demurrage Paid: $209,500
          </span>
        </div>

      </div>

    </div>
  );
};
