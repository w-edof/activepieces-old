import {HttpMethod, httpClient} from '@activepieces/pieces-common';
import {wedofAuth} from '../..';
import {createAction} from '@activepieces/pieces-framework';
import {wedofCommon} from '../common/wedof';

export const getTerminatedRegistrationFoldesReasons = createAction({
    auth: wedofAuth,
    name: 'getTerminatedRegistrationFoldesReasons',
    displayName: 'Raisons possible pour la sortie de formation',
    description: 'liste les codes possibles de sortie d\'un dossier de formation',
    props: {},
    async run(context) {
        return (await httpClient.sendRequest({
            method: HttpMethod.GET,
            url:
                wedofCommon.baseUrl +
                '/registrationFoldersReasons?type=terminated',
            headers: {
                'Content-Type': 'application/json',
                'X-Api-Key': context.auth as string,
            },
        })).body;
    },
});
