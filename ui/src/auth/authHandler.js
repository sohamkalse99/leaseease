import Cookies from 'js-cookie';

class AuthService {

  setSession(token, id) {
    Cookies.set('jwt', token);
    Cookies.set('id', id);
  }

  logout() {
    Cookies.remove('jwt');
  }

  getToken() {
    return Cookies.get('jwt');
  }

  getId() {
    return Cookies.get('id');
  }
  
  isAuthenticated() {
    return (Cookies.get('jwt') !== null && Cookies.get('jwt') !== undefined)
  }
}

//Singleton
const authHandler = new AuthService();
export default authHandler;
