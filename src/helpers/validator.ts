import Joi from 'joi';

import { NotFoundError } from './errors';
import { ICreateNotePayload, IUpdateNotePayload, EnumCategories } from '../types/index';

class NotesValidator {
  private static createNoteSchema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    content: Joi.string().min(5).max(200).required(),
    category: Joi.string().valid(
      EnumCategories.IDEA,
      EnumCategories.RANDOM_THOUGHT,
      EnumCategories.TASK,
    ).required(),
  });

  private static updateNoteSchema = Joi.object({
    name: Joi.string().min(5).max(50),
    content: Joi.string().min(5).max(200),
    category: Joi.string().valid(
      EnumCategories.IDEA,
      EnumCategories.RANDOM_THOUGHT,
      EnumCategories.TASK,
    ),
  });

  public static validateCreateNotePayload(payload: ICreateNotePayload) {
    const result = this.createNoteSchema.validate(payload);
    if (result.error) throw new NotFoundError(result.error.message);
  }

  public static validateUpdateNotePayload(payload: IUpdateNotePayload) {
    const result = this.updateNoteSchema.validate(payload);
    if (result.error) throw new NotFoundError(result.error.message);
  }
}

export default NotesValidator;
