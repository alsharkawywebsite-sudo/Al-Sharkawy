import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  UploadCloud,
  Loader2,
  RefreshCw,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Image as ImageIcon,
} from "lucide-react";
import { toast } from "sonner";

interface ImageUploadFieldProps {
  label?: string;
  value: string;
  onChange: (url: string) => void;
  onUpload: (file: File) => Promise<{ success: boolean; image_url: string }>;
  disabled?: boolean;
  aspectRatio?: "square" | "video" | "wide";
  helperText?: string;
}

const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB
const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/jpg", "image/webp", "image/gif"];
const ACCEPTED_EXTENSIONS = ["png", "jpg", "jpeg", "webp", "gif"];

export function ImageUploadField({
  label = "الصورة",
  value,
  onChange,
  onUpload,
  disabled = false,
  aspectRatio = "square",
  helperText = "الصيغ المدعومة: PNG, JPEG, WEBP, GIF (بحد أقصى 25 ميجابايت)",
}: ImageUploadFieldProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const validateAndUpload = async (file: File) => {
    // 1. Client-side size check
    if (file.size > MAX_FILE_SIZE) {
      const errorMsg = "حجم الصورة يتجاوز الحد الأقصى المسموح به (25 ميجابايت)";
      setUploadError(errorMsg);
      toast.error(errorMsg);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    // 2. Client-side format check
    const ext = file.name.split(".").pop()?.toLowerCase();
    const isMimeValid = file.type && ACCEPTED_TYPES.includes(file.type.toLowerCase());
    const isExtValid = ext && ACCEPTED_EXTENSIONS.includes(ext);

    if (!isMimeValid && !isExtValid) {
      const errorMsg = "صيغة الملف غير مدعومة. الصيغ المقبولة: PNG, JPEG, WEBP, GIF";
      setUploadError(errorMsg);
      toast.error(errorMsg);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    try {
      const result = await onUpload(file);
      if (result.success && result.image_url) {
        onChange(result.image_url);
        toast.success("تم رفع الصورة بنجاح");
      } else {
        throw new Error("فشل رفع الصورة");
      }
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : "الخدمة غير متاحة حاليًا، حاول مرة أخرى بعد قليل";
      setUploadError(msg);
      toast.error(msg);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      void validateAndUpload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled && !isUploading) {
      setIsDragOver(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (disabled || isUploading) return;

    const file = e.dataTransfer.files?.[0];
    if (file) {
      void validateAndUpload(file);
    }
  };

  const previewClass =
    aspectRatio === "video"
      ? "w-36 h-20"
      : aspectRatio === "wide"
        ? "w-40 h-24"
        : "w-24 h-24";

  return (
    <div className="space-y-3" dir="rtl">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-semibold text-ink">{label}</Label>
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif"
        className="hidden"
        onChange={handleFileChange}
        disabled={disabled || isUploading}
      />

      {/* State 1: Image already exists */}
      {value ? (
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border border-black/10 rounded-2xl bg-cream/30">
          <div
            className={`relative rounded-xl overflow-hidden border border-black/10 bg-white shadow-xs shrink-0 ${previewClass}`}
          >
            <img
              src={value}
              alt="معاينة الصورة"
              className="w-full h-full object-cover"
              onError={(e) => {
                // Handle broken URL placeholder
                (e.currentTarget as HTMLImageElement).src =
                  "https://placehold.co/150x150?text=No+Image";
              }}
            />
          </div>
          <div className="flex-1 space-y-2 min-w-0">
            <div className="flex items-center gap-1.5 text-xs text-green-700 font-medium">
              <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
              <span>تم تعيين الصورة بنجاح</span>
            </div>
            <p className="text-xs text-ink/50 break-all font-mono line-clamp-1" dir="ltr">
              {value}
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={disabled || isUploading}
                onClick={() => fileInputRef.current?.click()}
                className="text-xs gap-1.5 h-8"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    جاري الرفع...
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-3.5 h-3.5" />
                    تغيير الصورة
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                disabled={disabled || isUploading}
                onClick={() => {
                  onChange("");
                  setUploadError(null);
                  if (fileInputRef.current) fileInputRef.current.value = "";
                }}
                className="text-xs text-red-600 hover:text-red-700 hover:bg-red-50 h-8 gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                إزالة الصورة
              </Button>
            </div>
          </div>
        </div>
      ) : (
        /* State 2: Upload Dropzone */
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => {
            if (!disabled && !isUploading) fileInputRef.current?.click();
          }}
          className={`border-2 border-dashed rounded-2xl p-6 text-center transition-colors select-none ${
            isUploading
              ? "border-crimson/40 bg-crimson/5 cursor-wait"
              : disabled
                ? "border-gray-200 bg-gray-50 opacity-60 cursor-not-allowed"
                : isDragOver
                  ? "border-crimson bg-crimson/10 cursor-pointer"
                  : "border-black/15 hover:border-crimson/50 hover:bg-cream/40 bg-white cursor-pointer"
          }`}
        >
          {isUploading ? (
            <div className="flex flex-col items-center justify-center gap-3 py-2">
              <Loader2 className="w-8 h-8 text-crimson animate-spin" />
              <div className="space-y-1">
                <p className="text-sm font-semibold text-ink">جاري الرفع...</p>
                <p className="text-xs text-ink/60 max-w-sm">
                  قد يستغرق هذا وقتًا أطول من المعتاد (حتى دقيقة) عند الاستخدام لأول مرة.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="w-12 h-12 rounded-full bg-cream flex items-center justify-center text-crimson shadow-xs">
                {isDragOver ? (
                  <ImageIcon className="w-6 h-6 animate-bounce" />
                ) : (
                  <UploadCloud className="w-6 h-6" />
                )}
              </div>
              <div className="space-y-0.5">
                <p className="text-sm font-semibold text-ink">
                  {isDragOver ? "أفلت الصورة هنا للرفع" : "انقر أو اسحب صورة للرفع"}
                </p>
                <p className="text-xs text-ink/50">{helperText}</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Error Alert */}
      {uploadError && (
        <div className="flex items-center gap-2 text-xs text-red-600 bg-red-50 p-2.5 rounded-xl border border-red-200">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{uploadError}</span>
        </div>
      )}

      {/* Manual URL Input fallback */}
      <div className="pt-1">
        <details className="text-xs text-ink/60 cursor-pointer">
          <summary className="hover:text-ink font-medium select-none">
            أو إدخال رابط الصورة يدوياً
          </summary>
          <div className="mt-2 space-y-1">
            <Input
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="https://..."
              dir="ltr"
              className="text-left text-xs h-9 bg-white"
              disabled={disabled || isUploading}
            />
          </div>
        </details>
      </div>
    </div>
  );
}
