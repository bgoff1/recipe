interface RecipeBase {
  title: string;
  steps: string[];
  ingredients: string[];
  uid: string;
  creator: string;
  tags: string[];
  createdAt?: firebase.firestore.FieldValue;
}

export interface Recipe extends RecipeBase {}

export interface DBRecipe extends RecipeBase {
  ingredients: string[];
}

export interface Ingredient {
  name: string;
  quantity: string;
}
