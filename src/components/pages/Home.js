import React from 'react';
import { getWines } from '../../actions/WineActions';
import WineList from '../../components/WineList';
import WineModal from '../../components/WineModal'

const Home = () => {
  return (
    <div>
      <h4>Home Page</h4>
      <p>Your wines will display here:</p>
      <WineModal />
      <WineList />
    </div>
  )
}

export default Home
