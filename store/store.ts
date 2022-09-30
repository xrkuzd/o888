import create, { SetState, GetState } from 'zustand'
import createConnectModalSlice, {
  IConnectModal,
} from '@store/slices/createConnectModalSlice'

import createUserSlice, { IUser } from '@store/slices/createUserSlice'

import createRoomIDSlice, { IRoomID } from '@store/slices/createRoomIDSlice'

export type StoreState = IConnectModal & IUser & IRoomID

export type StoreSlice<T> = (
  set: SetState<StoreState>,
  get: GetState<StoreState>
) => T

const useStore = create<StoreState>((set, get) => ({
  ...createConnectModalSlice(set, get),
  ...createUserSlice(set, get),
  ...createRoomIDSlice(set, get),
}))

export default useStore
