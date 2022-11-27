import logo from './logo.svg';
import { useState } from 'react';
// import produce from "immer"

import { useImmer } from "use-immer";
import './App.css';
import './styles.scss';

const initialState = [
  {
    id: 1,
    name: 'Bilal',
    status: {
      isActive: false
    },
    profile: 'https://wallpapers.com/images/hd/cool-neon-blue-profile-picture-u9y9ydo971k9mdcf-u9y9ydo971k9mdcf.jpg'
  },
  {
    id: 2,
    name: 'Jhon',
    status: {
      isActive: false
    },
    profile: 'https://i.pinimg.com/736x/25/78/61/25786134576ce0344893b33a051160b1.jpg'
  },
  {
    id: 3,
    name: 'Sara',
    status: {
      isActive: false
    },
    profile: 'https://wallpapers.com/images/hd/cool-profile-pictures-red-anime-fw4wgkj905tjeujb-fw4wgkj905tjeujb.jpg'
  },
]
function App() {
  const [friendsList, setFriendsList] = useImmer(initialState);
  const handleStatusChanged = (item) => {
    console.log('first')
    console.log(item);
    const index = friendsList.findIndex(i => i.id === item.id);
    if (index === -1) {
      return;
    }

    //This will not work
    // friendsList[friendsList.findIndex(i => i.id === item.id)].status.isActive = item.status.isActive ? false : true;
    // setFriendsList(friendsList);

    // -----------------------------------------

    //This will also not work
    // const friendsListCopy = friendsList;
    // friendsListCopy[index].status.isActive = item.status.isActive ? false : true;
    // setFriendsList(friendsListCopy);

    // -----------------------------------------

    // This will work as we creating new array using spread operator
    // const friendsListCopy = [...friendsList];
    // friendsListCopy[index].status.isActive = item.status.isActive ? false : true;
    // setFriendsList(friendsListCopy);

    // -----------------------------------------

    // 1. first way of doing, uncomment to see the impact
    // setFriendsList(prev => {
    //   const newArr = [...prev];
    //   newArr[index] = { ...prev[index], status: { isActive: item.status.isActive ? false : true}}
    //   return newArr;
    // });

    // -----------------------------------------

    // 2. 2nd way of doing, uncomment produce from import to see the impact
    // setFriendsList(produce((draft) => {
    //   draft[index].status.isActive = item.status.isActive ? false : true;
    // }))

    // -----------------------------------------

    // 3. 3rd way of doing needs to replace useSatet with useUmmer on line number 36, uncomment to see the impact
    setFriendsList((draft) => {
      draft[index].status.isActive = item.status.isActive ? false : true;
    });

    //console.log(friendsListCopy);
  }
  return (
    <div className="App">
      {friendsList?.map((item, i) => {
        return (
          <div className='cards'>
            <div className='cards__items' key={i}>
              <div className='cards__user-profile'>
                <img src={item.profile} alt={item.name} className='cards__user-profile-image' />
              </div>
              <div className='cards__user-info'>
                <div className='cards__user-info_user-info_name-status'>
                  <div className='cards__user-info_name'>{item.name}</div>
                  <div className={`cards__user-info_status${!item.status.isActive ? '-inactive' : ''}`}></div>
                </div>
              </div>
              <button className='cards__btn' onClick={() => handleStatusChanged(item)}>{`make it${item.status.isActive ? ' Offline' : ' Online'} `}</button>
            </div>
          </div>
        )
      })}
    </div>
  );
}

export default App;
