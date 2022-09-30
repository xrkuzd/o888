const Footer = () =>
{
  return (
    <div className="bottom-0 -mt-2 flex w-full select-none justify-between lg:pt-4">
      <div className="flex h-full w-full flex-col space-y-2 border-t border-white/10 py-4 text-slate-300 md:flex-row md:border-stone-200/10 md:text-slate-800 lg:space-y-0">
        <div className="flex w-full justify-center tracking-wide text-slate-300 md:justify-start md:text-sm lg:ml-12 lg:space-x-4">
          <a

            rel="noreferrer"
            href="#"
            className="px-2 font-light hover:text-[#31d0aa]"
          >
            Twitter
          </a>
          <a

            rel="noreferrer"
            href="#"
            className="px-2 font-light hover:text-[#31d0aa]"
          >
            Telegram
          </a>
          <a

            rel="noreferrer"
            href="#"
            className="px-2 font-light hover:text-[#31d0aa]"
          >
            Chart
          </a>
        </div>
        <div className="mr-12 flex w-full justify-center space-x-4 tracking-wide text-slate-300 lg:justify-end lg:text-white/90">
          <div className="flex w-full items-center tracking-wide text-slate-300 ">
            <div className="flex w-full items-center justify-center space-y-1 space-x-12 text-xs font-extralight md:justify-end lg:space-y-0 lg:text-[12px]">
              <span className="font-light lg:text-center">
                © Osiris Token ERC 2022{' '}
                <span className="ml-4"> All rights reserved</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
