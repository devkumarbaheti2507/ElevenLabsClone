function Ribbon() {
    return (
        <>
            <div className="flex justify-between mt-5 mx-10">
                <div className="">
                    <h2 className="font-bold font-['Montserrat'] text-3xl">11ElevenLabs</h2>
                </div>
                <div className="flex gap-4">
                    <p className="rounded-xl hover:bg-gray-100 px-2 flex items-center justify-center h-10">Creative Platform</p>
                    <p className="rounded-xl hover:bg-gray-100 px-2 flex items-center justify-center h-10">Agents Platform</p>
                    <p className="rounded-xl hover:bg-gray-100 px-2 flex items-center justify-center h-10">Developers</p>
                    <p className="rounded-xl hover:bg-gray-100 px-2 flex items-center justify-center h-10">Resources</p>
                    <p className="rounded-xl hover:bg-gray-100 px-2 flex items-center justify-center h-10">Enterprise</p>
                    <p className="rounded-xl hover:bg-gray-100 px-2 flex items-center justify-center h-10">Pricing</p>
                </div>
                <div className="flex gap-2">
                    <button className="px-3 rounded-full flex items-center justify-center text-black py-1 hover:bg-gray-100">Login</button>
                    <button className="px-3 bg-black rounded-full flex items-center justify-center text-white">Sign up</button>
                </div>
            </div>
        </>
    )
}

export default Ribbon