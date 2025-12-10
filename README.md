# 💎 GYMGEM - The Ultimate Fitness Ecosystem

![Project Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-0.0.0-blue)

**GYMGEM** is a comprehensive, all-in-one platform designed to bridge the gap between Gyms, Trainers, Trainees, and Fitness Stores. Whether you're looking to manage your fitness business, find the perfect trainer, enroll in specialized courses, or shop for premium gear, GYMGEM provides a seamless and tailored experience for every user.

## 🚀 Features

### 👥 For Everyone
*   **Unified Ecosystem**: A single platform connecting all stakeholders in the fitness industry.
*   **Community Hub**: Connect, share, and grow with a vibrant community of fitness enthusiasts.
*   **Secure Authentication**: robust login and role-based access control.

### 🏋️‍♂️ For Trainers
*   **Professional Dashboard**: Manage clients, schedules, and profile visibility from a dedicated command center.
*   **Course Creation**: Design and sell fitness courses with support for video lessons and sections.
*   **Client Management**: Track trainee progress and manage specialized training plans.

### 🏃‍♀️ For Trainees
*   **Personalized Dashboard**: Track your fitness journey, upcoming sessions, and favorite courses.
*   **Course Enrollment**: Browse and enroll in courses tailored to your goals.
*   **Find Your Match**: Advanced search to find trainers and gyms that fit your specific needs.
*   **Review System**: Rate and review trainers and courses.

### 🏢 For Gyms
*   **Gym Management**: Oversee members, sessions, and classes efficiently.
*   **Staff Management**: Manage trainers and staff profiles linked to your gym.
*   **Analytics**: Gain insights into gym performance and member engagement.

### 🛍️ For Stores
*   **E-commerce Platform**: Full-featured store dashboard to manage products and inventory.
*   **Order Management**: Track and fulfill orders seamlessly.
*   **Marketplace Integration**: Reach a targeted audience of fitness lovers.

## 🛠️ Tech Stack

This project is built with the latest modern web technologies for performance and scalability.

*   **Core**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/) - Lightning fast frontend tooling.
*   **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) - Utility-first CSS framework for rapid UI development.
*   **Routing**: [React Router Dom 7](https://reactrouter.com/) - Dynamic client-side routing.
*   **Animations**: [Framer Motion](https://www.framer.com/motion/) - Production-ready motion library for React.
*   **Icons**: [Lucide React](https://lucide.dev/), [React Icons](https://react-icons.github.io/react-icons/), [FontAwesome](https://fontawesome.com/).
*   **Forms**: [React Hook Form](https://react-hook-form.com/) - Performant, flexible and extensible forms.
*   **Networking**: [Axios](https://axios-http.com/) - Promise based HTTP client.
*   **UI Components**: [Swiper](https://swiperjs.com/) - Modern mobile touch slider.

## 📦 Installation & Setup

Follow these steps to get the project running on your local machine.

### Prerequisites
*   Node.js (v18 or higher recommended)
*   npm or yarn

### Steps

1.  **Clone the repository**
    ```bash
    git clone https://github.com/MahmoudG25/GYMGEM-FrontEnd-Public.git
    cd GYMGEM-FrontEnd-Public
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Start the development server**
    ```bash
    npm run dev
    ```

4.  **Open your browser**
    Navigate to `http://localhost:5173` (or the port shown in your terminal).

## 📂 Project Structure

```bash
src/
├── assets/         # Static assets (images, icons)
├── components/     # Reusable UI components
│   ├── Dashboard/  # Role-specific dashboard components (Trainer, Trainee, GPU, Store)
│   ├── Forms/      # Application forms (Trainer, Trainee registration)
│   ├── courses/    # Course related components
│   └── ...
├── context/        # React Context providers (Auth, Theme, etc.)
├── hooks/          # Custom React hooks
├── Layout/         # Layout wrappers (RootLayout, etc.)
├── pages/          # Main application pages (Home, Profile, Dashboard, etc.)
├── utils/          # Utility functions and helpers
├── App.jsx         # Main application component with Routes
└── main.jsx        # Entry point
```

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">
  Built with ❤️ by the GYMGEM Team
</p>
