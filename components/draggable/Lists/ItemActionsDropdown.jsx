// ItemActionsDropdown.js
import React from 'react';
import DropdownMenu, {
  DropdownItem,
  DropdownItemGroup,
} from '@atlaskit/dropdown-menu';
import { useItemActions } from '@/components/draggable/hooks/useItemActions';

function ItemActionsDropdown({ item, index }) {
  const { moveToTop, moveUp, moveDown, moveToBottom } = useItemActions(index);

  return (
    <DropdownMenu trigger="Options">
      <DropdownItemGroup>
        <DropdownItem onClick={moveToTop}>Move to top</DropdownItem>
        <DropdownItem onClick={moveUp}>Move up</DropdownItem>
        <DropdownItem onClick={moveDown}>Move down</DropdownItem>
        <DropdownItem onClick={moveToBottom}>Move to bottom</DropdownItem>
      </DropdownItemGroup>
    </DropdownMenu>
  );
}

export default ItemActionsDropdown;
