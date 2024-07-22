import styled from 'styled-components'

const Wrapper = styled.div`
  border-radius: var(--borderRadius);
  width: 100%;
  max-width: 600px; /* Added max-width to center the form and prevent it from stretching too far */
  margin: 0 auto; /* Center the form horizontally */
  background: var(--white);
  padding: 3rem 2rem 4rem;
  box-shadow: var(--shadow-2);
  h3 {
    margin-top: 0;
  }
  .form {
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    max-width: 100%;
    width: 100%;
  }
  .form-row {
    margin-bottom: 0;
  }
  .form-center {
    display: grid;
    row-gap: 0.5rem;
    column-gap: 1rem; /* Added column-gap for spacing between columns */
  }
  .form-center button {
    align-self: start;
    height: 35px;
    margin-top: 1rem;
    margin: 0 auto;
    background-color: #FCD012;
  }
  .btn-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
    align-self: flex-end;
    margin-top: 0.5rem;
    button {
      height: 35px;
    }
  }
  .clear-btn {
    background: var(--grey-500);
  }
  .clear-btn:hover {
    background: var(--black);
  }
  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .btn-container {
      margin-top: 0;
    }
  }
  @media (min-width: 1120px) {
    // .form-center {
    //   grid-template-columns: 1fr 1fr 1fr;
    // }
    // .form-center button {
    //   margin-top: 0;
    // }
  }
`

export default Wrapper
