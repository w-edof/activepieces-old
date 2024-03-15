import { HttpMethod, httpClient } from '@activepieces/pieces-common';
import { wedofAuth } from '../..';
import {
  createAction,
  Property,
} from '@activepieces/pieces-framework';
import { wedofCommon } from '../common/wedof';

export const declareRegistrationFolderTerminated = createAction({
  auth: wedofAuth,
  name: 'declareRegistrationFolderTerminated',
  displayName: 'Déclarer la sortie de formation du participant',
  description: 'Change l\'etat d\'un dossier de formation en sortie de formation',
  props: {
    externalId: Property.ShortText({
      displayName: 'Id externe',
      description:
        'Selectionner la propieté {externalId} du dossier de formation',
      required: true,
    }),
    date: Property.ShortText({
      displayName: 'Date',
      description: 'Date du passage en formation au format YYYY-MM-DD.',
      required: false,
    }),
    code: Property.ShortText({
      displayName: 'Code de sortie de formation',
      description: 'Selectionner la propieté {code} du bloc Raisons de sortie de formation',
      required: false,
    }),
    absenceDuration: Property.Number({
      displayName: "durée d'absence",
      description:
        "La durée d'une éventuelle absence en heures. 0 si aucune absence.",
      required: false,
    }),
  },
  async run(context) {
    const message = {
      date: context.propsValue.date,
      code: context.propsValue.code,
      absenceDuration: context.propsValue.absenceDuration,
    };

    return await httpClient.sendRequest({
      method: HttpMethod.POST,
      url:
        wedofCommon.baseUrl +
        '/registrationFolders/' +
        context.propsValue.externalId +
        '/terminate',
      body: message,
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': context.auth as string,
      },
    });
  },
});
