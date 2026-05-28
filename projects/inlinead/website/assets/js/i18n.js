/* INLINE AD — i18n */
window.INLINEAD_I18N = (function () {
  const STRINGS = {
      en: {
        nav_brands: 'For brands',
        nav_gyms: 'For gyms',
        nav_whatsapp: 'WhatsApp',
        hero_kicker: 'Alexandria · Premium gyms',
        hero_title: 'In-gym ads you can actually measure',
        hero_lede: "Egypt's first performance-tracked in-gym network. Your brand on screens where members train — tracked by QR scans and redemptions, not guesses.",
        cta_brand: 'Advertise in gyms',
        cta_gym: 'Partner your gym',
        screen_label: 'Peak hours · 4PM – 12AM',
        m1: 'Scans tracked', m2: 'Video spots', m3: 'Rotation optimized',
        t1: '369', t1b: 'gyms in Alexandria market',
        t2: 'Uphill', t2b: '2 branches live in network',
        t3: 'No pricing on site —', t3b: 'talk to our team',
        brand_tag: 'For brands',
        brand_h2: "Reach members while they're on the floor",
        brand_p: 'Not billboards. Not feed scroll. Thirty-second spots in premium gyms during peak hours — with performance you can report.',
        c1h: 'Premium placement', c1p: 'Screens inside high-membership gyms in Alexandria. Members see your message in workout mode.',
        c2h: 'Tracked performance', c2p: 'QR scans and discount-code redemptions. Know what moved, not just what aired.',
        c3h: 'We run activations', c3p: 'INLINE ops handles sampling, trainers, and verification — not gym front desk staff.',
        how_title: 'How it works',
        s1h: 'Tell us your goals', s1p: 'Category, timing, and what success looks like on a call.',
        s2h: 'Creative & placement', s2p: 'We align spots to peak gym traffic and your brand guidelines.',
        s3h: 'Go live on screens', s3p: 'Campaigns run evenings when the floor is full.',
        s4h: 'Measure & optimize', s4p: 'QR and code data feed reporting and rotation tuning.',
        form_brand_h: 'Start a brand conversation',
        form_brand_sub: "No commitment. We'll share how campaigns work on a call.",
        form_gym_h: 'Apply as a partner gym',
        form_gym_sub: 'Alexandria premium gyms first. This form is an inquiry, not a contract.',
        l_company: 'Company / brand', l_name: 'Contact name', l_email: 'Work email', l_phone: 'WhatsApp / phone',
        l_category: 'Product category', l_budget: 'Monthly ad budget (EGP, optional)', l_interest: 'Interest level', l_message: 'Message (optional)',
        opt_b1: 'Under 30K', opt_b2: '30K – 50K', opt_b3: '50K – 100K', opt_b4: '100K+',
        err_submit: 'Could not send. Try again or message us on WhatsApp.',
        l_gym: 'Gym name', l_branches: 'Branches in Alexandria', l_area: 'Area / district',
        l_contact: 'Contact name & role', l_members: 'Approx. monthly members', l_tier: 'Membership price band (EGP)',
        opt_select: 'Select…', opt_supp: 'Supplements', opt_sn: 'Sports nutrition', opt_apparel: 'Fitness apparel',
        opt_fnb: 'F&B', opt_other: 'Other', opt_exploring: 'Exploring', opt_ready: 'Ready this quarter', opt_unsure: 'Not sure yet',
        ph_area: 'Smouha, San Stefano…',
        consent_brand: 'INLINE AD may contact me about advertising. This is not a binding contract.',
        consent_gym: 'I agree to be contacted about a gym partnership inquiry.',
        submit_brand: 'Send request', submit_gym: 'Submit application',
        thanks_brand_h: 'Request received', thanks_brand_p: 'Our team will reach out within two business days to discuss fit and next steps.',
        thanks_gym_h: 'Application received', thanks_gym_p: "We review gym applications weekly. If you're a fit for the network, we'll contact you to schedule a visit.",
        err_required: 'Required', err_email: 'Valid email required',
        gym_tag: 'For gyms', gym_h2: 'Earn from your floor — zero hardware cost',
        gym_p: 'Partner with INLINE AD. We install and operate screens. You earn revenue share when campaigns run — payouts tied to verified uptime.',
        g1h: 'No capex', g1p: 'We provide screens and ops. No upfront hardware spend for your gym.',
        g2h: 'Revenue share', g2p: 'Earn when brands run in your venue. Terms discussed when you apply.',
        g3h: 'Verified uptime', g3p: 'Payouts align with screen performance — transparency for both sides.',
        footer_loc: 'Alexandria, Egypt · Pre-launch', footer_privacy: 'Privacy',
        preview_note: 'Design preview — forms log to console only. Replace WhatsApp + email before launch.',
      },
      ar: {
        nav_brands: 'للعلامات التجارية',
        nav_gyms: 'للصالات',
        nav_whatsapp: 'واتساب',
        hero_kicker: 'الإسكندرية · صالات مميزة',
        hero_title: 'إعلانات داخل الصالة — أداء يُقاس',
        hero_lede: 'أول شبكة إعلانات داخل الصالات الرياضية في مصر بأداء قابل للقياس. علامتك على شاشات حيث يتمرن الأعضاء — عبر مسح QR والخصومات، لا تخمين.',
        cta_brand: 'أعلن في الصالات',
        cta_gym: 'انضم كشريك',
        screen_label: 'ساعات الذروة · 4م – 12ص',
        m1: 'مسح QR', m2: 'فيديو 30 ث', m3: 'توزيع ذكي',
        t1: '369', t1b: 'صالة في سوق الإسكندرية',
        t2: 'أب هيل', t2b: 'فرعان في الشبكة',
        t3: 'لا أسعار على الموقع —', t3b: 'تحدث مع فريقنا',
        brand_tag: 'للعلامات',
        brand_h2: 'وصل للأعضاء أثناء التمرين',
        brand_p: 'ليست لوحات طرقية ولا سكرول. spots قصيرة في صالات مميزة وقت الذروة — بأداء يمكنك الإبلاغ عنه.',
        c1h: 'ظهور مميز', c1p: 'شاشات داخل صالات عضوية عالية في الإسكندرية.',
        c2h: 'أداء مُقاس', c2p: 'مسح QR واسترداد أكواد الخصم.',
        c3h: 'نحن ننفّذ التفعيل', c3p: 'فريق INLINE يدير العينات والمدربين — ليس موظف الاستقبال.',
        how_title: 'كيف يعمل',
        s1h: 'أخبرنا أهدافك', s1p: 'الفئة والتوقيت ومعنى النجاح في مكالمة.',
        s2h: 'المحتوى والعرض', s2p: 'نوائم المواعيد مع ذروة الصالة وإرشادات علامتك.',
        s3h: 'البث على الشاشات', s3p: 'الحملات مساءً عند امتلاء الصالة.',
        s4h: 'قياس وتحسين', s4p: 'بيانات QR والأكواد للتقارير والتوزيع.',
        form_brand_h: 'ابدأ محادثة كعلامة تجارية',
        form_brand_sub: 'بدون التزام. نشرح آلية الحملات في مكالمة.',
        form_gym_h: 'قدّم طلب شراكة صالة',
        form_gym_sub: 'صالات الإسكندرية المميزة أولاً. هذا استفسار وليس عقداً.',
        l_company: 'الشركة / العلامة', l_name: 'اسم جهة الاتصال', l_email: 'البريد', l_phone: 'واتساب / هاتف',
        l_category: 'فئة المنتج', l_budget: 'ميزانية إعلانية شهرية (جنيه، اختياري)', l_interest: 'مستوى الاهتمام', l_message: 'رسالة (اختياري)',
        opt_b1: 'أقل من 30 ألف', opt_b2: '30 – 50 ألف', opt_b3: '50 – 100 ألف', opt_b4: '100 ألف+',
        err_submit: 'فشل الإرسال. حاول مرة أخرى أو تواصل عبر واتساب.',
        l_gym: 'اسم الصالة', l_branches: 'فروع في الإسكندرية', l_area: 'المنطقة',
        l_contact: 'الاسم والدور', l_members: 'عدد الأعضاء تقريباً', l_tier: 'شريحة اشتراك (جنيه)',
        opt_select: 'اختر…', opt_supp: 'مكملات', opt_sn: 'تغذية رياضية', opt_apparel: 'ملابس رياضية',
        opt_fnb: 'أطعمة ومشروبات', opt_other: 'أخرى', opt_exploring: 'أستكشف', opt_ready: 'جاهز هذا الربع', opt_unsure: 'غير متأكد',
        ph_area: 'سموحة، سان ستيفانو…',
        consent_brand: 'يحق لـ INLINE AD التواصل معي بخصوص الإعلان. هذا ليس عقداً ملزماً.',
        consent_gym: 'أوافق على التواصل بخصوص شراكة الصالة.',
        submit_brand: 'إرسال الطلب', submit_gym: 'إرسال الطلب',
        thanks_brand_h: 'تم استلام طلبك', thanks_brand_p: 'سيتواصل فريقنا خلال يومي عمل لمناقشة الملاءمة والخطوات التالية.',
        thanks_gym_h: 'تم استلام الطلب', thanks_gym_p: 'نراجع طلبات الصالات أسبوعياً. إن كنت مناسباً للشبكة، سنتواصل لتحديد زيارة.',
        err_required: 'مطلوب', err_email: 'بريد صالح مطلوب',
        gym_tag: 'للصالات', gym_h2: 'اربح من صالتك — بدون تكلفة أجهزة',
        gym_p: 'شارك مع INLINE AD. نركّب الشاشات ونشغّلها. تحصل على حصة عند تشغيل الحملات — مدفوعات مرتبطة بتشغيل الشاشة.',
        g1h: 'بدون استثمار أجهزة', g1p: 'نوفر الشاشات والتشغيل.',
        g2h: 'حصة إيراد', g2p: 'تربح عند تشغيل العلامات في صالتك. الشروط عند التقديم.',
        g3h: 'تشغيل موثّق', g3p: 'المدفوعات مرتبطة بأداء الشاشة — شفافية للطرفين.',
        footer_loc: 'الإسكندرية، مصر · قبل الإطلاق', footer_privacy: 'الخصوصية',
        preview_note: 'معاينة تصميم — النماذج تطبع في Console فقط.',
      },
    };

  let lang = 'en';

  function applyLang() {
    const s = STRINGS[lang];
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (s[key]) el.textContent = s[key];
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (s[key]) el.placeholder = s[key];
    });
    document.documentElement.lang = lang === 'ar' ? 'ar' : 'en';
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    const btn = document.getElementById('langToggle');
    if (btn) btn.textContent = lang === 'ar' ? 'EN' : 'عربي';
    document.title = lang === 'ar'
      ? 'INLINE AD — إعلانات داخل الصالات'
      : 'INLINE AD — In-gym advertising, performance tracked';
  }

  function toggleLang() {
    lang = lang === 'en' ? 'ar' : 'en';
    applyLang();
  }

  return { STRINGS, getLang: () => lang, setLang: (l) => { lang = l; applyLang(); }, toggleLang, applyLang };
})();
