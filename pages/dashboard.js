import ItemList from "../components/item-list";

class Dashboard extends React.Component {
  static async getInitialProps({ query }) {
    return { ...query };
  }
  render() {
    return (
      <React.Fragment>
        <h1>List</h1>
        <p>
          Logged-in as <strong>{this.props.user}</strong>
        </p>
        <ItemList />
      </React.Fragment>
    );
  }
}

export default Dashboard;
