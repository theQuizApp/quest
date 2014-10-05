appMains.models.QuestionShow = Backbone.Model.extend();

appMains.models.Question = Backbone.Model.extend({
    dao: appMains.dao.QuestDAO,
        initialize: function() {
            console.log('hi')
        }
});

appMains.models.Submitquiz = Backbone.Model.extend({
  dao: appMains.dao.QuestDAO,
        initialize: function() {
            console.log('bye')
        }
   
});