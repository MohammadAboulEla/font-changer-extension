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
  element_target: { mode: "all", elements: [] },
  exclude_icon_fonts: true,
};

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

// MutationObserver: re-inject if our elements get removed or head is replaced
var observer = new MutationObserver(function (mutations) {
  if (!hasActiveStyle) return;
  for (var i = 0; i < mutations.length; i++) {
    var removed = mutations[i].removedNodes;
    for (var j = 0; j < removed.length; j++) {
      // Re-inject if our style/link was removed, or if head itself was replaced
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
      var elem = et.elements[k].trim();
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
        var inc = et.elements[j].trim();
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
