function init()
{
  function updateRedirectDisplayCount(count)
  {
    let display_count = parseInt(count).toLocaleString('en-US').replace(',', ' ');
    document.getElementById('count').childNodes[0].nodeValue = display_count;
  }


  function updateSyncDisplayCount(count)
  {
    let display_count = parseInt(count).toLocaleString('en-US').replace(',', ' ');
    document.getElementById('sync-count').childNodes[0].nodeValue = display_count;
    if (count > parseInt(document.getElementById('count').childNodes[0].nodeValue))
      document.getElementById('sync-label').style.display = 'inline';
    else
      document.getElementById('sync-label').style.display = 'none';
  }


  function getStoredCounts(changes, area)
  {
    if (area == 'local' && changes && changes.redirect_count)
    {
      var value = 0;
      if (!isNaN(parseInt(changes.redirect_count.newValue)))
        value = changes.redirect_count.newValue;
      updateRedirectDisplayCount(value);
    }
    if (area == 'local' && changes && changes.synced_count)
    {
      var value = 0;
      if (!isNaN(parseInt(changes.synced_count.newValue)))
        value = changes.synced_count.newValue;
      updateSyncDisplayCount(value);
    }
  }
  browser.storage.onChanged.addListener(getStoredCounts);


  browser.storage.local.get(['redirect_count', 'synced_count']).then(
    data => {
      updateRedirectDisplayCount(data.redirect_count || 0);
      updateSyncDisplayCount(data.synced_count || 0);
    }
  );
}


document.readyState == 'complete' || document.readyState == 'interactive' ? init() : document.addEventListener('DOMContentLoaded', init);