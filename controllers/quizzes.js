const models = require('../db');

module.exports = {
  getQuizId: quiz => new Promise((resolve, reject) => {
    models.Quizzes.findOne({
      where: {
        name: quiz.name,
      },
    }).then((foundQuiz) => {
      resolve(foundQuiz);
    }).catch((err) => {
      reject(err);
    });
  }),
  addQuizzesToTopic: (quizzes, topic) => new Promise((resolve, reject) => {
    const addAllQuizzes = quizzes.map((quiz) => {
      return models.Quizzes.findOrCreate({
        where: {
          name: quiz.name,
        },
      }).spread((newQuiz) => {
        newQuiz.setTopic(topic);
      });
    });
    Promise.all(addAllQuizzes)
      .then((allQuizes) => {
        resolve(allQuizes);
      }).catch((err) => {
        reject(err);
      });
  }),
  addStudentScoreToQuiz: (student, test, quiz) => new Promise((resolve, reject) => {
    let quizInfo;
    let QuizId;
    let StudentId;
    module.exports.getQuizId(quiz)
      .then((foundQuiz) => {
        quizInfo = foundQuiz;
        return foundQuiz.addStudent(student);
      }).then(() => {
        return quizInfo.get('id');
      }).then((quizId) => {
        QuizId = quizId;
        return student.get('id');
      }).then((studentId) => {
        StudentId = studentId;
        // console.log(QuizId, StudentId);
      }).then(() => {
        return models.Students_Quizzes.findOne({
          where: {
            QuizId,
            StudentId,
          },
        }).then((studentQuiz) => {
          // console.log(studentQuiz);
          studentQuiz.update({
            score: test.score,
          });
        });
      }).then(() => {
        resolve();
      }).catch((err) => {
        reject(err);
      });
  }),
};
