    /* eslint-disable @typescript-eslint/no-unused-vars */
    import { BsCodeSlash } from 'react-icons/bs';
    import { HiMiniArrowUpTray } from "react-icons/hi2";
    import Editor from '@monaco-editor/react';
    import { useMemo, useState } from 'react';
    import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@nextui-org/react";
    import { useTheme } from 'next-themes';
    import { Button as But } from '@nextui-org/react';

    export default function PasteArea() {
    const [selectedLanguage, setSelectedLanguage] = useState(new Set(["Plain text"])); 
    const [code, setCode] = useState(''); 

    const selectedValue = useMemo(
        () => selectedLanguage,
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

    const onChange = (key, value) => {
        if (key === 'code') {
        setCode(value); 
        }
    };

    const { theme } = useTheme();
    const selectedLanguageArray = Array.from(selectedLanguage);
    const selectedLanguageName = selectedLanguageArray[0];
    const handleCreateSnippet = () => {
        console.log("Selected Language:", selectedLanguageName);
        console.log("Code:", code);
      };

    return (
        <div className="gradient-border flex justify-center items-center">
        <form action="#" className="relative w-full">
            <div className="border border-gray-300 dark:border-zinc-600 shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 bg-white dark:bg-zinc-800 dark:text-gray-100">
            <Editor
                height="350px"
                language={selectedLanguageName} 
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
                    <BsCodeSlash /> {selectedValue}
                    </But>
                </DropdownTrigger>
                <DropdownMenu
                    aria-label="Single selection example"
                    variant="flat"
                    disallowEmptySelection
                    selectionMode="single"
                    selectedKeys={selectedLanguage}
                    onSelectionChange={(value) => setSelectedLanguage(value)}
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
    );
    }
