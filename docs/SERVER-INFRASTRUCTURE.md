# Portfolio (buenalynch.com) -- Server Infrastructure

Last updated: 2026-04-24

## Machine

- **Server**: cepelynvault
- **Tunnel**: buenalynch

## This App

| Service | Port | Container |
|---------|------|-----------|
| nginx | 80 | portfolio-nginx-1 |

- **Subdomain**: buenalynch.com, www.buenalynch.com
- **Content**: Static site (Vite + React + TypeScript build output)

## Notes

Port assignments are managed centrally by the lynch-project-scaffolder skill. If you need to check what other ports are in use across all projects, refer to `_lynchProtocol/SERVER-INFRASTRUCTURE.md` in the parent workspace (not accessible from within this repo).
