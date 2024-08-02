import styled from 'styled-components'

const Wrapper = styled.article`
  background: var(--white);
  border-radius: var(--borderRadius);
  box-shadow: var(--shadow-2);
  transition: var(--transition);

  &:hover {
    transform: scale(1.02);
  }

  .image-container {
    width: 100%;
    height: 200px;
    overflow: hidden;
    border-top-left-radius: var(--borderRadius);
    border-top-right-radius: var(--borderRadius);

    .property-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: var(--transition);

      &:hover {
        transform: scale(1.1);
      }
    }
  }

  .info {
    padding: 1rem 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    border-bottom: 1px solid var(--grey-100);

    h5 {
      letter-spacing: 0;
      margin-bottom: 0.25rem;
      color: var(--primary-500);
      font-size: 1.5rem;
    }

    p {
      margin: 0;
      color: var(--grey-500);
      font-size: 1.25rem;
      font-weight: bold;
    }
  }

  .content {
    padding: 1rem 1.5rem;
  }

  .content-center {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 0.5rem;

    @media (min-width: 576px) {
      grid-template-columns: 1fr 1fr;
    }

    @media (min-width: 992px) {
      grid-template-columns: 1fr;
    }

    @media (min-width: 1120px) {
      grid-template-columns: 1fr 1fr;
    }
  }

  .status {
    border-radius: var(--borderRadius);
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
    text-align: center;
    width: 100px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .pending {
    background: #fcefc7;
    color: #e9b949;
  }

  .interview {
    background: #e0e8f9;
    color: #647acb;
  }

  .declined {
    background: #ffeeee;
    color: #d66a6a;
  }

  footer {
    margin-top: 1rem;
    display: flex;
    justify-content: space-between;
  }

  .actions {
    display: flex;
  }

  .edit-btn,
  .delete-btn {
    letter-spacing: var(--letterSpacing);
    cursor: pointer;
    height: 30px;
    border: none;
    border-radius: var(--borderRadius);
    // padding: 0.5rem 1rem;
    transition: var(--transition);
    
  }

  .edit-btn {
    color: var(--green-dark);
    background: var(--green-light);
    margin-right: 0.5rem;

    &:hover {
      background: var(--green-dark);
      color: var(--white);
    }
  }

  .delete-btn {
    color: var(--red-dark);
    background: var(--red-light);

    &:hover {
      background: var(--red-dark);
      color: var(--white);
    }
  }

  &:hover .actions {
    visibility: visible;
  }
`

export default Wrapper
