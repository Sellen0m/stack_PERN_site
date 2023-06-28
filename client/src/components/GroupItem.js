import { Card } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom'
import { GROUP_ROUTE } from '../utils/consts';
import { useEffect, useState } from 'react';
import { fetchOneGenres } from '../http/genreAPI';
import { observer } from 'mobx-react-lite';

const GroupItem = observer(({groups}) => {
    let navigate = useNavigate()
    const [genres, setGenres] = useState('')
  return (
    <Card
      md={3}
      style={{width: 230, cursor: 'pointer', height: 300}}
      className="ms-3 mb-3"
      onClick={()=>navigate(GROUP_ROUTE + '/' + groups.id)}
    >
        <Card.Img
          className="d-flex justify-content-start mt-1"
          style={{width: 200, height: 200, cursor: 'pointer'}}
          border={'light'}
          src={process.env.REACT_APP_API_URL + groups.img}
        />
        <Card.Title
          className="d-flex justify-content-start ms-3 mb-2 mt-1"
        >
          <hr></hr>
          {groups.name_gr}
        </Card.Title>
        <Card.Subtitle
          className="d-flex justify-content-start ms-3 mb-2 mt-1"
        >
          {useEffect(() => {
              fetchOneGenres(groups.Genres_id).then(data => setGenres(data))
          }, [groups.id])
          }
          <div>{genres.name_gn}</div>
        </Card.Subtitle>

    </Card>
  );
})

export default GroupItem;