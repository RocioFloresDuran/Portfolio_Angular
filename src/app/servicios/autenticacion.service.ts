import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  constructor(private auth: Auth) {}


  login({ email, password }: any) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  

  logout(){
    return signOut(this.auth);
  }

  usuarioLogueado() {
    if (localStorage.getItem('user') != null) {
      console.log(JSON.parse(localStorage.getItem('user')!) + ' ESTÁ LOGGED');
      return true;
    } else {
      console.log(JSON.parse(localStorage.getItem('user')!) + ' NO Está LOGGED :(((')
      return false;
    }
  }

}
