import {HttpMethod, httpClient} from '@activepieces/pieces-common';
import {wedofAuth} from '../..';
import {
    createAction,
    Property,
} from '@activepieces/pieces-framework';
import {wedofCommon} from '../common/wedof';

export const updateRegistrationFolder = createAction({
    auth: wedofAuth,
    name: 'updateRegistrationFolder',
    displayName: 'Mettre a jour un dossier de formation',
    description: 'Met a jour les informations d\'un dossier de formation',
    props: {
        externalId: Property.ShortText({
            displayName: 'Id externe',
            description: 'Selectionner la propieté {externalId} du dossier de formation',
            required: true,
        }),
        price: Property.Number({
            displayName: 'Prix de la formation',
            description: "Nouveau tarif en €",
            required: false,
        }),
        sessionStartDate: Property.ShortText({
            displayName: "Date de debut de la session",
            description: "Au format YYYY-MM-DD",
            required: false,
        }),
        sessionEndDate: Property.ShortText({
            displayName: "Date de fin de la session",
            description: "Au format YYYY-MM-DD",
            required: false,
        }),
        notes: Property.LongText({
            displayName: 'Notes',
            description: "notes privées",
            required: false,
        }),
        indicativeDuration: Property.Number({
            displayName: "durée moyenne de la formation (en heures)",
            description: "durée moyenne de la formation (en heures)",
            required: false,
        }),
        weeklyDuration: Property.Number({
            displayName: "temps de formation par semaine (en heures)",
            description: "Ne peut pas être supérieur à 99",
            required: false,
        }),

    },
    async run(context) {
        const message = {
            notes: context.propsValue.notes,
            priceChange: {
                price: context.propsValue.price,
            },
            trainingActionInfo: {
                sessionStartDate: context.propsValue.sessionStartDate,
                sessionEndDate: context.propsValue.sessionEndDate,
                indicativeDuration: context.propsValue.indicativeDuration,
                weeklyDuration: context.propsValue.weeklyDuration,
            }

        };
        return await httpClient.sendRequest({
            method: HttpMethod.PUT,
            body: message,
            url:
                wedofCommon.baseUrl +
                '/registrationFolders/' + context.propsValue.externalId,
            headers: {
                'Content-Type': 'application/json',
                'X-Api-Key': context.auth as string,
            },
        });
    },
});
