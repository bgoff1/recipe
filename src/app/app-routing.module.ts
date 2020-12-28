import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeFormComponent } from './components/recipe-form/recipe-form.component';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { SingleRecipeComponent } from './components/single-recipe/single-recipe.component';
import { FirebaseService } from './services/firebase.service';

const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  { path: 'recipes', component: RecipeListComponent },
  {
    path: 'recipe/:id',
    component: SingleRecipeComponent,
    resolve: {
      recipe: FirebaseService
    }
  },
  {
    path: 'create-recipe',
    component: RecipeFormComponent,
    canActivate: [FirebaseService]
  },
  {
    path: 'edit-recipe/:id',
    component: RecipeFormComponent,
    canActivate: [FirebaseService],
    resolve: {
      recipe: FirebaseService
    }
  },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
