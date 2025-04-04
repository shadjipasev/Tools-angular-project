# Tools-Co


![image](https://github.com/shadjipasev/Tools-angular-project/assets/97750298/d8a105d1-53f8-41b1-976d-183c2fd700bd)

**SPA project created for my thesis defence at the Technical University.**

## Introduction

Tools-Co is a simple yet functional platform showcasing a variety of tools categorized into **Machining Tools**, **Hand Tools**, and **Protective/Personal Equipment**.

**Key Features:**

* ⚙️**Admin Management:** Administrators have full CRUD (Create, Read, Update, Delete) capabilities for managing the tool catalog.
* 👓 **3D Visualizer**: View detailed 3D models of all tools (created with SolidWorks) directly on the details page.


## Technologies Used

This project utilizes the following technologies:

**Client (Frontend):**

* **Angular:** 14.x
* **TypeScript:** 4.7.2
* **Bootstrap:** 5.2.3

**Server (Backend):**

* **Node.js:** 17.2.0
* **Express.js:** 4.18.2
* **MongoDB:** 5.9.1

**Dependencies:**

* `bcrypt`: 5.1.0 (for password hashing)
* `jsonwebtoken`: 8.5.1 (for authentication)
* `mongoose`: 6.7.4 (for MongoDB interaction)
* `nodemon`: 2.0.20 (for development server)
* `multer`: 5.0.2 (file interceptor for handling file uploads)

## Live Demo

[https://tools-co.web.app](YOUR_LIVE_DEMO_URL_HERE)

## Installation

To run Tools-Co locally, follow these steps:

**Prerequisites:**

* **Node.js** (version 17.2.0 recommended) and **npm** (Node Package Manager) installed on your system. You can download them from [https://nodejs.org/](https://nodejs.org/).
* **Angular CLI** installed globally. If you haven't already, you can install it by running:
    ```bash
    npm install -g @angular/cli@14.2.8
    ```
* **MongoDB** installed and running on your local machine. You can find installation instructions at [https://www.mongodb.com/docs/manual/installation/](https://www.mongodb.com/docs/manual/installation/).

**Steps:**

1.  **Clone the repository:**
   ```bash
    git clone [https://github.com/shadjipasev/Tools-angular-project.git](https://github.com/shadjipasev/Tools-angular-project.git)
    cd Tools-angular-project
    ```

2.  **Install Server Dependencies:**
    ```bash
    cd server
    npm install
    ```

3.  **Configure MongoDB:**
    * Ensure your MongoDB server is running.
    * [**Important:** Here you should mention if you have any specific database name or connection string requirements. For example:]
        * "The server connects to a MongoDB database named `tools-db` running on the default port."
        * "You might need to configure the MongoDB connection string in the `.env` file in the `server` directory (if you are using environment variables)."

4.  **Run the Backend Server:**
    ```bash
    npm run dev
    ```
    This command likely uses `nodemon` to start your server in development mode.

5.  **Install Client Dependencies:**
    Open a **new terminal** window and navigate back to the project's root directory:
    ```bash
    cd ../client
    npm install
    ```

6.  **Run the Angular Frontend:**
    ```bash
    ng serve -o
    ```
    This command will build your Angular application and open it in your default web browser. You'll likely see it running on `http://localhost:4200`.

## Usage

* **Browsing Tools:** Navigate to the homepage to browse the categorized tool catalogs.
* **Viewing Details:** Log in (if you have an account) to view detailed information about each tool where you can see 3d visualized tool.
* **Profile Page:** Access your profile page after logging in.
* **Admin Features:** If you have administrator privileges, you will see options to create, edit, and delete tools within the catalogs.
---
