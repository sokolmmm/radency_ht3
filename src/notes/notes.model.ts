import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface NoteCreationAttrs {
  name: string;
  content: string;
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
  })
  name: string;

  @Column({
    type: DataType.STRING,
  })
  content: string;

  @Column({
    type: DataType.STRING,
  })
  category: string;

  @Column({
    type: DataType.STRING,
  })
  dates: string;

  @Column({
    type: DataType.BOOLEAN,
  })
  isActive: boolean;
}
