// Convert https://t.co/abc123?amp=1
//      to https://t.co/abc123
function t_co_redirector(requestDetails) {
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
