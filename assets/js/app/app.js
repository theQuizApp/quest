(function ($) {

var appMains = {
                models: {},
                views: {},
                collection: {},
                router: {},
                utils: {},
                dao: {}
              };

appMains.dao.QuestDAO = function(db) {
    this.db = db;
};


_.extend(appMains.dao.QuestDAO.prototype, {
createTable:function(questionModel,callback){
appMains.db.transaction(
            function(tx) {
                var sql =
                    "CREATE TABLE IF NOT EXISTS question ( " +
                    "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
                    "section VARCHAR(50)," +
                    "dificulty VARCHAR(50)," +
                    "question VARCHAR(50)," +
                            "optionA VARCHAR(50)," +
                            "optionB VARCHAR(50)," +
                            "optionC VARCHAR(50)," +
                            "optionD VARCHAR(50)," +
                            "optionE VARCHAR(50)," +
                            "time VARCHAR(50)," +
                    "ans VARCHAR(50))";
           
                tx.executeSql(sql);


             
            },
            function(tx, error) {
                alert('Transaction error ' + error);
            },
            function(tx) {
                console.log(tx);
               // callback();
            }
        );
},
createTableQuiz:function(quizModel,callback){
appMains.db.transaction(
            function(tx) {
                
                var sql2 =
                    "CREATE TABLE IF NOT EXISTS quiz ( " +
                    "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
                    "secid VARCHAR(50)," +
                    "section VARCHAR(50)," +
                    "dificulty VARCHAR(50)," +
                    "number VARCHAR(50))";

                tx.executeSql(sql2);

            },
            function(tx, error) {
                alert('Transaction error ' + error);
            },
            function(tx) {
                console.log(tx);
               // callback();
            }
        );
},
createTableAns:function(quizModel,callback){
appMains.db.transaction(
            function(tx) {
                
                var sql2 =
                    "CREATE TABLE IF NOT EXISTS quizAns ( " +
                    "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
                    "secid VARCHAR(50)," +
                    "section VARCHAR(50)," +
                    "dificulty VARCHAR(50)," +
                    "ans VARCHAR(50)," +
                    "time VARCHAR(50)," +
                    "date VARCHAR(50)," +
                    "number VARCHAR(50))";

                tx.executeSql(sql2);

            },
            function(tx, error) {
                alert('Transaction error ' + error);
            },
            function(tx) {
                console.log(tx);
               // callback();
            }
        );
},
insert:function(questionModel,callback){
  //  alert("aaa"+questionModel.get('quant'));
appMains.db.transaction(
            function(tx) {

            var v1 = questionModel.get('section');
            var v2 = questionModel.get('dificulty');
            var v3 = questionModel.get('question');
            var v4 = questionModel.get('optionA');
            var v5 = questionModel.get('optionB');
            var v6 = questionModel.get('optionC');
            var v7 = questionModel.get('optionD');
            var v8 = questionModel.get('optionE');
            var v9 = questionModel.get('time');
            var v10 = questionModel.get('ans');

             var sql ='INSERT INTO question (section,dificulty,question,optionA,optionB,optionC,optionD,optionE,time,ans) VALUES ("'+ v1 +'","'+ v2 +'","'+ v3 +'","'+ v4 +'","'+ v5 +'","'+ v6 +'","'+ v7 +'","'+ v8 +'","'+ v9 +'","'+ v10 +'");';
                console.log('Creating question table');
                tx.executeSql(sql);         
            },
            function addedRow(tx, error) {
                alert('Transaction error ' + error);
            },
            function errorHandle(tx) {
               // alert('Transaction error ' + error);
                callback();
            }
        );
},
findById: function(id, callback) {
        this.db.transaction(
            function(tx) {

                var sql = "SELECT * " +
                    "FROM question q " +
                    "WHERE q.id=:id";
                console.log(sql)
                tx.executeSql(sql, [id], function(tx, results) {
                    callback(results.rows.length === 1 ? results.rows.item(0) : null);
                });
            },
            function(tx, error) {
                alert("Transaction Error: " + error);
            }
        );
  },
  findByIdQuiz: function(id, callback) {
        this.db.transaction(
            function(tx) {

                var sql = "SELECT * " +
                    "FROM quiz q " +
                    "WHERE q.id=:id";
                console.log(sql)
                tx.executeSql(sql, [id], function(tx, results) {
                    callback(results.rows.length === 1 ? results.rows.item(0) : null);
                });
            },
            function(tx, error) {
                alert("Transaction Error: " + error);
            }
        );
  },
  insertQuiz: function(insertQuiz,callback) {

      appMains.db.transaction(
            function(tx) {

            var v1 = insertQuiz.get('secid');
            var v2 = insertQuiz.get('section');
            var v3 = insertQuiz.get('dificulty');
            var v4 = insertQuiz.get('number');

            var sq2 ='INSERT INTO quiz (secid,section,dificulty,number) VALUES ("'+ v1 +'","'+ v2 +'","'+ v3 +'","'+ v4 +'");';
              console.log('Creating quiz table');
              tx.executeSql(sq2);
            },
            function addedRow(tx, error) {
                alert('Transaction error ' + error);
            },
            function errorHandle(tx) {
               // alert('Transaction error ' + error);
                callback();
            }
        );
  },
  saveQuizAns: function(insertQuizAns,callback) {

      appMains.db.transaction(
            function(tx) {

            var v1 = insertQuiz.get('secid');
            var v2 = insertQuiz.get('section');
            var v3 = insertQuiz.get('dificulty');
            var v4 = insertQuiz.get('time');
            var v5 = insertQuiz.get('ans');
            var v5 = insertQuiz.get('date');
            var v6 = insertQuiz.get('number');

            var sq2 ='INSERT INTO quiz (secid,section,dificulty,number,ans,date,time) VALUES ("'+ v1 +'","'+ v2 +'","'+ v3 +'","'+ v4 +'","'+ v5 +'","'+ v6 +'");';
              console.log('Creating quiz table');
              tx.executeSql(sq2);
            },
            function addedRow(tx, error) {
                alert('Transaction error ' + error);
            },
            function errorHandle(tx) {
               // alert('Transaction error ' + error);
                callback();
            }
        );
  }

});

Backbone.sync = function(method, model, options) {

//JSON.stringify(model);
    var dao = new model.dao(appMains.db);

        if (options.dbOperation=='findID') {
            dao.findById(model.id, function(data) {
                options.success(data);
            });
        }

        if (options.dbOperation=='findByIdQuiz') {
            dao.findById(model.id, function(data) {
                options.success(data);
            });
        }
        
        if (options.dbOperation=='insertQ') {
            dao.insert(model, function(data) {
                options.success(data);
            });
        }
        if (options.dbOperation=='insertQuiz') {
            dao.insertQuiz(model, function(data) {
                options.success(data);
            });
        }
         if (options.dbOperation=='saveQuizAns') {
            dao.saveQuizAns(model, function(data) {
                options.success(data);
            });
        }

};
///model start//
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
//model end//

//collection start//
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
//collection end//

//views start here//
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


appMains.views.SubmitQuizRow = Backbone.View.extend({
        render: function(){
        var template = _.template( $("#submitQuizRow").html(), {} );
            this.$el.append( template );
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
        //    var submitAns = new appMains.views.SubmitAns({ el: $("#question-area") });
          //   submitAns.render();  
console.log(this);
              $('.questionView').hide();

             $.APP.startTimer('sw');
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
   
//var question = new appMains.models.Question({id:1});
//question.fetch({dbOperation:'findID',success:function(data){console.log(data)}});
//question.toJSON();


//model
appMains.models.QuestionShow = Backbone.Model.extend();
//collection
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


var i = 1;

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
        },
        nextQuestion:function(){
              
              var that = new appMains.views.QueOuterView();
               this.collection = new appMains.models.QuestionCollection(questionCollection);

               

               if(i<=this.collection.models.length-1)
               {
                 that.renderQuestionView(this.collection.models[i]);

                // that.save(this.collection.models[i],{dbOperation:'saveQuizAns',success:function(data){
                 
               // }});

                 
               } i = i+1;

       //   $('.questionView').hide()
         // $(this.el.nextSibling).show();
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

         /*   _.each(this.collection.models, function(item){
                that.renderQuestionView(item);
            }); */
        },

        renderQuestionView:function(item){
            var queInnerNextView = new appMains.views.QueInnerNextView({
                model: item
            });
            this.$el.html(queInnerNextView.render().el);
        }
    });




    appMains.db = window.openDatabase("QuestDB", "1.0", "Quest DB", 200000);
    var questDAO = new appMains.dao.QuestDAO(appMains.db);
    questDAO.createTable();
    questDAO.insert();
    questDAO.createTableQuiz();  
    questDAO.insertQuiz();
    questDAO.createTableAns();  
    questDAO.insertAns();

})(jQuery);