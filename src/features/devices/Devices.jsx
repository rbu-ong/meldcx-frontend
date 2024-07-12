import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDevices } from "../../store/devices/devicesSlice";
import { logout } from "../../store/auth/authSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaSpinner } from "react-icons/fa"; // You can use any spinner you prefer

const Devices = () => {
  const dispatch = useDispatch();
  const { devices, loading } = useSelector((state) => state.devices);
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(fetchDevices());
    }, 5000);

    return () => clearInterval(intervalId);
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleNotify = async () => {
    const details = {
      name: "Renz Seger T. Bu-ong",
      email: "renzseger@gmail.com",
      repoUrl: "https://github.com/rbu-ong/meldcx-frontend",
      message: `Q: Why did the programmer quit his job?
                A: Because he didn't get arrays.`,
    };

    try {
      await axios.post("http://35.201.2.209:8000/notify", details, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const renderCircles = (devicesCount) => {
    const circles = [];
    const radius = 200; // Radius of the circle pattern
    const angleStep = (2 * Math.PI) / devicesCount;

    for (let i = 0; i < devicesCount; i++) {
      const angle = i * angleStep;
      const x = radius * Math.cos(angle);
      const y = radius * Math.sin(angle);

      circles.push(
        <div
          key={i}
          className="absolute w-16 h-16 bg-white rounded-full"
          style={{
            top: `calc(50% + ${y}px)`,
            left: `calc(50% + ${x}px)`,
            transform: "translate(-50%, -50%)",
          }}
        />
      );
    }

    return circles;
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-orange-500 p-8">
      <div className="flex-grow flex items-center justify-center relative">
        <div className="relative w-64 h-64 flex items-center justify-center">
          {Array.isArray(devices) && renderCircles(devices.length)}
          <div className="absolute flex flex-col items-center justify-center text-white">
            {loading ? (
              <FaSpinner className="text-5xl animate-spin" />
            ) : (
              <p className="text-5xl">{devices.length}</p>
            )}
            <p className="text-lg">
              {devices.length > 1 ? "DEVICES" : "DEVICE"} ONLINE
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-center space-x-4 mt-8">
        <button
          onClick={handleNotify}
          className="px-4 py-2 bg-white text-black rounded"
        >
          NOTIFY
        </button>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-black text-white rounded"
        >
          LOG OUT
        </button>
      </div>
    </div>
  );
};

export default Devices;
