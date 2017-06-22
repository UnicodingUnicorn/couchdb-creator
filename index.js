module.exports = function(nano, name){
  nano.db.get(name, function(err, body){
    if(err && err.statusCode == 404){
      console.log(name + " does not exist, creating...");
      nano.db.create(name, function(c_err, c_body){
        if(c_err){
          console.error(c_err);
          process.exit(1);
        }else{
          console.log(name + " created successfully!");
          return nano.db.use(name);
        }
      });
    }else{
      console.log(name + " already exists...Using that...");
      return nano.db.use(name);
    }
  });
}
