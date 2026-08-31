// Known icon font CSS selectors to exclude
var ICON_FONT_SELECTORS = [
  // Google Material Icons & Symbols
  ".material-icons",
  ".material-icons-outlined",
  ".material-icons-round",
  ".material-icons-sharp",
  ".material-icons-two-tone",
  "[class*='material-symbols']",
  "[class*='material-icons']",
  // Angular Material & Google Gem/Lumi icons
  "mat-icon",
  "gem-icon",
  ".mat-icon",
  ".mat-ligature-font",
  "[data-mat-icon-type]",
  "[data-mat-icon-name]",
  "[fonticon]",
  "[class*='lumi-symbols']",
  // Font Awesome
  ".fa", ".fas", ".far", ".fal", ".fad", ".fab", ".fass", ".fasr", ".fasl",
  "[class*='fa-']",
  // Bootstrap Icons
  ".glyphicon",
  "[class*='glyphicon']",
  ".bi",
  "[class*='bi-']",
  // Remix Icon
  "[class*='ri-']",
  // Tabler Icons
  ".ti",
  "[class*='ti-']",
  // Feather Icons
  ".feather",
  "[data-feather]",
  // Lucide Icons
  ".lucide",
  "[class*='lucide-']",
  // Phosphor Icons
  ".ph",
  "[class*='ph-']",
  // Ionicons
  "ion-icon",
  // Generic icon patterns
  "[data-icon]",
  "[class*='icon-']",
  "[class*='-icon']",
  "[class*='icon_']",
  "[class*='_icon']",
  "[class*='icons-']",
  "i[class*='icon']",
  "span[class*='icon']",
];

var currentStyle = {
  font_weight: null,
  font_style: null,
  font_family: { name: null, type: !1 },
  font_size: null,
  font_scale: null,
  element_target: { mode: "all", elements: [] },
  exclude_icon_fonts: true,
};

var IGNORED_TAGS = {
  SCRIPT: 1, STYLE: 1, LINK: 1, META: 1, NOSCRIPT: 1,
  HEAD: 1, TITLE: 1, TEMPLATE: 1, BR: 1, HR: 1,
  SVG: 1, PATH: 1, CANVAS: 1, VIDEO: 1, AUDIO: 1,
  IMG: 1, IFRAME: 1
};

function shouldScaleElement(el, targetConfig, excludeIconFonts) {
  if (!el || el.nodeType !== 1) return false;
  if (IGNORED_TAGS[el.tagName]) return false;

  if (excludeIconFonts !== false) {
    for (var i = 0; i < ICON_FONT_SELECTORS.length; i++) {
      try {
        if (el.matches(ICON_FONT_SELECTORS[i])) return false;
      } catch (e) {}
    }
  }

  if (targetConfig) {
    if (targetConfig.mode === "exclude" && targetConfig.elements && targetConfig.elements.length) {
      var tag = el.tagName.toLowerCase();
      if (tag === "html" || tag === "body") return false;
      for (var k = 0; k < targetConfig.elements.length; k++) {
        var sel = targetConfig.elements[k].trim().replace(/^["']+|["']+$/g, "");
        if (sel) {
          try {
            if (el.matches(sel) || el.closest(sel)) return false;
          } catch (e) {}
        }
      }
    } else if (targetConfig.mode === "include") {
      if (!targetConfig.elements || !targetConfig.elements.length) return false;
      var matched = false;
      for (var j = 0; j < targetConfig.elements.length; j++) {
        var inc = targetConfig.elements[j].trim().replace(/^["']+|["']+$/g, "");
        if (inc) {
          try {
            if (el.matches(inc) || el.closest(inc)) {
              matched = true;
              break;
            }
          } catch (e) {}
        }
      }
      if (!matched) return false;
    }
  }

  return true;
}

function scaleElement(el, scale, targetConfig, excludeIconFonts) {
  if (!shouldScaleElement(el, targetConfig, excludeIconFonts)) {
    if (el.dataset && el.dataset.fontChangerOrigSize) {
      restoreElementScale(el);
    }
    return;
  }

  if (!el.dataset.fontChangerOrigSize) {
    var comp = window.getComputedStyle(el).fontSize;
    var parsed = parseFloat(comp);
    if (!parsed || isNaN(parsed)) return;
    el.dataset.fontChangerOrigSize = parsed;
    if (el.style.fontSize) {
      el.dataset.fontChangerOrigInline = el.style.fontSize;
    }
  }

  var orig = parseFloat(el.dataset.fontChangerOrigSize);
  if (orig && !isNaN(orig)) {
    var newSize = (orig * scale).toFixed(2);
    el.style.setProperty("font-size", newSize + "px", "important");
  }
}

function restoreElementScale(el) {
  if (el.dataset && el.dataset.fontChangerOrigSize) {
    if (el.dataset.fontChangerOrigInline) {
      el.style.fontSize = el.dataset.fontChangerOrigInline;
    } else {
      el.style.removeProperty("font-size");
    }
    delete el.dataset.fontChangerOrigSize;
    delete el.dataset.fontChangerOrigInline;
  }
}

function applyFontScale(scale, targetConfig, excludeIconFonts) {
  if (!scale || scale <= 0) {
    clearFontScale();
    return;
  }
  var elements = document.querySelectorAll("*");
  for (var i = 0; i < elements.length; i++) {
    scaleElement(elements[i], scale, targetConfig, excludeIconFonts);
  }
}

function clearFontScale() {
  var elements = document.querySelectorAll("[data-font-changer-orig-size]");
  for (var i = 0; i < elements.length; i++) {
    restoreElementScale(elements[i]);
  }
}

var style = document.createElement("style");
style.type = "text/css";
style.setAttribute("data-font-changer", "style");
var wf = document.createElement("link");
wf.setAttribute("data-font-changer", "link");

// Track whether we have an active style to re-inject
var hasActiveStyle = false;

// Inject style/link elements into the current head (or documentElement)
function injectElements() {
  var target = document.head || document.documentElement;
  if (!target) return;
  if (hasActiveStyle && style.parentNode !== target) {
    target.appendChild(style);
  }
  if (wf.href && wf.parentNode !== target) {
    target.appendChild(wf);
  }
}

// MutationObserver: re-inject if our elements get removed or head is replaced, and handle dynamic font scaling
var observer = new MutationObserver(function (mutations) {
  if (currentStyle && currentStyle.font_scale && !currentStyle.font_size) {
    for (var m = 0; m < mutations.length; m++) {
      var added = mutations[m].addedNodes;
      for (var n = 0; n < added.length; n++) {
        if (added[n].nodeType === 1) {
          scaleElement(added[n], currentStyle.font_scale, currentStyle.element_target, currentStyle.exclude_icon_fonts);
          var children = added[n].querySelectorAll("*");
          for (var k = 0; k < children.length; k++) {
            scaleElement(children[k], currentStyle.font_scale, currentStyle.element_target, currentStyle.exclude_icon_fonts);
          }
        }
      }
    }
  }

  if (!hasActiveStyle) return;
  for (var i = 0; i < mutations.length; i++) {
    var removed = mutations[i].removedNodes;
    for (var j = 0; j < removed.length; j++) {
      if (
        removed[j] === style ||
        removed[j] === wf ||
        removed[j].nodeName === "HEAD"
      ) {
        injectElements();
        return;
      }
    }
  }
});

// Observe the document for childList changes (covers head replacement and element removal)
observer.observe(document.documentElement, { childList: true, subtree: true });

// Also re-inject when the DOM is fully ready, in case SPA frameworks rebuild the page
document.addEventListener("DOMContentLoaded", function () {
  if (hasActiveStyle) injectElements();
  if (currentStyle && currentStyle.font_scale && !currentStyle.font_size) {
    applyFontScale(currentStyle.font_scale, currentStyle.element_target, currentStyle.exclude_icon_fonts);
  }
  // Re-observe in case documentElement was swapped
  observer.observe(document.documentElement, { childList: true, subtree: true });
});

function getHost() {
  if (document.location.protocol === "file:") return "local_file";
  return document.location.host || "default";
}

chrome.storage.local.get("styles", function (a) {
  var host = getHost();
  a &&
  a.styles &&
  a.styles.domain_styles &&
  a.styles.domain_styles[host]
    ? "global" === a.styles.domain_styles[host].type
      ? a.styles.global_style &&
        ((currentStyle = a.styles.global_style), updateStyle(currentStyle))
      : "custom" === a.styles.domain_styles[host].type &&
        ((currentStyle = a.styles.domain_styles[host]),
        updateStyle(currentStyle))
    : a &&
      a.styles &&
      a.styles.global_style &&
      ((currentStyle = a.styles.global_style), updateStyle(currentStyle));
});

chrome.runtime.onMessage.addListener(function (a, b, c) {
  if ("style" == a.msg) {
    if (!a.value) return;
    ((currentStyle = a.value), updateStyle(a.value), c());
  } else c();
});

var updateStyle = function (a) {
  var b = "";
  var fontFace = "";

  // 1. Handle Web Font / Custom Font declaration
  if (a.font_family && a.font_family.name && a.font_family.type) {
    if ("google" === a.font_family.type) {
      wf.href =
        ("https:" == document.location.protocol ? "https" : "http") +
        "://fonts.googleapis.com/css?family=" +
        a.font_family.name.replace(/\s/g, "+") +
        ":300,400,500,600,700,800,900";
      wf.type = "text/css";
      wf.rel = "stylesheet";
    } else if ("custom" === a.font_family.type) {
      fontFace =
        "@font-face{ font-family: '" +
        a.font_family.name +
        "';src: url(" +
        a.font_family.url +
        ");} ";
    }
  }

  // 2. Build property declarations
  var props = "";
  if (a.font_style) props += "font-style:" + a.font_style + " !important;";
  if (a.font_weight) props += "font-weight:" + a.font_weight + " !important;";
  if (a.font_family && a.font_family.name) {
    var fam = a.font_family.name;
    var isGeneric = ["system-ui", "sans-serif", "serif", "monospace", "cursive", "fantasy"].indexOf(fam) !== -1;
    props += "font-family: " + (isGeneric ? fam : "'" + fam + "'") + " !important;";
  }
  if (a.font_size) {
    props += "font-size:" + a.font_size + "px !important;";
    props += "line-height: normal !important;";
  }

  if (a.font_scale && !a.font_size) {
    applyFontScale(a.font_scale, a.element_target, a.exclude_icon_fonts);
  } else {
    clearFontScale();
  }

  if (!props) {
    style.innerText = "";
    hasActiveStyle = false;
    return;
  }

  // 3. Build exclude selectors list
  var excludeList = [];

  var et = a.element_target;
  if (et && et.mode === "exclude" && et.elements && et.elements.length) {
    excludeList.push("html");
    excludeList.push("body");
    for (var k = 0; k < et.elements.length; k++) {
      var elem = et.elements[k].trim().replace(/^["']+|["']+$/g, "");
      if (elem) {
        excludeList.push(elem);
        excludeList.push(elem + " *");
      }
    }
  }

  if (a.exclude_icon_fonts !== false) {
    for (var i = 0; i < ICON_FONT_SELECTORS.length; i++) {
      var sel = ICON_FONT_SELECTORS[i];
      excludeList.push(sel);
      excludeList.push(sel + " *");
    }
  }

  // 4. Construct main selector with include / exclude targeting
  var mainSelector = "*";
  if (et && et.mode === "include") {
    var includeList = [];
    if (et.elements && et.elements.length) {
      for (var j = 0; j < et.elements.length; j++) {
        var inc = et.elements[j].trim().replace(/^["']+|["']+$/g, "");
        if (inc) {
          includeList.push(inc);
          includeList.push(inc + " *");
        }
      }
    }
    if (!includeList.length) {
      style.innerText = "";
      hasActiveStyle = false;
      return;
    }
    if (excludeList.length) {
      mainSelector = ":is(" + includeList.join(", ") + "):not(:is(" + excludeList.join(", ") + "))";
    } else {
      mainSelector = ":is(" + includeList.join(", ") + ")";
    }
  } else if (excludeList.length) {
    mainSelector = "*:not(:is(" + excludeList.join(", ") + "))";
  }

  b += fontFace + mainSelector + " { " + props + " } ";

  style.innerText = b;
  hasActiveStyle = true;
  injectElements();
};
