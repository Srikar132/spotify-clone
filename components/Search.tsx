// Search.tsx - Spotify-style Search Component for Next.js

import React, { useState, useRef, useEffect } from 'react';
import { Search as SearchIcon, Command, Printer, X } from 'lucide-react';

interface SearchProps {
    placeholder?: string;
    onSearch?: (query: string) => void;
    onFocus?: () => void;
    onBlur?: () => void;
    className?: string;
    showShortcuts?: boolean;
    disabled?: boolean;
    value?: string;
    onChange?: (value: string) => void;
}

const Search: React.FC<SearchProps> = ({
                                           placeholder = "What do you want to play?",
                                           onSearch,
                                           onFocus,
                                           onBlur,
                                           className = "",
                                           showShortcuts = true,
                                           disabled = false,
                                           value: controlledValue,
                                           onChange
                                       }) => {
    const [internalValue, setInternalValue] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [showClearButton, setShowClearButton] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    // Determine if component is controlled or uncontrolled
    const isControlled = controlledValue !== undefined;
    const inputValue = isControlled ? controlledValue : internalValue;

    useEffect(() => {
        setShowClearButton(inputValue.length > 0);
    }, [inputValue]);

    // Handle keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Ctrl/Cmd + K to focus search
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                inputRef.current?.focus();
            }

            // Escape to clear and blur
            if (e.key === 'Escape' && isFocused) {
                handleClear();
                inputRef.current?.blur();
            }
        };

        if (showShortcuts) {
            document.addEventListener('keydown', handleKeyDown);
            return () => document.removeEventListener('keydown', handleKeyDown);
        }
    }, [isFocused, showShortcuts]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;

        if (isControlled) {
            onChange?.(newValue);
        } else {
            setInternalValue(newValue);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputValue.trim()) {
            onSearch?.(inputValue.trim());
        }
    };

    const handleFocus = () => {
        setIsFocused(true);
        onFocus?.();
    };

    const handleBlur = () => {
        setIsFocused(false);
        onBlur?.();
    };

    const handleClear = () => {
        if (isControlled) {
            onChange?.("");
        } else {
            setInternalValue("");
        }
        inputRef.current?.focus();
    };

    return (
        <div className={`relative group w-full max-w-lg ${className}`}>
            <form onSubmit={handleSubmit} className="relative">
                {/* Search Container */}
                <div
                    className={`
            relative flex items-center
            bg-zinc-800/90 backdrop-blur-sm
            border border-zinc-700/50
            rounded-full
            transition-all duration-300 ease-out
            ${isFocused
                        ? 'bg-zinc-700/90  shadow-lg shadow-black/20 '
                        : 'hover:bg-zinc-700/70 hover:border-zinc-600/50'
                    }
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-text'}
          `}
                    onClick={() => !disabled && inputRef.current?.focus()}
                >
                    {/* Search Icon */}
                    <div className="flex items-center justify-center w-10 h-12 text-gray-400">
                        <SearchIcon
                            size={18}
                            className={`transition-colors duration-200 ${
                                isFocused ? 'text-white' : 'text-gray-400'
                            }`}
                        />
                    </div>

                    {/* Input Field */}
                    <input
                        ref={inputRef}
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        placeholder={placeholder}
                        disabled={disabled}
                        className="
              flex-1 
              bg-transparent 
              border-none 
              outline-none 
              text-white 
              placeholder-gray-400 
              text-sm 
              font-medium
              py-3
              pr-2
              min-w-0
            "
                        autoComplete="off"
                        spellCheck="false"
                    />

                    {/* Clear Button */}
                    {showClearButton && !disabled && (
                        <button
                            type="button"
                            onClick={handleClear}
                            className="
                flex items-center justify-center
                w-8 h-8
                mr-1
                text-gray-400 
                hover:text-white
                hover:bg-gray-600/50
                rounded-full
                transition-all duration-200
                group
              "
                            aria-label="Clear search"
                        >
                            <X size={14} className="group-hover:scale-110 transition-transform duration-200" />
                        </button>
                    )}

                    {/* Keyboard Shortcuts */}
                    {showShortcuts  && !showClearButton && (
                        <div className="flex items-center space-x-1 mr-3">
                            {/* Ctrl/Cmd + K */}

                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-center space-x-1">
                                <kbd className="
                  inline-flex items-center justify-center
                  min-w-[20px] h-5
                  px-1.5
                  text-xs
                  text-gray-400
                  bg-zinc-700/50
                  border border-zinc-600/50
                  rounded
                  font-mono
                ">
                                    <Command size={10} className="md:hidden" />
                                    <span className="hidden md:inline">Ctrl</span>
                                </kbd>
                                <kbd className="
                  inline-flex items-center justify-center
                  min-w-[20px] h-5
                  px-1.5
                  text-xs
                  text-gray-400
                  bg-zinc-700/50
                  border border-zinc-600/50
                  rounded
                  font-mono
                ">
                                    K
                                </kbd>
                            </div>

                            {/* Divider */}
                            <div className="w-px h-4 bg-gray-600/50 mx-2" />

                            {/* Print shortcut (decorative) */}
                            <button
                                type="button"
                                className="
                  flex items-center justify-center
                  w-6 h-6
                  text-gray-500
                  hover:text-gray-400
                  transition-colors duration-200
                "
                                aria-label="Print"
                            >
                                <Printer size={20} />
                            </button>
                        </div>
                    )}
                </div>

                {/* Focus Ring */}
                {isFocused && (
                    <div className="
            absolute inset-0 
            rounded-full 
            ring-1 ring-white
            ring-offset-1 ring-offset-transparent
            pointer-events-none

          " />
                )}
            </form>

            {/* Search Results Dropdown Placeholder */}
            {isFocused && inputValue && (
                <div className="
          absolute top-full left-0 right-0
          mt-2
          bg-zinc-800/95 backdrop-blur-lg
          border border-zinc-700/50
          rounded-xl
          shadow-2xl shadow-black/40
          z-50
          overflow-hidden
        ">
                    {/* Quick suggestions could go here */}
                    <div className="p-4">
                        <div className="text-xs text-zinc-400 uppercase tracking-wider font-semibold mb-3">
                            Recent searches
                        </div>
                        <div className="space-y-2">
                            {/* Example search suggestions */}
                            {['Liked Songs', 'Discover Weekly', 'Rock Classics'].map((suggestion, index) => (
                                <button
                                    key={index}
                                    className="
                    flex items-center space-x-3
                    w-full p-2
                    text-left
                    text-zinc-300
                    hover:text-white
                    hover:bg-zinc-700/50
                    rounded-lg
                    transition-all duration-200
                    group
                  "
                                    onClick={() => {
                                        if (isControlled) {
                                            onChange?.(suggestion);
                                        } else {
                                            setInternalValue(suggestion);
                                        }
                                        onSearch?.(suggestion);
                                    }}
                                >
                                    <SearchIcon size={16} className="text-zinc-500 group-hover:text-zinc-400" />
                                    <span className="text-sm font-medium">{suggestion}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Search;

// Example usage:
/*
// Uncontrolled component
<Search 
  onSearch={(query) => console.log('Searching for:', query)}
  placeholder="Search for songs, artists..."
/>

// Controlled component
const [searchValue, setSearchValue] = useState("");

<Search 
  value={searchValue}
  onChange={setSearchValue}
  onSearch={(query) => handleSearch(query)}
  placeholder="What do you want to listen to?"
/>

// With custom styling
<Search 
  className="w-full max-w-lg"
  showShortcuts={false}
  onFocus={() => setShowSearchResults(true)}
  onBlur={() => setShowSearchResults(false)}
/>
*/