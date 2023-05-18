'use client';

import { useState, useEffect } from 'react';

import { TextEditor } from '@/components/ui';
import { useLocalStorage } from '@/hooks';
import { LOCAL_STORAGE_SAVE_MS } from '@/config/constants';

const Notepad: React.FC = () => {
  const [mdText, setMdText] = useLocalStorage('app:demo-md', '');
  const [value, setValue] = useState<string | undefined>(mdText);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setMdText(value);
    }, LOCAL_STORAGE_SAVE_MS);

    return () => {
      clearTimeout(timeout);
    };
  }, [value, setMdText]);

  return (
    <div className="w-10/12 max-w-md mx-auto md:max-w-lg lg:w-6/12 lg:max-w-2xl min-h-[372px]">
      <TextEditor
        value={value}
        onChange={setValue}
        preview="edit"
        height={372}
      />
    </div>
  );
};

export default Notepad;
