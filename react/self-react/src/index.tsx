import React from "./source/react";
import ReactDom from "./source/react-dom";
class App extends React.Component {
  state = {
    a: 1,
  };
  add = () => {
    this.setState({ a: this.state.a + 2 });
  };
  render() {
    return (
      <div>
        <p>{this.state.a}</p>
        <button onClick={this.add}>+加</button>
      </div>
    );
  }
}

ReactDom.render(<App />, document.getElementById("root"));
