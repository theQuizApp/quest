var appMains = {
                models: {},
                views: {},
                collection: {},
                router: {},
                utils: {},
                dao: {}
              };
              
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
                  $('.modal-body').html('Question Added successfully ' + data);
                  $('#myModal').modal('show');

                  },
                  error:function(){
                      $('.modal-body').html('ERROR ');
                      $('#myModal').modal('show');

                  }});            

              return false;
        }

    });


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

          // var submitAns = new appMains.views.SubmitAns({ el: $("#question-area") });
          //     submitAns.render();  

           var questionInner = new appMains.views.QueOuterView();
          $('.questionView').hide();
          $('.questionView:first').show();
               $.APP.startTimer('sw');
                
              return false;
        },
        addRowquiz: function(ev){
             ev.preventDefault();
             var submitQuizRow = new appMains.views.SubmitQuizRow({ el: $("#js-repeat-row") });
                submitQuizRow.render();               
                  
              return false;
        },
        removeRowquiz: function(ev){
          ev.preventDefault();
             $(ev.target).closest('.js-repeat').remove();
              return false;

        }        
    });
    //view end here
    //router start here
    appMains.router.appRouter = Backbone.Router.extend({
        routes: {
            '': 'home',
            'insert': 'insertQuestionForm',
            'show': 'show'
        },
        home: function(){

        },
        insertQuestionForm: function(){
           var questionview = new appMains.views.QuestionView({ el: $("#container-area") });
           questionview.render();
          
           $('#question').cleditor({ 
                    height: 200, // height not including margins, borders or padding
                    controls: // controls to add to the toolbar
                    "bold italic underline strikethrough subscript superscript | font size " +
                    "style | color highlight removeformat | bullets numbering | outdent " +
                    "indent | alignleft center alignright justify | undo redo | " +
                    "rule image | source"})

          // $('.navbar-nav li').removeClass('active');
        },
        show: function(){
            var submitquiz = new appMains.views.Submitquiz({ el: $("#container-area") });
           submitquiz.render();
        }
    });
    //router end here

    var router = new appMains.router.appRouter();

    Backbone.history.start();
    window.appMains=appMains;


//model

//collection






var i = 0;
var sarr = [];

appMains.views.QueInnerNextView = Backbone.View.extend({
        tagName:"section",
        className:"questionView clearfix",
        template:$("#submitAnsTempate").html(),
       events: {
            'click #submitAns': 'nextQuestion',
            'click #submitColl': 'nextQuestion',
        },
        render:function () {
            var tmpl = _.template(this.template); 
            this.$el.html(tmpl({
      question: '1 Why this ?',
      optionA:'a',
      optionB:'b',
      optionC:'c',
      optionD:'d',
      optionE:'e'
  })); 
            return this;
        },
        nextQuestion:function(ev){
            
              var that = new appMains.views.QueOuterView();
               this.collection = new appMains.models.QuestionCollection(questionCollection);

               
               if(i<this.collection.models.length)
               {
                  var saveAnsM = {
                            ans: this.$el.find('input:radio[name=optionsAns]:checked').val(),
                            time: this.$el.find('#sw_h').text()+':'+this.$el.find('#sw_m').text()+':'+this.$el.find('#sw_s').text()+':'+this.$el.find('#sw_ms').text()

                        }
                  sarr.push(saveAnsM);

                  that.renderQuestionView(this.collection.models[i]);
                 
                  i = i+1;
  
               }
               else
               {
                  this.submitColletion(sarr);
                $('#submitColl').removeClass('hidden');
                 $('#submitAns').addClass('hidden');
                  //$.APP.stopTimer('sw');
              
               }

           },
           submitColletion:function(item){
        
                var collectionList = new appMains.collection.SaveQuizAns();
                collectionList.save(item);
        

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
               that.renderQuestionView(this.collection.models[0]);
        },
        renderQuestionView:function(item){
            var queInnerNextView = new appMains.views.QueInnerNextView({
                model: item
            });
            this.$el.html(queInnerNextView.render().el);
          }
    });
