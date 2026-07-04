# Prism-Edge Homepage

Vite/React homepage for Prism-Edge. This is the dynamic source for the public landing page, bilingual copy, product cards, and early-access CTA.

## Local Checks

```bash
npm install
npm run lint
npm run build
```

## Vercel Deployment

This repository is intended to deploy through GitHub + Vercel.

- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Serverless API: `api/early-access.js`

After importing the GitHub repository into Vercel, add the production domains:

- `prismedge.tech`
- `www.prismedge.tech`

Keep DNS hosted in Cloudflare, then follow Vercel's domain instructions for the required `A` and `CNAME` records.

## Environment Variables

All public browser variables must use the `VITE_` prefix.

- `VITE_SITE_URL`: canonical public site URL after the domain is attached.
- `VITE_API_CONSOLE_URL`: optional API console URL. Empty value keeps the button on the product section.
- `VITE_DESKTOP_DOWNLOAD_URL`: optional Electron desktop download URL. Empty value keeps the CTA on early access. Use GitHub Releases, Vercel Blob, or R2 for large installers.


## Desktop Download

Do not commit the Electron installer into this homepage repository. The Windows installer is larger than typical Pages/Git hosting limits, so upload it to Cloudflare R2 or GitHub Releases and set `VITE_DESKTOP_DOWNLOAD_URL` to the public URL.

Current Windows artifact:

- Source build output: `C:\Users\Ethan\Desktop\01-Projects\Prism-Edge\apps\electron\dist\Prism-Edge Setup 0.1.0.exe`
- Recommended public filename: `Prism-Edge-Setup-0.1.0-win-x64.exe`
- SHA256: `1e3612ad6758a47e964c677eceabb86f285f1fc07d993c6a7836197dd2c9029a`
