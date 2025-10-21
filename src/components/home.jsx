import React, { useState } from "react";
import { Truck, Search, DollarSign, Wrench } from "lucide-react";

const HeavyEquipmentCatalog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceType, setPriceType] = useState("day");

  const equipment = [
    {
      id: 1,
      name: "מחפרון (Excavator)",
      category: "חפירה",
      image: "🚜",
      description: "כלי רב-תכליתי לעבודות חפירה ומילוי",
      works: [
        "חפירת תעלות ויסודות",
        "הריסות מבנים",
        "טעינת משאיות",
        "עבודות נופיות",
        "פינוי פסולת בניין",
      ],
      sizes: ["מיני (1-6 טון)", "בינוני (10-20 טון)", "כבד (20-50 טון)"],
      pricePerHour: "350-600",
      pricePerDay: "2,500-4,500",
      specifications: {
        reach: "4-12 מטר",
        depth: "3-8 מטר",
        bucketCapacity: '0.3-2 מ"ק',
      },
    },
    {
      id: 2,
      name: "באגר (Backhoe Loader)",
      category: "חפירה וטעינה",
      image: "🚧",
      description: "משלב מחפר מאחור ומטען מלפנים",
      works: [
        "חפירת תעלות קטנות ובינוניות",
        "העמסת חומרים",
        "פיזור עפר ומילוי",
        "עבודות תשתית",
        "פרויקטים עירוניים קטנים",
      ],
      sizes: ["סטנדרט (8-10 טון)"],
      pricePerHour: "280-450",
      pricePerDay: "2,000-3,200",
      specifications: {
        reach: "5-6 מטר",
        depth: "4-5 מטר",
        bucketCapacity: '0.2-0.8 מ"ק',
      },
    },
    {
      id: 3,
      name: "מיני באגר (Mini Excavator)",
      category: "חפירה",
      image: "⚙️",
      description: "מחפרון קטן ומתמרן לעבודות מדויקות",
      works: [
        "חפירות במקומות צרים",
        "עבודות גינון ונופיות",
        "תשתיות בחצרות",
        "חפירת בריכות קטנות",
        "עבודות פנים מבנים",
      ],
      sizes: ["מיקרו (0.8-2 טון)", "מיני (2-6 טון)"],
      pricePerHour: "200-350",
      pricePerDay: "1,400-2,500",
      specifications: {
        reach: "2-5 מטר",
        depth: "1.5-3.5 מטר",
        bucketCapacity: '0.1-0.3 מ"ק',
      },
    },
    {
      id: 4,
      name: "רמצס / בולדוזר (Bulldozer)",
      category: "דחיפה ופילוס",
      image: "🏗️",
      description: "כלי כבד לדחיפת עפר ופילוס שטחים",
      works: [
        "פילוס ואיזון שטחים",
        "דחיפת עפר למרחקים קצרים",
        "פינוי אתרים",
        "סלילת דרכים ומישורים",
        "הכנת תשתית לבנייה",
      ],
      sizes: ["בינוני (10-20 טון)", "כבד (20-40 טון)"],
      pricePerHour: "400-700",
      pricePerDay: "3,000-5,500",
      specifications: {
        reach: "N/A",
        depth: "N/A",
        bladeWidth: "2.5-4 מטר",
      },
    },
    {
      id: 5,
      name: "מחפר גלגלים (Wheeled Excavator)",
      category: "חפירה",
      image: "🚚",
      description: "מחפרון על גלגלים לניידות מהירה",
      works: [
        "עבודות עירוניות",
        "תחזוקת כבישים",
        "חפירות קלות עד בינוניות",
        "פרויקטים מרוחקים",
        "עבודות תשתית",
      ],
      sizes: ["בינוני (12-18 טון)"],
      pricePerHour: "320-500",
      pricePerDay: "2,300-3,800",
      specifications: {
        reach: "6-9 מטר",
        depth: "4-6 מטר",
        speed: 'עד 40 קמ"ש',
      },
    },
    {
      id: 6,
      name: "גרדר (Grader)",
      category: "פילוס",
      image: "🛤️",
      description: "מפלס ומיישר משטחים בדיוק",
      works: [
        "פילוס דרכים",
        "יישור משטחים גדולים",
        "הכנת שכבת יסוד",
        "תחזוקת דרכי עפר",
        "סלילת כבישים",
      ],
      sizes: ["בינוני (13-15 טון)", "כבד (16-20 טון)"],
      pricePerHour: "450-650",
      pricePerDay: "3,200-5,000",
      specifications: {
        bladeLength: "3-4 מטר",
        precision: '±1 ס"מ',
        workWidth: "3.5-4.5 מטר",
      },
    },
  ];

  const categories = ["all", "חפירה", "חפירה וטעינה", "דחיפה ופילוס", "פילוס"];

  const filteredEquipment = equipment.filter((item) => {
    const matchesSearch =
      item.name.includes(searchTerm) || item.description.includes(searchTerm);
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-3 sm:p-6 md:p-8"
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 mb-4 sm:mb-6 md:mb-8">
          <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
            <Truck className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-orange-600 flex-shrink-0" />
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                קטלוג ציוד כבד לעבודות עפר
              </h1>
              <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">
                מדריך מקיף לכלי עבודה, תפקידים ומחירים מעודכנים
              </p>
            </div>
          </div>

          {/* Search */}
          <div className="mt-4 sm:mt-6">
            <div className="relative">
              <Search className="absolute right-3 top-3 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
              <input
                type="text"
                placeholder="חיפוש כלי עבודה..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-10 pl-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="mt-3 sm:mt-4">
            <div className="flex gap-2 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-sm sm:text-base font-medium transition-all ${
                    selectedCategory === cat
                      ? "bg-orange-600 text-white shadow-lg"
                      : "bg-white text-gray-700 hover:bg-orange-100"
                  }`}
                >
                  {cat === "all" ? "הכל" : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Price Type Selector */}
          <div className="mt-3 sm:mt-4">
            <span className="block sm:inline font-medium text-gray-700 text-sm sm:text-base mb-2 sm:mb-0 sm:ml-3">
              תצוגת מחירים:
            </span>
            <div className="inline-flex bg-gray-100 rounded-lg p-1 w-full sm:w-auto">
              <button
                onClick={() => setPriceType("hour")}
                className={`flex-1 sm:flex-none px-4 sm:px-6 py-2 rounded-md text-sm sm:text-base font-medium transition-all ${
                  priceType === "hour"
                    ? "bg-white text-orange-600 shadow-md"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                לפי שעה
              </button>
              <button
                onClick={() => setPriceType("day")}
                className={`flex-1 sm:flex-none px-4 sm:px-6 py-2 rounded-md text-sm sm:text-base font-medium transition-all ${
                  priceType === "day"
                    ? "bg-white text-orange-600 shadow-md"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                לפי יום עבודה
              </button>
            </div>
          </div>
        </div>

        {/* Equipment Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {filteredEquipment.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-4 sm:p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold mb-1">
                      {item.name}
                    </h2>
                    <span className="inline-block bg-white bg-opacity-25 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm">
                      {item.category}
                    </span>
                  </div>
                  <div className="text-4xl sm:text-6xl">{item.image}</div>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-6">
                <p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4 font-medium">
                  {item.description}
                </p>

                {/* Work Types */}
                <div className="mb-3 sm:mb-4">
                  <div className="flex items-center gap-2 mb-2 sm:mb-3">
                    <Wrench className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
                    <h3 className="text-sm sm:text-base font-bold text-gray-900">
                      סוגי עבודות:
                    </h3>
                  </div>
                  <ul className="space-y-1.5 sm:space-y-2">
                    {item.works.map((work, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-xs sm:text-sm text-gray-700"
                      >
                        <span className="text-orange-500 mt-0.5 sm:mt-1">
                          •
                        </span>
                        <span>{work}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Sizes */}
                <div className="mb-3 sm:mb-4 bg-gray-50 p-2.5 sm:p-3 rounded-lg">
                  <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-2">
                    גדלים זמינים:
                  </h3>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {item.sizes.map((size, idx) => (
                      <span
                        key={idx}
                        className="bg-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm text-gray-700 border border-gray-200"
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Specifications */}
                <div className="mb-3 sm:mb-4 bg-blue-50 p-2.5 sm:p-3 rounded-lg">
                  <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-2">
                    מפרט טכני:
                  </h3>
                  <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm">
                    {Object.entries(item.specifications).map(([key, value]) => (
                      <div key={key} className="flex flex-col">
                        <span className="text-gray-600 text-xs">
                          {key === "reach"
                            ? "טווח הגעה"
                            : key === "depth"
                            ? "עומק חפירה"
                            : key === "bucketCapacity"
                            ? "נפח דלי"
                            : key === "bladeWidth"
                            ? "רוחב להב"
                            : key === "speed"
                            ? "מהירות"
                            : key === "bladeLength"
                            ? "אורך להב"
                            : key === "precision"
                            ? "דיוק"
                            : key === "workWidth"
                            ? "רוחב עבודה"
                            : key}
                        </span>
                        <span className="font-semibold text-gray-900 text-xs sm:text-sm">
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-3 sm:p-4 rounded-lg border-2 border-green-200">
                  <div className="flex items-center gap-2 mb-2 sm:mb-3">
                    <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-green-700" />
                    <h3 className="text-sm sm:text-base font-bold text-gray-900">
                      מחיר {priceType === "hour" ? "לשעה" : "ליום עבודה"} (₪):
                    </h3>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl sm:text-4xl font-bold text-green-700">
                      {priceType === "hour"
                        ? item.pricePerHour
                        : item.pricePerDay}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1 sm:mt-2">
                      {priceType === "hour"
                        ? "מחיר משוער לשעת עבודה"
                        : "מחיר משוער ליום עבודה (8-10 שעות)"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Notes */}
        <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mt-4 sm:mt-6 md:mt-8">
          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">
            הערות חשובות:
          </h3>
          <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-orange-500 mt-0.5 sm:mt-1 flex-shrink-0">
                •
              </span>
              <span>
                המחירים הם אומדן כללי ועשויים להשתנות בהתאם לאזור, עונה וזמינות
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-500 mt-0.5 sm:mt-1 flex-shrink-0">
                •
              </span>
              <span>יש להוסיף עלויות הובלה, אופרטור ודלק בהתאם לפרויקט</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-500 mt-0.5 sm:mt-1 flex-shrink-0">
                •
              </span>
              <span>
                מומלץ לקבל הצעות מחיר מספר חברות השכרה לפני קבלת החלטה
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-500 mt-0.5 sm:mt-1 flex-shrink-0">
                •
              </span>
              <span>יש לוודא שהאתר מוכן ונגיש לכניסת הציוד הכבד</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HeavyEquipmentCatalog;
