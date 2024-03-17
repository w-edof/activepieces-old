import {HttpMethod, httpClient} from '@activepieces/pieces-common';
import {wedofAuth} from '../..';
import {
    createAction,
    Property,
} from '@activepieces/pieces-framework';
import {wedofCommon} from '../common/wedof';

export const declareRegistrationFolderIntraining = createAction({
    auth: wedofAuth,
    name: 'declareRegistrationFolderIntraining',
    displayName: 'Passer un dossier de formation à l\'état : En formation',
    description: 'Change l\'état d\'un dossier de formation vers : En formation',

    props: {
        externalId: Property.DateTime({
            displayName: 'N° du dossier de formation',
            description: 'Sélectionner la propriété {externalId} du dossier de formation',
            required: true,
        }),
        date: Property.DateTime({
            displayName: 'Entrée en formation le',
            description: 'Date du passage en formation au format YYYY-MM-DD.',
            required: false,
        }),
    },
    async run(context) {
        const message = {
            date: context.propsValue.date ? context.propsValue.date.split('T')[0] : null,
        };

        return (await httpClient.sendRequest({
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
        })).body;
    },
});
