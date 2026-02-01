# Airtable Integration Setup Guide

This guide connects your Airtable base to the art portfolio website.

**Your base:** From your workspace link, the **Base ID** is: `appgWZ40m0scdGJxW`  
Use this in `.env.local` as `AIRTABLE_BASE_ID=appgWZ40m0scdGJxW`.

## Prerequisites

1. An Airtable account
2. An Airtable base with your artwork data
3. Access to create API tokens or Personal Access Tokens

## Step 1: Get Your Airtable Credentials

### Option A: Using Personal Access Token (Recommended)

1. Go to [Airtable Account Settings](https://airtable.com/account)
2. Navigate to **Developer options** → **Personal access tokens**
3. Click **Create new token**
4. Give it a name (e.g., "Art Portfolio Website")
5. Grant the following scopes:
   - `data.records:read` (to read records)
6. Copy the generated token

### Option B: Using API Key (Legacy)

1. Go to [Airtable Account Settings](https://airtable.com/account)
2. Navigate to **Developer options** → **API**
3. Copy your **API key**

## Step 2: Get Your Base ID

From your [workspace link](https://airtable.com/appgWZ40m0scdGJxW/tblvLUvOaAh4liHTM/viw17v390pSqp8Jt7?blocks=hide), the **Base ID** is: `appgWZ40m0scdGJxW`. Use this in `.env.local`.

Or manually: open your base → URL or [Airtable API](https://airtable.com/api) → copy the Base ID (format: `appXXXXXXXXXXXXXX`).

## Step 3: Prepare Your Airtable Table

Your Airtable table should have the following fields (or you can customize field names):

### Required Fields:
- **Title** (Single line text)
- **Category** (Single select or Single line text)
- **Medium** (Single line text)
- **Year** (Number or Single line text)
- **Description** (Long text)
- **Image** (Attachment field - for artwork images)
- **Likes** (Number)
- **Views** (Number)
- **Available** (Checkbox or Single select: Yes/No)

### Optional Fields:
- **Dimensions** (Single line text)
- **Price** (Number)
- **Tags** (Multiple select or Single line text - comma separated)

## Step 4: Configure Environment Variables

1. Create a `.env.local` file in the root of your project (if it doesn't exist)

2. Add the following variables:

```env
# Option 1: Using Personal Access Token (Recommended)
AIRTABLE_PERSONAL_ACCESS_TOKEN=your_personal_access_token_here
AIRTABLE_BASE_ID=your_base_id_here

# OR Option 2: Using API Key (Legacy)
# AIRTABLE_API_KEY=your_api_key_here
# AIRTABLE_BASE_ID=your_base_id_here

# Airtable Table Name
AIRTABLE_TABLE_NAME=Artworks
```

3. If your Airtable field names are different, you can customize them:

```env
# Custom Field Mappings (optional)
AIRTABLE_FIELD_TITLE=Title
AIRTABLE_FIELD_CATEGORY=Category
AIRTABLE_FIELD_MEDIUM=Medium
AIRTABLE_FIELD_YEAR=Year
AIRTABLE_FIELD_DESCRIPTION=Description
AIRTABLE_FIELD_IMAGE=Image
AIRTABLE_FIELD_LIKES=Likes
AIRTABLE_FIELD_VIEWS=Views
AIRTABLE_FIELD_DIMENSIONS=Dimensions
AIRTABLE_FIELD_PRICE=Price
AIRTABLE_FIELD_AVAILABLE=Available
AIRTABLE_FIELD_TAGS=Tags
```

## Step 5: Test the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Visit `http://localhost:3000`

3. Check the browser console for any errors

4. If you see "Loading artworks..." but no data appears, check:
   - Your `.env.local` file has correct credentials
   - Your Airtable base ID is correct
   - Your table name matches `AIRTABLE_TABLE_NAME`
   - Your field names match the defaults or your custom mappings

## Troubleshooting

### Error: "AIRTABLE_BASE_ID is not set"
- Make sure your `.env.local` file exists and contains `AIRTABLE_BASE_ID`

### Error: "Failed to fetch artworks"
- Check that your Personal Access Token or API Key is correct
- Verify your Base ID is correct
- Ensure your table name matches `AIRTABLE_TABLE_NAME`

### No artworks showing
- Check that your Airtable table has records
- Verify field names match your configuration
- Check browser console for specific error messages

### Images not loading
- Ensure the Image field in Airtable is an Attachment field
- Make sure you've uploaded images to the attachment field
- Check that the attachment URLs are accessible

## API Endpoints

The integration creates the following API endpoint:

- `GET /api/artworks` - Fetch all artworks
- `GET /api/artworks?featured=true&limit=6` - Fetch featured artworks
- `GET /api/artworks?category=Paintings` - Fetch artworks by category
- `GET /api/artworks?query=landscape` - Search artworks

## Field Type Recommendations

- **Title, Category, Medium, Year**: Single line text or Single select
- **Description**: Long text
- **Image**: Attachment field (supports multiple images, first one is used)
- **Likes, Views, Price**: Number
- **Available**: Checkbox (true/false) or Single select (Yes/No)
- **Tags**: Multiple select or Single line text (comma-separated)
- **Dimensions**: Single line text

## Security Notes

- Never commit your `.env.local` file to git (it's already in `.gitignore`)
- Keep your Personal Access Token or API Key secure
- Use Personal Access Tokens with minimal required scopes
- For production, set environment variables in your hosting platform (Vercel, Netlify, etc.)

