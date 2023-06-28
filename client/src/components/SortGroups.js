import React, { useContext, useEffect } from "react";
import { Context } from "..";
import { ListGroup } from "react-bootstrap"
import { observer } from "mobx-react-lite"

const SortGroups = observer(() => {
    const {groups} = useContext(Context)
    const {sort} = useContext(Context)

    useEffect(() => {
        sort.setSelectSort("")
      }, [])

    const click = (tab) => {
        sort.setSelectSort(tab)

        var sortedGroups = groups.groups
        
        if(tab.id === 1){
            groups.setGroups(sortedGroups.sort((obj1, obj2) => (obj1.name_gr > obj2.name_gr) ? 1 : -1))
        }
        else{
            groups.setGroups(sortedGroups.sort((obj1, obj2) => (obj1.name_gr < obj2.name_gr) ? 1 : -1))
        }
    }

    return (
        <ListGroup className="mt-2">
            {sort.sorts.map(tab =>
                <ListGroup.Item onClick={() => click(tab)} key={tab.id}
                    style={{cursor: 'pointer'}}
                >
                    {tab.label}
                </ListGroup.Item>
            )}
        </ListGroup>
    );
})

export default SortGroups;
