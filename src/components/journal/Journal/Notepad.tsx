import { useEffect, useState } from 'react';
import rehypeSanitize from 'rehype-sanitize';

import { TextEditor } from '@/components/ui';
import useLocalStorage from '@/hooks/useLocalStorage';
import { LOCAL_STORAGE_SAVE_MS } from '@/config/constants';

type Props = {
  id: string | number;
  initialText?: string;
};

const Notepad: React.FC<Props> = ({ id, initialText = '' }) => {
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

  return (
    <TextEditor
      value={value}
      onChange={setValue}
      preview="edit"
      height={372}
      previewOptions={{
        rehypePlugins: [[rehypeSanitize]],
      }}
    />
  );
};

export default Notepad;
