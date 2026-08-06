var currentStyle = {
  font_weight: null,
  font_style: null,
  font_family: { name: null, type: !1 },
  font_size: null,
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

chrome.storage.local.get("styles", function (a) {
  a &&
  a.styles &&
  a.styles.domain_styles &&
  a.styles.domain_styles[document.location.host]
    ? "global" === a.styles.domain_styles[document.location.host].type
      ? a.styles.global_style &&
        ((currentStyle = a.styles.global_style), updateStyle(currentStyle))
      : "custom" === a.styles.domain_styles[document.location.host].type &&
        ((currentStyle = a.styles.domain_styles[document.location.host]),
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
  var b = "* {";
  for (var c in a)
    if ("font_style" == c && a[c]) b += "font-style:" + a[c] + " !important;";
    else if ("font_weight" == c && a[c])
      b += "font-weight:" + a[c] + " !important;";
    else if ("font_family" == c && a[c] && a[c].name && a[c].type) {
      if ("google" === a[c].type)
        ((wf.href =
          ("https:" == document.location.protocol ? "https" : "http") +
          "://fonts.googleapis.com/css?family=" +
          a[c].name.replace(/\s/g, "+") +
          ":300,400,500,600,700,800,900"),
          (wf.type = "text/css"),
          (wf.rel = "stylesheet"));
      else if ("custom" === a[c].type) {
        var d =
          "@font-face{  font-family: '" +
          a[c].name +
          "';src: url(" +
          a[c].url +
          ");} ";
        b = d + b;
      }
      b += "font-family: '" + a[c].name + "' !important;";
    } else
      "font_size" == c &&
        a[c] &&
        ((b += "font-size:" + a[c] + "px !important;"),
        (b += "line-height: normal !important;"));
  b += "}";
  style.innerText = b;
  hasActiveStyle = true;
  injectElements();
};
