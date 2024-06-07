import { Query } from "react-apollo";
import gql from "graphql-tag";

export const withQuery = (query, ...variablesArray) => Component => props => {
  const variables =
    variablesArray && variablesArray.length
      ? variablesArray.reduce((acc, item) => {
          if (typeof item === "string") {
            acc[item] = props[item];
          }

          return acc;
        }, {})
      : undefined;

  return (
    <Query
      query={gql`
        ${query}
      `}
      variables={variables}
      fetchPolicy="no-cache"
    >
      {({ data }) => <Component data={data} {...props} />}
    </Query>
  );
};
