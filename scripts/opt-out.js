// Sets the Cloudflare AML opt-out cookie
// https://amp.cloudflare.com/viewer/optout.html

if (typeof browser !== 'undefined')
{
  browser.cookies.set({
    domain: '.amp.cloudflare.com',
    expirationDate: Math.floor(Date.now() / 1000) + 7776000,  // 90 days
    firstPartyDomain: 'cloudflare.com',
    name: 'AMP_OPTOUT',
    value: 'true',
    url: 'https://amp.cloudflare.com/'
  });
}
else if (typeof chrome !== 'undefined')
{
  chrome.cookies.set({
    domain: '.amp.cloudflare.com',
    expirationDate: Math.floor(Date.now() / 1000) + 7776000,  // 90 days
    name: 'AMP_OPTOUT',
    value: 'true',
    url: 'https://amp.cloudflare.com/'
  });
}
