'use client';

import { parseAsBoolean, useQueryState } from 'nuqs';

export function useMakeVideoQuery() {
  const [makeVideoInput, setMakeVideoInput] = useQueryState(
    'makeVideoInput',
    parseAsBoolean.withDefault(false),
  );
  const [fileUpload, setFileUpload] = useQueryState(
    'fileUpload',
    parseAsBoolean.withDefault(false),
  );

  return {
    makeVideoInput,
    setMakeVideoInput,
    fileUpload,
    setFileUpload,
  };
}
