import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Link from "next/link";
import { Query } from "react-apollo";
import gql from "graphql-tag";

export default () => {
  return (
    <React.Fragment>
      <Query
        query={gql`
          query {
            listMyCustomTypes {
              items {
                id
                title
                comments {
                  user
                  content
                }
              }
            }
          }
        `}
      >
        {({
          data
        }) => {
          if(data && data.listMyCustomTypes){
            const {items} = data.listMyCustomTypes;
          return items.map(({ title, id }) => (
            <React.Fragment key={id}>
              <Card>
                <CardContent>
                  <Link href={{ pathname: "/topic", query: { id } }}>
                    <a>{title}</a>
                  </Link>
                </CardContent>
              </Card>
              <br />
            </React.Fragment>
          ));
        }
        return (<div>Loading...</div>)
        }}
      </Query>
    </React.Fragment>
  );
};
