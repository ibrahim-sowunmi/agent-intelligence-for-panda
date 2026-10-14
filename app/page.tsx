import { Hero } from "@/components/analysis/hero";
import { Coverage } from "@/components/analysis/coverage";
import { ProcessChart } from "@/components/analysis/process-chart";
import { Tiers } from "@/components/analysis/tiers";
import { Evidence } from "@/components/analysis/evidence";
import { Journey } from "@/components/analysis/journey";
import { Scenarios } from "@/components/analysis/scenarios";
import { Start } from "@/components/analysis/start";
import { Method } from "@/components/analysis/method";

export default function AnalysisPage() {
  return (
    <>
      <Hero />
      <Coverage />
      <ProcessChart />
      <Tiers />
      <Evidence />
      <Journey />
      <Scenarios />
      <Start />
      <Method />
    </>
  );
}
