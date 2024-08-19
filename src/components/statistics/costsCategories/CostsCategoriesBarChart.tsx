import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useViewport } from "@/hooks/viewport";
import { Viewports } from "@/types/viewport";
import { CostsCategoriesChartTooltip } from "@/components/statistics/costsCategories/CostsCategoriesChartTooltip";
import type { CostsCategoriesStatisticsItem } from "@/types/statistics";

export const CostsCategoriesBarChart = ({ items }: { items: CostsCategoriesStatisticsItem[] }) => {
  const { viewport, isMobile } = useViewport();
  const coords = Viewports.XXS === viewport ? { x: 0 } : undefined;

  return (
    <div style={{ width: "100%", height: items.length * 40 + 45 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={items} layout="vertical">
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" width={isMobile ? 156 : 206} tick={{ width: isMobile ? 150 : 200 }} />
          <Tooltip coordinate={coords} position={coords} content={<CostsCategoriesChartTooltip />} />
          <Legend />
          <Bar dataKey="value" legendType="none" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
