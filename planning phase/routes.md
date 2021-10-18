|  HTTP Pattern | URL pattern  | Use  |
|---------------|--------------|------|
| GET  | /  | Display homepage  |
| GET  | /login/:id  | Redirect to /  |
| GET  | /categories/all  | Display all public quizzes  |
| GET  | /quiz/new  | Display form for new quiz  |
| POST  | /quiz/new  | Create new quiz  |
| GET  | /quiz/:id  | Display a specific quiz  |
| POST  | /quiz/:id  | Submit answered quiz  |
| GET  | /results/:id  | Display result of quiz  |
| GET  | /api/quiz/:id/question  | Retrieve questions & answer for quiz  |
| | **STRETCH** | |
| GET  | /categories  | Display quiz categories  |
| GET  | /categories/:id  | Display quizzes of a category  |
| GET  | /leaderboard  | Display public leaderboard  |
| GET  | /quiz  | Display user quizzes  |
| GET  | /api/quiz/:id/score  | Retrieve average quiz score  |
| GET  | /results  | Display results of quizes  |
