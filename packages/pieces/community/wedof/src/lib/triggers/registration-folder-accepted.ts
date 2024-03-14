import { wedofAuth } from '../..';
import {
  createTrigger,
  Property,
  TriggerStrategy,
} from '@activepieces/pieces-framework';
import { httpClient, HttpMethod } from '@activepieces/pieces-common';
import { wedofCommon } from '../common/wedof';

export const registrationFolderAccepted = createTrigger({
  auth: wedofAuth,
  name: 'registrationFolderAccepted',
  displayName: 'Dossier accepté',
  description: 'triggers when registration folder is accepted',
  props: {},
  sampleData: {},
  type: TriggerStrategy.WEBHOOK,
  async onEnable(context) {
    const name =
      'Activepieces - RegistrationFolderAccepted - ' +
      context.webhookUrl.substring(context.webhookUrl.lastIndexOf('/') + 1);

    const message = {
      url: context.webhookUrl,
      events: ['registrationFolder.accepted'],
      name: name,
      secret: null,
      enabled: true,
      ignoreSsl: true,
    };

    const id = await context.store.get('_webhookId');
    console.log('/////////// id stocker is ////' + id);
    if (id === null) {
      const response = await httpClient.sendRequest({
        method: HttpMethod.POST,
        url: wedofCommon.baseUrl + '/webhooks',
        body: message,
        headers: {
          'Content-Type': 'application/json',
          'X-Api-Key': context.auth as string,
        },
      });

      console.log('/////////// created id is ////' + response.body.id);
      await context.store.put('_webhookId', response.body.id);
    } else {
      console.log('/////////// webhook already created ////');
    }
  },

  async onDisable(context) {
    const id = await context.store.get('_webhookId');

    console.log('/////////// on supprime id ////' + id);
    await httpClient.sendRequest({
      method: HttpMethod.DELETE,
      url: wedofCommon.baseUrl + '/webhooks/' + id,
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': context.auth as string,
      },
    });
    await context.store.delete('_webhookId');
  },
  async run(context) {
    return [context.payload.body];
  },
});
