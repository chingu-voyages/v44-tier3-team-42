'use client';

/* eslint-disable react/jsx-props-no-spreading */
import dynamic from 'next/dynamic';
import type { MDEditorProps, ICommand } from '@uiw/react-md-editor';

import commands from './commands';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

const filterToolbarCommands = (cmd: ICommand) => {
  if (cmd.name && /(live|edit|preview|fullscreen)/.test(cmd.name)) {
    // Filter out some commands
    return false;
  }

  return cmd;
};

export type TextEditorProps = MDEditorProps;

export const TextEditor: React.FC<TextEditorProps> = ({ ...props }) => (
  <MDEditor
    commands={commands}
    commandsFilter={filterToolbarCommands}
    highlightEnable={false}
    visibleDragbar={false}
    {...props}
  />
);

if (process.env.NODE_ENV !== 'production') {
  TextEditor.displayName = 'TextEditor';
}
