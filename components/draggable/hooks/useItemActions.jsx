// useItemActions.js
import { useCallback } from 'react';
import { useListContext } from '@/components/draggable/context/useListContext';

export function useItemActions(index) {
  const { items, setItems } = useListContext();

  const moveToTop = useCallback(() => {
    const newItems = [...items];
    const [item] = newItems.splice(index, 1);
    newItems.unshift(item);
    setItems(newItems);
  }, [items, setItems, index]);

  const moveUp = useCallback(() => {
    if (index > 0) {
      const newItems = [...items];
      const [item] = newItems.splice(index, 1);
      newItems.splice(index - 1, 0, item);
      setItems(newItems);
    }
  }, [items, setItems, index]);

  const moveDown = useCallback(() => {
    if (index < items.length - 1) {
      const newItems = [...items];
      const [item] = newItems.splice(index, 1);
      newItems.splice(index + 1, 0, item);
      setItems(newItems);
    }
  }, [items, setItems, index]);

  const moveToBottom = useCallback(() => {
    const newItems = [...items];
    const [item] = newItems.splice(index, 1);
    newItems.push(item);
    setItems(newItems);
  }, [items, setItems, index]);

  return { moveToTop, moveUp, moveDown, moveToBottom };
}
