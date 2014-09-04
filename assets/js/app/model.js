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
            question: 'how are you',
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



 var question = new Question({ question: "who are you", ans: 'c', time: '5', options:{ a:'asas',b:'asasadsdas',c:'sdssdss',d:'wwww',e:'sssssss'  }});
 var que = question.get('question');
 console.log(que);
    