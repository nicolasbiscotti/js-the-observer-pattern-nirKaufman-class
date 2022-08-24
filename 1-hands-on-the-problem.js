class Publisher {
  constructor() {
    this.suscribers = new Set();
  }

  publish(state) {
    this.suscribers.forEach((suscriber) => suscriber.update(state));
  }

  suscribe(suscriber) {
    this.suscribers.add(suscriber);
  }

  unsuscribe(suscriber) {
    this.suscribers.delete(suscriber);
  }
}

class StatefulPublisher extends Publisher {
  constructor(initialState) {
    super();
    this.state = initialState;
  }

  publish(state) {
    this.state = state;
    super.publish(state);
  }

  suscribe(suscriber) {
    suscriber.update(this.state);
    super.suscribe(suscriber);
  }
}

// Holds a state (currentUser), and expose...
export class Auth extends StatefulPublisher {
  constructor() {
    super(null);
    this.currentUser = null;
  }

  signIn() {
    this.currentUser = { name: 'Nicolás' };
    this.publish(this.currentUser);
  }

  signOut() {
    this.currentUser = null;
    this.publish(this.currentUser);
  }
}

// TODO: When a user logged in - show a message with the user name
export class ToastMessage {
  update(user) {
    if (user !== null) {
      this.showToast('Hello ' + user.name);
    }
  }

  showToast(message) {
    console.log('Display toast message: ' + message);
  }
}

// TODO: When a user logged in - fetch a permissions
export class PermissionManager {
  update(user) {
    if (user !== null) {
      this.getPermissionForUser(user);
    }
  }

  getPermissionForUser(user) {
    console.log('Fetching permission for: ' + JSON.stringify(user));
  }
}

// TODO: When a user logged in - route to dashboard
// TODO: When a user logged out - route back to login screen
export class Router {
  update(user) {
    if (user) {
      this.redirectTo('Dashboard');
    } else {
      this.redirectTo('login screen');
    }
  }

  redirectTo(routeName) {
    console.log('Redirecting to ' + routeName);
  }
}

// runtime
var auth = new Auth();

var toast = new ToastMessage();
var permissionManager = new PermissionManager();
var router = new Router();

// suscribe
auth.suscribe(permissionManager);
auth.suscribe(router);

auth.signIn();
//auth.signOut();

auth.suscribe(toast);
