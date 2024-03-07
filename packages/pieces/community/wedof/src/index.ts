import { createPiece, PieceAuth, Property } from '@activepieces/pieces-framework';
import { PieceCategory } from '@activepieces/shared';
import { newRegistrationFolderCreated } from './lib/triggers/new-registration-folder-created';

export const wedofAuth = PieceAuth.SecretText({
  displayName: 'API Key',
  required: true,
  description: 'Please enter your API Key gived by wedof',
  // need validation for the api key ??
/*  props:{
    apiKey: Property.ShortText({
      displayName: 'Api Key',
      description: 'Please enter your API Key gived by wedof',
      required: true,
    }),
  },*/
  validate: async ({ auth }) => {
    if (auth) {
      return {
        valid: true,
      };
    }
    return {
      valid: false,
      error: 'Invalid Api Key',
    };
  },
});

export const wedof = createPiece({
  displayName: 'Wedof',
  auth: wedofAuth,
  minimumSupportedRelease: '0.20.0',
  logoUrl: 'https://www.wedof.fr/api/doc/logo.png',
  categories: [
    PieceCategory.SALES_AND_CRM,
    PieceCategory.CONTENT_AND_FILES,
    PieceCategory.PRODUCTIVITY,
  ],
  authors: ['Wedof'],
  actions: [
  ],
  triggers: [newRegistrationFolderCreated],
});
