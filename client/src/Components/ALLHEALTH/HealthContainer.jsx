import React, { useEffect } from 'react'
import Wrapper from '../../assets/wrappers/JobsContainer'
import { useAppContext } from '../../context/appContext'
import { HealthPageBtnContainer } from '../HealthPageBtnContainer'
import Loading from '../Loading'
import {Health} from './Health'

export const HealthContainer = () => {
    const {
        getHealthPost,
        healthPosts,
        isLoading,
        totalHealthPost,
        page,
        search,
        sort,
    } = useAppContext()

    useEffect(() => {
        getHealthPost()
        // eslint-disable-next-line
    },[sort, search, page])

    if(isLoading){
        return <Loading />
    }
    if(healthPosts.length === 0){
        return (
            <Wrapper>
                <h2>No health tips to display....</h2>
            </Wrapper>
        )
    }
  return (
    <Wrapper>
        <h5>
            {totalHealthPost} Health Tip{healthPosts.length > 1 && 's'} found
        </h5>
        <div className="jobs">
            {healthPosts.map((tip) => {
                return <Health key={tip._id} {...tip} />
            })}
           
        </div>
        <HealthPageBtnContainer />
    </Wrapper>
  )
}
