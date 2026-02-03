# Deploy to Netlify

## ⚠️ "AIRTABLE_BASE_ID is not set" on Netlify?

Your `.env.local` file is **not** deployed (it’s in `.gitignore`). You must set the same variables **in Netlify**:

1. In Netlify: open your site → **Site configuration** (or **Site settings**) → **Environment variables**.
2. Click **Add a variable** → **Add single variable** (or **Import from .env** to paste from `.env.local`).
3. Add these (use the same values as in your `.env.local`):

| Variable | Example / description |
|----------|------------------------|
| `AIRTABLE_BASE_ID` | `appgWZ40m0scdGJxW` |
| `AIRTABLE_PERSONAL_ACCESS_TOKEN` | Your Airtable Personal Access Token |
| `AIRTABLE_TABLE_NAME` | `ArtDatabase` (or your table name) |

4. Save, then go to **Deploys** → **Trigger deploy** → **Deploy site** so the new variables are used.

---

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

**Important:** `.env.local` is only used on your machine. Netlify does not see it. You must add these in the Netlify UI.

1. In Netlify: **Site configuration** (or **Site settings**) → **Environment variables** → **Add a variable** (or **Import from .env** to paste from `.env.local`).
2. Add:

| Key | Value |
|-----|--------|
| `AIRTABLE_BASE_ID` | Your Airtable base ID (e.g. `appgWZ40m0scdGJxW`) |
| `AIRTABLE_PERSONAL_ACCESS_TOKEN` | Your Airtable Personal Access Token |
| `AIRTABLE_TABLE_NAME` | Your table name (e.g. `ArtDatabase`) |

3. **Save**, then go to **Deploys** → **Trigger deploy** → **Deploy site** so the new env vars are used in the next build.

## 4. Optional: custom domain

In **Site settings** → **Domain management** you can add a custom domain and HTTPS.

---

**Note:** The first deploy may take a few minutes. If the build fails, check the build log in Netlify; often it’s a missing env var or Node version (this project uses Node 18).
