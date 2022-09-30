import { GetState, SetState } from 'zustand'
import { StoreState } from '@store/store'

export interface IRoomID {
  roomID: number
  setRoomID: (room: number) => void
}

const createRoomIDSlice = (
  set: SetState<StoreState>,
  get: GetState<StoreState>
) => ({
  roomID: 0,
  setRoomID: (room: number) => {
    set((prev) => ({ roomID: room }))
  },
})

export default createRoomIDSlice
