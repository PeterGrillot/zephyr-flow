import { gql, useQuery } from "@apollo/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import React from "react";
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#4CAF50", "#F59E0B", "#9CA3AF", "#EF4444"];

const GET_TURNBINE_STATUS_AND_OUTPUT = gql`
  query GetTurbineStatusAndOutput {
    turbines {
      status
      powerOutput
    }
  }
`;

export default function TurbineStatusPie() {
  const { data, loading, error } = useQuery(GET_TURNBINE_STATUS_AND_OUTPUT);

  const statusCounts = data?.turbines.reduce(
    (acc: Record<string, number>, turbine: { status: string }) => {
      acc[turbine.status] = (acc[turbine.status] || 0) + 1;
      return acc;
    },
    {},
  );

  const pieChartData = Object.entries(statusCounts || {}).map(
    ([name, value], index: number) => ({
      name,
      value,
      fill: COLORS[index % COLORS.length],
    }),
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Flex
      direction="row"
      align="center"
      gap="2"
      pb="3"
      style={{ width: "100%" }}
    >
      <Card
        variant="surface"
        className="flex flex-col items-center justify-center gap-4 padding-4 h-[260px] flex-1"
      >
        <div>
          <Heading weight="light">Total Turbines</Heading>
          <Text size="8" weight="bold" mb="4">
            {data.turbines.length}
          </Text>
        </div>
      </Card>
      <Card variant="surface" style={{ height: 260, flex: 1, minWidth: 0 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={pieChartData}
              dataKey="value"
              nameKey="name"
              isAnimationActive={true}
              cx="50%"
              cy="50%"
              outerRadius={80}
              label={({ name, percent }) =>
                `${name} ${Math.round((percent ?? 0) * 100)}%`
              }
            />
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </Card>

      <Card
        variant="surface"
        className="flex flex-col items-center justify-center gap-4 padding-4 h-[260px] flex-1"
      >
        <div className="text-center">
          <Heading weight="light">Total Output</Heading>
          <Text size="8" weight="bold" mb="4">
            {data.turbines.reduce(
              (total: number, turbine: { powerOutput: number }) =>
                total + turbine.powerOutput,
              0,
            )}{" "}
            kW
          </Text>
        </div>
      </Card>
    </Flex>
  );
}
