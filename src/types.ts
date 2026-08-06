export type CourseId = 1 | 2 | 3;

export type DietTag = 'V' | 'VE' | 'GF' | 'DF' | 'NF'; // Vegetarian, Vegan, Gluten-Free, Dairy-Free, Nut-Free

export interface DietInfo {
  tag: DietTag;
  label: string;
  description: string;
  colorClass: string;
  bgColorClass: string;
}

export interface SubDish {
  name: string;
  description: string;
  ingredients: string[];
}

export interface FlavorStat {
  label: string;
  value: number; // Percentage 0 - 100
  color: string;
}

export interface Course {
  id: CourseId;
  courseNumber: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  prepTime: string;
  cookTime: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  dietaryTags: DietTag[];
  subDishes: SubDish[];
  flavorProfile: FlavorStat[];
  recipeIngredients: string[];
  recipeSteps: string[];
  chefTip: string;
}

export interface TastingSession {
  notes: string;
  dietaryFilters: DietTag[];
  likedDishes: string[];
  cookedSteps: { [key: string]: boolean };
}
