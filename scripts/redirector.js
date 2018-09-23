// Bing AMP Viewer and Google AMP Viewer
// Convert https://www.bing.com/amp/s/www.example.com/amp/document
//      to https://www.example.com/amp/document
// Convert https://www.google.com/amp/www.example.com/amp/document
//      to http://www.example.com/amp/document

function amp_viewer_redirector(requestDetails)
{
  var amp_viewer = new URL(requestDetails.url);
  var redirection = amp_viewer.pathname.replace(/^\/amp\/s\//, 'https://').replace(/^\/amp\//, 'http://');
  browser.storage.local.get('redirect_count').then(
    data => browser.storage.local.set({'redirect_count': (data.redirect_count || 0) + 1})
  );
  return {
    redirectUrl: redirection
  };
}

browser.webRequest.onBeforeRequest.addListener(
  amp_viewer_redirector,
  {
    urls: [
      'https://www.bing.com/amp/*',
      'https://www.google.com/amp/*'
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
  browser.storage.local.get('redirect_count').then(
    data => browser.storage.local.set({'redirect_count': (data.redirect_count || 0) + 1})
  );
  return {
    redirectUrl: redirection.toString()
  };
}

browser.webRequest.onBeforeRequest.addListener(
  t_co_redirector,
  {
    urls: [
      '*://t.co/*?amp=1'
    ]
  },
  ["blocking"]
);