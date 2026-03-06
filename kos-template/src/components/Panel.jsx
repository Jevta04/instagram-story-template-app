/**
 * @param {{ label: string, children: React.ReactNode }} props
 */
export default function Panel({ label, children }) {
  return (
    <div className="panel">
      <div className="panel-label">{label}</div>
      {children}
    </div>
  );
}
