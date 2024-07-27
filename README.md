# Video-Web-Application
CSC 317 Course Project 

https://www.youtube.com/watch?v=9dkcVzhFUTc

## Purpose

This project building with HTML, JavaScript, and CSS aims to provide a seamless and interactive experience for users to explore and interact with videos.It offers various features such as video search, upload functionality, user registration, login system, and commenting capabilities.  

# Build/Run Instructions

## Build Instructions
1. Navigate/cd to the "/csc317-code-90561lkk/application" directory in terminal.
2. Run "npm install" to install the project dependencies.
3. Run the following command to install package: "npm install express-session".
4. Run the following command to install package: "npm i express-session brcypt express-flash express-mysql-session" 
5. Run the following command "npm i validator" for register validation. 
6. Install multer and ffmpeg-static for handling posts videos by running "npm i multer ffmpeg-static".
7. Set up the SQL database according to professor Souza https://www.youtube.com/watch?v=WkQM4gWJtwM&=1643s and ensure that users,comments and posts createdAt column named as "createAt".
8. Install dotenv by running "npm i dotenv" to set up the database environment.
9. Create a ".env" file to the project in "/csc317-code-90561lkk" directory
10. Copy and Modify the ".env" file according to your SQL as below. 

```.env
DB_HOST="localhost"
DB_NAME="csc317db"
DB_USER="root"
DB_PASSWORD="YourSql-password"
PORT=3000
```

## Run Instructions
1. Navigate/cd to the "/csc317-code-90561lkk/application" directory in terminal.
2. Execute "npm run builddb" to initial the database
3. Start the application by running "npm start".
4. Open your browser and enter or click http://localhost:3000/home in url.
5. Enjoy searching and using the application!
