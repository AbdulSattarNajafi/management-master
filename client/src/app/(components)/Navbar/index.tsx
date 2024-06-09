import { Search, Settings, Menu, Sun, Moon, ChevronDown } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { signOut } from "aws-amplify/auth";
import { setIsSidebarCollapsed, setIsDarkMode } from "@/state";
import Link from "next/link";
import Image from "next/image";
import { useGetAuthUserQuery } from "@/state/api";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const { data: currentUser } = useGetAuthUserQuery({});

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  if (!currentUser) return null;
  const currentUserDetails = currentUser?.userDetails;

  return (
    <div className="flex items-center justify-between bg-white px-4 py-3 shadow-md dark:bg-black">
      {/* Search Bar */}
      <div className="flex items-center gap-3">
        {!isSidebarCollapsed ? null : (
          <button
            className="text-2xl"
            onClick={() => dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))}
          >
            <Menu className="dark:text-neutral-200" size={24} />
          </button>
        )}

        <Search className="h-5 w-5 text-gray-500 dark:text-neutral-500" />
        <input
          className="rounded border border-gray-300 bg-gray-100 p-2 focus:outline-none dark:border-dark-secondary dark:bg-dark-secondary dark:text-white"
          type="search"
          placeholder="Search..."
        />
      </div>

      {/* Icons */}
      <div className="flex items-center">
        <button
          onClick={() => dispatch(setIsDarkMode(!isDarkMode))}
          className="hidden sm:inline-block"
        >
          {isDarkMode ? (
            <Sun className="h-6 w-6 cursor-pointer text-neutral-500" />
          ) : (
            <Moon className="h-6 w-6 cursor-pointer text-gray-500" />
          )}
        </button>

        <Link href="/settings" className="hidden sm:inline-block">
          <Settings className="mx-3 h-6 w-6 cursor-pointer text-gray-500 dark:text-neutral-500" />
        </Link>
        <div className="ml-2 mr-5 hidden min-h-[2em] w-[0.1rem] bg-gray-200 sm:inline-block"></div>
        <div className="group relative flex items-center justify-between">
          <div className="h-9 w-9">
            <Image
              src={`/${currentUserDetails?.profilePictureUrl}`}
              alt={currentUserDetails?.username || "User Profile Picture"}
              width={100}
              height={50}
              className="h-full rounded-full object-cover"
            />
          </div>
          <span className="mx-3 text-gray-800 dark:text-white">
            {currentUserDetails?.username}
          </span>

          <span className="inline-block text-gray-800 dark:text-white sm:hidden">
            <ChevronDown size={20} />
          </span>

          <div className="absolute right-0 top-full z-10 hidden w-full py-3 group-hover:block">
            <div className="rounded bg-white px-2 py-3 shadow dark:bg-black">
              <div className="mb-3 flex items-center gap-2">
                <button onClick={() => dispatch(setIsDarkMode(!isDarkMode))}>
                  {isDarkMode ? (
                    <Sun className="h-6 w-6 cursor-pointer text-neutral-500" />
                  ) : (
                    <Moon className="h-6 w-6 cursor-pointer text-gray-500" />
                  )}
                </button>

                <Link
                  href="/settings"
                  className="flex items-center text-gray-500 dark:text-neutral-500"
                >
                  <Settings className="mx-3 h-6 w-6 cursor-pointer text-gray-500 dark:text-neutral-500" />
                  <span>Settings</span>
                </Link>
              </div>
              <button
                className="block w-full rounded bg-blue-primary px-4 py-2 text-xs font-bold text-white hover:bg-blue-600"
                onClick={handleSignOut}
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
        <button
          className="ms-5 hidden rounded bg-blue-primary px-4 py-2 text-xs font-bold text-white hover:bg-blue-600 sm:inline-block"
          onClick={handleSignOut}
        >
          Sign out
        </button>
      </div>
    </div>
  );
};

export default Navbar;
