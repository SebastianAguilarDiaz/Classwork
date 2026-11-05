import {Initiative} from "../types/initiative";

const Detail = ({ initiative }: { initiative: Initiative }) => {
    return (
        <div className="w-full max-w-xl rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                {initiative.title}
            </h1>

            <p className="mt-1 text-sm text-zinc-500">
                {initiative.category} · {initiative.votes} votos
            </p>

            <p className="mt-4 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                {initiative.description}
            </p>

            <p className="mt-4 text-xs text-zinc-500">
                Por {initiative.author} 
            </p>
        </div>
    );
};

export default Detail;
