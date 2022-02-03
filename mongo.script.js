
var db = connect('mongodb://pokus:pokus@192.168.254.6:27017/pokus?authSource=admin&ssl=false');
print('Database connected');

allPuppies = db.puppies.find();

//iterate the names collection and output each document
while (allPuppies.hasNext()) {
   printjson(allPuppies.next());
}
exampleResult = db.puppies.find({cute_name: /ch.*/});
db.puppies.find({cute_name: /c.*/});
db.puppies.find({cute_name: /.*ch.*/});
print('test jbl de print');

