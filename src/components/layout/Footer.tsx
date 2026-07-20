import logoAsset from "@/assets/logo.webp";

export function Footer() {
  // استبدل هذا الرقم برقمك الفعلي بكود الدولة (بدون أصفار أو علامة +)
  const whatsappNumber = "201028551063";
  const whatsappMessage = encodeURIComponent("مرحباً عمر، شاهدت عملك في موقع الشرقاوي وأود التواصل معك!");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <footer className="border-t border-black/5 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-8 text-center sm:px-6">
        {/* اللوجو واسم الموقع */}
        <div className="flex items-center gap-2.5">
          <img
            src={logoAsset}
            alt="شعار الشرقاوي"
            className="h-9 w-9 rounded-full ring-2 ring-crimson/30"
          />
          <div className="font-display text-base font-black">
            <span className="text-crimson">الشرق</span>
            <span className="text-amber-deep">اوي</span>
          </div>
        </div>

        {/* حقوق النشر والتطوير */}
        <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} الشرقاوي · الطعم الأصلي</p>

          <span className="hidden sm:inline text-black/10">|</span>

          {/* تم إصلاح الاتجاه هنا */}
          {/* لمسة المطور الجذابة - حل مشكلة الفراغ */}
          <p className="text-xs text-muted-foreground" dir="ltr">
            Developed by{" "}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-block font-bold transition-all duration-300 hover:scale-105 group"
            >
              <span className="bg-gradient-to-r from-crimson to-amber-deep bg-clip-text text-transparent group-hover:from-green-600 group-hover:to-emerald-500 transition-colors duration-300">
                Omar Sayed
              </span>
              {/* خط سفلي متحرك */}
              <span className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-gradient-to-r from-crimson to-amber-deep transition-all duration-300 group-hover:w-full group-hover:from-green-600 group-hover:to-emerald-500"></span>
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}