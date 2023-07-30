import DragEndModel from '../../models/DragEndModel';
import { useProfExperiencesStore, useProfExperienceFormStore } from '../../store';
import DndList from '../DndList/DndList';
import ProfExperienceForm from './ProfExperienceForm/ProfExperienceForm';
import { reorder } from '../../utils/utils';
import Panel from '../Panel/Panel';
import ProfExperienceModel from '../../models/ProfExperienceModel';
import { useTranslation } from 'react-i18next';

export default function ProfExperiencesPanel() {
    const { t } = useTranslation();
    const { showProfExperienceForm, setShowProfExperienceForm } = useProfExperienceFormStore((state) => state);
    const { profExperiences, dndProfExperiences, setProfExperiences, removeProfExperience, setEditedProfExperience, getProfExperienceById } = useProfExperiencesStore((state) => state);

    const onProfExperienceAdd = () => {
        setShowProfExperienceForm(true);
    }

    const onProfExperienceEdit = (id: string) => {
        setShowProfExperienceForm(true);
        setEditedProfExperience(getProfExperienceById(id));
    }


    const onProfExperienceRemove = (id: string) => {
        removeProfExperience(id);
    }

    const onProfExperienceDragEnd = ({ destination, source, handlers }: DragEndModel) => {
        handlers.reorder({ from: source.index, to: destination?.index || 0 })
        const reorderedList = [...dndProfExperiences];
        const [removedItem] = reorderedList.splice(source.index, 1);
        destination && reorderedList.splice(destination.index, 0, removedItem);
        const reorderedProfExperiences = reorder<ProfExperienceModel>(source.index, destination?.index || 0, dndProfExperiences, profExperiences);
        setProfExperiences(reorderedProfExperiences);
    }

    return (
        <Panel title={t('profExperience')}>
            {!showProfExperienceForm && <DndList
                list={dndProfExperiences}
                onAdd={onProfExperienceAdd}
                onDragEnd={onProfExperienceDragEnd}
                onEdit={onProfExperienceEdit}
                onRemove={onProfExperienceRemove}
            />}
            {showProfExperienceForm && <ProfExperienceForm />}
        </Panel>
    );
}