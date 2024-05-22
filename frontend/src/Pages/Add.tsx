import React, { useState } from 'react';
import axios from 'axios';
import { Graph } from 'react-d3-graph';
import styled, { keyframes } from 'styled-components';
import { TextField, Button, Container, CssBaseline, Paper, Typography } from '@mui/material';
import { Chat, MessageTuple } from '../Components/Chat';

const graphConfig = {
  automaticRearrangeAfterDropNode: true,
  collapsible: true,
  directed: true,
  focusAnimationDuration: 0.75,
  focusZoom: 1,
  freezeAllDragEvents: false,
  height: 400,
  highlightDegree: 2,
  highlightOpacity: 0.2,
  linkHighlightBehavior: true,
  maxZoom: 12,
  minZoom: 0.05,
  initialZoom: null,
  nodeHighlightBehavior: true,
  panAndZoom: false,
  staticGraph: false,
  staticGraphWithDragAndDrop: false,
  width: 800,
  d3: {
    alphaTarget: 0.05,
    gravity: -250,
    linkLength: 120,
    linkStrength: 2,
    disableLinkForce: false
  },
  node: {
    color: "#d3d3d3",
    fontColor: "black",
    fontSize: 10,
    fontWeight: "normal",
    highlightColor: "red",
    highlightFontSize: 14,
    highlightFontWeight: "bold",
    highlightStrokeColor: "red",
    highlightStrokeWidth: 1.5,
    mouseCursor: "crosshair",
    opacity: 0.9,
    renderLabel: true,
    size: 200,
    strokeColor: "none",
    strokeWidth: 1.5,
    svg: "",
    symbolType: "circle",
  },
  link: {
    color: "lightgray",
    fontColor: "black",
    fontSize: 8,
    fontWeight: "normal",
    highlightColor: "red",
    highlightFontSize: 8,
    highlightFontWeight: "normal",
    mouseCursor: "pointer",
    opacity: 1,
    renderLabel: false,
    semanticStrokeWidth: true,
    strokeWidth: 3,
    markerHeight: 6,
    markerWidth: 6,
    type: "STRAIGHT",
    selfLinkDirection: "TOP_RIGHT",
    strokeDasharray: 0,
    strokeDashoffset: 0,
    strokeLinecap: "butt",
  }
};

type Article = {
	summary: string
};

const transformString = (input: string) : MessageTuple[] => {
    const parts = input.split('<|THISISCHATSEP|>');
    const keys = ["AI", "User"];
    return parts.map((part, index) => [keys[index % keys.length], part]);
};


const AddNewKnowledge: React.FC = () => {
	const [input, setInput] = useState<string>('');
	const [chat, setChat] = useState<string>('');
	const [graphData, setGraphData] = useState<any>({ nodes: [], links: [] });
	const [zoomLevel, setZoomLevel] = useState<number>(1);
	const [article, setArticle] = useState<Article | null>(null); // Add this line

	const handleExtractConcepts = async () => {
		try {
			const response = await axios.post('http://127.0.0.1:8000/api/extract-concepts/', { url: input });
			const data = response.data;
			setArticle(data);
		
			// Set the article data
		
			// Parse the graph data
			//   const graph = JSON.parse(data.graph);
		
			//   const formattedGraphData = {
			// 	nodes: graph.nodes.map((node: any) => ({
			// 	  id: node.id || 'undefined_node'
			// 	})),
			// 	links: graph.links.map((link: any) => ({
			// 	  source: link.source || 'undefined_source',
			// 	  target: link.target || 'undefined_target'
			// 	}))
			//   };
		
			//   setGraphData(formattedGraphData);
		} catch (error) {
		  console.error('There was an error!', error);
		}
	};
	const handleAdditionalChats = async () => {
		try {
			setChat("");
			const response = await axios.post('http://127.0.0.1:8000/api/extract-concepts/', { url: input, message: chat });
			const data = response.data;
			setArticle(data);
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

	const handleZoomIn = () => {
		setZoomLevel((prevZoomLevel) => prevZoomLevel + 0.2);
	};

	const handleZoomOut = () => {
		setZoomLevel((prevZoomLevel) => Math.max(prevZoomLevel - 0.2, 0.2));
	};

	return (
		<Container component="main" maxWidth="lg">
			<CssBaseline />
			<Paper elevation={3} style={{ padding: '2rem', marginTop: '2rem', textAlign: 'center' }}>
				<Typography variant="h5" gutterBottom>
					Add New Knowledge
				</Typography>
				<FormC>
					<TextField variant="outlined" margin="normal" required fullWidth id="input" label="Enter Keyword or URL" name="input" autoComplete="off" autoFocus value={input} onChange={(e) => setInput(e.target.value)}/>
					<Button
						variant="contained"
						color="primary"
						onClick={handleExtractConcepts}
						style={{ marginTop: '1rem' }}
					>
						Extract Concepts
					</Button>
				</FormC>
				<FullDiv>
					{article && <Chat messages={transformString(article?.summary)} />}
				</FullDiv>
				{article && <FormR>
					<TextField variant="outlined" margin="normal" required fullWidth id="input" label="Additional Chats about the URL" name="input" autoComplete="off" value={chat} onChange={(e) => setChat(e.target.value)}/>
					<Button variant="contained" color="primary" onClick={handleAdditionalChats} style={{ marginTop: '1rem' }}>
						Send!
					</Button>
				</FormR>}
				<Button variant="contained" color="primary" onClick={() => {}} style={{ marginTop: '1rem' }}>
					Add to Graph!
				</Button>
				<GraphContainer>
					{graphData.nodes.length > 0 && (
						<>
							<Graph
								id="knowledge-graph"
								data={graphData}
								config={{...graphConfig, initialZoom: zoomLevel}}
								onClickNode={onClickNode}
								onClickLink={onClickLink}
								onZoomChange={(prevZoom, newZoom) => setZoomLevel(newZoom)}
							/>
							<ZoomControls>
								<Button variant="contained" color="primary" onClick={handleZoomIn}>
									+
								</Button>
								<Button variant="contained" color="primary" onClick={handleZoomOut}>
									-
								</Button>
								<span>
										Zoom: {zoomLevel.toFixed(2)}
								</span>
							</ZoomControls>
						</>
					)}
				</GraphContainer>
			</Paper>
		</Container>
	);
};

export default AddNewKnowledge;

const FullDiv = styled.div`
	width: 100%;
`;
// Styled-components
const FormR = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
`;
const FormC = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const fadeIn = keyframes`
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
`;

const GraphContainer = styled.div`
	margin-top: 2rem;
	position: relative;
	animation: ${fadeIn} 1s ease-in;
`;

const ZoomControls = styled.div`
	position: absolute;
	top: 1rem;
	right: 1rem;
	display: flex;
	flex-direction: column;

	button {
		margin-bottom: 0.5rem;
	}
`;
