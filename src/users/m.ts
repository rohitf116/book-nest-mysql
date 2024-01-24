import { CurrentUser } from 'src/guard/current.user.interface';

export class ModifiedRequest extends Request {
  user: CurrentUser;
}
