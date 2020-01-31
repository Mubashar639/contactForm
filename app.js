const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
var cors = require("cors");
var morgan = require("morgan");

let db_config = {
  host: "us-cdbr-iron-east-05.cleardb.net",
  user: "b8453fed27d2dd",
  password: "c9a6a5b6",
  database: "heroku_8922c0a50b494ee"
}
let con;

console.log("app started");

const app = express();
app.use(morgan("dev"));
app.use(cors());
app.use(express.static(__dirname + "/public"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("./client/build"));

app.post("/form", (req, res) => {
  data = req.body;
  console.log("hello");
  console.log(data);

  con.query(
    "insert into form( address, area, art_selection, bathrooms, contacted_before, dining_rooms, entire_location, entryways, estimated_amount, furniture_selection, interior_finishes, kids, kitchens, living_rooms, news, offices, outdoor, project_info, space_type, structural_change, style_guidance, want_connection, zip, degree_renovation, email, firstname, lastname, phone) VALUES ( '" +
      data.address +
      "', '" +
      data.area +
      "', '" +
      data.art_selection +
      "', '" +
      data.bathrooms +
      "', '" +
      data.contacted_before +
      "', '" +
      data.dining_rooms +
      "', '" +
      data.entire_location +
      "', '" +
      data.entryways +
      "', '" +
      data.estimated_amount +
      "', '" +
      data.furniture_selection +
      "', '" +
      data.interior_finishes +
      "', '" +
      data.kids +
      "', '" +
      data.kitchens +
      "', '" +
      data.living_rooms +
      "', '" +
      data.news +
      "', '" +
      data.offices +
      "', '" +
      data.outdoor +
      "', '" +
      data.project_info +
      "', '" +
      data.space_type +
      "', '" +
      data.structural_change +
      "', '" +
      data.style_guidance +
      "', '" +
      data.want_connection +
      "', '" +
      data.zip +
      "', '" +
      data.degree_renovation +
      "', '" +
      data.email +
      "', '" +
      data.firstName +
      "', '" +
      data.lastName +
      "', '" +
      data.phone +
      "') ",
    (err, result) => {
      if (err) throw err;
      res.send({
        status: "ok",
        title: "Success",
        statement: "Thank For You Resgistration we Saved your Data"
      });
    }
  );
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`you server serve on ${port}`);
});


function handleDisconnect() {
  con = mysql.createConnection(db_config); 
                                                  

  con.connect(function(err) {              
    if(err) {                                    
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); 
    }                                     
  });                                     
                                          
  con.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { 
      handleDisconnect();                         
    } else {                                      
      throw err;                                  
    }
  });
}

handleDisconnect();