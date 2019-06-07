import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Link from "next/link";
import { withQuery } from "../lib/with-react-apollo";

const ItemList = ({ data }) => {
  if (data && data.listMyCustomTypes) {
    const { items } = data.listMyCustomTypes;
    return (
      <React.Fragment>
        {items.map(({ title, id }) => (
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
        ))}
      </React.Fragment>
    );
  }
  return <div>Loading...</div>;
};

const query = `
  query {
    listMyCustomTypes {
      items {
        id
        title
        comments {
          id
          user
          content
        }
      }
    }
  }
`;

export default withQuery(query)(ItemList);
