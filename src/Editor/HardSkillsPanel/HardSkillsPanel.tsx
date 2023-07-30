import { Switch } from "@mantine/core";
import { ChangeEvent } from "react";
import DragEndModel from "../../models/DragEndModel";
import SkillModel from "../../models/SkillModel";
import { useHardSkillsStore, useHardSkillFormStore } from "../../store";
import { reorder } from "../../utils/utils";
import DndList from "../DndList/DndList";
import HardSkillForm from "../HardSkillsPanel/HardSkillForm/HardSkillForm";
import Panel from "../Panel/Panel";

export default function HardSkillsPanel() {
    const { setShowHardSkillExpertise } = useHardSkillsStore((state) => state);
    const { showHardSkillForm, setShowHardSkillForm } = useHardSkillFormStore((state) => state);
    const { hardSkills, dndHardSkills, setHardSkills, removeHardSkill, setEditedHardSkill, getHardSkillById } = useHardSkillsStore((state) => state);

    const onShowHardSkillExpertise = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.checked;
        setShowHardSkillExpertise(value);
    }

    const onHardSkillAdd = () => {
        setShowHardSkillForm(true);
    }

    const onHardSkillEdit = (id: string) => {
        setShowHardSkillForm(true);
        setEditedHardSkill(getHardSkillById(id))
    }


    const onHardSkillRemove = (id: string) => {
        removeHardSkill(id);
    }

    const onHardSkillDragEnd = ({ destination, source, handlers }: DragEndModel) => {
        handlers.reorder({ from: source.index, to: destination?.index || 0 })
        const reorderedList = [...dndHardSkills];
        const [removedItem] = reorderedList.splice(source.index, 1);
        destination && reorderedList.splice(destination.index, 0, removedItem);
        const reorderedHardSkills = reorder<SkillModel>(source.index, destination?.index || 0, dndHardSkills, hardSkills);
        setHardSkills(reorderedHardSkills);
    }

    return (
        <Panel title="Hard Skills">
            <Switch label='Show expertise' onChange={onShowHardSkillExpertise} mb={10} />
            {!showHardSkillForm && <DndList
                list={dndHardSkills}
                onAdd={onHardSkillAdd}
                onDragEnd={onHardSkillDragEnd}
                onEdit={onHardSkillEdit}
                onRemove={onHardSkillRemove}
            />}
            {showHardSkillForm && <HardSkillForm />}
        </Panel>
    );
}