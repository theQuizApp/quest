(function ($) {

var appMains = {
    models: {},
    views: {},
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
                    "section VARCHAR(50), " +
                    "question VARCHAR(50), " +
                    "ans VARCHAR(50));";
                console.log(sql);
                tx.executeSql(sql);
            },
            function(tx, error) {
                alert('Transaction error ' + error);
            },
            function(tx) {
                callback();
            }
        );
},
insert:function(questionModel,callback){
appMains.db.transaction(
            function(tx) {
               var sql ="INSERT INTO question VALUES (1, 'quant', 'first question', 'a')";
                console.log('Creating question table');
                tx.executeSql(sql);
            },
            function(tx, error) {
                alert('Transaction error ' + error);
            },
            function(tx) {
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
    }

});

Backbone.sync = function(method, model, options) {

    var dao = new model.dao(appMains.db);
        if (options.dbOperation=='findID') {
            dao.findById(model.id, function(data) {
                options.success(data);
            });
        }
        if (options.dbOperation=='insertQ') {
            dao.insert(model.toJson(), function(data) {
                options.success(data);
            });
        }

};

appMains.models.Question = Backbone.Model.extend({
dao: appMains.dao.QuestDAO,
    initialize: function() {
        console.log('hi')
    }

});

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

 var questionview = new QuestionView({ el: $("#container-area") });

 questionview.render();


  },

  show: function(){
      $('#container-area').html('show questionlist');
  }

});


QuestionView = Backbone.View.extend({
        render: function(){
            // Compile the template using underscore
            var template = _.template( $("#questionForm").html(), {} );
            // Load the compiled HTML into the Backbone "el"
            this.$el.html( template );
        }
    });
    
   


 var question = new Question();
 var que = question.get('question');
 var questionlist = new QuestionList(questionlist);
 var router = new Router();

Backbone.history.start();

 console.log(que);
 window.appMains=appMains;
appMains.db = window.openDatabase("QuestDB", "1.0", "Quest DB", 200000);
var questDAO = new appMains.dao.QuestDAO(appMains.db);
questDAO.createTable();
questDAO.insert();
    
})(jQuery);