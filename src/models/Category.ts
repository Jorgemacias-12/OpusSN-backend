export interface Category {
  id: number;
  Name: string;
}

export interface NewCategory extends Pick<Category, "Name"> { };