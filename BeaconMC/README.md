# ✦ BeaconMC - Official Minecraft Server Website & Store

Welcome to the official website for **BeaconMC**, an all-in-one Minecraft server portal built with pure **HTML5**, **CSS3**, and **Vanilla JavaScript**.

🌐 **Live Published Website**: [https://autumn-runner-mstvh.shipped.run/](https://autumn-runner-mstvh.shipped.run/)

---

## ✨ Features Included

1. **Customizable Server IP & Connection Hub**:
   - Live Server Address: **`play.BeaconMC.space`** (Java Port: `25565`, Bedrock Port: `19132`).
   - One-click **Copy IP** with real-time feedback toast notification.
   - Live Server Ping & Player Count tracker (queries `mcstatus.io` API directly).
   - 3-Step interactive connection tutorial for both Java and Bedrock (mobile & console).

2. **Customizable Staff Roster**:
   - Pre-configured with all 7 requested roles:
     - 👑 **Founder**
     - 👑 **Owner**
     - 🛡️ **Admin**
     - 🔨 **Mod (Moderator)**
     - 🔷 **Staff**
     - 🎨 **Builder**
     - 🤝 **Helper**
   - Automatically renders real 3D Minecraft skin heads via `mc-heads.net` API simply by entering the Minecraft In-Game Name (IGN).
   - Filter tabs: All, Leadership, Management, Creative & Support.
   - Direct Discord tag copy buttons.

3. **Server Ranks & Web Store**:
   - Showcase server ranks:
     - **Scout** (Coal Tier)
     - **Warrior** (Iron Tier)
     - **Knight** (Gold Tier - Most Popular)
     - **Lord** (Diamond Tier)
     - **Titan** (Netherite Tier)
     - **BEACON GOD** (Supreme Celestial Tier)
   - Crate keys and cosmetics tabs.
   - Interactive **Rank Checkout & Preview Modal**:
     - Type any Minecraft username to preview that player's 3D skin model live!
     - Lists all unlocked permissions, commands, and multipliers.
     - Direct checkout link to your store (`https://store.beaconmc.space`).

4. **🔒 Secure Admin Settings Portal (Restricted to Authorized Gmails)**:
   - Protected by an authentication gate — only authorized Gmail addresses with the security key can enter.
   - **Manage Authorized Gmails**: Add any new Gmail addresses directly from the Admin settings for future staff or co-owners.
   - Edit server name, IP, ports, version, MOTD, and sale banner in real-time.
   - Add, edit, reorder, or delete staff members with live skin preview.
   - Adjust rank prices and perks.
   - **Secret Shortcut**: Press <kbd>Ctrl + Shift + A</kbd> anywhere on the website to open the Admin Login.
   - **Export Configuration (JSON)** to download backups.
   - **Import Configuration (JSON)** to restore backups anytime.


---

## 📁 Project Structure

```text
BeaconMC/
├── index.html          # Main HTML structure with semantic sections & SEO tags
├── css/
│   ├── style.css       # Core tokens, starry background, beacon animations, buttons
│   ├── components.css  # Hero, IP hub, Staff cards, Store ranks, Modals
│   └── responsive.css  # Mobile and tablet responsiveness
├── js/
│   ├── config.js       # Default server data, staff roster, ranks, and store settings
│   ├── app.js          # Core website logic, live ping, skin loader, clipboard
│   └── admin.js        # Owner Controls modal logic, CRUD operations, JSON import/export
├── assets/
│   ├── hero_bg.jpg     # 4K cinematic Beacon artwork
│   └── server_logo.jpg # Custom BeaconMC 3D logo
└── README.md           # Documentation & customization guide
```

---

## 🚀 How to Run Locally

You can open the website in two simple ways:

### Method 1: Direct File Open
Simply double-click `index.html` or drag it into any web browser (Chrome, Edge, Firefox, Brave, Safari).

### Method 2: Local Web Server
You can run any local static file server:
- Via VS Code extension: "Live Server"
- Via Python: `python -m http.server 8000`
- Via npx: `npx serve`

---

## 🛠️ How to Customize

### Option A: Using the In-Browser "Owner Controls" (No coding required)
1. Open the website.
2. Click the amber **"Owner Controls"** button (top right navbar or bottom left corner).
3. Update any field (IP, Staff, Ranks).
4. Click **Save** — changes are applied immediately and saved in your browser!
5. In the **Backup & Sync** tab, click **"Download config.json"** anytime to save a permanent backup.

### Option B: Editing `js/config.js` directly
Open `js/config.js` in any text editor (Notepad, VS Code, etc.). You can modify:
- `DEFAULT_CONFIG.server`: change `javaIp`, `bedrockIp`, `storeUrl`, `discordUrl`, etc.
- `DEFAULT_CONFIG.staff`: add or edit IGN, roles, colors, and bios.
- `DEFAULT_CONFIG.ranks`: adjust prices, perks, and badges.

---

## 🌐 How to Host Online for Free
You can host this website completely free on:
- **GitHub Pages**: Upload repository and enable GitHub Pages under Settings > Pages.
- **Vercel**: Drag and drop the folder into [vercel.com](https://vercel.com).
- **Netlify**: Drag and drop into [netlify.com/drop](https://app.netlify.com/drop).
- **Cloudflare Pages**: Connect your GitHub repo for instant worldwide CDN deployment.
