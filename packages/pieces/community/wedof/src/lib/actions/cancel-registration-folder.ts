import {HttpMethod, httpClient} from '@activepieces/pieces-common';
import {wedofAuth} from '../..';
import {
    createAction,
    Property,
} from '@activepieces/pieces-framework';
import {wedofCommon} from '../common/wedof';

export const cancelRegistrationFolder = createAction({
    auth: wedofAuth,
    name: 'cancelRegistrationFolder',
    displayName: 'Annuler le dossier de formation',
    description: 'Change l\'etat d\'un dossier de formation en annulé ',
    props: {},
    async run() {
        // Action logic here
    },
});
