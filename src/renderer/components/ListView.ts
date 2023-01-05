import * as React from 'react';

/**
  Usage:
  <ListView
    dataSource={[]}
    renderRow={() => {}}
    style={StyleObject}
  />
*/

type Props = {
  style: { [key: string]: string | number };
  dataSource: Array<any>;
  renderRow: (mixed: any) => any;
};

class ListView extends React.Component<Props> {
  static defaultProps: Props = {
    renderRow: () => null,
    dataSource: [],
    style: {},
  };

  render(): any {
    const { style, renderRow, dataSource } = this.props;
    return React.createElement(
      'View',
      { style },
      dataSource.length ? dataSource.map(renderRow) : null
    );
  }
}

export default ListView;
