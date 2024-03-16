import {HttpMethod, httpClient} from '@activepieces/pieces-common';
import {wedofAuth} from '../..';
import {
    createAction,
    Property,
} from '@activepieces/pieces-framework';
import {wedofCommon} from '../common/wedof';

export const validateRegistrationFolder = createAction({
    auth: wedofAuth,
    name: 'validateRegistrationFolder',
    displayName: "Valider le dossier de l'apprenant ",
    description: 'Change l\'etat du dossier de formation a l\'etat validé',
    props: {

        externalId: Property.ShortText({
            displayName: 'Id externe',
            description: 'Selectionner la propieté {externalId} du dossier de formation',
            required: true,
        }),
        indicativeDuration: Property.ShortText({
            displayName: 'Durée totale de la formation',
            description: 'Obligatoire dans le cas d\'un dossier avec financement Pôle Emploi ',
            required: false,
        }),
        weeklyDuration: Property.ShortText({
            displayName: 'Intensité hebdomadaire',
            description: 'Intensité hebdomadaire de la formation, en heures par semaine.',
            required: false,
        }),
    },
    async run(context) {
        const message = {
            indicativeDuration: context.propsValue.indicativeDuration,
            weeklyDuration: context.propsValue.weeklyDuration
        };

        return await httpClient.sendRequest({
            method: HttpMethod.POST,
            url:
                wedofCommon.baseUrl +
                '/registrationFolders/' +
                context.propsValue.externalId +
                '/validate',
            body: message,
            headers: {
                'Content-Type': 'application/json',
                'X-Api-Key': context.auth as string,
            },
        });
    },
});
