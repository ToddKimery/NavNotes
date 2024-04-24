// useListContext.js
import { useContext,createContext } from 'react';
import invariant from 'tiny-invariant';

// export function useListContext() {
//   const context = useContext(ListContext);
//   invariant(context, 'useListContext must be used within a ListProvider');
//   return context;
// }


// export function useListContext() {
//   const listContext = useContext(ListContext);
//   invariant(listContext !== null);
//   return listContext;
// }