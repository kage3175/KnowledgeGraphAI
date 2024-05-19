# api/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import requests
from bs4 import BeautifulSoup
import spacy
import networkx as nx
import json
import logging

# Load spaCy model
nlp = spacy.load('en_core_web_sm')

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

class ExtractConceptsView(APIView):
    def post(self, request, *args, **kwargs):
        url = request.data.get('url')
        if not url:
            return Response({'error': 'URL is required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            response = requests.get(url)
            response.raise_for_status()
            soup = BeautifulSoup(response.content, 'html.parser')
            text = ' '.join([p.get_text() for p in soup.find_all('p')])
            concepts = self.extract_concepts(text)
            graph = self.build_knowledge_graph(concepts)
            graph_json = json.dumps(nx.node_link_data(graph))
            return Response({'graph': graph_json}, status=status.HTTP_200_OK)
        except requests.exceptions.RequestException as e:
            logger.error(f"Request failed: {e}")
            return Response({'error': f"Request failed: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            logger.error(f"An error occurred: {e}")
            return Response({'error': f"An error occurred: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def extract_concepts(self, text):
        try:
            doc = nlp(text)
            concepts = [chunk.text for chunk in doc.noun_chunks]
            return concepts
        except Exception as e:
            logger.error(f"Error extracting concepts: {e}")
            raise

    def build_knowledge_graph(self, concepts):
        try:
            G = nx.DiGraph()
            for i, concept in enumerate(concepts[:20]):
                G.add_node(concept, label=concept)
                if i > 0:
                    G.add_edge(concepts[i-1], concept)
            return G
        except Exception as e:
            logger.error(f"Error building knowledge graph: {e}")
            raise


class IncrementView(APIView):
    def post(self, request, *args, **kwargs):
        number = request.data.get('number')
        if number is not None:
            incremented_number = number + 10
            return Response({'result': incremented_number}, status=status.HTTP_200_OK)
        return Response({'error': 'Invalid input'}, status=status.HTTP_400_BAD_REQUEST)