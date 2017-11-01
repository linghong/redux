
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose =require('mongoose');
const keys = require('../config/keys');

//fetch users from mongoose model
const User = mongoose.model('users');

passport.use(
	new GoogleStrategy({
		clientID: keys.googleClientID,
		clientSecret: keys.googleClientSecret,
		callbackURL: '/auth/google/callback'
	}, (accessToken, refreshToken, profile, done)=>{
		User.findOne({googleId: profile.id})
		.then((existingUser)=>{
			if(!existingUser){
				new User({googleId: profile.id})
					.save()
					.then(user=>done(null, user));
			} else{
				done(null, existingUser);
			}
			
		});
	}

	passport.serializeUser((user, done)=>{
		done(null, user.id);
	});

	passport.deserializedUser((id, done)=>{
		User.findById(id).then(user=>{
			done(null, user);
		});
	});		
));

