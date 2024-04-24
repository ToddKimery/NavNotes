// ListItem.js
// import React, { useRef } from 'react';
// import { useListContext } from '@/components/draggable/context/useListContext';
// import { useDraggable } from '@/components/draggable/hooks/useDraggable';
// import ItemActionsDropdown from '@/components/draggable/Lists/ItemActionsDropdown';
// import { listItemContainerStyles } from '@/components/draggable/styles/listStyles';
// import { Box, Grid } from '@atlaskit/primitives';

// function ListItem({ item, index }) {
//   const { registerItem } = useListContext();
//   const ref = useRef(null);

//   const { draggableState, dragHandleRef } = useDraggable({
//     item,
//     index,
//     ref,
//     registerItem
//   });

//   return (
//     <Box ref={ref} xcss={listItemContainerStyles}>
//       <Grid>
//         <ItemActionsDropdown item={item} index={index} />
//         <Box>{item.label}</Box>
//       </Grid>
//     </Box>
//   );
// }

// export default ListItem;


// ##### ListItem.js 2 #####

// import React, { useRef } from 'react';
// import { useDraggable } from '@/components/draggable/hooks/useDraggable';

// const ListItem = ({ item, index }) => {
//   const { onDragStart, onDrop } = useDraggable(index);
//   const ref = useRef();

//   return (
//     <div
//       ref={ref}
//       draggable
//       onDragStart={onDragStart}
//       onDragOver={(e) => e.preventDefault()}
//       onDrop={onDrop}
//       style={{ cursor: 'grab' }}
//     >
//       {item.label}
//     </div>
//   );
// };

// export default ListItem;


// ##### ListItem.js 3 #####

// import React from 'react';
// import { useDraggable } from '@/components/draggable/hooks/useDraggable';

// const ListItem = ({ item, index }) => {
//     const { onDragStart, onDragOver, onDrop } = useDraggable(index);

//     return (
//         <div
//             draggable
//             onDragStart={onDragStart}
//             onDragOver={onDragOver}
//             onDrop={onDrop}
//             style={{ cursor: 'grab', padding: '10px', border: '1px solid #ccc', marginBottom: '5px' }}
//         >
//             {item.label}
//         </div>
//     );
// };

// export default ListItem;


// ##### ListItem.js 4 #####
import React, { useRef, useState, useEffect, Fragment } from 'react';
import {getItemData, isItemData,DropDownContent} from '@/components/draggable/utils/dragAndDropUtils';
import { useListContext } from '@/components/draggable/context/ListContext';
import {
  attachClosestEdge,
  Edge,
  extractClosestEdge,
} from '@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge';
import invariant from 'tiny-invariant';
import {
  draggable,
  dropTargetForElements,
  monitorForElements,
} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { setCustomNativeDragPreview } from '@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview';
import { pointerOutsideOfPreview } from '@atlaskit/pragmatic-drag-and-drop/element/pointer-outside-of-preview';
import mergeRefs from '@atlaskit/ds-lib/merge-refs';
import DropdownMenu, {
  DropdownItem,
  DropdownItemGroup,
} from '@atlaskit/dropdown-menu';
// eslint-disable-next-line @atlaskit/design-system/no-banned-imports
import { Box, Grid, Inline, Stack, xcss } from '@atlaskit/primitives';
import { DragHandleButton } from '@atlaskit/pragmatic-drag-and-drop-react-accessibility/drag-handle-button';
import Avatar from '@atlaskit/avatar';
import Badge from '@atlaskit/badge';
import Lozenge from '@atlaskit/lozenge';
import { DropIndicator } from '@atlaskit/pragmatic-drag-and-drop-react-drop-indicator/box';
import { listItemContainerStyles, listItemStyles, listItemDisabledStyles, itemLabelStyles, listItemPreviewStyles } from '@/components/draggable/styles/listStyles'; // Update with the actual path
import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine';


const idleState = { type: 'idle' };
const draggingState= { type: 'dragging' };
const itemKey = Symbol('item')

function ListItem({
  item,
  index,
  position,
}) {

  const { registerItem, instanceId } = useListContext();

  const ref = useRef(null);
  const [closestEdge, setClosestEdge] = useState(null);

  const dragHandleRef = useRef(null);

  const [draggableState, setDraggableState] =
    useState(idleState);

  useEffect(() => {
    
    invariant(ref.current);
    invariant(dragHandleRef.current);

    const element = ref.current;

    const data = getItemData({ item, index, instanceId });

    return combine(
      registerItem({ itemId: item.id, element }),
      draggable({
        element,
        dragHandle: dragHandleRef.current,
        getInitialData: () => data,
        onGenerateDragPreview({ nativeSetDragImage }) {
          setCustomNativeDragPreview({
            nativeSetDragImage,
            getOffset: pointerOutsideOfPreview({
              x: token('space.200', '16px'),
              y: token('space.100', '8px'),
            }),
            render({ container }) {
              setDraggableState({ type: 'preview', container });

              return () => setDraggableState(draggingState);
            },
          });
        },
        onDragStart() {
          setDraggableState(draggingState);
        },
        onDrop() {
          setDraggableState(idleState);
        },
      }),
      dropTargetForElements({
        element,
        canDrop({ source }) {
          return (
            isItemData(source.data) && source.data.instanceId === instanceId
          );
        },
        getData({ input }) {
          return attachClosestEdge(data, {
            element,
            input,
            allowedEdges: ['top', 'bottom'],
          });
        },
        onDrag({ self, source }) {
          const isSource = source.element === element;
          if (isSource) {
            setClosestEdge(null);
            return;
          }

          const closestEdge = extractClosestEdge(self.data);

          const sourceIndex = source.data.index;
          invariant(typeof sourceIndex === 'number');

          const isItemBeforeSource = index === sourceIndex - 1;
          const isItemAfterSource = index === sourceIndex + 1;

          const isDropIndicatorHidden =
            (isItemBeforeSource && closestEdge === 'bottom') ||
            (isItemAfterSource && closestEdge === 'top');

          if (isDropIndicatorHidden) {
            setClosestEdge(null);
            return;
          }

          setClosestEdge(closestEdge);
        },
        onDragLeave() {
          setClosestEdge(null);
        },
        onDrop() {
          setClosestEdge(null);
        },
      }),
    );
  }, [instanceId, item, index, registerItem]);

  return (
    <Fragment>
      <Box ref={ref} xcss={listItemContainerStyles}>
        <Grid
          alignItems="center"
          columnGap="space.100"
          templateColumns="auto 1fr auto"
          xcss={[
            listItemStyles,
            /**
             * We are applying the disabled effect to the inner element so that
             * the border and drop indicator are not affected.
             */
            draggableState.type === 'dragging' && listItemDisabledStyles,
          ]}
        >
          <DropdownMenu
            trigger={({ triggerRef, ...triggerProps }) => (
              <DragHandleButton
                ref={mergeRefs([dragHandleRef, triggerRef])}
                {...triggerProps}
                label={`Reorder ${item.label}`}
              />
            )}
          >
            <DropdownItemGroup>
              <DropDownContent position={position} index={index} />
            </DropdownItemGroup>
          </DropdownMenu>
          <Box xcss={itemLabelStyles}>{item.label}</Box>
          <Inline alignBlock="center" space="space.100">
            <Badge>{1}</Badge>
            <Avatar size="small" />
            <Lozenge>Todo</Lozenge>
          </Inline>
        </Grid>
        {closestEdge && <DropIndicator edge={closestEdge} gap="1px" />}
      </Box>
      {draggableState.type === 'preview' &&
        ReactDOM.createPortal(
          <Box xcss={listItemPreviewStyles}>{item.label}</Box>,
          draggableState.container,
        )}
    </Fragment>
  );

}

export default ListItem;