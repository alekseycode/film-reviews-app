# Film Review Website

This is a film review website that is built using React on the client-side and Node.js/Express.js with SQL on the server-side. This website allows users to read and write film reviews, search for films, and interact with other film enthusiasts. It is designed to provide an easy-to-use and visually appealing platform for film enthusiasts to share their thoughts and opinions on their favorite films.

## Installation

1. Clone the repository to your local machine using `git clone <repository-url>`.
2. Navigate to the server folder of the project by running `cd server` using the command line.
3. Install the required dependencies for the server-side by running `npm install` in the root folder.
4. Navigate back to the root folder by running `cd ..` in the command line.
5. Navigate to the client folder by running `cd client` in the root folder.
6. Install the required dependencies for the client-side by running `npm install` in the client folder.
7. Navigate back to the root folder by running `cd ..` in the command line.

## Configuration

1. Create a `.env` file in the server folder of the project.
2. Define the following environment variables in the `.env` file:

API_PORT=`<your-API-port>`  
DB_HOST=`<your-database-host>`  
DB_USER=`<your-database-username>`  
DB_PASSWORD=`<your-database-password>`  
DB_NAME=`<your-database-name>`  
DB_PORT=`<your-DB-port>`  
COOKIE_SECRET=`<your-cookie-secret>`  
ORIGIN_DOMAIN=`<your-origin-domain>`  
COOKIE_DOMAIN=`<your-cookie-domain>`

Replace `<API_PORT>` with your own port for the API.

Replace `<your-database-host>`, `<your-database-username>`, `<your-database-password>`, `<your-database-name>`, and `<your-DB-port>` with your actual database connection details.

Replace `<COOKIE_SECRET>` with your own cookie secret.

Replace `<ORIGIN_DOMAIN>` with the domain of your client.

Replace `<COOKIE_DOMAIN>` with the root of the domain that is shared by the client and server preceding with a `.` (ex: `.netlify.app`).

## Database Setup

1. Create a MySQL database with the name `<your-database-name>` as defined in the `.env` file.
2. Run the SQL script provided in the `db.sql` file located in the server folder of the project to create the necessary tables in the database.

## Usage

1. In the server folder of the project, start the server by running `npm run dev` in the command line. This will start the Express.js server on `http://localhost:<API_PORT>`.
2. Open a new command line window, navigate to the client folder by running `cd client`, and start the client-side React app by running `npm start`. This will open the website in your default web browser at `http://localhost:3000`.
3. Register for a new account or log in with an existing account.
4. Browse and search for films using the search functionality.
5. Read and write film reviews.
6. Interact with other users by leaving comments on reviews.
7. Log out when you are done using the website.

## Technologies Used

- React: A popular JavaScript library for building user interfaces.
- Node.js: A JavaScript runtime built on Chrome's V8 JavaScript engine that allows server-side JavaScript execution.
- Express.js: A fast and minimalist web application framework for Node.js that simplifies the creation of APIs.
- SQL: A powerful relational database management system for storing and retrieving data.
- ElephantSQL: A cloud-based PostgreSQL database service for easy and scalable database hosting.
- TablePlus: A user-friendly database management tool for developers.
- Axios: A popular HTTP client library for making API requests.
- bcrypt: A library for hashing and salting passwords to enhance security.
- Knex.js: A powerful ORM (Object Relational Mapper) for Node.js that simplifies database interactions.
- Bootstrap: A popular CSS framework for building responsive and modern web applications.

## License

This project is open-source.

## Contact

If you have any questions or feedback, please feel free to contact the project maintainer at <aleksey99@live.com>.
