// ============================================================
// Font list — add or remove fonts here
// type: "standard" (system font) or "google" (Google Fonts)
// ============================================================
const FONTS = [
  // System fonts
  { name: "system-ui", type: "standard" },
  { name: "Arial", type: "standard" },
  { name: "Calibri", type: "standard" },
  { name: "Comic Sans MS", type: "standard" },
  { name: "Consolas", type: "standard" },
  { name: "Courier New", type: "standard" },
  { name: "Georgia", type: "standard" },
  { name: "Helvetica", type: "standard" },
  { name: "Impact", type: "standard" },
  { name: "Lucida Console", type: "standard" },
  { name: "Monaco", type: "standard" },
  { name: "Palatino", type: "standard" },
  { name: "Segoe UI", type: "standard" },
  { name: "Tahoma", type: "standard" },
  { name: "Times New Roman", type: "standard" },
  { name: "Trebuchet MS", type: "standard" },
  { name: "Verdana", type: "standard" },
  { name: "sans-serif", type: "standard" },
  { name: "serif", type: "standard" },
  { name: "monospace", type: "standard" },
  { name: "cursive", type: "standard" },
  { name: "fantasy", type: "standard" },
  // Google Fonts
  { name: "DM Sans", type: "google" },
  { name: "Inter", type: "google" },
  { name: "Space Mono", type: "google" },
  { name: "Space Grotesk", type: "google" },
  { name: "Work Sans", type: "google" },
  { name: "Syne", type: "google" },
  { name: "Libre Franklin", type: "google" },
  { name: "Cormorant", type: "google" },
  { name: "Fira Sans", type: "google" },
  { name: "Eczar", type: "google" },
  { name: "Alegreya Sans", type: "google" },
  { name: "Alegreya", type: "google" },
  { name: "Source Sans Pro", type: "google" },
  { name: "Source Serif Pro", type: "google" },
  { name: "Roboto", type: "google" },
  { name: "Fraunces", type: "google" },
  { name: "Inknut Antiqua", type: "google" },
  { name: "BioRhyme", type: "google" },
  { name: "Poppins", type: "google" },
  { name: "Archivo Narrow", type: "google" },
  { name: "Libre Baskerville", type: "google" },
  { name: "Playfair Display", type: "google" },
  { name: "Karla", type: "google" },
  { name: "Lora", type: "google" },
  { name: "Proza Libre", type: "google" },
  { name: "Spectral", type: "google" },
  { name: "IBM Plex Sans", type: "google" },
  { name: "Manrope", type: "google" },
  { name: "Montserrat", type: "google" },
  { name: "Lato", type: "google" },
  { name: "PT Sans", type: "google" },
  { name: "PT Serif", type: "google" },
  { name: "Cardo", type: "google" },
  { name: "Chivo", type: "google" },
  { name: "Neuton", type: "google" },
  { name: "Rubik", type: "google" },
  { name: "Open Sans", type: "google" },
  { name: "Inconsolata", type: "google" },
  { name: "Raleway", type: "google" },
  { name: "Merriweather", type: "google" },
  { name: "Tangerine", type: "google" },
  { name: "Dancing Script", type: "google" },
  { name: "Bad Script", type: "google" },
  { name: "Sacramento", type: "google" },
  { name: "Barlow Condensed", type: "google" },
  { name: "Pathway Gothic One", type: "google" },
  { name: "Fjalla One", type: "google" },
  { name: "Oswald", type: "google" },
  { name: "Abril Fatface", type: "google" },
  { name: "Rozha One", type: "google" },
  { name: "Ultra", type: "google" },
  { name: "UnifrakturMaguntia", type: "google" },
  { name: "UnifrakturCook", type: "google" },
  { name: "Pirata One", type: "google" },
  { name: "New Rocker", type: "google" },
  { name: "Germania One", type: "google" },
  { name: "Fruktur", type: "google" },
  { name: "Zilla Slab", type: "google" },
  { name: "Overpass", type: "google" },
  { name: "Josefin Sans", type: "google" },
  { name: "Josefin Slab", type: "google" },
  { name: "Old Standard TT", type: "google" },
  { name: "Gentium Basic", type: "google" },
  { name: "Varela Round", type: "google" },
  { name: "Rajdhani", type: "google" },
  { name: "Bitter", type: "google" },
  { name: "Nunito Sans", type: "google" },
  { name: "Instrument Sans", type: "google" },
  { name: "Instrument Serif", type: "google" },
  { name: "Bricolage Grotesque", type: "google" },
  { name: "Roboto Serif", type: "google" },
  { name: "Newsreader", type: "google" },
  { name: "Plus Jakarta Sans", type: "google" },
  { name: "Familjen Grotesk", type: "google" },
  { name: "Azeret Mono", type: "google" },
  { name: "Spartan", type: "google" },
  { name: "DM Serif Text", type: "google" },
  { name: "DM Serif Display", type: "google" },
  { name: "Literata", type: "google" },
  { name: "Outfit", type: "google" },
  { name: "Cairo", type: "google" },
  { name: "Tajawal", type: "google" },
  { name: "Almarai", type: "google" },
  { name: "Amiri", type: "google" },
  { name: "IBM Plex Sans Arabic", type: "google" },
  { name: "Noto Sans Arabic", type: "google" },
  { name: "Noto Naskh Arabic", type: "google" },
  { name: "Readex Pro", type: "google" },
  { name: "Changa", type: "google" },
  { name: "Kufam", type: "google" },
  { name: "Vazirmatn", type: "google" },
  { name: "El Messiri", type: "google" },
  { name: "Alexandria", type: "google" },
  { name: "Baloo Bhaijaan 2", type: "google" },
  { name: "Alan Sans", type: "google" },
  { name: "Alyamama", type: "google" },
  { name: "Zain", type: "google" },
  { name: "Cascadia Code", type: "google" },
];

// Preset element groups
const ELEMENT_GROUPS = {
  headings: ["h1", "h2", "h3", "h4", "h5", "h6"],
  body:     ["p", "span", "li", "td", "th", "dd", "dt", "blockquote"],
  nav:      ["a", "nav", "button", "label"],
  code:     ["code", "pre", "kbd", "samp", "var"],
  forms:    ["input", "textarea", "select", "option", "button", "label"],
};

const DEFAULT_TARGET = () => ({ mode: "all", elements: [] });
const DEFAULT_EXCLUDE_ICONS = true;

const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);
let currentTab = null;
let siteStyle = { type: "global", font_family: { name: null, type: null }, font_style: null, font_weight: null, font_size: null, font_scale: null, element_target: DEFAULT_TARGET(), exclude_icon_fonts: DEFAULT_EXCLUDE_ICONS };
let globalStyle = {};
Object.assign(globalStyle, siteStyle);
globalStyle.element_target = DEFAULT_TARGET();

// Load Google Fonts stylesheet for preview
const googleFonts = FONTS.filter((f) => f.type === "google");
if (googleFonts.length) {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "https://fonts.googleapis.com/css?family=" + googleFonts.map((f) => f.name.replace(/\s/g, "+") + ":300,400,500,600,700,800,900").join("|") + "&display=swap";
  document.head.appendChild(link);
}

// Populate font select
function populateFonts() {
  const sel = $("#font_family");
  const currentVal = sel.value;
  sel.innerHTML = '';
  const sortedFonts = [...FONTS].sort((a, b) => a.name.localeCompare(b.name));
  sortedFonts.forEach((f) => {
    const opt = document.createElement("option");
    opt.value = f.name;
    opt.textContent = f.name;
    opt.dataset.type = f.type;
    opt.style.fontFamily = f.name;
    sel.appendChild(opt);
  });
  if (currentVal) sel.value = currentVal;
}

// Query local system fonts if supported
async function loadLocalFonts() {
  if ('queryLocalFonts' in window) {
    try {
      const localFonts = await window.queryLocalFonts();
      const existingNames = new Set(FONTS.map((f) => f.name.toLowerCase()));
      let added = false;
      for (const font of localFonts) {
        if (!existingNames.has(font.family.toLowerCase())) {
          existingNames.add(font.family.toLowerCase());
          FONTS.push({ name: font.family, type: "standard" });
          added = true;
        }
      }
      if (added) {
        populateFonts();
        loadStyles();
      }
    } catch (e) {}
  }
}

// Save styles to storage
function getHost() {
  if (!currentTab || !currentTab.url) return "default";
  try {
    const url = new URL(currentTab.url);
    if (url.protocol === "file:") return "local_file";
    return url.host || "default";
  } catch (e) {
    return "default";
  }
}

function save() {
  chrome.storage.local.get("styles", (data) => {
    const styles = data.styles || {};
    styles.domain_styles = styles.domain_styles || {};
    styles.global_style = styles.global_style || {};
    const host = getHost();
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
  const styleToApply = style !== undefined ? style : activeStyle();
  if (siteStyle.type === "global") {
    chrome.tabs.query({}, (tabs) => {
      tabs.forEach((t) => {
        try { chrome.tabs.sendMessage(t.id, { msg: "style", value: styleToApply }, () => chrome.runtime.lastError); } catch (e) {}
      });
    });
  } else if (currentTab && currentTab.id) {
    chrome.tabs.sendMessage(currentTab.id, { msg: "style", value: styleToApply }, () => chrome.runtime.lastError);
  }
}

// Load saved styles and update UI
function loadStyles() {
  chrome.storage.local.get("styles", (data) => {
    const host = getHost();
    if (data && data.styles) {
      if (data.styles.domain_styles && data.styles.domain_styles[host]) {
        siteStyle = data.styles.domain_styles[host];
      }
      if (data.styles.global_style) {
        globalStyle = data.styles.global_style;
      }
    }
    // Ensure element_target exists on loaded styles
    if (!siteStyle.element_target) siteStyle.element_target = DEFAULT_TARGET();
    if (!globalStyle.element_target) globalStyle.element_target = DEFAULT_TARGET();
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
  const wtInp = $("#font_weight");
  if (style.font_weight) {
    wtChk.checked = true;
    wtInp.disabled = false;
    wtInp.value = style.font_weight;
  } else {
    wtChk.checked = false;
    wtInp.disabled = true;
    wtInp.value = "";
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

  // Font scale
  const scChk = $("#font_scale_chk");
  const scInp = $("#font_scale");
  if (style.font_scale) {
    scChk.checked = true;
    scInp.disabled = false;
    scInp.value = style.font_scale;
  } else {
    scChk.checked = false;
    scInp.disabled = true;
    scInp.value = "";
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

  // Element targeting
  const et = style.element_target || DEFAULT_TARGET();
  $("#target_mode").value = et.mode;
  const section = $("#target_section");
  if (et.mode !== "all") {
    section.classList.add("visible");
  } else {
    section.classList.remove("visible");
  }
  renderPills(et.elements);
  updatePresetButtons(et.elements);

  // Exclude icon fonts
  $("#exclude_icon_fonts").checked = style.exclude_icon_fonts !== false;
}

// Render tag pills in the pills container
function renderPills(elements) {
  const container = $("#tag_pills");
  container.innerHTML = "";
  (elements || []).forEach((tag) => {
    const pill = document.createElement("span");
    pill.className = "tag-pill";
    pill.appendChild(document.createTextNode(tag + " "));
    const removeBtn = document.createElement("span");
    removeBtn.className = "remove-pill";
    removeBtn.textContent = "\u00D7";
    removeBtn.dataset.tag = tag;
    pill.appendChild(removeBtn);
    container.appendChild(pill);
  });
}

// Update preset group button active states
function updatePresetButtons(elements) {
  const elSet = new Set(elements || []);
  $$(".preset-btn").forEach((btn) => {
    const group = ELEMENT_GROUPS[btn.dataset.group];
    const allPresent = group.every((el) => elSet.has(el));
    btn.classList.toggle("active", allPresent);
  });
}

// Get the active style object
function activeStyle() {
  return siteStyle.type === "global" ? globalStyle : siteStyle;
}

// Init
document.addEventListener("DOMContentLoaded", () => {
  populateFonts();
  loadLocalFonts();

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    currentTab = tabs[0];
    try {
      const url = new URL(currentTab.url);
      $(".domain").textContent = url.protocol === "file:" ? "Local File" : (url.host || "Local File");
    } catch (e) {
      $(".domain").textContent = "Site Font";
    }
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
      siteStyle = { type: "custom", font_family: { name: null, type: null }, font_style: null, font_weight: null, font_size: null, font_scale: null, element_target: DEFAULT_TARGET(), exclude_icon_fonts: DEFAULT_EXCLUDE_ICONS };
      $(".well").style.display = "none";
      applyStyle({});
    }
    save();
  });

  // Element target mode change
  $("#target_mode").addEventListener("change", function () {
    const s = activeStyle();
    if (!s.element_target) s.element_target = DEFAULT_TARGET();
    s.element_target.mode = this.value;
    const section = $("#target_section");
    if (this.value !== "all") {
      section.classList.add("visible");
    } else {
      section.classList.remove("visible");
    }
    applyStyle(s);
    save();
  });

  // Exclude icon fonts checkbox
  $("#exclude_icon_fonts").addEventListener("change", function () {
    const s = activeStyle();
    s.exclude_icon_fonts = this.checked;
    applyStyle(s);
    save();
  });

  // Preset group buttons
  $$(".preset-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const s = activeStyle();
      if (!s.element_target) s.element_target = DEFAULT_TARGET();
      const group = ELEMENT_GROUPS[this.dataset.group];
      const elSet = new Set(s.element_target.elements);
      const allPresent = group.every((el) => elSet.has(el));
      if (allPresent) {
        // Remove all group elements
        group.forEach((el) => elSet.delete(el));
      } else {
        // Add all group elements
        group.forEach((el) => elSet.add(el));
      }
      s.element_target.elements = [...elSet];
      renderPills(s.element_target.elements);
      updatePresetButtons(s.element_target.elements);
      applyStyle(s);
      save();
    });
  });

  // Manual element add
  function addManualElement() {
    const inp = $("#manual_element");
    const val = inp.value.trim().toLowerCase();
    if (!val) return;
    const s = activeStyle();
    if (!s.element_target) s.element_target = DEFAULT_TARGET();
    const elSet = new Set(s.element_target.elements);
    // Support comma-separated entries
    val.split(",").forEach((v) => {
      let tag = v.trim();
      tag = tag.replace(/^["']+|["']+$/g, "").trim();
      if (tag) elSet.add(tag);
    });
    s.element_target.elements = [...elSet];
    inp.value = "";
    renderPills(s.element_target.elements);
    updatePresetButtons(s.element_target.elements);
    applyStyle(s);
    save();
  }
  $("#add_element").addEventListener("click", addManualElement);
  $("#manual_element").addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); addManualElement(); } });

  // Remove pill via event delegation
  $("#tag_pills").addEventListener("click", function (e) {
    if (!e.target.classList.contains("remove-pill")) return;
    const tag = e.target.dataset.tag;
    const s = activeStyle();
    if (!s.element_target) return;
    s.element_target.elements = s.element_target.elements.filter((el) => el !== tag);
    renderPills(s.element_target.elements);
    updatePresetButtons(s.element_target.elements);
    applyStyle(s);
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
  const onFontFamilyChange = function () {
    const s = activeStyle();
    $("#font_family_chk").checked = true;
    this.disabled = false;
    const opt = this.options[this.selectedIndex];
    s.font_family = { name: this.value, type: opt ? opt.dataset.type : "standard" };
    applyStyle(s);
    save();
  };
  $("#font_family").addEventListener("change", onFontFamilyChange);
  $("#font_family").addEventListener("input", onFontFamilyChange);

  // Font weight checkbox
  $("#font_weight_chk").addEventListener("change", function () {
    const s = activeStyle();
    const inp = $("#font_weight");
    if (this.checked) {
      inp.disabled = false;
      s.font_weight = inp.value || "400";
    } else {
      inp.disabled = true;
      s.font_weight = null;
    }
    applyStyle(s);
    save();
  });

  // Font weight select
  const onFontWeightChange = function () {
    const s = activeStyle();
    $("#font_weight_chk").checked = true;
    this.disabled = false;
    s.font_weight = this.value;
    applyStyle(s);
    save();
  };
  $("#font_weight").addEventListener("change", onFontWeightChange);
  $("#font_weight").addEventListener("input", onFontWeightChange);

  // Font size checkbox
  $("#font_size_chk").addEventListener("change", function () {
    const s = activeStyle();
    const inp = $("#font_size");
    if (this.checked) {
      inp.disabled = false;
      s.font_size = parseFloat(inp.value) || null;
      $("#font_scale_chk").checked = false;
      $("#font_scale").disabled = true;
      s.font_scale = null;
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
    $("#font_size_chk").checked = true;
    this.disabled = false;
    s.font_size = parseFloat(this.value) || null;
    if (s.font_size) {
      $("#font_scale_chk").checked = false;
      $("#font_scale").disabled = true;
      s.font_scale = null;
    }
    applyStyle(s);
    save();
  });

  // Font scale checkbox
  $("#font_scale_chk").addEventListener("change", function () {
    const s = activeStyle();
    const inp = $("#font_scale");
    if (this.checked) {
      inp.disabled = false;
      if (!inp.value) inp.value = "1.2";
      s.font_scale = parseFloat(inp.value) || 1.2;
      $("#font_size_chk").checked = false;
      $("#font_size").disabled = true;
      s.font_size = null;
    } else {
      inp.disabled = true;
      s.font_scale = null;
    }
    applyStyle(s);
    save();
  });

  // Font scale input
  const onFontScaleChange = function () {
    const s = activeStyle();
    $("#font_scale_chk").checked = true;
    this.disabled = false;
    s.font_scale = parseFloat(this.value) || null;
    if (s.font_scale) {
      $("#font_size_chk").checked = false;
      $("#font_size").disabled = true;
      s.font_size = null;
    }
    applyStyle(s);
    save();
  };
  $("#font_scale").addEventListener("change", onFontScaleChange);
  $("#font_scale").addEventListener("input", onFontScaleChange);

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
  const onFontStyleChange = function () {
    const s = activeStyle();
    $("#font_style_chk").checked = true;
    this.disabled = false;
    s.font_style = this.value;
    applyStyle(s);
    save();
  };
  $("#font_style").addEventListener("change", onFontStyleChange);
  $("#font_style").addEventListener("input", onFontStyleChange);

  // Done button
  $(".done").addEventListener("click", () => window.close());
});