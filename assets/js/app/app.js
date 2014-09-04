(function ($) {

var questionlist = [{section: {quant:{ds:'ds',ps:'ps'},verbal:{sc:'sc',rc:'rc',cr:'cr'}},question: 'defaults question',ans:{options: {
                    a:true,b:false,c:false,d:false,e:false,all:false}},time: 0,options: {a:'what',b:'how',c:'when',d:'where',e:'which'
},dificulty: {high:false,medium:true, easy:false}},{section: {quant:{ds:'ds',ps:'ps'},verbal:{sc:'sc',rc:'rc',cr:'cr'}},question: '1 question',ans:{options: {
                    a:true,b:false,c:false,d:false,e:false,all:false}},time: 0,options: {a:'what',b:'how',c:'when',d:'where',e:'which'
},dificulty: {high:false,medium:true, easy:false},section: {quant:{ds:'ds',ps:'ps'},verbal:{sc:'sc',rc:'rc',cr:'cr'}},question: '2 question',ans:{options: {
                    a:true,b:false,c:false,d:false,e:false,all:false}},time: 0,options: {a:'what',b:'how',c:'when',d:'where',e:'which'
},dificulty: {high:false,medium:true, easy:false}}];

   

   var Question = Backbone.Model.extend({
        defaults: {
            section: {
                quant:{
                    ds:'ds',
                    ps:'ps'
                },
                verbal:{
                    sc:'sc',
                    rc:'rc',
                    cr:'cr'
                }
            },
            question: 'defaults question',
            ans: {
                options: {
                    a:true,
                    b:false,
                    c:false,
                    d:false,
                    e:false,
                    all:false
                }
            },
            time: 0,
            options: {
                a:'what',
                b:'how',
                c:'when',
                d:'where',
                e:'which'
            },
            dificulty: {
                high:false,
                medium:true,
                easy:false
            }
        },
        initialize: function(){
            console.log("Welcome to this world");
        },
         insertQuestion: function( question ){
            this.set({ question: newQuestion }); 
        }
    });

var QuestionList = Backbone.Collection.extend({
    model:Question
});

var Router = Backbone.Router.extend({
  routes: {
      '': 'home',
      'insert': 'insertQuestionForm',
      'show': 'show'
  },

  home: function(){
  
  },

  insertQuestionForm: function(){
     $('#container-area').html('insert question form');
  },

  show: function(){
      $('#container-area').html('show questionlist');
  }

});




 var question = new Question();
 var que = question.get('question');
 var questionlist = new QuestionList(questionlist);
 var router = new Router();

Backbone.history.start();

 console.log(que);
    


    
})(jQuery);