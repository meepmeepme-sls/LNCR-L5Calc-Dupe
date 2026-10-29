# LNCR-L5Calc-Dupe

A standalone duplicate of the **National Havoc Robot League (NHRL) NHRL** combat robotics calculator and design suite, configured and optimized for the **Cloudflare Pages Free Plan**.

---

## 🛠 Included Calculators & Tools

| Tool | Route | Description |
|---|---|---|
| **Drivetrain Calculator** | `/drivetrain` | Calculate wheel speeds, gear ratios, motor kV, and drivetrain mobility performance. |
| **Weapon Tip Speed Calculator** | `/weapon` | Determine weapon tip speed, spinner RPM, and kinetic energy/safety considerations. |
| **Robot Builder** | `/builder` | Step-by-step powertrain design assistant for drivetrain and weapon systems. |
| **Center Distance Calculator** | `/center-distance` | Calculate center-to-center distances for timing belts, chains, and gears. |
| **Scale Factors** | `/scale-factors` | Convert linear dimensions and scaling between combat robot weight classes. |
| **Battery Size Calculator** | `/battery-size` | Estimate battery capacity (mAh) from current draw, discharge rate, and match runtime. |
| **Watt-Hour Equivalency** | `/watt-hour` | Compare battery capacities and energy when changing cell counts (S) and voltages. |
| **Motor Torque Calculator** | `/torque` | Calculate motor torque, output torque, and linear push force with gear reductions. |
| **Audio Tach Assistant** | `/tach` | Estimate weapon RPM and tip speed from audio frequencies/recordings. |
| **Tournament Calculator** | `/tournament` | Calculate fight counts, brackets, and RCL point distributions. |

---

## 🚀 Cloudflare Pages Deployment (Free Plan)

This site is pre-rendered and statically exported with Cloudflare Pages Edge Functions support.

### Option 1: Git Integration (Recommended)
1. Go to your [Cloudflare Dashboard](https://dash.cloudflare.com/) > **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
2. Select repository: `LNCR-L5Calc-Dupe`.
3. Set the build configuration:
   - **Framework preset**: `None`
   - **Build command**: *(leave empty)*
   - **Build output directory**: `.` *(or leave default)*
4. Click **Save and Deploy**.
Your site is live instantly with an SSL certificate and custom domain support on Cloudflare's free global CDN!

### Option 2: Direct Deploy via Wrangler CLI
From the project folder, simply run:
```bash
npx wrangler pages deploy . --project-name lncr-l5calc-dupe
```

### Option 3: Direct Upload via Web Dashboard
1. Go to Cloudflare Dashboard > **Workers & Pages** > **Create application** > **Pages** > **Upload assets**.
2. Create project name: `lncr-l5calc-dupe`.
3. Drag and drop the folder files and click **Deploy**.

---

## 💻 Local Development / Testing

A zero-dependency local preview server is included:

```bash
# Start local preview server
npm start
# or: node server.js
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Repository Structure

- `index.html` - NHRL home dashboard
- `[tool]/index.html` & `[tool].html` - Subpage static entry points with clean URL support
- `_next/` - Client React components, Next.js chunk bundles, styles, and web fonts
- `_rsc/` - React Server Component payloads for instantaneous client-side transitions
- `images/` & `icons/` - Logos, icons, and graphic assets
- `functions/` - Cloudflare Pages Edge Functions:
  - `_middleware.js` - Serves RSC payloads when Next.js prefetching headers are present
  - `api/scrape-points.js` - Serverless proxy for tournament scraper API
- `_headers` - Cloudflare Pages edge cache and security headers
- `_redirects` - Route mappings for clean URLs
- `wrangler.toml` - Cloudflare Pages project configuration
