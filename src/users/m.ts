import { CurrentUser } from 'src/guard/current.user.interface';

export class ModifiedRequest extends Request {
  [x: string]: any;
  user: CurrentUser;
  files: any[];
}
