# SecondLife Tech — Refurbished Electronics Marketplace

A modern, full-stack marketplace for buying and selling refurbished electronics with AI-powered features.

## 🌟 Recent Updates

### ✨ AI Chatbot - Now Live!
We've completely revamped the AI chatbot with:
- 🤖 Real-time streaming responses
- ⚡ Quick action buttons for common questions
- 🎨 Modern, polished UI with smooth animations
- 🔄 Chat reset functionality
- 📱 Mobile-optimized design
- ♿ Full accessibility support

**Try it now**: Click the chat icon (💬) in the bottom-right corner!

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Visit `http://localhost:5173` and click the chat icon to test the AI assistant!

📖 **Need help?** Check out:
- [Quick Start Guide](QUICK_START.md) - Get running in 3 steps
- [Installation Guide](INSTALLATION_GUIDE.md) - Detailed setup instructions
- [Chatbot Setup](CHATBOT_SETUP.md) - AI chatbot configuration
- [Improvements Summary](IMPROVEMENTS_SUMMARY.md) - What's new

## 📋 Project Description

SecondLife Tech is a full-stack marketplace for buying and selling refurbished electronics like laptops, phones, and gadgets. It includes AI-powered quality verification, price comparison, delivery tracking, and an intelligent chatbot to ensure a safe and seamless experience for both buyers and sellers.

## ✨ Features

### 🛍️ Marketplace
- Browse refurbished electronics by category (Phones, Laptops, Accessories)
- Compare prices across sellers
- Detailed product information with images, specs, and stock levels
- Add products to cart and wishlist
- AI-powered quality scoring (1-100 scale)

### 💬 AI Chatbot (NEW!)
- 24/7 automated customer support
- Real-time streaming responses
- Quick action buttons for common questions
- Comprehensive knowledge about:
  - Product quality and certification
  - Shipping and delivery
  - Returns and warranty
  - Trade-in program
  - Seller support

### 📦 Ordering & Delivery
- Secure online payments
- Real-time order and delivery tracking
- Notifications via email/SMS
- Multiple shipping options

### ⭐ Reviews & Ratings
- Rate products and sellers
- Write and read reviews
- AI-assisted review summary
- Fraud detection for fake reviews

### 📊 Seller Dashboard
- Add, update, or remove products
- Track orders and shipments
- Analytics for sales trends
- Performance metrics

### 🤖 AI Features
- **AI Chatbot**: Intelligent customer support assistant
- **Quality Checker**: Refurbished product verification
- **Price Predictor**: Resale price estimation
- **Trade-In Evaluator**: Device valuation system
- **Fraud Detection**: Suspicious listing detection

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS + Shadcn UI
- **Routing**: React Router v6
- **State Management**: Zustand
- **Icons**: Lucide React
- **Notifications**: Sonner

### Backend
- **Platform**: Supabase
- **Edge Functions**: Deno
- **Database**: PostgreSQL (via Supabase)
- **Authentication**: Supabase Auth
- **Real-time**: Supabase Realtime

### AI & APIs
- **AI Gateway**: Lovable AI (Gemini 2.5 Flash)
- **Streaming**: Server-Sent Events (SSE)

## 📁 Project Structure

```
secondlife-marketplace/
├── src/
│   ├── components/
│   │   ├── chat/              # AI Chatbot component
│   │   ├── layout/            # Layout components (Navbar, Footer)
│   │   ├── products/          # Product components
│   │   └── ui/                # Shadcn UI components
│   ├── pages/                 # Route pages
│   │   ├── Index.tsx          # Home page
│   │   ├── Products.tsx       # Product listing
│   │   ├── ProductDetail.tsx  # Product details
│   │   ├── Cart.tsx           # Shopping cart
│   │   ├── Wishlist.tsx       # Wishlist
│   │   ├── Dashboard.tsx      # Seller dashboard
│   │   ├── TradeIn.tsx        # Trade-in evaluation
│   │   ├── HelpCenter.tsx     # Help & support center
│   │   ├── ReturnsWarranty.tsx # Returns & warranty info
│   │   ├── QualityPromise.tsx  # Quality assurance page
│   │   ├── Contact.tsx        # Contact us page
│   │   └── NotFound.tsx       # 404 page
│   ├── integrations/          # Supabase integration
│   ├── store/                 # State management
│   └── types/                 # TypeScript types
├── supabase/
│   └── functions/
│       ├── chat/              # AI chat edge function
│       └── evaluate-trade-in/ # Trade-in evaluation
├── public/                    # Static assets
└── docs/                      # Documentation
```

## 🎯 Key Features Explained

### AI Chatbot
The chatbot provides instant support for:
- **Product Quality**: Explains quality scoring and certification
- **Shipping**: Delivery options, timeframes, and tracking
- **Returns**: 30-day return policy and process
- **Trade-In**: Device valuation and credit application
- **Seller Support**: Listing guidelines and verification

### Quality Scoring System
- **90-100**: Like New (minimal wear, perfect functionality)
- **85-89**: Excellent (minor cosmetic wear, perfect functionality)
- **75-84**: Very Good (light wear, fully functional)
- **65-74**: Good (moderate wear, fully functional)
- **Below 65**: Fair (visible wear, fully functional)

### Trade-In Program
- Instant valuations for phones, laptops, tablets, smartwatches
- Trade-in credit applied to your account
- Free shipping labels provided
- Condition-based pricing

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=https://azhokujqobnkgdkxcrnu.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your_publishable_key
VITE_SUPABASE_PROJECT_ID=azhokujqobnkgdkxcrnu
```

### Supabase Secrets

Set these in your Supabase dashboard:

```bash
LOVABLE_API_KEY=your_lovable_api_key
```

## 🔧 Troubleshooting

### Chatbot Not Working?
If you see "I'm sorry, I encountered an error", the backend function needs to be deployed.

**Quick Fix**:
```bash
# Install Supabase CLI
npm install -g supabase

# Login and link project
supabase login
supabase link --project-ref azhokujqobnkgdkxcrnu

# Deploy chat function
supabase functions deploy chat

# Set API key
supabase secrets set LOVABLE_API_KEY=your_key_here
```

📖 **Detailed guides**:
- [Fix Chatbot Error](FIX_CHATBOT_ERROR.md) - Step-by-step fix for chatbot issues
- [Troubleshooting Guide](TROUBLESHOOTING.md) - Complete debugging guide
- [Installation Guide](INSTALLATION_GUIDE.md) - Full setup instructions

### CSS Import Warning?
✅ Fixed! The `@import` statement has been moved to the top of `src/index.css`.

### Other Issues?
Check the [Troubleshooting Guide](TROUBLESHOOTING.md) for solutions to common problems.

## 🧪 Testing

### Test the AI Chatbot
1. Open the app
2. Click the chat icon (💬) in bottom-right
3. Try these questions:
   - "How do you ensure product quality?"
   - "What is your return policy?"
   - "How does shipping work?"
   - "Tell me about the trade-in program"

### Run Tests
```bash
npm run test
```

## 📦 Build & Deploy

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

### Deploy Edge Functions
```bash
supabase functions deploy chat
supabase functions deploy evaluate-trade-in
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - feel free to use this project for learning or commercial purposes.

## 🙏 Acknowledgments

- **Shadcn UI** for beautiful components
- **Supabase** for backend infrastructure
- **Lovable AI** for AI capabilities
- **Lucide** for icons
- **Tailwind CSS** for styling

## 📞 Support

Need help? Check out our documentation:
- [Quick Start Guide](QUICK_START.md)
- [Installation Guide](INSTALLATION_GUIDE.md)
- [Chatbot Setup](CHATBOT_SETUP.md)
- [Improvements Summary](IMPROVEMENTS_SUMMARY.md)

Or contact us at: support@secondlifetech.com

---

**Made with ❤️ for sustainable tech**

Give your electronics a second life! 🌱