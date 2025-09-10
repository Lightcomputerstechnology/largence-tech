export default function Stepper({ step, total }: { step: number; total: number }) {
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between text-xs text-neutral-600 mb-2">
        <span>REQUIRED INFORMATION</span>
        <span>Field {step} of {total}</span>
      </div>
      <div className="h-1 bg-neutral-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-[var(--primary)]"
          style={{ width: `${(step / total) * 100}%` }}
        />
      </div>
    </div>
  );
}
