const models = require('../');

module.exports = {
  addTopics: (topics, classInfo) => new Promise((resolve, reject) => {
    const addAllTopics = topics.map((topic) => {
      return models.Topics.findOrCreate({
        where: {
          name: topic.name,
        },
      }).spread((newTopic) => {
        newTopic.setClass(classInfo);
      });
    });
    Promise.all(addAllTopics)
      .then((allTopics) => {
        resolve(allTopics);
      }).catch((err) => {
        reject(err);
      });
  }),
  getTopicId: topic => new Promise((resolve, reject) => {
    models.Topics.findOne({
      where: {
        name: topic.name,
      },
    }).then((foundTopic) => {
      resolve(foundTopic);
    }).catch((err) => {
      reject(err);
    });
  }),
};
