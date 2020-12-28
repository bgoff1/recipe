import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import firebase, { auth } from 'firebase/app';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DBRecipe, Recipe } from '../models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService
  implements Resolve<AngularFirestoreDocument<Recipe>> {
  private readonly collection: AngularFirestoreCollection<Recipe>;
  private user: firebase.User = null;

  constructor(
    private readonly firestore: AngularFirestore,
    private readonly firebaseAuth: AngularFireAuth,
    private readonly http: HttpClient
  ) {
    this.collection = this.firestore.collection('recipes', recipe =>
      recipe.orderBy('createdAt')
    );
    this.collection.valueChanges({ idField: 'id' });
  }

  getRecipes(): Observable<Recipe[]> {
    return this.collection.valueChanges({ idField: 'id' });
  }

  private signIn(provider: auth.AuthProvider) {
    console.log('signing in');
    this.firebaseAuth
      .signInWithPopup(provider)
      .then(response => {
        this.user = response.user;
      })
      .catch(err => {
        console.error(err);
      });
  }

  canActivate() {
    if (this.signedIn) {
      return true;
    }
    this.signInWithGoogle();
    return false;
  }

  signInWithFacebook() {
    this.signIn(new auth.FacebookAuthProvider());
  }
  signInWithGoogle() {
    this.signIn(new auth.GoogleAuthProvider());
  }

  signOut() {
    return this.firebaseAuth.signOut();
  }

  createRecipe(recipe: Recipe) {
    if (this.signedIn) {
      const recipeDTO = {
        title: recipe.title,
        steps: recipe.steps,
        ingredients: recipe.ingredients,
        uid: this.user.uid,
        tags: recipe.tags,
        creator: this.user.displayName,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      };
      console.log(recipeDTO);
      return this.collection.add(recipeDTO);
    } else {
      this.signInWithGoogle();
      throw new Error();
    }
  }

  resolve(route: ActivatedRouteSnapshot): AngularFirestoreDocument<DBRecipe> {
    return this.collection.doc(route.params.id);
  }

  get signedIn(): boolean {
    return !!this.user;
  }
}
