# Server Deployment - Raspberry Pi + Docker + Cloudflare Tunnel

Deployment guide for buenalynch.com on a self-hosted Raspberry Pi.

**Status:** Infrastructure ready, waiting for Dockerized site container

---

## Server Info

- **Hardware:** Raspberry Pi (aarch64)
- **OS:** Debian Bookworm — `Linux mc 6.12.25+rpt-rpi-v8 #1 SMP PREEMPT Debian 1:6.12.25-1+rpt1 (2025-04-30) aarch64`
- **Domain:** buenalynch.com
- **Ingress:** Cloudflare Tunnel (no port forwarding, no exposed IP)

---

## 1. Install Docker

```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

Add your user to the docker group (optional, avoids sudo for docker commands):

```bash
sudo usermod -aG docker $USER
```

Log out and back in for the group change to take effect.

Verify:

```bash
sudo docker run --rm hello-world
sudo docker compose version
```

---

## 2. Fix locale warnings (if present)

If you see `perl: warning: Setting locale failed` errors, the SSH client is forwarding a locale the Pi doesn't have:

```bash
sudo locale-gen en_GB.UTF-8
sudo dpkg-reconfigure locales
```

Select `en_GB.UTF-8` and set it as default.

---

## 3. Install cloudflared

Download and install the ARM64 .deb package:

```bash
curl -L https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-arm64.deb -o cloudflared.deb
sudo dpkg -i cloudflared.deb
```

---

## 4. Authenticate with Cloudflare

```bash
cloudflared tunnel login
```

This prints a URL. Open it in a browser, log into Cloudflare, and authorize the domain. Leave the terminal running until it prints `You have successfully logged in` and saves `cert.pem` to `~/.cloudflared/`.

---

## 5. Create the tunnel

```bash
cloudflared tunnel create buenalynch
```

This outputs a tunnel UUID and creates a credentials JSON file at `~/.cloudflared/<TUNNEL_UUID>.json`.

---

## 6. Configure the tunnel

Create the config file:

```bash
mkdir -p ~/.cloudflared
nano ~/.cloudflared/config.yml
```

Contents:

```yaml
tunnel: <TUNNEL_UUID>
credentials-file: /home/<your-user>/.cloudflared/<TUNNEL_UUID>.json

ingress:
  - hostname: buenalynch.com
    service: http://localhost:80
  - service: http_status:404
```

Replace `<TUNNEL_UUID>` with the UUID from step 5, and `<your-user>` with the Pi username.

---

## 7. Add DNS record

```bash
cloudflared tunnel route dns buenalynch buenalynch.com
```

This creates a CNAME record on Cloudflare pointing `buenalynch.com` to the tunnel. No static IP or port forwarding needed.

---

## 8. Run the tunnel

```bash
cloudflared tunnel run buenalynch
```

Once the Docker container is serving on port 80, traffic to `buenalynch.com` routes through the tunnel to the Pi.

---

## 9. Run as systemd service (after verifying it works)

To start the tunnel on boot:

```bash
sudo cloudflared service install
sudo systemctl enable cloudflared
sudo systemctl start cloudflared
```

Check status:

```bash
sudo systemctl status cloudflared
```

---

## 9b. Docker Setup (in `site/`)

Files created:
- `Dockerfile` — Multi-stage build (node:22-slim for build, nginx:alpine for serve)
- `docker-compose.yml` — Single service on port 80, restart unless-stopped
- `nginx.conf` — Gzip, asset caching, SPA fallback (`try_files → /index.html`)
- `.dockerignore` — Excludes node_modules, dist, generated files

### Media deployment

Media files are **not in git** (too large). Images are optimized locally and SCP'd to the Pi.

1. **Optimize images locally** (from project root):
   ```bash
   cd site && npm run prebuild
   ```
   This generates optimized images in `site/public/media/`.

2. **SCP optimized images to the Pi:**
   ```bash
   scp -r site/public/media/ mc@mc.local:~/repositories/buenalynch/buernalynch/site/public/media/
   ```

3. Only re-SCP when media files change. The Docker build skips image optimization — it expects `public/media/` to already exist.

### Build and run on the Pi

```bash
cd site
sudo docker compose up -d --build
```

The Dockerfile runs `build-content.ts` (content metadata) + Vite build. Image optimization is skipped — handled locally.

Verify:

```bash
curl http://localhost:80
```

### Rebuild after content changes

```bash
sudo docker compose up -d --build
```

If media changed, re-run the SCP step above before building.

### Stop

```bash
sudo docker compose down
```

## Checklist

- [x] Create `Dockerfile` (multi-stage: node build, nginx serve)
- [x] Create `docker-compose.yml`
- [x] Create `nginx.conf` (gzip, caching, SPA fallback)
- [ ] Build and run the container on the Pi
- [ ] Verify tunnel routes traffic to the container
- [ ] Set up systemd service for cloudflared

---

## Troubleshooting

### Locale warnings on SSH

```
perl: warning: Setting locale failed.
```

Fix: `sudo locale-gen en_GB.UTF-8 && sudo dpkg-reconfigure locales`

### cloudflared login hangs

Leave the terminal open after opening the auth URL. It waits for the browser authorization callback. Don't close the terminal until it prints success.

### Tunnel runs but site unreachable

- Check the Docker container is actually running: `sudo docker ps`
- Check it's on port 80: `curl http://localhost:80`
- Check tunnel config hostname matches the DNS record
- Check `cloudflared tunnel run` output for errors

---

**Created:** 2026-03-08
