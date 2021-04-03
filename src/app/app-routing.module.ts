import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeSearchComponent } from './recipe-search/recipe-search.component';
import { RecipeComponent } from './recipe/recipe.component';

const routes: Routes = [
  { path: 'recipe', component: RecipeComponent },
  { path: 'search', component: RecipeSearchComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
