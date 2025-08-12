'use client';

import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface AgreementItemProps {
  title: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  required?: boolean;
  hasDetail?: boolean;
  isHeader?: boolean;
}

export function AgreementItem({
  title,
  description,
  checked,
  onChange,
  required = false,
  hasDetail = false,
  isHeader = false
}: AgreementItemProps) {
  const handleDetailClick = () => {
    // TODO: 약관 상세 페이지 모달 열기
    console.log(`${title} 상세 내용 보기`);
  };

  return (
    <div className={cn(
      "flex items-start space-x-4 p-4 rounded-xl transition-colors",
      isHeader ? "bg-transparent" : "hover:bg-gray-50"
    )}>
      {/* 체크박스 */}
      <button
        onClick={() => onChange(!checked)}
        className={cn(
          "flex-shrink-0 w-6 h-6 rounded-full border-2 transition-all duration-200",
          "flex items-center justify-center",
          checked
            ? "bg-orange-500 border-orange-500"
            : "bg-white border-gray-300 hover:border-orange-300"
        )}
      >
        {checked && (
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        )}
      </button>

      {/* 텍스트 영역 */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2">
          <h4 className={cn(
            "font-medium text-gray-900",
            isHeader ? "text-lg" : "text-base"
          )}>
            {title}
          </h4>
          {required && (
            <span className="text-red-500 text-sm font-medium">*</span>
          )}
        </div>
        
        {description && (
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        )}
      </div>

      {/* 상세보기 버튼 */}
      {hasDetail && !isHeader && (
        <button
          onClick={handleDetailClick}
          className="flex-shrink-0 p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </button>
      )}
    </div>
  );
}