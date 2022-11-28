import React, { useState, useEffect } from 'react'
import Wrapper from '../assets/wrappers/RegisterPage'
import { Alert, FormRow } from '../Components'
import { useAppContext } from '../context/appContext'
import {useNavigate} from 'react-router-dom'

const initialState = {
    name: '',
    email: '',
    password: '',
    isMember: true,
    showAlert: true
}

export const Register = () => {
   const [values, setValues] = useState(initialState)
   const navigate = useNavigate()
   const {user, isLoading, displayAlert, loginUser, registerUser} = useAppContext()
   const toggleMember = () => {
       setValues({...values, isMember: !values.isMember})
   }
   const handleChange = (e) => {
     setValues({ ...values, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const { name, email, password, isMember } = values
    if (!email || !password || (!isMember && !name)) {
    displayAlert()
    return
  }
  const currentUser = {name, email, password}
  if(isMember){
    loginUser(currentUser)
  }else{
    registerUser(currentUser)
  }
  }

  useEffect(() => {
    if(user){
      setTimeout(() => {
        navigate('/admin')
      }, 3000)
    }
  }, [user, navigate])
  return (
    <Wrapper className='full-page'>

        <form className="form" onSubmit={onSubmit}>
        <h3>{values.isMember ? 'Login' : 'Register'}</h3>
        {values.showAlert && <Alert />}
         
         {!values.isMember && (
         <FormRow 
            type='text'
            name='name'
            value={values.name}
            handleChange={handleChange}
         />
         )}
         <FormRow 
            type='email'
            name='email'
            value={values.email}
            handleChange={handleChange}
         />
         <FormRow 
            type='password'
            name='password'
            value={values.password}
            handleChange={handleChange}
         />
        <button type='submit' disabled={isLoading} className='btn btn-block'>
        {values.isMember ? 'Login' : 'Register'}
        </button>
         <p>
             {values.isMember ? 'Not a member yet' : 'Already a member'}
             <button type='button' className='member-btn' onClick={toggleMember}>
              {values.isMember ? 'Register' : 'Login'}
             </button>
         </p>
        </form>
    </Wrapper>
  )
}
