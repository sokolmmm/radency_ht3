export class CreateNoteDto {
  readonly name: string;
  readonly content: string;
  readonly category: string;
}

export class UpdateNoteDto {
  readonly name: string;
  readonly content: string;
  readonly category: string;
  readonly isActive: boolean;
}
