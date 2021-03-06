# Quiz App Project

Quiz App is an app that lets you create quizzes and share them between friends. The creator of the quiz can view and share all the results at the end of the quiz. 

The app architecture is a multi-page design with some pages acting as SPA's (e.g. create quiz mutli-page form). It was designed in terms of UI/UX, Routes/API and Database. 

## Getting Started

1. Install all dependencies (using the `npm install` command).
2. Run the development web server using the `npm start` command.
3. Go to <http://localhost:8080/> in your browser.

> Optional: Use the `npm run db:reset` command to reset and re-seed the database. 

## Tech Stack

### Backend
- ES6/Javascript
- NodeJS & Express
- Cookie-based Session Management
- RESTful routes
- PostgreSQL and pg (with promises) for the Database

### Frontend
- jQuery
- Bootstrap CSS/UI framework
- SASS for styling


## Dependencies

- chalk 2.4.x or above
- cookie-session 1.4.x or above
- dotenv 2.0.0 or above
- ejs 2.6.x or above
- express 4.17.x or above
- morgan 1.9.x or above
- pg 8.5.0 or above
- pg-native 3.0.0 or above
- sass 1.35.x or above

## Screenshots

!["Screenshot of homepage"](https://github.com/japhetGitHub/Quiz-App/blob/master/docs/homepage.png?raw=true)
!["Screenshot of a sample quiz"](https://github.com/japhetGitHub/Quiz-App/blob/master/docs/quiz.png?raw=true)
!["Screenshot of create quiz form"](https://github.com/japhetGitHub/Quiz-App/blob/master/docs/create_quiz.png?raw=true)

## Routes
|  HTTP Pattern | URL pattern  | Use  |
|---------------|--------------|------|
| GET  | /  | Display homepage with all public quizzes |
| GET  | /login  | Display login page |
| POST  | /login/:id  | Authenticate user then redirect to /  |
| GET  | /quiz/new  | Display form for new quiz  |
| POST  | /quiz/new  | Create new quiz  |
| GET  | /quiz/:id  | Display a specific quiz  |
| POST  | /quiz/:id  | Submit answered quiz  |
| GET  | /results/:id  | Display result of quiz  |
| GET  | /quiz/:id/data  | Retrieve questions & answer for quiz  |
| GET  | /api/homepage  | Retrieve data from quizes  |

## MVP Wireframes
Home Page             |  Quiz Page | Create Quiz Page
:-------------------------:|:-------------------------:|:-----------:
![homepage wireframe](https://github.com/japhetGitHub/Quiz-App/blob/master/docs/home_page_wireframe.png?raw=true)  |  ![quiz page wireframe](https://github.com/japhetGitHub/Quiz-App/blob/master/docs/quizzing_wireframe.png?raw=true) |  ![create quiz page wireframe](https://github.com/japhetGitHub/Quiz-App/blob/master/docs/createquiz_wireframe.png?raw=true)

## Future Improvements
- Add Leaderboards
- Implement Quiz Categories
- Improve error handling and vulnerabilities
