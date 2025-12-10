import React from 'react';

const Chat = () => {
    return (
        <div className="w-full pt-[2rem] rounded-lg bg-white shadow-lg">
            <div className="relative flex w-full items-center justify-between px-3 py-2">
                <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                    </svg>
                    <div className="font-semibold">Client Chat</div>
                </div>
                <button className="group peer cursor-pointer rounded-full p-2 hover:bg-gray-100 focus:bg-gray-200">
                    <svg className="size-5 transition-all group-hover:rotate-90 group-focus:rotate-90" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" strokeLinejoin="round" strokeLinecap="round" />
                        <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" strokeLinejoin="round" strokeLinecap="round" />
                    </svg>
                </button>
                <div className="invisible absolute right-3 bottom-2 translate-y-full rounded-lg bg-gray-800 p-2 text-white opacity-0 transition-all peer-focus:visible peer-focus:opacity-100">
                    <div className="text-xs">Version 7.11.2014</div>
                </div>
            </div>
            <div className>
                <ul className="border-t border-gray-200 p-3 pb-6">
                    <li className="flex flex-col items-end">
                        <div className="text-right text-xs">8:34 AM</div>
                        <div className="w-40 rounded-lg bg-[#ff8211]/90 px-2 py-1 text-right text-sm text-white">
                            Hey Mr mahmoud gado
                        </div>
                    </li>
                    <li className="flex flex-col items-start">
                        <div className="text-right text-xs">8:35 AM</div>
                        <div className="w-fit rounded-lg bg-gray-100 px-2 py-1 text-sm">
                            How are you?
                        </div>
                    </li>
                    <li className="flex flex-col items-end">
                        <div className="text-right text-xs">8:40 AM</div>
                        <div className="w-fit rounded-lg bg-[#ff8211]/90 px-2 py-1 text-right text-sm text-white">
                            Fine
                        </div>
                    </li>
                    <li className="flex flex-col items-start">
                        <div className="flex w-fit items-center gap-1 rounded-lg bg-gray-100 px-2 py-2.5 text-sm">
                            <div className="size-2 rounded-full bg-gray-300" />
                            <div className="size-2 rounded-full bg-gray-400" />
                            <div className="size-2 rounded-full bg-gray-300" />
                        </div>
                    </li>
                </ul>
                <div className="relative">
                    <input type="text" placeholder="Reply" className="h-10 w-full rounded-b-lg border-t border-gray-200 bg-gray-100 pl-3 text-sm focus:outline-blue-600/50" />
                    <button className="absolute top-0 right-1 bottom-0 my-auto size-fit cursor-pointer rounded-full p-2 text-[#ff8211] hover:bg-gray-200 focus:bg-gray-200">
                        <svg className="size-4" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" strokeLinejoin="round" strokeLinecap="round" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Chat;