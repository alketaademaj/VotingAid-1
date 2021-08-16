import React, { PureComponent } from "react";

class DefaultInput extends PureComponent {
  render() {
    return (
      <>
        <label style={{ fontSize: 16, marginBottom: 3 }}>
          {this.props.label}
        </label>
        <input
          type={this.props.type}
          name={this.props.name}
          placeholder={this.props.placeholder}
          value={this.props.value}
          onChange={this.props.onChange}
          required={this.props.required ? this.props.required : false}
          id={this.props.id}
          ref={this.props.ref}
          style={{
            fontSize: 16,
            padding: "6px 4px",
          }}
        />
      </>
    );
  }
}

export default DefaultInput;
