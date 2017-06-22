module.exports = function(nano, name, design_doc){
  nano.db.get(name, function(err, body){
    if(err && err.statusCode == 404){
      console.log(name + " does not exist, creating...");
      nano.db.create(name, function(c_err, c_body){
        if(c_err){
          console.error(c_err);
          process.exit(1);
        }else{
          console.log(name + " created successfully!");
          if(design_doc){
            var db = nano.db.use(name);
            db.insert(design_doc.doc, '_design/' + design_doc.name, function(err, res){
              if(d_err){
                console.log(d_err);
                process.exit(1);
              }else{
                return db;
              }
            });
          }else{
            return nano.db.use(name);
          }
          return nano.db.use(name);
        }
      });
    }else{
      console.log(name + " already exists...Using that...");
      return nano.db.use(name);
    }
  });
}
