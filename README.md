# 🚢 ISPAT-LOG: Integrated Steel Procurement And Transportation - Logistics Optimization Grid

> **Disclaimer:** This software is a concept prototype developed for **Smart India Hackathon (SIH) 2026** under **Problem Statement SIH26006 (Ministry of Steel)**. It is intended for demonstration purposes.

---

## 📌 Executive Summary

India's public and private steel enterprises (SAIL Bhilai, Bokaro, Rourkela, Durgapur, IISCO, RINL Vizag) rely heavily on ocean freight for importing critical raw materials—coking coal, PCI coal, and limestone—from Australia, South Africa, and Indonesia. 

**ISPAT-LOG** addresses major industry pain points:
* **Demurrage Losses:** Port wait times at major Indian bulk hubs (Paradip, Vizag, Haldia) cost $25,000–$45,000/day in penalties.
* **Freight Rate Volatility:** Rapid changes in Baltic Dry (BDI/BCI) indices result in sub-optimal vessel chartering.
* **Opaque Requisition & Bidding:** Fragmented coordination between plant requirements and shipping carrier bids.

**ISPAT-LOG** provides an enterprise-grade Decision Support System (DSS) connecting ministry requisition inputs directly to maritime telemetry, predictive freight analytics, port congestion risks, and automated carrier bid rankings.

---

## ✨ Key Features & System Modules

### 1. 📋 Ministry Requisition & Procurement Portal
* **Custom Requirements Form:** Procurement officers select target plant, material type, volume (MT), load/discharge ports, and laycan windows.
* **Dynamic Matching Engine:** Instantly calculates estimated freight rates ($/MT) and total landed cost using:
  $$\text{Landed Cost} = \text{FOB Price} + \text{Ocean Freight} + \text{Port Handling} + \text{Est. Demurrage} + \text{Inland Rail} + \text{Customs}$$
* **Open Carrier Bid Ranking:** Automatically ranks active shipping company bids with **L1 / L2 / L3** compliance badges.

### 2. 🗺️ Live Maritime & Port Fleet Tracker
* **Interactive Ocean Map:** Built with `React-Leaflet`, showing vessel corridors (Australia/SA/Indonesia → India).
* **Vessel Telemetry & Drawers:** Live status (In Transit, Anchored, Discharging), speed, IMO, cargo volume, and accumulated demurrage costs.
* **Port Congestion Heat Rings:** Real-time queue count and berth occupancy indicators across Indian ports.

### 3. 📈 Freight Analytics & 30/60/90 Day Forecasting
* Multi-curve charts using `Recharts` for Baltic Dry (BDI) and Capesize (BCI) indices.
* Predictive 30/60/90-day time-series forecasting with 95% confidence intervals.
* **Scenario Switcher:** Toggle between *Baseline*, *Bullish Demand*, and *Supply Chain Disruption* stress cases.

### 4. 📰 Global Maritime Economy & News Ticker
* Live macroeconomic metrics: Baltic indices, Brent Crude / Bunker Fuel costs, USD-INR exchange rates.
* Categorized news feed covering maritime alerts, weather depressions, and canal disruptions.
* **Live Demo Event Engine:** Includes a hidden controller to trigger mock events (e.g., "Simulate Bay of Bengal Cyclone").

### 5. 🏭 Plant Inventory Monitoring
* Tracks stock coverage across key facilities (SAIL BSP, BSL, RSP, DSP, ISP, RINL).
* Visual color-coded safety margins: **Critical** (<7 days), **Caution** (7–14 days), and **Optimal** (>14 days).

---

## 🔐 Mock Auth Credentials (For SIH Judges)

The platform includes quick one-click mock authentication:

| Role Profile | Access Level | Demo Capabilities |
| :--- | :--- | :--- |
| **Ministry Procurement Director** | Full Admin | Requisition creation, bid awards, scenario simulation |
| **Plant Logistics Officer (SAIL Bhilai)** | Plant View | Inventory burn-rate tracking & incoming shipment alerts |
| **Chartering Manager (Shipping Line)** | Carrier View | Open tender bid submissions & fixture tracking |

---

## 🛠️ Tech Stack

* **Frontend:** React 18, Vite, TypeScript
* **Styling:** Tailwind CSS, Lucide React Icons
* **Mapping:** Leaflet, React-Leaflet
* **Charts:** Recharts
* **State & Simulation:** In-memory reactive state engine with custom hooks
* **Notifications:** Sonner Toast Notifications

---

## 🚀 Quick Start & Local Setup

### Prerequisites
* **Node.js** (v18.0.0 or higher)
* **npm** or **pnpm**

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/PV-Pavitra/ISPAT-LOG-SIH2026.git](https://github.com/PV-Pavitra/ISPAT-LOG-SIH2026.git)
   cd ISPAT-LOG-SIH2026
