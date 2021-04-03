import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeSearchComponent } from './recipe-search/recipe-search.component';
import { RecipeComponent } from './recipe/recipe.component';

const routes: Routes = [
  { path: 'recipe', component: RecipeComponent, data:{title: 'My Recipe'}},
  { path: 'search', component: RecipeSearchComponent, data:{title: 'Find a Recipe'}},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
