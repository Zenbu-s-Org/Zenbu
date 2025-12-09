import Container from "@/components/ui/Container";

type StatsCardProps = {
  label: string;
  value: string | number;
  variant?: 'primary' | 'sky' | 'green' | 'orange';
};

function StatsCard({ label, value, variant = 'primary' }: StatsCardProps) {
  return (
    <Container variant={variant} className="flex-1">
      <div className="flex flex-col items-center justify-center py-2">
        <p className="text-sm font-semibold text-stone-600 mb-1">{label}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </Container>
  );
}

export default StatsCard;