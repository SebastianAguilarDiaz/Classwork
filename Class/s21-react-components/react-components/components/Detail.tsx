import type { Initiative } from "../types/initiatives";
//team: Sebastian Aguilar, Adrian Velázquez
const Detail = ({ initiative }: { initiative: Initiative }) => {
    return (
        <div className="w-full max-w-xl rounded-2xl border border-stone-200 bg-white p-8 shadow-sm dark:border-stone-800 dark:bg-stone-900">
            <h1 className="text-2xl font-semibold tracking-tight text-stone-900 dark:text-stone-50">
                {initiative.title}
            </h1>

            <p className="mt-2 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                {initiative.category}
            </p>

            <p className="mt-6 text-sm leading-relaxed text-stone-600 dark:text-stone-300">
                {initiative.description}
            </p>

            <p className="mt-6 border-t border-stone-100 pt-4 text-xs text-stone-500 dark:border-stone-800 dark:text-stone-400">
                Por {initiative.author} 
            </p>
        </div>
    );
};

export default Detail;
