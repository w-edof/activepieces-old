import {HttpMethod, httpClient} from '@activepieces/pieces-common';
import {wedofAuth} from '../..';
import {createAction} from '@activepieces/pieces-framework';
import {wedofCommon} from '../common/wedof';

export const getTerminatedRegistrationFoldesReasons = createAction({
    auth: wedofAuth,
    name: 'getTerminatedRegistrationFoldesReasons',
    displayName: 'Raisons de sortie de formation',
    description: 'list les codes de sortie d\'un dossier de formation possibles',
    props: {},
    async run(context) {
        return await httpClient.sendRequest({
            method: HttpMethod.GET,
            url:
                wedofCommon.baseUrl +
                '/registrationFoldersReasons?type=terminated',
            headers: {
                'Content-Type': 'application/json',
                'X-Api-Key': context.auth as string,
            },
        });
    },
});
