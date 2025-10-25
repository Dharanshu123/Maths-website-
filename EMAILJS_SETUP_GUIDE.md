# 📧 EmailJS Setup Guide - Step by Step

## 🎯 **What is EmailJS?**
EmailJS allows you to send emails directly from your website without a backend server. It's free, easy to set up, and perfect for contact forms!

## 🚀 **Step-by-Step Setup**

### **Step 1: Create EmailJS Account**
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

### **Step 2: Add Email Service**
1. In your EmailJS dashboard, go to **"Email Services"**
2. Click **"Add New Service"**
3. Choose your email provider:
   - **Gmail** (recommended)
   - **Outlook/Hotmail**
   - **Yahoo**
   - **Custom SMTP**

4. **For Gmail:**
   - Click "Gmail"
   - Click "Connect Account"
   - Sign in with your Gmail account
   - Allow EmailJS permissions
   - Give your service a name (e.g., "Contact Form Gmail")
   - Copy the **Service ID** (looks like `service_abc123`)

### **Step 3: Create Email Template**
1. Go to **"Email Templates"**
2. Click **"Create New Template"**
3. **Template Settings:**
   - Template Name: `Contact Form Notification`
   - From Name: `{{from_name}}`
   - From Email: `{{from_email}}`
   - To Email: `your-email@gmail.com` (your actual email)
   - Reply To: `{{reply_to}}`

4. **Subject:** `New Contact Form Submission from {{from_name}}`

5. **Content (HTML):**
```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
    🎉 New Contact Form Submission
  </h2>
  
  <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
    <h3 style="color: #495057; margin-top: 0;">Contact Details:</h3>
    <p><strong>Name:</strong> {{from_name}}</p>
    <p><strong>Email:</strong> {{from_email}}</p>
    <p><strong>Phone:</strong> {{phone}}</p>
  </div>
  
  <div style="background: #fff; border: 1px solid #dee2e6; padding: 20px; border-radius: 8px;">
    <h3 style="color: #495057; margin-top: 0;">Message:</h3>
    <p style="line-height: 1.6; color: #6c757d;">{{message}}</p>
  </div>
  
  <div style="margin-top: 20px; padding: 15px; background: #e7f3ff; border-radius: 6px;">
    <p style="margin: 0; font-size: 14px; color: #0056b3;">
      📅 Submitted: {{submitted_at}}<br>
      💻 From: Your Website Contact Form
    </p>
  </div>
  
  <div style="margin-top: 20px; text-align: center;">
    <a href="mailto:{{from_email}}?subject=Re: Your inquiry" 
       style="background: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
      Reply to {{from_name}}
    </a>
  </div>
</div>
```

6. Click **"Save"** and copy the **Template ID** (looks like `template_xyz789`)

### **Step 4: Get Your Public Key**
1. Go to **"Account"** → **"General"**
2. Find **"Public Key"** 
3. Copy it (looks like `abc123XYZ`)

### **Step 5: Update Your Website**
1. **Open** `components/ContactForm.tsx`
2. **Replace these values** in the `EMAILJS_CONFIG`:

```typescript
const EMAILJS_CONFIG = {
  serviceId: 'service_abc123', // Your Service ID from Step 2
  templateId: 'template_xyz789', // Your Template ID from Step 3  
  publicKey: 'abc123XYZ' // Your Public Key from Step 4
}
```

3. **Update your email** on line 22:
```typescript
to_email: 'your-actual-email@gmail.com', // Replace with your real email
```

### **Step 6: Test Your Setup**
1. **Save all files**
2. **Go to** http://localhost:3001/contact
3. **Fill out the form** and submit
4. **Check your email** - you should receive a notification!
5. **Check browser console** for success/error messages

## ✅ **Verification Checklist**

- [ ] EmailJS account created
- [ ] Gmail service connected
- [ ] Email template created with proper variables
- [ ] Service ID, Template ID, and Public Key copied
- [ ] ContactForm.tsx updated with your credentials
- [ ] Your email address updated in the template and code
- [ ] Form tested and email received

## 🎨 **Email Template Variables**

Your template can use these variables:
- `{{from_name}}` - Contact's name
- `{{from_email}}` - Contact's email
- `{{phone}}` - Contact's phone
- `{{message}}` - Contact's message
- `{{reply_to}}` - Contact's email (for replies)
- `{{submitted_at}}` - Submission timestamp

## 🔧 **Troubleshooting**

### **No emails received?**
- Check spam/junk folder
- Verify Service ID, Template ID, and Public Key
- Make sure Gmail service is properly connected
- Check browser console for errors

### **EmailJS errors in console?**
- Double-check your credentials
- Ensure template variables match exactly
- Try sending a test email from EmailJS dashboard

### **Form submits but no email?**
- Check if Supabase is working (form should save to database)
- Look for EmailJS errors in browser console
- Verify your email template is published

## 🎉 **Success!**

Once set up, you'll receive beautiful email notifications like this:

```
Subject: New Contact Form Submission from John Doe

🎉 New Contact Form Submission

Contact Details:
Name: John Doe
Email: john@example.com  
Phone: +1-555-0123

Message:
I'm interested in your web development services. 
Could you please send me more information?

📅 Submitted: 10/8/2025, 2:30:15 PM
💻 From: Your Website Contact Form

[Reply to John Doe] (button)
```

## 💡 **Pro Tips**

1. **Free Plan Limits:** 200 emails/month (upgrade for more)
2. **Multiple Templates:** Create different templates for different forms
3. **Auto-Reply:** Set up auto-reply templates for customers
4. **Analytics:** Track email delivery in EmailJS dashboard
5. **Custom Domain:** Use your own domain for professional emails

**Your contact form is now ready to send you email notifications! 🚀**


