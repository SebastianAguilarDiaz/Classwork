
import Detail from "../../../components/Detail";
import { SAMPLE_INITIATIVES } from "../../../app/page";
const errorInitiative={
    id:'0',
    title:"initiative not found",
    category:"unknown",
    votes:-1,
    description:'initiative not found, incorrect id.',
    author:"unknown"
}

const DetailPage = async( {params}:{params:Promise<{id:string}>})=>{
    const {id}= await params;

    return (
        <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <Detail initiative={SAMPLE_INITIATIVES.find(initiative => initiative.id===id)||errorInitiative }/>
        </div>
    )
}

export default DetailPage;