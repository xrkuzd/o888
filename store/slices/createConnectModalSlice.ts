import { GetState, SetState } from 'zustand'
import { StoreState } from '@store/store'

export interface IConnectModal {
  isAsked: boolean
  isConnectModalOpen: boolean
  setConnectModalOpen: (toggle: boolean) => void
  setAsked: (toggle: boolean) => void
}

const createConnectModalSlice = (
  set: SetState<StoreState>,
  get: GetState<StoreState>
) => ({
  isConnectModalOpen: false,
  isAsked: false,
  setConnectModalOpen: (toggle: boolean) => {
    set((prev) => ({ isConnectModalOpen: toggle }))
  },
  setAsked: (toggle: boolean) => {
    set((prev) => ({ isAsked: toggle }))
  },
})

export default createConnectModalSlice
