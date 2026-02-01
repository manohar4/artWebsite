# Deploy to Netlify

## Link GitHub to Netlify (connect your repo)

1. Open **[Netlify](https://app.netlify.com/)** and sign in (or create an account).
2. Click **Add new site** → **Import an existing project**.
3. Click **Deploy with GitHub** (or **Connect to Git provider** → **GitHub**).
4. If asked, authorize Netlify to access your GitHub account and allow access to **manohar4** (or the org that has the repo).
5. In **Pick a repository**, find and select **manohar4/artWebsite** (or **artWebsite**).
6. Netlify will detect **Next.js** and fill:
   - **Build command:** `npm run build`
   - **Publish directory:** (leave as set by Netlify)
7. **Site name:** type **`saivindhya`** so your URL is **https://saivindhya.netlify.app**.
8. Click **Deploy site** (or **Configure** first to add env vars, then deploy).

Netlify will clone your repo, run `npm run build`, and deploy. The first deploy may take a few minutes.

**If the site already exists:** **Site settings** → **Domain management** → **Netlify subdomain** → **Options** → **Edit site name** → set to **`saivindhya`** → Save.

## 3. Add environment variables (required for Airtable)

Before or after the first deploy:

1. In Netlify: **Site settings** → **Environment variables** → **Add a variable** (or **Import from .env**).
2. Add:

| Key | Value |
|-----|--------|
| `AIRTABLE_BASE_ID` | Your Airtable base ID (e.g. `appgWZ40m0scdGJxW`) |
| `AIRTABLE_PERSONAL_ACCESS_TOKEN` | Your Airtable Personal Access Token |
| `AIRTABLE_TABLE_NAME` | Your table name (e.g. `ArtDatabase`) |

3. **Save** and trigger a **new deploy** (Deploys → Trigger deploy → Deploy site) so the new env vars are used.

## 4. Optional: custom domain

In **Site settings** → **Domain management** you can add a custom domain and HTTPS.

---

**Note:** The first deploy may take a few minutes. If the build fails, check the build log in Netlify; often it’s a missing env var or Node version (this project uses Node 18).
