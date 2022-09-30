import { GetState, SetState } from 'zustand'
import { StoreState } from '@store/store'

export interface IUser {
  userAccount: string
  profileName: string
  BGClass: string // this is the database unique ID for each entry in our _User Class
  setUserAccount: (address: string) => void
  setProfileName: (name: string) => void
  setBGClass: (background: string) => void
}

const createUserSlice = (
  set: SetState<StoreState>,
  get: GetState<StoreState>
) => ({
  userAccount: '',
  profileName: '',
  BGClass: '',
  setUserAccount: (address: string) => {
    set((prev) => ({ userAccount: address }))
  },
  setProfileName: (name: string) => {
    set((prev) => ({ profileName: name }))
  },
  setBGClass: (background: string) => {
    set((prev) => ({ BGClass: background }))
  },
})

export default createUserSlice
