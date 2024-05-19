import React, { useState } from 'react';
import axios from 'axios';
import { Graph } from 'react-d3-graph';

const graphConfig = {
  nodeHighlightBehavior: true,
  node: {
    color: 'lightblue',
    size: 120,
    highlightStrokeColor: 'blue',
  },
  link: {
    highlightColor: 'lightblue',
  },
  directed: true,
  height: 400,
  width: 800,
  staticGraph: false,
  staticGraphWithDragAndDrop: true,
  d3: {
    linkLength: 50, // Adjust this value to reduce the distance between nodes
    linkStrength: 1,
  },
};

const AddNewKnowledge: React.FC = () => {
  const [url, setUrl] = useState<string>('');
  const [graphData, setGraphData] = useState<any>({ nodes: [], links: [] });

  const handleExtractConcepts = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/extract-concepts/', { url });
      const graph = JSON.parse(response.data.graph);

      const formattedGraphData = {
        nodes: graph.nodes.map((node: any) => ({
          id: node.id || 'undefined_node'
        })),
        links: graph.links.map((link: any) => ({
          source: link.source || 'undefined_source',
          target: link.target || 'undefined_target'
        }))
      };

      setGraphData(formattedGraphData);
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  const onClickNode = (nodeId: string) => {
    console.log(`Clicked node ${nodeId}`);
  };

  const onClickLink = (source: string, target: string) => {
    console.log(`Clicked link between ${source} and ${target}`);
  };

  const onZoomChange = (previousZoom: number, newZoom: number) => {
    console.log(`Zoom changed from ${previousZoom} to ${newZoom}`);
  };

  return (
    <div>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter website URL"
      />
      <button onClick={handleExtractConcepts}>Extract Concepts</button>
      <div>
        {graphData.nodes.length > 0 && (
          <Graph
            id="knowledge-graph"
            data={graphData}
            config={graphConfig}
            onClickNode={onClickNode}
            onClickLink={onClickLink}
            onZoomChange={onZoomChange}
          />
        )}
      </div>
    </div>
  );
};

export default AddNewKnowledge;
