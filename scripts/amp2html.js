/*
 * Copyright © 2017–2020 Daniel Aleksandersen <https://www.daniel.priv.no/>
 * SPDX-License-Identifier: MIT
 * License-Filename: LICENSE
 */

if (document && document.head)
{
  var link_amp = document.head.querySelector("link[rel~='amphtml'][href]"),
      link_can = document.head.querySelector("link[rel~='canonical'][href]");

  if (document.querySelector("html[amp],html[⚡]") ||
    (null != link_amp && link_amp.href == document.location.href))
  {
    if (null != link_can && link_can.href != null &&
        !(link_amp != null && link_amp.href == link_can.href))
    {
      // don’t redirect to self, referrer, internal origin-bound last redirect destination, or non-web schemes
      if (null != link_can.href &&
          document.location.href != link_can.href &&
          document.referrer != link_can.href &&
          sessionStorage.getItem('amp2html_extension_redirect_destination') != link_can.href &&
          (link_can.href.startsWith('https:') || link_can.href.startsWith('http:')))
      {
        sessionStorage.setItem('amp2html_extension_redirect_destination', link_can.href);
        document.location.replace(link_can.href);
  } } }

  // google news
  if (document.location.host.includes('news.google.'))
  {
    var amp_links = document.querySelectorAll("a[ampo_url]");
    for (i = 0; i < amp_links.length; ++i)
    {
      var link = amp_links[i];
      link.onclick = function(){window.stop();document.location.replace(this.href)};
  } }

  // google search
  if (document.location.host.includes('.google.') &&
      document.querySelector("html[itemtype='http://schema.org/SearchResultsPage']"))
  {
    var amp_links = document.querySelectorAll("a[data-amp][data-amp-cur]");
    for (i = 0; i < amp_links.length; ++i)
    {
      var link = amp_links[i];
      link.href = link.dataset.ampCur;
      link.dataset.amp = link.dataset.ampCur;
} } }
