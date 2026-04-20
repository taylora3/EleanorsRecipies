import { useState, useEffect } from "react";
import {
  Search,
  BookOpen,
  ChefHat,
  Plus,
  Clock,
  Filter,
  Edit2,
  Image,
  Heart,
  Share2,
} from "lucide-react";

interface Recipe {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string[];
  cookTime: number;
  cookbook: string;
  page: number;
  image: string;
  dietary: string[];
  topic: string;
  category: string;
}

const defaultImages = [
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80",
  "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80",
  "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80",
  "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=800&q=80",
  "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=800&q=80",
  "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=800&q=80",
  "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80",
  "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=80",
  "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&q=80",
  "https://static.vecteezy.com/system/resources/thumbnails/002/680/262/small_2x/homemade-banana-bread-sliced-photo.jpg",
  "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=800&q=80",
  "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&q=80",
  "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800&q=80",
  "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=800&q=80",
  "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=800&q=80",
  "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&q=80",
  "https://www.berlyskitchen.com/wp-content/uploads/2020/04/Eggs-in-a-Basket-6.webp"
];

const recipeDatabase: Recipe[] = [
  // Breakfast
  {
    id: 1,
    name: "Fluffy Blueberry Pancakes",
    ingredients: [
      "flour",
      "milk",
      "eggs",
      "blueberries",
      "butter",
      "baking powder",
      "sugar",
      "vanilla extract",
    ],
    instructions: [
      "In a large bowl, whisk together flour, sugar, and baking powder.",
      "In another bowl, beat eggs and mix in milk and vanilla extract.",
      "Combine wet and dry ingredients until just mixed (lumps are okay).",
      "Gently fold in blueberries.",
      "Heat a griddle over medium heat and melt butter.",
      "Pour 1/4 cup batter for each pancake and cook until bubbles form on surface.",
      "Flip and cook until golden brown on both sides.",
      "Serve warm with maple syrup and extra blueberries.",
    ],
    cookTime: 20,
    cookbook: "Morning Glory",
    page: 23,
    image:
      "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=800&q=80",
    dietary: ["vegetarian"],
    topic: "pancakes",
    category: "breakfast",
  },
  {
    id: 2,
    name: "Avocado Toast with Poached Egg",
    ingredients: [
      "sourdough bread",
      "avocado",
      "eggs",
      "lemon juice",
      "red pepper flakes",
      "salt",
      "olive oil",
    ],
    instructions: [
      "Toast the sourdough bread until golden and crispy.",
      "Bring a pot of water to a gentle simmer and add a splash of vinegar.",
      "Crack egg into a small bowl, then gently slide into simmering water.",
      "Poach for 3-4 minutes until white is set but yolk is runny.",
      "Meanwhile, mash avocado with lemon juice and salt.",
      "Spread avocado mixture on toasted bread.",
      "Top with poached egg and sprinkle with red pepper flakes.",
      "Drizzle with olive oil and season with salt to taste.",
    ],
    cookTime: 10,
    cookbook: "The Simple Kitchen",
    page: 12,
    image:
      "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=800&q=80",
    dietary: ["vegetarian"],
    topic: "toast",
    category: "breakfast",
  },
  {
    id: 3,
    name: "Greek Yogurt Parfait",
    ingredients: [
      "greek yogurt",
      "granola",
      "honey",
      "mixed berries",
      "almonds",
      "chia seeds",
    ],
    instructions: [
      "In a glass or bowl, add a layer of Greek yogurt.",
      "Sprinkle a layer of granola over the yogurt.",
      "Add a layer of mixed berries.",
      "Drizzle with honey.",
      "Repeat layers until glass is filled.",
      "Top with sliced almonds and chia seeds.",
      "Serve immediately or refrigerate for up to 2 hours.",
    ],
    cookTime: 5,
    cookbook: "Morning Glory",
    page: 67,
    image:
      "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80",
    dietary: ["vegetarian", "gluten-free"],
    topic: "parfait",
    category: "breakfast",
  },
  {
    id: 4,
    name: "Classic French Omelette",
    ingredients: [
      "eggs",
      "butter",
      "salt",
      "pepper",
      "chives",
      "gruyere cheese",
    ],
    instructions: [
      "Beat 3 eggs with a pinch of salt and pepper until well combined.",
      "Heat a non-stick pan over medium-low heat and add butter.",
      "Pour in the beaten eggs and let sit for a few seconds.",
      "Using a spatula, gently push cooked edges toward center.",
      "When eggs are mostly set but still slightly runny on top, add cheese.",
      "Fold omelette in half or thirds.",
      "Slide onto a plate and garnish with chopped chives.",
      "Serve immediately.",
    ],
    cookTime: 8,
    cookbook: "French Kitchen Basics",
    page: 45,
    image:
      "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=800&q=80",
    dietary: ["vegetarian", "gluten-free"],
    topic: "eggs",
    category: "breakfast",
  },

  // Lunch
  {
    id: 5,
    name: "Mediterranean Chickpea Salad",
    ingredients: [
      "chickpeas",
      "cucumber",
      "tomatoes",
      "feta",
      "red onion",
      "olives",
      "lemon juice",
      "olive oil",
      "oregano",
    ],
    instructions: [
      "Drain and rinse chickpeas, then pat dry.",
      "Dice cucumber, tomatoes, and red onion into bite-sized pieces.",
      "Combine chickpeas and vegetables in a large bowl.",
      "Add crumbled feta and sliced olives.",
      "In a small bowl, whisk together lemon juice, olive oil, and oregano.",
      "Pour dressing over salad and toss well.",
      "Season with salt and pepper to taste.",
      "Let sit for 10 minutes before serving to allow flavors to meld.",
    ],
    cookTime: 15,
    cookbook: "Fresh & Light",
    page: 203,
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80",
    dietary: ["vegetarian", "gluten-free"],
    topic: "salad",
    category: "lunch",
  },
  {
    id: 6,
    name: "Grilled Chicken Caesar Salad",
    ingredients: [
      "chicken breast",
      "romaine lettuce",
      "parmesan",
      "croutons",
      "caesar dressing",
      "lemon",
      "olive oil",
    ],
    instructions: [
      "Season chicken breast with salt, pepper, and olive oil.",
      "Grill chicken over medium-high heat for 6-7 minutes per side.",
      "Let chicken rest for 5 minutes, then slice.",
      "Tear romaine lettuce into bite-sized pieces and wash thoroughly.",
      "In a large bowl, toss lettuce with caesar dressing.",
      "Add croutons and toss again.",
      "Top with sliced chicken and shaved parmesan.",
      "Squeeze fresh lemon over the top and serve.",
    ],
    cookTime: 20,
    cookbook: "Healthy Proteins",
    page: 78,
    image:
      "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=800&q=80",
    dietary: [],
    topic: "salad",
    category: "lunch",
  },
  {
    id: 7,
    name: "Caprese Sandwich",
    ingredients: [
      "ciabatta bread",
      "mozzarella",
      "tomatoes",
      "basil",
      "balsamic glaze",
      "olive oil",
      "salt",
      "pepper",
    ],
    instructions: [
      "Slice ciabatta bread in half lengthwise.",
      "Brush cut sides with olive oil.",
      "Toast bread cut-side down in a pan until golden.",
      "Slice fresh mozzarella and tomatoes into thick slices.",
      "Layer mozzarella and tomato on bottom half of bread.",
      "Season with salt and pepper.",
      "Add fresh basil leaves.",
      "Drizzle with balsamic glaze and top with other half of bread.",
      "Cut in half and serve.",
    ],
    cookTime: 10,
    cookbook: "Italian Classics",
    page: 112,
    image:
      "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&q=80",
    dietary: ["vegetarian"],
    topic: "sandwich",
    category: "lunch",
  },
  {
    id: 8,
    name: "Quinoa Buddha Bowl",
    ingredients: [
      "quinoa",
      "avocado",
      "chickpeas",
      "kale",
      "sweet potato",
      "tahini",
      "lemon",
      "garlic",
    ],
    instructions: [
      "Cook quinoa according to package instructions.",
      "Roast chickpeas with olive oil and spices at 400°F for 20 minutes.",
      "Roast sweet potato cubes at 400°F for 25 minutes until tender.",
      "Massage kale with a bit of olive oil and lemon juice.",
      "Make tahini dressing by whisking tahini, lemon juice, garlic, and water.",
      "Assemble bowl with quinoa as base.",
      "Top with kale, roasted chickpeas, sweet potato, and sliced avocado.",
      "Drizzle with tahini dressing and serve.",
    ],
    cookTime: 35,
    cookbook: "The Simple Kitchen",
    page: 156,
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80",
    dietary: ["vegetarian", "vegan", "gluten-free"],
    topic: "bowl",
    category: "lunch",
  },

  // Dinner
  {
    id: 9,
    name: "Chickpea & Broccoli Curry",
    ingredients: [
      "chickpeas",
      "broccoli",
      "curry paste",
      "coconut milk",
      "onion",
      "garlic",
      "ginger",
      "rice",
    ],
    instructions: [
      "Heat oil in a large pot over medium heat.",
      "Sauté diced onion until softened, about 5 minutes.",
      "Add minced garlic and ginger, cook for 1 minute.",
      "Stir in curry paste and cook until fragrant.",
      "Add chickpeas and broccoli florets.",
      "Pour in coconut milk and bring to a simmer.",
      "Cook for 15 minutes until broccoli is tender.",
      "Season with salt and serve over cooked rice.",
    ],
    cookTime: 25,
    cookbook: "Vegetarian Times",
    page: 142,
    image:
      "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&q=80",
    dietary: ["vegetarian", "vegan", "gluten-free"],
    topic: "curry",
    category: "dinner",
  },
  {
    id: 10,
    name: "Spaghetti Carbonara",
    ingredients: [
      "spaghetti",
      "eggs",
      "parmesan",
      "pancetta",
      "black pepper",
      "garlic",
    ],
    instructions: [
      "Cook spaghetti in salted boiling water until al dente.",
      "While pasta cooks, fry pancetta until crispy.",
      "In a bowl, whisk eggs with grated parmesan and black pepper.",
      "Reserve 1 cup pasta water, then drain spaghetti.",
      "Toss hot pasta with pancetta and rendered fat.",
      "Remove from heat and quickly stir in egg mixture.",
      "Add pasta water as needed to create a creamy sauce.",
      "Serve immediately with extra parmesan and black pepper.",
    ],
    cookTime: 20,
    cookbook: "Italian Classics",
    page: 67,
    image:
      "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=800&q=80",
    dietary: [],
    topic: "pasta",
    category: "dinner",
  },
  {
    id: 11,
    name: "Thai Green Curry",
    ingredients: [
      "green curry paste",
      "coconut milk",
      "vegetables",
      "tofu",
      "rice",
      "fish sauce",
      "lime",
      "basil",
    ],
    instructions: [
      "Heat coconut cream in a wok until it separates.",
      "Add green curry paste and fry until fragrant.",
      "Add remaining coconut milk and bring to a simmer.",
      "Add cubed tofu and vegetables (bell peppers, bamboo shoots, eggplant).",
      "Simmer for 10-15 minutes until vegetables are tender.",
      "Season with fish sauce (or soy sauce for vegan) and sugar.",
      "Add Thai basil leaves and stir.",
      "Serve with jasmine rice and lime wedges.",
    ],
    cookTime: 30,
    cookbook: "Asian Cooking Made Easy",
    page: 124,
    image:
      "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=800&q=80",
    dietary: ["vegetarian", "vegan", "gluten-free"],
    topic: "curry",
    category: "dinner",
  },
  {
    id: 12,
    name: "Herb-Roasted Chicken",
    ingredients: [
      "whole chicken",
      "butter",
      "rosemary",
      "thyme",
      "garlic",
      "lemon",
      "salt",
      "pepper",
    ],
    instructions: [
      "Preheat oven to 425°F.",
      "Pat chicken dry with paper towels.",
      "Mix softened butter with chopped herbs and minced garlic.",
      "Carefully loosen skin and spread herb butter underneath.",
      "Stuff cavity with lemon halves and herb sprigs.",
      "Tie legs together and tuck wing tips under.",
      "Rub outside with oil, salt, and pepper.",
      "Roast for 60-75 minutes until internal temp reaches 165°F.",
      "Let rest 15 minutes before carving.",
    ],
    cookTime: 90,
    cookbook: "Classic Home Cooking",
    page: 89,
    image:
      "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=800&q=80",
    dietary: ["gluten-free"],
    topic: "roast",
    category: "dinner",
  },
  {
    id: 13,
    name: "Beef Tacos",
    ingredients: [
      "ground beef",
      "taco seasoning",
      "tortillas",
      "lettuce",
      "tomatoes",
      "cheese",
      "sour cream",
      "salsa",
    ],
    instructions: [
      "Brown ground beef in a large skillet over medium-high heat.",
      "Drain excess fat.",
      "Add taco seasoning and water according to package directions.",
      "Simmer for 5 minutes until thickened.",
      "Warm tortillas in a dry skillet or microwave.",
      "Shred lettuce and dice tomatoes.",
      "Assemble tacos with beef, lettuce, tomatoes, and cheese.",
      "Top with sour cream and salsa.",
      "Serve immediately.",
    ],
    cookTime: 20,
    cookbook: "Mexican Favorites",
    page: 45,
    image:
      "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=800&q=80",
    dietary: ["gluten-free"],
    topic: "tacos",
    category: "dinner",
  },
  {
    id: 14,
    name: "Baked Salmon with Lemon",
    ingredients: [
      "salmon fillets",
      "lemon",
      "dill",
      "garlic",
      "olive oil",
      "salt",
      "pepper",
    ],
    instructions: [
      "Preheat oven to 375°F.",
      "Place salmon fillets on a parchment-lined baking sheet.",
      "Drizzle with olive oil and season with salt and pepper.",
      "Top each fillet with lemon slices, minced garlic, and fresh dill.",
      "Bake for 12-15 minutes until salmon flakes easily with a fork.",
      "Remove from oven and squeeze fresh lemon juice over top.",
      "Let rest for 2 minutes.",
      "Serve with roasted vegetables or rice.",
    ],
    cookTime: 20,
    cookbook: "Healthy Proteins",
    page: 134,
    image:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&q=80",
    dietary: ["gluten-free"],
    topic: "fish",
    category: "dinner",
  },
  {
    id: 15,
    name: "Vegetable Stir-Fry",
    ingredients: [
      "broccoli",
      "bell peppers",
      "carrots",
      "snap peas",
      "soy sauce",
      "ginger",
      "garlic",
      "sesame oil",
      "rice",
    ],
    instructions: [
      "Cut all vegetables into uniform bite-sized pieces.",
      "Heat wok or large skillet over high heat.",
      "Add oil and swirl to coat.",
      "Add ginger and garlic, stir-fry for 30 seconds.",
      "Add harder vegetables first (carrots, broccoli), stir-fry 2 minutes.",
      "Add softer vegetables (peppers, snap peas), stir-fry 2 more minutes.",
      "Add soy sauce and toss to coat.",
      "Finish with a drizzle of sesame oil.",
      "Serve immediately over steamed rice.",
    ],
    cookTime: 15,
    cookbook: "Asian Cooking Made Easy",
    page: 56,
    image:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&q=80",
    dietary: ["vegetarian", "vegan"],
    topic: "stir-fry",
    category: "dinner",
  },
  {
    id: 16,
    name: "Lentil Soup",
    ingredients: [
      "lentils",
      "carrots",
      "celery",
      "onion",
      "vegetable broth",
      "tomatoes",
      "cumin",
      "bay leaf",
    ],
    instructions: [
      "Dice onion, carrots, and celery.",
      "Heat olive oil in a large pot over medium heat.",
      "Sauté vegetables until softened, about 5 minutes.",
      "Add cumin and cook for 1 minute.",
      "Add lentils, diced tomatoes, vegetable broth, and bay leaf.",
      "Bring to a boil, then reduce heat and simmer.",
      "Cook for 30-40 minutes until lentils are tender.",
      "Remove bay leaf, season with salt and pepper.",
      "Serve with crusty bread.",
    ],
    cookTime: 50,
    cookbook: "Vegetarian Times",
    page: 67,
    image:
      "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&q=80",
    dietary: ["vegetarian", "vegan", "gluten-free"],
    topic: "soup",
    category: "dinner",
  },

  // Treats & Desserts
  {
    id: 17,
    name: "Vegan Chocolate Chip Cookies",
    ingredients: [
      "flour",
      "vegan butter",
      "brown sugar",
      "white sugar",
      "chocolate chips",
      "vanilla",
      "baking soda",
      "salt",
    ],
    instructions: [
      "Preheat oven to 350°F and line baking sheets with parchment.",
      "Cream vegan butter with both sugars until fluffy.",
      "Mix in vanilla extract.",
      "In separate bowl, whisk flour, baking soda, and salt.",
      "Gradually add dry ingredients to wet mixture.",
      "Fold in chocolate chips.",
      "Drop rounded tablespoons of dough onto baking sheets.",
      "Bake for 10-12 minutes until edges are golden.",
      "Cool on baking sheet for 5 minutes before transferring.",
    ],
    cookTime: 25,
    cookbook: "Sweet Treats",
    page: 12,
    image:
      "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&q=80",
    dietary: ["vegan", "vegetarian"],
    topic: "cookies",
    category: "treats",
  },
  {
    id: 18,
    name: "Classic Brownies",
    ingredients: [
      "butter",
      "chocolate",
      "sugar",
      "eggs",
      "flour",
      "cocoa powder",
      "vanilla",
      "salt",
    ],
    instructions: [
      "Preheat oven to 350°F and line an 8x8 pan with parchment.",
      "Melt butter and chocolate together, stirring until smooth.",
      "Whisk in sugar until combined.",
      "Add eggs one at a time, beating well after each.",
      "Stir in vanilla extract.",
      "Fold in flour, cocoa powder, and salt until just combined.",
      "Pour batter into prepared pan.",
      "Bake for 25-30 minutes until a toothpick comes out with moist crumbs.",
      "Cool completely before cutting.",
    ],
    cookTime: 45,
    cookbook: "Sweet Treats",
    page: 34,
    image:
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&q=80",
    dietary: ["vegetarian"],
    topic: "brownies",
    category: "treats",
  },
  {
    id: 19,
    name: "Gluten-Free Banana Bread",
    ingredients: [
      "gluten-free flour",
      "ripe bananas",
      "eggs",
      "honey",
      "walnuts",
      "baking soda",
      "cinnamon",
      "vanilla",
    ],
    instructions: [
      "Preheat oven to 350°F and grease a loaf pan.",
      "Mash ripe bananas in a large bowl.",
      "Beat in eggs, honey, and vanilla.",
      "In separate bowl, whisk flour, baking soda, cinnamon, and salt.",
      "Fold dry ingredients into banana mixture until just combined.",
      "Stir in chopped walnuts.",
      "Pour batter into prepared loaf pan.",
      "Bake for 50-60 minutes until toothpick comes out clean.",
      "Cool in pan for 10 minutes, then turn out onto wire rack.",
    ],
    cookTime: 70,
    cookbook: "Gluten-Free Baking",
    page: 45,
    image:
      "https://images.unsplash.com/photo-1603046891726-36bfd957207d?w=800&q=80",
    dietary: ["gluten-free", "vegetarian"],
    topic: "bread",
    category: "treats",
  },
  {
    id: 20,
    name: "Lemon Bars",
    ingredients: [
      "flour",
      "butter",
      "powdered sugar",
      "eggs",
      "lemon juice",
      "lemon zest",
      "sugar",
      "baking powder",
    ],
    instructions: [
      "Preheat oven to 350°F.",
      "Make crust by mixing flour, butter, and powdered sugar.",
      "Press into bottom of 9x13 pan.",
      "Bake crust for 15-20 minutes until lightly golden.",
      "While crust bakes, whisk eggs, sugar, lemon juice, zest, and flour.",
      "Pour lemon mixture over hot crust.",
      "Bake for 20-25 minutes until set.",
      "Cool completely, then dust with powdered sugar.",
      "Cut into squares and serve.",
    ],
    cookTime: 50,
    cookbook: "Sweet Treats",
    page: 78,
    image:
      "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&q=80",
    dietary: ["vegetarian"],
    topic: "bars",
    category: "treats",
  },
  {
    id: 21,
    name: "Tiramisu",
    ingredients: [
      "mascarpone",
      "eggs",
      "sugar",
      "ladyfingers",
      "espresso",
      "cocoa powder",
      "marsala wine",
    ],
    instructions: [
      "Separate eggs and beat yolks with sugar until pale.",
      "Fold in mascarpone until smooth.",
      "In separate bowl, beat egg whites to stiff peaks.",
      "Gently fold egg whites into mascarpone mixture.",
      "Brew strong espresso and mix with marsala wine.",
      "Quickly dip ladyfingers in coffee mixture.",
      "Layer coffee-soaked ladyfingers in dish.",
      "Spread half of mascarpone mixture over ladyfingers.",
      "Repeat layers, ending with mascarpone.",
      "Dust generously with cocoa powder.",
      "Refrigerate at least 4 hours before serving.",
    ],
    cookTime: 30,
    cookbook: "Italian Classics",
    page: 234,
    image:
      "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&q=80",
    dietary: ["vegetarian"],
    topic: "dessert",
    category: "treats",
  },
  {
    id: 22,
    name: "Apple Pie",
    ingredients: [
      "pie crust",
      "apples",
      "sugar",
      "cinnamon",
      "nutmeg",
      "flour",
      "butter",
      "lemon juice",
    ],
    instructions: [
      "Preheat oven to 375°F.",
      "Peel, core, and slice apples thinly.",
      "Toss apples with sugar, cinnamon, nutmeg, flour, and lemon juice.",
      "Line pie dish with bottom crust.",
      "Fill with apple mixture and dot with butter.",
      "Cover with top crust and crimp edges.",
      "Cut slits in top for steam to escape.",
      "Brush with egg wash and sprinkle with sugar.",
      "Bake for 50-60 minutes until crust is golden and filling bubbles.",
      "Cool for at least 2 hours before slicing.",
    ],
    cookTime: 90,
    cookbook: "Classic Home Cooking",
    page: 256,
    image:
      "https://images.unsplash.com/photo-1535920527002-b35e96722eb9?w=800&q=80",
    dietary: ["vegetarian"],
    topic: "pie",
    category: "treats",
  },
  {
    id: 23,
    name: "Egg in toast",
    ingredients: ["bread", "egg", "butter"],
    instructions: [
      "make hole in bread.",
      "butter bread.",
      "fry bread.",
      "crack egg in to the hole.",
      "flip egg and bread when ready.",
      "Take off the heat and eat.",
    ],
    cookTime: 5,
    cookbook: "Camping Classics",
    page: 37,
    image:
      "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&q=80",
    dietary: ["vegetarian"],
    topic: "breakfast",
    category: "treats",
  },
];

export default function App() {
  const [searchInput, setSearchInput] = useState("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedRecipe, setSelectedRecipe] =
    useState<Recipe | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [editingRecipe, setEditingRecipe] =
    useState<Recipe | null>(null);
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);

  const [filters, setFilters] = useState({
    dietary: [] as string[],
    maxCookTime: 120,
  });

  useEffect(() => {
    fetch("/api/recipes")
      .then((r) => r.json())
      .then((data: Recipe[]) => {
        const loaded = data.length > 0 ? data : recipeDatabase;
        setAllRecipes(loaded);
        setRecipes(loaded);
      })
      .catch(() => {
        setAllRecipes(recipeDatabase);
        setRecipes(recipeDatabase);
      });
  }, []);

  const saveRecipes = (updated: Recipe[]) => {
    fetch("/api/recipes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });
  };

  const [formData, setFormData] = useState({
    name: "",
    ingredients: "",
    instructions: "",
    cookTime: "",
    cookbook: "",
    page: "",
    dietary: "",
    topic: "",
    category: "",
    image: defaultImages[0],
  });

  const handleSearch = () => {
    let filtered = allRecipes;

    if (searchInput.trim()) {
      const searchTerm = searchInput.toLowerCase().trim();
      filtered = filtered.filter((recipe) => {
        const matchesName = recipe.name
          .toLowerCase()
          .includes(searchTerm);
        const matchesIngredient = recipe.ingredients.some(
          (ing) => ing.toLowerCase().includes(searchTerm),
        );
        const matchesCookbook = recipe.cookbook
          .toLowerCase()
          .includes(searchTerm);
        const matchesTopic = recipe.topic
          .toLowerCase()
          .includes(searchTerm);

        return (
          matchesName ||
          matchesIngredient ||
          matchesCookbook ||
          matchesTopic
        );
      });
    }

    if (filters.dietary.length > 0) {
      filtered = filtered.filter((recipe) =>
        filters.dietary.every((diet) =>
          recipe.dietary.includes(diet),
        ),
      );
    }

    if (filters.maxCookTime < 120) {
      filtered = filtered.filter(
        (recipe) => recipe.cookTime <= filters.maxCookTime,
      );
    }

    setRecipes(filtered);
  };

  const toggleDietaryFilter = (diet: string) => {
    setFilters((prev) => ({
      ...prev,
      dietary: prev.dietary.includes(diet)
        ? prev.dietary.filter((d) => d !== diet)
        : [...prev.dietary, diet],
    }));
  };

  const toggleFavorite = (recipeId: number) => {
    setFavorites((prev) =>
      prev.includes(recipeId)
        ? prev.filter((id) => id !== recipeId)
        : [...prev, recipeId]
    );
  };

  const handleShare = async (recipe: Recipe) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: recipe.name,
          text: `Check out this recipe: ${recipe.name} from ${recipe.cookbook}, page ${recipe.page}`,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      // Fallback: copy to clipboard
      const shareText = `${recipe.name} - ${recipe.cookbook}, page ${recipe.page}`;
      navigator.clipboard.writeText(shareText);
      alert("Recipe details copied to clipboard!");
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      ingredients: "",
      instructions: "",
      cookTime: "",
      cookbook: "",
      page: "",
      dietary: "",
      topic: "",
      category: "",
      image: defaultImages[0],
    });
    setEditingRecipe(null);
  };

  const openEditForm = (recipe: Recipe) => {
    setFormData({
      name: recipe.name,
      ingredients: recipe.ingredients.join(", "),
      instructions: recipe.instructions.join("\n"),
      cookTime: recipe.cookTime.toString(),
      cookbook: recipe.cookbook,
      page: recipe.page.toString(),
      dietary: recipe.dietary.join(", "),
      topic: recipe.topic,
      category: recipe.category,
      image: recipe.image,
    });
    setEditingRecipe(recipe);
    setShowAddForm(true);
    setSelectedRecipe(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddRecipe = () => {
    if (
      !formData.name ||
      !formData.ingredients ||
      !formData.cookbook ||
      !formData.page
    ) {
      return;
    }

    const recipe: Recipe = {
      id: allRecipes.length + 1,
      name: formData.name,
      ingredients: formData.ingredients
        .split(",")
        .map((i) => i.trim()),
      instructions: formData.instructions
        .split("\n")
        .filter((i) => i.trim()),
      cookTime: parseInt(formData.cookTime) || 30,
      cookbook: formData.cookbook,
      page: parseInt(formData.page),
      image: formData.image,
      dietary: formData.dietary
        .split(",")
        .map((d) => d.trim())
        .filter((d) => d),
      topic: formData.topic || "general",
      category: formData.category || "dinner",
    };

    const updatedRecipes = [...allRecipes, recipe];
    setAllRecipes(updatedRecipes);
    setRecipes(updatedRecipes);
    saveRecipes(updatedRecipes);
    setShowAddForm(false);
    resetForm();
  };

  const handleEditRecipe = () => {
    if (
      !editingRecipe ||
      !formData.name ||
      !formData.ingredients ||
      !formData.cookbook ||
      !formData.page
    ) {
      return;
    }

    const updatedRecipe: Recipe = {
      ...editingRecipe,
      name: formData.name,
      ingredients: formData.ingredients
        .split(",")
        .map((i) => i.trim()),
      instructions: formData.instructions
        .split("\n")
        .filter((i) => i.trim()),
      cookTime: parseInt(formData.cookTime) || 30,
      cookbook: formData.cookbook,
      page: parseInt(formData.page),
      image: formData.image,
      dietary: formData.dietary
        .split(",")
        .map((d) => d.trim())
        .filter((d) => d),
      topic: formData.topic || "general",
      category: formData.category || "dinner",
    };

    const updatedRecipes = allRecipes.map((r) =>
      r.id === editingRecipe.id ? updatedRecipe : r,
    );
    setAllRecipes(updatedRecipes);
    setRecipes(updatedRecipes);
    saveRecipes(updatedRecipes);
    setShowAddForm(false);
    resetForm();
  };

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Header */}
      <header className="bg-white border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <ChefHat className="w-8 h-8 text-zinc-900" />
              <h1 className="text-2xl font-semibold">
                Recipe Finder
              </h1>
            </div>
            <button
              onClick={() => {
                resetForm();
                setShowAddForm(!showAddForm);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Recipe
            </button>
          </div>

          {/* Search Bar */}
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => {
                  setSearchInput(e.target.value);
                  if (e.target.value === "") {
                    setRecipes(allRecipes);
                  }
                }}
                onKeyDown={(e) =>
                  e.key === "Enter" && handleSearch()
                }
                placeholder="Search by cookbook, ingredient, or topic..."
                className="w-full pl-12 pr-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-3 border rounded-lg transition-colors ${
                showFilters ||
                filters.dietary.length > 0 ||
                filters.maxCookTime < 120
                  ? "bg-zinc-900 text-white border-zinc-900"
                  : "bg-white border-zinc-300 hover:bg-zinc-50"
              }`}
            >
              <Filter className="w-4 h-4" />
              Filters
            </button>
            <button
              onClick={handleSearch}
              className="px-6 py-3 bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition-colors font-medium"
            >
              Search
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Filters */}
        {showFilters && (
          <div className="bg-white rounded-lg border border-zinc-200 p-6 mb-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Dietary Preferences */}
              <div>
                <h3 className="font-medium mb-3">
                  Dietary Preferences
                </h3>
                <div className="flex flex-wrap gap-2">
                  {["vegetarian", "vegan", "gluten-free"].map(
                    (diet) => (
                      <button
                        key={diet}
                        onClick={() =>
                          toggleDietaryFilter(diet)
                        }
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                          filters.dietary.includes(diet)
                            ? "bg-zinc-900 text-white"
                            : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
                        }`}
                      >
                        {diet.charAt(0).toUpperCase() +
                          diet.slice(1)}
                      </button>
                    ),
                  )}
                </div>
              </div>

              {/* Cooking Time */}
              <div>
                <h3 className="font-medium mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Max Cooking Time: {filters.maxCookTime} min
                </h3>
                <input
                  type="range"
                  min="15"
                  max="120"
                  step="5"
                  value={filters.maxCookTime}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      maxCookTime: parseInt(e.target.value),
                    })
                  }
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-zinc-500 mt-2">
                  <span>15 min</span>
                  <span>120 min</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add/Edit Recipe Form */}
        {showAddForm && (
          <div className="bg-white rounded-lg border border-zinc-200 p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">
              {editingRecipe ? "Edit Recipe" : "Add New Recipe"}
            </h3>
            <div className="grid gap-4">
              {/* Image Picker */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Recipe Image
                </label>
                <div className="flex gap-3 items-start">
                  <div className="w-32 h-32 rounded-lg overflow-hidden border-2 border-zinc-200">
                    <img
                      src={formData.image}
                      alt="Selected"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setShowImagePicker(!showImagePicker)
                    }
                    className="flex items-center gap-2 px-4 py-2 border border-zinc-300 rounded-lg hover:bg-zinc-50 transition-colors"
                  >
                    <Image className="w-4 h-4" />
                    Choose Image
                  </button>
                </div>
                {showImagePicker && (
                  <div className="mt-3 p-3 border border-zinc-200 rounded-lg bg-zinc-50">
                    <div className="grid grid-cols-4 gap-2">
                      {defaultImages.map((img, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setFormData({
                              ...formData,
                              image: img,
                            });
                            setShowImagePicker(false);
                          }}
                          className={`h-20 rounded overflow-hidden border-2 transition-all ${
                            formData.image === img
                              ? "border-zinc-900 ring-2 ring-zinc-900"
                              : "border-zinc-200 hover:border-zinc-400"
                          }`}
                        >
                          <img
                            src={img}
                            alt={`Option ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Recipe Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value,
                    })
                  }
                  placeholder="e.g., Chickpea & Broccoli Curry"
                  className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Ingredients (comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.ingredients}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      ingredients: e.target.value,
                    })
                  }
                  placeholder="e.g., chickpeas, broccoli, curry paste"
                  className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Instructions (one per line)
                </label>
                <textarea
                  value={formData.instructions}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      instructions: e.target.value,
                    })
                  }
                  placeholder="Enter each step on a new line..."
                  rows={6}
                  className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent"
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Cookbook
                  </label>
                  <input
                    type="text"
                    value={formData.cookbook}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        cookbook: e.target.value,
                      })
                    }
                    placeholder="e.g., Vegetarian Times"
                    className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Page Number
                  </label>
                  <input
                    type="number"
                    value={formData.page}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        page: e.target.value,
                      })
                    }
                    placeholder="e.g., 142"
                    className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Cook Time (minutes)
                  </label>
                  <input
                    type="number"
                    value={formData.cookTime}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        cookTime: e.target.value,
                      })
                    }
                    placeholder="e.g., 25"
                    className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        category: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent"
                  >
                    <option value="">Select...</option>
                    <option value="breakfast">Breakfast</option>
                    <option value="lunch">Lunch</option>
                    <option value="dinner">Dinner</option>
                    <option value="treats">Treats</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Topic
                  </label>
                  <input
                    type="text"
                    value={formData.topic}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        topic: e.target.value,
                      })
                    }
                    placeholder="e.g., curry"
                    className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Dietary (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={formData.dietary}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        dietary: e.target.value,
                      })
                    }
                    placeholder="e.g., vegan, gluten-free"
                    className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => {
                    setShowAddForm(false);
                    resetForm();
                    setShowImagePicker(false);
                  }}
                  className="px-4 py-2 border border-zinc-300 rounded-lg hover:bg-zinc-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={
                    editingRecipe
                      ? handleEditRecipe
                      : handleAddRecipe
                  }
                  className="px-4 py-2 bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition-colors"
                >
                  {editingRecipe
                    ? "Save Changes"
                    : "Add Recipe"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Favorite Recipes */}
        {favorites.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Heart className="w-5 h-5 fill-red-500 text-red-500" />
              <h2 className="text-xl font-semibold">
                Favorite Recipes
              </h2>
              <span className="text-sm text-zinc-500">
                ({favorites.length})
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {allRecipes
                .filter((recipe) => favorites.includes(recipe.id))
                .map((recipe) => (
                  <div
                    key={recipe.id}
                    onClick={() => setSelectedRecipe(recipe)}
                    className="bg-white rounded-lg border border-zinc-200 overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                  >
                    <div className="relative h-32 bg-zinc-100">
                      <img
                        src={recipe.image}
                        alt={recipe.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                      </div>
                    </div>
                    <div className="p-3">
                      <h3 className="font-semibold text-sm line-clamp-1 mb-1">
                        {recipe.name}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-zinc-600">
                        <Clock className="w-3 h-3" />
                        <span>{recipe.cookTime} min</span>
                        <span className="text-zinc-400">•</span>
                        <span className="capitalize">{recipe.category}</span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Results Count */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium">
            {recipes.length}{" "}
            {recipes.length === 1 ? "recipe" : "recipes"}
          </h2>
        </div>

        {/* Recipe Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              onClick={() => setSelectedRecipe(recipe)}
              className="bg-white rounded-lg border border-zinc-200 overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
            >
              {/* Recipe Image */}
              <div className="relative h-48 bg-zinc-100">
                <img
                  src={recipe.image}
                  alt={recipe.name}
                  className="w-full h-full object-cover"
                />
                {favorites.includes(recipe.id) && (
                  <div className="absolute top-3 left-3">
                    <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                  </div>
                )}
                <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {recipe.cookTime} min
                </div>
              </div>

              {/* Recipe Info */}
              <div className="p-4">
                <div className="flex items-start gap-2 mb-2">
                  <h3 className="font-semibold flex-1 line-clamp-2">
                    {recipe.name}
                  </h3>
                  <span className="px-2 py-1 bg-zinc-900 text-white rounded text-xs font-medium capitalize whitespace-nowrap">
                    {recipe.category}
                  </span>
                </div>

                {/* Dietary Tags */}
                {recipe.dietary.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {recipe.dietary.map((diet, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 bg-zinc-100 text-zinc-700 rounded text-xs"
                      >
                        {diet}
                      </span>
                    ))}
                  </div>
                )}

                {/* Cookbook Reference */}
                <div className="flex items-center gap-2 text-sm text-zinc-600">
                  <BookOpen className="w-4 h-4" />
                  <span className="truncate">
                    {recipe.cookbook}
                  </span>
                  <span className="text-zinc-400">•</span>
                  <span>p. {recipe.page}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {recipes.length === 0 && (
          <div className="text-center py-12">
            <ChefHat className="w-12 h-12 text-zinc-300 mx-auto mb-3" />
            <p className="text-zinc-500">
              No recipes found. Try adjusting your search or
              filters.
            </p>
          </div>
        )}
      </div>

      {/* Recipe Detail Modal */}
      {selectedRecipe && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50"
          onClick={() => setSelectedRecipe(null)}
        >
          <div
            className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-64 bg-zinc-100">
              <img
                src={selectedRecipe.image}
                alt={selectedRecipe.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={() => openEditForm(selectedRecipe)}
                  className="bg-white rounded-full p-2 hover:bg-zinc-100 transition-colors"
                >
                  <Edit2 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setSelectedRecipe(null)}
                  className="bg-white rounded-full p-2 hover:bg-zinc-100 transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-start gap-3 mb-3">
                <h2 className="text-2xl font-semibold flex-1">
                  {selectedRecipe.name}
                </h2>
                <span className="px-3 py-1 bg-zinc-900 text-white rounded-full text-sm font-medium capitalize">
                  {selectedRecipe.category}
                </span>
              </div>

              {/* Share and Favorite Buttons */}
              <div className="flex items-center gap-3 mb-6">
                <button
                  onClick={() => toggleFavorite(selectedRecipe.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                    favorites.includes(selectedRecipe.id)
                      ? "bg-red-50 border-red-300 text-red-700"
                      : "border-zinc-300 hover:bg-zinc-50"
                  }`}
                >
                  <Heart
                    className={`w-4 h-4 ${
                      favorites.includes(selectedRecipe.id) ? "fill-red-500 text-red-500" : ""
                    }`}
                  />
                  <span className="text-sm font-medium">
                    {favorites.includes(selectedRecipe.id) ? "Favorited" : "Favorite"}
                  </span>
                </button>
                <button
                  onClick={() => handleShare(selectedRecipe)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-zinc-300 hover:bg-zinc-50 transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  <span className="text-sm font-medium">Share</span>
                </button>
              </div>

              <div className="flex items-center gap-4 mb-6 text-sm text-zinc-600">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {selectedRecipe.cookTime} min
                </span>
                {selectedRecipe.dietary.length > 0 && (
                  <div className="flex gap-2">
                    {selectedRecipe.dietary.map((diet, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-zinc-100 text-zinc-700 rounded text-xs font-medium"
                      >
                        {diet}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="mb-6">
                <h4 className="font-medium mb-3">
                  Ingredients
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedRecipe.ingredients.map(
                    (ingredient, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 bg-zinc-50 border border-zinc-200 text-zinc-700 rounded-full text-sm"
                      >
                        {ingredient}
                      </span>
                    ),
                  )}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-medium mb-3">
                  Instructions
                </h4>
                <ol className="space-y-3">
                  {selectedRecipe.instructions.map(
                    (instruction, idx) => (
                      <li key={idx} className="flex gap-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-zinc-900 text-white rounded-full flex items-center justify-center text-sm font-medium">
                          {idx + 1}
                        </span>
                        <span className="text-zinc-700 pt-0.5">
                          {instruction}
                        </span>
                      </li>
                    ),
                  )}
                </ol>
              </div>

              <div className="bg-zinc-50 rounded-lg p-4">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Where to find this recipe
                </h4>
                <div className="flex items-center justify-between">
                  <span className="font-medium">
                    {selectedRecipe.cookbook}
                  </span>
                  <span className="text-sm text-zinc-600">
                    Page {selectedRecipe.page}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}