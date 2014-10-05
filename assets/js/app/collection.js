appMains.collection.Submitquiz = Backbone.Collection.extend({
  model: appMains.models.Submitquiz,
  save: function(module){
      
          for(var i =0; i<=module.length-1;i++)
          {
             console.log(module[i]);
              submitquiz = new appMains.models.Submitquiz(); 
              submitquiz.save(module[i],{dbOperation:'insertQuiz',success:function(data){
                 
                }});

          }
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
