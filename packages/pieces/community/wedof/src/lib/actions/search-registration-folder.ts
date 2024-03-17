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
        query: Property.ShortText({
            displayName: 'Recherche',
            description: 'Nom, prénom, N° de dossier, N° de certification etc..',
            required: false,
        }),
        type: wedofCommon.type,
        state: wedofCommon.state,
        period: wedofCommon.period,
        since: Property.DateTime({
            displayName: 'Entre le',
            description: 'Date au format YYYY-MM-DD',
            required: false,
        }),
        until: Property.DateTime({
            displayName: "et jusqu'au",
            description: 'Date au format YYYY-MM-DD',
            required: false
        }),
        filterOnStateDate: wedofCommon.filterOnStateDate,
        billingState: wedofCommon.billingState,
        controlState: wedofCommon.controlState,
        certificationFolderState: wedofCommon.certificationFolderState,
        proposalCode: Property.ShortText({
            displayName: "Code de proposition commercial",
            description: 'Code de la proposition commercial Wedof associé',
            required: false,
        }),
        limit: Property.Number({
            displayName: "Nombre de dossiers de formation",
            description: "Nombre de dossiers de formation maximum qui seront retournés par requête",
            defaultValue: 100,
            required: false,
        }),
        page: Property.Number({
            displayName: "N° de page de la requête",
            description: "Par défaut : 1",
            defaultValue: 1,
            required: false,
        })

    },

    async run(context) {
        const params = {
            query: context.propsValue.query ?? null,
            limit: context.propsValue.limit ?? null,
            page: context.propsValue.page ?? null,
            controlState: context.propsValue.controlState ?? null,
            state: context.propsValue.state ?? null,
            certificationFolderState: context.propsValue.certificationFolderState ?? null,
            billingState: context.propsValue.billingState ?? null,
            type: context.propsValue.type ?? null,
            period: context.propsValue.period ?? null,
            since: context.propsValue.since ? context.propsValue.since.replace('.000Z', 'Z') : null,
            until: context.propsValue.until ? context.propsValue.until.replace('.000Z', 'Z') : null,
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
