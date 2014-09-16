(function ($) {

var appMains = {
    models: {},
    views: {},
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
                    "section VARCHAR(50), " +
                    "question VARCHAR(50), " +
					"optionA VARCHAR(50), " +
					"optionB VARCHAR(50), " +
					"optionC VARCHAR(50), " +
					"optionD VARCHAR(50), " +
					"optionE VARCHAR(50), " +
					"time VARCHAR(50), " +
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

appMains.router.appRouter = Backbone.Router.extend({
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

$('textarea').cleditor();
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
        },
        events: {
            'click #submit': 'submitClicked'
        },
        submitClicked: function(ev){
             ev.preventDefault();



              var questionAns = {
                    quant: $('#sel-quant option:selected').val(),
                    dificulty:  $('#sel-dificulty option:selected').val(),
                    question: $($(".cleditorMain iframe")[0].contentWindow.document).text(),
                    aopt: $($(".cleditorMain iframe")[1].contentWindow.document).text(),
                    bopt: $($(".cleditorMain iframe")[2].contentWindow.document).text(),
                    copt: $($(".cleditorMain iframe")[3].contentWindow.document).text(),
                    dopt: $($(".cleditorMain iframe")[4].contentWindow.document).text(),
                    eopt: $($(".cleditorMain iframe")[5].contentWindow.document).text()
                };
//var fs = $.param(questionAns);

 var question = new appMains.models.Question(questionAns)
 question.fetch({dbOperation:'insertQ',success:function(data){console.log(data)}})
                return false;
        }
    });
    
 
 var router = new appMains.router.appRouter();

Backbone.history.start();

 window.appMains=appMains;
appMains.db = window.openDatabase("QuestDB", "1.0", "Quest DB", 200000);
var questDAO = new appMains.dao.QuestDAO(appMains.db);
questDAO.createTable();
questDAO.insert();
    
})(jQuery);
