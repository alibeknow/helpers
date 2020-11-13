import { SPUser, SPUserDay } from "../models/users";
import { ISPTaskDays } from "@wnm.development/fortnite-social-pass-types";
import { SPStartDate } from "./constants";

interface timeoutReturn {
  seconds?: number
  minutes: number
  hours?: number
  days?: number
}

export function SPFilterUserDays<T extends Pick<SPUserDay, "day"> & { [key: string]: any }>
(user: Pick<SPUser, "passType"> & { [key: string]: any }, days: T[]): T[] {
  return days.filter(day => {
    if (user.passType === "SOCIAL") return true;
    // if (day.day !== ISPTaskDays.tue && day.day !== ISPTaskDays.sun) return true;
    return false;
  });
}

export function getTimeoutDates(diff: number): timeoutReturn {
  const obj: timeoutReturn = { days: 0, hours: 0, minutes: 0 };

  if (diff < 0) return obj;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
  const minutes = Math.floor(diff / (1000 * 60)) % 60;
  const seconds = Math.floor(diff / (1000)) % 60;

  if (days > 0) obj.days = days;
  obj.hours = hours;
  obj.minutes = minutes;
  if (days <= 0) {
    obj.seconds = seconds;
    delete obj.days;
  }

  return obj;
}

export function SPGetCurrentDay(): number {
  return getTimeoutDates(new Date().getTime() - SPStartDate.getTime()).days || 0;
}
