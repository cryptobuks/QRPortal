import React from 'react';
import { COMMON_CLASSES, createClassName } from 'common/';
import { VIEW_TYPES } from 'view-navigation/vn-constants';
import NAV from 'nav/';
import ContentBody from 'body/';
import { CLASSES } from './app-constants';
import './style.css';

class App extends React.PureComponent{

  componentDidMount(){
    window.addEventListener('popstate', this.props.handleBack);
  }

  componentWillUnmount(){
    window.removeEventListener('popstate', this.props.handleBack);
  }

  render(){
    const props = this.props;
    return (
      <div className={props.viewType === VIEW_TYPES.TILES_VIEW ? createClassName(COMMON_CLASSES.flexCol, COMMON_CLASSES.vh100) : createClassName(COMMON_CLASSES.flexRow, COMMON_CLASSES.vh100) }>
        <NAV/>
        <ContentBody/>
        <div className={CLASSES.floatingBETA}></div>
      </div>
    );
  }
}

export default App;
