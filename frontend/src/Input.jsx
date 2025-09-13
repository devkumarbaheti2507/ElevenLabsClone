import { useState, useEffect, useRef } from "react";
import DownloadIcon from "./assets/download.svg";
import LanguageDropdown from "./LanguageDropdown";

function Input() { 
    const [textValue, setTextValue] = useState("In the ancient land of Eldoria, where skies shimmered and forests, whispered secrets to the wind, lived a dragon named Zephyros. [sarcastically] Not the “burn it all down” kind... [giggles] but he was gentle, wise, with eyes like old stars. [whispers] Even the birds fell silent when he passed.")

    const [audioUrls, setAudioUrls] = useState({});
    const [selectedLanguage, setSelectedLanguage] = useState("English");

    const editorRef = useRef(null);
    const audioRef = useRef(null);

    useEffect(() => {
        fetch("https://eleven-labs-clone-backend.vercel.app/api/audio")
        .then((res) => res.json())
        .then((data) => {
                const urls = data.audio.reduce((acc, item) => {
                    acc[item.language] = item.url;
                    return acc;
                }, {});
            setAudioUrls(urls);
        })
        .catch((err) => console.error(err));
    }, []);

    const playAudio = () => {
        if (!audioUrls[selectedLanguage])
            return;
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
        audioRef.current = new Audio(audioUrls[selectedLanguage]);
        audioRef.current.play();
    };

    const downloadAudio = () => {
        if (!audioUrls[selectedLanguage])
            return;
        const link = document.createElement("a");
        link.href = audioUrls[selectedLanguage];
        link.download = `${selectedLanguage}.mp3`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const getCaretOffset = () => {
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0)
            return 0;
        const range = selection.getRangeAt(0);
        const preRange = range.cloneRange();
        preRange.selectNodeContents(editorRef.current);
        preRange.setEnd(range.endContainer, range.endOffset);
        return preRange.toString().length;
    };

    const setCaretOffset = (offset) => {
        if (!editorRef.current)
            return;
        const selection = window.getSelection();
        const range = document.createRange();
        let currentOffset = 0;
        let found = false;
        const traverse = (node) => {
        if (found)
            return;
        if (node.nodeType === Node.TEXT_NODE) {
            const nextOffset = currentOffset + node.textContent.length;
            if (offset <= nextOffset) {
                range.setStart(node, offset - currentOffset);
                range.setEnd(node, offset - currentOffset);
                found = true;
            }
            currentOffset = nextOffset;
        } else {
            node.childNodes.forEach(traverse);
        }
        };
        traverse(editorRef.current);
        if (!found)
            return;
        selection.removeAllRanges();
        selection.addRange(range);
    };

    const applyHighlight = () => {
        if (!editorRef.current)
            return;
        const caretOffset = getCaretOffset();
        const text = textValue.replace(/\[.*?\]/g, (match) => `<span class="text-pink-500">${match}</span>`);
        editorRef.current.innerHTML = text;
        setCaretOffset(caretOffset);
    };

    useEffect(() => {
        applyHighlight();
    }, [textValue]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
    }, [selectedLanguage]);
    
    return ( 
        <>
            <div className="bg-gray-300 w-[70%] mx-auto p-1 rounded-xl mt-20 mb-5">
                <div className="bg-white w-full rounded-xl p-4">
                    <div
                        ref={editorRef}
                        className="text-xl w-full min-h-[200px] p-2 outline-none"
                        contentEditable
                        suppressContentEditableWarning
                        onInput={(e) => setTextValue(e.currentTarget.innerText)}
                    />
                    <div className="my-5">
                        <div className="flex flex-wrap gap-1 text-lg">
                            <button className="py-1 px-2 whitespace-nowrap rounded-lg border border-gray-500 hover:bg-gray-200">Samara | Narrate a story</button>
                            <button className="py-1 px-2 whitespace-nowrap rounded-lg border border-gray-500 hover:bg-gray-200">2 speakers | Create a dialogue</button>
                            <button className="py-1 px-2 whitespace-nowrap rounded-lg border border-gray-500 hover:bg-gray-200">Announcer | Voiceover a game</button>
                            <button className="py-1 px-2 whitespace-nowrap rounded-lg border border-gray-500 hover:bg-gray-200">Spuds | Recount an old story</button>
                            <button className="py-1 px-2 whitespace-nowrap rounded-lg border border-gray-500 hover:bg-gray-200">Jessica | Provide customer support</button>
                        </div> 
                        <hr className="my-4"/>
                        <div className="flex justify-between mx-1">
                            <LanguageDropdown
                                selectedLanguage={selectedLanguage}
                                setSelectedLanguage={setSelectedLanguage}
                            />
                            <div className="flex gap-1">
                                <button className="bg-black rounded-full py-1 px-5 text-white" onClick={playAudio}>▶︎ Play</button>
                                <button className="bg-gray-200 rounded-full p-2 w-10 h-10" onClick={downloadAudio}>
                                    <img src={DownloadIcon} alt="Download" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div> 
                <div className="flex items-center justify-center p-3">
                    <h3 className="text-black font-medium">Powered by Eleven v3 (alpha)</h3>
                </div>
            </div>
            <div className="flex gap-4 justify-center items-center mb-20 p-2">
                <h3>EXPERIENCE THE FULL AUDIO AI PLATFORM</h3>
                <button className="bg-black rounded-full py-1 px-5 text-white">SIGN UP</button>
            </div>
        </>
    )
}

export default Input