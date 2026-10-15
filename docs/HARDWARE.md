# Virtual Hardware Specification

All hardware values in v0.1.0 are simulated.

| Field | Range / values | Default | UI reaction |
|---|---|---:|---|
| Battery percent | 0–100 | 82 | Status icon, Battery page, low-battery dialog at ≤15%, power saver at ≤20% |
| Charging | true/false | false | Battery drain reverses to slow charge |
| Power saver | true/false | false | Visible in Battery settings and hardware state |
| Network | auto/wifi/5g/offline | auto | Status bar changes to Wi-Fi, 5G or Offline |
| Wi-Fi enabled | true/false | true | Wi-Fi tile/status reaction |
| Airplane mode | true/false | false | Forces Offline display |
| Brightness | 5–100 | 72 | Display control value |
| Rotation | 0/90/180/270 | 0 | Stored as virtual display orientation |
| CPU load | 0–100% | 18 | Developer Options performance readout |
| RAM used | 0.5 to profile RAM | 3.2 GB | Developer Options readout; profile constrains maximum |
| Storage used | 0 to profile storage | 37 GB | Developer Options readout; profile constrains maximum |
| Thermal | 20–70 °C | 34 °C | Developer Options readout and simulated runtime drift |
| Volume | 0–100 | 48 | Host volume buttons and hardware editor |
| Location | preset string | Hyderabad, India | Status bar location and lock screen |
| Device profile | phone/compact/tablet | phone | Host device dimensions and hardware capacity |

## Profiles

- **SYJ One (Phone):** 393×852, 8 GB RAM, 256 GB storage, 2.8 GHz simulated CPU, GPU score 78.
- **SYJ Compact:** 360×780, 6 GB RAM, 128 GB storage, 2.4 GHz simulated CPU, GPU score 61.
- **SYJ Tab:** 820×1180, 12 GB RAM, 512 GB storage, 3.0 GHz simulated CPU, GPU score 91.

## Runtime behavior

A one-second simulator tick slowly drains or charges the battery, updates power-saver state and nudges CPU/RAM/thermal values. Developer Options can override those values and the selected device profile changes their bounds.
