import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export function CommonDoc() {
  return applyDecorators(
    ApiBearerAuth('Bearer'),
    ApiBadRequestResponse({ description: 'Bad Request' }),
    ApiUnauthorizedResponse({ description: 'Unauthorized Request' }),
    ApiForbiddenResponse({ description: 'Forbidden Request' }),
    ApiInternalServerErrorResponse({
      description: 'Internal Server Error Request',
    }),
  );
}
