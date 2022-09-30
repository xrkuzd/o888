import Link from 'next/link'

const NavBar = () => {
  return (
    <div className="flex w-full items-center justify-center space-x-32 text-lg">
      <div className="flex w-full items-center justify-center space-x-32">
        <Link href="/create">
          <div className="group relative flex cursor-pointer overflow-hidden rounded border border-slate-500 from-[#bef1eb] to-[#36dbb5] px-4 shadow-md shadow-white/25 [transform:translateZ(0)] before:absolute before:bottom-0 before:left-0 before:h-full before:w-full before:origin-[100%_100%] before:scale-x-0 before:bg-gradient-to-tl before:transition before:duration-500 before:ease-in-out hover:before:origin-[0_0] hover:before:scale-x-100">
            <span className="relative z-0 border-slate-500 text-[14px] font-normal text-slate-300 transition duration-500 ease-in-out group-hover:text-slate-900">
              {' '}
              Create Rooms
            </span>
          </div>
        </Link>

        <Link href="/join">
          <div className="group relative flex cursor-pointer overflow-hidden rounded border border-slate-500 from-[#bef1eb] to-[#36dbb5] px-4 shadow-md shadow-white/25 [transform:translateZ(0)] before:absolute before:bottom-0 before:left-0 before:h-full before:w-full before:origin-[100%_100%] before:scale-x-0 before:bg-gradient-to-tl before:transition before:duration-500 before:ease-in-out hover:before:origin-[0_0] hover:before:scale-x-100">
            <span className="relative z-0 border-slate-500 text-[14px] font-normal text-slate-300 transition duration-500 ease-in-out group-hover:text-slate-900">
              {' '}
              Join Rooms
            </span>
          </div>
        </Link>

        <Link href="/active">
          <div className="group relative flex cursor-pointer overflow-hidden rounded border border-slate-500 from-[#bef1eb] to-[#36dbb5] px-4 shadow-md shadow-white/25 [transform:translateZ(0)] before:absolute before:bottom-0 before:left-0 before:h-full before:w-full before:origin-[100%_100%] before:scale-x-0 before:bg-gradient-to-tl before:transition before:duration-500 before:ease-in-out hover:before:origin-[0_0] hover:before:scale-x-100">
            <span className="relative z-0 border-slate-500 text-[14px] font-normal text-slate-300 transition duration-500 ease-in-out group-hover:text-slate-900">
              {' '}
              Active Rooms
            </span>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default NavBar
