import React, { useEffect, useRef, useState } from 'react';
import { useSimulation } from '../../context/SimulationContext';
import { Vessel, DestinationPort } from '../../types';
import L from 'leaflet';
import { 
  Ship, 
  Compass, 
  Anchor, 
  AlertTriangle, 
  ShieldAlert, 
  Waves, 
  MapPin, 
  Gauge, 
  DollarSign, 
  Calendar, 
  Clock, 
  Navigation, 
  Filter, 
  X,
  ArrowRight,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export const FleetMapTracker: React.FC = () => {
  const { 
    vessels, 
    ports, 
    selectedVesselForDrawer, 
    setSelectedVesselForDrawer,
    divertVessel,
    addToast
  } = useSimulation();

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const routesLayerRef = useRef<L.LayerGroup | null>(null);
  const portsLayerRef = useRef<L.LayerGroup | null>(null);

  // Filters
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [filterCargo, setFilterCargo] = useState<string>('ALL');

  // Initialize Leaflet Map once
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    // Center between Indian Ocean, Bay of Bengal, and Australia/Africa
    const map = L.map(mapContainerRef.current, {
      center: [6.0, 85.0],
      zoom: 4,
      minZoom: 3,
      maxZoom: 10,
      zoomControl: false
    });

    // Elegant Maritime Ocean Base Tile Layer (CartoDB Positron with ocean contrast)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://carto.com/">CARTO</a> | AIS Telemetry Grid',
      maxZoom: 19
    }).addTo(map);

    L.control.zoom({ position: 'topright' }).addTo(map);

    // Create persistent layer groups
    const routesLayer = L.layerGroup().addTo(map);
    const portsLayer = L.layerGroup().addTo(map);
    const markersLayer = L.layerGroup().addTo(map);

    routesLayerRef.current = routesLayer;
    portsLayerRef.current = portsLayer;
    markersLayerRef.current = markersLayer;
    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Trade Corridors & Port Congestion Rings
  useEffect(() => {
    const map = mapInstanceRef.current;
    const routesLayer = routesLayerRef.current;
    const portsLayer = portsLayerRef.current;
    if (!map || !routesLayer || !portsLayer) return;

    routesLayer.clearLayers();
    portsLayer.clearLayers();

    // 1. Draw Global Maritime Bulk Corridors
    const bulkCorridors = [
      {
        name: 'Australia - East India Coal Corridor',
        coords: [
          [-21.28, 149.29],
          [-10.50, 130.00],
          [-8.20, 115.00],
          [0.20, 98.00],
          [6.00, 90.00],
          [17.68, 83.21],
          [20.26, 86.67]
        ],
        color: '#0284C7'
      },
      {
        name: 'South Africa - India Bulk Line',
        coords: [
          [-28.80, 32.09],
          [-20.00, 50.00],
          [-10.00, 65.00],
          [5.00, 75.00],
          [14.25, 80.12],
          [20.26, 86.67]
        ],
        color: '#0369A1'
      },
      {
        name: 'Indonesia - India Coastal Rake Line',
        coords: [
          [-1.26, 116.82],
          [3.00, 105.00],
          [6.00, 95.00],
          [15.00, 88.00],
          [20.82, 86.96]
        ],
        color: '#0D9488'
      }
    ];

    bulkCorridors.forEach(c => {
      const poly = L.polyline(c.coords as L.LatLngExpression[], {
        color: c.color,
        weight: 2.5,
        opacity: 0.6,
        dashArray: '6, 8'
      }).addTo(routesLayer);
      poly.bindTooltip(c.name, { sticky: true, className: 'leaflet-custom-tooltip' });
    });

    // 2. Draw Port Congestion Rings on Indian Ports
    ports.forEach(port => {
      // Color coded by wait days
      const isHighCongestion = port.currentWaitDays > 4.5;
      const isMedium = port.currentWaitDays >= 2.0 && port.currentWaitDays <= 4.5;
      const ringColor = isHighCongestion ? '#E11D48' : isMedium ? '#D97706' : '#059669';
      const radiusMeters = 35000 + (port.vesselsInRoadstead * 3000);

      const circle = L.circle(port.coordinates, {
        color: ringColor,
        fillColor: ringColor,
        fillOpacity: isHighCongestion ? 0.25 : 0.15,
        radius: radiusMeters,
        weight: 2
      }).addTo(portsLayer);

      const portDivIcon = L.divIcon({
        className: 'custom-port-marker',
        html: `
          <div class="flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-bold shadow-md bg-white border-2 border-[${ringColor}] text-slate-900 pointer-events-auto transform -translate-x-1/2 -translate-y-1/2">
            <span class="w-2 h-2 rounded-full ${isHighCongestion ? 'bg-rose-500 animate-ping' : isMedium ? 'bg-amber-500' : 'bg-emerald-500'}"></span>
            <span>${port.name.split(' ')[0]}</span>
            <span class="text-[9px] font-mono px-1 rounded bg-slate-100 text-slate-700">${port.currentWaitDays}d wait</span>
          </div>
        `,
        iconSize: [110, 24],
        iconAnchor: [55, 12]
      });

      const portMarker = L.marker(port.coordinates, { icon: portDivIcon }).addTo(portsLayer);

      portMarker.bindPopup(`
        <div class="p-2 space-y-1.5 text-xs">
          <div class="font-bold text-slate-900 text-sm border-b pb-1">${port.name}</div>
          <div class="flex justify-between"><span>State:</span> <strong class="text-slate-800">${port.state}</strong></div>
          <div class="flex justify-between"><span>Wait Time:</span> <strong class="${isHighCongestion ? 'text-rose-600' : 'text-slate-800'} font-bold">${port.currentWaitDays} Days</strong></div>
          <div class="flex justify-between"><span>Queue:</span> <strong class="text-slate-800">${port.vesselsInRoadstead} Bulk Carriers</strong></div>
          <div class="flex justify-between"><span>Berth Occupancy:</span> <strong class="text-slate-800">${port.berthOccupancyPercent}%</strong></div>
          <div class="flex justify-between"><span>Handling Charge:</span> <strong class="text-slate-800 font-mono">₹${port.handlingChargesINRPerMT}/MT</strong></div>
          <div class="flex justify-between"><span>Max Draft:</span> <strong class="text-slate-800">${port.draftMaxMeters}m</strong></div>
        </div>
      `);
    });
  }, [ports]);

  // Update Vessel Markers when positions / statuses update
  useEffect(() => {
    const markersLayer = markersLayerRef.current;
    if (!markersLayer) return;

    markersLayer.clearLayers();

    const filteredVessels = vessels.filter(v => {
      if (filterStatus !== 'ALL' && v.status !== filterStatus) return false;
      if (filterCargo !== 'ALL' && v.cargoType !== filterCargo) return false;
      return true;
    });

    filteredVessels.forEach(vessel => {
      const isSelected = selectedVesselForDrawer?.id === vessel.id;
      const statusColor = {
        'In Transit': '#0284C7',
        'Anchored': '#D97706',
        'Discharging': '#8B5CF6',
        'Diverted': '#10B981'
      }[vessel.status];

      const vesselDivIcon = L.divIcon({
        className: 'custom-vessel-marker',
        html: `
          <div class="relative cursor-pointer group flex flex-col items-center transform -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-110">
            ${vessel.isAlert ? `
              <span class="absolute -top-3 -right-2 flex h-3.5 w-3.5">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-3.5 w-3.5 bg-rose-600 text-white text-[8px] font-bold items-center justify-center">!</span>
              </span>
            ` : ''}
            
            <div class="w-7 h-7 rounded-full flex items-center justify-center shadow-lg border-2 text-white ${
              isSelected ? 'ring-4 ring-sky-400 scale-110' : ''
            }" style="background-color: ${statusColor}; border-color: #FFFFFF;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" class="transform rotate-[${vessel.heading}deg]">
                <path d="M12 2L19 21L12 17L5 21L12 2Z"/>
              </svg>
            </div>

            <div class="mt-1 px-1.5 py-0.5 rounded bg-slate-900/90 text-white text-[9px] font-bold tracking-tight shadow-md whitespace-nowrap border border-slate-700">
              ${vessel.name.replace('M/V ', '')}
            </div>
          </div>
        `,
        iconSize: [80, 48],
        iconAnchor: [40, 24]
      });

      const marker = L.marker(vessel.currentPosition, { icon: vesselDivIcon }).addTo(markersLayer);

      marker.on('click', () => {
        setSelectedVesselForDrawer(vessel);
      });
    });
  }, [vessels, filterStatus, filterCargo, selectedVesselForDrawer, setSelectedVesselForDrawer]);

  return (
    <div className="space-y-4 pb-12">
      
      {/* Top Controls Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-blue-50 text-[#002147]">
            <Compass className="w-5 h-5 text-sky-600" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[#002147]">
              Live Maritime Fleet & Indian Port Telemetry Grid
            </h2>
            <p className="text-xs text-slate-500">
              Satellite AIS positioning, active demurrage accumulation, and port congestion heat rings
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-semibold">Status:</span>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="ALL">All Vessels ({vessels.length})</option>
              <option value="In Transit">In Transit</option>
              <option value="Anchored">Anchored (Demurrage Risk)</option>
              <option value="Discharging">Discharging</option>
              <option value="Diverted">Diverted</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <span className="font-semibold">Cargo:</span>
            <select
              value={filterCargo}
              onChange={(e) => setFilterCargo(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="ALL">All Cargo Types</option>
              <option value="Hard Coking Coal">Hard Coking Coal</option>
              <option value="PCI Coal">PCI Coal</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Map Container */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-lg bg-slate-100 h-[620px]">
        <div ref={mapContainerRef} className="w-full h-full z-10" />

        {/* Map Legend Overlay */}
        <div className="absolute top-4 left-4 z-20 bg-white/95 backdrop-blur-md p-3 rounded-xl border border-slate-200 shadow-md text-xs space-y-2 pointer-events-auto max-w-[220px]">
          <div className="font-bold text-slate-900 border-b pb-1 text-[11px] uppercase tracking-wider flex items-center justify-between">
            <span>Fleet Status Legend</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <div className="space-y-1.5 text-[11px]">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#0284C7]" />
              <span className="text-slate-700">In Transit ({vessels.filter(v => v.status === 'In Transit').length})</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#D97706]" />
              <span className="text-slate-700">Anchored ({vessels.filter(v => v.status === 'Anchored').length})</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#8B5CF6]" />
              <span className="text-slate-700">Discharging ({vessels.filter(v => v.status === 'Discharging').length})</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#10B981]" />
              <span className="text-slate-700">Diverted / Protected</span>
            </div>
          </div>
          
          <div className="pt-1.5 border-t border-slate-100 text-[10px] text-slate-500">
            Click any vessel marker or port ring to inspect detailed demurrage telemetry.
          </div>
        </div>

        {/* Selected Vessel Drawer (Slide-in panel) */}
        {selectedVesselForDrawer && (
          <div 
            id="vessel-detail-drawer"
            className="absolute top-4 right-4 z-20 w-96 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-200 p-5 space-y-4 max-h-[580px] overflow-y-auto animate-in slide-in-from-right-4 duration-200"
          >
            {/* Drawer Header */}
            <div className="flex items-start justify-between border-b border-slate-200 pb-3">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded text-white ${
                    selectedVesselForDrawer.status === 'In Transit' ? 'bg-sky-600' :
                    selectedVesselForDrawer.status === 'Anchored' ? 'bg-amber-600' :
                    selectedVesselForDrawer.status === 'Discharging' ? 'bg-purple-600' : 'bg-emerald-600'
                  }`}>
                    {selectedVesselForDrawer.status}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400">IMO: {selectedVesselForDrawer.imo}</span>
                </div>
                <h3 className="font-bold text-base text-slate-900 mt-1">{selectedVesselForDrawer.name}</h3>
                <p className="text-[11px] text-slate-500">{selectedVesselForDrawer.vesselClass} • {selectedVesselForDrawer.dwt.toLocaleString()} DWT</p>
              </div>

              <button
                onClick={() => setSelectedVesselForDrawer(null)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Alert banner if applicable */}
            {selectedVesselForDrawer.isAlert && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-900 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-rose-800">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span>Demurrage Risk Flag</span>
                </div>
                <p className="text-[11px] leading-tight text-rose-700">
                  {selectedVesselForDrawer.alertReason}
                </p>
              </div>
            )}

            {/* Vessel Operational Telemetry */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Speed / Course</span>
                <span className="font-bold text-slate-800 font-mono">{selectedVesselForDrawer.speedKnots} kts @ {selectedVesselForDrawer.heading}°</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Flag Registry</span>
                <span className="font-semibold text-slate-800 truncate block">{selectedVesselForDrawer.flag}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Cargo Consignment</span>
                <span className="font-bold text-slate-800">{selectedVesselForDrawer.cargoType}</span>
                <span className="text-[10px] text-slate-500 block">({selectedVesselForDrawer.cargoMT.toLocaleString()} MT)</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Charter Day Rate</span>
                <span className="font-bold text-blue-900 font-mono">${selectedVesselForDrawer.dailyCharterRateUSD.toLocaleString()}/day</span>
              </div>
            </div>

            {/* Demurrage Tracker Card */}
            <div className="p-3.5 rounded-xl bg-gradient-to-br from-slate-900 to-blue-950 text-white space-y-1">
              <div className="flex justify-between items-center text-xs text-sky-200">
                <span className="font-bold uppercase tracking-wider text-[10px]">Accumulated Demurrage</span>
                <span className="font-mono text-[10px]">Laytime Clock: Active</span>
              </div>
              <div className="text-2xl font-black font-mono text-amber-300">
                ${selectedVesselForDrawer.accumulatedDemurrageUSD.toLocaleString()}
                <span className="text-xs font-normal text-slate-300 ml-1">
                  (₹{((selectedVesselForDrawer.accumulatedDemurrageUSD * 86.42) / 100000).toFixed(1)} Lakhs)
                </span>
              </div>
              <p className="text-[10px] text-slate-300">
                Calculated per charter party agreement pro-rata basis.
              </p>
            </div>

            {/* Route origin and destination */}
            <div className="space-y-1.5 text-xs">
              <div className="flex items-center justify-between text-slate-600">
                <span>Origin Hub:</span>
                <strong className="text-slate-800">{selectedVesselForDrawer.origin}</strong>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span>Destination Port:</span>
                <strong className="text-slate-800">{selectedVesselForDrawer.destination}</strong>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span>Target Plant:</span>
                <strong className="text-slate-800">SAIL / RINL [{selectedVesselForDrawer.plantDestination}]</strong>
              </div>
              <div className="flex items-center justify-between text-slate-600">
                <span>ETA:</span>
                <strong className="text-sky-700 font-mono">{selectedVesselForDrawer.eta}</strong>
              </div>
            </div>

            {/* AI Diversion Recommendation & Action */}
            {selectedVesselForDrawer.destination.includes('Paradip') && (
              <div className="pt-2 border-t border-slate-200">
                <button
                  onClick={() => divertVessel(selectedVesselForDrawer.id, 'IN-DHM')}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md transition-all active:scale-95"
                >
                  <Ship className="w-4 h-4" />
                  <span>Divert Vessel to Dhamra Port</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-[10px] text-slate-500 text-center mt-1">
                  Bypasses 5.2-day queue at Paradip. Est. demurrage avoidance: $115,000.
                </p>
              </div>
            )}

          </div>
        )}

      </div>

    </div>
  );
};
