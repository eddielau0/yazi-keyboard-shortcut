(() => {
  const sourceLabels = {
    keymap: 'Local keymap',
    whoosh: 'Whoosh plugin',
    bookmarks: 'Bookmarks file'
  };
  const modeLabels = {
    manager: 'Manager',
    menu: 'Bookmark menu',
    targets: 'Bookmark targets'
  };
  const layerLabels = {
    direct: 'Direct bindings',
    actions: 'Bookmark actions',
    menu: 'Menu controls',
    saved: 'Saved bookmarks'
  };

  const keys = new Map([...document.querySelectorAll('#keyboard [data-key]')].map(key => [key.dataset.key, key]));
  const canonicalMarkup = new Map([...keys].map(([keyName, key]) => [keyName, key.innerHTML]));
  const sourceModes = {
    keymap: ['manager'],
    whoosh: ['menu'],
    bookmarks: ['targets']
  };
  const mappings = [
    { source: 'keymap', mode: 'manager', layer: 'direct', key: 'left-bracket', label: ['Jump', '['], sequence: '[', action: 'Open Whoosh bookmark menu and choose a bookmark by key', provenance: 'keymap.toml: mgr.prepend_keymap' },
    { source: 'keymap', mode: 'manager', layer: 'direct', key: 'right-bracket', label: ['Fuzzy', '}'], sequence: '}', action: 'Open Whoosh fuzzy bookmark search', provenance: 'keymap.toml: mgr.prepend_keymap' },
    { source: 'keymap', mode: 'manager', layer: 'direct', key: 'c', label: ['7z', 'C'], sequence: 'C', action: 'Compress the hovered or selected files with ouch using 7z as the default format', provenance: 'keymap.toml + ouch.yazi/README.md' },
    { source: 'keymap', mode: 'manager', layer: 'direct', key: 'p', label: ['QL', '⌃P'], sequence: 'Ctrl-P', action: 'Open macOS Quick Look for the selected files', provenance: 'keymap.toml' },
    { source: 'keymap', mode: 'manager', layer: 'direct', key: 'q', label: ['QL', '⌃Q'], sequence: 'Ctrl-Q', action: 'Open macOS Quick Look for the hovered file', provenance: 'keymap.toml' },
    { source: 'keymap', mode: 'manager', layer: 'direct', key: 'space', label: ['QL', 'Space'], sequence: 'Space', action: 'Open macOS Quick Look for the hovered file', provenance: 'keymap.toml' },
    { source: 'keymap', mode: 'manager', layer: 'direct', key: 'k', label: ['Jump', '⌥K'], sequence: 'Alt-K', action: 'Jump directly to the bookmark whose key is k', provenance: 'keymap.toml + whoosh.yazi/main.lua' },

    { source: 'keymap', mode: 'manager', layer: 'actions', key: 'right-bracket', label: ['Prefix', ']'], sequence: '] …', action: 'Bookmark action prefix; the next key selects the action', provenance: 'keymap.toml: multi-key mgr.prepend_keymap entries' },
    { source: 'keymap', mode: 'manager', layer: 'actions', key: 'a', label: ['Save', ']a / ]A'], sequence: '] a / ] A', action: 'Save the hovered file/directory or current directory as a bookmark', provenance: 'keymap.toml + whoosh.yazi/main.lua' },
    { source: 'keymap', mode: 'manager', layer: 'actions', key: 't', label: ['Temp', ']t / ]T'], sequence: '] t / ] T', action: 'Save a temporary bookmark for the hovered file/directory or current directory', provenance: 'keymap.toml + whoosh.yazi/main.lua' },
    { source: 'keymap', mode: 'manager', layer: 'actions', key: 'f', label: ['Find', ']f'], sequence: '] f', action: 'Open Whoosh fuzzy bookmark search', provenance: 'keymap.toml + whoosh.yazi/main.lua' },
    { source: 'keymap', mode: 'manager', layer: 'actions', key: 'd', label: ['Delete', ']d / ]D'], sequence: '] d / ] D', action: 'Delete one bookmark by key or delete multiple bookmarks with fzf', provenance: 'keymap.toml + whoosh.yazi/main.lua' },
    { source: 'keymap', mode: 'manager', layer: 'actions', key: 'r', label: ['Rename', ']r / ]R'], sequence: '] r / ] R', action: 'Rename one bookmark by key or with fzf', provenance: 'keymap.toml + whoosh.yazi/main.lua' },
    { source: 'keymap', mode: 'manager', layer: 'actions', key: 'c', label: ['Clear all', ']C'], sequence: '] C', action: 'Delete all user bookmarks', provenance: 'keymap.toml + whoosh.yazi/main.lua' },

    { source: 'whoosh', mode: 'menu', layer: 'menu', key: 'enter', label: ['Temp', 'Enter'], sequence: 'Enter', action: 'Create a temporary bookmark for the current directory', provenance: 'whoosh.yazi/init.lua: special_keys.create_temp + README' },
    { source: 'whoosh', mode: 'menu', layer: 'menu', key: 'space', label: ['Fuzzy', 'Space'], sequence: 'Space', action: 'Launch fuzzy search from the bookmark menu', provenance: 'whoosh.yazi/init.lua: special_keys.fuzzy_search + README' },
    { source: 'whoosh', mode: 'menu', layer: 'menu', key: 'tab', label: ['History', 'Tab'], sequence: 'Tab', action: 'Open directory history when history entries exist', provenance: 'whoosh.yazi/init.lua: special_keys.history + README' },
    { source: 'whoosh', mode: 'menu', layer: 'menu', key: 'delete', label: ['Prev dir', '⌫'], sequence: 'Backspace', action: 'Jump to the previous directory when one exists', provenance: 'whoosh.yazi/init.lua: special_keys.previous_dir + README' },
    { source: 'whoosh', mode: 'menu', layer: 'menu', key: 'minus', label: ['Root', '-'], sequence: '-', action: 'Jump to the current Git repository root when found', provenance: 'whoosh.yazi/main.lua default + README' },

    { source: 'bookmarks', mode: 'targets', layer: 'saved', key: 'w', label: ['Work', 'W'], sequence: 'w', action: 'Jump to the configured Workbench bookmark', provenance: 'plugins/whoosh.yazi/bookmarks' },
    { source: 'bookmarks', mode: 'targets', layer: 'saved', key: 's', label: ['Sync', 'S'], sequence: 's', action: 'Jump to the configured Sync bookmark', provenance: 'plugins/whoosh.yazi/bookmarks' },
    { source: 'bookmarks', mode: 'targets', layer: 'saved', key: 'slash', label: ['Root', '/'], sequence: '/', action: 'Jump to the configured filesystem root bookmark', provenance: 'plugins/whoosh.yazi/bookmarks' },
    { source: 'bookmarks', mode: 'targets', layer: 'saved', key: 'k', label: ['KB', 'K'], sequence: 'k', action: 'Jump to the configured KnowledgeBase bookmark', provenance: 'plugins/whoosh.yazi/bookmarks' },
    { source: 'bookmarks', mode: 'targets', layer: 'saved', key: 'h', label: ['Home', 'H'], sequence: 'h', action: 'Jump to the configured Home bookmark', provenance: 'plugins/whoosh.yazi/bookmarks' },
    { source: 'bookmarks', mode: 'targets', layer: 'saved', key: 'g', label: ['GitHub', 'G'], sequence: 'g', action: 'Jump to the configured GitHub bookmark', provenance: 'plugins/whoosh.yazi/bookmarks' },
    { source: 'bookmarks', mode: 'targets', layer: 'saved', key: 'd', label: ['Dots', 'D'], sequence: 'D', action: 'Jump to the configured Dotfiles bookmark', provenance: 'plugins/whoosh.yazi/bookmarks' },
    { source: 'bookmarks', mode: 'targets', layer: 'saved', key: '0', label: ['App', '0'], sequence: '0', action: 'Jump to the configured Application Support bookmark', provenance: 'plugins/whoosh.yazi/bookmarks' }
  ];

  const sourceSelect = document.querySelector('#source');
  const modeSelect = document.querySelector('#mode');
  const layerSelect = document.querySelector('#layer');
  const search = document.querySelector('#search');
  const stateReadout = document.querySelector('#state');
  const matchesReadout = document.querySelector('#matches');
  const esc = value => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
  const state = { source: 'keymap', mode: 'manager', layer: 'direct' };

  const availableLayers = () => [...new Set(mappings.filter(item => item.source === state.source && item.mode === state.mode).map(item => item.layer))];
  const refreshModes = () => {
    modeSelect.innerHTML = sourceModes[state.source].map(mode => `<option value="${mode}">${modeLabels[mode]}</option>`).join('');
    modeSelect.value = state.mode;
  };
  const refreshLayers = () => {
    const layers = availableLayers();
    if (!layers.includes(state.layer)) state.layer = layers[0] || 'direct';
    layerSelect.innerHTML = layers.map(layer => `<option value="${layer}">${layerLabels[layer]}</option>`).join('');
    layerSelect.value = state.layer;
  };
  const inSearch = item => {
    const haystack = `${item.sequence} ${item.action} ${item.provenance} ${sourceLabels[item.source]}`.toLowerCase();
    return !search.value.trim() || haystack.includes(search.value.trim().toLowerCase());
  };
  const render = () => {
    keys.forEach(key => {
      key.innerHTML = canonicalMarkup.get(key.dataset.key);
      key.classList.remove('mapped', 'search-dim', 'search-match');
      key.removeAttribute('title');
      key.removeAttribute('aria-label');
    });
    const query = search.value.trim();
    const allInState = mappings.filter(item => item.source === state.source && item.mode === state.mode);
    const active = query ? allInState : allInState.filter(item => item.layer === state.layer);
    const visible = active.filter(inSearch);
    const grouped = new Map();
    visible.forEach(item => {
      if (!grouped.has(item.key)) grouped.set(item.key, []);
      grouped.get(item.key).push(item);
    });
    grouped.forEach((items, keyName) => {
      const key = keys.get(keyName);
      if (!key) return;
      key.classList.add('mapped');
      if (query) key.classList.add('search-match');
      const item = items[0];
      key.innerHTML = `<span class="map-label">${item.label.slice(0, 3).map(line => `<span class="map-line">${esc(line)}</span>`).join('')}</span>`;
      const description = items.map(entry => `${entry.sequence}: ${entry.action}`).join(' / ');
      key.title = `${description} · ${items.map(entry => entry.provenance).join(' / ')}`;
      key.setAttribute('aria-label', `${description}. Source: ${sourceLabels[item.source]}. Mode: ${modeLabels[item.mode]}.`);
    });
    if (query) {
      allInState.filter(item => !inSearch(item)).forEach(item => {
        const key = keys.get(item.key);
        if (key && !grouped.has(item.key)) key.classList.add('search-dim');
      });
    }
    stateReadout.textContent = `${sourceLabels[state.source]} · ${modeLabels[state.mode]} · ${layerLabels[state.layer]}`;
    matchesReadout.textContent = query
      ? ` ${visible.length} matching binding${visible.length === 1 ? '' : 's'} across this source`
      : ` ${visible.length} binding${visible.length === 1 ? '' : 's'} in this layer`;
  };

  sourceSelect.addEventListener('change', event => {
    state.source = event.target.value;
    state.mode = sourceModes[state.source][0];
    refreshModes();
    refreshLayers();
    render();
  });
  modeSelect.addEventListener('change', event => {
    state.mode = event.target.value;
    refreshLayers();
    render();
  });
  layerSelect.addEventListener('change', event => { state.layer = event.target.value; render(); });
  search.addEventListener('input', render);
  refreshModes();
  refreshLayers();
  render();
})();
