'use client'

import { MenuDrawerContent } from "@/app/ui/gnb/menu-drawer-content";
import { Drawer, DrawerTrigger } from "@/components/ui/drawer";
import { Menu } from "lucide-react";
import Search from "@/app/ui/gnb/search";
import ButtonUpload from "@/app/ui/gnb/button-upload";
import { useSearchParams } from 'next/navigation';

export default function Gnb({ total_flags, total_likes }: { total_flags: number, total_likes: number }) {
  const searchParams = useSearchParams();
  return (
    <header className="fixed top-0 left-0 w-full bg-gradient-to-r to-indigo-600 from-blue-500 text-white shadow-md z-10">
      <div className="container mx-auto flex items-center px-4 py-3 space-x-4">
        {/* MENU */}
        <div className="flex items-center space-x-2">
          <Drawer>
            <DrawerTrigger asChild>
              <Menu size={33} />
            </DrawerTrigger>
            <MenuDrawerContent total_flags={total_flags} total_likes={total_likes} />
          </Drawer>

          <h1 className="text-xl font-bold text-green-300 flex space-x-1">
            <span className="text-indigo-400 hidden lg:inline">
              12.3 계엄배
            </span>
            <span className="text-indigo-200 hidden md:inline">
              천하제일 깃발대회
            </span>
          </h1>
        </div>

        {/* Search Field */}
        <div className="flex-1">
          <Search />
        </div>

        {/* Buttons */}
        <div className="flex-shrink-0 w-11">
          <ButtonUpload searchTerm={searchParams.get('query')?.toString() || ''} />
        </div>
      </div>
    </header>
  );

}