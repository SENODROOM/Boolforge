# 🎨 Canvas Market - Online Painting Marketplace

[![Live Demo](https://img.shields.io/badge/demo-live-green.svg)](https://canvas-market.vercel.app)
[![React](https://img.shields.io/badge/React-18.x-blue.svg)](https://reactjs.org/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

> A modern, full-featured online marketplace for buying and selling paintings and artwork - connecting artists directly with art enthusiasts.

## 📋 Table of Contents

- [Overview](#-overview)
- [Current Status](#-current-status)
- [Features Implemented](#-features-implemented)
- [Planned Features](#-planned-features)
- [Tech Stack](#-tech-stack)
- [Project Architecture](#-project-architecture)
- [Getting Started](#-getting-started)
- [Development Roadmap](#-development-roadmap)
- [Future Enhancements](#-future-enhancements)
- [Contributing](#-contributing)

---

## 🌟 Overview

**Canvas Market** is a two-sided marketplace platform designed to revolutionize how paintings and artwork are bought and sold online. By removing intermediaries like traditional galleries and dealers, the platform connects artists directly with collectors, art lovers, and buyers worldwide.

### Mission
To democratize the art market by providing a transparent, secure, and user-friendly platform where artists can showcase their work and buyers can discover unique pieces without the overhead of traditional art galleries.

### Target Audience
- **Artists & Painters**: Professionals and hobbyists looking to sell their original work
- **Art Collectors**: Individuals seeking unique paintings and artwork
- **Interior Designers**: Professionals sourcing art for clients
- **Art Enthusiasts**: Anyone who appreciates and wants to purchase art

---

## 🚀 Current Status

### Development Progress: **~60% Complete**

The frontend application is currently in **active development** with core UI components and routing structure in place. The project has reached a significant milestone with the basic marketplace framework established.

#### ✅ Completed Components
- Project initialization and configuration
- Basic routing structure
- Core UI framework
- Responsive design foundation
- Deployment pipeline (Vercel)

#### 🔄 In Progress
- Integration with backend API
- User authentication flows
- Product listing interfaces
- Shopping cart functionality
- Payment gateway integration

#### ⏳ Pending
- Advanced search and filtering
- User dashboard and profiles
- Admin panel
- Order management system
- Analytics and reporting

---

## ✨ Features Implemented

### Current Features (Frontend)

#### 1. **Core Infrastructure**
- ✅ React application bootstrapped with Create React App
- ✅ Component-based architecture
- ✅ CSS styling framework (67% of codebase)
- ✅ Responsive design layout
- ✅ Continuous deployment via Vercel

#### 2. **Navigation & Routing**
- ✅ Multi-page navigation structure
- ✅ Client-side routing
- ✅ Mobile-responsive navigation menu

#### 3. **UI Components**
- ✅ Reusable component library
- ✅ Form components
- ✅ Card layouts for product displays
- ✅ Modal dialogs

---

## 🎯 Planned Features

### Phase 1: Core Marketplace (Backend Integration) - *Next Up*

#### User Management
- **User Registration & Login**
  - Email/password authentication
  - Social login (Google, Facebook)
  - Email verification
  - Password reset functionality
  - User profile creation

- **User Profiles**
  - Artist profiles with bio and portfolio
  - Buyer profiles with preferences
  - Profile picture upload
  - Contact information management
  - Purchase/sale history

#### Listing Management
- **Create Listings**
  - Multi-image upload (up to 10 images per listing)
  - Title, description, and pricing
  - Art style categorization (Abstract, Realism, Impressionism, etc.)
  - Medium selection (Oil, Acrylic, Watercolor, Digital, etc.)
  - Dimensions and weight
  - Original vs. Print options
  - Limited edition numbering

- **Browse & Search**
  - Grid/list view toggle
  - Category filtering
  - Price range slider
  - Size filters
  - Color palette filters
  - Artist search
  - Advanced search with multiple criteria
  - Sort by: Price, Date, Popularity, Rating

#### Shopping Experience
- **Shopping Cart**
  - Add/remove items
  - Quantity management
  - Save for later
  - Price calculations
  - Shipping estimates

- **Checkout Process**
  - Guest checkout option
  - Saved addresses
  - Multiple shipping addresses
  - Order summary
  - Coupon/promo code application

- **Payment Integration**
  - Stripe payment gateway
  - Credit/debit card processing
  - PayPal integration
  - Secure payment handling
  - Order confirmation emails
  - Invoice generation

### Phase 2: Enhanced Features

#### Artist Tools
- **Seller Dashboard**
  - Sales analytics
  - Listing management
  - Order fulfillment tracking
  - Revenue reports
  - Customer messages
  - Inventory management

- **Artist Verification**
  - Verified artist badges
  - Portfolio review process
  - Social media integration
  - Artist spotlight features

#### Buyer Features
- **Wishlist & Favorites**
  - Save favorite paintings
  - Create collections
  - Price drop notifications
  - Back-in-stock alerts

- **Reviews & Ratings**
  - 5-star rating system
  - Written reviews
  - Photo reviews
  - Verified purchase badges
  - Helpful vote system

#### Communication
- **Messaging System**
  - Direct artist-buyer messaging
  - Inquiry about paintings
  - Custom commission requests
  - Order status updates
  - Automated notifications

### Phase 3: Advanced Marketplace Features

#### Discovery & Engagement
- **Homepage Features**
  - Featured artists
  - Trending paintings
  - New arrivals
  - Editor's picks
  - Category highlights
  - Curated collections

- **Personalization**
  - AI-powered recommendations
  - Recently viewed items
  - Similar paintings suggestion
  - Artist following system
  - Customized homepage

#### Trust & Safety
- **Secure Transactions**
  - Escrow payment system
  - Buyer protection program
  - Authenticity certificates
  - Fraud prevention
  - Dispute resolution

- **Quality Assurance**
  - Seller rating system
  - Return policy enforcement
  - Condition reporting
  - Shipping insurance options

#### Community Features
- **Social Elements**
  - Artist blogs
  - Art community forums
  - Exhibition calendar
  - Art news and articles
  - Virtual gallery tours

### Phase 4: Business Intelligence

#### Analytics & Insights
- **Artist Analytics**
  - View counts
  - Conversion rates
  - Average sale price
  - Best-performing pieces
  - Traffic sources

- **Admin Dashboard**
  - Platform-wide statistics
  - User growth metrics
  - Transaction monitoring
  - Revenue tracking
  - Category performance

#### Marketing Tools
- **Promotional Features**
  - Featured listings (paid)
  - Sponsored artists
  - Email marketing campaigns
  - Social media integration
  - Affiliate program

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18.x
- **Language**: JavaScript (ES6+)
- **Styling**: CSS3, CSS Modules
- **Build Tool**: Create React App
- **Deployment**: Vercel
- **State Management**: React Context API / Redux (planned)
- **HTTP Client**: Axios (planned)
- **Form Handling**: React Hook Form (planned)
- **UI Components**: Custom component library

### Backend (Planned Integration)
- **Server**: Node.js + Express.js OR Django/Flask
- **Database**: MongoDB / PostgreSQL
- **Authentication**: JWT tokens / OAuth 2.0
- **File Storage**: AWS S3 / Cloudinary for images
- **Payment Processing**: Stripe API
- **Email Service**: SendGrid / AWS SES

### DevOps
- **Version Control**: Git & GitHub
- **CI/CD**: GitHub Actions + Vercel
- **Hosting**: Vercel (Frontend) + AWS/Heroku (Backend)
- **Monitoring**: Sentry (error tracking)
- **Analytics**: Google Analytics

---

## 🏗️ Project Architecture

```
Canvas-Market-Frontend/
│
├── public/                 # Static files
│   ├── index.html         # HTML template
│   └── assets/            # Images, icons, fonts
│
├── src/                   # Source code
│   ├── components/        # Reusable UI components
│   │   ├── common/       # Buttons, inputs, cards
│   │   ├── layout/       # Header, footer, sidebar
│   │   └── features/     # Feature-specific components
│   │
│   ├── pages/            # Page components
│   │   ├── Home/
│   │   ├── Marketplace/
│   │   ├── ProductDetail/
│   │   ├── Cart/
│   │   ├── Checkout/
│   │   ├── Profile/
│   │   └── Dashboard/
│   │
│   ├── services/         # API service layer
│   │   ├── auth.js
│   │   ├── products.js
│   │   └── payments.js
│   │
│   ├── utils/            # Helper functions
│   ├── hooks/            # Custom React hooks
│   ├── context/          # React Context providers
│   ├── styles/           # Global styles
│   ├── App.js            # Main app component
│   └── index.js          # Entry point
│
├── .gitignore
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/SENODROOM/Canvas-Market-Frontend.git
cd Canvas-Market-Frontend
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Set up environment variables**
```bash
# Create .env file in root directory
cp .env.example .env

# Add your environment variables
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_STRIPE_PUBLIC_KEY=your_stripe_key
```

4. **Start development server**
```bash
npm start
# or
yarn start
```

The app will open at `http://localhost:3000`

### Available Scripts

- `npm start` - Run development server
- `npm test` - Launch test runner
- `npm run build` - Build for production
- `npm run eject` - Eject from Create React App (⚠️ irreversible)

---

## 📅 Development Roadmap

### Q1 2026 - Foundation ✅
- [x] Initialize React application
- [x] Set up project structure
- [x] Create basic UI components
- [x] Deploy to Vercel
- [ ] Complete component library

### Q2 2026 - Core Features 🔄
- [ ] Backend API development
- [ ] User authentication system
- [ ] Product listing CRUD operations
- [ ] Shopping cart implementation
- [ ] Payment gateway integration
- [ ] Order management system

### Q3 2026 - Enhanced UX
- [ ] Advanced search & filters
- [ ] User dashboard
- [ ] Messaging system
- [ ] Review & rating system
- [ ] Wishlist functionality
- [ ] Mobile app (React Native)

### Q4 2026 - Scale & Optimize
- [ ] Performance optimization
- [ ] SEO improvements
- [ ] Analytics integration
- [ ] Admin panel
- [ ] Marketing tools
- [ ] AI recommendations

---

## 🔮 Future Enhancements

### Short-term (3-6 months)
1. **Virtual Gallery View**
   - 3D room visualization
   - AR preview on your wall
   - Size comparison tool

2. **Artist Verification System**
   - Identity verification
   - Portfolio review
   - Verified badges

3. **Commission Marketplace**
   - Custom artwork requests
   - Artist bidding system
   - Project milestones

### Medium-term (6-12 months)
1. **NFT Integration**
   - Digital art NFTs
   - Blockchain certificates
   - Crypto payments

2. **International Expansion**
   - Multi-currency support
   - Multi-language interface
   - International shipping

3. **Mobile Applications**
   - iOS app (React Native)
   - Android app (React Native)
   - Push notifications

### Long-term (12+ months)
1. **AI-Powered Features**
   - Style-based recommendations
   - Price prediction
   - Artwork authentication

2. **Virtual Exhibitions**
   - Online art shows
   - Live streaming events
   - Virtual galleries

3. **Enterprise Solutions**
   - B2B marketplace
   - Corporate art programs
   - Gallery partnerships

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

### Development Guidelines

- Follow the existing code style
- Write meaningful commit messages
- Add comments for complex logic
- Update documentation as needed
- Test your changes thoroughly
- Ensure responsive design

### Areas for Contribution

- 🐛 Bug fixes
- ✨ New features
- 📝 Documentation
- 🎨 UI/UX improvements
- ♿ Accessibility enhancements
- 🌐 Translations

---

## 📊 Project Statistics

- **Total Commits**: 53
- **Contributors**: 2
- **Code Distribution**:
  - CSS: 67.0%
  - JavaScript: 32.1%
  - HTML: 0.9%

---

## 📞 Contact & Support

- **Live Demo**: [canvas-market.vercel.app](https://canvas-market.vercel.app)
- **GitHub Issues**: [Report bugs or request features](https://github.com/SENODROOM/Canvas-Market-Frontend/issues)
- **Email**: contact@canvasmarket.com (if available)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Create React App for the initial boilerplate
- Vercel for hosting and deployment
- All contributors who have helped shape this project
- The open-source community for inspiration and resources

---

## 🔗 Related Repositories

- Backend API: *Coming Soon*
- Mobile App: *Coming Soon*
- Admin Dashboard: *Coming Soon*

---

**Built with ❤️ by artists, for artists**

*Last Updated: January 2026*