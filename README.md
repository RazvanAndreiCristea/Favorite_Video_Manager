# Integrated YouTube Favorite Video Manager

## Autor

Răzvan-Andrei Cristea 1115 ID CSIE student 2023-2024

## Description

This project focuses on creating a platform/application that allows users to manage and organize their favorite YouTube videos. The main goal is to provide an enhanced experience in handling preferred video content, enabling users to organize, personalize, and access their favorite videos more efficiently.

## Specifications
Backend:
- Web server using NODEjs (running on port 3001)
- RESTful APIs (CRUD operations exposed for database tables)
  - using Router in order to execute CRUD operations for each table separately
- Database using Sequelize (SQLite dialect):
  - 3 entities:
      - User (Contains id, name and email)
      - Video (Contains id, title and url)
	  - Favorites (contains 2 foreign keys to the above tables)
  - persistent (data is kept even after server restart)
  - if the file backend/db/data.db is deleted on a new run of the backend the db will be seeded with fresh data

Frontend:</br>
- Single Page Application (running on port 3000)
- Made with React.js
- Functionalities:
  - Create, edit, delete / remove users, videos and favorite videos from one user 
  - If you want to remove favorite videos for one user you need to click with the mouse on the title not on the link to select it and then press Delete Favorite

## Running instructions
1. Open a terminal in backend folder and then run npm install command
2. Run node app.js command to activate the server
3. Open another terminal and run npm install command in frontend directory
4. If the server is on in the other terminal then run npm start command in frontend directory