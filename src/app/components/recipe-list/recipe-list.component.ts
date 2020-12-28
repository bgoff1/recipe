import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from '../../models/recipe.model';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  recipes: Observable<Recipe[]>;
  constructor(private readonly firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.recipes = this.firebaseService.getRecipes();
  }
}
