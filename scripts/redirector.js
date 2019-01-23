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


// Cloudflare AMP Cache
// Convert https://amp.cloudflare.com/c/s/www.example.com/amp/document
//      to https://www.example.com/amp/document
// Convert https://www-example-com.amp.cloudflare.com/c/www.example.com/amp/document
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
      'https://amp.cloudflare.com/c/*',
      'https://*.amp.cloudflare.com/c/*',
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
