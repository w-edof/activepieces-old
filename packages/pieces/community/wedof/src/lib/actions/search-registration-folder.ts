import {HttpMethod, httpClient, QueryParams} from '@activepieces/pieces-common';
import {wedofAuth} from '../..';
import {
    createAction,
    Property,
} from '@activepieces/pieces-framework';
import {wedofCommon} from '../common/wedof';

export const searchRegistrationFolder = createAction({
    auth: wedofAuth,
    name: 'listRegistrationFolders',
    displayName: 'Rechercher un ou plusieurs dossiers de formation',
    description: "Liste les dossiers de formation en fonction des critères sélectionnés",
    props: {
        limit: Property.ShortText({
            displayName: "Nombre de dossiers de formation maximum retournés",
            description: "Nombre de dossiers de formation sont retournés par requête",
            defaultValue: "100",
            required: false,
        }),
        page: Property.ShortText({
            displayName: "N° de page de la requête",
            description: "Par défaut : 1",
            defaultValue: "1",
            required: false,
        }),
        controlState: wedofCommon.controlState,
        state: wedofCommon.state,
        certificationFolderState: wedofCommon.certificationFolderState,
        billingState: wedofCommon.billingState,
        type: wedofCommon.type,
        period: wedofCommon.period,
        since: Property.ShortText({
            displayName: 'Entre le',
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
            displayName: "Code de proposition commercial",
            description: 'Code de la proposition commercial Wedof associé',
            required: false,
        }),

    },

    async run(context) {
        const params = {
            limit: context.propsValue.limit ?? null,
            page: context.propsValue.page ?? null,
            controlState: context.propsValue.controlState ?? null,
            state: context.propsValue.state ?? null,
            certificationFolderState: context.propsValue.certificationFolderState ?? null,
            billingState: context.propsValue.billingState ?? null,
            type: context.propsValue.type ?? null,
            period: context.propsValue.period ?? null,
            since: context.propsValue.since ?? null,
            until: context.propsValue.until ?? null,
            filterOnStateDate: context.propsValue.filterOnStateDate ?? null,
            proposalCode: context.propsValue.proposalCode ?? null,
        };
        let queryParams: QueryParams = {};
        Object.keys(params).forEach(value => {
            const key = value as keyof typeof params;
            if (params[key] != null && params[key] != undefined) {
                queryParams[value] = params[key] as string;
            }
        })
        return (await httpClient.sendRequest({
            method: HttpMethod.GET,
            queryParams: queryParams,
            url:
                wedofCommon.baseUrl +
                '/registrationFolders',
            headers: {
                'Content-Type': 'application/json',
                'X-Api-Key': context.auth as string,
            },
        })).body;
    },
});
