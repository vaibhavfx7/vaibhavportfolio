# Vaibhav Kumar - Data Scientist Portfolio

This is my personal portfolio website for Vaibhav Kumar, a Data Scientist specializing in Generative AI. It showcases my skills, experience, and projects in an interactive and visually appealing format.

## Features

- **Modern & Responsive Design**: A clean, single-page layout that looks great on all devices.
- **Interactive Skills Chart**: Visual representation of skills and proficiency levels using Recharts.
- **Dynamic Navigation**: The navigation menu on the side highlights the current section as you scroll.
- **Detailed Career Timeline**: A comprehensive overview of work experience and education.
- **Built with Modern Tools**: Developed with React, TypeScript, and Tailwind CSS.

## Tech Stack

- **Frontend**: React, TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Module System**: Browser-native ES Modules with CDN-hosted dependencies (via import maps).

## How to Run Locally

This project is built with standard web technologies and doesn't require a complex build setup.

1.  **Download the project files.**
2.  **Use a local web server.** For security reasons, browsers restrict certain functionalities (like ES module imports) when opening HTML files directly from the filesystem (`file:///...`). You need to serve the files over HTTP.
    
    A simple way to do this is using the `serve` package with `npx`:
    
    ```bash
    # Make sure you have Node.js and npm installed
    # Open your terminal in the project's root directory and run:
    npx serve
    ```
    
    This will start a local server, and you can view the website at the URL provided (usually `http://localhost:3000`).

