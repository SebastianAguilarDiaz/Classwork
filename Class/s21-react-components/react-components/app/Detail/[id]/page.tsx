import Detail from "../../../Components/Detail";
import { SAMPLE_INITIATIVES, errorInitiative } from "../../../types/initiatives";

export const instant = false;

const DetailPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const initiative =
    SAMPLE_INITIATIVES.find((item) => item.id === id) ?? errorInitiative;

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Detail initiative={initiative} />
    </div>
  );
};

export default DetailPage;
