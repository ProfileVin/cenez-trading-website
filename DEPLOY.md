# Publish the Ceñez Trading website (GitHub + Cloudflare Pages)

This guide puts the project on GitHub, then connects it to Cloudflare Pages so the site goes live. After setup, every push to GitHub rebuilds and republishes the site.

**You will need:**
- A GitHub account: https://github.com/signup
- A Cloudflare account (the free plan is enough): https://dash.cloudflare.com/sign-up
- Git and Node.js installed. Check in a terminal:
  ```bash
  git --version   # any recent version
  node -v         # v20 or newer (this project was built on v24)
  ```

**Time:** about 20 minutes.

---

## Part 1: Get the project ready

### 1. Remove files the site doesn't use
Everything in `public/` gets published, so delete these two files from `public/products/`:
- `product1.png` (3 MB; the site uses `product1.jpg` instead)
- `870317309_1112589765081780_6671999626817886824_n.png` (the old design screenshot)

### 2. Check that it builds
From the project folder (`D:\Projects\Cenez`):
```bash
npm install
npm run build
```
It should end with `✓ built in …`. If it fails here, it will also fail on Cloudflare, so fix it first.

### 3. Optional: preview the production build
```bash
npm run preview
```
Open the address it prints (usually http://localhost:4173), click around, then press `Ctrl + C` to stop.

---

## Part 2: Put the code on GitHub

### 4. Create an empty repository on GitHub
1. Go to https://github.com/new
2. **Repository name:** `cenez-trading-website` (or any name you like)
3. **Visibility:** Private is fine. Cloudflare can still read it once you connect it.
4. Do **not** tick "Add a README", ".gitignore" or "license". The project already has these, and an empty repo avoids merge conflicts.
5. Click **Create repository**. Keep the page open; you'll need its URL, which looks like `https://github.com/<your-username>/cenez-trading-website.git`.

### 5. Set your Git name and email (first time only)
```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

### 6. Turn the project folder into a Git repository and make the first commit
In the project folder:
```bash
git init
git branch -M main
git add .
git status
```
Check the `git status` list before committing:
- You **should** see `src/`, `public/`, `index.html`, `package.json`, `package-lock.json` and the `.md` files.
- You should **not** see `node_modules/`, `dist/` or `.env.local`. The `.gitignore` file keeps them out.

Then commit:
```bash
git commit -m "Initial commit: Ceñez Trading website"
```

### 7. Connect to GitHub and push
Replace the URL with the one from step 4:
```bash
git remote add origin https://github.com/<your-username>/cenez-trading-website.git
git push -u origin main
```
The first push opens a browser window asking you to sign in to GitHub. Approve it.

Refresh the repository page on GitHub. Your files should be there.

---

## Part 3: Publish on Cloudflare Pages

### 8. Create the Pages project
1. Log in to https://dash.cloudflare.com
2. In the left menu, open **Workers & Pages** (under **Compute** in newer dashboards).
3. Click **Create**, choose the **Pages** tab, then **Import an existing Git repository**.
   - If you only see Workers options, look for a link like "Looking to deploy Pages? Get started" and use that.
4. Click **Connect GitHub**. In the GitHub window that opens, choose **Only select repositories**, pick `cenez-trading-website`, and click **Install & Authorize**.
5. Back in Cloudflare, select the repository and click **Begin setup**.

### 9. Build settings
Fill in exactly:

| Setting | Value |
|---|---|
| Project name | `cenez-trading` (this becomes `cenez-trading.pages.dev`) |
| Production branch | `main` |
| Framework preset | `React (Vite)`, or `None` if it isn't listed |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | leave empty |

Open **Environment variables (advanced)** and add:

| Variable name | Value | Why |
|---|---|---|
| `NODE_VERSION` | `24` | Builds with the same Node version used locally |
| `VITE_QUOTE_ENDPOINT` | your form backend URL | **Optional.** Leave it out until the quote backend exists. Without it, quote requests stay in the visitor's browser and are **not sent to Ceñez Trading** |

Click **Save and Deploy**.

### 10. Wait for the first build
The build log runs in the browser and takes 1–2 minutes. When it says **Success**, click the link it shows: `https://cenez-trading.pages.dev`.

### 11. Check the live site
- The home page loads, with photos.
- Click a model card. The model page opens at `/products/...`.
- **Reload the browser on a model page.** It should still load, not show a 404. Cloudflare Pages serves `index.html` for unknown paths when the project has no `404.html`, which this one doesn't.
- Open `/quote?product=fp-lap-01&type=customize`. The form should have "Customize a model" and the lap pool already selected.
- Check on your phone as well.

---

## Part 4: Use the company's own domain (optional)

Use this if Ceñez Trading owns a domain such as `ceneztrading.com`.

1. In Cloudflare, open the Pages project and go to **Custom domains**, then **Set up a custom domain**.
2. Enter the domain, e.g. `www.ceneztrading.com`, and continue.
3. Follow what Cloudflare shows:
   - **Domain already on Cloudflare:** it adds the DNS record for you. Click **Activate domain**.
   - **Domain at another registrar** (GoDaddy, Namecheap, etc.): add the **CNAME** record Cloudflare shows (`www` pointing to `cenez-trading.pages.dev`) in that registrar's DNS settings. To use the bare domain (`ceneztrading.com` without `www`), Cloudflare will ask you to move the domain's nameservers to Cloudflare. Follow its steps.
4. HTTPS is set up automatically. It can take from a few minutes up to 24 hours for DNS to update.

> A note on the name: domains can't contain "ñ" directly, so use `cenez` in the domain.

---

## Updating the site later

Every push to `main` publishes automatically:
```bash
git add .
git commit -m "Describe what changed"
git push
```
Cloudflare rebuilds in 1–2 minutes. Pushes to other branches get their own preview URLs and don't touch the live site.

**Common updates:**
- **Phone, email, address:** `src/lib/site.ts`
- **Model price, size, specs:** the JSON files in `src/content/products/`
- **New photos:** add them to `public/products/` (JPG, about 1600px wide, under ~400 KB), then reference them in the product JSON or in `src/content/projects.ts`

**To roll back a bad update:** in Cloudflare open the Pages project, go to **Deployments**, find an earlier good deployment, open its **⋯** menu and choose **Rollback to this deployment**.

---

## Troubleshooting

| Problem | Fix |
|---|---|
| Build fails with `npm ERR!` or a Node version error | Check that `NODE_VERSION` = `24` is set (Settings → Variables and Secrets), then **Retry deployment** |
| Build fails with a TypeScript error | Run `npm run build` locally, fix the error, commit, push |
| Site shows a blank page | Check that the build output directory is `dist` (not `build` or `public`) |
| Photos missing on the live site | File names are case-sensitive online: `Product1.JPG` ≠ `product1.jpg`. Match the path in the JSON exactly |
| A model page shows 404 after reload | Make sure no `404.html` was added to `public/`. Its presence turns off the single-page fallback |
| `git push` is rejected | The GitHub repo wasn't empty. Run `git pull origin main --allow-unrelated-histories`, then `git push` |
| Quote form says "sent" but nobody receives it | Expected until a backend exists and `VITE_QUOTE_ENDPOINT` is set (see README → Quote form) |

---

## Before you announce the site

These still show placeholders on the live site:
- [ ] Phone, email and address (`src/lib/site.ts`)
- [ ] Model codes, prices, sizes and specs (product JSON files)
- [ ] Gelcoat colors confirmed with the client
- [ ] A quote form backend, so requests actually reach Ceñez Trading (until then, consider replacing the form with a phone / Messenger button)
