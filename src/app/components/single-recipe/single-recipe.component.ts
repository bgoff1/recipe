import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeWhile } from 'rxjs/operators';
import { Recipe } from '../../models/recipe.model';

@Component({
  selector: 'app-single-recipe',
  templateUrl: './single-recipe.component.html',
  styles: []
})
export class SingleRecipeComponent implements OnInit {
  recipe: Recipe;
  alive = true;
  id: string;

  constructor(private readonly route: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.route.snapshot.data.recipe
      .valueChanges()
      .pipe(takeWhile(() => this.alive))
      .subscribe((recipe: Recipe) => {
        this.recipe = recipe;
      });
  }
}
