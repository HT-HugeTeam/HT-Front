'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { toast } from 'sonner';

export function CopyButton({ text }: { text: string }) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = (): void => {
    void navigator.clipboard.writeText(text);
    void setIsCopied(true);
    toast.success('복사되었습니다.');
    setTimeout(() => {
      void setIsCopied(false);
    }, 1000);
  };

  return (
    <button
      className='flex items-center cursor-pointer text-gray500'
      onClick={handleCopy}
    >
      {isCopied ? (
        <Check className='w-4 h-4 ml-1' />
      ) : (
        <Copy className='w-4 h-4 ml-1' />
      )}
    </button>
  );
}
