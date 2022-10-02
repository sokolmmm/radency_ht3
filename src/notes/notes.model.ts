import { Column, DataType, Model, Table } from 'sequelize-typescript';

export enum EnumCategories {
  TASK = 'Task',
  IDEA = 'Idea',
  RANDOM_THOUGHT = 'Random thought',
}

interface NoteCreationAttrs {
  name: string;
  content: string;
  category: string;
  created: string;
  dates: string;
  isActive: boolean;
}

@Table({ tableName: 'notes' })
export class Note extends Model<Note, NoteCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  content: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  category: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  dates: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  isActive: boolean;
}
