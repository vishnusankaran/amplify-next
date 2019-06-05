import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import gql from "graphql-tag";
import { Query } from "react-apollo";

export default class Item extends React.Component {
  handleSubmit = comments => {
    const ADD_COMMENT = gql`
      mutation updateMyCustomType($id: ID!, $comments: [CommentInput]) {
        updateMyCustomType(input: { id: $id, comments: $comments }) {
          id
          title
        }
      }
    `;
    this.props.client
      .mutate({
        mutation: ADD_COMMENT,
        variables: {
          id: this.props.id,
          comments: [
            ...comments.map(({ user, content }) => ({ user, content })),
            {
              user: "user",
              content: this.ref.querySelector("input").value || "sample comment"
            }
          ]
        }
      })
      .then(a => {
        this.setState({ updated: a });
      });
  };

  render() {
    const GET_TOPIC = gql`
      query getMyCustomType($id: ID!) {
        getMyCustomType(id: $id) {
          id
          title
          comments {
            user
            content
          }
        }
      }
    `;
    const { id } = this.props;
    return (
      <Query query={GET_TOPIC} variables={{ id }}>
        {({
          data: {
            getMyCustomType: { title, comments }
          }
        }) => {
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
        }}
      </Query>
    );
  }
}
