import React, { Component } from 'react';

class Header extends Component {

  render() {
    return (
      <div className="Header">
        <img src={'/DDLogo_slanted.svg'} alt=""></img>
        {
          <button key='login' onClick=
            {(this.props.user.username === '')?() => {this.props.onToggle('login')}:() => {this.props.logout()}}
          >
            {(this.props.user.username === '')?'Log-in / Sign-Up':'Log Out, ' + this.props.user.username}
          </button>
        }
      </div>
    );
  }
}

Header.defaultProps = {
  nav: [
    {
      id: 'login',
      label: 'Log-in / Sign-Up'
    },
  ],
};

export default Header;
