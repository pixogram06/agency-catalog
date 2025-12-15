# Agency Catalog

A comprehensive web application for managing and cataloging data agencies and partners. Built with modern React, TypeScript, and Tailwind CSS, this application provides a complete solution for browsing, searching, filtering, and managing agency information.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Key Features Explained](#key-features-explained)
- [Configuration](#configuration)
- [Deployment](#deployment)

## 🎯 Overview

The Agency Catalog is a full-featured catalog management system designed to help organizations track and manage their network of data agencies and partners. The application provides:

- **Browse & Search**: View all agencies with powerful search and filtering capabilities
- **Detailed Views**: Individual pages for each agency with comprehensive information
- **CRUD Operations**: Create, read, update, and delete agency records
- **Contact Integration**: Built-in contact forms with EmailJS support
- **Document Management**: PDF viewer for agency documents and samples
- **Data Export**: CSV export functionality for agency data
- **Draft System**: Save changes as drafts before publishing
- **Local Persistence**: All data stored in browser localStorage

## ✨ Features

### 1. **Agency Catalog Dashboard**
   - Grid view of all agencies with cards showing key information
   - Search functionality across name, description, and tags
   - Status filtering (in-network, in-progress, In Pipeline, etc.)
   - Data type filtering (OTS, Samples, Synthetic)
   - Pagination (21 items per page)
   - CSV export functionality
   - Add new agency button

### 2. **Agency Detail Pages**
   - Comprehensive agency information display
   - Editable sections with draft/publish workflow
   - Accordion sections for:
     - Website
     - Point of Contact (POC)
     - Industry
     - Use Cases
     - Services
     - Modality
     - Location
     - OTS Data List
   - Contact button (for in-network agencies)
   - Edit mode with inline editing
   - Danger zone for agency deletion

### 3. **Agency Management**
   - **Add Agency**: Comprehensive form with all agency fields
   - **Edit Agency**: Inline editing with draft system
   - **Delete Agency**: Confirmation-based deletion
   - **Status Management**: Multiple status types with color coding
   - **Tag System**: Flexible tagging for categorization

### 4. **Contact Form**
   - EmailJS integration for sending emails
   - File attachment support (PDF, DOC, DOCX, TXT, images)
   - Form validation with Zod schema
   - Fallback to mailto links if EmailJS not configured

### 5. **PDF Viewer**
   - Full-featured PDF viewer component
   - Page navigation (previous/next, direct page input)
   - Zoom controls (50% to 200%)
   - Thumbnail sidebar
   - Open in new tab option
   - Error handling and loading states

### 6. **Data Persistence**
   - LocalStorage-based data storage
   - Draft system for unsaved changes
   - Automatic data merging on page load
   - Persistent state across sessions

### 7. **Routing System**
   - Generic routing: `/agency/:agencyName` for all agencies
   - Specific routes for individual agencies (legacy support)
   - URL-encoded agency names for special characters
   - Edit mode via URL query parameter (`?edit=true`)

### 8. **UI/UX Features**
   - Responsive design (mobile, tablet, desktop)
   - Dark mode support (via next-themes)
   - Toast notifications for user feedback
   - Loading states and error handling
   - Accessible components (Radix UI)
   - Smooth animations and transitions

## 🛠 Technology Stack

### Core Framework
- **React 18.3.1** - UI library
- **TypeScript 5.8.3** - Type safety
- **Vite 5.4.19** - Build tool and dev server

### UI Components & Styling
- **shadcn/ui** - Component library (Radix UI primitives)
- **Tailwind CSS 3.4.17** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library
- **tailwindcss-animate** - Animation utilities

### State Management & Data
- **React Context API** - Global state management
- **localStorage** - Client-side persistence
- **React Router DOM 6.30.1** - Routing
- **TanStack React Query 5.83.0** - Server state management

### Forms & Validation
- **React Hook Form 7.61.1** - Form management
- **Zod 3.25.76** - Schema validation
- **@hookform/resolvers** - Form validation integration

### Additional Libraries
- **EmailJS 4.4.1** - Email service integration
- **react-pdf 10.2.0** - PDF viewing
- **pdfjs-dist 5.4.296** - PDF rendering engine
- **date-fns 3.6.0** - Date utilities
- **Sonner** - Toast notifications

## 📁 Project Structure

```
agency-catalog/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/              # shadcn/ui components
│   │   ├── AddAgencyDialog.tsx
│   │   ├── AgencyDetailHeader.tsx
│   │   ├── AgencyEditSection.tsx
│   │   ├── ContactFormDialog.tsx
│   │   ├── DangerZone.tsx
│   │   ├── EditableAccordionSections.tsx
│   │   ├── PartnerCard.tsx
│   │   └── PdfViewer.tsx
│   ├── contexts/            # React Context providers
│   │   └── AgencyContext.tsx
│   ├── hooks/               # Custom React hooks
│   │   ├── use-mobile.tsx
│   │   ├── use-toast.ts
│   │   ├── useEditableAccordion.tsx
│   │   └── useEditableAgency.tsx
│   ├── lib/                 # Utility functions
│   │   ├── agencyStatus.ts
│   │   └── utils.ts
│   ├── pages/               # Page components
│   │   ├── Index.tsx        # Main catalog page
│   │   ├── GenericAgencyDetails.tsx
│   │   ├── PdfViewerPage.tsx
│   │   ├── NotFound.tsx
│   │   └── [29 agency-specific detail pages]
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
├── public/
│   └── documents/           # PDF and document files
├── package.json
├── vite.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (recommended: use [nvm](https://github.com/nvm-sh/nvm))
- npm or yarn or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone <YOUR_GIT_URL>
   cd agency-catalog
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   bun install
   ```

3. **Set up environment variables** (optional, for EmailJS)
   Create a `.env` file in the root directory:
   ```env
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:8080` (or the port shown in terminal)

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔧 Key Features Explained

### Agency Status System

The application supports multiple agency statuses:
- **in-network**: Active partners (green badge, contact button enabled)
- **in-progress**: Agencies being onboarded (blue badge)
- **In Pipeline**: Future partnerships (yellow badge)
- **Draft**: Unpublished changes (yellow background)
- **Legal Redlining**: Legal review status (purple badge)
- **Internal Catalog Only**: Internal use only (orange badge)
- **Discovery**: Initial research phase (amber badge)

### Draft System

The application includes a sophisticated draft system:
- Changes can be saved as drafts without publishing
- Drafts are stored in localStorage separately from published data
- Draft indicator shown when unsaved changes exist
- "Publish" button applies changes to main catalog
- "Save as Draft" stores changes locally only
- "Cancel" reverts to last published state or loads existing draft

### Data Model

Each agency contains:
```typescript
{
  id: string;
  name: string;
  initials: string;
  status: string;
  description: string;
  tags: string[];
  website?: string;
  samples?: boolean;
  synthetic?: boolean;
  ots?: boolean;
  poc?: { name: string; email: string }[];
  industry?: string;
  useCase?: string[];
  service?: string[];
  modality?: string[];
  location?: string;
  otsDataList?: string[];
}
```

### Search & Filtering

- **Search**: Searches across agency name, description, and tags
- **Status Filter**: Dropdown to filter by agency status
- **Data Type Filter**: Filter by OTS, Samples, or Synthetic data availability
- **Combined Filters**: All filters work together for precise results

### CSV Export

The export functionality generates a CSV file with:
- ID, Name, Status, Description
- Tags (semicolon-separated)
- OTS, Samples, Synthetic flags

## ⚙️ Configuration

### EmailJS Setup (Optional)

1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Create an email service (Gmail, Outlook, etc.)
3. Create an email template with these variables:
   - `{{to_email}}` - Recipient email
   - `{{from_name}}` - Sender's full name
   - `{{from_email}}` - Sender's email
   - `{{agency_name}}` - Agency name
   - `{{message}}` - Request summary
   - `{{reply_to}}` - Reply-to email
   - `{{attachment_name}}` - File name (optional)
   - `{{attachment_base64}}` - Base64 file (optional)
   - `{{attachment_type}}` - File MIME type (optional)

4. Add environment variables to `.env` file

**Note**: If EmailJS is not configured, the contact form will fall back to opening the user's email client.

### Vite Configuration

The project uses Vite with:
- React SWC plugin for fast compilation
- Path aliases (`@/` → `src/`)
- Development server on port 8080
- Component tagger for Lovable integration (dev mode only)

## 📦 Deployment

### Via Lovable

1. Open [Lovable Project](https://lovable.dev/projects/ea6dd546-84e6-4424-8506-4ab6b7b0e5d2)
2. Click **Share → Publish**
3. Follow the deployment wizard

### Manual Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Preview the build**
   ```bash
   npm run preview
   ```

3. **Deploy the `dist/` folder** to your hosting service:
   - Vercel
   - Netlify
   - GitHub Pages
   - Any static hosting service

### Custom Domain

To connect a custom domain:
1. Navigate to **Project > Settings > Domains**
2. Click **Connect Domain**
3. Follow the DNS configuration instructions

## 🎨 UI Components

The application uses shadcn/ui components built on Radix UI:
- Dialog, Alert Dialog
- Accordion, Tabs
- Button, Input, Textarea
- Select, Checkbox, Radio Group
- Badge, Card
- Toast, Tooltip
- Pagination
- And more...

All components are fully accessible and customizable via Tailwind CSS.

## 📝 Data Management

### Initial Data

The application starts with 29 pre-configured agencies stored in `AgencyContext.tsx`. These include:
- Healthcare data providers (ICliniq, Premier, Health Verity, etc.)
- Data collection services (FutureBee AI, Macgence, LXT, etc.)
- Tooling partners (Encord, Pulse.AI)
- Translation services (Columbus Lang, Monisa Enterprise)
- And more...

### Data Persistence

- All changes are saved to `localStorage`
- Drafts are stored separately with key pattern: `agency_drafts_{id}`
- Published data is stored under key: `agency_data`
- Data persists across browser sessions
- Data merges with initial data on load (preserves new fields)

## 🔒 Security Considerations

- EmailJS handles email sending (no backend required)
- File uploads are converted to base64 for email transmission
- No sensitive data stored in code (all in localStorage)
- Environment variables for API keys (not committed to repo)

## 🐛 Troubleshooting

### PDF Viewer Issues
- Ensure PDF files are in `public/documents/` folder
- Check browser console for CORS errors
- Verify PDF.js worker is loading correctly

### EmailJS Not Working
- Verify environment variables are set correctly
- Check EmailJS template variables match code
- Ensure EmailJS service is active
- Check browser console for errors

### Data Not Persisting
- Check browser localStorage quota
- Verify localStorage is enabled
- Clear localStorage if corrupted: `localStorage.clear()`

## 📄 License

This project is private and proprietary.

## 👥 Contributing

This project is managed via Lovable. Changes can be made:
1. Through Lovable interface (auto-commits to repo)
2. Via local IDE (push changes to repo)
3. Directly in GitHub (edit files)

## 🔗 Links

- **Lovable Project**: https://lovable.dev/projects/ea6dd546-84e6-4424-8506-4ab6b7b0e5d2
- **EmailJS**: https://www.emailjs.com/
- **shadcn/ui**: https://ui.shadcn.com/
- **React Router**: https://reactrouter.com/

---

**Built with ❤️ using React, TypeScript, and modern web technologies**
