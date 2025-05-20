"use client";

import { useRouter } from "next/navigation";
import { gql, useQuery } from "@apollo/client";
import { DotsVerticalIcon } from "@radix-ui/react-icons";

import {
  Box,
  Card,
  DropdownMenu,
  Flex,
  Heading,
  IconButton,
  Link,
  Progress,
  ProgressProps,
  Table,
  Text,
} from "@radix-ui/themes";
import { Turbine } from "@/types";
import Image from "next/image";
import NextLink from "next/link";
import Loader from "@/components/loader";
import Status from "@/components/status";

const GET_TURBINES_AND_MANUFACTURERS = gql`
  query GetTurbinesAndManufacturers {
    turbines {
      id
      manufacturerSerialId
      location
      lastMaintenance
      status
      powerOutput
      serialId {
        manufacturerSerialId
        manufacturerName
        modelName
        ratedPower
      }
    }
  }
`;

export default function Home() {
  const { data, loading, error } = useQuery(GET_TURBINES_AND_MANUFACTURERS);

  const router = useRouter();

  if (loading) return <Loader message="Loading Turbines..." />;
  if (error) return <p>Error: {error.message}</p>;

  const handleView = (slug: string, id: string) =>
    router.push(`/${slug}/${id}`);

  return (
    <Box>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Id</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Output (% of max)</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Coordinates</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Next Maintainance</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Manufacturer</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell align="center">
              Action
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.turbines.map((turbine: Turbine) => {
            let percent =
              (Number(turbine.powerOutput) / turbine.serialId.ratedPower) * 100;
            let color: ProgressProps["color"] = "blue";
            if (percent > 20) {
              color = "amber";
            }
            if (percent > 40) {
              color = "green";
            }
            if (percent > 100) {
              percent = 100;
              color = "crimson";
            }
            return (
              <Table.Row key={turbine.id}>
                <Table.Cell>{turbine.id}</Table.Cell>
                <Table.Cell>
                  <Progress value={percent} color={color} />
                </Table.Cell>
                <Table.Cell>{turbine.location}</Table.Cell>
                <Table.Cell>
                  <Status status={turbine.status} />
                </Table.Cell>
                <Table.Cell>
                  {new Date(parseInt(turbine.lastMaintenance)).toISOString()}
                </Table.Cell>
                <Table.Cell>
                  <Link asChild>
                    <NextLink
                      href={`/manufacturer/${turbine.serialId.manufacturerSerialId}`}
                    >
                      {turbine.serialId.manufacturerName}{" "}
                      {turbine.serialId.modelName}
                    </NextLink>
                  </Link>
                </Table.Cell>
                <Table.Cell align="center">
                  <DropdownMenu.Root>
                    <DropdownMenu.Trigger>
                      <IconButton variant="ghost">
                        <DotsVerticalIcon width="18" height="18" />
                      </IconButton>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content>
                      <DropdownMenu.Item
                        onClick={() => handleView("turbine", turbine.id)}
                      >
                        View
                      </DropdownMenu.Item>
                      <DropdownMenu.Item>Edit</DropdownMenu.Item>
                      <DropdownMenu.Separator />
                      <DropdownMenu.Item>Duplicate</DropdownMenu.Item>
                      <DropdownMenu.Item color="red">Delete</DropdownMenu.Item>
                    </DropdownMenu.Content>
                  </DropdownMenu.Root>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
    </Box>
  );
}
