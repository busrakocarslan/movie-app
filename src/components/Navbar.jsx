import React from "react";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Link, useNavigate } from "react-router-dom";
import Switch from "./Switch";
import avatar from "../assets/icons/avatar.png";
import { useAuthContext } from "../context/AuthProvider";

function classNames(...classes) {
  // clasları birleştirmek için kullanılan bir fonksiyon
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const { currentUser, logOut } = useAuthContext(); // currentuser i authrprovider da oluşturduğumuz costom hooktan dinamik olarak alıyoruz. Obje döndüğünden süslü içinde alıyoruz.
  // const currentUser = { displayName: "felix franko" };
  // const currentUser = false;
  
  return (
    <React.Fragment>
      <Disclosure
        as="nav"
        className="bg-purple-100 dark:bg-purple-900 py-3 dark:text-white fixed right-0 h-full w-[150px] top-0 z-20 overflow-y font-fontjac" // overflow-y içerik çoksa kaydırma çubuğu için
      >
        <div className="mx-auto px-2 sm:px-6 lg:px-8 p-10">
          <div className="relative flex flex-col-reverse gap-10 items-center justify-between">
            {currentUser && (
              <Link to="/favorites" className="mt-5 text-red-500 font-semibold">
                {" "}
                FAVORİTES
              </Link>
            )}

            <Link className="text-2xl m-auto" to="/">
              React
              <br /> Movie
              <br /> App
            </Link>

            <div className="absolute inset-y-0 right-0 flex flex-col-reverse gap-5 h-[20vh] justify-evenly items-baseline pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {currentUser && (
                <h5 className="mr-2 capitalize">{currentUser?.displayName} </h5> //firebase'den gelecek bu kısım
              )}
              <Switch />
              {/* Profile dropdown */}
              <Menu as="div" className="relative ml-3">
                <div>
                  <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full"
                      src={currentUser?.photoURL || avatar}
                      alt="user"
                      referrerPolicy="no-referrer" //googledan güvenlik sebebiyle img görünmemesi durumunu engelliyoruz.
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
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {!currentUser && ( // menudeki bilgiler currentuser a göre gösterilecek */}
                      <>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/register"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Register
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/login"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Login
                            </Link>
                          )}
                        </Menu.Item>
                      </>
                    )}
                    {currentUser && (
                      <Menu.Item>
                        {({ active }) => (
                          <span
                            role="button"
                            onClick={() => logOut()}
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                            )}
                          >
                            Sign out
                          </span>
                        )}
                      </Menu.Item>
                    )}
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>
      </Disclosure>
      <div className="w-[60px]"></div>
    </React.Fragment> // fixedin sıkıntısını kaldırmssk için navbar kadar boş bir div kurduk
  );
}
