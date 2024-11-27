"use server";

import { cookies } from 'next/headers'

export const setCookie = async (key: string, value: string) => {
    const cookieStore = await cookies()
    cookieStore.set(key, value)
}

export const getCookie = async (key: string) => {
    const cookieStore = await cookies()
    return cookieStore.get(key)
}

export const removeCookie = async (key: string) => {
    const cookieStore = await cookies()
    cookieStore.delete(key)
}

export const getAllCookies = async () => {
    const cookieStore = await cookies()
    return cookieStore.getAll()
}

export const clearAllCookies = async () => {
    const cookieStore = await cookies()
    const allCookies = cookieStore.getAll();
    allCookies.forEach(cookie => cookieStore.delete(cookie.name));
}

export const checkCookie = async (key: string) => {
    const cookieStore = await cookies()
    const check = cookieStore.has(key)
    return check
}

