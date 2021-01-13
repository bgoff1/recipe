import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-corner-button',
  templateUrl: './corner-button.component.html'
})
export class CornerButtonComponent {
  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly router: Router
  ) {}

  createRecipe(): void {
    this.router.navigateByUrl('/create-recipe');
  }

  loginWithGoogle() {
    this.firebaseService.signInWithGoogle();
  }

  get signedIn() {
    return this.firebaseService.signedIn;
  }
}
