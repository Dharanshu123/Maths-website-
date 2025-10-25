# 📧 Email Setup Guide for Contact Form

## 🎯 Choose Your Email Method:

### **Method 1: Gmail + Nodemailer (Recommended)**

1. **Add to your `.env.local` file**:
```env
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-gmail-app-password
```

2. **Set up Gmail App Password**:
   - Go to your Google Account settings
   - Security → 2-Step Verification (enable if not already)
   - App passwords → Generate new app password
   - Use this password in `GMAIL_APP_PASSWORD`

3. **Update ContactForm.tsx**:
   - Replace `'your-email@example.com'` with your actual email
   - The system is already set up!

### **Method 2: EmailJS (Easier Setup)**

1. **Install EmailJS**:
```bash
npm install @emailjs/browser
```

2. **Set up EmailJS**:
   - Go to https://www.emailjs.com/
   - Create free account
   - Add email service (Gmail/Outlook)
   - Create email template
   - Get service ID, template ID, public key

3. **Update `lib/emailjs-setup.ts`** with your credentials

### **Method 3: Simple Email Redirect (Instant)**

Update your contact form to use `mailto:` links:

```typescript
// In ContactForm.tsx, replace the submit function with:
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  
  // Save to database
  await supabase.from('contacts').insert([formData])
  
  // Open email client
  const subject = `Contact Form: ${formData.name}`
  const body = `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nMessage: ${formData.message}`
  const mailtoLink = `mailto:your-email@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  
  window.open(mailtoLink)
  setSuccess(true)
}
```

## 🚀 Quick Test

1. **Update your email** in `ContactForm.tsx` (line 16)
2. **Choose your method** and follow the setup
3. **Test the form** at http://localhost:3001/contact
4. **Check your email** for notifications!

## 📧 What You'll Receive

When someone submits your contact form, you'll get an email like:

```
Subject: New Contact Form Submission from John Doe

New contact form submission:

Name: John Doe
Email: john@example.com
Phone: +1-555-0123
Message: I'm interested in your web development services...

Submitted at: 10/8/2025, 2:30:15 PM
```

## 🔧 Troubleshooting

- **Gmail not working?** Make sure 2FA is enabled and you're using an app password
- **EmailJS not working?** Check your service ID, template ID, and public key
- **Emails going to spam?** Add your domain to Gmail's trusted senders

Choose the method that works best for you!


