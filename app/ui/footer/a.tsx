export default function A({
  url,
  color = "gray",
  txt
}: {
  url: string,
  color?: string
  txt: string | React.ReactNode
}) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`text-${color}-500 hover:text-${color}-800`}
    >
      {txt}
    </a >
  );
}