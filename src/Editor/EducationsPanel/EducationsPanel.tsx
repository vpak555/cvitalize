import DragEndModel from "../../models/DragEndModel";
import { useEducationsStore, useEducationFormStore } from "../../store";
import DndList from "../DndList/DndList";
import EducationForm from "./EducationForm/EducationForm";
import { reorder } from "../../utils/utils";
import Panel from "../Panel/Panel";
import EducationModel from "../../models/EducationModel";

export default function EducationsPanel() {
    const { showEducationForm, setShowEducationForm } = useEducationFormStore((state) => state);
    const { educations, dndEducations, setEducations, removeEducation, setEditedEducation, getEducationById } = useEducationsStore((state) => state);

    const onEducationAdd = () => {
        setShowEducationForm(true);
    }

    const onEducationEdit = (id: string) => {
        setShowEducationForm(true);
        setEditedEducation(getEducationById(id));
    }


    const onEducationRemove = (id: string) => {
        removeEducation(id);
    }

    const onEducationDragEnd = ({ destination, source, handlers }: DragEndModel) => {
        handlers.reorder({ from: source.index, to: destination?.index || 0 })
        const reorderedList = [...dndEducations];
        const [removedItem] = reorderedList.splice(source.index, 1);
        destination && reorderedList.splice(destination.index, 0, removedItem);
        const reorderedEducations = reorder<EducationModel>(source.index, destination?.index || 0, dndEducations, educations);
        setEducations(reorderedEducations);
    }

    return (
        <Panel title="Educations">
            {!showEducationForm && <DndList
                list={dndEducations}
                onAdd={onEducationAdd}
                onDragEnd={onEducationDragEnd}
                onEdit={onEducationEdit}
                onRemove={onEducationRemove}
            />}
            {showEducationForm && <EducationForm />}
        </Panel>
    );
}