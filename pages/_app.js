import App, { Container } from "next/app";
import React from "react";
import withApolloClient from "../lib/with-apollo-client";
import { ApolloProvider } from "react-apollo";
import Grid from "@material-ui/core/Grid";
import MaterialContainer from "@material-ui/core/Container";

class MyApp extends App {
  render() {
    const { Component, pageProps, apolloClient } = this.props;
    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <Grid container spacing={3}>
            <MaterialContainer xs="12">
              <Component {...pageProps} client={apolloClient} />
            </MaterialContainer>
          </Grid>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApolloClient(MyApp);
