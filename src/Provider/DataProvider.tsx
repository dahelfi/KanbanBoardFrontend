import React, { PropsWithChildren, useState } from 'react'

export const DataContext = React.createContext<any|undefined>(undefined)

export const DataProvider = (props: PropsWithChildren) => {
    const [selectedId, setSelectedId] = useState<any>({selectedId: "a2f5hT"})

  return (
   <DataContext.Provider value={{selectedId: selectedId}}>
        {props.children}
   </DataContext.Provider>
  )
}
