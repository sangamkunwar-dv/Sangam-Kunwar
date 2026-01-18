# 🚀 ADD ENVIRONMENT VARIABLES NOW - 5 MINUTE SETUP

## **THE FASTEST WAY - Via v0 Sidebar**

### Method 1: Add via v0 (Easiest)

1. Look at **left sidebar** of v0
2. Click **"Vars"** button
3. You'll see a form to add variables
4. Add each variable below one by one

---

## **4 Variables You Must Add**

### Variable 1: Supabase URL

```
Name:  NEXT_PUBLIC_SUPABASE_URL
Value: https://uhunxhnvvadynrfbsowp.supabase.co
```

**Where to find:**
- Open https://supabase.com/dashboard
- Click "Portfolio website" project
- Click Settings (bottom left)
- Click "API" tab
- Copy "Project URL" value

### Variable 2: Supabase Anonymous Key

```
Name:  NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: [Your Supabase Anon Key]
```

**Where to find:**
- Same page as above (Supabase Settings → API)
- Look for "Anon public key"
- Copy the full key

### Variable 3: Resend API Key

```
Name:  RESEND_API_KEY
Value: [Your Resend API Key]
```

**Where to find:**
- Go to https://resend.com
- Sign up if needed
- Click "API Keys" in sidebar
- Click "Create API Key"
- Copy the key

### Variable 4: Resend Email

```
Name:  RESEND_FROM_EMAIL
Value: noreply@example.com
```

**Use any email you want** (used for sending contact emails)

---

## **Step-by-Step Instructions**

### Step 1: Get Supabase Values (2 minutes)

```
1. Open https://supabase.com/dashboard
2. Select "Portfolio website" project
3. Click Settings (bottom left sidebar)
4. Click "API" tab
5. You'll see:
   - Project URL
   - Anon public key
6. Copy both values
```

### Step 2: Get Resend API Key (2 minutes)

```
1. Go to https://resend.com
2. Sign up with email
3. Verify email
4. Click "API Keys" in left sidebar
5. Click "Create API Key"
6. Copy the key shown
```

### Step 3: Add Variables to v0 (1 minute)

```
1. Click "Vars" in v0 left sidebar
2. You'll see form fields
3. Add 4 variables:
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY
   - RESEND_API_KEY
   - RESEND_FROM_EMAIL
4. Click "Save" or "Add"
```

---

## **Alternative: Add via Vercel Dashboard**

If v0 sidebar doesn't work:

```
1. Go to https://vercel.com/dashboard
2. Select your portfolio project
3. Click "Settings"
4. Click "Environment Variables"
5. Click "+ Add"
6. Add variables one by one
7. Click "Save"
8. Redeploy project
```

---

## **COPY-PASTE Template**

Use this template to avoid mistakes:

```
Variable 1:
Name:  NEXT_PUBLIC_SUPABASE_URL
Value: https://uhunxhnvvadynrfbsowp.supabase.co

Variable 2:
Name:  NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: [Copy from Supabase Settings → API → Anon key]

Variable 3:
Name:  RESEND_API_KEY
Value: [Copy from https://resend.com → API Keys]

Variable 4:
Name:  RESEND_FROM_EMAIL
Value: noreply@example.com
```

---

## **Verification: Did It Work?**

After adding variables:

1. ✅ Admin panel should load without errors
2. ✅ Can add/edit/delete projects
3. ✅ Website shows projects
4. ✅ Contact form sends emails

If still getting errors:
- Wait 2-3 minutes for variables to propagate
- Redeploy the project
- Check variable names are EXACT

---

## **Common Mistakes to Avoid**

❌ **DON'T** use `SUPABASE_NEXT_PUBLIC_SUPABASE_URL`
✅ **DO** use `NEXT_PUBLIC_SUPABASE_URL`

❌ **DON'T** add extra spaces or quotes around values
✅ **DO** copy exact value without spaces

❌ **DON'T** forget to add all 4 variables
✅ **DO** add all 4 required variables

---

## **Troubleshooting**

### Error: "Failed to save project"
```
Fix: Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
Then wait 2-3 minutes
Then reload the page
```

### Error: "Connection refused"
```
Fix 1: Check Supabase URL is correct
Fix 2: Make sure you copied full URL with .co at end
Fix 3: Try again after 5 minutes
```

### Error: "Email failed to send"
```
Fix: Add RESEND_API_KEY
Get fresh key from https://resend.com/api-keys
```

---

## **That's It! 🎉**

Once variables are added:
- Admin panel works perfectly ✅
- Data saves to Supabase ✅
- Website shows real data ✅
- Everything syncs ✅

**Total time: 5 minutes**

---

## **Next Steps After Adding Variables**

1. ✅ Go to `/admin`
2. ✅ Add your first project
3. ✅ Go to home page
4. ✅ See project on website
5. ✅ Done! System is ready

---

**IMPORTANT: Add these 4 variables and admin panel will work!**

```
✓ NEXT_PUBLIC_SUPABASE_URL
✓ NEXT_PUBLIC_SUPABASE_ANON_KEY
✓ RESEND_API_KEY
✓ RESEND_FROM_EMAIL
```

**That's it. Just these 4. Everything else works.**
