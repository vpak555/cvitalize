import { Switch } from "@mantine/core";
import { ChangeEvent } from 'react';
import DragEndModel from "../../models/DragEndModel";
import { useLanguagesStore, useLanguageFormStore } from "../../store";
import DndList from "../DndList/DndList";
import LanguageForm from "./LanguageForm/LanguageForm";
import { reorder } from "../../utils/utils";
import Panel from "../Panel/Panel";
import SkillModel from "../../models/SkillModel";

export default function LanguagesPanel() {
    const { showLanguageForm, setShowLanguageForm } = useLanguageFormStore((state) => state);
    const { languages, dndLanguages, setLanguages, removeLanguage, setEditedLanguage, getLanguageById, setShowLanguageExpertise } = useLanguagesStore((state) => state);

    const onShowLanguageExpertise = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.checked;
        setShowLanguageExpertise(value);
    }

    const onLanguageAdd = () => {
        setShowLanguageForm(true);
    }

    const onLanguageEdit = (id: string) => {
        setShowLanguageForm(true);
        setEditedLanguage(getLanguageById(id))
    }


    const onLanguageRemove = (id: string) => {
        removeLanguage(id);
    }

    const onLanguageDragEnd = ({ destination, source, handlers }: DragEndModel) => {
        handlers.reorder({ from: source.index, to: destination?.index || 0 })
        const reorderedList = [...dndLanguages];
        const [removedItem] = reorderedList.splice(source.index, 1);
        destination && reorderedList.splice(destination.index, 0, removedItem);
        const reorderedLanguages = reorder<SkillModel>(source.index, destination?.index || 0, dndLanguages, languages);
        setLanguages(reorderedLanguages);
    }

    return (
        <Panel title="Languages">
            <Switch label='Show expertise' onChange={onShowLanguageExpertise} mb={10} />
            {!showLanguageForm && <DndList
                list={dndLanguages}
                onAdd={onLanguageAdd}
                onDragEnd={onLanguageDragEnd}
                onEdit={onLanguageEdit}
                onRemove={onLanguageRemove}
            />}
            {showLanguageForm && <LanguageForm />}
        </Panel>
    );
}