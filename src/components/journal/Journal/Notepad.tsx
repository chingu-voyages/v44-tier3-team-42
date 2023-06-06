import { useEffect, useState } from 'react';
import rehypeSanitize from 'rehype-sanitize';

import { Button, TextEditor } from '@/components/ui';
import useLocalStorage from '@/hooks/useLocalStorage';
import { LOCAL_STORAGE_SAVE_MS } from '@/config/constants';

type Props = {
  id: string | number;
  initialText?: string;
  onSave?: (text: string) => void;
};

const Notepad: React.FC<Props> = ({ id, initialText = '', onSave }) => {
  const [mdText, setMdText] = useLocalStorage(
    `app:notepad-md-${id}`,
    initialText,
  );
  const [value, setValue] = useState<string | undefined>(mdText);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setMdText(value);
    }, LOCAL_STORAGE_SAVE_MS);

    return () => {
      clearTimeout(timeout);
    };
  }, [value, setMdText]);

  const saveTextHandler = () => {
    if (typeof value === 'undefined' || value.trim() === '') {
      return;
    }

    (onSave as Function)(mdText);
  };

  return (
    <div className="min-h-[28rem]">
      <TextEditor
        value={value}
        onChange={setValue}
        preview="edit"
        height={372}
        previewOptions={{
          rehypePlugins: [[rehypeSanitize]],
        }}
      />
      {typeof onSave === 'function' && (
        <Button className="block mx-auto mt-3" onClick={saveTextHandler}>
          Save
        </Button>
      )}
    </div>
  );
};

export default Notepad;
