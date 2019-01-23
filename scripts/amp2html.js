/*
 * Copyright © 2017–2019 Daniel Aleksandersen
 * SPDX-License-Identifier: MIT
 * License-Filename: LICENSE
 */

var link_amp = document.head.querySelector("link[rel~='amphtml'][href]"),
    link_can = document.head.querySelector("link[rel~='canonical'][href]");

// standard AMP documents
if (document.querySelector("html[amp],html[⚡]"))
{
  if (null != link_can && link_can.href != null &&
      !(link_amp != null && link_amp.href == link_can.href))
  {
    var canon = link_can.href.trim();
    if (null != canon &&
        document.location != canon &&
        (canon.startsWith('https:') || canon.startsWith('http:')))
    {
      document.location.replace(canon);
} } }

// unidentified AMP documents
if (null != link_amp && null != link_can &&
    link_amp.href != link_can.href &&
    link_amp.href == document.location.href)
{
  var canon = link_can.href.trim();
  if (null != canon &&
      (canon.startsWith('https:') || canon.startsWith('http:')))
  {
    document.location.replace(canon);
} }

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
} }
