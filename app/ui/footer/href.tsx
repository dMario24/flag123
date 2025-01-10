import A from "./a";

export default function Href({ url, txt }: { url: string, txt: string }) {
  return (
    <p className="text-center mt-2">
      <A url={url} txt={txt} />
    </p>
  );
}