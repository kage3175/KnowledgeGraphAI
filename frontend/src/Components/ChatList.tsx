import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

interface ListViewProps {
  items: string[];
  onItemClick: (item: string) => void;
}

export const ListView: React.FC<ListViewProps> = ({ items, onItemClick }) => {
  return (
    <List>
      {items.map((item, index) => (
        <ListItem key={index} onClick={() => onItemClick(item)}>
          <ListItemText primary={item} />
        </ListItem>
      ))}
    </List>
  );
};