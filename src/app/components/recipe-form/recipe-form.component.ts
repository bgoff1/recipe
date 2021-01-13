import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { ActivatedRoute, Router } from '@angular/router';
import { first, takeWhile } from 'rxjs/operators';
import { Recipe } from '../../models/recipe.model';
import { ViewMode } from '../../models/view-mode.model';
import { FirebaseService } from '../../services/firebase.service';
import { minLengthArray } from '../../util/min-length.util';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html'
})
export class RecipeFormComponent implements OnInit {
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  private viewMode: ViewMode;
  private id: string;
  formGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    tags: new FormArray([]),
    steps: new FormArray([], minLengthArray(1)),
    currentStep: new FormControl(''),
    ingredients: new FormArray([], minLengthArray(1)),
    currentIngredient: new FormControl('')
  });
  @ViewChild('currentInput') currentInput: ElementRef;

  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.viewMode = this.route.snapshot.params.id
      ? ViewMode.UPDATE
      : ViewMode.CREATE;

    if (this.route.snapshot.params.id) {
      this.route.snapshot.data.recipe
        .valueChanges()
        .pipe(first())
        .subscribe((recipe: Recipe) => {
          this.title.setValue(recipe.title);
          this.patchFormArray(this.tags, recipe.tags);
          this.patchFormArray(this.ingredients, recipe.ingredients);
          this.patchFormArray(this.steps, recipe.steps);
        });
    }
  }

  patchFormArray(array: FormArray, values: string[]): void {
    for (const value of values) {
      array.push(new FormControl(value.trim()));
    }
  }

  addChip(event: MatChipInputEvent, type: 'tag' | 'step' | 'ingredient'): void {
    const input = event.input;
    const value = event.value;

    if (value?.trim()) {
      this.getFormArrayType(type).push(new FormControl(value.trim()));
    }

    if (input) {
      input.value = '';
    }
  }

  removeChip(index: number) {
    this.tags.removeAt(index);
  }

  getFormArrayType(type: 'tag' | 'step' | 'ingredient'): FormArray {
    switch (type) {
      case 'tag':
        return this.tags;
      case 'step':
        return this.steps;
      case 'ingredient':
        return this.ingredients;
    }
  }

  getCurrentValue(type: 'step' | 'ingredient'): FormControl {
    switch (type) {
      case 'step':
        return this.currentStep;
      case 'ingredient':
        return this.currentIngredient;
    }
  }

  save() {
    if (
      this.title.value &&
      this.ingredients.value.length &&
      this.steps.value.length
    ) {
      const payload = {
        title: this.title.value,
        tags: this.tags.value,
        ingredients: this.ingredients.value,
        steps: this.steps.value,
        uid: null,
        creator: null
      };
      const promise =
        this.viewMode === ViewMode.CREATE
          ? this.firebaseService.createRecipe(payload)
          : this.firebaseService.updateRecipe(payload, this.id);
      promise
        .then(() => {
          this.router.navigateByUrl('/recipes');
        })
        .catch(err => console.error(err));
    }
  }

  get title() {
    return this.formGroup.controls.title;
  }

  get tags(): FormArray {
    return this.formGroup.controls.tags as FormArray;
  }

  get steps(): FormArray {
    return this.formGroup.controls.steps as FormArray;
  }

  get ingredients(): FormArray {
    return this.formGroup.controls.ingredients as FormArray;
  }

  get currentStep(): FormControl {
    return this.formGroup.controls.currentStep as FormControl;
  }

  get currentIngredient(): FormControl {
    return this.formGroup.controls.currentIngredient as FormControl;
  }
}
