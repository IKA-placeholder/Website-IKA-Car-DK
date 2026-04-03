import { createServerFn } from '@tanstack/react-start'

const API_BASE = 'https://ika-car-dk-api.onrender.com'

export type PredictApiResponse = {
  maerke?: string
  model?: string
  årgang?: number | string
  estimated_price?: number
}

export const predictPlate = createServerFn({ method: 'POST' })
  .inputValidator((data: { plate: string }) => data)
  .handler(async ({ data }) => {
    const formattedPlate = data.plate.replace(/\s+/g, '')
    const res = await fetch(`${API_BASE}/predict/${encodeURIComponent(formattedPlate)}`)
    if (!res.ok) {
      throw new Error('Failed to fetch car data')
    }
    return (await res.json()) as PredictApiResponse
  })

type LoginBody = { email: string; password: string }

export type LoginApiResponse = {
  token?: string
  user?: { is_admin_user?: boolean }
  detail?: { msg: string }[]
  message?: string
}

export const loginUser = createServerFn({ method: 'POST' })
  .inputValidator((data: LoginBody) => data)
  .handler(async ({ data }) => {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    const json = (await res.json()) as LoginApiResponse
    if (!res.ok) {
      const message =
        json.detail?.[0]?.msg ||
        json.message ||
        `login failed (${res.status} ${res.statusText})`
      throw new Error(message)
    }
    return json
  })

type SignupBody = { username: string; email: string; password: string }

export type SignupApiResponse = {
  message?: string
  detail?: { msg: string }[]
}

export const signupUser = createServerFn({ method: 'POST' })
  .inputValidator((data: SignupBody) => data)
  .handler(async ({ data }) => {
    const res = await fetch(`${API_BASE}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    let json: SignupApiResponse = {}
    try {
      json = (await res.json()) as SignupApiResponse
    } catch {
      /* empty */
    }
    if (!res.ok) {
      const message =
        json.detail?.[0]?.msg || json.message || `Signup failed (${res.status})`
      throw new Error(message)
    }
    return json
  })

export type MeResponse = {
  is_admin_user?: boolean
}

export const fetchMeWithToken = createServerFn({ method: 'POST' })
  .inputValidator((data: { token: string }) => data)
  .handler(async ({ data }) => {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: {
        Authorization: `Bearer ${data.token}`,
      },
    })
    if (!res.ok) {
      throw new Error('Unauthorized')
    }
    return (await res.json()) as MeResponse
  })
