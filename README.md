# Cortex Cookie Manager

A Chrome extension that streamlines local development workflow by automatically copying authentication cookies (SESSION and XSRF-TOKEN) from the Cortex staging API environment to the local development server.

## What it does

- Copies SESSION and XSRF-TOKEN cookies from `api.staging.getcortexapp.com`
- Creates these cookies in your local environment at `app.local.getcortexapp.com:3000`
- Maintains proper cookie settings (httpOnly, sameSite, etc.) for local development
- Provides visual feedback with status messages and Chrome notifications
- Handles cookie removal and replacement automatically

## Installation

1. Clone this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the directory containing this extension
5. The extension icon should appear in your Chrome toolbar

## Usage

1. Log into the staging environment at `app.staging.getcortexapp.com`
2. Click the extension icon in your Chrome toolbar
3. Click "Copy Cookies to Local"
4. The cookies will be automatically transferred to your local environment
5. Refresh your local environment page to use the new cookies

## Features

- **One-click operation**: Simple button to copy cookies
- **Visual feedback**: Shows success/error messages in the popup
- **Chrome notifications**: Desktop notifications confirm successful transfers
- **Error handling**: Graceful handling of missing cookies or transfer failures
- **Secure transfer**: Properly adjusts security settings between HTTPS (staging) and HTTP (local)

## Technical Details

- Uses Chrome Extension Manifest V3
- Leverages Chrome's cookies API for secure cookie management
- Automatically adjusts cookie security settings for local development
- Preserves httpOnly flag for SESSION cookie security
- Makes XSRF-TOKEN accessible to JavaScript for CSRF protection

## TODOs

- [ ] Add extension icons (16x16, 48x48, 128x128)
- [ ] Add support for additional environments (production, QA)
- [ ] Add option to select which cookies to copy
- [ ] Add cookie expiration time preservation
- [ ] Add keyboard shortcuts for quick access
