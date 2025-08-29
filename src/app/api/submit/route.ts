import type { NextRequest } from 'next/server';
import { googleFormSchema } from '@/lib/validations/google-form';

import { NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const validatedData = googleFormSchema.parse(body);

    // Get Google Apps Script URL from environment
    // eslint-disable-next-line node/prefer-global/process
    const appsScriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;

    // Validate environment variables
    if (!appsScriptUrl) {
      console.error('Missing required environment variable: GOOGLE_APPS_SCRIPT_URL');

      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 },
      );
    }

    console.warn('Submitting to Google Apps Script:', appsScriptUrl);
    console.warn('Form data:', validatedData);

    // Submit to Google Apps Script
    const response = await fetch(appsScriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'NextJS-Form-Submitter/1.0',
      },
      body: JSON.stringify({
        name: validatedData.name,
        place: validatedData.place,
        hobi: validatedData.hobi,
      }),
    });

    console.warn('Google Apps Script response status:', response.status);

    if (response.ok) {
      const responseData = await response.json().catch(() => ({ success: true }));

      if (responseData.success) {
        console.warn('Form submitted successfully to Google Sheets');

        return NextResponse.json({
          success: true,
          message: 'Form submitted successfully',
          timestamp: responseData.timestamp,
        });
      } else {
        console.error('Google Apps Script returned error:', responseData.error);

        return NextResponse.json(
          { error: responseData.error || 'Failed to submit form' },
          { status: 500 },
        );
      }
    } else {
      const errorText = await response.text().catch(() => 'Unknown error');
      console.error('Google Apps Script submission failed:', {
        status: response.status,
        statusText: response.statusText,
        errorText,
      });

      return NextResponse.json(
        { error: 'Failed to submit form to Google Sheets' },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error('API route error:', error);

    // Handle validation errors
    if (error && typeof error === 'object' && 'issues' in error) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 },
      );
    }

    // Handle other errors
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
