import React from 'react';
import axios from 'axios';



export class Input extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      content: e.target.value
    })

    this.props.onInputChange(e.target.value);
  }

  render() {
    return (
      <div className="input-box">
        <div className="input-icon-box">
          <img src={this.props.icon} />
        </div>
        <input placeholder={this.props.placeholder} onChange={this.handleChange} value={this.props.value} />
      </div>
    )
  }
}

export class CodeInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCode: false
    };

    this.getCode =this.getCode.bind(this);
    this.changeCode =this.changeCode.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async getCode() {
    console.log('get code');
    console.log(this.props.zkzh)
    const res = await axios({
      url:'/api/cet/result',
      method:"get"
    });
    this.setState({
      hasCode: true,
      codeImg: this.props.code
    })
  }

  async changeCode() {
    console.log('change code');
    const res = await axios({
      url:'/code',
      method:"get"
    });
    console.log(res.data);
    const codeImg = res.data;
    this.setState({
      codeImg
    })
    console.log('chang end')
  }

  handleChange(e) {
    this.props.onInputChange(e.target.value);
  }

  render() {
    const hasCode = this.state.hasCode;
    let codeButton;
    if(hasCode) {
        codeButton = <button onClick = {this.changeCode}>
                      <img className="input-code-img" src={this.props.code}/>
                    </button>;
    } else {
      codeButton =  <button className="input-code-btn" onClick = {this.props.getCode}>点此获取</button>;
    }

    return (
      <div className="input-code-box">
        <div className="input-icon-box">
          <img src={this.props.icon} />
        </div>
        <input placeholder='验证码' onChange={this.handleChange} />
        {codeButton}
      </div>
    )
  }
}