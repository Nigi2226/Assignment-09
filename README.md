🌿 GreenThumb: Your Personal Plant Care Companion

GreenThumb is a single-page application built with React, designed to help plant enthusiasts manage, track, and care for their personal indoor and outdoor plant collections. It features robust user authentication to provide a secure and personalized experience.

✨ Features

Secure Authentication: Users can register and log in using Email/Password or Google Sign-In.

User Profiles: Allows users to set a display name and optional photo URL upon registration.

Password Reset: Functionality for users to securely reset their passwords.

Protected Routes: The My Plants dashboard is protected and only accessible to authenticated users, ensuring data privacy.

Responsive UI: A modern, clean, and fully responsive interface built using Tailwind CSS and Lucide icons.

System Notifications: Includes a dynamic Toast system for user feedback on authentication actions (success, error, loading).

🛠 Technology Stack

This project is implemented as a single-file application adhering to the best practices for immersive, self-contained environments.

Frontend Framework: React (Functional Components and Hooks).

Styling: Tailwind CSS for utility-first, responsive design.

Authentication & Backend Services: Firebase Authentication for secure user registration, login, and session management.

💻 Running the Application

Since this application is designed as a single, self-contained React file (Application.jsx), it is ready to run in any standard React environment with Tailwind CSS configured, or directly within the Canvas environment where Firebase variables are auto-injected.

Key Components:

AuthProvider: Manages all Firebase Auth logic (login, register, logout, onAuthStateChanged) and state for the entire application.

Header & Footer: Provide consistent navigation and branding across all pages.

HeroSection: The primary component of the landing page, showcasing the app's features and call-to-action for sign-up/login.

Login / Register: Dedicated pages for user onboarding, including input validation and social sign-in.

AppRouter: Handles simple state-based navigation (routing) between the main pages.

👥 Data Security (Firestore Integration)

This application is set up to utilize Firebase Firestore for future data persistence. The current data storage structure paths are pre-configured to adhere to platform security rules, ensuring user data separation:

Private Data: /artifacts/{appId}/users/{userId}/{your_collection_name}

Public Data: /artifacts/{appId}/public/data/{your_collection_name}

The Plants page currently serves as a placeholder for where the actual Firestore integration and plant tracking logic would reside in a full production version.
