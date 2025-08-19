import type {
  FileInfo,
  FileType,
  ValidationResult,
  UploadConfig,
  IFileValidator,
} from './types';
import { v4 as uuidv4 } from 'uuid';

export class FileValidationService implements IFileValidator {
  private static instance: FileValidationService;

  // 싱글톤 패턴 - 검증 로직은 상태가 없으므로 인스턴스 하나로 충분
  public static getInstance(): FileValidationService {
    if (!FileValidationService.instance) {
      FileValidationService.instance = new FileValidationService();
    }
    return FileValidationService.instance;
  }

  private constructor() {
    // 싱글톤 패턴을 위한 빈 생성자
  }

  /**
   * 단일 파일 검증
   */
  validate(file: File, config: UploadConfig): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    const fileInfo = this.createFileInfo(file);

    // 1. 파일 타입 검증
    const typeValidation = this.validateFileType(file, config.allowedTypes);
    if (!typeValidation.isValid) {
      errors.push(...typeValidation.errors);
    }

    // 2. 파일 크기 검증
    const sizeValidation = this.validateFileSize(file, config.maxFileSize);
    if (!sizeValidation.isValid) {
      errors.push(...sizeValidation.errors);
    }

    // 3. 파일 이름 검증
    const nameValidation = this.validateFileName(file.name);
    if (!nameValidation.isValid) {
      errors.push(...nameValidation.errors);
    }
    warnings.push(...nameValidation.warnings);

    // 4. 보안 검증 (악성 파일 체크)
    const securityValidation = this.validateSecurity(file);
    if (!securityValidation.isValid) {
      errors.push(...securityValidation.errors);
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      fileInfo,
    };
  }

  /**
   * 다중 파일 검증
   */
  validateMultiple(files: File[], config: UploadConfig): ValidationResult[] {
    const results = files.map(file => this.validate(file, config));

    // 전체 파일 수 검증
    if (files.length > config.maxFiles) {
      const totalFilesError = `최대 ${config.maxFiles}개의 파일만 업로드할 수 있습니다. (현재: ${files.length}개)`;

      // 첫 번째 파일의 결과에 에러 추가
      if (results.length > 0 && results[0]) {
        results[0].errors.push(totalFilesError);
        results[0].isValid = false;
      }
    }

    // 중복 파일 검증
    const duplicateErrors = this.validateDuplicates(files);
    if (duplicateErrors.length > 0) {
      duplicateErrors.forEach((error, index) => {
        if (error && results[index]) {
          results[index].errors.push(error);
          results[index].isValid = false;
        }
      });
    }

    return results;
  }

  /**
   * FileInfo 객체 생성
   */
  private createFileInfo(file: File): FileInfo {
    return {
      file,
      id: uuidv4(),
      type: this.determineFileType(file),
      size: file.size,
      name: file.name,
      lastModified: file.lastModified,
    };
  }

  /**
   * 파일 타입 결정
   */
  private determineFileType(file: File): FileType {
    if (file.type.startsWith('image/')) return 'image';
    if (file.type.startsWith('video/')) return 'video';
    return 'document';
  }

  /**
   * 파일 타입 검증
   */
  private validateFileType(
    file: File,
    allowedTypes: FileType[],
  ): ValidationResult {
    const fileType = this.determineFileType(file);
    const isValid = allowedTypes.includes(fileType);

    return {
      isValid,
      errors: isValid
        ? []
        : [
            `${this.getFileTypeDisplayName(fileType)} 파일은 허용되지 않습니다.`,
          ],
      warnings: [],
      fileInfo: this.createFileInfo(file),
    };
  }

  /**
   * 파일 크기 검증
   */
  private validateFileSize(file: File, maxSize: number): ValidationResult {
    const isValid = file.size <= maxSize;
    const sizeMB = Math.round(maxSize / (1024 * 1024));

    return {
      isValid,
      errors: isValid
        ? []
        : [
            `파일 크기가 ${sizeMB}MB를 초과할 수 없습니다. (현재: ${Math.round(file.size / (1024 * 1024))}MB)`,
          ],
      warnings: [],
      fileInfo: this.createFileInfo(file),
    };
  }

  /**
   * 파일 이름 검증
   */
  private validateFileName(fileName: string): ValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];

    // 파일 이름 길이 검증
    if (fileName.length > 255) {
      errors.push('파일 이름이 너무 깁니다. (최대 255자)');
    }

    // 특수 문자 검증
    const invalidChars = /[<>:"/\\|?*]/;
    if (invalidChars.test(fileName)) {
      errors.push('파일 이름에 사용할 수 없는 문자가 포함되어 있습니다.');
    }

    // 확장자 검증
    if (!fileName.includes('.')) {
      warnings.push('파일 확장자가 없습니다.');
    }

    // 한글 파일명 경고
    const hasKorean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(fileName);
    if (hasKorean) {
      warnings.push('한글 파일명은 일부 시스템에서 문제가 될 수 있습니다.');
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      fileInfo: {} as FileInfo, // 파일 이름만 검증하므로 빈 객체
    };
  }

  /**
   * 보안 검증 (기본적인 악성 파일 체크)
   */
  private validateSecurity(file: File): ValidationResult {
    const errors: string[] = [];

    // 실행 파일 확장자 차단
    const dangerousExtensions = [
      '.exe',
      '.bat',
      '.cmd',
      '.com',
      '.pif',
      '.scr',
      '.vbs',
      '.js',
      '.jar',
      '.app',
      '.deb',
      '.pkg',
      '.dmg',
      '.sh',
      '.run',
    ];

    const fileExtension = file.name
      .toLowerCase()
      .substring(file.name.lastIndexOf('.'));
    if (dangerousExtensions.includes(fileExtension)) {
      errors.push('보안상 위험한 파일 형식입니다.');
    }

    // 파일 크기가 0인 경우
    if (file.size === 0) {
      errors.push('빈 파일은 업로드할 수 없습니다.');
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings: [],
      fileInfo: this.createFileInfo(file),
    };
  }

  /**
   * 중복 파일 검증
   */
  private validateDuplicates(files: File[]): (string | null)[] {
    const seen = new Set<string>();
    const errors: (string | null)[] = [];

    files.forEach((file, index) => {
      const fileKey = `${file.name}-${file.size}-${file.lastModified}`;

      if (seen.has(fileKey)) {
        errors[index] = '중복된 파일입니다.';
      } else {
        seen.add(fileKey);
        errors[index] = null;
      }
    });

    return errors;
  }

  /**
   * 파일 타입 표시명 반환
   */
  private getFileTypeDisplayName(type: FileType): string {
    const displayNames: Record<FileType, string> = {
      image: '이미지',
      video: '동영상',
      document: '문서',
    };
    return displayNames[type];
  }

  /**
   * 파일 MIME 타입 검증 (실제 파일 내용 기반)
   * 추후 확장: 파일 헤더를 읽어서 실제 타입 검증
   */
  async validateMimeType(file: File): Promise<boolean> {
    return new Promise(resolve => {
      const reader = new FileReader();

      reader.onload = e => {
        const arrayBuffer = e.target?.result as ArrayBuffer;
        const uint8Array = new Uint8Array(arrayBuffer);

        // 파일 시그니처 검증 (magic numbers)
        const isValidMimeType = this.checkFileSignature(uint8Array, file.type);
        resolve(isValidMimeType);
      };

      reader.onerror = () => resolve(false);

      // 첫 몇 바이트만 읽어서 시그니처 검증
      reader.readAsArrayBuffer(file.slice(0, 12));
    });
  }

  /**
   * 파일 시그니처 검증 (magic numbers)
   */
  private checkFileSignature(bytes: Uint8Array, mimeType: string): boolean {
    // JPEG: FF D8 FF
    if (mimeType.includes('jpeg') || mimeType.includes('jpg')) {
      return bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
    }

    // PNG: 89 50 4E 47
    if (mimeType.includes('png')) {
      return (
        bytes[0] === 0x89 &&
        bytes[1] === 0x50 &&
        bytes[2] === 0x4e &&
        bytes[3] === 0x47
      );
    }

    // WebP: 52 49 46 46 ... 57 45 42 50
    if (mimeType.includes('webp')) {
      return (
        bytes[0] === 0x52 &&
        bytes[1] === 0x49 &&
        bytes[2] === 0x46 &&
        bytes[3] === 0x46 &&
        bytes[8] === 0x57 &&
        bytes[9] === 0x45 &&
        bytes[10] === 0x42 &&
        bytes[11] === 0x50
      );
    }

    // MP4: ... 66 74 79 70 (ftyp)
    if (mimeType.includes('mp4')) {
      return (
        bytes[4] === 0x66 &&
        bytes[5] === 0x74 &&
        bytes[6] === 0x79 &&
        bytes[7] === 0x70
      );
    }

    // 기본적으로 통과 (모든 시그니처를 다 검증하기는 어려움)
    return true;
  }

  /**
   * 검증 에러 메시지 포맷팅
   */
  static formatValidationErrors(results: ValidationResult[]): string[] {
    const allErrors: string[] = [];

    results.forEach((result, index) => {
      if (!result.isValid) {
        const filePrefix = `파일 ${index + 1} (${result.fileInfo.name}): `;
        result.errors.forEach(error => {
          allErrors.push(filePrefix + error);
        });
      }
    });

    return allErrors;
  }

  /**
   * 검증 경고 메시지 포맷팅
   */
  static formatValidationWarnings(results: ValidationResult[]): string[] {
    const allWarnings: string[] = [];

    results.forEach((result, index) => {
      if (result.warnings.length > 0) {
        const filePrefix = `파일 ${index + 1} (${result.fileInfo.name}): `;
        result.warnings.forEach(warning => {
          allWarnings.push(filePrefix + warning);
        });
      }
    });

    return allWarnings;
  }
}
