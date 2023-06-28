import React, { useContext, useState } from 'react'
import { Button, Card, Container, Form} from 'react-bootstrap';
import { login, registration } from '../http/userAPI';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { GROUPS_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE } from '../utils/consts';

const Auth = observer(({show, onHide}) => {
  const {user} = useContext(Context)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const location = useLocation()
  const isLogin = location.pathname ===LOGIN_ROUTE
  const navigate = useNavigate()

  const click = async() => {
    try{
      let data;
      if(isLogin){
        data = await login(email, password)
      } else {
        data = await registration(email, password)
      }
      user.setUser(data)
      user.setIsAuth(true)
      navigate(GROUPS_ROUTE)
    }catch(e){
      alert(e.response.data.message)
    }
    
  }

  return (
    <Container className='d-flex justify-content-center align-items-center'
      style={{height:window.innerHeight - 54}}
    >
      <Card style={{width:600}} className="p-5">
        <h2 className='m-auto'>{isLogin ? "Авторизация" : "Регистрация"}</h2>
      <Form>
        <Form.Control
          className='mt-3'
          placeholder="Введите вашу почту"
          value = {email}
          onChange={e => setEmail(e.target.value)}
        />

        <Form.Control
          className='mt-3'
          placeholder="Введите ваш пароль"
          value = {password}
          onChange={e => setPassword(e.target.value)}
          type="password"
        />

      </Form>
      <Form className='d-flex justify-content-between mt-3 pl-3 pr-3'>
        {isLogin ?
          <div>
          Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйся</NavLink>
          </div>
          :
          <div>
          Есть аккаунта? <NavLink to={LOGIN_ROUTE}>Войдите</NavLink>
          </div>
        }
        
      <Button variant='outline-success' onClick={click}>
        {isLogin ? "Войти" : "Регистрация"}
      </Button>
      </Form>
      </Card>
    </Container>

  );
})

export default Auth;