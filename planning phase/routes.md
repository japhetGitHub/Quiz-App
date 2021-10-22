|  HTTP Pattern | URL pattern  | Use  |
|---------------|--------------|------|
| GET  | /  | Display homepage with all public quizzes |
| GET  | /login  | Display login page |
| GET  | /login/:id  | Redirect to /  |
| GET  | /quiz/new  | Display form for new quiz  |
| POST  | /quiz/new  | Create new quiz  |
| GET  | /quiz/:id  | Display a specific quiz  |
| POST  | /quiz/:id  | Submit answered quiz  |
| GET  | /results/:id  | Display result of quiz  |
| GET  | /quiz/:id/data  | Retrieve questions & answer for quiz  |
| GET  | /api/homepage  | Retrieve data from quizes  |


| | **STRETCH** | |
| GET  | /categories  | Display quiz categories  |
| GET  | /categories/:id  | Display quizzes of a category  |
| GET  | /leaderboard  | Display public leaderboard  |
| GET  | /quiz  | Display user quizzes  |
| GET  | /api/quiz/:id/score  | Retrieve average quiz score  |
| GET  | /results  | Display results of quizes  |
