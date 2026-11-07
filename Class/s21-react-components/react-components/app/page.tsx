"use client";
//team: Sebastian Aguilar, Adrian Velázquez
import { useState } from "react";
import Card from "../Components/Card";
import { SAMPLE_INITIATIVES } from "../types/initiatives";

export default function Home() {
  const [initiatives, setInitiatives] = useState(SAMPLE_INITIATIVES);

  const handleVote = (id: string, delta: number) => {
    setInitiatives((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, votes: item.votes + delta } : item
      )
    );
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-stone-50 px-6 py-16 font-sans dark:bg-stone-950 sm:px-10">
      <main className="w-full max-w-5xl">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {initiatives.map((item) => (
            <Card key={item.id} initiative={item} onVote={handleVote} />
          ))}
        </div>
      </main>
    </div>
  );
}
