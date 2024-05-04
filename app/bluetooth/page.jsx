'use client'
import React, { useEffect } from 'react';

const ConnectPage = () => {
  useEffect(() => {
    if (typeof navigator !== 'undefined' && navigator.bluetooth) {
      // Your Web Bluetooth code here
    } else {
      console.log('Web Bluetooth API is not available.');
    }
  }, []);

  const connectBluetoothDevice = async () => {
    if (!navigator.bluetooth) {
      console.error('Web Bluetooth API is not available in this browser.');
      return;
    }

    try {
      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: ['battery_service']
      });

      console.log('Device discovered:', device.name);
      const server = await device.gatt.connect();
      console.log('Connected to the GATT Server:', server);
    } catch (error) {
      console.error('Error connecting to Bluetooth device:', error);
    }
  };

  return (
    <div>
      <h1>Bluetooth Device Connector</h1>
      <button onClick={connectBluetoothDevice}>Connect to Bluetooth Device</button>
    </div>
  );
};

export default ConnectPage;
