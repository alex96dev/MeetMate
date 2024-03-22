import DetailsCard from "@/components/DetailsCard";

export default function DetailsCardPage({ isEditMode, setIsEditMode }) {
  return <DetailsCard setIsEditMode={setIsEditMode} isEditMode={isEditMode} />;
}
