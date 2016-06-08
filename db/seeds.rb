# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.create([
  {
     id: 1,
     provider: 'manual',
     uid: 1,
     name: "Obi Wan Kenobi",
     avatar: "http://f.tqn.com/y/scifi/1/W/3/n/-/-/EP2-IA-60435_R_8x10.jpg"
   },
   {
     id: 2,
     provider: 'manual',
     uid: 7567,
     name: "Captain Rex",
     avatar: "http://vignette1.wikia.nocookie.net/starwarsrepublicclonetroopers/images/c/cd/Clone_Captain_Rex.jpg/revision/latest?cb=20110606002335"
   }
])

Kudo.create([
  {
    id: 1,
    body: "Great job fighting off the droids on Kamino, Captain Rex.",
    giver_id: 1,
    receiver_id: 2
  },
  {
    id: 2,
    body: "Thanks for having my back Commander.",
    giver_id: 2,
    receiver_id: 1
  }
])
