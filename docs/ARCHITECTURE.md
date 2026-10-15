# Architecture

SYJ OS Virtual Device v0.1.0 keeps application code above browser-specific and persistence primitives.

```text
┌───────────────────────────────┐
│ Apps                          │
│ Settings · Calculator · shell │
└───────────────┬───────────────┘
                │
┌───────────────▼───────────────┐
│ System Services               │
│ Battery · Network · Display   │
│ Security                      │
└───────────────┬───────────────┘
                │
┌───────────────▼───────────────┐
│ Virtual Hardware Interface    │
│ network · battery · profiles  │
└───────────────┬───────────────┘
                │
┌───────────────▼───────────────┐
│ Virtual Hardware State        │
│ persisted through local state │
└───────────────────────────────┘
```

The intended future mapping is:

```text
SYJ Apps → SYJ Services → SYJ HAL → Linux/AOSP → device hardware
```

The web version deliberately keeps browser APIs out of app implementations. The browser simulator is a product and interaction prototype, not a claim that browser code is equivalent to an operating-system kernel.

## State

Zustand owns runtime state. Its persisted subset contains virtual hardware, security state, settings, home layout and page selection. Factory reset clears the SYJ OS local storage namespace and restores defaults.

## App lifecycle

The registry describes apps. The app store allows one foreground app at a time. `AppWindow` owns animated open/close transitions and routes the foreground app to its implementation.

## Persistence

Settings and simulator state use localStorage through Zustand persistence. IndexedDB is available as a small storage primitive for future larger simulator data. No backend is required.
