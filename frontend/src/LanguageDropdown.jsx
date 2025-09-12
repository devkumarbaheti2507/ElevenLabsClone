import { useState, useEffect, useRef } from "react";

function LanguageDropdown({ selectedLanguage, setSelectedLanguage }) {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    const languageOptions = [
        { name: "English", flag: "https://flagcdn.com/us.svg" },
        { name: "Italian", flag: "https://flagcdn.com/it.svg" },
    ];

    const selected = languageOptions.find(l => l.name === selectedLanguage) || languageOptions[0];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative w-40" ref={dropdownRef}>
            <button
                onClick={() => setOpen(!open)}
                className="border border-gray-300 rounded-full px-3 py-2 bg-white text-gray-700 flex justify-between items-center w-full hover:border-black"
            >
                <div className="flex items-center gap-2">
                    <img src={selected.flag} alt={selected.name} className="w-5 h-5 rounded-full object-cover" />
                    {selected.name}
                </div>
                <span className="ml-2">▼</span>
            </button>
            {open && (
                <ul className="absolute left-0 mt-1 w-full bg-white border border-gray-300 rounded-xl shadow-lg overflow-hidden z-10">
                    {languageOptions.map((opt) => (
                        <li
                            key={opt.name}
                            onClick={() => {
                                setSelectedLanguage(opt.name);
                                setOpen(false);
                            }}
                            className="px-3 py-2 cursor-pointer hover:bg-gray-200 flex items-center gap-2"
                        >
                            <img src={opt.flag} alt={opt.name} className="w-5 h-5 rounded-full object-cover" />
                            {opt.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default LanguageDropdown;