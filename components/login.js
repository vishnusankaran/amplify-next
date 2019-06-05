import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "next/link";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      input: null
    };
  }

  handleChange = ({ target: { value } }) => {
    this.setState({ input: value });
  };

  render() {
    return (
      <React.Fragment>
        <TextField
          placeholder="Enter your username"
          onChange={this.handleChange}
          value={this.state.input}
        />
        <Link
          href={{ pathname: "/dashboard", query: { user: this.state.input } }}
          as="/dashboard"
        >
          <Button>Login</Button>
        </Link>
      </React.Fragment>
    );
  }
}

export default Login;
