var appMains = {
                models: {},
                views: {},
                collection: {},
                router: {},
                utils: {},
                dao: {}
              };


appMains.collection.SaveQuizAns = Backbone.Collection.extend({
  model: appMains.models.SaveQuizAns,
  save: function(module){
      
         
        _.each(module, function(i) {
          var saveQuizAns = new appMains.models.SaveQuizAns(); 
              saveQuizAns.save(i,{dbOperation:'insertQuizAns',success:function(data){
                   $('.modal-body').html('Ans successfully saved');
                   $('#myModal').modal('show');
                }});
        });


      
  }
});


appMains.models.QuestionCollection = Backbone.Collection.extend({
  model:appMains.models.QuestionShow
});


var questionCollection = [
  {
      question: '1 Why this ?',
      optionA:'a',
      optionB:'b',
      optionC:'c',
      optionD:'d',
      optionE:'e'
  },
  {
      question: '2 What is this ?',
      optionA:'a',
      optionB:'b',
      optionC:'c',
      optionD:'d',
      optionE:'e'
  },
  {
      question: '3 how?',
      optionA:'a',
      optionB:'b',
      optionC:'c',
      optionD:'d',
      optionE:'e'
  },
  {
      question: '4 When ?',
      optionA:'a',
      optionB:'b',
      optionC:'c',
      optionD:'d',
      optionE:'e'
  }
];