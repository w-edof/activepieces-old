import { HttpMethod, httpClient } from '@activepieces/pieces-common';
import { wedofAuth } from '../..';
import {
  createAction,
  Property,
} from '@activepieces/pieces-framework';
import { wedofCommon } from '../common/wedof';

export const billRegistrationFolder = createAction({
  auth: wedofAuth,
  name: 'billRegistrationFolder',
  displayName: 'Facturer le dossier de l\'apprenant',
  description: 'Genere la facturation d\'un dossier de formation',
  props: {
    externalId: Property.ShortText({
      displayName: 'Id externe',
      description: 'Selectionner la propieté {externalId} du dossier de formation',
      required: true,
    }),
    billNumber: Property.ShortText({
      displayName: 'Numéro de facture',
      description: 'Remplire un numéro de facture',
      required: true,
    }),
    vatRate: Property.Number({
      displayName: 'TVA',
      description: "Permet de forcer un Taux de TVA en %. Par defaut la TVA est calculé à partir des données du dossier",
      required: false,
    }),
  },
  async run(context) {
    const message = {
      billNumber: context.propsValue.billNumber,
      vatRate: context.propsValue.vatRate,
    };

    return await httpClient.sendRequest({
      method: HttpMethod.POST,
      url:
        wedofCommon.baseUrl +
        '/registrationFolders/' +
        context.propsValue.externalId +
        '/billing',
      body: message,
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': context.auth as string,
      },
    });
  },
});
