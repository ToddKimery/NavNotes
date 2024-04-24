// listStyles.js
import { xcss } from '@atlaskit/primitives';  // Assuming xcss is available for CSS-in-JS

export const containerStyles = xcss({
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '400px',
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: 'color.border',
  padding: 'space.200'
});

export const listItemContainerStyles = xcss({
  position: 'relative',
  backgroundColor: 'elevation.surface',
  borderBottom: '1px solid color.border',
  ':last-of-type': {
    borderBottomWidth: 0,
  },
  padding: 'space.100',
  cursor: 'pointer',
  color:'black'
});

export const listItemStyles = xcss({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: 'space.100'
});

export const listItemPreviewStyles = xcss({
  backgroundColor: 'elevation.surface.overlay',
  borderRadius: 'border.radius.100',
  padding: 'space.050',
  margin: 'space.050',
  boxShadow: 'elevation.shadow.100'
});

export const itemLabelStyles = xcss({
  flexGrow: 1,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
});

export const dragHandleStyles = xcss({
  cursor: 'grab'
});
