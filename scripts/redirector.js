/*
 * Copyright © 2017–2022 Daniel Aleksandersen <https://www.daniel.priv.no/>
 * SPDX-License-Identifier: MIT
 * License-Filename: LICENSE
 */

// Bing AMP Viewer
// Convert https://www.bing.com/amp/s/www.example.com/amp/document
//      to https://www.example.com/amp/document
// Google AMP Viewer
// Convert https://www.google.com/amp/www.example.com/amp/document
//      to http://www.example.com/amp/document

var browserapp = (typeof browser !== 'undefined') ? browser : chrome;

function amp_viewer_redirector(requestDetails)
{
  var amp_viewer = new URL(requestDetails.url);
  var redirection = amp_viewer.pathname.replace(/^\/amp\/s\//, 'https://').replace(/^\/amp\//, 'http://');

  // Google AMP Viewer sometimes URI encode query parameters, handle optimistically
  if (!redirection.includes('?') && redirection.includes('%3f'))
  {
    var uriComponents = redirection.split('%3f');
    var uri = uriComponents[0];
    // this can make a mess, but it’s not of our making
    var query = decodeURIComponent(uriComponents.slice(1).join('%3f'));
    redirection = uri.concat('?', query);
  }
  // Unhandled case: <viewer-url>%f3<page-query>?<google-query>
  // It’s impossible to distinguish page-query and google-query, as we never know beforehand if
  // the URL has been encoded or not (the escaped question mark can also be in any part of the URL).
  //
  // Incorrectly handled cases:
  //   * question mark in path, e.g.
  //     example.com/is-it-good%f3/sure-why-not

  return {
    redirectUrl: redirection
  };
}

browserapp.webRequest.onBeforeRequest.addListener(
  amp_viewer_redirector,
  {
    urls: [
      'https://www.bing.com/amp/*',
      'https://www.google.com/amp/*'
    ]
  },
  ["blocking"]
);


//      to http://www.example.com/amp/document
// Google AMP Cache
// Convert https://cdn.ampproject.org/c/s/www.example.com/amp/document
//      to https://www.example.com/amp/document
// Convert https://www-example-com.cdn.ampproject.org/c/s/www.example.com/amp/document
//      to https://www.example.com/amp/document
// Bing AMP Cache
// Convert https://bing-amp.com/c/s/www.example.com/amp/document
//      to https://www.example.com/amp/document
// Convert https://www-example-com.bing-amp.com/c/www.example.com/amp/document
//      to http://www.example.com/amp/document

function amp_cache_redirector(requestDetails)
{
  var amp_cache = new URL(requestDetails.url);
  var redirection = amp_cache.pathname.replace(/^\/c\/s\//, 'https://').replace(/^\/c\//, 'http://');
  if (navigator.userAgent.includes('Firefox'))
  return {
    redirectUrl: redirection
  };
}


browserapp.webRequest.onBeforeRequest.addListener(
  amp_cache_redirector,
  {
    urls: [
      'https://cdn.ampproject.org/c/*',
      'https://*.cdn.ampproject.org/c/*',
      'https://bing-amp.com/c/*',
      'https://*.bing-amp.com/c/*'
    ]
  },
  ["blocking"]
);


// Twitter Shortlinks
// Convert https://t.co/abc123?amp=1
//      to https://t.co/abc123
function t_co_redirector(requestDetails)
{
  var redirection = new URL(requestDetails.url);
  redirection.search = '';
  return {
    redirectUrl: redirection.toString()
  };
}

browserapp.webRequest.onBeforeRequest.addListener(
  t_co_redirector,
  {
    urls: [
      '*://t.co/*?amp=1'
    ]
  },
  ["blocking"]
);
