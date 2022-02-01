db.createUser({
  user: 'pokus',
  pwd: 'pokus',
  roles: [
    {
      role: 'dbOwner',
      db: 'pokus',
    },
  ],
});


let error = true

let res = [
  /******************************************************************
   *      Initialize Puppies Collection
   ******************************************************************/
  db.puppies.drop(),
  db.puppies.createIndex({ myfield: 1 }, { unique: true }),
  db.puppies.createIndex({ thatfield: 1 }),
  db.puppies.createIndex({ thatfield: 1 }),
  db.puppies.insert({ myfield: 'hello', thatfield: 'testing' }),
  db.puppies.insert({ myfield: 'hello2', thatfield: 'testing' }),
  db.puppies.insert({ myfield: 'hello3', thatfield: 'testing' }),
  db.puppies.insert({ myfield: 'hello3', thatfield: 'testing' }),

  /******************************************************************
   *      Initialize Machines Collection
   ******************************************************************/
  db.machines.drop(),
  db.machines.createIndex({ myfield: 1 }, { unique: true }),
  db.machines.createIndex({ thatfield: 1 }),
  db.machines.createIndex({ thatfield: 1 }),
  db.machines.insert({ myfield: 'hello', thatfield: 'testing' }),
  db.machines.insert({ myfield: 'hello2', thatfield: 'testing' }),
  db.machines.insert({ myfield: 'hello3', thatfield: 'testing' }),
  db.machines.insert({ myfield: 'hello3', thatfield: 'testing' })
]

printjson(res)

if (error) {
  print('Error, exiting')
  quit(1)
}
