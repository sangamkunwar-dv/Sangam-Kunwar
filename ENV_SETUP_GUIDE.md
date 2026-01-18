# Environment Variables Setup Guide

## **CRITICAL: Required Environment Variables**

Your admin panel is failing because environment variables are missing. Follow this guide to fix it.

---

## **Step 1: Get Supabase Variables**

### From Supabase Dashboard:

1. Go to: **https://supabase.com/dashboard**
2. Select project: **Portfolio website**
3. Click **Settings** → **API**
4. Copy these values:

```
NEXT_PUBLIC_SUPABASE_URL          = [URL you see]
NEXT_PUBLIC_SUPABASE_ANON_KEY     = [Anon Key you see]
```

---

## **Step 2: Setup Resend API (for Contact Form)**

### Create Resend Account:

1. Go to: **https://resend.com**
2. Sign up or login
3. Go to **API Keys**
4. Create new API key
5. Copy the key:

```
RESEND_API_KEY = [Your Resend API Key]
```

---

## **Step 3: Add Variables to Vercel Project**

### Option A: Add via v0 Sidebar (Easiest)

1. Click **Vars** in the left sidebar
2. Add each variable:
   - Key: `NEXT_PUBLIC_SUPABASE_URL`
   - Value: Your Supabase URL
   - Repeat for all variables below

### Option B: Add via Vercel Dashboard

1. Go to: **https://vercel.com/dashboard**
2. Select your project
3. Click **Settings** → **Environment Variables**
4. Add all variables below

---

## **Complete List of Variables to Add**

### **Supabase Variables** (REQUIRED)
```
NEXT_PUBLIC_SUPABASE_URL        = https://uhunxhnvvadynrfbsowp.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY   = [Get from Supabase API Settings]
```

### **Resend Variables** (For Email)
```
RESEND_API_KEY                  = [Get from Resend dashboard]
RESEND_FROM_EMAIL               = noreply@yourdomain.com
```

### **Admin Email** (Optional)
```
ADMIN_EMAIL                     = sangamkunwar48@gmail.com
```

---

## **How to Find Supabase Variables**

1. Open Supabase Dashboard
2. Select **Portfolio website** project
3. Click **Settings** (bottom left)
4. Click **API** tab
5. You'll see:
   - **Project URL** → Copy this to `NEXT_PUBLIC_SUPABASE_URL`
   - **Anon public key** → Copy this to `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

## **How to Setup Resend**

1. Visit: https://resend.com
2. Click **Sign Up**
3. Verify email
4. Go to **API Keys** page
5. Click **Create API Key**
6. Copy the key
7. Add to environment variables as `RESEND_API_KEY`

---

## **Verification Checklist**

After adding all variables:

- [ ] `NEXT_PUBLIC_SUPABASE_URL` is set
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` is set
- [ ] `RESEND_API_KEY` is set
- [ ] Variables are deployed to Vercel

---

## **Test Your Setup**

1. Go to Admin Panel: `http://localhost:3000/admin`
2. Try to add a project
3. Click "Save"
4. Should see: ✅ "Project added successfully!"

If you see error, check:
- Variables are in Vercel
- Variable names are EXACT (case sensitive)
- Values don't have extra spaces

---

## **Issues & Solutions**

### Error: "Failed to save project"
- **Cause**: Environment variables missing
- **Fix**: Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Error: "Connection refused"
- **Cause**: Supabase URL is wrong
- **Fix**: Copy exact URL from Supabase dashboard

### Error: "Failed to send email"
- **Cause**: `RESEND_API_KEY` missing or wrong
- **Fix**: Get fresh API key from Resend and add it

---

## **Once Variables Are Set**

Your system will automatically work:

✅ Admin panel saves data to Supabase
✅ Website fetches data from Supabase  
✅ Contact form sends emails via Resend
✅ All changes sync in real-time

---

**Need help? Check the API references in API_REFERENCE.md**
