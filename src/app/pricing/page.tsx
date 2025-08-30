import PricingClient from "@/components/PricingClient";

export default function PricingPage({
  searchParams,
}: {
  searchParams: { success?: string; canceled?: string; payg_success?: string };
}) {
  return (
    <PricingClient
      success={!!searchParams?.success}
      canceled={!!searchParams?.canceled}
      paygSuccess={!!searchParams?.payg_success}
    />
  );
}
