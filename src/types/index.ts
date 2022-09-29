export enum EnumCategories {
  TASK = 'Task',
  RANDOM_THOUGHT = 'Random thought',
  IDEA = 'Idea',
}

export enum EnumOrderBy {
  ASC = 'asc',
  DESC = 'desc',
}

export interface INote {
  id: number;
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

export interface IUpdateNotePayload {
  name?: string;
  content?: string;
  category?: string;
  isActive?: boolean;
}

export interface ICreateNote extends ICreateNotePayload {
  name: string;
  content: string;
  category: string;
  created: string;
  dates: string;
  isActive: boolean;
}

export interface ISearchNotesParams {
  page?: number;
  limit?: number;
  orderBy?: EnumOrderBy;
}

export interface ISummaryByCategories {
  category: string;
  active: number;
  archived: number;
}
