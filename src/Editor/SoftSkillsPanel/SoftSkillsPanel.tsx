import { Switch } from '@mantine/core';
import { ChangeEvent } from 'react';
import DragEndModel from '../../models/DragEndModel';
import SkillModel from '../../models/SkillModel';
import { useSoftSkillsStore, useSoftSkillFormStore } from '../../store';
import { reorder } from '../../utils/utils';
import DndList from '../DndList/DndList';
import SoftSkillForm from '../SoftSkillsPanel/SoftSkillForm/SoftSkillForm';
import Panel from '../Panel/Panel';
import { useTranslation } from 'react-i18next';

export default function SoftSkillsPanel() {
    const { t } = useTranslation();
    const { setShowSoftSkillExpertise } = useSoftSkillsStore((state) => state);
    const { showSoftSkillForm, setShowSoftSkillForm } = useSoftSkillFormStore((state) => state);
    const { softSkills, dndSoftSkills, setSoftSkills, removeSoftSkill, setEditedSoftSkill, getSoftSkillById } = useSoftSkillsStore((state) => state);

    const onShowSoftSkillExpertise = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.checked;
        setShowSoftSkillExpertise(value);
    }

    const onSoftSkillAdd = () => {
        setShowSoftSkillForm(true);
    }

    const onSoftSkillEdit = (id: string) => {
        setShowSoftSkillForm(true);
        setEditedSoftSkill(getSoftSkillById(id))
    }


    const onSoftSkillRemove = (id: string) => {
        removeSoftSkill(id);
    }

    const onSoftSkillDragEnd = ({ destination, source, handlers }: DragEndModel) => {
        handlers.reorder({ from: source.index, to: destination?.index || 0 })
        const reorderedList = [...dndSoftSkills];
        const [removedItem] = reorderedList.splice(source.index, 1);
        destination && reorderedList.splice(destination.index, 0, removedItem);
        const reorderedSoftSkills = reorder<SkillModel>(source.index, destination?.index || 0, dndSoftSkills, softSkills);
        setSoftSkills(reorderedSoftSkills);
    }

    return (
        <Panel title={t('softSkills')}>
            <Switch label={t('expertise')} onChange={onShowSoftSkillExpertise} mb={10} />
            {!showSoftSkillForm && <DndList
                list={dndSoftSkills}
                onAdd={onSoftSkillAdd}
                onDragEnd={onSoftSkillDragEnd}
                onEdit={onSoftSkillEdit}
                onRemove={onSoftSkillRemove}
            />}
            {showSoftSkillForm && <SoftSkillForm />}
        </Panel>
    );
}