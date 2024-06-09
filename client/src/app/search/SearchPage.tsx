"use client";

import React, { useState, useEffect } from "react";
import { useSearchQuery } from "@/state/api";
import Header from "@/app/(components)/Header";
import TaskCard from "@/app/(components)/TaskCard";
import ProjectCard from "@/app/(components)/ProjectCard";
import UserCard from "@/app/(components)/UserCard";
import { debounce } from "lodash";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const {
    data: searchResults,
    isLoading,
    isError,
  } = useSearchQuery(searchTerm, {
    skip: searchTerm.length < 3,
  });

  const handleSearch = debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    },
    500
  );

  useEffect(() => {
    return handleSearch.cancel;
  }, [handleSearch.cancel]);

  return (
    <div>
      <Header name="Search" />
      <div className="p-5">
        <input
          type="text"
          placeholder="Search..."
          className="w-1/2 p-3 border rounded shadow"
          onChange={handleSearch}
        />
      </div>
      <div className="p-5">
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error occurred while fetching search results.</p>}
        {!isLoading && !isError && searchResults && (
          <div>
            {searchResults.tasks?.length && <h2>Tasks</h2>}
            {searchResults.tasks?.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
            {searchResults.projects?.length && <h2>Projects</h2>}
            {searchResults.projects?.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
            {searchResults.users?.length && <h2>Users</h2>}
            {searchResults.users?.map((user) => (
              <UserCard key={user.userId} user={user} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
