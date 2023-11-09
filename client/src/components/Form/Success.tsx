import Editor from '@monaco-editor/react';
import { useTheme } from 'next-themes';
import { Button as But } from '@nextui-org/react';
import {BiLinkAlt, BiSolidCopy} from 'react-icons/bi';
import Header from '../Header';
import Footer from '../Footer';
import 'react-simple-toasts/dist/theme/ocean-wave.css';
import { AiOutlineGithub } from 'react-icons/ai';
import { BsShareFill } from 'react-icons/bs';
import toast, { toastConfig } from 'react-simple-toasts';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';

function Success() {
  const { theme } = useTheme();
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('');
  toastConfig({
  theme: 'ocean-wave',
});
const { token } = useParams();
console.log(token)

useEffect(() => {
    const fetchSnippet = async () => {
      const response = await axios.get(`http://localhost:8081/paste/${token}`);
      setCode(response.data.content); 
      setLanguage(response.data.selected_language);
    }
    fetchSnippet();
  }, [token])


  const  handleShare = async () => {
    if (navigator.share) {
        try {
            await navigator.share({
                title: 'Snippet from my app',
                text: 'Here is a cool snippet I found...',
                url: window.location.href,
            });
        } catch (err) {
            console.error('There was an error sharing:', err);
        }
    } else {
        console.log('Web Share API is not supported in your browser.');
    }
  }  

  const handleCopyLink = () => {
    toast('Link copied to clipboard')
    navigator.clipboard.writeText(window.location.href);
  }

  const handleCopyCode = () => {
    toast('Code copied to clipboard')
    navigator.clipboard.writeText(code);
  }




  return <div>  
    <Header />
    <h1 className='selection:bg-blue-400 text-3xl font-bold tracking-tighter sm:text-3xl xl:text-7xl  space-y-4 text-center'>Share your <span className='text-gradient selection:bg-lime-300 selection:text-black'>Snippets</span> </h1>
    <div className="flex justify-center items-center mb-12 xl:mb-16  mt-5 xl:mt-10">
    <a href='https://github.com/codescalper/pasteit-rust' target='blank'>
        <But className='dark:bg-red-700 bg-purple-950 font-bold text-white text-center'>
        Star on Github <AiOutlineGithub size={20}/>
        </But>
    </a>
    </div>

 <div className="flex justify-center items-center">
        
        <div className="xl:w-1/2 mx-auto relative w-3/4">
            <div className="border border-gray-300 dark:border-zinc-600 shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 bg-white dark:bg-zinc-800 dark:text-gray-100">
            <Editor
                height="350px"
                language={language} 
                theme={theme === 'dark' ? 'vs-dark' : 'light'}
                value={code}
                options={{
                readOnly: true,
                minimap: {
                    enabled: false,
                },
                contextmenu: false,
                suggest: {
                },
                inlineSuggest: {
                    enabled: false,
                },
                quickSuggestions: false,
                }}
              
            />

            <div aria-hidden="true">
                <div className="py-2">
                <div className="h-9" />
                </div>
                <div className="h-px" />
                <div className="py-2">
                <div className="py-px">
                    <div className="h-9" />
                </div>
                </div>
            </div>
            </div>

            <div className="absolute inset-x-px bottom-0">
            <div className="flex flex-nowrap justify-end space-x-2 px-2 py-2 sm:px-3 border-t border-gray-200 dark:border-zinc-600">
             <But onClick={handleCopyCode}>
               <BiSolidCopy /> Copy Code
             </But>
            </div>

            <div className="flex items-center justify-end space-x-3 border-t border-gray-200 dark:border-zinc-600 px-2 py-2 sm:px-3">
                <div className='space-x-4'>
                <But  >
                    <BsShareFill onClick={handleShare} /> Share snippet 
                </But>
                <But onClick={handleCopyLink} >
                    <BiLinkAlt /> Copy Link 
                </But>
                </div>
            </div>
            </div>
            </div>
       
        </div>
       
    <Footer/>

        </div>

}

export default Success;
