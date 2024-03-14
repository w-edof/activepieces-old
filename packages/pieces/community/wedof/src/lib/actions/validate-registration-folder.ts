import { HttpMethod, httpClient } from '@activepieces/pieces-common';
import { wedofAuth } from '../..';
import { createAction, Property,PieceAuth } from '@activepieces/pieces-framework';
import { wedofCommon } from '../common/wedof';

const markdown = `
Selectionner la propieté {externalId}
`;

export const validateRegistrationFolder = createAction({
  auth: wedofAuth,
  name: 'validateRegistrationFolder',
  displayName: 'Valider le dossier de l\'apprenant ',
  description: 'change the state of the registration folder to validated',
  props: {
    about: Property.MarkDown({
      value: markdown,
    }),
    externalId: Property.ShortText({
      displayName: 'Id externe',
      description: 'selectionner le externalid',
      required: true,
     // defaultValue: ''
  })
  },
  async run(context) {
    return  await httpClient.sendRequest({
      method: HttpMethod.POST,
      url: wedofCommon.baseUrl + '/registrationFolders/'+context.propsValue.externalId+'/validate',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': context.auth as string,
      },
    });
  },
});
