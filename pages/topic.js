import Item from "../components/item";

class Topic extends React.Component {
  static async getInitialProps({ query: { id } }) {
    return { id };
  }

  render() {
    const { id, client } = this.props;

    return <Item client={client} id={id} />;
  }
}

export default Topic;
