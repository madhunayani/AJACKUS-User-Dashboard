# 📊 User Management Dashboard

A sleek and responsive user management dashboard built with React, Vite, and modern CSS. This project, created for the Ajackus front-end assignment, demonstrates a complete and polished solution for handling user data with full CRUD functionality.


---

## 🚀 Core Features

This dashboard isn't just functional; it's designed to provide a seamless and intuitive user experience.

*   **👤 Full CRUD Operations**: Seamlessly **Add**, **View**, **Edit**, and **Delete** users.
*   **⚡ Blazing Fast UI**: Built with **React** and powered by **Vite** for instant updates.
*   **🔍 Dynamic Search**: A real-time search bar that filters users across multiple fields instantly.
*   **↕️ Smart Sorting**: Clickable table headers to sort data by any column in ascending or descending order.
*   **📄 Advanced Pagination**: Efficiently handle large datasets with controls to navigate pages and change users per page (10, 25, 50, 100).
*   **📱 Fully Responsive Design**: A flawless experience on all devices, from large desktop monitors to mobile phones.
*   **🎨 Modern & Professional UI**: A beautiful dark-themed interface with smooth animations, gradients, and a focus on clean UX.
*   **✔️ Client-Side Validation**: Robust form validation ensures data integrity before it ever hits the API.

---

## 🛠️ Tech Stack & Tools

*   **Framework**: React.js
*   **Build Tool**: Vite
*   **HTTP Client**: Axios
*   **Styling**: CSS Modules (with JSX), Google Fonts
*   **Animations**: Animate.css
*   **Deployment**: Vercel

---

## ⚙️ Getting Started

Follow these steps to get the project up and running on your local machine.

### Prerequisites

*   Node.js (v18.x or newer)
*   npm (or yarn)

### Installation & Setup

1.  **Clone the Repository**
    ```
    git clone https://github.com/YOUR_USERNAME/AJACKUS-User-Dashboard.git
    ```

2.  **Navigate to the Project Directory**
    ```
    cd AJACKUS-User-Dashboard
    ```

3.  **Install Dependencies**
    ```
    npm install
    ```

### ▶️ Running the Application

To launch the development server, run the following command:
mpn run dev


The application will be available at `http://localhost:5173`.

---

## 📝 Assumptions Made

*   **Data Transformation**: The API endpoint `/users` provides a full `name`. This was programmatically split into `firstName` and `lastName` for better display and sorting.
*   **Mocked Data**: The API does not provide a `department`. This field was added client-side with a random value from a predefined list to fulfill the UI requirement.
*   **API Simulation**: JSONPlaceholder simulates `POST`, `PUT`, and `DELETE` requests with success responses but does not persist the data. The application state is managed locally to reflect these changes in the UI for a seamless experience.

---

## 💡 Reflections on the Project

### Challenges Faced

*   **State Synchronization**: Managing a combination of remote data (from the API) and local UI state (sorting, pagination, search filters) was a key challenge. Using `useMemo` was essential to create a derived state that recalculated efficiently only when its dependencies changed, preventing unnecessary re-renders and keeping the UI fast.
*   **Crafting a Responsive Table**: Designing a data table that is both informative on desktop and usable on mobile required a thoughtful approach. I implemented a CSS-only solution where the table transforms into a list of cards on smaller screens, using `data-label` attributes to maintain context for each piece of data.
*   **UI/UX Enhancements**: Going beyond the basic requirements to create a visually appealing and modern interface required careful selection of colors, fonts, and animations. The goal was to make the application feel professional and engaging, not just functional.

### Future Improvements

If I had more time, I would focus on:

*   **Global State Management**: Integrate a state management library like **Zustand** or **Redux Toolkit**. This would centralize the application's state and logic, making it more scalable and easier to debug as features grow.
*   **Advanced Filtering**: Implement a dedicated filter component (e.g., a pop-up or dropdown) that allows users to filter by specific departments or other criteria, instead of just the global search.
*   **Authentication**: Add a secure login/logout flow to ensure that only authorized users can access and manage the dashboard.
*   **Component Library**: Utilize a component library like **Material-UI** or **Shadcn/UI** to standardize design, improve accessibility, and speed up the development of new features.



