import React from 'react';
import './css/widgets.css';
import FactWidget from './FactWidget.jsx';

export default class WidgetsList extends React.Component {
  buildWidget(widget) {
    const {type, id} = widget;
    switch(type) {
      case 'fact':
        return <li className="widgets-list-item" key={id}><FactWidget {...widget} /></li>;
    }
  }
  renderWidgets() {
    const { widgets } = this.props;
    return widgets.map(((widget) => this.buildWidget(widget)), this);
  }
  render() {
    const { className } = this.props;
    const widgetsView = this.renderWidgets();
    return (
      <ul className={'widgets-list ' + className}>
        {widgetsView}
      </ul>
    );
  }
}
