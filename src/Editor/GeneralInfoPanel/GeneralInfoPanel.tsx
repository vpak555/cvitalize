import GeneralInfoForm from "./GeneralInfoForm/GeneralInfoForm";
import Panel from "../Panel/Panel";
import { useTranslation } from 'react-i18next';

export default function GeneralInfoPanel() {
    const { t } = useTranslation();

    return (
        <Panel title={t('generalInfo')}>
            <GeneralInfoForm />
        </Panel>
    );
}