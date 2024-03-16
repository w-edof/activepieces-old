import {HttpMethod, httpClient} from '@activepieces/pieces-common';
import {wedofAuth} from '../..';
import {
    createAction,
    Property,
} from '@activepieces/pieces-framework';
import {wedofCommon} from '../common/wedof';

export const searchRegistrationFolder = createAction({
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
        controlState: wedofCommon.controlState,
        state: wedofCommon.state,
        certificationFolderState: wedofCommon.certificationFolderState,
        billingState: wedofCommon.billingState,
        type: wedofCommon.type,
        period: wedofCommon.period,
        since: Property.ShortText({
            displayName: 'Depuis le',
            description: 'Date au format YYYY-MM-DD',
            required: false,
        }),
        until: Property.ShortText({
            displayName: "Jusqu'au",
            description: 'Date au format YYYY-MM-DD',
            required: false,
        }),
        filterOnStateDate: wedofCommon.filterOnStateDate,
        proposalCode: Property.ShortText({
            displayName: "Code de proposition",
            description: '',
            required: false,
        }),

    },

    async run(context) {
        const message = {
            limit: context.propsValue.limit,
            page: context.propsValue.page,
            controlState: context.propsValue.controlState,
            state: context.propsValue.state,
            certificationFolderState: context.propsValue.certificationFolderState,
            billingState: context.propsValue.billingState,
            type: context.propsValue.type,
            period: context.propsValue.period,
            since: context.propsValue.since,
            until: context.propsValue.until,
            filterOnStateDate: context.propsValue.filterOnStateDate,
            proposalCode: context.propsValue.proposalCode,
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
