
//tab insert question
appMains.views.QuestionView = Backbone.View.extend({
        render: function(){
    		    var template = _.template( $("#questionForm").html(), {} );
                this.$el.html( template );
            },
            events: {
                'click #submit': 'submitClicked'
            },
        submitClicked: function(ev){
           ev.preventDefault();

            var questionAns = {
                  section: $('#sel-quant option:selected').val(),
                  dificulty:  $('#sel-dificulty option:selected').val(),
                  question: $('#question').val(),
                  optionA: $('#opt-a').val(),
                  optionB: $('#opt-b').val(),
                  optionC: $('#opt-c').val(),
                  optionD: $('#opt-d').val(),
                  optionE: $('#opt-e').val(),
                  time: '10',
                  ans: $('input:radio[name=opt-ans]:checked').val()
              };

            var question = new appMains.models.Question(); 

                question.save(questionAns,{dbOperation:'insertQ',success:function(data){
                    console.log(data);
                  }});
            

              return false;
        }
    });

//insert quiz row
appMains.views.SubmitQuizRow = Backbone.View.extend({
        render: function(){
        var template = _.template( $("#submitQuizRow").html(), {} );
            this.$el.append( template );
        }
      });




appMains.views.Submitquiz = Backbone.View.extend({
        render: function(){
        var template = _.template( $("#submitQuiz").html(), {} );
            this.$el.html( template );
        },
        events: {
            'click #submitQuizbtn': 'submitQuiz',
            'click #add':'addRowquiz',
            'click #remove':'removeRowquiz'
        },
        submitQuiz: function(ev){
             ev.preventDefault();
           
            var modelsarray = [];

             if(typeof(Storage) !== "undefined") {
              if (localStorage.clickcount) {
                  localStorage.clickcount = Number(localStorage.clickcount)+1;
              } else {
                  localStorage.clickcount = 1;
              }

               $(document).find('.js-repeat').each(function(){ 

                   var a = {
                        secid: localStorage.clickcount,
                        section: $(this).find('select[name=quiz-quant]').find('option:selected').val(),
                        dificulty:  $(this).find('select[name=quiz-dificulty]').find('option:selected').val(),
                        number:  $(this).find('input[name=number]').val()
                  };
                  modelsarray.push(a);
            });

            var collectionList = new appMains.collection.Submitquiz();
                collectionList.save(modelsarray);


         } 







     
             return false;
        },
        addRowquiz: function(ev){
             ev.preventDefault();
             var submitQuizRow = new appMains.views.SubmitQuizRow({ el: $("#js-repeat-row") });
                submitQuizRow.render();              
                console.log('Render addRowquiz...');
              return false;
        },
        removeRowquiz: function(ev){
          ev.preventDefault();
             $(ev.target).closest('.js-repeat').remove();
              return false;

        }        
    });

appMains.views.SubmitAns = Backbone.View.extend({
        render: function(){
        var template = _.template( $("#submitAnsTempate").html(), {} );
            this.$el.html( template );
        },
        events: {
            'click #submitAns': 'nextQuestion',
        },
        nextQuestion: function(){
            
            $.APP.stopTimer();
           var submitAns = new appMains.views.SubmitAns({ el: $("#question-area") });
           submitAns.render();  
console.log(this);
              $('.questionView').hide();

             $.APP.startTimer('sw');
        }
      });






appMains.views.QueInnerNextView = Backbone.View.extend({
    tagName:"section",
    className:"questionView clearfix",
    template:$("#submitAnsTempate").html(),
    events: {
            'click #submitAns': 'nextQuestion',
        },
    render:function () {
        var tmpl = _.template(this.template); 
        this.$el.html(tmpl(this.model.toJSON())); 
        return this;
    }
});


appMains.views.QueOuterView = Backbone.View.extend({
        el:$("#container-area"),
     
        initialize:function(){
            this.collection = new appMains.models.QuestionCollection(questionCollection);
            this.render();
        },

        render: function(){
            var that = this;
            _.each(this.collection.models, function(item){
                that.renderQuestionView(item);
            });
        },

        renderQuestionView:function(item){
            var queInnerNextView = new appMains.views.QueInnerNextView({
                model: item
            });
            this.$el.html(queInnerNextView.render().el);
        }
    });