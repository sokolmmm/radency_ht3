import fs from 'fs';

import { INote } from '../types';

class Note {
  id: string;

  name: string;

  content: string;

  category: string;

  created: string;

  dates: string;

  isActive: boolean;

  private setNoteData(payload: INote) {
    this.id = payload.id;
    this.content = payload.content;
    this.category = payload.category;
    this.created = payload.created;
    this.dates = payload.dates;
    this.isActive = payload.isActive;
  }

  private mapNote(): INote {
    return {
      id: this.id,
      name: this.name,
      content: this.content,
      category: this.category,
      created: this.created,
      dates: this.dates,
      isActive: this.isActive,
    };
  }

  private entityToString(): string {
    return JSON.stringify(this.mapNote());
  }

  public createNote(payload: INote) {
    this.setNoteData(payload);

    fs.writeFileSync('src/database.json', this.entityToString());

    return this.mapNote();
  }
}

export default new Note();
