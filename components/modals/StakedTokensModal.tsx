// prettier-ignore

import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useMoralis } from 'react-moralis'
import Image from 'next/image'
import { Eye, Scripture } from '@utils/imageHelper'
import { useMediaQuery } from 'react-responsive'
import { SCREENS } from '@utils/constants/Screens'
import { useForm } from 'react-hook-form'
import useStore from '@store/store'

type FormData = {
  profileName: string
}

// prettier-ignore
const StakedTokensModal = () => {
  const cancelButtonRef = useRef(null)
  const { user } = useMoralis()
  const isConnectModalOpen = useStore((state) => state.isConnectModalOpen)
  const setConnectModalOpen = useStore((state) => state.setConnectModalOpen)

  const isMobile = useMediaQuery({ maxWidth: SCREENS.lg }) // 1024 px

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit = handleSubmit((data) => {
    if (user) {
      user.set('profileName', data.profileName)
      user.set('askedAlready', true)
      user.set('hasProfileName', true)
      setConnectModalOpen(false)
    } else {
      alert('YOU ARE NOT LOGGED IN!')
    }
  })

  return (
    <Transition.Root show={isConnectModalOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        initialFocus={cancelButtonRef}
        onClose={() => {
          setConnectModalOpen(false)
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-900 bg-opacity-95 transition-opacity lg:bg-gray-800 lg:bg-opacity-90" />
        </Transition.Child>

        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="bgPatternModal relative flex w-3/4 max-w-sm transform flex-col items-center justify-center space-y-8 overflow-hidden rounded-lg border-4 border-slate-800 p-[8px] shadow-xl shadow-white/20 transition-all lg:max-w-3xl lg:flex-row lg:space-y-0 lg:rounded-lg lg:border-2 lg:border-slate-500 lg:p-[2px]">
                <div className="z-50 w-full rounded-md bg-white/90 lg:w-2/3 lg:rounded-none lg:px-8 lg:py-12">
                  <div className="flex flex-col justify-between space-y-2 p-4 leading-normal">
                    <h5 className="text-xl font-medium text-gray-900 dark:text-white">
                      Give yourself a Username
                    </h5>
                    <form onSubmit={onSubmit}>
                      <label className="mb-2 block text-sm font-medium text-gray-400">
                        (min/max 6-12 characters)
                      </label>
                      <input
                        {...register('profileName', {
                          required: true,
                          minLength: 6,
                          maxLength: 12,
                        })}
                        type="text"
                        name="profileName"
                        className="block w-full rounded-lg border border-emerald-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-indigo-500 focus:ring-indigo-500"
                        placeholder="your user name"
                        maxLength={12}
                      />
                      {errors.profileName && (
                        <div className=" text-xs text-red-600 lg:text-sm">
                          Enter a valid name
                        </div>
                      )}
                      <button
                        type="submit"
                        className="mt-3 w-full rounded-lg bg-[#31d0aa] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-slate-800"
                      >
                        Create User Name
                      </button>
                    </form>
                  </div>
                </div>

                <div className="flex h-36 w-full items-center justify-center lg:h-full lg:w-1/3">
                  <div className="flex h-full w-full items-center justify-center rounded-t-lg object-cover p-12 md:rounded-none md:rounded-l-lg lg:p-12">
                    <Image
                      alt=""
                      src={Scripture.image.src}
                      width={Scripture.width}
                      height={Scripture.height}
                    />
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default StakedTokensModal
