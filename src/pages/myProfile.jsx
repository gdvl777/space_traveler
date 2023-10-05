import React from 'react';
import { useSelector } from 'react-redux';
import Table from 'react-bootstrap/Table';

const MyProfile = () => {
  const rockets = useSelector((state) => state.rockets);
  // const missions = useSelector((state) => state.missions.missions);
  // const dragons = useSelector((state) => state.dragons);
  const reservedRockets = rockets.filter((rocket) => rocket.reserved);
  // const reservedDragons = dragons.filter((dragon) => dragon.reserved);
  // const joinedMissions = missions.filter((mission) => mission.reserved);

  return (
    <div
      style={{
        width: '90%',
        margin: '0 5% 0 4%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
      }}
    >
      <div style={{ width: '30%', marginTop: '20px' }}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>My Missions</th>
            </tr>
          </thead>
          <tbody>
            {/* {joinedMissions.map((mission) => (
              <tr key={mission.mission_id}>
                <td>{mission.mission_name}</td>
              </tr>
            ))} */}
          </tbody>
        </Table>
      </div>
      <div style={{ width: '30%', marginLeft: '5%', marginTop: '20px' }}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>My Rockets</th>
            </tr>
          </thead>
          <tbody>
            {reservedRockets.map((rocket) => (
              <tr key={rocket.rocket_id}>
                <td>{rocket.rocket_name}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div style={{ width: '30%', marginLeft: '5%', marginTop: '20px' }}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>My Dragon</th>
            </tr>
          </thead>
          <tbody>
            {/* {reservedDragons.map((dragon) => (
              <tr key={dragon.dragon_id}>
                <td>{dragon.dragon_name}</td>
              </tr>
            ))} */}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default MyProfile;
