import { Course, DietInfo } from './types';

export const DIETARY_METADATA: Record<string, DietInfo> = {
  V: {
    tag: 'V',
    label: 'Vegetarian',
    description: 'Meat-free dishes incorporating plant-based ingredients.',
    colorClass: 'text-emerald-400 border-emerald-900/40 bg-emerald-950/20',
    bgColorClass: 'bg-emerald-500',
  },
  VE: {
    tag: 'VE',
    label: 'Vegan',
    description: '100% plant-based, egg-free, and dairy-free.',
    colorClass: 'text-teal-400 border-teal-900/40 bg-teal-950/20',
    bgColorClass: 'bg-teal-500',
  },
  GF: {
    tag: 'GF',
    label: 'Gluten-Free',
    description: 'Prepared without any wheat, barley, or rye ingredients.',
    colorClass: 'text-amber-400 border-amber-900/40 bg-amber-950/20',
    bgColorClass: 'bg-[#C2A07A]',
  },
  DF: {
    tag: 'DF',
    label: 'Dairy-Free',
    description: 'Crafted without butter, cream, milk, or cheese products.',
    colorClass: 'text-rose-400 border-rose-900/40 bg-rose-950/20',
    bgColorClass: 'bg-rose-500',
  },
  NF: {
    tag: 'NF',
    label: 'Nut-Free',
    description: 'Completely peanut-free and tree-nut-free indices.',
    colorClass: 'text-sky-400 border-sky-900/40 bg-sky-950/20',
    bgColorClass: 'bg-sky-500',
  }
};

export const COURSES: Course[] = [
  {
    id: 1,
    courseNumber: "First",
    title: "Dad's Favorite Starter Trio",
    subtitle: "Zucchini Fries & Dip • Crudité Platter • Tortilla Chips with Hand-Mashed Guac & Smoky Chile Queso",
    description: "The ultimate sharing-style appetizer platter curated for Father's Day. Features crispy golden-panko zucchini fries, crisp organic seasonal garden crudité, and warm stone-ground tortilla chips accompanied by fresh, hand-smashed lime-cilantro guacamole and a velvety, smoky roasted chili green-queso dip that Dad won't stop double-dipping.",
    image: "/src/assets/images/zucchini_fries_and_dip_1781823816192.jpg",
    prepTime: "25 min",
    cookTime: "15 min",
    difficulty: "Easy",
    dietaryTags: ["V", "NF"],
    subDishes: [
      {
        name: "Crispy Zucchini Fries",
        description: "Uniformly sliced baby zucchini sticks dredged in light parmesan-panko crust and oven-crisped to perfection.",
        ingredients: ["Baby Zucchini", "Panko Breadcrumbs", "Parmesan Cheese", "Fresh Eggs", "Garlic Powder", "Sea Salt"]
      },
      {
        name: "Artisan Dipping Board",
        description: "A dual creamy dipping experience with smooth herb garlic cream and warm melted green chili queso.",
        ingredients: ["Sour Cream", "Greek Yogurt", "Fresh Dill", "Chives", "Monterey Jack Cheese", "Mild Green Chilies", "Cream"]
      },
      {
        name: "Hand-Mashed Guac & Chips",
        description: "Hass avocados crushed fresh with lime, red onions, tomatoes, and organic cilantro, side of blue & yellow corn chips.",
        ingredients: ["Ripe Hass Avocados", "Fresh Lime Juice", "Diced Roma Tomatoes", "Cilantro", "Red Onion", "Corn Tortilla Chips"]
      },
      {
        name: "Crisp Organic Crudité",
        description: "Sleek batons of garden-fresh raw carrots, cucumbers, radishes, and crisp hearts of celery.",
        ingredients: ["Rainbow Carrots", "English Cucumber", "French Breakfast Radishes", "Celery Hearts"]
      }
    ],
    flavorProfile: [
      { label: "Crunch & Texture", value: 95, color: "bg-amber-600" },
      { label: "Herbaceous freshness", value: 85, color: "bg-emerald-600" },
      { label: "Creaminess", value: 78, color: "bg-yellow-500" },
      { label: "Spice kick", value: 40, color: "bg-red-500" }
    ],
    recipeIngredients: [
      "2 medium Zucchinis (cut into 1/2-inch sticks)",
      "1 cup Panko Breadcrumbs",
      "1/2 cup grated Parmesan Cheese",
      "2 eggs (beaten)",
      "1/2 cup All-Purpose Flour (or Gluten-Free flour)",
      "1 cup Assorted Raw Veggies (carrots, cucumber,celery, radishes)",
      "2 ripe Hass Avocados",
      "2 limes (for juice & zest)",
      "1 bag Corn Tortilla Chips",
      "1/2 cup shredded Monterey Jack cheese",
      "1/4 cup cream or whole milk",
      "4 oz diced canned Mild Green Chilies",
      "1/2 cup Sour Cream or Greek Yogurt",
      "1 tbsp chopped fresh dill and chives"
    ],
    recipeSteps: [
      "Slice the zucchinis into uniform sticks (approximately 3 inches long and 1/2 inch thick). Gently pat them dry with a clean paper towel.",
      "Set up your breading station with three shallow bowls. Bowl 1: Flour mixed with a pinch of salt. Bowl 2: Whisked eggs. Bowl 3: Toss panko crumbs, grated parmesan, garlic powder, and ground black pepper together.",
      "Roll each zucchini stick in flour, dip entirely into whisked egg, then roll in the cheesy panko mixture, pressing firmly so coats stick. Place on a parchment-lined baking tray.",
      "Bake in a preheated oven at 400°F (200°C) for 15 minutes, turning once halfway through, until zucchini fries are golden brown and crunchy.",
      "Make the Guacamole: Pit and scoop avocados into a bowl. Mash with the juice of 1 lime, a pinch of salt, diced red onion, tomatoes, and chopped cilantro.",
      "Make the Warm Queso: Combine shredded Monterey Jack cheese, green chilies, and a splash of cream in a small saucepan. Heat on low, stirring constantly, until velvety and melted.",
      "Prepare Garlic Herb Dip: In a small bowl, whisk spur cream, Greek yogurt, minced dill, chives, small pinch of garlic, and a splash of lime juice.",
      "Assemble: Place warm fries, crisp hand-sliced crudités, and tortilla chips on a large sharing platter. Place the three dips in ramekins in the center."
    ],
    chefTip: "For an extra crispy zucchini fry, make sure your baking sheet is not crowded, allowing hot air to circulate freely around each stick. You can also air-fry them at 390°F (198°C) for 9 minutes for premium crunch."
  },
  {
    id: 2,
    courseNumber: "Second",
    title: "Chipotle Chicken Tacos",
    subtitle: "Smoky Pulled Chicken • Quick Pickled Onions • Fresh Cotija • Dad's Lime Crema Ranch",
    description: "The hearty centerpiece feast for Father's Day. Tender chicken thighs slow-braised in a rich, deeply smoky sauce of chipotle chiles in adobo. Nestled in warm, fire-charred double corn tortillas, topped with tangily sweet hand-pickled quick red onions, crumbled cotija cheese, crisp micro-cilantro, and an exquisite cloud of fresh lime crema ranch. Best paired with a cold craft IPA!",
    image: "/src/assets/images/chipotle_chicken_tacos_1781823826168.jpg",
    prepTime: "20 min",
    cookTime: "25 min",
    difficulty: "Medium",
    dietaryTags: ["GF", "NF"],
    subDishes: [
      {
        name: "Smoky Braised Chipotle Chicken",
        description: "Juicy chicken thighs seared and simmered in adobo chipotle sauce, Mexican cumin, and shredded finely.",
        ingredients: ["Chicken Thighs", "Chipotle in Adobo", "Garlic", "Cumin", "Oregano", "Chicken Stock"]
      },
      {
        name: "Zesty Lime Ranch Crema",
        description: "A cooling dressing uniting classic sour cream ranch with fresh lime juice, lime zest, and garden herbs.",
        ingredients: ["Sour Cream", "Buttermilk", "Lime Juice & Zest", "Onion Powder", "Dill"]
      },
      {
        name: "Quick Pickled Red Onions",
        description: "Ruby-red sweet onions pickled instantly in cider vinegar to add crisp texture and high-tone acidity.",
        ingredients: ["Red Onion", "Apple Cider Vinegar", "Sugar", "Sea Salt"]
      }
    ],
    flavorProfile: [
      { label: "Smoky Depth", value: 92, color: "bg-rose-700" },
      { label: "Acidity & Tang", value: 80, color: "bg-teal-600" },
      { label: "Spice Intensity", value: 65, color: "bg-red-600" },
      { label: "Savory & Umami", value: 88, color: "bg-amber-700" }
    ],
    recipeIngredients: [
      "1 lb boneless skinless Chicken Thighs",
      "2-3 canned Chipotle Peppers in Adobo Sauce",
      "1 small Red Onion (sliced into ultra-thin rings)",
      "1/2 cup Apple Cider Vinegar",
      "1 tsp Sugar",
      "1/2 cup Sour Cream (or Mexican Crema)",
      "2 tbsp Buttermilk or milk",
      "1 Lime (zested and juiced)",
      "1/2 tsp Garlic Powder & Onion Powder",
      "8 small Corn Tortillas",
      "1/4 cup crumbled Cotija Cheese (or Feta)",
      "1/2 cup fresh Cilantro leaves",
      "1 tbsp cooking Oil",
      "Salt, Cumin, and Dried Oregano to taste"
    ],
    recipeSteps: [
      "In a small clean glass jar, combine the sliced red onion rings, apple cider vinegar, warm water (about 1/2 cup), sugar, and 1 tsp of salt. Shake gently and let pickle at room temperature.",
      "Heat 1 tbsp of oil in a skillet or Dutch oven over medium-high heat. Season chicken thighs with salt, ground cumin, and dried oregano. Sear for 4 minutes on each side until deeply browned.",
      "Finely chop 2 to 3 chipotle peppers. Add them to the skillet with 2 tbsp of the adobo sauce from the can and 1/3 cup chick stock or water. Cover, lower heat to low, and let simmer for 15 minutes.",
      "While the chicken cooks, prepare the Lime Ranch Crema: In a small bowl, whisk the sour cream, buttermilk, lime zest, 1 tbsp lime juice, garlic powder, onion powder, and a pinch of salt until smooth.",
      "Remove the lid from the chicken. Using two forks, shred the chicken directly in the pan, stirring it well with the remaining concentrated orange cooking liquid so it remains ultra-succulent.",
      "Warm the corn tortillas on a dry skillet or directly over a low open flame for 15-20 seconds per side until soft and slightly charred. Wrap in a clean towel to keep soft.",
      "Assemble your tacos: Layer warm chicken on tortillas, add a scatter of cotija cheese, add pickled red onions, fresh cilantro leaves, and drizzle generously with lime ranch."
    ],
    chefTip: "Chicken thighs are highly recommended over chicken breasts because they absorb the smoky chipotle sauce beautifully without drying out, maintaining rich juice with every bite!"
  },
  {
    id: 3,
    courseNumber: "Third",
    title: "Classic Dutch Apple Pie",
    subtitle: "Spiced Tart Apples • Buttery Oatmeal Streusel • Velvet Vanilla Bean Ice Cream",
    description: "The ultimate cozy dessert finale. Warm, flaky spiced apple pie layered with a perfect ratio of tart Granny Smith and sweet Honeycrisp apples, tossed in cinnamon, nutmeg, and brown sugar—baked under a blanket of sweet, crispy brown sugar oatmeal streusel. Served with a melting scoop of vanilla bean ice cream—just how Dad likes it!",
    image: "/src/assets/images/apple_pie_ice_cream_1781823836165.jpg",
    prepTime: "30 min",
    cookTime: "45 min",
    difficulty: "Hard",
    dietaryTags: ["V", "NF"],
    subDishes: [
      {
        name: "Warm Spiced Apple Filling",
        description: "Thin-sliced Granny Smith and Honeycrisp apples infused with caramelized brown sugar, cinnamon, and nutmeg.",
        ingredients: ["Granny Smith Apples", "Honeycrisp Apples", "Cinnamon", "Fresh Nutmeg", "Lemon Juice"]
      },
      {
        name: "Brown Sugar Oatmeal Crumble",
        description: "A crumbly, buttery topping containing rolled oats, brown sugar, and rich European sweet butter.",
        ingredients: ["Rolled Oats", "Unsalted Butter", "Brown Sugar", "Flour", "Cinnamon"]
      },
      {
        name: "House Vanilla Bean Ice Cream",
        description: "Extravagant homemade churned ice cream using organic milk, sweet cream, and real Madagascar vanilla beans.",
        ingredients: ["Heavy Whipping Cream", "Whole Milk", "Vanilla Bean Pods", "Sugar", "Egg Yolks"]
      }
    ],
    flavorProfile: [
      { label: "Warm Spice Comfort", value: 96, color: "bg-amber-800" },
      { label: "Buttery Richness", value: 90, color: "bg-yellow-600" },
      { label: "Fruity Sweetness", value: 85, color: "bg-rose-500" },
      { label: "Cold/Warm Contrast", value: 100, color: "bg-sky-500" }
    ],
    recipeIngredients: [
      "3 Granny Smith Apples (peeled and sliced thin)",
      "2 Honeycrisp Apples (peeled and sliced thin)",
      "1 tbsp Lemon Juice",
      "1/2 cup granulated Cane Sugar",
      "1 1/2 tsp ground Cinnamon",
      "1/4 tsp ground Nutmeg",
      "1 pre-prepared single 9-inch Pie Dough Crust",
      "1/2 cup All-Purpose Flour",
      "1/2 cup Old-Fashioned Rolled Oats",
      "1/2 cup light Brown Sugar (packed)",
      "1/2 cup cold Unsalted Butter (cubed)",
      "1 pint premium Vanilla Bean Ice Cream",
      "1 cup Fresh Berries (blueberries, raspberries, strawberries)",
      "Fresh mint sprigs for garnish"
    ],
    recipeSteps: [
      "Preheat your oven to 375°F (190°C). Lay your ready-to-use round pie crust into a 9-inch ceramic pie baking dish. Gently press against bottoms and crimp the upper edge decoratively.",
      "In a large mixing bowl, toss the thin apple slices with lemon juice, granulated sugar, 1 tsp cinnamon, nutmeg, and a tiny pinch of salt. Let stand for 10 minutes to extract juices.",
      "Make the Streusel Topping: In a separate medium bowl, mix the flour, oats, packed brown sugar, and remaining 1/2 tsp cinnamon. Add the cold cubed butter.",
      "Rub the cold butter into the dry oat mixture using your clean fingertips until it forms clumpy crumbs about the size of blueberries. Do not overwork or let the butter melt.",
      "Transfer the apples including the delicious sugary juices into the pie shell, pressing them down so they reside tightly. Pile them in the center.",
      "Thoroughly cover the apples with the sweet butter oat streusel crumb mixture, ensuring it forms a thick golden roof over the apples.",
      "Bake for 40-45 minutes or until the streusel is beautifully deepened gold and crisp, and the apple juices are slowly bubbling and thick at the edges.",
      "Let cool slightly for 15 minutes before slicing. Serve warm with an absolute peak scoop of gourmet vanilla bean ice cream and sweet fresh forest farm berries on the plate."
    ],
    chefTip: "To avoid soggy bottoms, bake the pie on the lowest wire shelf of your oven. This conducts intensive heat to the bottom crust first, ensuring it gets deliciously crisp while baking."
  }
];
