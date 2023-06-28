import React,{useContext} from 'react'
import { Context } from '../index'
import { Button, Col, Container, Image, Nav, Navbar} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { ADMIN_ROUTE, GROUPS_ROUTE, LOGIN_ROUTE } from '../utils/consts';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

const NavBarApp = observer(() => {
    const {user} = useContext(Context)
    let navigate = useNavigate()
    const logOut = () => {
      user.setUser({})
      user.setIsAuth(false)
      localStorage.removeItem('token')
    }

  return (
    <Navbar
      bg="dark"
      variant="dark"

    >
        <Container>
          <Col className=" ">
            <Image
              src={require('../assets/Navpl.png')}
              style={{ width: 40, height: 40}}
            />
          <NavLink
            style={{color:'white', cursor:"pointer"}}
            to={GROUPS_ROUTE}
            className="mt-10"
          >
            Группы
          </NavLink>
          </Col>
          {user.isAuth ?
            <Nav className="ml-auto" style={{color: 'white'}}>
              <Button
                variant='outline-light'
                onClick={() =>navigate(ADMIN_ROUTE)}
              >
                Админ
              </Button>
              <Button
                variant='outline-light'
                onClick={() =>logOut()}
                className='ml-2'
              >
                Выйти
              </Button>
            </Nav>
            :
            <Nav className="ml-auto" style={{color: 'white'}}>
              <Button
                variant={'outline-light'}
                onClick={() => navigate(LOGIN_ROUTE)}
              >
                Авторизация
              </Button>
            </Nav>
          }
        </Container>
      </Navbar>
  );
})

export default NavBarApp;