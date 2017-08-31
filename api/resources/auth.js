import authConfig from '../../auth/config';
import userService from '../../auth/user-service';
import jwt from 'jsonwebtoken';

export default function(app) {
  app.post('/login', (req, res) => {
    console.log(req.body.data);
    const userObj = req.body.data;

    // usually this would be a database call:
    const user = userService(userObj.email);
    
    if (typeof user === 'undefined') {
      res.status(401).json({
        status: {
          errors: [
            {
              code: 401,
              text: 'No user found'
            }
          ]
        },
        data: {}
      });
      return;
    }

    if (user.password === userObj.password) {
      const tokenObj = Object.assign({}, user);
      tokenObj.password = null;
      const token = jwt.sign(tokenObj, authConfig.jwt.secret);
      res.json({
        status: {
          code: 200
        },
        data: {
          message: 'ok',
          token
        }
      });
    } else {
      res.status(401).json({
        status: {
          errors: [
            {
              code: 401,
              text: 'Access denied.'
            }
          ]
        },
        data: {}
      });
    }
  });
}
