'use client';

import { Menu, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';
import { User } from 'react-iconly';

import Logout from '../auth/LogoutUser';
import LogoutUser from '../auth/LogoutUser/LogoutUser';

const Dropdown = () => (
  <div>
    <Menu as="div" className="">
      <div>
        <Menu.Button className="inline-flex justify-center px-4 py-2 text-sm font-medium">
          <User
            className="  border w-8 h-8 border-primary text-primary p-1 rounded-[8rem] hover:text-secondary hover:border-secondary"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="p-3 bg-white border rounded-md border-black">
          <div className="px-1 py-1">
            <Menu.Item disabled>
              {({ active }) => (
                <button className="opacity-75">Profile (coming soon!)</button>
              )}
            </Menu.Item>
          </div>
          <div className="px-1 py-1">
            <Menu.Item disabled>
              {({ active }) => (
                <button className="opacity-75">
                  I lost my keys (coming soon!)
                </button>
              )}
            </Menu.Item>
          </div>

          <div className=" py-1">
            <Menu.Item>{() => <LogoutUser />}</Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  </div>

  /*<Menu>
    <Menu.Button>
      <User />
    </Menu.Button>
    <Menu.Items>
      <Menu.Item>
        <span className="opacity-75">Profile (coming soon!)</span>
      </Menu.Item>

      <Menu.Item disabled>
        <span className="opacity-75">I lost my key (coming soon!)</span>
      </Menu.Item>
      <Menu.Item>
        {({ active }) => (
          <button type="submit" className={`${active && 'bg-blue-500'}`}>
            <LogoutUser />
          </button>
        )}
      </Menu.Item>
    </Menu.Items>
  </Menu>*/
);

export default Dropdown;
