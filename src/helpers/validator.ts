import Joi from 'joi';

import { ValidationError } from './errors';
import {
  EnumOrderBy,
  EnumCategories,
  ICreateNotePayload,
  IUpdateNotePayload,
  ISearchNotesParams,
} from '../types/index';

class NotesValidator {
  private static createNoteSchema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    content: Joi.string().min(5).max(200).required(),
    category: Joi.string()
      .valid(EnumCategories.IDEA, EnumCategories.RANDOM_THOUGHT, EnumCategories.TASK)
      .required(),
  });

  private static updateNoteSchema = Joi.object({
    name: Joi.string().min(5).max(50),
    content: Joi.string().min(5).max(200),
    isActive: Joi.boolean(),
    category: Joi.string().valid(
      EnumCategories.IDEA,
      EnumCategories.RANDOM_THOUGHT,
      EnumCategories.TASK,
    ),
  });

  private static searchNotesParamsSchema = Joi.object({
    page: Joi.number().min(1),
    limit: Joi.number().min(2).max(20),
    orderBy: Joi.string().valid(EnumOrderBy.ASC, EnumOrderBy.DESC),
  });

  public static validateCreateNotePayload(payload: ICreateNotePayload) {
    const result = this.createNoteSchema.validate(payload);
    if (result.error) throw new ValidationError(result.error.message);
  }

  public static validateUpdateNotePayload(payload: IUpdateNotePayload) {
    const result = this.updateNoteSchema.validate(payload);
    if (result.error) throw new ValidationError(result.error.message);
  }

  public static validateSearchNotesParams(payload: ISearchNotesParams) {
    const result = this.searchNotesParamsSchema.validate(payload);
    if (result.error) throw new ValidationError(result.error.message);
  }
}

export default NotesValidator;
