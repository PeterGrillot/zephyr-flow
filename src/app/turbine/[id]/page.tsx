"use client";

import { gql, useQuery } from "@apollo/client";
import { useParams } from "next/navigation";

const GET_TURBINE = gql`
  query GetTurbine($id: String!) {
    turbine(id: $id) {
      id
      location
      installationDate
      lastMaintenance
      nextMaintenance
      status
      powerOutput
      issueReported
      technicianAssigned
    }
  }
`;

export default function TurbinePage() {
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_TURBINE, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data?.turbine) return <p>Turbine not found.</p>;

  const turbine = data.turbine;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{turbine.id}</h1>
      <p>
        <strong>Locationed:</strong> {turbine.location}
      </p>
      <p>
        <strong>Status:</strong> {turbine.status}
      </p>
      <p>
        <strong>Power Output (Kwh):</strong> {turbine.powerOutput} kW
      </p>
      <p>
        <strong>Last Maintenance:</strong> {turbine.lastMaintenance}
      </p>
      <p>
        <strong>Next Maintenance:</strong> {turbine.nextMaintenance}
      </p>
      {turbine.issueReported && (
        <p>
          <strong>Issue:</strong> {turbine.issueReported}
        </p>
      )}
      {turbine.technicianAssigned && (
        <p>
          <strong>Technician:</strong> {turbine.technicianAssigned}
        </p>
      )}
    </div>
  );
}
