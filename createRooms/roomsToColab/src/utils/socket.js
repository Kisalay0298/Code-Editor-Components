// src/socket.js
import { io } from "socket.io-client";

const socket = io('http://localhost:6948'); // Your backend server

export default socket;
