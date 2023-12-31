     
import { BsCodeSlash } from 'react-icons/bs';
import { HiMiniArrowUpTray } from "react-icons/hi2";
import Editor from '@monaco-editor/react';
import { SetStateAction, useMemo, useState } from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { useTheme } from 'next-themes';
import { Button as But } from '@nextui-org/react';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';
import Header from '../Header';
import Hero from '../Hero';
import Steps from '../Steps';
import Footer from '../Footer';
import {Selection} from "@react-types/shared";




    export default function PasteArea() {
    const [selectedLanguage, setSelectedLanguage] = useState<Selection>(new Set(["Plain text"])); 
    const [code, setCode] = useState(''); 
    const navigate = useNavigate();
    const selectedValue = useMemo(
        () => Array.from(selectedLanguage)[0],
        [selectedLanguage]
    );

    const languages = [
        {
        name: 'plaintext',
        value: 'plaintext',
        },
        {
        name: 'javascript',
        value: 'javascript',
        },
        {
        name: 'typescript',
        value: 'typescript',
        },
        {
        name: 'rust',
        value: 'rust',
        },
        {
        name: 'python',
        value: 'python',
        },
        {
        name: 'java',
        value: 'java',
        },
        {
        name: 'c',
        value: 'c',
        },
        {
        name: 'cpp',
        value: 'cpp',
        },
        {
        name: 'csharp',
        value: 'csharp',
        },
    ];
    const onChange = (key: string, value: SetStateAction<string> | undefined = '') => {
        if (key === 'code') {
            if (typeof value === 'string') {
                setCode(value);
            } else if (typeof value === 'function') {
                // If it's a function, assume it's a state updater function
                setCode((prevCode) => value(prevCode));
            }
            // You can add additional handling for other cases if needed
        }
    };
    

    const { theme } = useTheme();
    const selectedLanguageArray = Array.from(selectedLanguage);
    const selectedLanguageName = selectedLanguageArray[0];
    const handleCreateSnippet = () => {
        const content = code;

        axios.post(`https://pasteit.onrender.com/submit`, {
            content,
            selected_language: selectedLanguageName,
          })
            .then(response => {
              const token = response.data.token;
              console.log('Snippet created:', response.data);
              navigate(`/snippet/${token}`);  
            })
            .catch(error => {
              console.error('Error creating snippet:', error);
            });
        console.log("Selected Language:", selectedLanguageName);
        console.log("Code:", code);
      };
      

    return (
        <div>
        <Header />      
        <Hero />
        <Steps />
        <div className="flex justify-center items-center">
        <form action="#" className="xl:w-1/2 mx-auto relative w-3/4">
            <div className="border border-gray-300 dark:border-zinc-600 shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 bg-white dark:bg-zinc-800 dark:text-gray-100">
            <Editor
                height="350px"
                language={String(selectedLanguageName)}
                theme={theme === 'dark' ? 'vs-dark' : 'light'}
                value={code}
                options={{
                // readOnly: !!snippet,
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
                onChange={(value) => onChange('code', value)}
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
                <Dropdown>
                <DropdownTrigger>
                    <But
                    variant="bordered"
                    className="capitalize"
                    >
                    <BsCodeSlash /> {selectedValue.toString()}
                    </But>
                </DropdownTrigger>
                <DropdownMenu
                    aria-label="Single selection example"
                    variant="flat"
                    disallowEmptySelection
                    selectionMode="single"
                    selectedKeys={selectedLanguage}
                    onSelectionChange={setSelectedLanguage}
                >
                    {languages.map((lang) => (
                    <DropdownItem key={lang.name} value={lang.value}>
                        {lang.name}
                    </DropdownItem>
                    ))}
                </DropdownMenu>
                </Dropdown>
            </div>

            <div className="flex items-center justify-end space-x-3 border-t border-gray-200 dark:border-zinc-600 px-2 py-2 sm:px-3">
                <div>
                <But onClick={handleCreateSnippet}>
                    <HiMiniArrowUpTray /> Create Snippet
                </But>
                </div>
            </div>
            </div>
        </form>
        </div>
        <Footer />
        </div>
    );
    }
