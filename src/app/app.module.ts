import { ScrollingModule as ExperimentalScrollingModule } from '@angular/cdk-experimental/scrolling';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
  MatChipsModule,
  MAT_CHIPS_DEFAULT_OPTIONS
} from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'firebase/auth';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CornerButtonComponent } from './components/corner-button/corner-button.component';
import { ListComponent } from './components/list/list.component';
import { RecipeFormComponent } from './components/recipe-form/recipe-form.component';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import {
  ConfirmDialog,
  SingleRecipeComponent
} from './components/single-recipe/single-recipe.component';
import { CreatedAtPipe } from './created-at.pipe';
@NgModule({
  declarations: [
    AppComponent,
    CornerButtonComponent,
    RecipeListComponent,
    SingleRecipeComponent,
    RecipeFormComponent,
    CreatedAtPipe,
    ListComponent,
    ConfirmDialog
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyAZuVb4wcRDONaC4-EFsO-y_58VOZFAAbE',
      authDomain: 'goff-recipe.firebaseapp.com',
      databaseURL: 'https://goff-recipe.firebaseio.com',
      projectId: 'goff-recipe',
      storageBucket: 'goff-recipe.appspot.com',
      messagingSenderId: '53464673848',
      appId: '1:53464673848:web:2d1cce5a9b5417b678c0cd',
      measurementId: 'G-7QXP49GKKX'
    }),
    AngularFireAuthModule,
    AngularFirestoreModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    HttpClientModule,
    MatChipsModule,
    MatDialogModule,
    MatCardModule,
    ScrollingModule,
    ExperimentalScrollingModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [
    {
      provide: MAT_CHIPS_DEFAULT_OPTIONS,
      useValue: {
        separatorKeyCodes: [ENTER, COMMA]
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
