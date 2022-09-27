import Joi from 'joi';

import { NotFoundError } from './errors';
import { ICreateNotePayload, EnumCategories } from '../types/index';

class NotesValidator {
  private static createNoteSchema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    content: Joi.string().min(5).max(200).required(),
    category: Joi.string().valid(
      EnumCategories.IDEA,
      EnumCategories.RANDOM_THOUGHT,
      EnumCategories.TASK,
    ),
  });

  public static validateCreateUserPayload(payload: ICreateNotePayload) {
    const result = this.createNoteSchema.validate(payload);
    if (result.error) throw new NotFoundError(result.error.message);
  }
}

export default NotesValidator;
