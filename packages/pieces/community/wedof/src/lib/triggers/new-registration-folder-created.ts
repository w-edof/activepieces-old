import { wedofAuth } from '../..';
import { createTrigger, TriggerStrategy } from '@activepieces/pieces-framework';
import { httpClient,HttpMethod } from '@activepieces/pieces-common';
import { wedofCommon } from '../common/wedof';

export const newRegistrationFolderCreated = createTrigger({
  auth: wedofAuth,
  name: 'newRegistrationFolderCreated',
  displayName: 'new registration folder created',
  description: 'triggers when a new registration folder is created',
  type: TriggerStrategy.WEBHOOK,
  props: {},
  sampleData: {},
  async onEnable(context) {

    const message = {
      url: context.webhookUrl,
      events: ['registrationFolder.created'],
      name: 'RfCreated',
      secret: null,
      enabled: true,
      ignoreSsl: true,
    };

    const response =  await httpClient.sendRequest({
        method: HttpMethod.POST,
        url: wedofCommon.fakeMeUrl,
        body: message,
        headers:{
          'Content-Type': 'application/json',
          'X-Api-Key': context.auth.apiKey as string,
          'Host': wedofCommon.host,
          'Content-Length': '115',
        },
        queryParams: {
          siret:"53222292400039",
        },
      });
  },
  async onDisable(context) {
    // implement webhook deletion logic
  },
  async run(context) {
      return [context.payload.body];
  },
});
