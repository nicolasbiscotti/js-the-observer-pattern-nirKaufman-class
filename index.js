import {
  Auth,
  ToastMessage,
  PermissionManager,
  Router,
} from './1-hands-on-the-problem.js';
import { collection, map, filter } from './callback';
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

collection
  .manipulate(map((v) => v * 10))
  .manipulate(filter((v) => v % 20 === 0))
  .getValues((v) => console.log(v));
