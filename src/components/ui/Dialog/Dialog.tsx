'use client';

/* eslint-disable arrow-body-style */
/* eslint-disable react/jsx-props-no-spreading */
import { Fragment } from 'react';
import {
  Dialog as Modal,
  type DialogProps as ModalProps,
  Transition,
} from '@headlessui/react';
import { CloseSquare } from 'react-iconly';

export type DialogProps = ModalProps<'div'> & {
  /**
   * Content of the component
   */
  children?: React.ReactNode;
  /**
   * Title for the component's content
   */
  title: string;
  /**
   * Description for the component's content
   */
  description?: string;
  /**
   * Display button to unrender component
   * @default true
   */
  showClose?: boolean;
  /**
   * Action buttons for component
   */
  actions?: React.ElementType[];
};

export const Dialog: React.FC<DialogProps> = ({
  children,
  title,
  description,
  actions,
  open,
  showClose = true,
  onClose,
  ...props
}) => {
  return (
    <Transition show={open} as={Fragment}>
      <Modal className="relative z-50" onClose={onClose} {...props}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 backdrop-blur-sm" aria-hidden="true" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-center justify-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <Modal.Panel className="relative flex flex-col w-full max-w-md max-h-[80vh] p-6 bg-white border-2 rounded-lg gap-y-8 border-primary md:max-w-lg lg:max-w-xl">
              {showClose && (
                <div className="absolute top-8 right-6">
                  <button type="button" onClick={() => onClose(false)}>
                    <CloseSquare />
                  </button>
                </div>
              )}
              <div className="flex flex-col">
                <Modal.Title className="text-2xl leading-loose tracking-normal">
                  {title}
                </Modal.Title>
                {description && (
                  <Modal.Description className="mt-3 text-base leading-normal tracking-normal max-w-[30ch]">
                    {description}
                  </Modal.Description>
                )}
              </div>
              {children && <div className="overflow-y-auto">{children}</div>}
              {actions && (
                <div className="flex justify-end mt-6 gap-x-4">
                  {actions.map((Component, idx) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <Component key={idx} />
                  ))}
                </div>
              )}
            </Modal.Panel>
          </Transition.Child>
        </div>
      </Modal>
    </Transition>
  );
};

if (process.env.NODE_ENV !== 'production') {
  Dialog.displayName = 'Dialog';
}
