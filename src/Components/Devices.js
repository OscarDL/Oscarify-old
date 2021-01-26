import React from 'react';
import '../Styles/Devices.css';
import SpotifyWebApi from 'spotify-web-api-js';
import { IoLaptopOutline } from 'react-icons/io5';
import { FiSpeaker, FiSmartphone } from 'react-icons/fi';

const spotify = new SpotifyWebApi();

function Devices({devices, deviceID, is_local, product}) {

  return (
    <div className="devices" id="devices">
      <h2>Connect to a device</h2>
      <img src="https://open.scdn.co/cdn/images/connect_header@1x.ecc6912d.png" alt="spotify-connect"></img>
      {(is_local) && <h5>You cannot use Spotify Connect while playing local songs.</h5>}
      {(product !== 'premium') && <h5>You cannot use Spotify Connect remotely as a free user.</h5>}

      {devices.map((device, i) =>

        <div key={i} className={(product !== 'premium' || device.is_restricted || is_local) ? 'device restricted' : 'device'} style={{cursor: ((product !== 'premium' || device.is_restricted || is_local) ? 'no-drop' : 'pointer')}} onClick={() => (product !== 'premium' || device.is_restricted || is_local) ? null : spotify.transferMyPlayback([device.id])}>

          {(device.type === 'Smartphone' && <FiSmartphone size={24} color={device.is_active ? '#1db954' : (deviceID === device.id ? '#1db954' : '#eeeeee')}/>)
            ||
          (device.type === 'Computer' && <IoLaptopOutline size={24} color={device.is_active ? '#1db954' : (deviceID === device.id ? '#1db954' : '#eeeeee')}/>)
            ||
          <FiSpeaker size={24} color={device.is_active ? '#1db954' : (deviceID === device.id ? '#1db954' : '#eeeeee')}/>}
          <span style={{color: device.is_active ? '#1db954' : (deviceID === device.id ? '#1db954' : '#eeeeee'), fontWeight: device.is_active ? 600 : (deviceID === device.id ? 600 : 400)}}>{device.name}</span>

        </div>

      )}

    </div>
  );
}

export default Devices;