# Google Sheets + Apps Script Setup Guide

This guide will help you set up Google Sheets integration using Google Apps Script instead of Google Forms. This approach is much more reliable and doesn't have CORS issues.

## Phase 1: Google Sheets Setup

### 1. Create a Google Sheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Click "Blank" to create a new spreadsheet
3. Rename the sheet to something like "Form Submissions"
4. In the first row (headers), add these columns:
   - **Column A:** Name
   - **Column B:** Place  
   - **Column C:** Hobi
   - **Column D:** Timestamp

### 2. Get the Sheet ID
1. Look at the URL of your Google Sheet
2. Copy the Sheet ID (the long string between `/d/` and `/edit`)
   - Example: `https://docs.google.com/spreadsheets/d/[SHEET_ID_HERE]/edit`

## Phase 2: Google Apps Script Setup

### 1. Create Apps Script Project
1. Go to [Google Apps Script](https://script.google.com)
2. Click "New Project"
3. Replace the default `myFunction()` with the code from `google-apps-script.js`
4. Update the `SHEET_ID` variable with your actual Sheet ID
5. Save the project (Ctrl+S or Cmd+S)

### 2. Deploy as Web App
1. Click "Deploy" button (top right)
2. Choose "New deployment"
3. Click the gear icon next to "Type" and select "Web app"
4. Fill in the deployment settings:
   - **Description:** Form Submission Handler
   - **Execute as:** Me (your email)
   - **Who has access:** Anyone, even anonymous
5. Click "Deploy"
6. **Important:** Copy the "Web app URL" - you'll need this for your Next.js app

### 3. Authorize Permissions
1. When you first deploy, Google will ask for permissions
2. Click "Review permissions"
3. Choose your Google account
4. Click "Advanced" if you see a security warning
5. Click "Go to [Your Project Name] (unsafe)"
6. Click "Allow"

## Phase 3: Next.js App Configuration

### 1. Update Environment Variables
Update your `.env.local` file:
```env
GOOGLE_APPS_SCRIPT_URL="YOUR_ACTUAL_WEB_APP_URL_HERE"
```

### 2. Test the Setup
1. Start your Next.js development server: `npm run dev` or `pnpm dev`
2. Fill out the form on your website
3. Check your Google Sheet to see if the data appears

## Phase 4: Testing

### Option 1: Test with Postman
**Direct Apps Script Test:**
- Method: POST
- URL: Your Google Apps Script Web App URL
- Headers: `Content-Type: application/json`
- Body:
```json
{
  "name": "Test User",
  "place": "Test City", 
  "hobi": "Test Hobby"
}
```

**Next.js API Test:**
- Method: POST  
- URL: `http://localhost:3000/api/submit`
- Headers: `Content-Type: application/json`
- Body:
```json
{
  "name": "Test User",
  "place": "Test City",
  "hobi": "Test Hobby"  
}
```

### Option 2: Test with curl
```bash
# Test Apps Script directly
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","place":"Test City","hobi":"Test Hobby"}' \
  YOUR_GOOGLE_APPS_SCRIPT_URL

# Test Next.js API
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","place":"Test City","hobi":"Test Hobby"}' \
  http://localhost:3000/api/submit
```

## Advantages of This Approach

✅ **No CORS issues** - Apps Script handles cross-origin requests properly
✅ **Direct to Google Sheets** - Data goes straight to your spreadsheet
✅ **Better error handling** - Proper JSON responses with success/error status
✅ **More reliable** - No complex form parsing or hidden fields
✅ **Real-time data** - See submissions immediately in Google Sheets
✅ **Easy to modify** - Add new fields by updating both the Apps Script and your form

## Troubleshooting

**If data isn't appearing in the sheet:**
1. Check that the Sheet ID is correct
2. Verify the sheet name is "Sheet1" (or update the script)
3. Make sure the headers match exactly: Name, Place, Hobi, Timestamp
4. Check the Apps Script execution transcript for errors

**If you get permission errors:**
1. Redeploy the Apps Script as a new deployment
2. Make sure "Who has access" is set to "Anyone, even anonymous"
3. Re-authorize permissions if needed

**If the form submission fails:**
1. Check the browser console for error messages
2. Verify the `GOOGLE_APPS_SCRIPT_URL` in `.env.local` is correct
3. Test the Apps Script URL directly with Postman first

## Security Notes

- The Apps Script is set to "Anyone, even anonymous" for simplicity
- For production, consider adding API key authentication
- Google Sheets will log who makes changes (your Google account)
- The data is stored in your personal Google Drive
