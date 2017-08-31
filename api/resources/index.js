import content from './content';
import auth from './auth';

export default function(app) {
  content(app);
  auth(app);
}
