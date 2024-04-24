// ListExample.js
// import React, { useState, useEffect, useMemo } from 'react';
// import { ListContext } from '../context/ListContext';
// import ListItem from './ListItem';
// import { defaultItems } from '../utils/defaults';
// import { getItemRegistry,getItemPosition } from '../utils/dragAndDropUtils';
// import { Stack } from '@atlaskit/primitives';
// import { containerStyles } from '../styles/listStyles';

// export default function ListExample() {
//   const [items, setItems] = useState(defaultItems);
//   const [registry] = useState(getItemRegistry);

//   const contextValue = useMemo(() => ({
//     items,
//     setItems,
//     registry
//   }), [items, registry]);

//   return (
//     <ListContext.Provider value={contextValue}>
//       <Stack xcss={containerStyles}>
//         {items.map((item, index) => (
//           <ListItem key={item.id} item={item} index={index} position={getItemPosition({index,items})}/>
//         ))}
//       </Stack>
//     </ListContext.Provider>
//   );
// }


// import React from 'react';
// import ListItem from './ListItem';
// import { ListProvider } from '@/components/draggable/context/ListContext';
// import { defaultItems } from '@/components/draggable/utils/defaults';
// import { getItemPosition } from '../utils/dragAndDropUtils';

// const ListExample = () => {
  //   return (
    //     <ListProvider>
    //       {defaultItems.map((item, index) => (
      //         <ListItem key={item.id} item={item} index={index}
      //         position={getItemPosition}
      //         />
      //       ))}
      //     </ListProvider>
      //   );
      // };
      
      // export default ListExample;
      
import {useState,useCallback,useMemo,useEffect,context,useContext} from 'react';
import { defaultItems } from '@/components/draggable/utils/defaults';
import {getItemRegistry,getItemPosition} from '@/components/draggable/utils/DragandDropUtils';
import { ListContext } from '@/components/draggable/context/ListContext';
import { Box, Grid, Inline, Stack, xcss } from '@atlaskit/primitives';
import {containerStyles} from '@/components/draggable/styles/listStyles';
import ListItem from '@/components/draggable/Lists/ListItem';
import {
  draggable,
  dropTargetForElements,
  monitorForElements,
} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import * as liveRegion from '@atlaskit/pragmatic-drag-and-drop-live-region';


export default function ListExample() {
 const [{ items, lastCardMoved }, setListState] = useState({
    items: defaultItems,
    lastCardMoved: null,
  });
  const [registry] = useState(getItemRegistry);

  // Isolated instances of this component from one another
  const [instanceId] = useState(() => Symbol('instance-id'));

  const reorderItem = useCallback(
    ({
      startIndex,
      indexOfTarget,
      closestEdgeOfTarget,
    }) => {
      const finishIndex = getReorderDestinationIndex({
        startIndex,
        closestEdgeOfTarget,
        indexOfTarget,
        axis: 'vertical',
      });

      if (finishIndex === startIndex) {
        // If there would be no change, we skip the update
        return;
      }

      setListState(listState => {
        const item = listState.items[startIndex];

        return {
          items: reorder({
            list: listState.items,
            startIndex,
            finishIndex,
          }),
          lastCardMoved: {
            item,
            previousIndex: startIndex,
            currentIndex: finishIndex,
            numberOfItems: listState.items.length,
          },
        };
      });
    },
    [],
  );

  useEffect(() => {
    return monitorForElements({
      canMonitor({ source }) {
        return isItemData(source.data) && source.data.instanceId === instanceId;
      },
      onDrop({ location, source }) {
        const target = location.current.dropTargets[0];
        if (!target) {
          return;
        }

        const sourceData = source.data;
        const targetData = target.data;
        if (!isItemData(sourceData) || !isItemData(targetData)) {
          return;
        }

        const indexOfTarget = items.findIndex(
          item => item.id === targetData.item.id,
        );
        if (indexOfTarget < 0) {
          return;
        }

        const closestEdgeOfTarget = extractClosestEdge(targetData);

        reorderItem({
          startIndex: sourceData.index,
          indexOfTarget,
          closestEdgeOfTarget,
        });
      },
    });
  }, [instanceId, items, reorderItem]);

  // once a drag is finished, we have some post drop actions to take
  useEffect(() => {
    if (lastCardMoved === null) {
      return;
    }

    const { item, previousIndex, currentIndex, numberOfItems } = lastCardMoved;
    const element = registry.getElement(item.id);
    if (element) {
      triggerPostMoveFlash(element);
    }

    liveRegion.announce(
      `You've moved ${item.label} from position ${
        previousIndex + 1
      } to position ${currentIndex + 1} of ${numberOfItems}.`,
    );
  }, [lastCardMoved, registry]);

  // cleanup the live region when this component is finished
  useEffect(() => {
    return function cleanup() {
      liveRegion.cleanup();
    };
  }, []);

  const getListLength = useCallback(() => items.length, [items.length]);

  const contextValue = useMemo(() => {
    return {
      registerItem: registry.register,
      reorderItem,
      instanceId,
      getListLength,
    };
  }, [registry.register, reorderItem, instanceId, getListLength]);

  return (
    <ListContext.Provider value={contextValue}>
      <Stack xcss={containerStyles}>
        {/*
          It is not expensive for us to pass `index` to items for this example,
          as when reordering, only two items index will ever change.

          If insertion or removal where allowed, it would be worth making
          `index` a getter (eg `getIndex()`) to avoid re-rendering many items
        */}
        {items.map((item, index) => (
          <ListItem
            key={item.id}
            item={item}
            index={index}
            position={getItemPosition({ index, items })}
          />
        ))}
      </Stack>
    </ListContext.Provider>
  );
}