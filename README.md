# SafeSpace

**SafeSpace** is a , cushioned digital community designed for mental wellness, community support, and professional clinical care. Built for the modern age, it bridges the gap between peer-led empathy and professional expertise in a secure, role-aware environment.

---

## Quick Start & Credentials

To experience the full capability of SafeSpace, we recommend testing with **two distinct roles**.

### **1. Professional Dashboard (Therapists/Specialists)**

* **Access**: Sign up as a "Professional" or login with a verified specialist account.
* **Key Features**:
  * **Clinical Management**: Custom dashboard to accept/decline session requests.
  * **Group Leadership**: Create and manage "Professional Sanctuaries" (Specialized groups).
  * **Availability**: Set practice hours and manage client bookings via a specialized calendar.
* **Sign Up as Professional**.

### **2. Member Experience (Seekers)**

* **Access**: Sign up as a "Seeker".
* **Key Features**:
  * **Discovery**: Browse and join community sanctuaries or professional-led groups.
  * **Booking**: Request 1-on-1 sessions with vetted specialists.
  * **KYC Verification**: Level-up your trust score using the NIN/BVN verification flow.
* **Test Account**: **Sign Up as Seeker**.

---

## ✨ Key Features

### 🛡️ Role-Based Access Control (RBAC)

* **Dynamic UI**: The interface morphs based on your role. Professionals see management tools (availability, client requests), while Regular users see discovery and booking journeys.
* **Route Protection**: Secure guards ensure clinical tools are only accessible to verified specialists.

### 📅 Specialist Appointments

* **Themed Calendar**: A premium, custom-styled calendar integration for managing wellness sessions.
* **Session Workflow**: Full lifecycle support from "Pending Request" to "Accepted" and "Completed" sessions.

### 🏛️ Sanctuaries (Groups)

* **Professional Groups**: Specialized clinical groups led by experts.
* **Community Groups**: Peer-to-peer support spaces for shared experiences.
* **Creation Flow**: Professionals can establish new sanctuaries with specific clinical focuses.

### 🆔 Identity Verification (KYC)

* **Tiered Trust**: Verification flow supporting NIN and BVN to ensure a safe, vetted specialists.

---

## 🛠️ Technical Stack

### **Frontend**

* **Framework**: React 19 + Vite + TypeScript
* **State Management**: Zustand (Auth & Global State)
* **Data Fetching**: TanStack React Query (Server state synchronization)
* **Styling**: Vanilla CSS with the **Kindred Harbor Design System** (Tokens for glassmorphism, depth, and typography).
* **Animations**: Framer Motion for smooth micro-interactions.

### **Backend**

* **Framework**: NestJS (Node.js)
* **Database**: PostgreSQL
* **ORM**: Prisma
* **Authentication**: JWT (Access & Refresh tokens) with Passport.js
* **Deployment**: Hosted on **Render** (API) and **Vercel** (Frontend).

---

## 📦 Installation & Setup

### **Prerequisites**

* Node.js (v20+)
* pnpm or npm

### **Frontend Setup**

1. Navigate to `SafeSpace_Frontend`:
   ```bash
   cd SafeSpace_Frontend
   pnpm install
   pnpm run dev
   ```
2. Configure `.env`:
   ```env
   VITE_API_BASE_URL=https://safespace-temp.onrender.com/api/
   ```

### **Backend Setup**

1. Navigate to `SafeSpace_Backend`:
   ```bash
   cd SafeSpace_Backend
   npm install
   npm run start:dev
   ```

---

## 🔗 Repository Links

* **Main Repository**: Sudosquad/SafeSpace
* **Live Preview**: https://safe-space-mvp.vercel.app/

---

Developed with 💜 for the SafeSpace.
