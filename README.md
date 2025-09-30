# 2mylink - Your Open-Source Linktree Alternative

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

**2mylink** is a powerful, open-source, and self-hostable alternative to services like Linktree. It allows you to create a personalized and easily customizable page that houses all the important links you want to share. Built with a modern tech stack, it provides a robust platform for creators, influencers, and businesses.

### ✨ **[Live Demo](https://2myl.ink/)** ✨

---

## Features

-   **🔗 Link Management:** Easily create, edit, and organize your links.
-   **➖ Dividers:** Add dividers to visually structure and group your links.
-   **👤 User Accounts:** Simple registration and account management system.
-   **🔐 Google Authentication:** Allow users to sign up and log in with their Google account for a seamless experience.
-   **👑 Admin Dashboard:** A comprehensive admin view to manage users, themes, and site settings.
-   **🎨 Public Profile Customization:**
    -   **Theme Selection:** Choose from a variety of pre-made themes to style your public page.
    -   **Premium Themes:** Offer exclusive, premium themes for subscribers.
-   **📱 QR Code Generation:** Instantly generate a QR code that points to your public profile, perfect for offline sharing.
-   **🔧 Theme Management:** Admins can create, update, and manage the availability of themes (both free and premium).
-   **💳 Subscription Management:**
    -   **Stripe Integration:** Securely handle payments and subscriptions using Stripe.
    -   Users can subscribe to premium plans to unlock special features like exclusive themes.
-   **Responsive Design:** A fully responsive and mobile-first interface that looks great on any device.

---

## Technologies Used

This project is built with a modern and powerful technology stack:

-   **Backend:** **[Laravel](https://laravel.com/)**
-   **Frontend:** **[React](https://reactjs.org/)** with **[Inertia.js](https://inertiajs.com/)**
-   **Database:** Compatible with MySQL, PostgreSQL, etc.
-   **Payments:** **[Stripe](https://stripe.com/)** for secure payment and subscription processing.

---

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have the following installed on your system:
-   PHP 8.1 or higher
-   Composer
-   Node.js & NPM
-   A database server (e.g., MySQL)

### Installation

1.  **Clone the repository**
    ```sh
    git clone [https://github.com/your-username/2mylink.git](https://github.com/your-username/2mylink.git)
    cd 2mylink
    ```

2.  **Install PHP dependencies**
    ```sh
    composer install
    ```

3.  **Install NPM dependencies**
    ```sh
    npm install && npm run build
    ```

4.  **Set up your environment file**
    -   Copy the example `.env` file.
    ```sh
    cp .env.example .env
    ```
    -   Generate your application key.
    ```sh
    php artisan key:generate
    ```

5.  **Configure your `.env` file**
    -   Update the `DB_*` variables with your database credentials.
    -   Add your Stripe API keys (`STRIPE_KEY`, `STRIPE_SECRET`).
    -   Add your Google Client ID and Secret for social authentication.
    -   Set your `APP_URL` to your local development URL.

6.  **Run database migrations**
    ```sh
    php artisan migrate
    ```

7.  **Run the development server**
    ```sh
    php artisan serve
    ```
    Your local instance should now be running at `http://127.0.0.1:8000`.

---

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

1.  **Fork the Project**
2.  **Create your Feature Branch** (`git checkout -b feature/AmazingFeature`)
3.  **Commit your Changes** (`git commit -m 'Add some AmazingFeature'`)
4.  **Push to the Branch** (`git push origin feature/AmazingFeature`)
5.  **Open a Pull Request**

Please make sure your code follows the project's coding standards and includes tests where applicable.

---

## License

Distributed under the MIT License. See `LICENSE.md` for more information.

---

## Contact

Angel Gómez - [@angel-gmz](https://www.linkedin.com/in/angel-gmz) - angel-gomez@hotmail.com

Project Link: [https://github.com/angel-gmz/2mylink](https://github.com/angel-gmz/2mylink)
