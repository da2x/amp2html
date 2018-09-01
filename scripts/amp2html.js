/*
 * Copyright © 2017–2018 Daniel Aleksandersen
 * SPDX-License-Identifier: MIT
 * License-Filename: LICENSE
 */


// standard AMP documents
if (document.querySelector("html[amp],html[⚡]"))
{
  var amp = document.head.querySelector("link[rel='amphtml'][href]"),
  canon = document.head.querySelector("link[rel='canonical'][href],link[rel='canonical']");
  if (null != canon && canon.href != null &&
      !(amp != null && amp.href == canon.href))
  {
    canon = canon.href.trim();
    if (null != canon &&
        document.location != canon &&
        (canon.startsWith('https:') || canon.startsWith('http:')))
    {
      browser.storage.local.get('redirect_count').then(
        data => browser.storage.local.set({'redirect_count': (data.redirect_count || 0) + 1})
      );
      document.location.replace(canon);
} } }

// google news
else if (document.location.host.includes('news.google.'))
{
  var amp_links = document.querySelectorAll("a[ampo_url]");
  for (i = 0; i < amp_links.length; ++i)
  {
    var link = amp_links[i];
    link.onclick = function(){window.stop();document.location.replace(this.href)};
} }

// google search
else if (document.location.host.includes('.google.') &&
    document.querySelector("html[itemtype='http://schema.org/SearchResultsPage']"))
{
  var amp_links = document.querySelectorAll("a[data-amp][data-amp-cur]");
  for (i = 0; i < amp_links.length; ++i)
  {
    var link = amp_links[i];
    link.href = link.dataset.amp;
    delete link.dataset.amp;
    delete link.dataset.ampCur;
} }

