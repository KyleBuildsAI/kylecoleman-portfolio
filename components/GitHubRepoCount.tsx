"use client";

import { useEffect, useState } from "react";

export function GitHubRepoCount({ username }: { username: string }) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}`)
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.public_repos === "number") {
          setCount(data.public_repos);
        }
      })
      .catch(() => {
        // silently fail — count just won't display
      });
  }, [username]);

  if (count === null) return null;

  return (
    <p className="text-sm text-zinc-500">
      {count} {count === 1 ? "repository" : "repositories"}
    </p>
  );
}
