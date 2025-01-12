import {
    fetchFlagById,
    // updateFlagById
}
    from "@/app/lib/data";

import EditFlagForm from "@/app/ui/flag/edit-form";

// export default function EditPage({ params }: { params: { id: string } }) {
export default async function Page(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;

    const [flagMeta] = await Promise.all([
        fetchFlagById(id),
    ]);

    return (
        <EditFlagForm flag={flagMeta} />
    );
}
