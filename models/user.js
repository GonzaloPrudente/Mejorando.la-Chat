/* Importamos base de datos mongodb con mongoose*/
var mongoose = require('mongoose');
var request = require('request');
/* Tomamos todos los datos de usuario para guardarlos en base de datos */
var userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  avatar: String,
  link: String,
  red: String,
  redId: String,
  token: String,
  tokenSecret: String,
  pais: String,
  ip: String,
  activado: { type: Boolean, 'default': true },
  admin: { type: Boolean, 'default': false },
  online: { type: Boolean, 'default': false }
});
/* Si todo sale bien creamos el perfil del usuario y lo guardamos */
userSchema.statics.findOrCreate = function (profile, done) {
  this.findOne({ redId: profile.redId }, function (err, user) {
    if(err) return done(err);

    if(user) {      
      /*request(user.avatar, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log("avatar bueno");        
        }
        else{
          console.log("avatar malo :(");
          if(red=="facebook"){

          }
          else{

          }          
        }
      });
      user.update({redId: user.Id},{username:profile.username, avatar:profile.avatar}, function(err){
        if(err) return done(err);
      });*/
      return done(null, user);
    }

    user = new User(profile);
    user.save(done);
  });
};

/* Guardamos modelo de mongoose */

var User = mongoose.model('User', userSchema);
