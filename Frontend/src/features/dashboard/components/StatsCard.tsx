import Container from "@/components/ui/Container";

type StatsCardProps = {
  label: string;
  value: string | number;
  variant?: "primary" | "sky" | "green" | "orange";
};

function StatsCard({ label, value, variant = "primary" }: StatsCardProps) {
  return (
    <Container variant={variant} className="flex-1">
      <div className="flex flex-col items-center justify-center py-4 md:py-6">
        <p className="text-sm md:text-base font-semibold text-stone-600 mb-1 md:mb-2">
          {label}
        </p>
        <p className="text-2xl md:text-4xl font-bold">{value}</p>
      </div>
    </Container>
  );
}

export default StatsCard;
