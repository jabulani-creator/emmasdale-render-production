# Software Requirements Specification (SRS)
## For Emmasdale SDA Church Web Platform

---

## 1. Introduction

### 1.1 Purpose
The purpose of this document is to detail the software requirements for the Emmasdale SDA Church Web Platform. This platform serves as a warm, welcoming digital front door for the church, providing public-facing information (events, health tips, live worship, sermons, resources) to turn first-time visitors into attendees and boost member engagement. It also features a secure, role-based administrative dashboard for church leaders to manage that content.

### 1.2 Scope
The system is a full-stack web application built to modernize the church's digital presence and reflect a faith-centered community. It allows the public to view church history, plan a visit, watch live streams, access sermon archives, submit prayer/contact requests, and give online. Simultaneously, it provides a secure back-office dashboard where System Admins and Department Leaders can dynamically update the website content without requiring technical knowledge.

### 1.3 Technology Stack
- **Frontend:** Next.js 16 (React 19), Tailwind CSS, Zustand (State Management)
- **Backend:** Node.js, Express.js, TypeScript
- **Database:** MongoDB (with Mongoose ODM)
- **Authentication:** JSON Web Tokens (JWT) stored in HTTP-only cookies
- **Media Storage:** Cloudinary (for images), local/cloud storage for PDFs

---

## 2. Overall Description

### 2.1 User Classes and Characteristics
The system identifies three primary types of users:
1. **Public Users (Visitors):** Unauthenticated users who visit the website to consume content, learn about the church, and submit contact/prayer requests.
2. **Leaders (Department Heads):** Authenticated users with restricted dashboard access. They can create, edit, and delete content relevant to their specific ministry.
3. **System Admins (Superadmins):** Highly privileged users who have full CRUD access to all content and possess the exclusive ability to create new user accounts (Leaders) and manage system-wide settings.

### 2.2 Operating Environment
- The application is a responsive web application designed to work on modern desktop and mobile browsers (Chrome, Safari, Firefox, Edge).
- The backend is a RESTful API hosted on a Node.js runtime environment.

---

## 3. System Features (Functional Requirements)

### 3.1 Public-Facing Website (Visitor & Member Experience)
- **Landing Page:** Displays a dynamic, warm hero section with real church photos, prominent service times, and multiple clear Calls-to-Action (CTAs) such as "Plan Your Visit" and "Watch Live".
- **First-Time Visitor Hub ("Plan Your Visit"):** A dedicated page answering common questions (service times, what to expect, parking, children's programs, dress code) to convert online visitors into in-person attendees.
- **Worship & Media Experience:**
  - **Live Stream:** Embedded YouTube/Facebook player for Sabbath services.
  - **Sermon Archive:** A searchable database of past sermons with video embeds and series categorizations.
  - **Sabbath School:** Dedicated section for weekly lessons and quarterly PDFs.
- **Engagement & Community:**
  - **"The Week with Us":** A schedule showing weekly prayer meetings, Bible studies, and regular gatherings.
  - **Testimonies:** A section highlighting real stories and member impact to build trust.
  - **Volunteer / Ministry Sign-up:** Forms allowing members to share their gifts and sign up to serve.
- **About & Ministries:** Details church history, core beliefs, and various church departments (Youth, Children, Women's Ministries, etc.).
- **Giving:** A prominent "Give" page explaining tithes and offerings with a link to a secure giving platform.
- **Contact & Prayer Page:** Displays church leadership and includes forms for users to submit prayer requests or general inquiries.

### 3.2 Authentication & Authorization
- **Login System:** Secure login using email and password.
- **Role-Based Access Control (RBAC):** 
  - The dashboard UI dynamically renders based on the user's role.
  - The backend enforces permission checks (`checkPermission` middleware) to ensure Leaders can only modify their own content, while System Admins can modify everything.
- **Session Management:** JWTs are issued upon login and stored in secure, HTTP-only cookies to prevent XSS attacks.

### 3.3 Dashboard: Content Management (CMS)
- **Unified Content Creation & Editing:** A single, dynamic interface (`/dashboard/create-content` and `/dashboard/edit-content/[type]/[id]`) allowing authorized users to manage various content types (News Post, Event, Health Tip, Bulletin, Sermon, Testimony).
- **Media Uploads:** Seamless integration with Cloudinary for uploading, storing, and serving optimized images for posts and events.
- **Quick Editors:** Dedicated, easy-to-use fields for high-frequency items like updating the Live Stream URL or featuring specific content on the homepage.
- **Entity Management:**
  - **Posts & Testimonies:** Title, Description, Image.
  - **Events:** Title, Description, Date, Time, Venue, Speaker, Image, RSVP capacity.
  - **Health Tips:** Title, Description, Image.
  - **Bulletins:** Date, PDF Document.
  - **Sermons:** Title, Speaker, Date, Series, YouTube/Video Link.

### 3.4 Dashboard: User & Request Management
- **User Creation (Admin Only):** System Admins can create accounts for new staff members, assigning them a specific leadership category (Pastoral Staff, Church Elders, Department Heads, General Workers) which dictates where they appear on the public Contact page.
- **Prayer/Contact Requests:** Admins can view and manage requests submitted by the public via the website.

---

## 4. Non-Functional Requirements

### 4.1 Security
- Passwords must be hashed using `bcryptjs` before being stored in the database.
- API endpoints must be protected against NoSQL injection (`express-mongo-sanitize`) and basic web vulnerabilities (`helmet`).
- Rate limiting (`express-rate-limit`) must be applied to authentication routes to prevent brute-force attacks.

### 4.2 Performance
- The frontend must utilize Next.js server-side rendering (SSR) and static site generation (SSG) where applicable to ensure fast initial page loads and optimal SEO.
- Images must be optimized and served responsively using the Next.js `<Image>` component.

### 4.3 Usability & Design Tone
- **Mobile-First UX:** The platform must prioritize mobile users with features like a sticky bottom navigation (or accessible top drop-down), large tap targets, and smooth CSS animations.
- **Design Tone:** The aesthetic must be warm, inspirational, and faith-filled, utilizing real church photography rather than generic stock images where possible.
- **Accessibility (WCAG):** The site must adhere to basic web accessibility guidelines, including proper alt text for images, high color contrast ratios, keyboard navigation support, and semantic HTML tags.
- **Progressive Web App (PWA) Support (Phase 2):** Allow users to "Add to Home Screen" for quick access and offline caching.

---

## 5. Database Architecture (MongoDB Collections)

The system relies on several Mongoose schemas to structure data:

- **User:** Stores authentication credentials, role (`superadmin`, `admin`, `leader`), and public contact info (position, category).
- **Post:** Stores general church news.
- **Event:** Stores upcoming events with specific date/time/venue fields.
- **Health:** Stores health-related articles.
- **Pdf (Bulletin):** Stores references to uploaded weekly bulletin documents.
- **Contact:** Stores messages and prayer requests submitted by public users.
- **Image:** A general gallery repository for media.
