// ListContext.js
// import { createContext } from 'react';

// export const ListContext = createContext(null);

// export const ListProvider = ({ children, value }) => (
//   <ListContext.Provider value={value}>
//     {children}
//   </ListContext.Provider>
// );


import React, { useCallback,useMemo,useContext,createContext, useState } from 'react';
import invariant from 'tiny-invariant';

export const ListContext = createContext(null);

export function useListContext() {
  const listContext = useContext(ListContext);
  invariant(listContext !== null);
  return listContext;
}

function getItemRegistry() {

  const registry = new Map();

  function register({ itemId, element }) {
    registry.set(itemId, element);

    return function unregister() {
      registry.delete(itemId);
    };
  }

  function getElement(itemId) {
    return registry.get(itemId) ?? null;
  }

  return { register, getElement };
}


export const ListProvider = ({ children }) => {
  const [items, setItems] = useState([]);
const [registry] = useState(getItemRegistry);


  const reorderItem = (startIndex, endIndex) => {
    const result = Array.from(items);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    setItems(result);
  };

  // const contextValue = useMemo(() => ({
  //   items,
  //   setItems,
  //   registry
  // }), [items, registry]);

  const [instanceId] = useState(() => Symbol('instance-id'));
  const getListLength = useCallback(() => items.length, [items.length]);
    const contextValue= useMemo(() => {
    return {
      registerItem: registry.register,
      reorderItem,
      instanceId,
      getListLength,
    };
  }, [registry.register, reorderItem, instanceId, getListLength]);


  return (
    <ListContext.Provider value={contextValue}>
      {children}
    </ListContext.Provider>
  );
};
