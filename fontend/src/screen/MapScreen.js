import React, { useEffect, useRef, useState } from 'react';
import { makeStyles } from '@mui/styles';
import LoadingBox from '../components/LoadingBox';
import {
  LoadScript,
  GoogleMap,
  StandaloneSearchBox,
  Marker,
} from '@react-google-maps/api';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { USER_ADDRESS_MAP_CONFIRM } from '../constants/userContants';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles({
  fullContainer: {
    margin: '-1rem',
    height: 'calc(100% + 2rem)',
  },
  mapInputBox: {
    boxSizing: 'border-box',
    position: 'absolute',
    left: 0,
    right: 0,
    margin: '0.5rem auto',
    width: '25rem',
    height: '4rem',
    display: 'flex',
  },
});

const libs = ['places'];
const defaultLocation = { lat: 45.516, lng: -73.56 };

export default function MapScreen(props) {
  const navigate = useNavigate();
  const classes = useStyles();
  const [googleApiKey, setGoogleApiKey] = useState('');
  const [center, setCenter] = useState(defaultLocation);
  const [location, setLocation] = useState(center);

  const mapRef = useRef(null);
  const placeRef = useRef(null);
  const markerRef = useRef(null);

  const dispatch = useDispatch();

  const onLoad = (map) => {
    mapRef.current = map;
  };
  const onMarkerLoad = (marker) => {
    markerRef.current = marker;
  };
  const onLoadPlaces = (place) => {
    placeRef.current = place;
  };
  const onIdle = () => {
    setLocation({
      lat: mapRef.current.center.lat(),
      lng: mapRef.current.center.lng(),
    });
  };
  const onPlacesChanged = () => {
    const place = placeRef.current.getPlaces()[0].geometry.location;
    console.log('current places', place);
    setCenter({ lat: place.lat(), lng: place.lng() });
    setLocation({ lat: place.lat(), lng: place.lng() });
  };
  const onConfirm = () => {
    const places = placeRef.current.getPlaces();
    console.log('places', places);
    // if (places && places.length === 1) {
    // dispatch select action
    dispatch({
      type: USER_ADDRESS_MAP_CONFIRM,
      payload: {
        lat: location.lat,
        lng: location.lng,
        // address: places[0].formatted_address,
        // name: places[0].name,
        // vicinity: places[0].vicinity,
        // googleAddressId: places[0].id,
        address: places,
        name: places,
        // vicinity: places[0].vicinity,
        // googleAddressId: places[0].id,
      },
    });
    toast.success('Location seleted successfully');
    navigate('/shipping');
    // } else {
    //   toast('Please enter your address');
    // }
  };

  const getUserCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error('Feolocation as not supported by this browser!');
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  };

  useEffect(() => {
    const fetch = async () => {
      const { data } = await axios('/api/config/google');
      setGoogleApiKey(data);
      getUserCurrentLocation();
    };
    fetch();
  }, []);
  console.log('googleApiKey', googleApiKey);

  const containerStyle = {
    width: '900px',
    height: '900px',
  };

  return googleApiKey ? (
    <div>
      <LoadScript libraries={libs} googleMapsApiKey={googleApiKey}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={15}
          onLoad={onLoad}
          onIdle={onIdle}
        >
          <StandaloneSearchBox
            onLoad={onLoadPlaces}
            onPlacesChanged={onPlacesChanged}
          >
            <div className={classes.mapInputBox}>
              <input type="text" placeholder="Enter your address" />
              <button type="button" className="primary" onClick={onConfirm}>
                Confirm
              </button>
            </div>
          </StandaloneSearchBox>
          <Marker position={location} onLoad={onMarkerLoad}></Marker>
        </GoogleMap>
      </LoadScript>
    </div>
  ) : (
    <LoadingBox></LoadingBox>
  );
}
