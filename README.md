# Font Changer Extension (Manifest V3)

A Chrome extension that allows users to customize web typography (font family, size, weight, scale, and style) globally or per-domain, with support for system fonts, local fonts, and Google Fonts, while protecting icon fonts from corruption.

---

## 📁 Repository Structure

```
.
├── manifest.json        # MV3 extension configuration & permissions
├── popup.html           # Popup UI layout and controls
├── js/
│   ├── background.js    # Background service worker (no-op stub)
│   ├── default.js       # Popup logic: UI state, font lists, storage & tab messaging
│   └── cs.js            # Content script: CSS injection, DOM font scaling & mutation observer
├── img/                 # Extension icons (logo.png, logo48.png, etc.)
├── test/
│   └── index.html       # Sample test webpage for local font testing
└── README.md            # Project guide for AI agents & developers
```

---

## 🏗️ Architecture & Component Responsibilities

### 1. `manifest.json`
- **Manifest Version:** 3
- **Permissions:** `storage` (stores settings globally & per-hostname)
- **Host Permissions:** `<all_urls>`
- **Content Script:** [js/cs.js](file:///d:/programing/Playground/font%20changer%20extension/js/cs.js) injected into `<all_urls>` across all frames (`all_frames: true`) at `document_start`.
- **Action Popup:** [popup.html](file:///d:/programing/Playground/font%20changer%20extension/popup.html).

### 2. `popup.html` & `js/default.js` (UI & Control Layer)
- **Settings Scope:** Allows toggling between **Domain-specific** (`hostname`) and **Global** (`global`) configurations.
- **Font Catalog:** Contains `FONTS` array (system fonts & Google Fonts list) and supports querying local system fonts via `window.queryLocalFonts()`.
- **Targeting Modes:**
  - Standard/Preset tags (`p`, `h1`-`h6`, `a`, `li`, `span`, `button`, `input`, `textarea`, etc.)
  - Custom element selector tags (pill manager)
- **Controls Supported:**
  - `font_family_chk` / `font_family`: Font name and type (`standard`, `google`, `custom`).
  - `font_weight_chk` / `font_weight`: Numerical font weight (`100` to `900`).
  - `font_size_chk` / `font_size`: Fixed font size in pixels.
  - `font_scale_chk` / `font_scale`: Multiplier percentage for proportional resizing.
  - `font_style_chk` / `font_style`: Normal, Italic, Oblique.
  - `exclude_icon_fonts`: Skips font overrides on known icon fonts/classes.
- **Storage & Messaging:** Reads/writes configuration to `chrome.storage.local` under the `styles` key and dispatches live update messages to active tabs via `chrome.tabs.sendMessage(tabId, style)`.

### 3. `js/cs.js` (Content Script & DOM Engine)
- **Initial Load:** Loads configuration directly from `chrome.storage.local.get("styles")` matching `location.hostname` or falling back to `global`.
- **Live Updates:** Listens via `chrome.runtime.onMessage` to apply style changes instantly without page reload.
- **Style Injection:**
  - `#fc_style`: Injected `<style>` tag for standard typography rules. Builds CSS selectors excluding icon classes (e.g. `:not(.material-icons):not([class*='fa-'])...`) when `excludeIconFonts` is enabled.
  - `#fc_g_style`: Dynamically generated `@import url(...)` for Google Fonts loading.
- **Font Scaling (`font_scale`):** Computes and sets inline `fontSize` based on original computed styles (`data-fc-orig-font-size`) and observes DOM additions via `MutationObserver`.

---

## 💾 Storage Data Schema

Data is saved in `chrome.storage.local` under the `styles` key:

```json
{
  "styles": {
    "global": {
      "settingType": "global",
      "fontFamily": "Inter",
      "fontFamilyType": "google",
      "fontFamilyEnabled": true,
      "fontWeight": "400",
      "fontWeightEnabled": false,
      "fontSize": "16",
      "fontSizeEnabled": false,
      "fontScale": "100",
      "fontScaleEnabled": false,
      "fontStyle": "normal",
      "fontStyleEnabled": false,
      "targetMode": "all",
      "elements": ["p", "h1", "h2", "span"],
      "excludeIconFonts": true
    },
    "example.com": {
      "settingType": "domain",
      ...
    }
  }
}
```

---

## 🛠️ Common Workflows for AI Agents

### Adding a New Google Font or System Font
1. Open [js/default.js](file:///d:/programing/Playground/font%20changer%20extension/js/default.js).
2. Add the font object to the `FONTS` array:
   ```javascript
   { name: "Font Name", type: "google" } // or type: "standard"
   ```

### Adding New Icon Font Exclusions
1. Open [js/cs.js](file:///d:/programing/Playground/font%20changer%20extension/js/cs.js).
2. Add selectors to `ICON_FONT_SELECTORS` array to prevent them from being overridden.

---

## 🧪 Testing Locally in Chrome

1. Open Chrome and navigate to `chrome://extensions/`.
2. Enable **Developer mode** (toggle in the top right).
3. Click **Load unpacked** and select this directory.
4. Open [test/index.html](file:///d:/programing/Playground/font%20changer%20extension/test/index.html) or any web page to test typography changes.
