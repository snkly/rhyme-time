// import { User } from '../interfaces'

// method to get time left
export const getTimeLeft = (deadline: number) => deadline - Date.now();

// method to get time left in seconds
export const getSeconds = (timeLeft: number) => Math.floor(timeLeft / 1000);

