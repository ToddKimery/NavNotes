// useDraggable.js
// import { useRef, useEffect } from 'react';
// import { useListContext } from '@/components/draggable/context/useListContext';

// export function useDraggable({ item, index, ref, registerItem }) {
//   const { setItems } = useListContext();
//   const dragHandleRef = useRef(null);

//   useEffect(() => {
//     const dragStart = (event) => {
//       event.dataTransfer.setData('text/plain', index);
//       event.dataTransfer.effectAllowed = 'move';
//     };

//     const dragEnd = () => {
//       dragHandleRef.current.removeEventListener('dragstart', dragStart);
//       dragHandleRef.current.removeEventListener('dragend', dragEnd);
//     };

//     const element = ref.current;
//     if (element) {
//       dragHandleRef.current = element;
//       dragHandleRef.current.addEventListener('dragstart', dragStart);
//       dragHandleRef.current.addEventListener('dragend', dragEnd);
//     }

//     return () => {
//       dragEnd();
//     };
//   }, [index, setItems]);

//   return { dragHandleRef };
// }

// ##### useDraggable.jsx 2 #####
// import { useContext } from 'react';
// import { ListContext } from '@/components/draggable/context/ListContext';

// export function useDraggable(index) {
//   const { reorderItem } = useContext(ListContext);

//   const onDragStart = (e) => {
//     e.dataTransfer.setData('text/plain', index);
//   };

//   const onDrop = (e) => {
//     const sourceIndex = index;
//     const targetIndex = parseInt(e.dataTransfer.getData('text/plain'));
//     reorderItem(sourceIndex, targetIndex);
//   };

//   return { onDragStart, onDrop };
// }

// ##### useDraggable.jsx 3 #####

import { useContext } from 'react';
import { ListContext } from '@/components/draggable/context/ListContext';


export function getItemRegistry() {
  const registry = new Map<string, HTMLElement>();

  function register({ itemId, element }: ItemEntry) {
    registry.set(itemId, element);

    return function unregister() {
      registry.delete(itemId);
    };
  }

  function getElement(itemId: string): HTMLElement | null {
    return registry.get(itemId) ?? null;
  }

  return { register, getElement };
}


export function useDraggable(index) {
    const { items, reorderItem } = useContext(ListContext);

    const onDragOver = (e) => {
        e.preventDefault(); // Necessary to allow dropping
    };

    const onDragStart = (e) => {
        e.dataTransfer.setData('text/plain', index);
    };

    const onDrop = (e) => {
        const sourceIndex = parseInt(e.dataTransfer.getData('text/plain'));
        const targetIndex = index;
        if (sourceIndex !== targetIndex) {
            reorderItem(sourceIndex, targetIndex);
        }
    };

    return { onDragStart, onDragOver, onDrop };
}

