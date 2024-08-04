import React, {useEffect} from 'react'
import Wrapper from '../wrappers/propertiesWrapper'
import { useAppContext } from '../context/AppContext';
import Alert from './Alert';
import Property from './Property';
import Loading from './Loading';
import PageBtnContainer from './PageBtnContainer';

const Properties = () => {
    const {
        getAllProperties,
        properties,
        isLoading,
        page,
        totalProperties,
        numOfPages,
        showAlert,
        search, searchStatus, searchType, sort 
      } = useAppContext();

      useEffect(() => {
        getAllProperties();
      }, [page, search, searchStatus, searchType, sort]);

      if(isLoading) return <Loading />

      if (properties?.length === 0) {
        return (
          <Wrapper>
            <h2>No properties to display...</h2>
          </Wrapper>
        );
      }
    
      return (
        <Wrapper>
          {showAlert && <Alert />}
          <h5>
            {totalProperties} properties{properties?.length > 1 && 's'} found
          </h5>
          <div className='properties'>
            {properties?.map((p) => {
              return <Property key={p._id} {...p} />
            })}
          </div>

          <PageBtnContainer />
        </Wrapper>
      );
    };
export default Properties