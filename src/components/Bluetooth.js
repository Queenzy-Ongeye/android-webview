import React, { useState, useEffect } from 'react';
import {
  callHandler,
  registerHandler,
  connectWebViewJavascriptBridge,
} from '../services/androidService';

const Bluetooth = () => {
  const [keyword, setKeyword] = useState('OVES');
  const [macAddress, setMacAddress] = useState('');
  const [scannedDevices, setScannedDevices] = useState([]);

  useEffect(() => {
    connectWebViewJavascriptBridge((bridge) => {
      bridge.init((message, responseCallback) => {
        responseCallback('js success!');
      });

      registerHandler('print', (data, responseCallback) => {
        console.info(data);
        responseCallback(data);
      });

      registerHandler('findBleDeviceCallBack', (data, responseCallback) => {
        console.info(data);
        setScannedDevices((prevDevices) => [...prevDevices, data]);
        responseCallback(data);
      });

      registerHandler('scanQrcodeResultCallBack', (data, responseCallback) => {
        console.info(data);
        responseCallback(data);
      });

      registerHandler('bleConnectSuccessCallBack', (macAddress, responseCallback) => {
        console.info(macAddress);
        responseCallback(macAddress);

        callHandler('initBleData', macAddress, (responseData) => {
          console.info(responseData);
        });
      });

      registerHandler('bleConnectFailCallBack', (macAddress, responseCallback) => {
        console.info(macAddress);
        responseCallback(macAddress);
      });

      registerHandler('bleInitDataCallBack', (data, responseCallback) => {
        console.info(data);
        responseCallback(data);
      });
    });
  }, []);

  const startBleScan = () => {
    setScannedDevices([]); // Clear previous scanned devices
    callHandler('startBleScan', keyword, (responseData) => {
      console.info(responseData);
    });
  };

  const stopBleScan = () => {
    callHandler('stopBleScan', '', (responseData) => {
      console.info(responseData);
    });
  };

  const connBleByMacAddress = () => {
    callHandler('connBleByMacAddress', macAddress, (responseData) => {
      console.info(responseData);
    });
  };

  const initBleData = () => {
    callHandler('initBleData', macAddress, (responseData) => {
      console.info(responseData);
    });
  };

  const toastMsg = () => {
    callHandler('toastMsg', 'toastMsg', (responseData) => {
      console.info(responseData);
    });
  };

  const startQrCode = () => {
    callHandler('startQrCodeScan', 999, (responseData) => {
      console.info(responseData);
    });
  };

  const jump2MainActivity = () => {
    const mainConfig = {
      itemBackgroundColor: '#ffffff',
      itemSelBackgroundColor: '#000000',
      itemSelTextColor: '#202ED1',
      itemTextColor: '#000000',
      items: [
        {
          contentUrl: 'https://www.baidu.com/',
          iconSelUrl:
            'https://tse4-mm.cn.bing.net/th/id/OIP-C.MD5FdM4LTeNRm9dUmRasVgHaHa?rs=1&pid=ImgDetMain',
          iconUrl:
            'https://tse4-mm.cn.bing.net/th/id/OIP-C.MD5FdM4LTeNRm9dUmRasVgHaHa?rs=1&pid=ImgDetMain',
          itemText: 'baidu',
          sortIndex: 0,
        },
        {
          contentUrl: 'https://www.sougou.com/',
          iconSelUrl:
            'https://tse4-mm.cn.bing.net/th/id/OIP-C.MD5FdM4LTeNRm9dUmRasVgHaHa?rs=1&pid=ImgDetMain',
          iconUrl:
            'https://tse4-mm.cn.bing.net/th/id/OIP-C.MD5FdM4LTeNRm9dUmRasVgHaHa?rs=1&pid=ImgDetMain',
          itemText: 'sougou',
          sortIndex: 3,
        },
        {
          contentUrl: 'https://cn.bing.com/',
          iconSelUrl:
            'https://tse4-mm.cn.bing.net/th/id/OIP-C.MD5FdM4LTeNRm9dUmRasVgHaHa?rs=1&pid=ImgDetMain',
          iconUrl:
            'https://tse4-mm.cn.bing.net/th/id/OIP-C.MD5FdM4LTeNRm9dUmRasVgHaHa?rs=1&pid=ImgDetMain',
          itemText: 'bing',
          sortIndex: 1,
        },
        {
          contentUrl: 'https://www.google.com/',
          iconSelUrl:
            'https://tse4-mm.cn.bing.net/th/id/OIP-C.MD5FdM4LTeNRm9dUmRasVgHaHa?rs=1&pid=ImgDetMain',
          iconUrl:
            'https://tse4-mm.cn.bing.net/th/id/OIP-C.MD5FdM4LTeNRm9dUmRasVgHaHa?rs=1&pid=ImgDetMain',
          itemText: 'google',
          sortIndex: 2,
        },
      ],
    };

    callHandler('jump2MainActivity', JSON.stringify(mainConfig), (responseData) => {
      console.info(responseData);
    });
  };

  const handleDeviceClick = (device) => {
    setMacAddress(device.macAddress);
  };

  return (
    <div
      id="app"
      style={{
        flex: 1,
        height: '80%',
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        justifyItems: 'center',
        backgroundColor: '#000000',
      }}
    >
      <div
        style={{
          width: '100%',
          height: '50px',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '10px',
        }}
      >
        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          style={{ width: '200px', height: '50px' }}
          placeholder="please input macAddress"
        />
        <button style={{ width: '200px', height: '50px' }} onClick={startBleScan}>
          startBleScan
        </button>
      </div>

      <button style={{ width: '200px', height: '50px', marginTop: '10px' }} onClick={stopBleScan}>
        stopBleScan
      </button>

      <button style={{ width: '200px', height: '50px', marginTop: '10px' }} onClick={toastMsg}>
        toastMsg
      </button>

      <button style={{ width: '200px', height: '50px', marginTop: '10px' }} onClick={startQrCode}>
        startQrCode
      </button>

      <button
        style={{ width: '200px', height: '50px', marginTop: '10px' }}
        onClick={jump2MainActivity}
      >
        jump2MainActivity
      </button>

      <div
        style={{
          width: '100%',
          height: '50px',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '10px',
        }}
      >
        <input
          value={macAddress}
          onChange={(e) => setMacAddress(e.target.value)}
          style={{ width: '200px', height: '50px' }}
          placeholder="please input macAddress"
        />
        <button style={{ width: '200px', height: '50px' }} onClick={connBleByMacAddress}>
          connBleByMacAddress
        </button>
      </div>

      <div style={{ marginTop: '20px', color: '#fff' }}>
        <h3>Scanned Devices:</h3>
        <ul>
          {scannedDevices.map((device, index) => (
            <li key={index} onClick={() => handleDeviceClick(device)}>
              {device.name} - {device.macAddress} (RSSI: {device.rssi})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Bluetooth;
