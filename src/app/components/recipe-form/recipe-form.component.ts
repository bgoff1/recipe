import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { Router } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss']
})
export class RecipeFormComponent {
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  formGroup = new FormGroup({
    title: new FormControl(''),
    tags: new FormArray([]),
    steps: new FormArray([]),
    currentStep: new FormControl(''),
    ingredients: new FormArray([]),
    currentIngredient: new FormControl('')
  });
  @ViewChild('currentInput') currentInput: ElementRef;

  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly router: Router
  ) {}

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
    this.firebaseService
      .createRecipe({
        title: this.title.value,
        tags: this.tags.value,
        ingredients: this.ingredients.value,
        steps: this.steps.value,
        uid: null,
        creator: null
      })
      .then(() => {
        this.router.navigateByUrl('/recipes');
      })
      .catch(() => {});
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
