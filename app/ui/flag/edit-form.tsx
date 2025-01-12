'use client';

import { updateFlag } from "@/app/lib/action";
import { FlagMeta } from "@/app/lib/definitions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check } from "lucide-react";
import Image from "next/image";

export default function EditFlagForm({
    flag,
}: {
    flag: FlagMeta;
}) {
    const updateFlagWithId = updateFlag.bind(null, flag.id);
    return (
        <form action={updateFlagWithId}>
            <div className="flex flex-col items-center p-6">
                {/* Flag Edit Card */}
                <Card className="w-full max-w-2xl shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-center text-lg font-bold">
                            {flag.name}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col items-center gap-4">
                            <Image
                                src={flag.img_url}
                                alt={flag.name}
                                width={300}
                                height={300}
                                className="rounded-md w-full max-w-md"
                            />
                            <div className="flex flex-col gap-4 w-full">
                                <div className="grid w-full max-w-full items-center gap-1.5">
                                    <Label htmlFor="flagname">이름</Label>
                                    <Input type="text" id="flagMetaName" placeholder="출처" name="flagMetaName" defaultValue={flag.name} />
                                </div>

                                <div className="grid w-full max-w-full items-center gap-1.5">
                                    <Label htmlFor="source">출처</Label>
                                    <Input type="text" id="flagMetaSource" placeholder="출처" name="flagMetaSource" defaultValue={flag.source} />
                                </div>
                            </div>
                        </div>
                    </CardContent>

                    <CardFooter className="gap-2">
                        <Button className="w-full flex-1 bg-lime-600">
                            <Check /> 수정하기
                        </Button>
                        <Button className="w-full flex-0 bg-slate-500" style={{ flexBasis: '33%' }}>
                            취소
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </form>
    );
}