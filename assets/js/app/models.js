var appMains = {
                models: {},
                views: {},
                collection: {},
                router: {},
                utils: {},
                dao: {}
              };
              
appMains.models.Question = Backbone.Model.extend({
    dao: appMains.dao.QuestDAO,
        initialize: function() {
            console.log('hi')
        }
});



appMains.models.SaveQuizAns = Backbone.Model.extend({
  dao: appMains.dao.QuestDAO,
        initialize: function() {
            console.log('save')
        }
   
});

appMains.models.QuestionShow = Backbone.Model.extend();