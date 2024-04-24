// dragAndDropUtils.js
import { useListContext } from '../context/ListContext';
import { useCallback } from 'react';
import { DropdownItem, DropdownItemGroup } from '@atlaskit/dropdown-menu';


export function getItemRegistry() {
  const registry = new Map();

  function register({ itemId, element }) {
    registry.set(itemId, element);
    return () => registry.delete(itemId);
  }

  function getElement(itemId) {
    return registry.get(itemId);
  }

  return { register, getElement };
}

export function getReorderDestinationIndex({ startIndex, endIndex, itemsLength }) {
  if (endIndex < 0) {
    return 0;
  } else if (endIndex >= itemsLength) {
    return itemsLength - 1;
  } else {
    return endIndex;
  }
}

export function getItemPosition({
  index,
  items,
}){
  if (items.length === 1) {
    return 'only';
  }

  if (index === 0) {
    return 'first';
  }

  if (index === items.length - 1) {
    return 'last';
  }

  return 'middle';
}

export function getItemData({
  item,
  index,
  instanceId,
}) {
  const itemKey = Symbol('item')
  return {
    [itemKey]: true,
    item,
    index,
    instanceId,
  };
}

export function isItemData(data){
  return data[itemKey] === true;
}

export function DropDownContent({
  position,
  index,
}) {
  const { reorderItem, getListLength } = useListContext();

  const isMoveUpDisabled = position === 'first' || position === 'only';
  const isMoveDownDisabled = position === 'last' || position === 'only';

  const moveToTop = useCallback(() => {
    reorderItem({
      startIndex: index,
      indexOfTarget: 0,
      closestEdgeOfTarget: null,
    });
  }, [index, reorderItem]);

  const moveUp = useCallback(() => {
    reorderItem({
      startIndex: index,
      indexOfTarget: index - 1,
      closestEdgeOfTarget: null,
    });
  }, [index, reorderItem]);

  const moveDown = useCallback(() => {
    reorderItem({
      startIndex: index,
      indexOfTarget: index + 1,
      closestEdgeOfTarget: null,
    });
  }, [index, reorderItem]);

  const moveToBottom = useCallback(() => {
    reorderItem({
      startIndex: index,
      indexOfTarget: getListLength() - 1,
      closestEdgeOfTarget: null,
    });
  }, [index, getListLength, reorderItem]);

  return (
    <DropdownItemGroup>
      <DropdownItem onClick={moveToTop} isDisabled={isMoveUpDisabled}>
        Move to top
      </DropdownItem>
      <DropdownItem onClick={moveUp} isDisabled={isMoveUpDisabled}>
        Move up
      </DropdownItem>
      <DropdownItem onClick={moveDown} isDisabled={isMoveDownDisabled}>
        Move down
      </DropdownItem>
      <DropdownItem onClick={moveToBottom} isDisabled={isMoveDownDisabled}>
        Move to bottom
      </DropdownItem>
    </DropdownItemGroup>
  );
}