import { FlagIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';

export default function Logo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <FlagIcon className="h-30 w-30 rotate-[350deg] hover:rotate-[360deg] animate-spin" />
      <p className="text-[44px] animate-pulse">⚔️</p>
    </div>
  );
}