"use client";

import { useCallback, useEffect, useState } from "react";

const useBack = () => {
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    // Check if we're on the client and if there's history
    if (typeof window !== "undefined") {
      setCanGoBack(window.history.length > 1);
    }
  }, []);

  const back = useCallback(() => {
    if (canGoBack) {
      window.history.back();
    }
  }, [canGoBack]);

  debugger;

  return { canGoBack, back };
};

export default useBack;
