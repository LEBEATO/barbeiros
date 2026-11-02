const labels: Record<string, string> = {
  pending: "Pendente",
  confirmed: "Confirmado",
  completed: "Concluído",
  cancelled: "Cancelado",
};
export default function StatusBadge({ status }: { status: string }) {
  return <span className={"badge " + status}>{labels[status] || status}</span>;
}
