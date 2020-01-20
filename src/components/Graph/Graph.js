import React, { useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { DataSet, Graph2d } from 'vis-timeline';
import 'vis-timeline/dist/vis-timeline-graph2d.css';

const Graph = ({ type, data }) => {
  const graph2d = useRef(null);

  const draw = useCallback(() => {
    const container = document.getElementById('visualization');
    const groups = new DataSet();
    groups.add({ id: 0, content: `total_${type}_expected` });
    groups.add({ id: 1, content: `total_${type}_observed` });
    const items = [];
    data.forEach(item => {
      items.push({
        x: item.day,
        y: item[`total_${type}_expected`],
        group: 0
      });
      items.push({
        x: item.day,
        y: item[`total_${type}_observed`],
        group: 1
      });
    });

    // const dataset = new DataSet(items);
    const options = {
      style: 'bar',
      stack: false,
      barChart: { width: 50, align: 'center', sideBySide: true }, // align: left, center, right
      drawPoints: false,
      dataAxis: {
        icons: true
      },
      orientation: 'top'
    };
    if (!graph2d.current) {
      graph2d.current = new Graph2d(container, items, groups, options);
    } else {
      graph2d.current.setGroups(groups);
      graph2d.current.setItems(items);
    }
  }, [data, type, graph2d]);

  useEffect(() => {
    draw();
  }, [type, data, draw]);

  return (
    <div className="mb-5">
      <div className="p-3">Report Chart</div>
      <div
        id="visualization"
        style={{
          width: '100%',
          minWidth: '375px',
          height: '375px',
          border: '1px solid lightgray',
          margin: 'auto'
        }}
      />
    </div>
  );
};

Graph.propTypes = {
  type: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.any).isRequired
};

export default Graph;
