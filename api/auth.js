import passport from 'passport';
import {
	Strategy as JwtStrategy,
	ExtractJwt
} from 'passport-jwt';
import jwt from 'jsonwebtoken';
import authConfig from '../auth/config';
import userService from '../auth/user-service';

export function requireRoles(roles) {
	return function(req, res, next) {
		if (req.user) {
			// TODO: Check required roles against user roles
			if (roles.indexOf(req.user.role) < 0 && req.user.role !== authConfig.general.adminRole) {
				res.status(403).json({
					status: {
						code: 403,
						message: 'Unauthorized'
					}
				});

			} else {
				next();
			}
		} else {
			res.status(401).json({
				status: {
					code: 401,
					message: 'Unauthenticated'
				}
			});
		}
	}
}

export function requireAuth(req, res, next) {

	passport.authenticate('jwt', function(err, user, info) {
		if (err) { return next(err); }
		if (!user) {
			res.status(401).json({
				status: {
					code: 401,
					message: 'Unauthorized'
				}
			});
		} else {
			req.logIn(user, {session: false}, function(err) {
				if (err) { return next(err); }
				next();
			});
		}
	})(req, res, next);
}

export function authExpress(app) {

	var opts = {
		jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
		secretOrKey: authConfig.jwt.secret,
		issuer: authConfig.jwt.issuer,
		audience: authConfig.jwt.audience
	};

	passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
		userService(jwt_payload.email).then(function(user){
			console.log(jwt_payload);
			if (user) {
				done(null, user);
			} else {
				done(null, false);
			}

		});
	}));

	app.use(passport.initialize());
	// app.all('*', requireAuth);
};
