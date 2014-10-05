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

};


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

    var router = new appMains.router.appRouter();
debugger;
    Backbone.history.start();
    window.appMains=appMains;

    appMains.db = window.openDatabase("QuestDB", "1.0", "Quest DB", 200000);
    var questDAO = new appMains.dao.QuestDAO(appMains.db);
    questDAO.createTable();
    questDAO.insert();
    questDAO.createTableQuiz();  
    questDAO.insertQuiz();

})(jQuery);
