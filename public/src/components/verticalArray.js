import React from 'react';
import { createClassName, Struct } from '../common/lib';
import ArrayElement from './arrayElement';
import '../style/verticalArray.css';

const ArrayElementData = Struct('name', 'critical');
const headerData = Struct('name');
export default class VerticalArray extends React.PureComponent{
  render(){
    return (<div className={createClassName('flxc', 'flxGrw1', 'ovfyauto')}>
      <table>
        <tbody>
          <ArrayElement onItemClick={this.props.onHeaderItemClick} header={true}>{this.props.headers.map( hVal => new headerData(hVal))}</ArrayElement>
          {this.props.children.map( obj => 
            <ArrayElement onItemClick={this.props.onItemClick} header={false}>
              {this.props.values.map( key => new ArrayElementData((key !== 'critical' ? obj[key] : undefined), key === 'critical' ? obj.critical : false ) )}
            </ArrayElement>)}
        </tbody>
      </table>
    </div>);
  }
}