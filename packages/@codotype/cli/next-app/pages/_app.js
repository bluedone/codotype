import * as React from "react";
import App, { Container } from "next/app";

export default class extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <React.Fragment>
        <Container>
          <div className="container">
            <Component {...pageProps} />
          </div>
        </Container>
      </React.Fragment>
    );
  }
}
