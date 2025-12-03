import { graphql } from "gql.tada";
import { executeQuery } from "@datocms/cda-client";

export default async function Test() {
  const HomeQuery = graphql(`
    query MyQuery {
      home {
        id
        label
        slug
        sections {
          ... on CollectionCardShowcaseSectionRecord {
            id
            title
            pretitle
            direction
            description
          }
        }
      }
    }
  `);

  const data = await executeQuery(HomeQuery, {
    token: process.env.DATOCMS_API_TOKEN!,
    fetchFn: (input, init) =>
      fetch(input, {
        ...init,
        cache: "force-cache",
        next: {
          revalidate: 60,
        },
      }),
  });

  return (
    <>
      <h1>Basic Fetch Test</h1>
      <pre>
        <code>{JSON.stringify(data, null, 2)}</code>
      </pre>
    </>
  );
}
