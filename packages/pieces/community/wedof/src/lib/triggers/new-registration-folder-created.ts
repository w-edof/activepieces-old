import { wedofAuth } from '../..';
import {
  createTrigger,
  Property,
  TriggerStrategy,
} from '@activepieces/pieces-framework';
import { httpClient, HttpMethod } from '@activepieces/pieces-common';
import { wedofCommon } from '../common/wedof';

const markdown = `
In the webhook settings, paste this URL: 
  \`{{webhookUrl}}\`
`;

export const newRegistrationFolderCreated = createTrigger({
  auth: wedofAuth,
  name: 'newRegistrationFolderCreated',
  displayName: 'Nouveau dossier',
  description: 'triggers when a new registration folder is created',
  type: TriggerStrategy.WEBHOOK,
  props: {
    about: Property.MarkDown({
      value: markdown,
    }),
  },
  sampleData: {},

  async onEnable(context) {
    const name ='Activepieces - newRegistrationFolderCreated - ' +context.webhookUrl.substring(context.webhookUrl.lastIndexOf('/') + 1);

    const message = {
      url: context.webhookUrl,
      events: ['registrationFolder.created'],
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
