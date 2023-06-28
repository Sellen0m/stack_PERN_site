import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react'
import { Context } from '..';
import { Row } from 'react-bootstrap';
import GroupItem from './GroupItem';

const GroupList = observer(() => {
    const {groups} = useContext(Context)
  return (
    <Row className='d-flex'>
        {groups.groups.map(groups =>
            <GroupItem key={groups.id} groups = {groups}/>
        )}
    </Row>
  );
})

export default GroupList;