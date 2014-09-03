var Question = Backbone.Model.extend({
        defaults: {
            question: 'how are you',
            ans: 'asas',
            time: 0,
            options: {
            	a:'a',
            	b:'b',
            	c:'c',
            	d:'d',
            	e:'e'
            }
        },
        initialize: function(){
            console.log("Welcome to this world");
        },
         insertQuestion: function( question ){
            this.set({ question: newQuestion }); 
        }
    });



 var question = new Question({ question: "who are you", ans: 'c', time: '5', options:{ a:'asas',b:'asasadsdas',c:'sdssdss',d:'wwww',e:'sssssss'  }});
 var que = question.get('question');
 console.log(que);
    