// Sets the Cloudflare AML opt-out cookie
// https://amp.cloudflare.com/viewer/optout.html

browser.cookies.set({
  domain: '.amp.cloudflare.com',
  expirationDate: Math.floor(Date.now() / 1000) + 7776000,  // 90 days
  firstPartyDomain: 'cloudflare.com',
  name: 'AMP_OUTOUT',
  value: 'true',
  url: 'https://amp.cloudflare.com/'
});

