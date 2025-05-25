# Cookie Manager

A Chrome extension that transfers authentication tokens (SESSION and XSRF-TOKEN) from the staging API to your local development environment.

## What it does

- Copies SESSION and XSRF-TOKEN cookies from `api.staging.getapp.com`
- Creates these cookies in your local environment at `app.local.getapp.com:3000`
- Maintains proper cookie settings (httpOnly, sameSite, etc.) for local development

## Installation

1. Clone this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the directory containing this extension
5. The extension icon should appear in your Chrome toolbar

## Usage

1. Log into the staging environment at `app.staging.getapp.com`
2. Click the extension icon in your Chrome toolbar
3. Click "Copy Cookies to Local"
4. The cookies will be automatically transferred to your local environment
5. Refresh your local environment page to use the new cookies

## TODOs

- [ ] Add extension icons
- [ ] Add error handling for when cookies don't exist
- [ ] Add visual feedback for successful/failed transfers
