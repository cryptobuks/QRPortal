import React from 'react';
import { RulesList, RuleDetails, Radio, APIQuery, RETURNTOSTART, UpdateURL } from '../index';
import {lOADDETAILS} from './actions';

const localClassName = ['rule-container', 'block'],
  sp = ' ';

export default class RulesContainer extends React.Component{
  constructor(props){
    super(props);

    this.state = {};

    Radio.listen(lOADDETAILS, function( url ) {
      if (!url) return;
      APIQuery(url, (res) => {
        this.setState({ details: res.data });
        UpdateURL( null, null, url );
      });
    }.bind(this));

    Radio.listen(RETURNTOSTART, () => this.setState({details: undefined}));
  }

  render(){
    return (
      <div className={localClassName.join( sp )} >
        <RulesList href={this.props.href}/>
        <RuleDetails data={this.state.details}/>
      </div>
    );
  }
}