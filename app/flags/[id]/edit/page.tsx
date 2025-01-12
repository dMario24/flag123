import {
    fetchFlagById,
    // updateFlagById
}
    from "@/app/lib/data";

import { Check } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// export default function EditPage({ params }: { params: { id: string } }) {
export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;

    const [flagMeta] = await Promise.all([
        fetchFlagById(id),
    ]);

    return (
        <div className="flex flex-col items-center p-6">
            {/* Flag Edit Card */}
            <Card className="w-full max-w-2xl shadow-lg">
                <CardHeader>
                    <CardTitle className="text-center text-lg font-bold">
                        {flagMeta.name}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col items-center gap-4">
                        <Image
                            src={flagMeta.img_url}
                            alt={flagMeta.name}
                            width={300}
                            height={300}
                            className="rounded-md w-full max-w-md"
                        />
                        <div className="flex flex-col gap-4 w-full">
                            <div className="grid w-full max-w-full items-center gap-1.5">
                                <Label htmlFor="flagname">이름</Label>
                                <Input type="text" id="flagname" placeholder="출처" defaultValue={flagMeta.name} />
                            </div>

                            <div className="grid w-full max-w-full items-center gap-1.5">
                                <Label htmlFor="source">출처</Label>
                                <Input type="text" id="source" placeholder="출처" defaultValue={flagMeta.source} />
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
    );
}
