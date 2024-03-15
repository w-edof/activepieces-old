import { HttpMethod, httpClient } from '@activepieces/pieces-common';
import { wedofAuth } from '../..';
import {
  createAction,
  Property,
} from '@activepieces/pieces-framework';
import { wedofCommon } from '../common/wedof';

export const declareRegistrationFolderIntraining = createAction({
  auth: wedofAuth,
  name: 'declareRegistrationFolderIntraining',
  displayName: 'Déclarer l\'entrée en formation du participant',
  description: 'Passe le dossier dans l\'état en formation',
  props: {
    externalId: Property.ShortText({
      displayName: 'Id externe',
      description: 'Selectionner la propieté {externalId} du dossier de formation',
      required: true,
    }),
    date: Property.ShortText({
      displayName: 'Date',
      description: 'Date du passage en formation au format YYYY-MM-DD.',
      required: false,
    }),
  },
  async run(context) {
    const message = {
      date: context.propsValue.date,
    };

    return await httpClient.sendRequest({
      method: HttpMethod.POST,
      url:
        wedofCommon.baseUrl +
        '/registrationFolders/' +
        context.propsValue.externalId +
        '/inTraining',
      body: message,
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': context.auth as string,
      },
    });
  },
});
