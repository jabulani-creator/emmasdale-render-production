"use client";

import React from 'react'
import Wrapper from '../app/assets/wrappers/PageBtnContainer'
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi'
import { useDataStore } from '../store/useDataStore'
import { useFormStore } from '../store/useFormStore'

export const PageBtnContainer = () => {
    const { numOfpages } = useDataStore()
    const { page, changePage } = useFormStore()

    const pages = Array.from({length: numOfpages}, (_, index) => {
        return index + 1
    })
    const prevPage = () => {
        let newPage = page - 1
        if(newPage < 1){
            newPage = numOfpages
        }
        changePage(newPage)
    }
    const nextPage = () => {
       let newPage = page + 1
       if(newPage > numOfpages){
           newPage = 1
       }
       changePage(newPage)
    }
  return (
    <Wrapper>
        <button 
        className="prev-btn"
        onClick={prevPage}>
        <HiChevronDoubleLeft />
         prev
        </button>
        <div className="btn-container">
            {pages.map((pageNumber) => {
                return (
                    <button 
                    type='button'
                    className={pageNumber === page ? 'pageBtn active' : 'pageBtn'}
                    key={pageNumber}
                    onClick={() => changePage(pageNumber)}
                    >
                        {pageNumber}
                    </button>
                )
            })}
        </div>
        <button className='next-btn' onClick={nextPage}>
        next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  )
}
