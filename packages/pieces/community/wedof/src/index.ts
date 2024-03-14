import {
  createPiece,
  PieceAuth,
} from '@activepieces/pieces-framework';
import { PieceCategory } from '@activepieces/shared';
import {
  httpClient,
  HttpMethod,
} from '@activepieces/pieces-common';
import { wedofCommon } from './lib/common/wedof';
import { newRegistrationFolderCreated } from './lib/triggers/new-registration-folder-created';
import { registrationFolderUpdated } from './lib/triggers/registration-folder-updated';
import { registrationFolderAccepted } from './lib/triggers/registration-folder-accepted';
import { registrationFolderPaid } from './lib/triggers/registration-folder-paid';
import { registrationFolderSelected } from './lib/triggers/registration-folder-selected';
import { registrationFolderTobill } from './lib/triggers/registration-folder-tobill';
import { validateRegistrationFolder } from './lib/actions/validate-registration-folder';

export const wedofAuth = PieceAuth.SecretText({
  displayName: 'API Key',
  required: true,
  description: 'Please enter your API Key gived by wedof',
  validate: async ({ auth }) => {
    const response = await httpClient.sendRequest({
      method: HttpMethod.GET,
      url: wedofCommon.baseUrl + '/users/me',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': auth,
      },
    });

    if (response.status === 200) {
      return {
        valid: true,
      };
    } else {
      return {
        valid: false,
        error: 'Invalid Api Key'
      };
    }
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
  actions: [validateRegistrationFolder],
  triggers: [newRegistrationFolderCreated,
    registrationFolderUpdated,
    registrationFolderAccepted,
    registrationFolderPaid,
    registrationFolderSelected,
    registrationFolderTobill],
});
