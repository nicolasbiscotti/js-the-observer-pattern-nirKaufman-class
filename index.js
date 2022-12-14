import {
  Auth,
  ToastMessage,
  PermissionManager,
  Router,
} from './1-hands-on-the-problem.js';
import { collection } from './3-callback';
import { fromArray, map, filter } from './3.1-callback.js';
// Import stylesheets
import './style.css';

// Write Javascript code!
const appDiv = document.getElementById('app');
appDiv.innerHTML = `<h1>JS Starter</h1>`;

const auth = new Auth();

const toast = new ToastMessage();
const permissionManager = new PermissionManager();
const router = new Router();

// suscribe
auth.suscribe(permissionManager);
auth.suscribe(router);

auth.signIn();
//auth.signOut();

auth.suscribe(toast);

const filterByTwentySize = (size) => size % 20 === 0;

collection
  .manipulate(map((v) => v * 10))
  .manipulate(filter(filterByTwentySize))
  .getValues((v) => console.log(v));

const characters = fromArray(['a', 'b', 'c', 'd']);
characters
  .manipulate(filter((v) => v === 'a'))
  .manipulate(map((v) => v + 'ok'))
  .getValues((v) => console.log(v));

const button = document.createElement('button');
button.click();
