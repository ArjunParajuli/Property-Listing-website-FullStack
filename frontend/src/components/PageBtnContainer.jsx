import React from 'react'
import { useAppContext } from '../context/AppContext'
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi'
import styled from 'styled-components'

const PageBtnContainer = () => {
    const { numOfPages, page, changePage } = useAppContext()
  
    const pages = Array.from({ length: numOfPages }, (_, index) => {
      return index + 1
    })
    const nextPage = () => {
      let newPage = page + 1
      if (newPage > numOfPages) {
        newPage = 1
      }
      changePage(newPage)
    }

    const prevPage = () => {
      let newPage = page - 1
      if (newPage < 1) {
        newPage = numOfPages
      }
      changePage(newPage)
    }


    return (
      <Wrapper>
        <button className='prev-btn' onClick={prevPage}>
          <HiChevronDoubleLeft />
          prev
        </button>
        <div className='btn-container'>
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

export default PageBtnContainer


const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;

  .btn-container {
    display: flex;
    gap: 0.5rem;
  }

  .prev-btn, .next-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #007bff;
    border: none;
    color: #fff;
    padding: 0.5rem 1rem;
    margin: 0 0.5rem;
    border-radius: 0.25rem;
    cursor: pointer;
    transition: background 0.3s;

    &:hover {
      background: #0056b3;
    }
  }

  .pageBtn {
    background: #f8f9fa;
    border: 1px solid #dee2e6;
    color: #007bff;
    padding: 0.5rem 0.75rem;
    border-radius: 0.25rem;
    cursor: pointer;
    transition: background 0.3s;

    &:hover {
      background: #e2e6ea;
    }
  }

  .active {
    background: #007bff;
    color: #fff;
    border-color: #007bff;
  }
`;