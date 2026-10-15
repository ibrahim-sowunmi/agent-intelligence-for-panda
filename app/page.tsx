import { Hero } from "@/components/analysis/hero";
import { Listen } from "@/components/analysis/listen";
import { Coverage } from "@/components/analysis/coverage";
import { ProcessChart } from "@/components/analysis/process-chart";
import { Tiers } from "@/components/analysis/tiers";
import { Evidence } from "@/components/analysis/evidence";
import { Journey } from "@/components/analysis/journey";
import { Scenarios } from "@/components/analysis/scenarios";
import { Method } from "@/components/analysis/method";

export default function AnalysisPage() {
  return (
    <>
      <Hero />
      <Listen />
      <Coverage />
      <ProcessChart />
      <Tiers />
      <Evidence />
      <Journey />
      <Scenarios />
      <Method />
    </>
  );
}
