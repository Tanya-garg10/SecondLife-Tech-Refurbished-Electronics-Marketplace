# 🚀 Installation & Setup Guide

## Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager
- Git

## Step 1: Install Dependencies

First, you need to install all the required packages:

```bash
npm install
```

Or if you prefer yarn:
```bash
yarn install
```

This will install all dependencies listed in `package.json` including:
- React & React Router
- Supabase client
- Shadcn UI components
- Lucide icons
- Sonner for notifications
- And many more...

## Step 2: Environment Setup

Make sure your `.env` file has the correct values:

```env
VITE_SUPABASE_PROJECT_ID="azhokujqobnkgdkxcrnu"
VITE_SUPABASE_PUBLISHABLE_KEY="your_publishable_key_here"
VITE_SUPABASE_URL="https://azhokujqobnkgdkxcrnu.supabase.co"
```

## Step 3: Supabase Backend Setup

### Install Supabase CLI
```bash
npm install -g supabase
```

### Login to Supabase
```bash
supabase login
```

### Link Your Project
```bash
supabase link --project-ref azhokujqobnkgdkxcrnu
```

### Deploy Edge Functions
```bash
# Deploy the chat function
supabase functions deploy chat

# Deploy the trade-in evaluation function
supabase functions deploy evaluate-trade-in
```

### Set Secrets
```bash
# Set the LOVABLE_API_KEY for AI chat
supabase secrets set LOVABLE_API_KEY=your_lovable_api_key_here
```

## Step 4: Run the Development Server

```bash
npm run dev
```

The app should now be running at `http://localhost:5173`

## Step 5: Test the AI Chatbot

1. Open the app in your browser
2. Look for the chat icon in the bottom-right corner
3. Click it to open the chat
4. Try these test questions:
   - "How do you ensure product quality?"
   - "What is your return policy?"
   - "How does shipping work?"
   - "Tell me about the trade-in program"

## Troubleshooting

### Issue: Dependencies not installing
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Issue: Supabase CLI not working
```bash
# Update Supabase CLI
npm update -g supabase

# Check version
supabase --version
```

### Issue: Edge function deployment fails
```bash
# Check if you're logged in
supabase status

# Check function logs
supabase functions logs chat
```

### Issue: Chat not working
1. Check browser console for errors
2. Verify environment variables are set
3. Check Supabase function logs:
   ```bash
   supabase functions logs chat --tail
   ```
4. Test the function directly:
   ```bash
   curl -X POST https://azhokujqobnkgdkxcrnu.supabase.co/functions/v1/chat \
     -H "Authorization: Bearer YOUR_ANON_KEY" \
     -H "Content-Type: application/json" \
     -d '{"messages":[{"role":"user","content":"Hello"}]}'
   ```

## Build for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
secondlife-marketplace/
├── src/
│   ├── components/
│   │   ├── chat/
│   │   │   ├── AIChatBot.tsx       # Main chatbot component
│   │   │   └── README.md           # Chatbot documentation
│   │   ├── layout/
│   │   │   └── Layout.tsx          # Main layout with chatbot
│   │   ├── products/
│   │   └── ui/                     # Shadcn UI components
│   ├── pages/                      # Route pages
│   ├── integrations/
│   │   └── supabase/              # Supabase client
│   └── main.tsx                    # App entry point
├── supabase/
│   └── functions/
│       ├── chat/                   # AI chat edge function
│       └── evaluate-trade-in/      # Trade-in evaluation
├── .env                            # Environment variables
├── package.json                    # Dependencies
└── vite.config.ts                 # Vite configuration
```

## Next Steps

After installation:
1. ✅ Test the AI chatbot functionality
2. ✅ Explore the product pages
3. ✅ Try the trade-in feature
4. ✅ Check the dashboard
5. ✅ Test cart and wishlist features

## Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Vite Documentation](https://vitejs.dev/)
- [React Router Documentation](https://reactrouter.com/)
- [Shadcn UI Documentation](https://ui.shadcn.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)

## Support

If you encounter any issues:
1. Check the console for error messages
2. Review the troubleshooting section above
3. Check Supabase function logs
4. Verify all environment variables are set correctly

## Summary

Your SecondLife Tech marketplace is now set up with:
- ✅ Modern React + TypeScript frontend
- ✅ Supabase backend with edge functions
- ✅ AI-powered chatbot
- ✅ Product marketplace features
- ✅ Trade-in evaluation system
- ✅ Responsive design with Tailwind CSS
- ✅ Beautiful UI with Shadcn components

Happy coding! 🎉
