import PersonalDetailsForm from './PersonalDetailsForm/PersonalDetailsForm';
import Panel from '../Panel/Panel';
import { useTranslation } from 'react-i18next';

export default function PersonalDetailsPanel() {
    const { t } = useTranslation();

    return (
        <Panel title={t('personalDetails')}>
            <PersonalDetailsForm />
        </Panel>
    );
}