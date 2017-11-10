/*
 * Copyright © 2017 Daniel Aleksandersen
 * SPDX-License-Identifier: MIT
 * License-Filename: LICENSE
 */

if (document.querySelector("html[amp],html[⚡]")) {
  var amp = document.head.querySelector("link[rel='amphtml'][href]"),
  canon = document.head.querySelector("link[rel='canonical'][href]");
  if (null != canon && canon.href != null &&
      !(amp != null && amp.href == canon.href)) {
    canon = canon.href.trim();
    if (null != canon &&
        (canon.startsWith('https:') || canon.startsWith('http:'))) {
    document.location.replace(canon);
} } }
