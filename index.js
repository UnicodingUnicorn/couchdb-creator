module.exports = function(nano, name, design_doc, cb){
  var args = [];
  for(var i = 0; i < arguments.length; i++){
    args.push(arguments[i]);
  }
  nano = args.shift();
  name = args.shift();
  cb = args.pop();
  design_doc = args.length > 0 ? args.shift() : null;

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
            db.insert(design_doc.doc, '_design/' + design_doc.name, function(d_err, d_body){
              if(d_err){
                console.log(d_err);
                process.exit(1);
              }else{
                cb(db);
              }
            });
          }else{
            cb(nano.db.use(name));
          }
          cb(nano.db.use(name));
        }
      });
    }else{
      console.log(name + " already exists...Using that...");
      cb(nano.db.use(name));
    }
  });
}
