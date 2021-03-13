import React from "react";
import { UserContext } from "../context/userContext";
import { StudentAssociations } from './partials/selectMenuLists'
import SubmitSelection from "./partials/submitSelection";
import SelectMenu from './partials/selectMenu.js';
import TitleLabel from "./partials/titleLabel";


class Content extends React.Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);
    this.state = { value: 'Undefined' };
  }

  handler = (e) => {
    this.setState({value: e.target.value});
  }
    
  render() {
    return (
      <div className="homeScreen">
        <p>
          Here will be information about the voting machine. Sunt labore laboris
          enim velit tempor esse reprehenderit tempor consectetur mollit
          cupidatat consequat velit deserunt. Quis dolor quis in cupidatat
          reprehenderit dolor. Officia eiusmod proident dolore nisi exercitation
          incididunt et sit proident elit pariatur. Proident fugiat deserunt
          mollit mollit voluptate ut. Tempor occaecat aute pariatur ut deserunt.
          Mollit irure magna commodo voluptate. Aliquip mollit qui est minim
          nostrud commodo dolor non est.
        </p>
        <TitleLabel questionTitle={'Valitse Koulusi'} />
        <SelectMenu
          action={this.handler}
          className={'studentAssociationList'} 
          selectMenuList={StudentAssociations} 
        />
        <SubmitSelection studentAssociation={this.state.value} />
      </div>
    );
  }
}

export default Content;
