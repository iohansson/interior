import React from 'react';
import Title from './Title.jsx';
import Paragraph from './Paragraph.jsx';
import ListControls from './ListControls.jsx';
import WidgetsList from './widgets/WidgetsList.jsx';

export default class Page extends React.Component {
  constructor(props) {
    super(props);
  }
  buildWidget(widget) {
    const { type } = widget;
    switch (type) {
      case 'fact':
        return <FactWidget {...widget} />;
    }
  }
  render() {
    const { page, className } = this.props;
    const { title, paragraph, widgets } = page;
    const titleView = title ? <Title className="page-title" title={title} /> : '';
    const paragraphView = paragraph ? <Paragraph className="page-paragraph" text={paragraph} /> : '';
    const widgetsView = widgets ? <WidgetsList className="page-widgets-list" widgets={widgets} /> : '';
    const controls = <ListControls {...this.props} />;
    return (
      <div className={'container page-container ' + (className ? className : '')}>
        {titleView}
        {paragraphView}
        {widgetsView}
        {controls}
      </div>
    );
  }
}
