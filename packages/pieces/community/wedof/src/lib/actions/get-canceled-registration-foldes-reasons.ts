import {HttpMethod, httpClient} from '@activepieces/pieces-common';
import {wedofAuth} from '../..';
import {createAction} from '@activepieces/pieces-framework';
import {wedofCommon} from '../common/wedof';

export const getCanceledRegistrationFoldesReasons = createAction({
    auth: wedofAuth,
    name: 'getCanceledRegistrationFoldesReasons',
    displayName: 'Raisons possible des annulations de dossier',
    description: 'liste les codes possibles d\'annulation d\'un dossier de formation',
    props: {},
    async run(context) {
        return await httpClient.sendRequest({
            method: HttpMethod.GET,
            url:
                wedofCommon.baseUrl +
                '/registrationFoldersReasons?type=canceled',
            headers: {
                'Content-Type': 'application/json',
                'X-Api-Key': context.auth as string,
            },
        });
    },
});
