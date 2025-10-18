// config.js - ملف الإعدادات المشترك
let STORE_CONFIG = {
  PRODUCTS: {
    1: { 
      name: "مودال 1", 
      price: 3300, 
      image: "images/modal1.jpg", 
      description: "تصميم مريح وعصري مع تفاصيل راقية تناسب جميع المناسبات",
      availableSizes: ["S", "M", "L"],
      availableColors: ["كما في الصورة", "أبيض", "أسود", "أزرق"]
    },
    // ... باقي المنتجات بنفس الهيكل
  },
  DELIVERY_PRICES: {
    // ... أسعار التوصيل
  },
  DISCOUNTS: {
    minQuantityForDiscount: 2,
    discountPerItem: 300
  },
  STORE_INFO: {
    name: "BEN&KRAB-Shopp",
    tagline: "متجر أفخم الملابس للأطفال",
    phoneNumbers: ["0671466489", "0551102155"]
  },
  AGE_SIZES: {
    3: "S", 4: "S", 5: "S", 
    6: "M", 7: "M", 
    8: "L", 9: "L", 
    10: "XL", 11: "XL", 12: "XL"
  },
  AVAILABLE_COLORS: [
    "كما في الصورة", "أبيض", "أسود", "رمادي", "أزرق", 
    "أحمر", "أخضر", "زهري", "بنفسجي", "أصفر", "برتقالي", "ذهبي"
  ],
  AVAILABLE_SIZES: ["S", "M", "L", "XL", "XXL"],
  ADMIN_SETTINGS: {
    password: "admin123", // كلمة المرور القابلة للتغيير
    sessionTimeout: 30 // الوقت بالدقائق قبل انتهاء الجلسة
  }
};

// تحميل الإعدادات المحفوظة
function loadConfig() {
  const saved = localStorage.getItem('storeConfig');
  if (saved) {
    try {
      const parsedConfig = JSON.parse(saved);
      // دمج الإعدادات مع الحفاظ على كلمة المرور إذا لم تكن محفوظة
      if (parsedConfig.ADMIN_SETTINGS && parsedConfig.ADMIN_SETTINGS.password) {
        STORE_CONFIG.ADMIN_SETTINGS.password = parsedConfig.ADMIN_SETTINGS.password;
      }
      STORE_CONFIG = { ...STORE_CONFIG, ...parsedConfig };
    } catch (e) {
      console.error('Error loading config:', e);
    }
  }
  return STORE_CONFIG;
}

// حفظ الإعدادات
function saveConfig() {
  localStorage.setItem('storeConfig', JSON.stringify(STORE_CONFIG));
  if (typeof updateLiveStore === 'function') {
    updateLiveStore();
  }
}

// تحميل الإعدادات عند استيراد الملف
loadConfig();
