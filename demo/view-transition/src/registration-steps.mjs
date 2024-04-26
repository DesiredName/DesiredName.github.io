import fetch_template from '/utils/fetch-template.mjs';

export default class STEPS {
    static STEP_1 = 'step_1';
    static STEP_2 = 'step_2';
    static STEP_REGISTER = 'step_register';

    static next(step_id) {
        switch (step_id) {
            case STEPS.STEP_1:
                return STEPS.STEP_2;
            case STEPS.STEP_2:
                return STEPS.STEP_REGISTER;
            default:
                return STEPS.STEP_1;
        }
    }

    static previous(step_id) {
        switch (step_id) {
            case STEPS.STEP_REGISTER:
                return STEPS.STEP_2;
            case STEPS.STEP_2:
            default:
                return STEPS.STEP_1;
        }
    }

    static get_html(page_id) {
        switch (page_id) {
            case STEPS.STEP_2:
                return () => fetch_template('./step_2.html');
            case STEPS.STEP_REGISTER:
                return () => fetch_template('./step_register.html');
            case STEPS.STEP_1:
            default:
                return () => fetch_template('./step_1.html');
        }
    }
}
