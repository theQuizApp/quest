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
              submitquiz.save(module[i]);
              submitquiz.fetch({dbOperation:'insertQuiz',success:function(data){
                 
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
            question.save(questionAns)
            question.fetch({dbOperation:'insertQ',success:function(data){
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
            
           $('.navbar-nav li').removeClass('active');
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
   


    appMains.db = window.openDatabase("QuestDB", "1.0", "Quest DB", 200000);
    var questDAO = new appMains.dao.QuestDAO(appMains.db);
    questDAO.createTable();
    questDAO.insert();
    questDAO.createTableQuiz();  
    questDAO.insertQuiz();

})(jQuery);
