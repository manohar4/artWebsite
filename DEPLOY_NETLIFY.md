# Deploy to Netlify

## 1. Push your code to GitHub

If you haven’t already:

```bash
git add .
git commit -m "Add Netlify config"
git push origin main
```

## 2. Connect the repo in Netlify

1. Go to [Netlify](https://www.netlify.com/) and sign in.
2. Click **Add new site** → **Import an existing project**.
3. Choose **GitHub** (or GitLab/Bitbucket) and authorize Netlify.
4. Select the **artWebsite** repository.
5. Netlify will detect **Next.js** and use:
   - **Build command:** `npm run build`
   - **Publish directory:** (set automatically by Next.js)
6. **Set the site name so your URL is `saivindhya.netlify.app`:**
   - In the **Site name** field, enter: **`saivindhya`**
   - Your live URL will be **https://saivindhya.netlify.app**
7. Click **Deploy site** (or **Configure** first to add env vars).

**If the site is already created:** Go to **Site settings** → **Domain management** → **Netlify subdomain** → **Options** → **Edit site name** → change to **`saivindhya`** → Save. Your URL will be **https://saivindhya.netlify.app**.

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
