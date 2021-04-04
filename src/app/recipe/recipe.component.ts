import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styles: [
  ]
})
export class RecipeComponent implements OnInit {

  recipeForm = new FormGroup({
    recipeName: new FormControl(''),
    category: new FormControl(''),
    rating: new FormControl(''),
    servings: new FormControl(''),
    difficulty: new FormControl(''),
    prepTime: new FormControl(''),
    cookTime: new FormControl(''),
    totalTime: new FormControl(''),
    source: new FormControl(''),
    sourceUrl: new FormControl('')
  });
  recipe: any;
  constructor() { }

  ngOnInit(): void {
    this.recipe = {
      recipeName: 'Personal Pizzas with Prosciutto, Artichokes, and Fresh Mozzarella',
      category: 'Hall Of Fame',
      rating: '5 Star',
      servings: 2,
      difficulty: 'Easy',
      prepTime: 5,
      cookTime: 25,
      totalTime: 30,
      source: 'HelloFresh',
      sourceUrl: 'https://www.hellofresh.com/recipes/make-your-own-pizza-bar-577d5933b2baaf276e8b4568',
      ingredients: [
        "10 ounce Pizza Dough",
        "1 teaspoon Italian Seasoning",
        "1 unit Red Onion",
        "4 ounce Fresh Mozzarella",
        "1 box Crushed Tomatoes",
        "2 clove Garlic",
        "4 ounce Prosciutto",
        "1 jar Artichokes",
        "1/2 teaspoon Sugar",
        "2 unit Olive Oil",
        "Salt",
        "Peper"
      ],
      steps: [
        'Prep: Wash and dry all produce. Preheat the oven to 450 degrees. Take the dough out of the fridge to allow it to come to room temperature. Mince the garlic.',
        'Heat a drizzle of olive oil in a large pan over medium heat. Add the garlic and Italian seasoning. Cook 30 seconds, until fragrant. Add the crushed tomatoes and ½ teaspoon sugar to the pan. Season generously with salt and pepper. Reduce heat to low and let simmer until you’re ready to top the pizza.',
        'Divide the ball of dough in half. Using your hands, stretch each half into a ¼-inch-thick circle. You may need to continually stretch the dough in order to get it thin enough. Place the dough onto a lightly oiled baking sheet. Place in the oven for 6-8 minutes, until lightly golden brown on the edges. TIP: If you have a rolling pin or wine bottle, you can use it to help roll out the dough on a lightly floured surface.',
        'Halve, peel, and thinly slice the onion. Slice the prosciutto into ½-inch strips. Drain and roughly chop the artichokes. Tear the mozzarella into small pieces.',
        'Heat broiler to high or oven to 500 degrees. Now for the fun part! Each person gets to build their own pizza. Spread the crust with marinara and sprinkle with mozzarella. Add as much or as little of the toppings as you like.',
        'Finish the pizzas: Place the baking sheet under the broiler for 3-5 minutes, or until the cheese is melted and crust is slightly charred. Finish with a drizzle of olive oil, if desired. Cut into slices and enjoy!'
      ]
    }
    this.recipeForm.patchValue(this.recipe);
    this.recipeForm.disable();
  }

  edit(){
    this.recipeForm.enable();
  }
  cancel(){
    this.recipeForm.disable();
  }
  save(){
    this.recipeForm.disable();
  }
}
