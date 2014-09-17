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
                    "CREATE TABLE IF NOT EXISTS question1 ( " +
                    "id INTEGER PRIMARY KEY AUTOINCREMENT, " +
                    "section VARCHAR(50)," +
                    "question VARCHAR(50)," +
					"optionA VARCHAR(50)," +
					"optionB VARCHAR(50)," +
					"optionC VARCHAR(50)," +
					"optionD VARCHAR(50)," +
					"optionE VARCHAR(50)," +
					"time VARCHAR(50)," +
                    "ans VARCHAR(50))";
                console.log(sql);
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
insert:function(questionModel,callback){
  //  alert("aaa"+questionModel.get('quant'));
appMains.db.transaction(
            function(tx) {

var v1 = questionModel.get('section');

var v3 = questionModel.get('question');
var v4 = questionModel.get('optionA');
var v5 = questionModel.get('optionB');
var v6 = questionModel.get('optionC');
var v7 = questionModel.get('optionD');
var v8 = questionModel.get('optionE');
var v9 = questionModel.get('time');
var v10 = questionModel.get('ans');

             var sql ='INSERT INTO question1 (section,question,optionA,optionB,optionC,optionD,optionE,time,ans) VALUES ("'+ v1 +'","'+ v3 +'","'+ v4 +'","'+ v5 +'","'+ v6 +'","'+ v7 +'","'+ v8 +'","'+ v9 +'","'+ v10 +'");';
                console.log('Creating question1 table');
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
                    "FROM question1 q " +
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

JSON.stringify(model);
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
     var questionview = new appMains.views.QuestionView({ el: $("#container-area") });
     questionview.render();
     //$('textarea').cleditor();
  },
  show: function(){
      $('#container-area').html('show questionlist');
  }
});


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
              //  question.fetch({dbOperation:'insertQ',success:function(questionAns){console.log(questionAns)}});
question.save(questionAns)

 question.fetch({dbOperation:'insertQ',success:function(data){


 }});
       //     question.fetch({dbOperation:'insertQ',success:function(data){console.log(data)}})
           //console.log(question.toJSON());

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
