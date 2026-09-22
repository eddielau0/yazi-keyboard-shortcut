# Yazi keyboard shortcut map

An offline, browser-reviewable map of the active Yazi shortcuts in this configuration. It uses the canonical MacBook keyboard geometry from the reference project and keeps the base geometry stylesheet unchanged.

## Browse

Open `index.html` directly, or serve the directory with any static file server:

```sh
python3 -m http.server 8000
```

Then open <http://localhost:8000/>.

- **Source** switches between the local keymap, Whoosh plugin menu controls, and configured bookmark targets.
- **Mode** identifies the interaction surface for the selected source.
- **Layer** narrows the map to direct bindings, bookmark actions, menu controls, or saved bookmarks.
- **Search** searches sequences, action names, and provenance while keeping the keyboard geometry intact.
- Hover a mapped key for the full action, exact sequence, and source path. The same information is exposed through `aria-label`.

The map intentionally keeps longer explanations out of the keycaps. Unmapped keys retain their physical Mac legends.

## Source inventory

The source material was read from the read-only configuration at `/Users/eddie/.config/yazi/`:

- `keymap.toml`: all active `mgr.prepend_keymap` bindings, including Whoosh sequences, ouch compression, and macOS Quick Look commands.
- `init.lua`: Whoosh `special_keys` configuration. The active configuration leaves the plugin defaults in place: Enter, Space, Tab, Backspace, and `-`.
- `plugins/whoosh.yazi/bookmarks`: the active bookmark target names and keys.
- `plugins/whoosh.yazi/README.md` and `main.lua`: semantics for the Whoosh menu, fuzzy actions, history, project-root behavior, and bookmark commands.
- `plugins/ouch.yazi/README.md`: the meaning of the configured `plugin ouch 7z` binding.
- `yazi.toml` and `package.toml`: checked for active plugin and opener context. They do not add keyboard bindings to this map.

The map does not invent Yazi's built-in defaults. Its scope is the active custom keymap plus the configured plugin layers and stored bookmark targets above. Plugin-generated bookmark keys are data-dependent, so only the currently stored bookmarks are shown.

## Styling and assets

- `css/stijl.css` is byte-identical to the reference `mac-keyboard-shortcut/css/stijl.css`.
- `fonts/keyboard.otf` and `img/alum.png` are byte-identical copies of the reference assets.
- `css/yazi.css` contains only the compact controls, mapped-key labels, readout, and responsive overflow behavior.
- `app.js` contains the source-separated mapping data and rendering behavior.

## License

The original keyboard geometry and assets retain the licensing terms of the reference project. The Yazi-specific map and overlay code are provided under the MIT License.
