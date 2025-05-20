"use client";

import Loader from "@/components/loader";
import { Manufacturer } from "@/types";
import { gql, useQuery } from "@apollo/client";
import { CheckIcon, Cross2Icon } from "@radix-ui/react-icons";
import {
  Card,
  Container,
  Flex,
  Heading,
  Text,
  Tooltip,
} from "@radix-ui/themes";
import { useParams } from "next/navigation";

const GET_MANUFACTURER = gql`
  query GetManufacturer($id: String!) {
    manufacturer(id: $id) {
      manufacturerSerialId
      manufacturerName
      modelName
      country
      description
      ratedPower
      offshore
      onshore
    }
  }
`;

export default function TurbinePage() {
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_MANUFACTURER, {
    variables: { id },
  });

  if (loading) return <Loader message="Loading Model Information..." />;
  if (error) return <p>Error: {error.message}</p>;
  if (!data?.manufacturer) return <p>Turbine not found.</p>;

  const manufacturer: Manufacturer = data.manufacturer;

  return (
    <Container>
      <Card>
        <Flex>
          <Flex pr="3">
            <Heading>{manufacturer.manufacturerName}</Heading>
          </Flex>
          <Flex>
            <Tooltip content={manufacturer.country}>
              <span
                className={`fi fi-${
                  manufacturer.country.toLowerCase() ?? "unkown"
                }`}
              ></span>
            </Tooltip>
          </Flex>
        </Flex>
        <Text as="p" color="gray">
          <strong>Model:</strong> {manufacturer.modelName}
        </Text>
        <Text as="p" color="gray">
          <strong>Rated Power (kWh):</strong> {manufacturer.ratedPower}
        </Text>
        <Flex align="center">
          <Text as="p" color="gray">
            <strong>Offshore:</strong>
          </Text>
          {manufacturer.offshore ? (
            <CheckIcon color="green" />
          ) : (
            <Cross2Icon color="red" />
          )}
        </Flex>

        <Flex align="center">
          <Text as="p" color="gray">
            <strong>Onshore:</strong>{" "}
            {manufacturer.onshore ? (
              <CheckIcon color="green" />
            ) : (
              <Cross2Icon color="red" />
            )}
          </Text>
        </Flex>
        <hr />
        <Text as="p" color="gray" size="2">
          {manufacturer.description}
        </Text>
      </Card>
    </Container>
  );
}
