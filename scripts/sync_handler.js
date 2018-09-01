const INTERNAL_UUID = new URL(browser.runtime.getURL('')).hostname;


function registerSyncClient()
{
  return browser.storage.sync.get(['clients', INTERNAL_UUID]).then(
    data => {
      if (data.clients && data.clients[INTERNAL_UUID])
        return;
      if (!data.clients || !data.clients[INTERNAL_UUID])
      {
        let clients = data.clients || [];
        clients.push(INTERNAL_UUID);
        browser.storage.sync.set({clients: clients});
      }
    }
  );
}


function handleSyncing(changes, area)
{
  if (area == 'local' && changes && changes.redirect_count && changes.redirect_count.newValue)
  {
    let sync_data = {};
    sync_data[INTERNAL_UUID] = changes.redirect_count.newValue
    return browser.storage.sync.set(sync_data).then();
  }
  if (area == 'sync')
  {
    var sync_change = 0;
    for (item in changes)
    {
      if (item == 'clients')
        continue;
      var change = changes[item];
      if (!isNaN(parseInt(change.newValue)))
      {
        // updated value
        if (!isNaN(parseInt(change.oldValue)))
          sync_change += change.newValue - change.oldValue;
        // new value
        else
          sync_change += change.newValue;
      }
      // removed value
      else if (!isNaN(parseInt(change.oldValue)))
        sync_change -= change.oldValue;
    }
    if (sync_change != 0)
      browser.storage.local.get('synced_count').then(
        data => browser.storage.local.set({synced_count: data.synced_count + sync_change})
      );
  }
}


function countSyncedTotal()
{
  return browser.storage.sync.get(null).then(
    data => {
      var sync_count = 0;
      for (item in data)
      {
        if (item == 'clients')
          continue;
        let count = parseInt(data[item]);
        if (count > 0)
          sync_count += count;
      }
      return browser.storage.local.set({synced_count: sync_count});
    }
  ).then(
    () => browser.storage.onChanged.addListener(handleSyncing)
  );
}


if (browser.storage.sync)
  registerSyncClient().then(countSyncedTotal);