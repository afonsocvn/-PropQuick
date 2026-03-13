---
name: RTK Token Killer
description: Uses the RTK (Rust Token Killer) tool to compress terminal outputs and save LLM tokens.
---

# RTK Token Killer

RTK (Rust Token Killer) is a high-performance CLI proxy that intercepts and compresses command outputs to reduce token consumption by 60-90%.

## Usage

To use RTK, wrap your terminal commands with `rtk`.

### Base Command
The binary is located in the project's `bin` directory:
`.\bin\rtk.exe <command>`

### Examples

#### Running the Development Server
```powershell
.\bin\rtk.exe npm run dev
```

#### Git Operations
```powershell
.\bin\rtk.exe git status
.\bin\rtk.exe git diff
```

#### Docker Operations
```powershell
.\bin\rtk.exe docker ps -a
```

## Security & Privacy

### Disabling Telemetry
Telemetry is enabled by default. To disable it, set the environment variable:
```powershell
$env:RTK_TELEMETRY_DISABLED=1
```

### Local History
RTK saves command history locally in a SQLite database for 90 days. This is used for generating savings reports via `.\bin\rtk.exe gain`.

## Best Practices
- Use RTK for commands with verbose output (e.g., `npm install`, `test` runs, `git log`).
- For aggressive compression of source code, use the `--aggressive` flag.
