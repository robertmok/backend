var express = require('express');
var pg = require('pg');
var Sequelize = require("sequelize");
var app = express();

var sequelize = new Sequelize('postgres://PLACE_DATABASE_URL_HERE');

sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });

var Data = sequelize.define("data", {
    date: Sequelize.STRING,
    money: Sequelize.INTEGER,
    like: Sequelize.INTEGER,
    views: Sequelize.INTEGER,
    share: Sequelize.INTEGER
});
 
Data.sync().then(function(){
    return Data.bulkCreate([
    {
        date: "01-Jan-16",
        money: 1000,
        like: 435,
        views: 6372,
        share: 398
    },
    {
        date: "01-Feb-16",
        money: 1500,
        like: 400,
        views: 8273,
        share: 937
    },
    {
        date: "01-Mar-16",
        money: 1200,
        like: 365,
        views: 9283,
        share: 493                                   
    },
    {
        date: "01-Apr-16",
        money: 1600,
        like: 288,
        views: 8392,
        share: 302                                   
    },
    {
        date: "01-May-16",
        money: 1800,
        like: 326,
        views: 2384,
        share: 238                                   
    },
    {
        date: "01-Jun-16",
        money: 1300,
        like: 389,
        views: 3749,
        share: 293                                   
    },
    {
        date: "01-Jul-16",
        money: 1100,
        like: 425,
        views: 3927,
        share: 492                                   
    },
    {
        date: "01-Aug-16",
        money: 1300,
        like: 187,
        views: 3398,
        share: 376                                   
    },
    {
        date: "01-Sep-16",
        money: 1800,
        like: 501,
        views: 4587,
        share: 283                                   
    },
    {
        date: "01-OCT-16",
        money: 1200,
        like: 287,
        views: 2937,
        share: 283                                   
    },
    {
        date: "01-Nov-16",
        money: 1500,
        like: 412,
        views: 8378,
        share: 763                                   
    },
    {
        date: "01-Dec-16",
        money: 1800,
        like: 509,
        views: 4893,
        share: 238                                   
    },
    {
        date: "01-Jan-17",
        money: 1000,
        like: 435,
        views: 6372,
        share: 398                                   
    },
    {
        date: "01-Feb-17",
        money: 1500,
        like: 400,
        views: 8273,
        share: 937                                   
    },
    {
        date: "01-Mar-17",
        money: 1200,
        like: 365,
        views: 9283,
        share: 493                                   
    },
    {
        date: "01-Apr-17",
        money: 1600,
        like: 288,
        views: 8392,
        share: 302                                   
    },
    {
        date: "01-May-17",
        money: 1800,
        like: 326,
        views: 2384,
        share: 238                                   
    },
    {
        date: "01-Jun-17",
        money: 1300,
        like: 389,
        views: 3749,
        share: 293                                   
    },
    {
        date: "01-Jul-17",
        money: 1100,
        like: 425,
        views: 3927,
        share: 492                                   
    },
    {
        date: "01-Aug-17",
        money: 1300,
        like: 187,
        views: 3398,
        share: 376                                   
    },
    {
        date: "01-Sep-17",
        money: 1800,
        like: 501,
        views: 4587,
        share: 283                                   
    },
    {
        date: "01-Oct-17",
        money: 1200,
        like: 287,
        views: 2937,
        share: 283                                   
    },
    {
        date: "01-Nov-17",
        money: 1500,
        like: 412,
        views: 8378,
        share: 763                                   
    },
    {
        date: "01-Dec-17",
        money: 1800,
        like: 509,
        views: 4893,
        share: 238                                   
    }
    ]);
});

Data.findOne().then(function (data) {
    console.log(data.get('date'));
});


app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));


app.get('/', function(request, response) {
  response.sendFile(__dirname + '/public/home.html');
});

app.get('/db', function (request, response) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query('SELECT * FROM data', function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       {         
           response.end(JSON.stringify(result.rows,null,4));
       }
    });
  });
});

app.get('/db/values', function (request, response) {
  var value = request.query.values;
    var sql = 'SELECT * FROM data WHERE id =' + value + 'OR money =' + value + 'OR data.like =' + value + 'OR views =' + value + 'OR share =' + value;
    pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query(sql, function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       {         
           response.end(JSON.stringify(result.rows,null,4));
       }
    });
  });
});

app.get('/db/field', function (request, response) {
  var field = request.query.field;
    var sql = 'SELECT '+ field +' FROM data';
    pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query(sql, function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       {         
           response.end(JSON.stringify(result.rows,null,4));
       }
    });
  });
});

app.get('/db/views', function (request, response) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query('SELECT data.id,views FROM data', function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       {         
           response.end(JSON.stringify(result.rows,null,4));
       }
    });
  });
});

app.get('/db/like', function (request, response) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query('SELECT data.id,data.like FROM data', function(err, results) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       {         
           response.end(JSON.stringify(results.rows,null,4));
       }
    });
  });
});



app.get("*", function(request, response) {
  response.end("404");
}); 


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


