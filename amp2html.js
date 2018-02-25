/*
 * Copyright © 2017–2018 Daniel Aleksandersen
 * SPDX-License-Identifier: MIT
 * License-Filename: LICENSE
 */

// tests for AMP first, and then Google hosted AMP
if (document.querySelector("html[amp],html[⚡]") ||
    (document.location.pathname.split('/')[1] == "amp" &&
     document.location.hostname.split('.')[1] == "google") ) {
  var amp = document.head.querySelector("link[rel='amphtml'][href]"),
  canon = document.head.querySelector("link[rel='canonical'][href],link[rel='canonical']");
  if (null != canon && canon.href != null &&
      !(amp != null && amp.href == canon.href)) {
    canon = canon.href.trim();
    if (null != canon &&
        document.location != canon &&
        (canon.startsWith('https:') || canon.startsWith('http:'))) {
    document.location.replace(canon);
} } }
