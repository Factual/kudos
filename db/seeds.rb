# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
users = User.create([
  {
     provider: 'manual',
     uid: 1,
     name: "Obi Wan Kenobi",
     email: "kenobi@jedi.gov",
     avatar: "http://f.tqn.com/y/scifi/1/W/3/n/-/-/EP2-IA-60435_R_8x10.jpg"
   },
   {
     provider: 'manual',
     uid: 7567,
     name: "Captain Rex",
     email: "rex@clones.gov",
     avatar: "http://vignette1.wikia.nocookie.net/starwarsrepublicclonetroopers/images/c/cd/Clone_Captain_Rex.jpg/revision/latest?cb=20110606002335"
   }
])
kenobi = users[0]
rex = users[1]

kudos = Kudo.create([
  {
    body: "Great job fighting off the droids on Kamino, Captain Rex.",
    giver_id: kenobi.id
  },
  {
    body: "Thanks for having my back Commander.",
    giver_id: rex.id,
  }
])

KudoReceipt.create([
  { kudo_id: kudos[0].id, receiver_id: rex.id },
  { kudo_id: kudos[1].id, receiver_id: kenobi.id }
])
