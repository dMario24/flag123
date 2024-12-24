'use client'

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import {
  CalendarArrowDown, CalendarArrowUp,
  ArrowDownWideNarrow, ArrowDownNarrowWide,
  Shuffle,
  Moon, Sun,
  Heart, SquareCheckBig, Square
} from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import {
  DrawerClose, DrawerContent, DrawerDescription,
  DrawerFooter, DrawerHeader, DrawerTitle,
} from "@/components/ui/drawer";

import { Bar, BarChart, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";
import { useTheme } from 'next-themes';


const data = [
  {
    goal: 400,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 239,
  },
  {
    goal: 300,
  },
  {
    goal: 200,
  },
  {
    goal: 278,
  },
  {
    goal: 189,
  },
  {
    goal: 349,
  },
];

export function MenuDrawerContent() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function setSortParams(checkValue: string): void {
    const params = new URLSearchParams(searchParams);
    params.set('sort', checkValue);
    const useRouterReplacePath = `${pathname}?${params.toString()}`;
    replace(useRouterReplacePath);
  }

  const { theme, setTheme } = useTheme(); // Destructure theme and setTheme
  // Toggle theme between 'light' and 'dark'
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const toggleHeart = () => {
    const params = new URLSearchParams(searchParams);

    // If the 'heart' parameter exists, remove it; otherwise, add it with 'only' value
    if (params.has('heart')) {
      params.delete('heart');
    } else {
      params.set('heart', 'only');
    }

    const useRouterReplacePath = `${pathname}?${params.toString()}`;
    replace(useRouterReplacePath);
  };

  return (
    <DrawerContent className="bg-indigo-600 bg-opacity-70">
      <div className="mx-auto w-full max-w-sm">
        <DrawerHeader>
          <DrawerTitle className="text-center">
            12.3 계엄배 천하제일 재기발랄 깃발대회
          </DrawerTitle>
          <DrawerDescription className="text-border text-center text-gray-400">
            민주주의 해방전선 나만 깃발 없엉 총연맹
          </DrawerDescription>
        </DrawerHeader>

        {/* Toggle Buttons */}
        <div className="p-4 flex justify-center space-x-4">
          <Button onClick={toggleTheme} className="text-4xlg font-medium" variant="outline">
            {theme === 'light' ? <Sun size={29} /> : <Moon size={29} />}
          </Button>

          <Button onClick={toggleHeart} className="text-2xlg font-medium rounded-full" variant="outline">
            {searchParams.get('heart') !== 'only' ? <Square /> : <SquareCheckBig />} <Heart />
          </Button>
        </div>

        {/* DATA VIEW */}
        <div className="p-4 pb-0">
          <div className="flex items-center justify-center space-x-2">
            <div className="flex-1 text-center">
              <div className="text-6xl font-bold tracking-tighter">
                {1717}
              </div>
              <div className="text-[0.70rem] uppercase text-muted-foreground items-center">
                Heart
              </div>
            </div>
            <div className="flex-1 text-center">
              <div className="text-6xl font-bold tracking-tighter">
                {22}
              </div>
              <div className="text-[0.70rem] uppercase text-muted-foreground">
                User
              </div>
            </div>
            <div className="flex-1 text-center">
              <div className="text-6xl font-bold tracking-tighter">
                {376}
              </div>
              <div className="text-[0.70rem] uppercase text-muted-foreground">
                Flags
              </div>
            </div>
          </div>
          <div className="mt-3 h-[120px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <Bar
                  dataKey="goal"
                  style={
                    {
                      fill: "hsl(var(--foreground))",
                      opacity: 0.9,
                    } as React.CSSProperties
                  }
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>



        <div className="p-4">
          <RadioGroup
            className="space-y-4"
            value={searchParams.get('sort')?.toString() || 'idDesc'}
            onValueChange={(
              value: "shuffle" | "asc" | "desc" | "idDesc" | "idAsc"
            ) => setSortParams(value)}
          >
            {/* 데스크탑: 2열 레이아웃 (등록일, 좋아요) */}
            <div className="grid grid-cols-5 sm:grid-cols-2 gap-4">
              {/* 첫 번째 그룹: 등록일 최신, 과거 */}
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="idDesc"
                  id="sort-idDesc"
                  className="w-8 h-8"
                />
                <label
                  htmlFor="sort-idDesc"
                  className="text-lg font-medium"
                >
                  <CalendarArrowDown size={29} />
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="idAsc"
                  id="sort-idAsc"
                  className="w-8 h-8"
                />
                <label
                  htmlFor="sort-idAsc"
                  className="text-lg font-medium"
                >
                  <CalendarArrowUp size={29} />
                </label>
              </div>

              {/* 두 번째 그룹: 좋아요 내림차순, 오름차순, 무작위 */}
              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="desc"
                  id="sort-desc"
                  className="w-8 h-8"
                />
                <label
                  htmlFor="sort-desc"
                  className="text-lg font-medium"
                >
                  <ArrowDownWideNarrow size={29} />
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="asc"
                  id="sort-asc"
                  className="w-8 h-8"
                />
                <label
                  htmlFor="sort-asc"
                  className="text-lg font-medium"
                >
                  <ArrowDownNarrowWide size={29} />
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <RadioGroupItem
                  value="shuffle"
                  id="sort-shuffle"
                  className="w-8 h-8"
                />
                <label
                  htmlFor="sort-shuffle"
                  className="text-lg font-medium"
                >
                  <Shuffle size={29} />
                </label>
              </div>
            </div>
          </RadioGroup>
        </div>

        <DrawerFooter>
          <Button
            variant="destructive"
            onClick={() => window.location.href = '/123'}
          >
            포고령
          </Button>
          <DrawerClose asChild>
            <Button variant="outline">대통령 윤석열을 파면한다</Button>
          </DrawerClose>
        </DrawerFooter>
      </div>
    </DrawerContent>
  );
}
