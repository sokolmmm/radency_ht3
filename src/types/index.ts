export enum EnumCategories {
  TASK = 'Task',
  RANDOM_THOUGHT = 'Random thought',
  IDEA = 'Idea',
}

export interface INote {
  id: string;
  name: string;
  created: string;
  category: string;
  content: string;
  dates: string;
  isActive: boolean;
}

export interface ICreateNotePayload {
  name: string;
  content: string;
  category: string;
}
