
import Card from "../components/Card";

export const SAMPLE_INITIATIVES = [
  { id: '101', title: 'Campus Solar Canopy', category: 'Energy', votes: 14, description: 'Lorem ipsum', author: 'Dr. X' },
  { id: '102', title: 'Zero-Waste Cafeteria Loop', category: 'Waste', votes: 29, description: 'Lorem ipsum', author: 'Master Splinter' },
  { id: '103', title: 'Urban Rainwater Harvester', category: 'Water', votes: 8, description: 'Lorem ipsum', author: 'Dr. Banner' }
];
export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="row g-4">
        {SAMPLE_INITIATIVES.map((item) => ( <Card initiative={item} /> ))}
      </div>

      </main>
    </div>
  );
}
