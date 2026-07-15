import React from "react";

export function OmarSayed() {
  const whatsappNumber = "201121433451";
  const message = "انا اعجبت بموقع الشرقاوي اريد تفاصيل عنه.";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="w-full py-3 bg-muted/20 border-t flex justify-center items-center">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm font-medium text-foreground hover:text-primary transition-colors flex items-center gap-2"
      >
        <span>Omar Sayed</span>
      </a>
    </div>
  );
}
