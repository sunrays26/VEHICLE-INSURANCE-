# Vehicle Insurance System

## Overview

This project is a vehicle insurance system designed to manage insurance policies for vehicles. It includes a backend developed in MySQL Workbench and a frontend interface built using HTML, CSS, and JavaScript.

## Setup Instructions

1. **Database Setup:**
   - Open MySQL Workbench and create a new database.
   - Execute the SQL queries provided in the `main_sql.sql` file to set up the database schema.

2. **Backend Configuration:**
   - Open the `0backend.js` file in your preferred text editor.
   - Update the following parameters according to your MySQL database configuration:
     - Host
     - User
     - Database password
     - Database name

3. **Running the Backend:**
   - Open a terminal.
   - Navigate to the directory containing the project files.
   - Run the command `node .\0backend.js` to start the backend server.
   - Note the port on which the server is running.

4. **Accessing the Web Interface:**
   - Open a web browser.
   - Access the webpage using one of the following methods:
     - Copy and paste the path of the `main.html` file in the browser.
     - Enter `http://localhost:<port>/main.html` in the browser (replace `<port>` with the port on which the server is running).
     - Open `main.html` in a live server.

## Files

- `main_sql.sql`: SQL script for creating the database schema.
- `0backend.js`: Node.js backend script to handle server requests.
- `main.html`: HTML file containing the frontend interface.
- Other files: CSS and JavaScript files for styling and functionality.

## Usage

- Users can interact with the system through the web interface to manage vehicle insurance policies.
- Features may include adding new policies, updating existing ones, viewing policy details, and more.



