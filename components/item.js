import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import uuid from "uuid/v1";
import gql from "graphql-tag";
import { withQuery } from "../lib/with-react-apollo";

class Item extends React.Component {
  handleSubmit = comments => {
    const ADD_COMMENT = gql`
      mutation updateMyCustomType($id: ID!, $comments: [CommentInput]) {
        updateMyCustomType(input: { id: $id, comments: $comments }) {
          id
          title
          comments {
            user
            content
            id
          }
        }
      }
    `;
    this.props.client.mutate({
      mutation: ADD_COMMENT,
      variables: {
        id: this.props.id,
        comments: [
          ...comments.map(({ user, content, id }) => ({
            user,
            content,
            id
          })),
          {
            user: this.props.user || "user",
            content: this.ref.querySelector("input").value || "sample comment",
            id: uuid()
          }
        ]
      }
    });
  };

  render() {
    const { data } = this.props;
    if (data && data.getMyCustomType) {
      const { title, comments } = data && data.getMyCustomType;

      return (
        <React.Fragment>
          <h1>{title}</h1>
          <ul>
            {comments.map(({ user, content }, id) => (
              <li key={id}>
                <strong>{user}</strong> - {content}
              </li>
            ))}
          </ul>
          <TextField
            placeholder="Enter a comment"
            ref={ref => (this.ref = ref)}
          />
          <Button onClick={() => this.handleSubmit(comments)}>
            Add Comment
          </Button>
        </React.Fragment>
      );
    }
    return <div>Loading</div>;
  }
}

const query = `
  query getMyCustomType($id: ID!) {
    getMyCustomType(id: $id) {
      id
      title
      comments {
        user
        content
        id
      }
    }
  }
`;

export default withQuery(query, "id")(Item);
