"use client";

import React, { useState } from 'react'
import {Alert, FormRow} from '../../../components'
import Wrapper from '../../../app/assets/wrappers/DashboardFormPage'
import { useAuthStore } from '../../../store/useAuthStore'
import { useUIStore } from '../../../store/useUIStore'

export default function Profile() {
  const {user, updateUser, isLoading} = useAuthStore()
  const {showAlert, displayAlert} = useUIStore()
  const [name, setName] = useState(user?.name)
  const [email, setEmail] = useState(user?.email)
  const [lastname, setLastname] = useState(user?.lastname)
  const [position, setPosition] = useState(user?.position)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name || !email || !lastname || !position) {
      displayAlert()
      return
    }

    updateUser({ name, email, lastname, position })
  }
  return (
    <Wrapper>
     <form  className="form" onSubmit={handleSubmit}>
       <h3>profile</h3>
       {showAlert && <Alert />}
       <div className="form-center">
         <FormRow
           type='text'
           name='name'
           value={name}
           handleChange={(e) => setName(e.target.value)}
          />
         <FormRow
         labelText='last name'
           type='text'
           name='lastname'
           value={lastname}
           handleChange={(e) => setLastname(e.target.value)}
          />
         <FormRow
           type='email'
           name='email'
           value={email}
           handleChange={(e) => setEmail(e.target.value)}
          />
         <FormRow
           type='text'
           name='position'
           value={position}
           handleChange={(e) => setPosition(e.target.value)}
          />
          <button className="btn btn-block" type='submit' disabled={isLoading}>
            {isLoading ? 'please Wait' : 'save changes'}
          </button>
           </div>
     </form>
    </Wrapper>
  )
}
