'use client'

import { useState } from 'react';
import { Flag } from '@/app/lib/definitions'; // Flag 타입을 가져옵니다.
import Image from 'next/image';

import { InputFlagSearch } from '@/components/my/input-flag-search';
import { ButtonUpload } from '@/components/my/button-upload';
import { AvatarSadness } from '@/components/my/avatar-sadness';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface FlagsProps {
  initialFlags: Flag[];
}

export default function FlagsPage({ initialFlags }: FlagsProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFlags, setFilteredFlags] = useState<Flag[]>(initialFlags);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    const filtered = initialFlags.filter((flag) =>
      flag.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredFlags(filtered);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {/* Top bar */}
      <header className="fixed top-0 left-0 w-full bg-gradient-to-r to-indigo-600 from-blue-500 text-white shadow-md z-10">
        <div className="container mx-auto flex items-center px-4 py-3 space-x-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            {/* <Link href="/" className="flex items-center space-x-2"> */}
            <a href='/' className="flex items-center space-x-2">
              <AvatarSadness />
              <h1 className="text-xl font-bold hidden md:flex">flag123</h1>
            </a>
            {/* </Link> */}
          </div>

          {/* Search Field */}
          <div className="flex-1">
            <InputFlagSearch
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
          </div>

          {/* Buttons */}
          <div className="flex-shrink-0 w-11">
            <ButtonUpload searchTerm={searchTerm} />
          </div>
        </div>
      </header>

      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <section className="container mx-auto px-1 py-1">
          <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredFlags.map((flag) => (
              <li key={flag.id} className="text-center">
                <div className="relative w-full overflow-hidden rounded-lg shadow-lg bg-gray-800 aspect-square">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Image
                        src={flag.img_url}
                        alt={flag.name}
                        width={300}
                        height={300}
                        className="w-full h-full object-cover transition-transform duration-300"
                        loading='lazy'
                      />
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Edit profile</DialogTitle>
                        <DialogDescription>
                          Make changes to your profile here. Click save when you&apos;re done.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">
                            Name
                          </Label>
                          <Input
                            id="name"
                            defaultValue="Pedro Duarte"
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="username" className="text-right">
                            Username
                          </Label>
                          <Input
                            id="username"
                            defaultValue="@peduarte"
                            className="col-span-3"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Save changes</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
                <p className="mt-2 text-lg font-medium">{flag.name}</p>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
