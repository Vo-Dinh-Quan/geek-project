# Project Name: **Album & User Management**

## Description

This project is a web application that displays a list of albums and details of each album. It allows users to view album information, including user details (avatar, name, email), album title, and photos. Features include pagination, viewing album details, and navigating between album and user pages.

---

## Libraries & Tools Used

### 1. **Next.js** (React Framework)

* **Why I used it**: The main reason for using Next.js is that my most recent project involved Next.js, so I have become more familiar with it. I wanted to follow a modern framework pattern, and Next.js provides excellent features for building scalable and high-performance web applications. Additionally, Next.js allows for server-side rendering (SSR) and static site generation (SSG), which is highly beneficial for SEO and performance.

### 2. **React Query** (Data Fetching & State Management)

* **Why I used it**: React Query is a powerful library for managing server-state and handling asynchronous data fetching. It simplifies making API requests, caching, and synchronizing data between components, which would otherwise be repetitive with traditional React state management solutions. It automatically handles caching, background refetching, and synchronization of data without the need to write complex logic. It’s a great tool to ensure smooth and fast user experiences by providing automatic data management.

### 3. **Ant Design** (UI Component Library)

* **Why I used it**: The sample web I was tasked with building uses Ant Design for its design system. While I wasn’t familiar with Ant Design at first, I successfully applied it for this challenge. Ant Design provided a consistent and ready-to-use set of UI components like Tables, Pagination, and Cards, which accelerated the development process and gave the project a polished look right away.

### 4. **Axios** (API Requests)

* **Why I used it**: Axios is a popular library for making HTTP requests, and it offers a simple API for handling requests and responses. It’s widely used in React applications and offers helpful features like request/response interceptors, error handling, and the ability to work with promises.

### 5. **Tailwind CSS** (Utility-first CSS Framework)

* **Why I used it**: Tailwind CSS allows for rapid development and custom styling. By using utility classes, it was easy to create the desired UI components without the need to write custom CSS from scratch. Tailwind made it easy to adjust margins, padding, colors, and layouts directly in the JSX without having to deal with complex CSS files.

---

## Installation

### 1. **System Requirements**

* Node.js (>= 16.0.0)
* NPM (>= 7.x) or Yarn

### 2. **Clone the Repository**

Clone the project from GitHub:

```bash
git clone https://github.com/your-repository/albums-and-users-management.git
cd albums-and-users-management
```

### 3. **Install Dependencies**

Install the required dependencies using npm or yarn:

```bash
npm install
# or
yarn install
```

### 4. **Configuration (Optional)**

This project uses a mock API to fetch album and user data. If you want to use a real API, please replace the API URL in `src/lib/api.ts` with the appropriate endpoint.

### 5. **Run the Application**

Start the application in development mode:

```bash
npm run dev
# or
yarn dev
```

You can access the application at [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```
.
src
  └── app
      ├── albums
      │   └── [albumId]
      │   │   └── page.tsx
      │   └── page.tsx
      ├── users
      │   └── [userId]
      │   │   └── page.tsx
      │   └── page.tsx
      │── favicon.ico
      │── globals.css
      │── layout.tsx
      │── page.tsx
      ├── components
      │   ├── app-provider.tsx
      │   ├── header-bar.tsx
      │   └── sidebar.tsx
      ├── lib
      │   ├── api.ts
      │   └── avatarApi.ts
      └── queries
          ├── useAlbums.tsx
          ├── useAvatarUrl.tsx
          └── useUsers.tsx

```

---

## Approach to the Task

1. **Collecting Requirements**: I analyzed the project requirements to determine the main features needed, such as displaying a list of albums, viewing album details, and showing user information (including avatar, name, email). I also needed to implement pagination and navigation.

2. **Choosing Tools and Libraries**:

   * **Next.js** was chosen to leverage its SSR and SSG capabilities, which help in building fast and SEO-friendly applications.
   * **React Query** was selected for managing API data and asynchronous state because it simplifies fetching, caching, and synchronizing data.
   * **Ant Design** was used to speed up the UI development process. Since the sample web used Ant Design, I adhered to the design pattern, even though I wasn't initially familiar with it. After applying it, I realized it was a powerful tool to create a responsive and feature-rich interface.

3. **Routing and State Management**:

   * I utilized **Next.js routing** and **query parameters** (e.g., `?pageSize=10&current=1`) for pagination to maintain state across page reloads. This also ensured the application would display the same page when the user returns after a refresh.

4. **Image Optimization**: I used the built-in **`next/image`** component to automatically optimize and serve images in a way that ensures fast loading times without having to manually manage image sizes.

5. **Data Fetching**:

   * **React Query** was employed to handle data fetching, caching, and synchronization. I utilized **`useQuery`** to fetch album data, user data, and avatar URLs. React Query makes it easier to handle loading states, errors, and caching automatically, improving the overall user experience.

---

## Additional Features

* **Pagination**: Pagination is implemented for the album list to ensure that the user experience is smooth even with large datasets.
* **User and Album Navigation**: Users can click on album titles or user names to navigate to their respective details.
* **Responsive Layout**: The application is fully responsive and optimized for mobile devices using Ant Design's responsive design features and Tailwind's utility classes.

---

## Thank you for checking out this project!

If you have any questions or suggestions, feel free to open an issue on GitHub.
