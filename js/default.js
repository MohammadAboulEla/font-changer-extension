// ============================================================
// Font list — add or remove fonts here
// type: "standard" (system font) or "google" (Google Fonts)
// ============================================================
const FONTS = [
  { name: "Arial", type: "standard" },
  { name: "Verdana", type: "standard" },
  { name: "Georgia", type: "standard" },
  { name: "Times New Roman", type: "standard" },
  { name: "Courier New", type: "standard" },
  { name: "Inter", type: "google" },
  { name: "Roboto", type: "google" },
  { name: "Open Sans", type: "google" },
  { name: "Lato", type: "google" },
  { name: "Montserrat", type: "google" },
  { name: "Poppins", type: "google" },
  { name: "Playfair Display", type: "google" },
  { name: "Fira Code", type: "google" },
];

const $ = (s) => document.querySelector(s);
let currentTab = null;
let siteStyle = { type: "global", font_family: { name: null, type: null }, font_style: null, font_weight: null, font_size: null };
let globalStyle = {};
Object.assign(globalStyle, siteStyle);

// Load Google Fonts stylesheet for preview
const googleFonts = FONTS.filter((f) => f.type === "google");
if (googleFonts.length) {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "https://fonts.googleapis.com/css?family=" + googleFonts.map((f) => f.name.replace(/\s/g, "+")).join("|") + "&display=swap";
  document.head.appendChild(link);
}

// Populate font select
function populateFonts() {
  const sel = $("#font_family");
  sel.innerHTML = '';
  FONTS.forEach((f) => {
    const opt = document.createElement("option");
    opt.value = f.name;
    opt.textContent = f.name;
    opt.dataset.type = f.type;
    opt.style.fontFamily = f.name;
    sel.appendChild(opt);
  });
}

// Save styles to storage
function save() {
  chrome.storage.local.get("styles", (data) => {
    const styles = data.styles || {};
    styles.domain_styles = styles.domain_styles || {};
    styles.global_style = styles.global_style || {};
    const host = currentTab.url.match(/:\/\/(.[^\/]+)/)[1];
    if (siteStyle.type === "custom") {
      styles.domain_styles[host] = siteStyle;
    } else {
      delete styles.domain_styles[host];
    }
    styles.global_style = globalStyle;
    chrome.storage.local.set({ styles });
  });
}

// Send style to content script
function applyStyle(style) {
  if (siteStyle.type === "global") {
    chrome.tabs.query({}, (tabs) => {
      tabs.forEach((t) => {
        try { chrome.tabs.sendMessage(t.id, { msg: "style", value: style }, () => chrome.runtime.lastError); } catch (e) {}
      });
    });
  } else {
    chrome.tabs.sendMessage(currentTab.id, { msg: "style", value: style }, () => chrome.runtime.lastError);
  }
}

// Load saved styles and update UI
function loadStyles() {
  chrome.storage.local.get("styles", (data) => {
    const host = currentTab.url.match(/:\/\/(.[^\/]+)/)[1];
    if (data && data.styles) {
      if (data.styles.domain_styles && data.styles.domain_styles[host]) {
        siteStyle = data.styles.domain_styles[host];
      }
      if (data.styles.global_style) {
        globalStyle = data.styles.global_style;
      }
    }
    updateUI(siteStyle.type === "custom" ? siteStyle : globalStyle);
    $(".setting-type").value = siteStyle.type || "global";
    $(".setting-name").textContent = siteStyle.type === "custom" ? "Site Font" : "Global Font";
  });
}

// Reflect current style in UI controls
function updateUI(style) {
  // Font family
  const famChk = $("#font_family_chk");
  const famSel = $("#font_family");
  if (style.font_family && style.font_family.name) {
    famChk.checked = true;
    famSel.disabled = false;
    famSel.value = style.font_family.name;
  } else {
    famChk.checked = false;
    famSel.disabled = true;
    famSel.value = "";
  }

  // Font weight
  const wtChk = $("#font_weight_chk");
  const wtSel = $("#font_weight");
  if (style.font_weight) {
    wtChk.checked = true;
    wtSel.disabled = false;
    wtSel.value = style.font_weight;
  } else {
    wtChk.checked = false;
    wtSel.disabled = true;
  }

  // Font size
  const szChk = $("#font_size_chk");
  const szInp = $("#font_size");
  if (style.font_size) {
    szChk.checked = true;
    szInp.disabled = false;
    szInp.value = style.font_size;
  } else {
    szChk.checked = false;
    szInp.disabled = true;
    szInp.value = "";
  }

  // Font style
  const stChk = $("#font_style_chk");
  const stSel = $("#font_style");
  if (style.font_style) {
    stChk.checked = true;
    stSel.disabled = false;
    stSel.value = style.font_style;
  } else {
    stChk.checked = false;
    stSel.disabled = true;
  }
}

// Get the active style object
function activeStyle() {
  return siteStyle.type === "global" ? globalStyle : siteStyle;
}

// Init
document.addEventListener("DOMContentLoaded", () => {
  populateFonts();

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    currentTab = tabs[0];
    $(".domain").textContent = currentTab.url.match(/:\/\/(.[^\/]+)/)[1];
    loadStyles();
  });

  // Setting type toggle
  $(".setting-type").addEventListener("change", function () {
    siteStyle.type = this.value;
    if (this.value === "global") {
      $(".setting-name").textContent = "Global Font";
      $(".well").style.display = "block";
      updateUI(globalStyle);
      applyStyle(globalStyle);
    } else if (this.value === "custom") {
      $(".setting-name").textContent = "Site Font";
      $(".well").style.display = "block";
      updateUI(siteStyle);
      applyStyle(siteStyle);
    } else {
      siteStyle = { type: "custom", font_family: { name: null, type: null }, font_style: null, font_weight: null, font_size: null };
      $(".well").style.display = "none";
      applyStyle({});
    }
    save();
  });

  // Font family checkbox
  $("#font_family_chk").addEventListener("change", function () {
    const s = activeStyle();
    const sel = $("#font_family");
    if (this.checked) {
      sel.disabled = false;
      const opt = sel.options[sel.selectedIndex];
      s.font_family = { name: sel.value, type: opt ? opt.dataset.type : "standard" };
    } else {
      sel.disabled = true;
      s.font_family = { name: null, type: null };
    }
    applyStyle(s);
    save();
  });

  // Font family select
  $("#font_family").addEventListener("change", function () {
    const s = activeStyle();
    const opt = this.options[this.selectedIndex];
    s.font_family = { name: this.value, type: opt ? opt.dataset.type : "standard" };
    applyStyle(s);
    save();
  });

  // Font weight checkbox
  $("#font_weight_chk").addEventListener("change", function () {
    const s = activeStyle();
    const sel = $("#font_weight");
    if (this.checked) {
      sel.disabled = false;
      s.font_weight = sel.value;
    } else {
      sel.disabled = true;
      s.font_weight = null;
    }
    applyStyle(s);
    save();
  });

  // Font weight select
  $("#font_weight").addEventListener("change", function () {
    const s = activeStyle();
    s.font_weight = this.value;
    applyStyle(s);
    save();
  });

  // Font size checkbox
  $("#font_size_chk").addEventListener("change", function () {
    const s = activeStyle();
    const inp = $("#font_size");
    if (this.checked) {
      inp.disabled = false;
      s.font_size = parseFloat(inp.value) || null;
    } else {
      inp.disabled = true;
      s.font_size = null;
    }
    applyStyle(s);
    save();
  });

  // Font size input
  $("#font_size").addEventListener("input", function () {
    const s = activeStyle();
    s.font_size = parseFloat(this.value) || null;
    applyStyle(s);
    save();
  });

  // Font style checkbox
  $("#font_style_chk").addEventListener("change", function () {
    const s = activeStyle();
    const sel = $("#font_style");
    if (this.checked) {
      sel.disabled = false;
      s.font_style = sel.value;
    } else {
      sel.disabled = true;
      s.font_style = null;
    }
    applyStyle(s);
    save();
  });

  // Font style select
  $("#font_style").addEventListener("change", function () {
    const s = activeStyle();
    s.font_style = this.value;
    applyStyle(s);
    save();
  });

  // Done button
  $(".done").addEventListener("click", () => window.close());
});