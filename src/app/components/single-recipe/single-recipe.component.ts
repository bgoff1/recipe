import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { takeWhile } from 'rxjs/operators';
import { Recipe } from '../../models/recipe.model';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-single-recipe',
  templateUrl: './single-recipe.component.html',
  styleUrls: ['./single-recipe.component.scss']
})
export class SingleRecipeComponent implements OnInit {
  recipe: Recipe;
  alive = true;
  id: string;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    public readonly dialog: MatDialog,
    private readonly firebaseService: FirebaseService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.route.snapshot.data.recipe
      .valueChanges()
      .pipe(takeWhile(() => this.alive))
      .subscribe((recipe: Recipe) => {
        this.recipe = recipe;
      });
  }

  editRecipe() {
    this.router.navigateByUrl(`/edit-recipe/${this.id}`);
  }

  deleteRecipe() {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      data: this.recipe.title
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.firebaseService.deleteRecipe(this.id).then(() => {
          this.router.navigateByUrl('/recipes');
        });
      }
    });
  }
}

@Component({
  selector: 'confirm-dialog',
  templateUrl: './confirm-dialog.html'
})
export class ConfirmDialog {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialog>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
