import {wedofAuth} from '../..';
import {
    createTrigger,
    Property,
    TriggerStrategy,
} from '@activepieces/pieces-framework';
import {httpClient, HttpMethod} from '@activepieces/pieces-common';
import {wedofCommon} from '../common/wedof';

export const registrationFolderTobill = createTrigger({
    auth: wedofAuth,
    name: 'registrationFolderTobill',
    displayName: 'Dossier de formation à facturer',
    description: 'Se déclenche Lorsqu\'un dossier de formation est prêt à être facturé (service fait validé)',
    props: {},
    sampleData: {},
    type: TriggerStrategy.WEBHOOK,
    async onEnable(context) {
        const name =
            'Activepieces - RegistrationFolderToBill - ' +
            context.webhookUrl.substring(context.webhookUrl.lastIndexOf('/') + 1);

        const message = {
            url: context.webhookUrl,
            events: ['registrationFolderBilling.toBill'],
            name: name,
            secret: null,
            enabled: true,
            ignoreSsl: false,
        };

        const id = await context.store.get('_webhookId');

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

            await context.store.put('_webhookId', response.body.id);
        } else {
            console.log('/////////// webhook already exist ////');
        }
    },

    async onDisable(context) {
        const id = await context.store.get('_webhookId');

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
