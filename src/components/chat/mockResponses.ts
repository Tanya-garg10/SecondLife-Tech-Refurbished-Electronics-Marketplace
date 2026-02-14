// Mock responses for demo mode when backend is not available

export const mockResponses: Record<string, string> = {
    quality: `Great question! 🎯

We ensure product quality through our comprehensive AI-powered system:

**Quality Scoring (1-100 scale)**:
• 90-100: Like New - Minimal wear, perfect functionality
• 85-89: Excellent - Minor cosmetic wear, perfect functionality  
• 75-84: Very Good - Light wear, fully functional
• 65-74: Good - Moderate wear, fully functional

**Multi-Point Inspection**:
✓ Visual inspection of exterior, screen, ports
✓ Hardware testing (battery, camera, speakers)
✓ Software verification and performance tests
✓ Professional refurbishment and cleaning

**Guarantees**:
• 1-year warranty on all devices
• 30-day money-back guarantee
• Certified refurbishment process

Every device is thoroughly tested before listing!`,

    shipping: `Here's everything about our shipping! 📦

**Shipping Options**:
• FREE shipping on orders over $50
• Standard delivery: 5-7 business days
• Express delivery: 2-3 business days (additional cost)

**Tracking**:
• Real-time order tracking available
• Email notifications at each stage
• Delivery stages: Packed → Shipped → Out for Delivery → Delivered

**Packaging**:
• Secure packaging to prevent damage
• Eco-friendly materials
• Original accessories included when available

Need to track an order? Visit your dashboard!`,

    return: `Our return policy is super flexible! 🔄

**30-Day Return Policy**:
• No questions asked returns
• Full refund to original payment method
• Free return shipping labels

**Return Process**:
1. Request return from your order history
2. Get prepaid shipping label via email (24 hours)
3. Pack and ship the item securely
4. Receive refund within 5-7 business days

**Eligibility**:
✓ Unopened items
✓ Items with defects
✓ Items not as described
✓ Changed your mind

**No Restocking Fees!**

Want to start a return? Contact our support team.`,

    'trade-in': `Our trade-in program makes upgrading easy! 💰

**How It Works**:
1. Get instant valuation for your device
2. Ship your device (free shipping label)
3. We inspect and verify condition
4. Receive store credit in your account

**Accepted Devices**:
• Phones (iPhone, Samsung, Google, etc.)
• Laptops (MacBook, Windows laptops)
• Tablets (iPad, Android tablets)
• Smartwatches (Apple Watch, etc.)

**Valuation Factors**:
• Device model and age
• Physical condition
• Functionality and performance
• Market demand

**Benefits**:
✓ Instant online valuations
✓ Free shipping labels
✓ Quick processing (2-3 days)
✓ Store credit for future purchases

Visit our Trade-In page to get started!`,

    warranty: `All our devices come with comprehensive warranty! 🛡️

**1-Year Warranty Coverage**:
✓ Manufacturing defects
✓ Hardware failures
✓ Battery issues (below 80% capacity)
✓ Screen defects
✓ Button malfunctions
✓ Charging port issues

**What's NOT Covered**:
✗ Physical damage (drops, cracks)
✗ Water damage
✗ Software issues
✗ Cosmetic wear and tear
✗ Unauthorized repairs

**Warranty Claims**:
• Processed within 48 hours
• Free repairs or replacements
• Easy claim process through dashboard

**Plus**: 30-day money-back guarantee on top of warranty!

Need to make a claim? Contact our support team.`,

    seller: `Want to become a seller? Here's how! 🚀

**Getting Started**:
1. Create a seller account
2. Complete verification process
3. List your products
4. Start selling!

**Seller Benefits**:
✓ Access to 50K+ buyers
✓ Verified seller badge
✓ Analytics and insights
✓ Secure payment processing

**Commission**:
• 10% on successful sales
• No listing fees
• No hidden charges

**Requirements**:
• Quality products only
• Accurate descriptions
• Competitive pricing
• Good customer service

**Support**:
• Seller dashboard with analytics
• Listing optimization tips
• Marketing support
• Dedicated seller support team

Visit the Dashboard to start selling!`,

    order: `Track and manage your orders easily! 📦

**Order Tracking**:
• Real-time status updates
• Email notifications
• Estimated delivery dates
• Tracking number provided

**Order Stages**:
1. Order Placed - Payment confirmed
2. Packed - Item prepared for shipping
3. Shipped - On the way to you
4. Out for Delivery - Arriving today
5. Delivered - Enjoy your device!

**Need Help?**:
• View order history in Dashboard
• Contact support for issues
• Request returns if needed
• Leave reviews after delivery

Visit your Dashboard to track orders!`,

    payment: `We accept multiple payment methods! 💳

**Payment Options**:
✓ Credit/Debit Cards (Visa, Mastercard, Amex)
✓ PayPal
✓ Apple Pay
✓ Google Pay
✓ Store Credit (from trade-ins)

**Security**:
• Secure SSL encryption
• PCI DSS compliant
• No card details stored
• Fraud protection

**Billing**:
• Instant payment confirmation
• Email receipts
• Invoice available in dashboard
• Refunds to original payment method

**Issues?**:
Contact our support team for payment-related queries.`,

    default: `Hi! I'm here to help! 👋

I can assist you with:

**Product Information**:
• Quality scoring and certification
• Device specifications
• Pricing and comparisons

**Orders & Shipping**:
• Order tracking
• Shipping options and times
• Delivery updates

**Returns & Warranty**:
• 30-day return policy
• 1-year warranty coverage
• Return/warranty claims

**Trade-In Program**:
• Device valuations
• Trade-in process
• Store credit

**Seller Support**:
• Becoming a seller
• Listing products
• Seller dashboard

What would you like to know more about?`,
};

export function getMockResponse(userMessage: string): string {
    const message = userMessage.toLowerCase();

    // Check for keywords and return appropriate response
    if (message.includes('quality') || message.includes('score') || message.includes('certification')) {
        return mockResponses.quality;
    }
    if (message.includes('ship') || message.includes('delivery') || message.includes('track')) {
        return mockResponses.shipping;
    }
    if (message.includes('return') || message.includes('refund')) {
        return mockResponses.return;
    }
    if (message.includes('trade') || message.includes('sell my') || message.includes('valuation')) {
        return mockResponses['trade-in'];
    }
    if (message.includes('warranty') || message.includes('guarantee')) {
        return mockResponses.warranty;
    }
    if (message.includes('seller') || message.includes('selling') || message.includes('list')) {
        return mockResponses.seller;
    }
    if (message.includes('order') || message.includes('tracking')) {
        return mockResponses.order;
    }
    if (message.includes('payment') || message.includes('pay') || message.includes('card')) {
        return mockResponses.payment;
    }

    return mockResponses.default;
}

export async function simulateStreaming(
    text: string,
    onDelta: (chunk: string) => void,
    onDone: () => void
): Promise<void> {
    // Split into words for streaming effect
    const words = text.split(' ');

    for (let i = 0; i < words.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 30)); // 30ms delay between words
        onDelta(words[i] + ' ');
    }

    onDone();
}
