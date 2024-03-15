import { HttpMethod, httpClient } from '@activepieces/pieces-common';
import { wedofAuth } from '../..';
import {
  createAction,
  Property
} from '@activepieces/pieces-framework';
import { wedofCommon } from '../common/wedof';

export const listRegistrationFolders = createAction({
  auth: wedofAuth,
  name: 'listRegistrationFolders',
  displayName: 'Lister des dossiers de formation',
  description: "Liste tous les dossiers pour l'organisme de l'utilisateur courant",
  props: {
    limit: Property.ShortText({
      displayName: "Nombre d'éléments retourné par requête",
      description: "par défaut 100",
      required: false,
    }),
    page: Property.ShortText({
      displayName: "Numéro de page de la requête",
      description: "par défaut la première",
      required: false,
    }),
  },
  async run(context) {
    const message = {
      limit: context.propsValue.limit,
      page: context.propsValue.page,
    };
    return await httpClient.sendRequest({
      method: HttpMethod.GET,
      body: message,
      url:
        wedofCommon.baseUrl +
        '/registrationFolders',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': context.auth as string,
      },
    });
  },
});
