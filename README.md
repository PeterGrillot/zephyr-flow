# ZephyrFlow - Setup and Development

## Prerequisites

- Docker and Docker Compose installed

## Steps to Build and Seed Data

**Build Docker images (if not already built):**

```bash
docker compose build && docker compose up -d
```

**Access the running app container:**
Replace `<container-name>` with your app container name (e.g., `zephyrflow_app_1`):

```bash
docker ps
docker exec -it zephyrflow_app_1 bash
```

**Run Prisma migration (inside the app container):**

```bash
npx prisma migrate dev
```

**Run your seed script (inside the app container):**

```bash
npm run seed
```

**Access the running db container:**
Replace `<container-name>` with your app container name (e.g., `zephyrflow_postgres_1`):

```bash
docker ps
docker exec -it zephyrflow_postgres_1 bash
```

**(Optional) Access PostgreSQL CLI:**
Inside the container, run:

```bash
psql -U postgres
```

```
docker compose build && docker compose up -d


```

### Adding route and qwuery

https://en.wind-turbine-models.com/

Adding a Relational

```js
// src/app/api/graphql/resolvers.ts
export const resolvers = {
  Query: {
    turbines: async () => {
      return await prisma.turbine.findMany({
        include: {
          serialId: {
            select: {
              manufacturerName: true,
              modelName: true,
              ratedPower: true, // Add Here
            },
          },
        },
      });
    },
    manufacturers: async () => await prisma.manufacturer.findMany(),
    turbine: async (_: unknown, { id }: { id: string }) =>
      await prisma.turbine.findUnique({ where: { id: id } }),
  },
};
```

then add at you query on page

If adding a query, add to api:

```js
// /src/app/api/graphql/route.ts
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
        manufacturerName
        modelName
        ratedPower // Add here
      }
    }
  }
`;
```
