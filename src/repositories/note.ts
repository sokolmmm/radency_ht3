/* eslint-disable class-methods-use-this */
import fs from 'fs';

import {
  INote, ICreateNote, IUpdateNotePayload, EnumOrderBy, EnumCategories,
} from '../types';

class Note {
  id: number;

  name: string;

  content: string;

  category: string;

  created: string;

  dates: string;

  isActive: boolean;

  private setNoteData(payload: ICreateNote) {
    this.name = payload.name;
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

  private getNotesFromDatabase() {
    const notesList = fs.readFileSync('src/database.json').toString();

    if (!notesList) {
      return [];
    }
    const notes: INote[] = JSON.parse(notesList);

    return notes;
  }

  private setNewNoteId() {
    const notes = this.getNotesFromDatabase();

    if (notes.length > 0) {
      const lastId = notes[notes.length - 1].id;
      this.id = lastId + 1;
    } else {
      this.id = 1;
    }
  }

  private saveToDatabase(notes: INote[]) {
    fs.writeFileSync('src/database.json', JSON.stringify(notes));
  }

  public createNote(payload: ICreateNote) {
    this.setNewNoteId();
    this.setNoteData(payload);

    const notes = this.getNotesFromDatabase();
    const note = this.mapNote();

    notes.push(note);

    this.saveToDatabase(notes);

    return note;
  }

  public updateNote(id: number, payload: IUpdateNotePayload) {
    const notes = this.getNotesFromDatabase();

    const index = notes.findIndex((el) => el.id === +id);

    if (index < 0) return null;

    const note = { ...notes[index] };

    note.content = payload.content || note.content;
    note.category = payload.category || note.category;
    note.name = payload.name || note.name;

    notes[index] = { ...note };

    this.saveToDatabase(notes);

    return note;
  }

  public getNote(id: string) {
    const notes = this.getNotesFromDatabase();

    const index = notes.findIndex((el) => el.id === +id);

    if (index < 0) return null;

    const note = { ...notes[index] };

    return note;
  }

  public deleteNote(id: string) {
    const notes = this.getNotesFromDatabase();

    const index = notes.findIndex((el) => el.id === +id);

    if (index < 0) return null;

    const note = { ...notes[index] };

    notes.splice(index, 1);

    this.saveToDatabase(notes);

    return note;
  }

  public getNotesBySearchParams(skip: number, take: number, orderBy: EnumOrderBy) {
    const notes = this.getNotesFromDatabase();

    const resultList = notes.splice(skip, take).sort((a, b) => {
      if (orderBy === EnumOrderBy.DESC) {
        return b.id - a.id;
      }
      return a.id - b.id;
    });

    return resultList;
  }

  public getStatsByCategory(category: EnumCategories) {
    const notes = this.getNotesFromDatabase();

    const activeSummaryByCategory = notes.filter(
      (item) => item.category === category && item.isActive,
    ).length;

    const archivedSummaryByCategory = notes.filter(
      (item) => item.category === category && !item.isActive,
    ).length;

    return {
      category,
      active: activeSummaryByCategory,
      archived: archivedSummaryByCategory,
    };
  }
}

export default new Note();
