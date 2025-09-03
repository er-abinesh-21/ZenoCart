# Supabase Keep-Alive Setup Guide

## Overview
Supabase free tier projects pause after 7 days of inactivity. This GitHub Actions workflow automatically pings your database every 5 days to prevent pausing.

## Setup Instructions

### 1. Add GitHub Secrets
Go to your GitHub repository → Settings → Secrets and variables → Actions

Add these two secrets:
- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous/public key

You can find these values in your Supabase dashboard:
1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Navigate to Settings → API
4. Copy the Project URL and anon/public key

### 2. Enable GitHub Actions
1. Go to your repository's Actions tab
2. If Actions are disabled, click "Enable Actions"

### 3. Choose a Workflow
Two workflow files are available:

#### Option A: `supabase-stayawake.yml` (Recommended)
- Uses official Supabase JavaScript client
- More reliable and feature-rich
- Tests both database and auth services
- Provides detailed logging

#### Option B: `supabase-keepalive.yml` 
- Lightweight, uses native Node.js
- No dependencies required
- Simple HTTP request approach

### 4. Test the Workflow
1. Go to Actions tab in your repository
2. Select "Supabase Stay Awake" workflow
3. Click "Run workflow" → "Run workflow"
4. Check the logs to ensure it runs successfully

## Workflow Schedule
- **Automatic**: Runs every 5 days at midnight UTC
- **Manual**: Can be triggered anytime from Actions tab

## Monitoring
- Check Actions tab for workflow run history
- Each run creates a summary with status and timestamp
- Failed runs will show in the Actions tab with error details

## Customization

### Change Schedule Frequency
Edit the cron expression in the workflow file:
```yaml
schedule:
  - cron: '0 */5 * * *'  # Every 5 hours
  # Examples:
  # - cron: '0 */3 * *'  # Every 3 hours
  # - cron: '0 */7 * *' # Every 7 hours
```

### Add More Tables to Query
Modify the Node.js script to query additional tables:
```javascript
// Query multiple tables
const tables = ['products', 'profiles', 'orders'];
for (const table of tables) {
  const { data, error } = await supabase
    .from(table)
    .select('id')
    .limit(1);
  console.log(`✅ Pinged ${table} table`);
}
```

## Troubleshooting

### Workflow Fails with "Missing Supabase credentials"
- Ensure GitHub Secrets are properly set
- Secret names must match exactly: `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`

### Workflow Fails with Query Error
- Check if the `products` table exists in your database
- Verify Row Level Security (RLS) policies allow read access
- Ensure the anon key has proper permissions

### Workflow Not Running Automatically
- Check if Actions are enabled for the repository
- Verify the workflow file is in `.github/workflows/` directory
- Ensure the workflow file has valid YAML syntax

## Cost Considerations
- GitHub Actions free tier: 2,000 minutes/month for private repos
- This workflow uses ~1 minute per run
- Running every 5 days = ~6 runs/month = ~6 minutes/month
- Well within free tier limits

## Alternative Solutions
If you prefer not to use GitHub Actions:
1. **Uptime monitoring services** (e.g., UptimeRobot) - ping your app URL
2. **Cron job services** (e.g., cron-job.org) - schedule HTTP requests
3. **Upgrade to Supabase Pro** - no pausing, better performance
