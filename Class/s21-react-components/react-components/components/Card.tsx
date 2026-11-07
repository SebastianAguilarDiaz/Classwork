"use client";
//team: Sebastian Aguilar, Adrian Velázquez
import Link from "next/link";
import { Initiative } from "../types/initiatives";

const Card = ({ initiative, onVote, }: { initiative: Initiative; onVote: (id: string, delta: number) => void; }) => {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-lg hover:shadow-stone-200/50 dark:border-stone-800 dark:bg-stone-900 dark:hover:border-emerald-700 dark:hover:shadow-black/30">
      <Link
        href={`/Detail/${initiative.id}`}
        className="flex flex-1 flex-col justify-between gap-6 p-6"
      >
        <h2 className="text-base font-semibold leading-snug tracking-tight text-stone-900 dark:text-stone-50">
          {initiative.title}
        </h2>
        <span className="w-fit rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
          {initiative.votes} votos
        </span>
      </Link>

      <div className="flex items-center justify-end gap-2 border-t border-stone-100 px-6 py-3 dark:border-stone-800">
        <button
          onClick={() => onVote(initiative.id, -1)}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-stone-200 text-base leading-none text-stone-600 transition-colors hover:border-stone-300 hover:bg-stone-100 hover:text-stone-900 dark:border-stone-700 dark:text-stone-300 dark:hover:bg-stone-800 dark:hover:text-stone-50"
        >
          −
        </button>
        <button
          onClick={() => onVote(initiative.id, 1)}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600 text-base leading-none text-white transition-colors hover:bg-emerald-500"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Card;