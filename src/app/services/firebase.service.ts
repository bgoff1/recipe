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

  getRecipeById(id: string) {
    return this.collection.doc(id).ref.get();
  }

  private async signIn(provider: auth.AuthProvider) {
    try {
      const response = await this.firebaseAuth.signInWithPopup(provider);
      this.user = response.user;
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  async canActivate() {
    // if (this.signedIn) {
      return true;
    // }
    // return this.signInWithGoogle();
  }

  signInWithGoogle() {
    return this.signIn(new auth.GoogleAuthProvider());
  }

  signOut() {
    return this.firebaseAuth.signOut();
  }

  async createRecipe(recipe: Recipe) {
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
      await this.collection.add(recipeDTO);
    } else {
      this.signInWithGoogle();
      throw new Error();
    }
  }

  updateRecipe(recipe: Recipe, id: string) {
    if (this.signedIn) {
      const recipeDTO = {
        title: recipe.title,
        steps: recipe.steps,
        ingredients: recipe.ingredients,
        uid: this.user.uid,
        tags: recipe.tags,
        creator: this.user.displayName
      };
      return this.collection.doc(id).update(recipeDTO);
    } else {
      this.signInWithGoogle();
      throw new Error();
    }
  }

  deleteRecipe(id: string) {
    if (this.signedIn) {
      return this.collection.doc(id).delete();
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
