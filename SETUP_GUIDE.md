# Complete Website Setup Guide

## Prerequisites Installation

### 1. Install Xcode Command Line Tools
```bash
xcode-select --install
```
Click "Install" when the dialog appears and wait for completion.

### 2. Install Node.js
**Option A: Using Homebrew (Recommended)**
```bash
# Install Homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Add Homebrew to PATH (follow the instructions shown after installation)
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"

# Install Node.js
brew install node
```

**Option B: Direct Download**
1. Go to https://nodejs.org/
2. Download the LTS version for macOS
3. Run the installer

### 3. Verify Installation
```bash
node --version
npm --version
```

## Project Setup

### 1. Install Dependencies
```bash
cd "/Users/dharanshudharanshu/Desktop/Website "
npm install
```

### 2. Configure Environment Variables

Your `.env.local` file has been prepared with placeholders. You need to update these values:

#### Gmail Setup (for contact form emails):
1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
3. Update `.env.local`:
   ```
   GMAIL_USER=your-actual-email@gmail.com
   GMAIL_APP_PASSWORD=your-16-character-app-password
   ```

#### EmailJS Setup (Alternative email service):
1. Go to https://www.emailjs.com/
2. Create a free account
3. Set up an email service
4. Create an email template
5. Update `.env.local` with your actual IDs

### 3. Start Development Server
```bash
npm run dev
```

Your website will be available at http://localhost:3000

## Features Overview

Your website includes:

✅ **Homepage** - Marketing landing page with testimonials and FAQ
✅ **About Page** - Company information
✅ **Services Page** - Service offerings
✅ **Contact Page** - Contact form with email notifications
✅ **Pricing Page** - Pricing plans with Stripe integration
✅ **Contact Form** - Professional contact form with database storage
✅ **Database Integration** - Supabase backend
✅ **Payment Processing** - Stripe checkout
✅ **Email Notifications** - Contact form submissions

## Testing Checklist

After setup, test these features:

- [ ] Homepage loads correctly
- [ ] Navigation works between pages
- [ ] Contact form submits successfully
- [ ] Email notifications are received
- [ ] Pricing page displays correctly
- [ ] Stripe checkout process works
- [ ] Contact form submissions are stored in database
- [ ] Images display properly

## Troubleshooting

### Common Issues:

1. **"Module not found" errors**: Run `npm install` again
2. **Port 3000 in use**: Use `npm run dev -- -p 3001`
3. **Email not sending**: Check Gmail app password setup
4. **Stripe errors**: Verify test keys in `.env.local`
5. **Database errors**: Check Supabase connection

### Getting Help:

- Check the browser console for error messages
- Review the terminal output for detailed error information
- Ensure all environment variables are properly set

## Next Steps

1. Replace placeholder content with your actual business information
2. Add your real Stripe product IDs for live payments
3. Set up your domain and deploy to production
4. Configure email templates for your branding

## File Structure

```
/Users/dharanshudharanshu/Desktop/Website /
├── pages/           # Next.js pages
├── components/      # React components
├── lib/            # Utility libraries
├── public/         # Static assets
├── styles/         # CSS files
├── .env.local      # Environment variables
└── package.json    # Dependencies
```

Your website is a professional tutoring business site with all modern features ready to go!
