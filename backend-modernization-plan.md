# Emmasdale SDA Church - Backend Modernization Plan

This document outlines the planned improvements and modernization steps for the Emmasdale SDA Church backend. The goal is to update the application to current industry standards, making it cloud-agnostic, secure, and easier to maintain for future production deployment.

## 1. Core Dependency Updates & Node Version
The Node.js ecosystem has evolved significantly in the last 3 years. We need to update our foundational tools.

*   **Node.js**: Upgrade the `engines` requirement in `package.json` from `>=16.16.0` to `>=20.0.0` (Node 20 LTS). Node 16 is End-of-Life (EOL) and no longer receives security updates.
*   **Mongoose**: Upgrade from `v6.x` to `v8.x`. Mongoose 8 brings better TypeScript support, improved performance, and stricter query handling.
*   **Express Ecosystem**: Update core Express packages (`express`, `cookie-parser`, `express-async-errors`) to their latest stable versions.

## 2. Removing Deprecated & Abandoned Packages
Several packages used in the original build are now obsolete or abandoned.

*   **Replace `uuidv4`**: The `uuidv4` package (`^6.2.13`) was deprecated years ago. We will switch to the official `uuid` package (`npm install uuid`).
*   **Remove `xss-clean`**: This package has been abandoned for over 5 years. Modern React already escapes HTML by default (preventing XSS on the frontend). For the backend, strict input validation (see Step 5) is the modern standard.
*   **Native `.env` Loading (Optional)**: With Node 20+, we can natively load environment variables using `node --env-file=.env server.js`, potentially allowing us to remove the `dotenv` package entirely.

## 3. Refactoring File Uploads (Cloud-Agnostic Approach)
The current implementation in `middleware/multer.js` uses `multer.diskStorage()`, which saves files to the server's local disk before uploading to Cloudinary.

*   **The Problem**: Almost all modern cloud providers (Vercel, Railway, AWS, Render) use **ephemeral file systems**. If the server restarts or scales while a file is saving to disk, the file is permanently lost.
*   **The Solution**: Switch to `multer.memoryStorage()`. This keeps the file in memory as a buffer, allowing us to stream it directly to Cloudinary using `cloudinary.uploader.upload_stream`. This is faster, safer, and platform-agnostic.

## 4. Fixing Known Bugs
The README mentions an outstanding bug: *"i am not able to update my posts from the frontend but in postman ist working"*.

*   **Action**: Investigate the frontend Axios `PUT`/`PATCH` request in the React app and compare it to the backend route and controller expectations. This is usually caused by a missing authorization header, incorrect payload structure, or a CORS issue.

## 5. API Validation Improvements
Currently, the controllers manually check for required fields (e.g., `if (!name || !email || !password)` in `authController.js`).

*   **The Problem**: Manual validation becomes messy and error-prone as schemas grow complex. It doesn't easily handle type checking (e.g., ensuring a string is a valid email or a number is within a range).
*   **The Solution**: Introduce a modern schema validation library like **Zod** or **Joi**. We will create a validation middleware that strictly enforces the expected `req.body` structure before the request even reaches the controller.

## 6. Security Header Adjustments
The current Helmet configuration is extremely strict:
```javascript
helmet.contentSecurityPolicy({
  useDefaults: false,
  directives: {
    "default-src": helmet.contentSecurityPolicy.dangerouslyDisableDefaultSrc,
    "script-src": ["'self'"],
  },
})
```
*   **Action**: Review and adjust the Content Security Policy (CSP). The current setup will block external resources like Cloudinary images, external fonts, or embedded YouTube videos (which was also mentioned as a challenge in the README). We need to whitelist necessary external domains.
